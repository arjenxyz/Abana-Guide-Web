import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type RequestCounter = {
  minuteWindowStart: number;
  minuteCount: number;
  dayWindowStart: number;
  dayCount: number;
};

type DailyBudgetState = {
  dayKey: string;
  spentUsd: number;
};

type GroqMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type GroqModelConfig = {
  id: string;
  inputCost: number;
  outputCost: number;
};

/** Groq production chat models — free tier, no credit card. Cheapest first. */
const GROQ_TEXT_MODELS: GroqModelConfig[] = [
  { id: "llama-3.1-8b-instant", inputCost: 0.05, outputCost: 0.08 },
  { id: "openai/gpt-oss-20b", inputCost: 0.075, outputCost: 0.3 },
  { id: "llama-3.3-70b-versatile", inputCost: 0.59, outputCost: 0.79 },
  { id: "openai/gpt-oss-120b", inputCost: 0.15, outputCost: 0.6 },
];

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT_TR = `
Sen Abana (Kastamonu) için çalışan profesyonel bir turizm asistanısın.
Ziyaretçilere doğru, pratik ve etkili gezi rehberliği sağlarsın.

## Kurallar
- Yanıt dili her zaman Türkçe
- Cevapları net, yardımcı ve turist odaklı ver (3-8 cümle)
- Somut öneriler sun: yer adı, mesafe, en iyi dönem, pratik ipuçları
- Abana dışı sorularda nazikçe Abana odağına dön
- Emin olmadığın bilgiyi uydurma; emin değilsen bunu açıkça belirt
- Konaklama ve etkinlik saatleri gibi değişken bilgilerde gitmeden önce arayıp teyit etmelerini öner
`;

const SYSTEM_PROMPT_EN = `
You are a professional tourism assistant for Abana (Kastamonu, Turkey).
You provide accurate, practical and effective travel guidance to visitors.

## Rules
- Always respond in English
- Give clear, helpful, tourist-focused answers (3-8 sentences)
- Offer concrete suggestions: place names, distances, best seasons, practical tips
- For off-topic questions, politely redirect to Abana
- Never fabricate uncertain information; state clearly when you are unsure
- For accommodation and event hours, suggest calling ahead to confirm
`;

function getSystemPrompt(locale: string): string {
  return locale === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_TR;
}

const MAX_OUTPUT_TOKENS = 500;
const RATE_LIMIT_PER_MINUTE = Number(
  process.env.CHAT_RATE_LIMIT_PER_MINUTE ?? 20
);
const RATE_LIMIT_PER_DAY = Number(process.env.CHAT_RATE_LIMIT_PER_DAY ?? 200);
const DAILY_BUDGET_USD = Number(process.env.CHAT_DAILY_BUDGET_USD ?? 3);
const DEFAULT_INPUT_COST = Number(process.env.GROQ_INPUT_COST_PER_1M ?? 0.05);
const DEFAULT_OUTPUT_COST = Number(process.env.GROQ_OUTPUT_COST_PER_1M ?? 0.08);

const globalForChat = globalThis as typeof globalThis & {
  __chatRateMap?: Map<string, RequestCounter>;
  __chatDailyBudget?: DailyBudgetState;
};

const rateMap = globalForChat.__chatRateMap ?? new Map<string, RequestCounter>();
globalForChat.__chatRateMap = rateMap;

const dailyBudgetState = globalForChat.__chatDailyBudget ?? {
  dayKey: "",
  spentUsd: 0,
};
globalForChat.__chatDailyBudget = dailyBudgetState;

function dayKeyFromNow(): string {
  return new Date().toISOString().slice(0, 10);
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function isRateLimited(ip: string): { limited: boolean; reason?: string } {
  const now = Date.now();
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  const todayStart = dayStart.getTime();

  const existing = rateMap.get(ip) ?? {
    minuteWindowStart: now,
    minuteCount: 0,
    dayWindowStart: todayStart,
    dayCount: 0,
  };

  if (now - existing.minuteWindowStart >= 60_000) {
    existing.minuteWindowStart = now;
    existing.minuteCount = 0;
  }
  if (existing.dayWindowStart !== todayStart) {
    existing.dayWindowStart = todayStart;
    existing.dayCount = 0;
  }

  if (existing.minuteCount >= RATE_LIMIT_PER_MINUTE) {
    rateMap.set(ip, existing);
    return { limited: true, reason: "Dakikalık istek limiti aşıldı." };
  }
  if (existing.dayCount >= RATE_LIMIT_PER_DAY) {
    rateMap.set(ip, existing);
    return { limited: true, reason: "Günlük istek limiti aşıldı." };
  }

  existing.minuteCount += 1;
  existing.dayCount += 1;
  rateMap.set(ip, existing);
  return { limited: false };
}

function estimateInputTokens(messages: ChatMessage[], systemPrompt: string): number {
  const combined = `${systemPrompt}\n${messages.map((m) => m.text).join("\n")}`;
  return Math.ceil(combined.length / 4);
}

function estimateWorstCaseUsd(
  messages: ChatMessage[],
  systemPrompt: string,
  config: GroqModelConfig
): number {
  const estimatedInputTokens = estimateInputTokens(messages, systemPrompt);
  const inputCost = (estimatedInputTokens / 1_000_000) * config.inputCost;
  const outputCost = (MAX_OUTPUT_TOKENS / 1_000_000) * config.outputCost;
  return inputCost + outputCost;
}

function calculateActualUsd(
  usage: { prompt_tokens?: number; completion_tokens?: number } | undefined,
  config: GroqModelConfig
): number {
  if (!usage) return 0;
  const inputTokens = usage.prompt_tokens ?? 0;
  const outputTokens = usage.completion_tokens ?? 0;
  const inputCost = (inputTokens / 1_000_000) * config.inputCost;
  const outputCost = (outputTokens / 1_000_000) * config.outputCost;
  return inputCost + outputCost;
}

function resetBudgetIfNewDay() {
  const today = dayKeyFromNow();
  if (dailyBudgetState.dayKey !== today) {
    dailyBudgetState.dayKey = today;
    dailyBudgetState.spentUsd = 0;
  }
}

function normalizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter((item) => item && typeof item === "object")
    .map((item): ChatMessage => {
      const role = (item as { role?: string }).role;
      const text = (item as { text?: string }).text;
      return {
        role: role === "assistant" ? "assistant" : "user",
        text: typeof text === "string" ? text.trim() : "",
      };
    })
    .filter((msg) => msg.text.length > 0)
    .slice(-10);
}

function toGroqMessages(
  messages: ChatMessage[],
  systemPrompt: string
): GroqMessage[] {
  return [
    { role: "system", content: systemPrompt.trim() },
    ...messages.map((m) => ({
      role: m.role,
      content: m.text,
    })),
  ];
}

function resolveModelCandidates(): GroqModelConfig[] {
  const customList = process.env.GROQ_MODELS?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (customList?.length) {
    return customList.map((id) => ({
      id,
      inputCost: DEFAULT_INPUT_COST,
      outputCost: DEFAULT_OUTPUT_COST,
    }));
  }

  const primaryId = (process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile").trim();
  const primary =
    GROQ_TEXT_MODELS.find((model) => model.id === primaryId) ?? {
      id: primaryId,
      inputCost: DEFAULT_INPUT_COST,
      outputCost: DEFAULT_OUTPUT_COST,
    };

  const seen = new Set<string>();
  const ordered: GroqModelConfig[] = [];

  const add = (config: GroqModelConfig) => {
    if (seen.has(config.id)) return;
    seen.add(config.id);
    ordered.push(config);
  };

  add(primary);

  const byCost = [...GROQ_TEXT_MODELS].sort(
    (a, b) => a.inputCost + a.outputCost - (b.inputCost + b.outputCost)
  );
  for (const config of byCost) {
    add(config);
  }

  return ordered;
}

function parseGroqError(body: string): string {
  try {
    const parsed = JSON.parse(body) as {
      error?: string | { message?: string };
    };
    if (typeof parsed.error === "string") return parsed.error;
    return parsed.error?.message?.trim() ?? body.slice(0, 200);
  } catch {
    return body.slice(0, 200);
  }
}

function isQuotaExceeded(status: number, detail: string): boolean {
  return (
    status === 429 ||
    /quota|rate limit|rate-limit|too many requests|tokens per minute|requests per minute/i.test(
      detail
    )
  );
}

function isAuthError(status: number): boolean {
  return status === 401 || status === 403;
}

function shouldTryNextModel(status: number, detail: string): boolean {
  if (isAuthError(status)) return false;
  if (status === 404 || status === 400 || status === 422) return true;
  if (isQuotaExceeded(status, detail)) return true;
  if (status === 503 || status >= 500) return true;
  if (/not found|decommissioned|invalid model|does not exist|model_not_found/i.test(detail)) {
    return true;
  }
  return false;
}

function quotaErrorMessage(locale: string): string {
  if (locale === "en") {
    return (
      "Groq rate limit reached on all models. The free tier allows ~30 requests/min — " +
      "wait a moment and try again. See https://console.groq.com/docs/rate-limits"
    );
  }
  return (
    "Groq hız limiti doldu (tüm modeller denendi). Ücretsiz planda ~30 istek/dakika sınırı var — " +
    "biraz bekleyip tekrar deneyin. Detay: https://console.groq.com/docs/rate-limits"
  );
}

function extractReply(data: {
  choices?: Array<{ message?: { content?: string } }>;
}): string {
  const content = data.choices?.[0]?.message?.content;
  return typeof content === "string" ? content.trim() : "";
}

async function callGroq(
  apiKey: string,
  config: GroqModelConfig,
  messages: GroqMessage[]
) {
  return fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.id,
      messages,
      max_tokens: MAX_OUTPUT_TOKENS,
      temperature: 0.3,
    }),
  });
}

async function generateWithGroq(
  apiKey: string,
  messages: ChatMessage[],
  systemPrompt: string
) {
  const models = resolveModelCandidates();
  const groqMessages = toGroqMessages(messages, systemPrompt);
  let lastError = "Groq isteği başarısız oldu.";
  let quotaFailures = 0;
  let attempts = 0;

  for (const config of models) {
    attempts += 1;
    const response = await callGroq(apiKey, config, groqMessages);

    if (response.ok) {
      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
        usage?: { prompt_tokens?: number; completion_tokens?: number };
      };
      return { ok: true as const, model: config, data };
    }

    const errText = await response.text();
    lastError = parseGroqError(errText);
    const quota = isQuotaExceeded(response.status, lastError);

    console.error(
      "Groq error",
      config.id,
      response.status,
      errText.slice(0, 400)
    );

    if (isAuthError(response.status)) {
      return {
        ok: false as const,
        error: lastError,
        quotaExceeded: false,
        authError: true,
      };
    }

    if (quota) {
      quotaFailures += 1;
    }

    if (!shouldTryNextModel(response.status, lastError)) {
      break;
    }
  }

  return {
    ok: false as const,
    error: lastError,
    quotaExceeded: attempts > 0 && quotaFailures === attempts,
    authError: false,
  };
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY tanımlı değil." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as { messages?: unknown; locale?: string };
    const messages = normalizeMessages(body.messages);
    const locale = body.locale === "en" ? "en" : "tr";
    const systemPrompt = getSystemPrompt(locale);

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "En az bir kullanıcı mesajı gerekli." },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);
    const limitCheck = isRateLimited(ip);
    if (limitCheck.limited) {
      return NextResponse.json({ error: limitCheck.reason }, { status: 429 });
    }

    resetBudgetIfNewDay();
    const primaryModel = resolveModelCandidates()[0];
    const estimatedCost = estimateWorstCaseUsd(messages, systemPrompt, primaryModel);
    if (dailyBudgetState.spentUsd + estimatedCost > DAILY_BUDGET_USD) {
      return NextResponse.json(
        {
          error:
            "Günlük asistan bütçesi doldu. Lütfen yarın tekrar deneyin veya limiti artırın.",
        },
        { status: 429 }
      );
    }

    const groqResult = await generateWithGroq(apiKey, messages, systemPrompt);

    if (!groqResult.ok) {
      if (groqResult.quotaExceeded) {
        return NextResponse.json(
          { error: quotaErrorMessage(locale) },
          { status: 429 }
        );
      }

      return NextResponse.json({ error: groqResult.error }, { status: 502 });
    }

    const reply = extractReply(groqResult.data);
    if (!reply) {
      return NextResponse.json(
        { error: "Modelden yanıt alınamadı." },
        { status: 502 }
      );
    }

    dailyBudgetState.spentUsd += calculateActualUsd(
      groqResult.data.usage,
      groqResult.model
    );

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "İstek işlenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
