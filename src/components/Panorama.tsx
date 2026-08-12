"use client";

import { useState } from "react";
import { FaExpand, FaExternalLinkAlt } from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageProvider";
import { panoramas } from "@/lib/photos";
import PanoramaPanner from "./PanoramaPanner";

const STREET_VIEW_SRC =
  "https://www.google.com/maps/embed?pb=!4v1755207415908!6m8!1m7!1sGNPXrSxAMKTvpuGMmjZPjg!2m2!1d41.97848899633668!2d34.00771216598288!3f29.455354239814724!4f-9.589814480380923!5f0.7820865974627469";

const OFFICIAL_TOUR_URL = "https://abana.bel.tr/360-sanal-tur";

export default function Panorama() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const scene = panoramas[active];
  const copy = t.panorama.scenes[active];

  return (
    <section id="panorama" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t.panorama.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-dark">
            {t.panorama.title}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
          <p className="mt-6 max-w-3xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
            {t.panorama.intro}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {t.panorama.scenes.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                index === active
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <div className="px-5 sm:px-7 py-4 border-b border-gray-100 bg-white">
            <h3 className="font-bold text-dark">{copy.title}</h3>
            <p className="text-sm text-gray-500">{copy.desc}</p>
          </div>
          <PanoramaPanner src={scene.src} alt={copy.title} />
        </div>

        <p className="mt-4 flex items-start sm:items-center gap-2 text-sm text-gray-500">
          <FaExpand className="mt-0.5 sm:mt-0 shrink-0 text-primary" />
          {t.panorama.hint}
        </p>

        <div className="mt-12 bg-gray-50 rounded-3xl overflow-hidden shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-7 py-4 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-dark">{t.panorama.location}</h3>
              <p className="text-sm text-gray-500">{t.panorama.locationDesc}</p>
            </div>
            <a
              href={OFFICIAL_TOUR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {t.panorama.openOfficial}
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
          <iframe
            src={STREET_VIEW_SRC}
            title={t.panorama.location}
            className="block w-full h-[320px] sm:h-[420px] border-0"
            allow="fullscreen; accelerometer; gyroscope"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
