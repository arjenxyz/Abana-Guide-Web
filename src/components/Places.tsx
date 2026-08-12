"use client";

import {
  FaHiking,
  FaBinoculars,
  FaTree,
  FaWater,
  FaMountain,
  FaMosque,
  FaMapMarkerAlt,
  FaWalking,
  FaCamera,
  FaLeaf,
  FaSun,
  FaCampground,
  FaLandmark,
} from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageProvider";

const placeImages = [
  "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=600&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&q=80",
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
];

const badgeIcons = [FaHiking, FaBinoculars, FaTree, FaWater, FaMountain, FaMosque];
const metaIcons = [
  [FaMapMarkerAlt, FaWalking],
  [FaMapMarkerAlt, FaCamera],
  [FaMapMarkerAlt, FaLeaf],
  [FaMapMarkerAlt, FaSun],
  [FaMapMarkerAlt, FaCampground],
  [FaMapMarkerAlt, FaLandmark],
];

export default function Places() {
  const { t } = useLanguage();

  return (
    <section id="yerler" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t.places.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-dark">
            {t.places.title}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.places.items.map((p, i) => {
            const BadgeIcon = badgeIcons[i];
            const icons = metaIcons[i];
            return (
              <div
                key={p.title}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={placeImages[i]}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <BadgeIcon /> {p.badge}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-bold text-lg text-dark mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {p.desc}
                  </p>
                  <div className="flex gap-4 text-xs text-gray-400">
                    {p.meta.map((text, j) => {
                      const MetaIcon = icons[j];
                      return (
                        <span key={j} className="flex items-center gap-1">
                          <MetaIcon className="text-primary" /> {text}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
