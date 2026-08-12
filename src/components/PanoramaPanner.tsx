"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  src: string;
  alt: string;
};

export default function PanoramaPanner({ src, alt }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const img = imgRef.current;
    if (!viewport || !img) return;

    const center = () => {
      const extra = img.clientWidth - viewport.clientWidth;
      if (extra > 0) viewport.scrollLeft = extra * 0.28;
    };

    if (img.complete) center();
    else img.addEventListener("load", center, { once: true });
  }, [src]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    drag.current = { x: event.clientX, left: viewport.scrollLeft };
    setGrabbing(true);
    viewport.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !drag.current) return;
    viewport.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
  };

  const endDrag = () => {
    drag.current = null;
    setGrabbing(false);
  };

  const nudge = (direction: number) => {
    viewportRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      <div
        ref={viewportRef}
        className={`overflow-x-auto overflow-y-hidden [scrollbar-width:thin] outline-none ${
          grabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            nudge(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            nudge(1);
          }
        }}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          draggable={false}
          className="block h-[360px] sm:h-[500px] lg:h-[560px] w-auto max-w-none select-none"
        />
      </div>

      <button
        type="button"
        onClick={() => nudge(-1)}
        className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-opacity hover:bg-black/60 sm:flex opacity-0 group-hover:opacity-100"
        aria-label="Pan left"
      >
        <FaChevronLeft />
      </button>
      <button
        type="button"
        onClick={() => nudge(1)}
        className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-opacity hover:bg-black/60 sm:flex opacity-0 group-hover:opacity-100"
        aria-label="Pan right"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
