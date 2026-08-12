"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

type LanguageSwitcherProps = {
  scrolled?: boolean;
};

export default function LanguageSwitcher({
  scrolled = false,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`flex items-center gap-1 rounded-lg p-0.5 text-xs font-semibold ${
        scrolled ? "text-gray-600" : "text-white/90"
      }`}
    >
      <button
        onClick={() => setLocale("tr")}
        className={`rounded-md px-2 py-1 transition-colors ${
          locale === "tr"
            ? scrolled
              ? "bg-primary/10 text-primary"
              : "bg-white/20 text-white"
            : "hover:opacity-80"
        }`}
        aria-label="Türkçe"
      >
        TR
      </button>
      <span className="opacity-40">|</span>
      <button
        onClick={() => setLocale("en")}
        className={`rounded-md px-2 py-1 transition-colors ${
          locale === "en"
            ? scrolled
              ? "bg-primary/10 text-primary"
              : "bg-white/20 text-white"
            : "hover:opacity-80"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
