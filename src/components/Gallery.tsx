"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageProvider";
import { photos } from "@/lib/photos";

const galleryImages = [
  { src: photos.sahil, span: "col-span-2 row-span-2" },
  { src: photos.gokkusagi, span: "" },
  { src: photos.yesilyuva, span: "" },
  { src: photos.piknik, span: "" },
  { src: photos.kordon, span: "" },
  { src: photos.gunbatimi, span: "" },
  { src: photos.konak, span: "" },
  { src: photos.palmiye, span: "col-span-2" },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const images = galleryImages.map((img, i) => ({
    ...img,
    label: t.gallery.items[i],
  }));

  return (
    <section id="galeri" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t.gallery.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-dark">
            {t.gallery.title}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[200px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${img.span}`}
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end p-4">
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all text-sm">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-2xl hover:text-primary-light transition-colors"
            onClick={() => setLightbox(null)}
          >
            <FaTimes />
          </button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].label}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
          />
        </div>
      )}
    </section>
  );
}
