"use client";

import { useState, useEffect } from "react";
import { FaWater, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import ChatbotTrigger from "./ChatbotTrigger";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#hero", label: t.nav.home },
    { href: "#hakkinda", label: t.nav.about },
    { href: "#yerler", label: t.nav.places },
    { href: "#aktiviteler", label: t.nav.activities },
    { href: "#galeri", label: t.nav.gallery },
    { href: "#ulasim", label: t.nav.transport },
    { href: "#iletisim", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        <Link href="#hero" className="relative z-10 flex items-center gap-2">
          <FaWater
            className={`text-2xl ${scrolled ? "text-primary" : "text-white"}`}
          />
          <div className="flex flex-col leading-tight">
            <span
              className={`font-bold text-lg tracking-wide ${
                scrolled ? "text-dark" : "text-white"
              }`}
            >
              ABANA
            </span>
            <span
              className={`text-[10px] tracking-widest uppercase ${
                scrolled ? "text-primary" : "text-white/80"
              }`}
            >
              {t.nav.guide}
            </span>
          </div>
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex items-center gap-1">
          <ChatbotTrigger scrolled={scrolled} />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                scrolled
                  ? "text-gray-700 hover:text-primary hover:bg-primary/5"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <LanguageSwitcher scrolled={scrolled} />
          <div className="flex items-center gap-1 lg:hidden">
            <ChatbotTrigger scrolled={scrolled} />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`text-xl p-2 ${
                scrolled ? "text-dark" : "text-white"
              }`}
              aria-label={t.nav.menu}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden bg-white shadow-xl border-t">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary border-b border-gray-100 text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
