"use client";

import { FaComments } from "react-icons/fa";
import { useChatbot } from "./ChatbotProvider";
import { useLanguage } from "@/i18n/LanguageProvider";

type ChatbotTriggerProps = {
  scrolled: boolean;
  className?: string;
};

export default function ChatbotTrigger({
  scrolled,
  className = "",
}: ChatbotTriggerProps) {
  const { open } = useChatbot();
  const { t } = useLanguage();

  return (
    <button
      onClick={open}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap bg-transparent ${
        scrolled
          ? "text-gray-700 hover:text-primary"
          : "text-white/90 hover:text-white"
      } ${className}`}
      aria-label={t.chat.open}
    >
      <FaComments className="text-base" />
      {t.nav.assistant}
    </button>
  );
}
