"use client";

import { useState } from "react";
import {
  FaArrowLeft,
  FaBus,
  FaCar,
  FaExternalLinkAlt,
  FaMapMarkedAlt,
  FaPhone,
  FaPlane,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageProvider";

type Origin = "airport" | "station";
type Mode = "minibus" | "car";
type Step = 1 | 2 | 3;

const MAPS = {
  airportToStation:
    "https://www.google.com/maps/dir/Kastamonu+Havalimanı/Kastamonu+Otogarı",
  stationToAbana:
    "https://www.google.com/maps/dir/Kastamonu+Otogarı/Abana,+Kastamonu",
  airportToStationEmbed:
    "https://maps.google.com/maps?saddr=Kastamonu+Havalimanı&daddr=Kastamonu+Otogarı&hl=tr&z=11&output=embed",
  stationToAbanaEmbed:
    "https://maps.google.com/maps?saddr=Kastamonu+Otogarı&daddr=Abana,+Kastamonu&hl=tr&z=10&output=embed",
};

function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

function MapEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-100">
      <iframe
        src={src}
        width="100%"
        height="200"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  );
}

function MapsLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-full text-sm font-medium transition-colors"
    >
      {label} <FaExternalLinkAlt className="text-xs" />
    </a>
  );
}

function ChoiceButton({
  icon: Icon,
  title,
  hint,
  onClick,
}: {
  icon: typeof FaPlane;
  title: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left hover:border-primary/40 hover:bg-primary/5 transition-colors"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="text-lg" />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold text-dark">{title}</span>
        <span className="block text-xs text-gray-500 mt-0.5 leading-snug">
          {hint}
        </span>
      </span>
    </button>
  );
}

export default function Transport() {
  const { t } = useLanguage();
  const p = t.transport.planner;

  const [step, setStep] = useState<Step>(1);
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);

  const reset = () => {
    setStep(1);
    setOrigin(null);
    setMode(null);
  };

  const selectOrigin = (value: Origin) => {
    setOrigin(value);
    setMode(null);
    setStep(value === "airport" ? 2 : 3);
  };

  const progressSteps =
    origin === "airport"
      ? [
          { n: 1, label: p.stepStart },
          { n: 2, label: p.stepAirport },
          { n: 3, label: p.stepAbana },
        ]
      : [
          { n: 1, label: p.stepStart },
          { n: 3, label: p.stepAbana },
        ];

  return (
    <section id="ulasim" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t.transport.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-dark">
            {t.transport.title}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-3 rounded-full" />
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm leading-relaxed">
            {t.transport.intro}
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-2 px-4 sm:px-5 pt-4">
            {progressSteps.map((item) => (
              <div key={item.n} className="flex-1 min-w-0">
                <div
                  className={`h-1 rounded-full ${
                    step >= item.n ? "bg-primary" : "bg-gray-200"
                  }`}
                />
                <p
                  className={`mt-1.5 text-[10px] font-medium truncate ${
                    step >= item.n ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="p-4 sm:p-5">
              <h3 className="text-lg font-bold text-dark">{p.startQuestion}</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">{p.startHint}</p>
              <div className="space-y-2">
                <ChoiceButton
                  icon={FaPlane}
                  title={p.origins.airport}
                  hint={p.origins.airportHint}
                  onClick={() => selectOrigin("airport")}
                />
                <ChoiceButton
                  icon={FaBus}
                  title={p.origins.station}
                  hint={p.origins.stationHint}
                  onClick={() => selectOrigin("station")}
                />
              </div>
            </div>
          )}

          {step === 2 && origin === "airport" && (
            <div className="p-4 sm:p-5">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary mb-3"
              >
                <FaArrowLeft className="text-xs" /> {p.back}
              </button>
              <h3 className="text-lg font-bold text-dark">{p.airport.title}</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4 leading-relaxed">
                {p.airport.intro}
              </p>

              <div className="space-y-3 mb-4">
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5">
                  <div className="flex items-start gap-2.5">
                    <FaExclamationTriangle className="text-amber-600 mt-0.5 shrink-0 text-sm" />
                    <div>
                      <h4 className="font-semibold text-dark text-sm mb-0.5">
                        {p.airport.municipalTitle}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {p.airport.municipalDesc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                  <h4 className="font-semibold text-dark text-sm mb-0.5">
                    {p.airport.taxiTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {p.airport.taxiDesc}
                  </p>
                </div>
              </div>

              <div className="mb-2 flex items-center gap-2">
                <FaMapMarkedAlt className="text-primary text-sm" />
                <h4 className="font-semibold text-dark text-sm">
                  {p.airport.mapTitle}
                </h4>
              </div>
              <MapEmbed
                src={MAPS.airportToStationEmbed}
                title={p.airport.mapTitle}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <MapsLink
                  href={MAPS.airportToStation}
                  label={p.airport.mapCta}
                />
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center rounded-full border border-primary text-primary px-4 py-2.5 text-sm font-medium hover:bg-primary/5 transition-colors"
                >
                  {p.airport.continue}
                </button>
              </div>
            </div>
          )}

          {step === 3 && origin && (
            <div className="p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    if (origin === "airport") setStep(2);
                    else reset();
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary"
                >
                  <FaArrowLeft className="text-xs" /> {p.back}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs sm:text-sm font-medium text-gray-400 hover:text-primary"
                >
                  {p.changeStart}
                </button>
              </div>

              {!mode ? (
                <>
                  <h3 className="text-lg font-bold text-dark">
                    {p.modeQuestion}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">{p.modeHint}</p>
                  <div className="space-y-2">
                    <ChoiceButton
                      icon={FaBus}
                      title={p.modes.minibus}
                      hint={p.minibus.desc}
                      onClick={() => setMode("minibus")}
                    />
                    <ChoiceButton
                      icon={FaCar}
                      title={p.modes.car}
                      hint={p.car.desc}
                      onClick={() => setMode("car")}
                    />
                  </div>
                </>
              ) : mode === "minibus" ? (
                <>
                  <h3 className="text-lg font-bold text-dark">
                    {p.minibus.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 mb-3 leading-relaxed">
                    {p.minibus.desc}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 pl-3 border-l-2 border-primary/30">
                    {p.minibus.note}
                  </p>

                  <h4 className="font-semibold text-dark text-sm mb-2">
                    {p.minibus.operatorsTitle}
                  </h4>
                  <div className="space-y-2 mb-4">
                    {p.minibus.operators.map((op) => (
                      <div
                        key={op.name}
                        className="rounded-xl border border-gray-100 bg-gray-50 p-3"
                      >
                        <div className="font-semibold text-dark text-sm">
                          {op.name}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{op.route}</p>
                        <a
                          href={telHref(op.phone)}
                          className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-primary hover:underline"
                        >
                          <FaPhone className="text-xs" /> {op.phone}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                    <div className="text-xs text-gray-500">
                      {p.minibus.stationPhoneLabel}
                    </div>
                    <a
                      href={telHref(p.minibus.stationPhone)}
                      className="inline-flex items-center gap-1.5 mt-1 text-sm font-semibold text-dark hover:text-primary"
                    >
                      <FaPhone className="text-primary text-xs" />{" "}
                      {p.minibus.stationPhone}
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-dark">{p.car.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-3 leading-relaxed">
                    {p.car.desc}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {p.car.points.map((point) => (
                      <li
                        key={point}
                        className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-3 border-l-2 border-primary/30"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-2 flex items-center gap-2">
                    <FaMapMarkedAlt className="text-primary text-sm" />
                    <h4 className="font-semibold text-dark text-sm">
                      {p.car.mapTitle}
                    </h4>
                  </div>
                  <MapEmbed
                    src={MAPS.stationToAbanaEmbed}
                    title={p.car.mapTitle}
                  />
                  <div className="mt-3">
                    <MapsLink href={MAPS.stationToAbana} label={p.car.mapCta} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
