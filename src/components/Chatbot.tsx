"use client";

import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { useChatbot } from "./ChatbotProvider";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Chatbot() {
  const { t } = useLanguage();
  const {
    isOpen,
    close,
    input,
    setInput,
    isLoading,
    messages,
    canSend,
    sendMessage,
  } = useChatbot();

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 z-50 w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6">
      <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
        <div>
          <p className="text-sm font-semibold">{t.nav.assistant}</p>
          <p className="text-xs text-white/80">{t.chat.subtitle}</p>
        </div>
        <button
          onClick={close}
          className="rounded p-1 hover:bg-white/15"
          aria-label={t.chat.close}
        >
          <FaTimes />
        </button>
      </div>

      <div className="h-72 space-y-3 overflow-y-auto bg-slate-50 p-3">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
              message.role === "user"
                ? "ml-auto bg-primary text-white"
                : "bg-white text-slate-700"
            }`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="max-w-[85%] rounded-2xl bg-white px-3 py-2 text-sm text-slate-500">
            {t.chat.typing}
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 bg-white p-3">
        <div className="mb-2 flex flex-wrap gap-2">
          {t.chat.quickQuestions.map((question) => (
            <button
              key={question}
              onClick={() => void sendMessage(question)}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-600 transition hover:border-primary hover:text-primary"
            >
              {question}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void sendMessage(input);
              }
            }}
            placeholder={t.chat.placeholder}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary"
          />
          <button
            onClick={() => void sendMessage(input)}
            disabled={!canSend}
            className="rounded-xl bg-primary px-3 py-2 text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={t.chat.send}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
