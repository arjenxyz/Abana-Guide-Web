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

      <div className="relative z-10 flex h-full items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:static sm:translate-y-0 sm:shrink-0"
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>

        <div className="relative mx-auto w-full min-w-0 flex-1 max-w-7xl px-2 sm:px-4 lg:px-6">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                i === current
                  ? "opacity-100 translate-y-0"
                  : "pointer-events-none absolute opacity-0 translate-y-8"
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

        <button
          onClick={next}
          className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:static sm:translate-y-0 sm:shrink-0"
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>
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
    </section>
  );
}
