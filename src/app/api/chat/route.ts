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

type XaiInputMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type XaiOutputItem = {
  type?: string;
  role?: string;
  content?: Array<{ type?: string; text?: string }>;
};

type XaiUsage = {
  input_tokens?: number;
  output_tokens?: number;
  total_tokens?: number;
  prompt_tokens?: number;
  completion_tokens?: number;
};

type ReasoningEffort = "none" | "low" | "medium" | "high";

type XaiModelConfig = {
  id: string;
  reasoning?: ReasoningEffort;
  inputCost: number;
  outputCost: number;
};

/** Text models ordered cheapest-first to stretch free credits. */
const XAI_TEXT_MODELS: XaiModelConfig[] = [
  { id: "grok-build-0.1", inputCost: 1, outputCost: 2 },
  { id: "grok-4.20-0309-non-reasoning", inputCost: 1.25, outputCost: 2.5 },
  { id: "grok-4.3", reasoning: "none", inputCost: 1.25, outputCost: 2.5 },
  { id: "grok-4-1-fast-non-reasoning", inputCost: 1.25, outputCost: 2.5 },
  { id: "grok-4-fast-non-reasoning", inputCost: 1.25, outputCost: 2.5 },
  { id: "grok-3-mini", inputCost: 1.25, outputCost: 2.5 },
  { id: "grok-4.20-0309-reasoning", inputCost: 1.25, outputCost: 2.5 },
  { id: "grok-4.3", reasoning: "low", inputCost: 1.25, outputCost: 2.5 },
  { id: "grok-4-1-fast-reasoning", inputCost: 1.25, outputCost: 2.5 },
  { id: "grok-4-fast-reasoning", inputCost: 1.25, outputCost: 2.5 },
  {
    id: "grok-4.20-multi-agent-0309",
    reasoning: "low",
    inputCost: 1.25,
    outputCost: 2.5,
  },
  { id: "grok-4.5", reasoning: "low", inputCost: 2, outputCost: 6 },
  { id: "grok-4.5", reasoning: "medium", inputCost: 2, outputCost: 6 },
  { id: "grok-2-mini", inputCost: 0.2, outputCost: 0.5 },
  { id: "grok-2", inputCost: 2, outputCost: 10 },
  { id: "grok-beta", inputCost: 2, outputCost: 10 },
];

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
const DEFAULT_INPUT_COST = Number(process.env.XAI_INPUT_COST_PER_1M ?? 1.25);
const DEFAULT_OUTPUT_COST = Number(process.env.XAI_OUTPUT_COST_PER_1M ?? 2.5);

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

function modelKey(config: XaiModelConfig): string {
  return `${config.id}:${config.reasoning ?? "default"}`;
}

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
  config: XaiModelConfig
): number {
  const estimatedInputTokens = estimateInputTokens(messages, systemPrompt);
  const inputCost = (estimatedInputTokens / 1_000_000) * config.inputCost;
  const outputCost = (MAX_OUTPUT_TOKENS / 1_000_000) * config.outputCost;
  return inputCost + outputCost;
}

function calculateActualUsd(usage: XaiUsage | undefined, config: XaiModelConfig): number {
  if (!usage) return 0;
  const inputTokens = usage.input_tokens ?? usage.prompt_tokens ?? 0;
  const outputTokens = usage.output_tokens ?? usage.completion_tokens ?? 0;
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

function toXaiInput(
  messages: ChatMessage[],
  systemPrompt: string
): XaiInputMessage[] {
  return [
    { role: "system", content: systemPrompt.trim() },
    ...messages.map((m) => ({
      role: m.role,
      content: m.text,
    })),
  ];
}

function resolveModelCandidates(): XaiModelConfig[] {
  const customList = process.env.XAI_MODELS?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (customList?.length) {
    return customList.map((id) => ({
      id,
      inputCost: DEFAULT_INPUT_COST,
      outputCost: DEFAULT_OUTPUT_COST,
    }));
  }

  const primaryId = (process.env.XAI_MODEL ?? "grok-build-0.1").trim();
  const primary =
    XAI_TEXT_MODELS.find((model) => model.id === primaryId) ?? {
      id: primaryId,
      inputCost: DEFAULT_INPUT_COST,
      outputCost: DEFAULT_OUTPUT_COST,
    };

  const seen = new Set<string>();
  const ordered: XaiModelConfig[] = [];

  const add = (config: XaiModelConfig) => {
    const key = modelKey(config);
    if (seen.has(key)) return;
    seen.add(key);
    ordered.push(config);
  };

  add(primary);

  const byCost = [...XAI_TEXT_MODELS].sort(
    (a, b) => a.inputCost + a.outputCost - (b.inputCost + b.outputCost)
  );
  for (const config of byCost) {
    add(config);
  }

  return ordered;
}

function parseXaiError(body: string): string {
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
    /quota|rate limit|rate-limit|resource exhausted|billing|credits|spending limit/i.test(
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
  if (status === 402 || status === 503 || status >= 500) return true;
  if (/not found|not supported|invalid model|does not exist/i.test(detail)) {
    return true;
  }
  return false;
}

function quotaErrorMessage(locale: string): string {
  if (locale === "en") {
    return (
      "All xAI models are unavailable — free credits or quota may be exhausted. " +
      "Check usage at https://console.x.ai and add credits if needed."
    );
  }
  return (
    "Tüm xAI modelleri denendi; ücretsiz kredi veya kota tükenmiş olabilir. " +
    "https://console.x.ai adresinden kullanımı kontrol edin ve gerekirse kredi ekleyin."
  );
}

function buildResponsesBody(
  config: XaiModelConfig,
  input: XaiInputMessage[]
): Record<string, unknown> {
  const body: Record<string, unknown> = {
    model: config.id,
    input,
    max_output_tokens: MAX_OUTPUT_TOKENS,
    store: false,
    temperature: 0.3,
  };

  if (config.reasoning) {
    body.reasoning = { effort: config.reasoning };
  }

  return body;
}

function extractResponsesReply(data: {
  output_text?: string;
  output?: XaiOutputItem[];
}): string {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const parts: string[] = [];
  for (const item of data.output ?? []) {
    if (item.type !== "message") continue;
    for (const block of item.content ?? []) {
      if (
        (block.type === "output_text" || block.type === "text") &&
        block.text?.trim()
      ) {
        parts.push(block.text.trim());
      }
    }
  }

  return parts.join("\n").trim();
}

function extractChatCompletionReply(data: {
  choices?: Array<{ message?: { content?: string } }>;
}): string {
  const content = data.choices?.[0]?.message?.content;
  return typeof content === "string" ? content.trim() : "";
}

async function callXaiResponses(
  apiKey: string,
  config: XaiModelConfig,
  input: XaiInputMessage[]
) {
  return fetch("https://api.x.ai/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(buildResponsesBody(config, input)),
  });
}

async function callXaiChatCompletions(
  apiKey: string,
  config: XaiModelConfig,
  input: XaiInputMessage[]
) {
  return fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.id,
      messages: input,
      max_tokens: MAX_OUTPUT_TOKENS,
      temperature: 0.3,
    }),
  });
}

type XaiSuccess = {
  ok: true;
  model: XaiModelConfig;
  data: Record<string, unknown>;
  via: "responses" | "chat-completions";
};

type XaiFailure = {
  ok: false;
  error: string;
  quotaExceeded: boolean;
  authError: boolean;
};

async function tryModel(
  apiKey: string,
  config: XaiModelConfig,
  input: XaiInputMessage[]
): Promise<
  | XaiSuccess
  | { ok: false; error: string; quotaExceeded: boolean; authError: boolean; retry: boolean }
> {
  const attempts = [
    { via: "responses" as const, call: callXaiResponses },
    { via: "chat-completions" as const, call: callXaiChatCompletions },
  ];

  let lastError = "xAI isteği başarısız oldu.";
  let lastQuota = false;

  for (const attempt of attempts) {
    const response = await attempt.call(apiKey, config, input);
    if (response.ok) {
      const data = (await response.json()) as Record<string, unknown>;
      return { ok: true, model: config, data, via: attempt.via };
    }

    const errText = await response.text();
    lastError = parseXaiError(errText);
    lastQuota = isQuotaExceeded(response.status, lastError);

    console.error(
      "xAI error",
      modelKey(config),
      attempt.via,
      response.status,
      errText.slice(0, 400)
    );

    if (isAuthError(response.status)) {
      return {
        ok: false,
        error: lastError,
        quotaExceeded: false,
        authError: true,
        retry: false,
      };
    }

    if (response.status === 404 || response.status === 400) {
      continue;
    }

    if (!shouldTryNextModel(response.status, lastError)) {
      break;
    }
  }

  return {
    ok: false,
    error: lastError,
    quotaExceeded: lastQuota,
    authError: false,
    retry: true,
  };
}

async function generateWithXai(
  apiKey: string,
  messages: ChatMessage[],
  systemPrompt: string
): Promise<XaiSuccess | XaiFailure> {
  const models = resolveModelCandidates();
  const input = toXaiInput(messages, systemPrompt);
  let lastError = "xAI isteği başarısız oldu.";
  let quotaFailures = 0;
  let attempts = 0;

  for (const config of models) {
    attempts += 1;
    const result = await tryModel(apiKey, config, input);

    if (result.ok) {
      return result;
    }

    lastError = result.error;

    if (result.authError) {
      return { ok: false, error: lastError, quotaExceeded: false, authError: true };
    }

    if (result.quotaExceeded) {
      quotaFailures += 1;
    }

    if (!result.retry) {
      break;
    }
  }

  return {
    ok: false,
    error: lastError,
    quotaExceeded: attempts > 0 && quotaFailures === attempts,
    authError: false,
  };
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "XAI_API_KEY tanımlı değil." },
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
    const cheapest = resolveModelCandidates()[0];
    const estimatedCost = estimateWorstCaseUsd(messages, systemPrompt, cheapest);
    if (dailyBudgetState.spentUsd + estimatedCost > DAILY_BUDGET_USD) {
      return NextResponse.json(
        {
          error:
            "Günlük asistan bütçesi doldu. Lütfen yarın tekrar deneyin veya limiti artırın.",
        },
        { status: 429 }
      );
    }

    const xaiResult = await generateWithXai(apiKey, messages, systemPrompt);

    if (!xaiResult.ok) {
      if (xaiResult.quotaExceeded) {
        return NextResponse.json(
          { error: quotaErrorMessage(locale) },
          { status: 429 }
        );
      }

      return NextResponse.json({ error: xaiResult.error }, { status: 502 });
    }

    const reply =
      xaiResult.via === "responses"
        ? extractResponsesReply(
            xaiResult.data as {
              output_text?: string;
              output?: XaiOutputItem[];
            }
          )
        : extractChatCompletionReply(
            xaiResult.data as {
              choices?: Array<{ message?: { content?: string } }>;
            }
          );

    if (!reply) {
      return NextResponse.json(
        { error: "Modelden yanıt alınamadı." },
        { status: 502 }
      );
    }

    dailyBudgetState.spentUsd += calculateActualUsd(
      xaiResult.data.usage as XaiUsage | undefined,
      xaiResult.model
    );

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "İstek işlenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
