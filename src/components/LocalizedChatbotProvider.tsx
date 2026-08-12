"use client";

import { type ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ChatbotProvider } from "@/components/ChatbotProvider";

export default function LocalizedChatbotProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { locale } = useLanguage();
  return <ChatbotProvider key={locale}>{children}</ChatbotProvider>;
}
