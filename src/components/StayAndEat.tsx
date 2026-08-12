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

  const tabItems: {
    id: Tab;
    icon: typeof FaBed;
    label: string;
    shortLabel: string;
  }[] = [
    {
      id: "places",
      icon: FaMapMarkedAlt,
      label: t.stayEat.tabPlaces,
      shortLabel: t.stayEat.tabPlacesShort,
    },
    {
      id: "lodging",
      icon: FaBed,
      label: t.stayEat.tabLodging,
      shortLabel: t.stayEat.tabLodging,
    },
    {
      id: "dining",
      icon: FaUtensils,
      label: t.stayEat.tabDining,
      shortLabel: t.stayEat.tabDining,
    },
    {
      id: "transport",
      icon: FaBus,
      label: t.stayEat.tabTransport,
      shortLabel: t.stayEat.tabTransport,
    },
  ];

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

        <div className="mb-8 max-w-4xl mx-auto">
          <div
            role="tablist"
            aria-label={t.stayEat.tag}
            className="grid grid-cols-2 gap-2 p-2 bg-gray-100 rounded-2xl lg:grid-cols-4 lg:gap-1.5"
          >
            {tabItems.map(({ id, icon: Icon, label, shortLabel }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleTabChange(id)}
                  className={`inline-flex min-h-[3.25rem] lg:min-h-0 flex-col lg:flex-row items-center justify-center gap-1.5 rounded-xl lg:rounded-full px-2 py-3 lg:py-2.5 text-xs lg:text-sm font-semibold transition-colors ${
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:text-dark hover:bg-white/60"
                  }`}
                >
                  <Icon className="text-base lg:text-sm shrink-0" aria-hidden />
                  <span className="lg:hidden leading-tight text-center">
                    {shortLabel}
                  </span>
                  <span className="hidden lg:inline whitespace-nowrap">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-center text-sm text-gray-500 px-1">
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
