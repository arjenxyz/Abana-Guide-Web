"use client";

import {
  FaUmbrellaBeach,
  FaMountain,
  FaRoad,
  FaTemperatureHigh,
} from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageProvider";

const statIcons = [FaUmbrellaBeach, FaMountain, FaRoad, FaTemperatureHigh];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="hakkinda" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t.about.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-dark">
            {t.about.title}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              {t.about.p1}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">
              {t.about.p2}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {t.about.stats.map((s, i) => {
                const Icon = statIcons[i];
                return (
                  <div
                    key={s.label}
                    className="text-center p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="text-2xl text-primary mx-auto mb-2" />
                    <div className="font-bold text-dark text-lg">{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80"
                alt={t.about.beachAlt}
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-4 sm:p-6 rounded-2xl shadow-xl hidden sm:block">
              <div className="text-2xl sm:text-3xl font-bold">Abana</div>
              <div className="text-sm opacity-80">{t.about.location}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
