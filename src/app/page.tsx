"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";

export default function Home() {
  // Data for the sport selection cards
  redirect('sports/basketball');
}

// --- Sport Card Component ---

interface SportCardProps {
  sport: {
    name: string;
    href: string;
    image: string;
    playerCutout: string;
  };
  isFeatured: boolean;
}

function SportCard({ sport, isFeatured }: SportCardProps) {
  return (
    <Link href={sport.href}>
      <div className="group relative block h-[60vh] md:h-[65vh] w-full rounded-2xl overflow-hidden cursor-pointer shadow-lg transform transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-yellow-500/30">
        {/* --- Background Image --- */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Image
            src={sport.image}
            alt={`${sport.name} Background`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-500 ease-in-out group-hover:brightness-50"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </motion.div>

        {/* --- Player Cutout --- */}
        {/* We only show the player cutout for the featured sport */}
        {isFeatured && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full flex items-end justify-center pointer-events-none"
            initial={{ y: 20, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            whileHover={{ scale: 1.1, y: -20, transition: { type: "spring", stiffness: 300 } }}
          >
            <Image
              src={sport.playerCutout}
              alt={sport.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "contain", objectPosition: "bottom center" }}
              className="drop-shadow-2xl"
            />
          </motion.div>
        )}

        {/* --- Content --- */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter"
          >
            {sport.name}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="h-1 bg-yellow-400 mt-2 mb-3 w-1/4 group-hover:w-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg text-white/80"
          >
            View {sport.name} Hub
          </motion.p>
        </div>
      </div>
    </Link>
  );
}
