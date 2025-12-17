"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { PrevButton, NextButton } from "@/components/ui/EmblaCarouselButtons";
import { type Game } from "@/data/schedule"; // Import Game type
import { TEAMS } from "@/data/teams"; // Import TEAMS
import Link from "next/link";

// Define the shape of data for a single slide
export interface HeroSlideProps {
  type: 'team' | 'player' | 'matchup';
  title: string;
  tagline: string;
  bgImage: string;
  logo?: string;
  ctaText: string;
  ctaLink: string;
}

// The main component now accepts upcomingGames prop
export default function HeroSection({ slides, upcomingGames }: { slides: HeroSlideProps[], upcomingGames: Game[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000, stopOnInteraction: false }),
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect(); // Set initial index
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative w-full h-[72vh] md:h-[78vh] lg:h-[82vh] overflow-hidden bg-black text-white">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div className="flex-grow-0 flex-shrink-0 w-full h-full" key={index}>
              <HeroSlide {...slide} isActive={index === activeIndex} />
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} />
      <NextButton onClick={scrollNext} />

      {/* --- RETAINED BOTTOM STRIP (FIXED) --- */}
      <div className="absolute left-6 right-6 bottom-8 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl backdrop-blur-md border border-white/10 px-4 py-3 flex items-center justify-between gap-4">
            {upcomingGames && upcomingGames.length > 0 ? (
                (() => {
                  // Find the team data using the slugs
                  const game = upcomingGames[0];
                  // Safely find team data
                  const awayTeam = Object.values(TEAMS).find(t => t.slug === game.awayTeamSlug);
                  const homeTeam = Object.values(TEAMS).find(t => t.slug === game.homeTeamSlug);

                  // If either team isn't found (e.g., data mismatch), don't render this part
                  if (!awayTeam || !homeTeam) return <div className="text-sm text-white/70">Next game processing...</div>;

                  return (
                    <div className="flex items-center gap-3 animate-[fadeIn_0.5s_ease-in-out]">
                      <div className="hidden sm:block text-sm font-bold text-yellow-400 uppercase tracking-wider">{game.status}</div>
                      <Image src={awayTeam.logo} alt={awayTeam.name} width={24} height={24} className="h-6 w-6"/>
                      <div className="text-white font-semibold text-sm sm:text-base">
                        {awayTeam.name} vs {homeTeam.name}
                      </div>
                      <Image src={homeTeam.logo} alt={homeTeam.name} width={24} height={24} className="h-6 w-6"/>
                    </div>
                  )
                })()
            ) : (
                <div className="text-sm text-white/70">No upcoming games.</div>
            )}
            <div className="flex items-center gap-4">
              <Link className="text-sm text-white/80 underline hover:text-white" href="/sports/basketball/schedule">Full Schedule</Link>
              <Link className="text-sm text-white/80 underline hover:text-white" href="/sports/basketball/rankings">Rankings</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// This component renders a single slide with zoom and new depth effects
function HeroSlide({ isActive, ...props }: HeroSlideProps & { isActive: boolean }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax transforms
  const bgX = useTransform(mouseX, [-150, 150], ["-2%", "2%"]);
  const bgY = useTransform(mouseY, [-150, 150], ["-2%", "2%"]);
  const contentX = useTransform(mouseX, [-150, 150], ["2%", "-2%"]);
  const contentY = useTransform(mouseY, [-150, 150], ["1.5%", "-1.5%"]);
  
  // Lens flare effect for depth
  const flareX = useTransform(mouseX, [-150, 150], ["-40%", "40%"]);
  const flareY = useTransform(mouseY, [-150, 150], ["-40%", "40%"]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return; // This check fixes the "el is possibly 'null'" error

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      mouseX.set(Math.max(-150, Math.min(150, dx)));
      mouseY.set(Math.max(-120, Math.min(120, dy)));
    }
    function onLeave() {
      mouseX.set(0);
      mouseY.set(0);
    }
    el!.addEventListener("mousemove", onMove);
    el!.addEventListener("mouseleave", onLeave);

    return () => {
      // Use the stored element variable for cleanup
      el!.removeEventListener("mousemove", onMove);
      el!.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]); // We only need mouseX and mouseY as dependencies

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Background Image with Ken Burns Zoom */}
      <motion.div style={{ translateX: bgX, translateY: bgY }} className="absolute inset-0 z-0">
        <Image 
          key={props.bgImage + (isActive ? '-active' : '')} // Force re-render to restart animation
          src={props.bgImage} 
          alt={`${props.title} background`} 
          fill 
          sizes="100vw" 
          style={{ objectFit: "cover" }} 
          priority 
          className={isActive ? "animate-kenburns" : "scale-105"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
      </motion.div>

      {/* Lens Flare for Depth */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
            translateX: flareX,
            translateY: flareY,
            background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent 40%)"
        }}
      />
      
      <motion.div style={{ translateX: contentX, translateY: contentY }} className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-4">
              {props.logo && (
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/10 p-2">
                  <Image src={props.logo} alt={`${props.title} logo`} width={64} height={64} />
                </div>
              )}
              <div>
                <p className="text-sm uppercase text-yellow-400 font-semibold tracking-wider">{props.type}</p>
                <h1 className="mt-1 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter drop-shadow-xl">
                  {props.title}
                </h1>
              </div>
            </div>
            <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl drop-shadow-lg">{props.tagline}</p>
            <div className="mt-8 flex items-center gap-4">
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href={props.ctaLink} className="inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 text-black font-semibold shadow-2xl">
                {props.ctaText}
              </motion.a>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => router.push("/sports/basketball/schedule")} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 text-white/90 hover:bg-white/10 transition">
                View Schedule
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
