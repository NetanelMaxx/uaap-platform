// src/components/sports/GridSportSelector.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type SportDef = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  fullSrc: string;    // full black-and-white photo (background)
  cutoutSrc: string;  // colored cutout PNG/WebP (transparent) that "pops"
  accent?: string;
};

const SPORTS: SportDef[] = [
  {
    id: "basketball",
    slug: "basketball",
    title: "Basketball",
    subtitle: "UAAP Basketball",
    fullSrc: "/images/sports/basketball-full.jpg",
    cutoutSrc: "/images/sports/basketball-cutout.png",
    accent: "#ffb86b",
  },
  {
    id: "volleyball",
    slug: "volleyball",
    title: "Volleyball",
    subtitle: "Spike & Serve",
    fullSrc: "/images/sports/volleyball-full.jpg",
    cutoutSrc: "/images/sports/volleyball-cutout.png",
    accent: "#7bd389",
  },
  {
    id: "badminton",
    slug: "badminton",
    title: "Badminton",
    subtitle: "Quick & Precise",
    fullSrc: "/images/sports/badminton-full.jpg",
    cutoutSrc: "/images/sports/badminton-cutout.png",
    accent: "#6fc3ff",
  },
];

export default function GridSportSelector() {
  const router = useRouter();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isFocusedIndex, setIsFocusedIndex] = useState<number | null>(null);

  // keyboard navigation: 1,2,3 to select, Enter to open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "1") setHoverIndex(0);
      if (e.key === "2") setHoverIndex(1);
      if (e.key === "3") setHoverIndex(2);
      if (e.key === "Enter" && hoverIndex !== null) {
        handleSelect(SPORTS[hoverIndex].slug);
      }
      // escape -> clear focus
      if (e.key === "Escape") {
        setHoverIndex(null);
        setIsFocusedIndex(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hoverIndex]);

  const handleSelect = (slug: string) => {
    try {
      localStorage.setItem("uaap:sport", slug);
    } catch {}
    router.push(`/${slug}`);
  };

  return (
    <section className="min-h-screen w-full flex flex-col bg-black">
      {/* Top small header / hint */}
      <div className="w-full z-40 px-6 py-6 flex items-center justify-between">
        <div className="text-sm text-white/60">Choose your sport</div>
        <div className="text-sm text-white/50">Tip: Hover a card • Press 1 / 2 / 3 • Enter to open</div>
      </div>

      {/* Three-column grid: each column is a flex item that fills vertically */}
      <div className="flex-1 flex w-full h-[calc(100vh-88px)]">
        {SPORTS.map((s, idx) => {
          const isHover = hoverIndex === idx;
          const isFocused = isFocusedIndex === idx;
          return (
            <div
              key={s.id}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex((cur) => (cur === idx ? null : cur))}
              onFocus={() => {
                setHoverIndex(idx);
                setIsFocusedIndex(idx);
              }}
              onBlur={() => {
                setIsFocusedIndex((cur) => (cur === idx ? null : cur));
                setHoverIndex((cur) => (cur === idx ? null : cur));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelect(s.slug);
              }}
              onClick={() => handleSelect(s.slug)}
              className={`relative group flex-1 overflow-visible select-none transition-all duration-500 ease-out
                ${isHover ? "scale-[1.01] z-30" : "z-20"}
              `}
              aria-label={`Open ${s.title}`}
            >
              {/* Background full image (black & white). We intentionally let it bleed (no border) */}
              <div className="absolute inset-0 -z-10">
                <Image
                  src={s.fullSrc}
                  alt={`${s.title} full`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{
                    objectFit: "cover",
                    filter: "grayscale(100%) contrast(0.9) brightness(0.85)",
                    transform: isHover ? "scale(1.06)" : "scale(1.02)",
                    transition: "transform 700ms cubic-bezier(.2,.9,.2,1)",
                  }}
                  priority
                />
                {/* dark overlay to keep text legible */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                    isHover ? "bg-black/12" : "bg-black/28"
                  }`}
                />
              </div>

              {/* content block anchored center-left-ish for text */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 max-w-lg">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md text-white/80">{s.subtitle}</p>

                <div className="mt-6 flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(s.slug);
                    }}
                    className="rounded-md bg-white px-5 py-3 font-semibold text-black shadow-2xl hover:scale-[1.02] transition-transform"
                  >
                    Enter
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // quick action: show next sport (for discovery)
                      const next = (idx + 1) % SPORTS.length;
                      setHoverIndex(next);
                    }}
                    className="rounded-md border border-white/8 px-4 py-2 text-white/90 hover:bg-white/6 transition"
                  >
                    Preview
                  </button>
                </div>
              </div>

              {/* Player cutout — centered-ish and ENLARGED — it will intentionally overflow outside the column */}
              {/* We place this absolute and allow overflow-visible on the parent so it bleeds to neighbors */}
              <motion.div
                className="absolute left-1/2 top-1/2 translate-x-[-4%] translate-y-[10%] z-40 pointer-events-none"
                initial={{ scale: 0.98, y: 0 }}
                animate={isHover ? { scale: 1.12, y: -40 } : { scale: 1.0, y: 0 }}
                transition={{ type: "spring", stiffness: 210, damping: 26 }}
                style={{ width: "48%", maxWidth: 680 }}
              >
                <Image
                  src={s.cutoutSrc}
                  alt={`${s.title} player`}
                  width={1400}
                  height={1400}
                  style={{ objectFit: "contain", pointerEvents: "none" }}
                  priority
                />
              </motion.div>

              {/* subtle accent circle (top-right) */}
              <div className="absolute top-8 right-8 z-30">
                <div
                  style={{
                    background: `linear-gradient(135deg, ${s.accent} 0%, rgba(255,255,255,0.04) 100%)`,
                  }}
                  className="h-12 w-12 rounded-full shadow-2xl border border-white/6"
                />
              </div>

              {/* overlay gradient bottom to increase contrast */}
              <div className="absolute inset-x-0 bottom-0 h-36 z-20 pointer-events-none bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
