"use client";

import { useEffect, useRef } from "react";
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (!isMobile) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 sm:hidden"
        onClick={close}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 z-[70] flex flex-col bg-white sm:inset-auto sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto sm:h-[min(620px,calc(100vh-5rem))] sm:w-[min(400px,calc(100vw-3rem))] sm:overflow-hidden sm:rounded-2xl sm:border sm:border-slate-200 sm:shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.assistant}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-primary px-4 py-4 text-white sm:py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 sm:h-9 sm:w-9">
              <FaComments className="text-sm" />
            </div>
            <div>
              <p className="text-base font-semibold sm:text-sm">
                {t.nav.assistant}
              </p>
              <p className="text-xs text-white/80">{t.chat.subtitle}</p>
            </div>
          </div>
          <button
            onClick={close}
            className="rounded-full p-2 transition hover:bg-white/15"
            aria-label={t.chat.close}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4 sm:min-h-0">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                message.role === "user"
                  ? "ml-auto bg-primary text-white"
                  : "bg-white text-slate-700 shadow-sm"
              }`}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div className="max-w-[88%] rounded-2xl bg-white px-4 py-2.5 text-sm text-slate-500 shadow-sm">
              {t.chat.typing}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div
          className="shrink-0 border-t border-slate-200 bg-white p-4 sm:p-3"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {t.chat.quickQuestions.map((question) => (
              <button
                key={question}
                onClick={() => void sendMessage(question)}
                className="shrink-0 rounded-full border border-slate-300 px-3 py-1.5 text-xs text-slate-600 transition hover:border-primary hover:text-primary active:bg-primary/5"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-2">
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
              className="min-h-[44px] w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none transition focus:border-primary sm:min-h-[40px] sm:text-sm"
            />
            <button
              onClick={() => void sendMessage(input)}
              disabled={!canSend}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
              aria-label={t.chat.send}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
