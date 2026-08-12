"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

type Message = {
  role: "bot" | "user";
  text: string;
};

type ChatbotContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  messages: Message[];
  canSend: boolean;
  sendMessage: (text: string) => Promise<void>;
};

const ChatbotContext = createContext<ChatbotContextValue | null>(null);

export function useChatbot() {
  const ctx = useContext(ChatbotContext);
  if (!ctx) {
    throw new Error("useChatbot must be used within ChatbotProvider");
  }
  return ctx;
}

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const { locale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: t.chat.welcome },
  ]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading]
  );

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", text: trimmed };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          messages: nextMessages.map((m) => ({
            role: m.role === "bot" ? "assistant" : "user",
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("API yanıtı başarısız.");
      }

      const data = (await response.json()) as { reply?: string };
      const reply = data.reply?.trim() || t.chat.noReply;

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: t.chat.error },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const value: ChatbotContextValue = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
    input,
    setInput,
    isLoading,
    messages,
    canSend,
    sendMessage,
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
}
