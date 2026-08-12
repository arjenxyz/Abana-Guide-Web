"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";

const slideHrefs = ["#yerler", "#hakkinda", "#aktiviteler"];

export default function Hero() {
  const { locale, t } = useLanguage();
  const slides = t.hero.slides.map((slide, i) => ({
    ...slide,
    href: slideHrefs[i],
    image: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80",
    ][i],
  }));

  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [slides.length]
  );
  const prev = () =>
    setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section key={locale} id="hero" className="relative h-screen overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                i === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 absolute"
              }`}
            >
              {i === current && (
                <>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mb-6 sm:mb-8">
                    {slide.desc}
                  </p>
                  <Link
                    href={slide.href}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all hover:scale-105 text-sm sm:text-base"
                  >
                    {slide.cta} <FaArrowRight />
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all hidden sm:flex"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all hidden sm:flex"
      >
        <FaChevronRight />
      </button>
    </section>
  );
}
