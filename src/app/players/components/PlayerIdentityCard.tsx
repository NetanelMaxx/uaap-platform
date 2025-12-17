// src/app/players/components/PlayerIdentityCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { Player } from "@/data/players";

export default function PlayerIdentityCard({ player }: { player: Player }) {
  return (
    <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 flex gap-6 items-center border border-white/6">
      <div className="w-36 h-36 flex-shrink-0 relative rounded-xl overflow-hidden bg-white/5">
        {player.cutout ? (
          <Image src={player.cutout} alt={player.name} fill style={{ objectFit: "contain" }} />
        ) : player.headshot ? (
          <Image src={player.headshot} alt={player.name} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">{player.name}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-white/80">
              <span>#{player.number ?? "-"}</span>
              <span>•</span>
              <span>{player.position}</span>
              <span>•</span>
              <span>{player.team}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button className="bg-white text-black px-4 py-2 rounded-md font-semibold shadow hover:scale-105 transition">
              Follow
            </button>
            <a
              href={`/players/${player.slug}/compare`}
              className="text-xs text-white/80 underline"
            >
              Compare
            </a>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-300">
          <div className="px-3 py-1 rounded-full bg-white/4">Class: Junior</div>
          <div className="px-3 py-1 rounded-full bg-white/4">Height: 6'2"</div>
          <div className="px-3 py-1 rounded-full bg-white/4">Weight: 190 lbs</div>
        </div>
      </div>
    </section>
  );
}
