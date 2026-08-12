"use client";

import {
  FaHiking,
  FaSwimmer,
  FaCameraRetro,
  FaCampground,
  FaFish,
  FaUtensils,
} from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageProvider";
import { photos } from "@/lib/photos";

const activityIcons = [
  FaHiking,
  FaSwimmer,
  FaCameraRetro,
  FaCampground,
  FaFish,
  FaUtensils,
];

export default function Activities() {
  const { t } = useLanguage();

  return (
    <section
      id="aktiviteler"
      className="py-20 sm:py-28 bg-dark text-white relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url('${photos.piknik}')` }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary-light text-sm font-semibold tracking-widest uppercase">
            {t.activities.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            {t.activities.title}
          </h2>
          <div className="w-16 h-1 bg-primary-light mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.activities.items.map((a, i) => {
            const Icon = activityIcons[i];
            return (
              <div
                key={a.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 text-center hover:bg-white/10 transition-all group"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                  <Icon className="text-2xl text-primary-light" />
                </div>
                <h3 className="font-bold text-lg mb-2">{a.title}</h3>
                <p className="text-white/60 text-sm">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
