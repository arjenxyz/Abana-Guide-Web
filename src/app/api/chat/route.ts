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

type GeminiUsage = {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
  totalTokenCount?: number;
};

type GroundingChunk = {
  web?: { uri?: string; title?: string };
};

type GroundingMetadata = {
  groundingChunks?: GroundingChunk[];
  webSearchQueries?: string[];
};

const SYSTEM_PROMPT_TR = `
Sen Abana (Kastamonu) için çalışan profesyonel bir turizm asistanısın.
Ziyaretçilere doğru, pratik ve etkili gezi rehberliği sağlarsın.

## Bilgi Kaynağı
- Cevaplarını Google Search ile güncel web araştırmasına dayandır.
- Resmi ve güvenilir kaynaklara öncelik ver: belediye siteleri, valilik, turizm portalları, yerel haber siteleri.
- Site içeriğine veya önceden tanımlı metinlere bağlı kalma; her soruda güncel bilgi ara.

## Kurallar
- Yanıt dili her zaman Türkçe
- Cevapları net, yardımcı ve turist odaklı ver (3-8 cümle)
- Somut öneriler sun: yer adı, mesafe, en iyi dönem, pratik ipuçları
- Abana dışı sorularda nazikçe Abana odağına dön
- Emin olmadığın bilgiyi uydurma; araştırma sonucu bulamazsan bunu açıkça belirt
- Konaklama, etkinlik saatleri gibi değişken bilgilerde mutlaka güncel web kaynağına dayan
`;

const SYSTEM_PROMPT_EN = `
You are a professional tourism assistant for Abana (Kastamonu, Turkey).
You provide accurate, practical and effective travel guidance to visitors.

## Information Source
- Base your answers on current web research via Google Search.
- Prioritize official and reliable sources: municipality websites, governorship, tourism portals, local news sites.
- Do not rely on predefined site content; search for up-to-date information for each question.

## Rules
- Always respond in English
- Give clear, helpful, tourist-focused answers (3-8 sentences)
- Offer concrete suggestions: place names, distances, best seasons, practical tips
- For off-topic questions, politely redirect to Abana
- Never fabricate uncertain information; state clearly if research yields no results
- For accommodation, event hours and variable info, always rely on current web sources
`;

function getSystemPrompt(locale: string): string {
  return locale === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_TR;
}

const MAX_OUTPUT_TOKENS = 500;
const RAW_GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const DEPRECATED_MODELS: Record<string, string> = {
  "gemini-2.0-flash": "gemini-2.5-flash",
  "gemini-2.0-flash-001": "gemini-2.5-flash",
  "gemini-2.0-flash-lite": "gemini-2.5-flash-lite",
  "gemini-1.5-flash": "gemini-2.5-flash",
  "gemini-1.5-pro": "gemini-2.5-flash",
};
const GEMINI_MODEL = DEPRECATED_MODELS[RAW_GEMINI_MODEL] ?? RAW_GEMINI_MODEL;
const USE_GOOGLE_SEARCH = process.env.GEMINI_USE_SEARCH !== "false";
const RATE_LIMIT_PER_MINUTE = Number(
  process.env.CHAT_RATE_LIMIT_PER_MINUTE ?? 20
);
const RATE_LIMIT_PER_DAY = Number(process.env.CHAT_RATE_LIMIT_PER_DAY ?? 200);
const DAILY_BUDGET_USD = Number(process.env.CHAT_DAILY_BUDGET_USD ?? 3);
const INPUT_COST_PER_1M = Number(process.env.GEMINI_INPUT_COST_PER_1M ?? 0.1);
const OUTPUT_COST_PER_1M = Number(
  process.env.GEMINI_OUTPUT_COST_PER_1M ?? 0.4
);

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

function estimateWorstCaseUsd(messages: ChatMessage[], systemPrompt: string): number {
  const estimatedInputTokens = estimateInputTokens(messages, systemPrompt);
  const inputCost = (estimatedInputTokens / 1_000_000) * INPUT_COST_PER_1M;
  const outputCost = (MAX_OUTPUT_TOKENS / 1_000_000) * OUTPUT_COST_PER_1M;
  return inputCost + outputCost;
}

function calculateActualUsd(usage?: GeminiUsage): number {
  if (!usage) return 0;
  const inputTokens = usage.promptTokenCount ?? 0;
  const outputTokens = usage.candidatesTokenCount ?? 0;
  const inputCost = (inputTokens / 1_000_000) * INPUT_COST_PER_1M;
  const outputCost = (outputTokens / 1_000_000) * OUTPUT_COST_PER_1M;
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

function toGeminiContents(messages: ChatMessage[]) {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.text }],
  }));
}

function extractSources(metadata?: GroundingMetadata): string[] {
  if (!metadata?.groundingChunks) return [];
  const seen = new Set<string>();
  const sources: string[] = [];

  for (const chunk of metadata.groundingChunks) {
    const uri = chunk.web?.uri;
    const title = chunk.web?.title;
    if (uri && !seen.has(uri)) {
      seen.add(uri);
      sources.push(title ? `${title} (${uri})` : uri);
    }
  }
  return sources.slice(0, 3);
}

function extractReply(
  parts?: Array<{ text?: string; thought?: boolean }>
): string {
  if (!parts?.length) return "";
  return parts
    .filter((part) => part.text && !part.thought)
    .map((part) => part.text?.trim() ?? "")
    .filter(Boolean)
    .join("\n")
    .trim();
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY tanımlı değil." },
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
    const estimatedCost = estimateWorstCaseUsd(messages, systemPrompt);
    if (dailyBudgetState.spentUsd + estimatedCost > DAILY_BUDGET_USD) {
      return NextResponse.json(
        {
          error:
            "Günlük asistan bütçesi doldu. Lütfen yarın tekrar deneyin veya limiti artırın.",
        },
        { status: 429 }
      );
    }

    const requestBody: Record<string, unknown> = {
      systemInstruction: {
        parts: [{ text: systemPrompt.trim() }],
      },
      contents: toGeminiContents(messages),
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        thinkingConfig: { thinkingBudget: 0 },
      },
    };

    if (USE_GOOGLE_SEARCH) {
      requestBody.tools = [{ google_search: {} }];
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error("Gemini error", geminiResponse.status, errText.slice(0, 500));
      return NextResponse.json(
        {
          error:
            geminiResponse.status === 404
              ? "Gemini modeli artık kullanılamıyor. Lütfen GEMINI_MODEL değerini gemini-2.5-flash olarak güncelleyin."
              : "Gemini isteği başarısız oldu.",
        },
        { status: 502 }
      );
    }

    const data = (await geminiResponse.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string; thought?: boolean }>;
        };
        groundingMetadata?: GroundingMetadata;
      }>;
      usageMetadata?: GeminiUsage;
    };

    const candidate = data.candidates?.[0];
    const reply = extractReply(candidate?.content?.parts);
    if (!reply) {
      return NextResponse.json(
        { error: "Modelden yanıt alınamadı." },
        { status: 502 }
      );
    }

    const sources = extractSources(candidate?.groundingMetadata);
    const label = locale === "en" ? "Sources" : "Kaynaklar";
    const finalReply =
      sources.length > 0 ? `${reply}\n\n${label}: ${sources.join(" | ")}` : reply;

    const actualCost = calculateActualUsd(data.usageMetadata);
    dailyBudgetState.spentUsd += actualCost;

    return NextResponse.json({ reply: finalReply });
  } catch {
    return NextResponse.json(
      { error: "İstek işlenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
