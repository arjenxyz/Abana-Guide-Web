"use client";

import { FaCar, FaBus, FaPlane } from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageProvider";

const transportIcons = [FaCar, FaBus, FaPlane];

export default function Transport() {
  const { t } = useLanguage();

  return (
    <section id="ulasim" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t.transport.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-dark">
            {t.transport.title}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {t.transport.items.map((o, i) => {
            const Icon = transportIcons[i];
            return (
              <div
                key={o.title}
                className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-md hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-2xl text-primary" />
                </div>
                <h3 className="font-bold text-lg text-dark mb-2">{o.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{o.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-3xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24000!2d34.0167!3d41.9667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4087b8b8b8b8b8b8%3A0x0!2sAbana%2C+Kastamonu!5e0!3m2!1str!2str!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
