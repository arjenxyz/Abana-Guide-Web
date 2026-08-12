"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageProvider";
import { galleryPhotos } from "@/lib/gallery";

export default function Gallery() {
  const { locale, t } = useLanguage();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const images = galleryPhotos.map((img) => ({
    ...img,
    label: locale === "en" ? img.en : img.tr,
  }));

  const previewCount = 9;
  const visibleImages = expanded ? images : images.slice(0, previewCount);
  const hiddenCount = images.length - previewCount;

  const close = useCallback(() => setLightbox(null), []);

  const go = useCallback(
    (direction: number) => {
      setLightbox((current) => {
        if (current === null) return current;
        return (current + direction + images.length) % images.length;
      });
    },
    [images.length]
  );

  useEffect(() => {
    if (lightbox === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, go]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx > 50) go(-1);
    if (dx < -50) go(1);
  };

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

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {visibleImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group text-left"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all" />
            </button>
          ))}
        </div>

        {hiddenCount > 0 && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-dark shadow-sm transition hover:border-primary hover:text-primary"
            >
              {expanded
                ? t.gallery.showLess
                : `${t.gallery.showMore} · ${images.length}`}
            </button>
          </div>
        )}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            className="absolute top-5 right-5 z-20 text-white text-2xl hover:text-primary-light transition-colors p-2"
            onClick={close}
            aria-label={t.gallery.close}
          >
            <FaTimes />
          </button>

          <button
            type="button"
            className="absolute left-3 sm:left-6 z-20 h-12 w-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(event) => {
              event.stopPropagation();
              go(-1);
            }}
            aria-label={t.gallery.prev}
          >
            <FaChevronLeft />
          </button>

          <img
            src={images[lightbox].src}
            alt={images[lightbox].label}
            className="max-w-[92vw] max-h-[82vh] rounded-xl object-contain select-none"
            onClick={(event) => event.stopPropagation()}
            draggable={false}
          />

          <button
            type="button"
            className="absolute right-3 sm:right-6 z-20 h-12 w-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(event) => {
              event.stopPropagation();
              go(1);
            }}
            aria-label={t.gallery.next}
          >
            <FaChevronRight />
          </button>

          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm text-center px-4"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="font-medium">{images[lightbox].label}</p>
            <p className="text-white/50 mt-1">
              {lightbox + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
