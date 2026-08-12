"use client";

import {
  FaMapMarkerAlt,
  FaGlobe,
  FaInfoCircle,
  FaPaperPlane,
} from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Contact() {
  const { t } = useLanguage();

  const info = [
    {
      icon: FaMapMarkerAlt,
      title: t.contact.address,
      text: t.contact.addressText,
    },
    { icon: FaGlobe, title: t.contact.web, text: "www.abana.bel.tr" },
    {
      icon: FaInfoCircle,
      title: t.contact.info,
      text: t.contact.infoText,
    },
  ];

  return (
    <section
      id="iletisim"
      className="py-20 sm:py-28 bg-dark text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')] bg-cover bg-center opacity-5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary-light text-sm font-semibold tracking-widest uppercase">
            {t.contact.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            {t.contact.title}
          </h2>
          <div className="w-16 h-1 bg-primary-light mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {info.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="text-primary-light" />
                </div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(t.contact.success);
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder={t.contact.namePlaceholder}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-light transition-colors text-sm"
            />
            <input
              type="email"
              placeholder={t.contact.emailPlaceholder}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-light transition-colors text-sm"
            />
            <textarea
              placeholder={t.contact.messagePlaceholder}
              rows={5}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-light transition-colors resize-none text-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium transition-all hover:scale-105 text-sm"
            >
              {t.contact.send} <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
