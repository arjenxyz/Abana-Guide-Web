"use client";

import Link from "next/link";
import {
  FaWater,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0a1628] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaWater className="text-primary-light text-xl" />
              <span className="font-bold text-lg">ABANA</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">{t.footer.desc}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t.footer.quickLinks}</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="#hakkinda"
                className="text-white/50 hover:text-primary-light transition-colors text-sm"
              >
                {t.nav.about}
              </Link>
              <Link
                href="#yerler"
                className="text-white/50 hover:text-primary-light transition-colors text-sm"
              >
                {t.nav.places}
              </Link>
              <Link
                href="#aktiviteler"
                className="text-white/50 hover:text-primary-light transition-colors text-sm"
              >
                {t.nav.activities}
              </Link>
              <Link
                href="#panorama"
                className="text-white/50 hover:text-primary-light transition-colors text-sm"
              >
                {t.nav.panorama}
              </Link>
              <Link
                href="#ulasim"
                className="text-white/50 hover:text-primary-light transition-colors text-sm"
              >
                {t.nav.transport}
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t.footer.usefulLinks}</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.abana.bel.tr"
                target="_blank"
                className="text-white/50 hover:text-primary-light transition-colors text-sm"
              >
                {t.footer.municipality}
              </a>
              <a
                href="https://www.abanahaber.com"
                target="_blank"
                className="text-white/50 hover:text-primary-light transition-colors text-sm"
              >
                {t.footer.news}
              </a>
              <a
                href="https://www.kastamonu.gov.tr"
                target="_blank"
                className="text-white/50 hover:text-primary-light transition-colors text-sm"
              >
                {t.footer.governorship}
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t.footer.social}</h4>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-white/5 hover:bg-primary/20 rounded-xl flex items-center justify-center text-white/50 hover:text-primary-light transition-all"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-white/30 text-sm space-y-1">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.photoCredit}</p>
        </div>
      </div>
    </footer>
  );
}
