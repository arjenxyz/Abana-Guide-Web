# Abana Guide

A bilingual travel guide for **Abana**, a quiet Black Sea town in Kastamonu, Turkey.

Plan your trip in one place — places to visit, lodging, dining, and how to get there from Kastamonu — with an AI travel assistant for quick questions.

> **Not an official municipality website.** This is a volunteer project by [Arjen](https://github.com/arjenxyz). For official information, visit [abana.bel.tr](https://www.abana.bel.tr).

---

## Features

- **Places to visit** — canyons, viewpoints, beaches, forests, and historic sites
- **Stay & eat** — hotels, pensions, restaurants, and cafés with contact details
- **Transport planner** — Kastamonu-first guide (airport → bus station → Abana)
- **Photo gallery** — on-location images from Abana
- **AI chatbot** — tourism Q&A powered by Groq (Llama), with TR/EN replies
- **Bilingual UI** — Turkish and English throughout

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Language | TypeScript |
| Chat API | [Groq](https://console.groq.com) (`llama-3.3-70b-versatile` by default) |
| Deploy | Vercel-ready |

---

## Getting started

### Prerequisites

- Node.js 20+
- A free [Groq API key](https://console.groq.com) (no credit card required)

### Install

```bash
git clone https://github.com/arjenxyz/Abana-Guide-Web.git
cd Abana-Guide-Web
npm install
```

### Environment

Copy the example env file and add your key:

```bash
cp .env.example .env.local
```

```env
GROQ_API_KEY=gsk_your_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

Optional knobs (defaults are fine for most use):

| Variable | Default | Purpose |
| --- | --- | --- |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | Primary chat model |
| `GROQ_MODELS` | — | Comma-separated fallback list |
| `CHAT_RATE_LIMIT_PER_MINUTE` | `20` | Per-IP request cap |
| `CHAT_RATE_LIMIT_PER_DAY` | `200` | Per-IP daily cap |
| `CHAT_DAILY_BUDGET_USD` | `3` | Soft spend guard for the chat route |

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve the build
```

---

## Project layout

```
src/
  app/                 # Next.js routes + /api/chat
  components/          # UI sections (Hero, StayAndEat, Gallery, Chatbot, …)
  i18n/                # TR/EN translations + language provider
  lib/                 # lodging/dining data, photos, gallery helpers
public/photos/         # Optimized on-location images
```

The main guide section (`StayAndEat`) combines **places**, **lodging**, **dining**, and **transport** behind one tabbed interface (`#yerler`, `#konaklama`, `#ulasim`).

---

## Chat assistant

The floating chatbot calls `/api/chat`, which:

1. Uses your `GROQ_API_KEY` against Groq’s OpenAI-compatible API
2. Falls back across production models if one hits a rate limit
3. Applies per-IP rate limits and a daily soft budget

Recommended models on the free tier:

| Model | Notes |
| --- | --- |
| `llama-3.3-70b-versatile` | Best quality for tourism chat (default) |
| `llama-3.1-8b-instant` | Fastest / highest free daily limits |

---

## Deploy

Connect the repo to [Vercel](https://vercel.com), set `GROQ_API_KEY` (and optional `GROQ_MODEL`) for Production / Preview / Development, then deploy.

---

## Disclaimer

Listings, hours, and transport details can change with the season. Always call ahead to confirm. This site is independent of Abana Municipality and is maintained as a volunteer guide for visitors.

---

## License

Private / personal project unless otherwise stated. Photos and content courtesy of the Abana Guide contributors.
