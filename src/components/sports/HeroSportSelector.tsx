// src/components/sports/HeroSportSelector.tsx
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
  bgSrc: string; // background/court
  playerSrc: string; // player cutout with transparent background (PNG/WebP)
  accent?: string;
};

const SPORTS: SportDef[] = [
  {
    id: "basketball",
    slug: "basketball",
    title: "Basketball",
    subtitle: "UAAP Basketball",
    bgSrc: "/images/sports/basketball-court.jpg",
    playerSrc: "/images/sports/basketball-player.png",
    accent: "#ffb86b",
  },
  {
    id: "volleyball",
    slug: "volleyball",
    title: "Volleyball",
    subtitle: "Spike & Serve",
    bgSrc: "/images/sports/volleyball-court.jpg",
    playerSrc: "/images/sports/volleyball-player.png",
    accent: "#7bd389",
  },
  {
    id: "badminton",
    slug: "badminton",
    title: "Badminton",
    subtitle: "Speed & Precision",
    bgSrc: "/images/sports/badminton-court.jpg",
    playerSrc: "/images/sports/badminton-player.png",
    accent: "#6fc3ff",
  },
];

export default function HeroSportSelector() {
  const router = useRouter();
  const [index, setIndex] = useState<number>(() => {
    // start with remembered sport or 0
    try {
      const s = typeof window !== "undefined" && localStorage.getItem("uaap:sport");
      if (s) {
        const i = SPORTS.findIndex((t) => t.slug === s);
        if (i >= 0) return i;
      }
    } catch {}
    return 0;
  });

  useEffect(() => {
    // keyboard navigation
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + SPORTS.length) % SPORTS.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % SPORTS.length);
      if (e.key === "Enter") handleSelect(SPORTS[index].slug);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  const handleSelect = (slug: string) => {
    try {
      localStorage.setItem("uaap:sport", slug);
    } catch {}
    router.push(`/${slug}`); // or /sports/${slug} if you prefer
  };

  // carousel controls
  const prev = () => setIndex((i) => (i - 1 + SPORTS.length) % SPORTS.length);
  const next = () => setIndex((i) => (i + 1) % SPORTS.length);

  // ref & tilt logic
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
  });
  const [isHover, setIsHover] = useState(false);

  function handleMove(e: React.MouseEvent) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = -(py - 0.5) * 14; // rotateX
    const ry = (px - 0.5) * 22; // rotateY
    const tz = 12; // slight forward
    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${isHover ? tz : 0}px)`,
    });
  }

  function handleLeave() {
    setIsHover(false);
    setTiltStyle({ transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)" });
  }

  function handleEnter() {
    setIsHover(true);
  }

  // small helper for indicators
  const dotClasses = (i: number) =>
    `w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/30"} transition-colors`;

  return (
    <section className="min-h-[84vh] flex items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-6xl">
        {/* Hero carousel area */}
        <div className="flex items-center gap-6">
          {/* Left arrow */}
          <button
            aria-label="Previous sport"
            onClick={prev}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/6 hover:bg-white/10 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Visible hero card */}
          <div className="w-full md:w-[86%]">
            <div
              ref={cardRef}
              onMouseMove={handleMove}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelect(SPORTS[index].slug);
              }}
              className="relative rounded-2xl overflow-visible select-none"
              style={{ perspective: 1200 }}
            >
              {/* Card container that tilts */}
              <motion.div
                animate={tiltStyle}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-black/70 to-black/60 border border-white/6"
                style={{
                  // we apply the transform through style (tiltStyle) via motion animate
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Background image (court) */}
                <div className="relative h-[420px] md:h-[520px]">
                  <Image
                    src={SPORTS[index].bgSrc}
                    alt={`${SPORTS[index].title} background`}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    style={{ objectFit: "cover", filter: "grayscale(60%) contrast(0.9)" }}
                    className="brightness-90"
                    priority
                  />
                  {/* overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content block (text + CTA) */}
                <div className="absolute left-8 bottom-8 md:left-12 md:bottom-12 z-30 max-w-xl">
                  <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                    {SPORTS[index].title}
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-white/80 max-w-lg">{SPORTS[index].subtitle}</p>

                  <div className="mt-6 flex items-center gap-4">
                    <button
                      onClick={() => handleSelect(SPORTS[index].slug)}
                      className="inline-flex items-center gap-3 rounded-lg px-5 py-3 bg-white text-black font-semibold shadow-2xl hover:scale-[1.02] transition transform"
                    >
                      Enter {SPORTS[index].title}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    <button
                      onClick={() => {
                        // show more preview / play trailer later
                        // placeholder: cycle next
                        next();
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/8 text-white/90 hover:bg-white/6 transition"
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {/* Player cutout (breaks out of card) */}
                <motion.div
                  className="absolute right-6 bottom-0 md:right-12 md:bottom-[-18%] z-40 pointer-events-none"
                  initial={{ y: 30, scale: 0.98 }}
                  animate={isHover ? { y: -18, scale: 1.045 } : { y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  style={{ width: 420, maxWidth: "28rem" }}
                >
                  {/* Player image should be a cutout (transparent background). Adjust sizes to taste */}
                  <Image
                    src={SPORTS[index].playerSrc}
                    alt={`${SPORTS[index].title} player`}
                    width={800}
                    height={800}
                    style={{ objectFit: "contain", pointerEvents: "none" }}
                    priority
                  />
                </motion.div>

                {/* Subtle top-right accent circle */}
                <div className="absolute top-6 right-6 z-30">
                  <div
                    style={{ background: `linear-gradient(135deg, ${SPORTS[index].accent} 0%, rgba(255,255,255,0.04) 100%)` }}
                    className="h-12 w-12 rounded-full shadow-2xl border border-white/6"
                    aria-hidden
                  />
                </div>

                {/* cinematic bottom gloss */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
              </motion.div>
            </div>

            {/* indicators + small caption */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {SPORTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to ${SPORTS[i].title}`}
                    className={dotClasses(i)}
                  />
                ))}
              </div>

              <div className="text-sm text-white/60">
                Tip: Use ← → to switch • Press Enter to open
              </div>
            </div>
          </div>

          {/* Right arrow */}
          <button
            aria-label="Next sport"
            onClick={next}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/6 hover:bg-white/10 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
