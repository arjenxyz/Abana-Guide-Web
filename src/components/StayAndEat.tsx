"use client";

import { useEffect, useState } from "react";
import {
  FaBed,
  FaBus,
  FaExternalLinkAlt,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaUtensils,
} from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageProvider";
import { dining, lodging, telHref } from "@/lib/stay-and-eat";
import { PlacesGrid } from "@/components/Places";
import { TransportPlanner } from "@/components/Transport";

type Tab = "places" | "lodging" | "dining" | "transport";

function tabHash(tab: Tab) {
  if (tab === "places") return "#yerler";
  if (tab === "transport") return "#ulasim";
  return "#konaklama";
}

export default function StayAndEat() {
  const { locale, t } = useLanguage();
  const [tab, setTab] = useState<Tab>("places");
  const placesCount = t.places.items.length;

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash === "#yerler") {
        setTab("places");
      } else if (hash === "#ulasim") {
        setTab("transport");
      } else if (hash === "#konaklama") {
        setTab("lodging");
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const items = tab === "lodging" ? lodging : dining;
  const countLabel =
    tab === "places"
      ? t.stayEat.placesCount.replace("{n}", String(placesCount))
      : tab === "lodging"
        ? t.stayEat.lodgingCount.replace("{n}", String(lodging.length))
        : tab === "dining"
          ? t.stayEat.diningCount.replace("{n}", String(dining.length))
          : t.stayEat.transportSubtitle;

  const handleTabChange = (next: Tab) => {
    setTab(next);
    window.history.replaceState(null, "", tabHash(next));
  };

  return (
    <section id="konaklama" className="py-20 sm:py-28 bg-white scroll-mt-24">
      <div id="yerler" className="scroll-mt-24" aria-hidden="true" />
      <div id="ulasim" className="scroll-mt-24" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t.stayEat.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-dark">
            {t.stayEat.title}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
          <p className="mt-5 max-w-2xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
            {t.stayEat.intro}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 max-w-5xl mx-auto">
          <div className="inline-flex flex-wrap justify-center rounded-full bg-gray-100 p-1 self-center sm:self-auto">
            <button
              type="button"
              onClick={() => handleTabChange("places")}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === "places"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-dark"
              }`}
            >
              <FaMapMarkedAlt /> {t.stayEat.tabPlaces}
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("lodging")}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === "lodging"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-dark"
              }`}
            >
              <FaBed /> {t.stayEat.tabLodging}
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("dining")}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === "dining"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-dark"
              }`}
            >
              <FaUtensils /> {t.stayEat.tabDining}
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("transport")}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === "transport"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-dark"
              }`}
            >
              <FaBus /> {t.stayEat.tabTransport}
            </button>
          </div>
          <p className="text-center sm:text-right text-sm text-gray-500 shrink-0">
            {countLabel}
          </p>
        </div>

        {tab === "places" ? (
          <PlacesGrid />
        ) : tab === "transport" ? (
          <div>
            <p className="text-center text-sm text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
              {t.transport.intro}
            </p>
            <TransportPlanner />
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {items.map((item) => {
                const copy = item[locale];
                const website =
                  tab === "lodging"
                    ? lodging.find((entry) => entry.id === item.id)?.website
                    : undefined;

                return (
                  <article
                    key={item.id}
                    className="group flex flex-col rounded-2xl border border-gray-100 bg-gray-50/80 p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <span className="inline-flex self-start rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 mb-3">
                      {copy.type}
                    </span>
                    <h3 className="font-bold text-lg text-dark leading-snug mb-2">
                      {copy.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-3">
                      {copy.desc}
                    </p>
                    {copy.specialty && (
                      <p className="text-xs text-primary font-medium mb-3">
                        {t.stayEat.specialty}: {copy.specialty}
                      </p>
                    )}
                    <div className="mt-auto space-y-2 pt-3 border-t border-gray-200/80">
                      <p className="flex items-start gap-2 text-xs text-gray-500">
                        <FaMapMarkerAlt className="text-primary mt-0.5 shrink-0" />
                        {copy.area}
                      </p>
                      {item.phone && (
                        <a
                          href={telHref(item.phone)}
                          className="inline-flex items-center gap-2 text-sm font-medium text-dark hover:text-primary transition-colors"
                        >
                          <FaPhone className="text-primary text-xs" />
                          {item.phone}
                        </a>
                      )}
                      {website && (
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                        >
                          {t.stayEat.website}{" "}
                          <FaExternalLinkAlt className="text-[10px]" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="mt-8 max-w-3xl mx-auto text-center text-xs sm:text-sm text-gray-500 leading-relaxed">
              {t.stayEat.note}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
