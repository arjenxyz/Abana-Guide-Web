"use client";

import { FaCar, FaBus, FaPlane, FaClock, FaLightbulb } from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageProvider";

const transportIcons = [FaCar, FaBus, FaPlane];

export default function Transport() {
  const { t } = useLanguage();

  return (
    <section id="ulasim" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t.transport.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-dark">
            {t.transport.title}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
          <p className="mt-6 max-w-3xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
            {t.transport.intro}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {t.transport.items.map((o, i) => {
            const Icon = transportIcons[i];
            return (
              <div
                key={o.title}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-lg transition-all text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="text-xl text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-dark">{o.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {o.desc}
                </p>
                <ul className="space-y-2">
                  {o.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm text-gray-600 leading-relaxed pl-3 border-l-2 border-primary/30"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10">
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <FaClock className="text-primary" />
              <h3 className="font-bold text-lg text-dark">
                {t.transport.distancesTitle}
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {t.transport.distances.map((row) => (
                <div
                  key={row.from}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="font-medium text-dark">{row.from}</span>
                  <span className="text-gray-500">
                    {row.km} · {row.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <FaLightbulb className="text-primary" />
              <h3 className="font-bold text-lg text-dark">
                {t.transport.tipsTitle}
              </h3>
            </div>
            <ul className="space-y-3">
              {t.transport.tips.map((tip) => (
                <li
                  key={tip}
                  className="text-sm text-gray-600 leading-relaxed pl-3 border-l-2 border-primary/30"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="font-bold text-lg text-dark mb-4">
          {t.transport.mapTitle}
        </h3>
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
