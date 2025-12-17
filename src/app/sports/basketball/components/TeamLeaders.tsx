"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Player } from "@/data/players";

// Define the stats we care about
type StatCategory = "pointsPerGame" | "reboundsPerGame" | "assistsPerGame" | "stealsPerGame" | "blocksPerGame" | "threePointPercentage";

// Define our tabs
const STAT_CATEGORIES = {
  offense: [
    { key: "pointsPerGame" as StatCategory, label: "Points" },
    { key: "assistsPerGame" as StatCategory, label: "Assists" },
    { key: "threePointPercentage" as StatCategory, label: "3P%" },
  ],
  defense: [
    { key: "reboundsPerGame" as StatCategory, label: "Rebounds" },
    { key: "stealsPerGame" as StatCategory, label: "Steals" },
    { key: "blocksPerGame" as StatCategory, label: "Blocks" },
  ],
};

export default function TeamLeaders({ roster }: { roster: Player[] }) {
  const [activeTab, setActiveTab] = useState<"offense" | "defense">("offense");

  // Helper function to get top 3 players for a given stat
  const getTopPlayers = (stat: StatCategory) => {
    return [...roster]
      .filter(p => p.stats[stat] !== undefined && p.stats[stat] !== null)
      .sort((a, b) => (b.stats[stat] ?? 0) - (a.stats[stat] ?? 0))
      .slice(0, 3);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl">
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab("offense")}
          className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
            activeTab === "offense"
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-white/60 hover:bg-white/5"
          }`}
        >
          Offense
        </button>
        <button
          onClick={() => setActiveTab("defense")}
          className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
            activeTab === "defense"
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-white/60 hover:bg-white/5"
          }`}
        >
          Defense
        </button>
      </div>

      <div className="p-4 md:p-6">
        {STAT_CATEGORIES[activeTab].map((category) => {
          const topPlayers = getTopPlayers(category.key);
          return (
            <div key={category.key} className="mb-4 last:mb-0">
              <h4 className="text-sm font-semibold text-white/70 uppercase mb-2">
                {category.label}
              </h4>
              <ul className="space-y-2">
                {topPlayers.map((player, index) => (
                  <li key={player.slug} className="flex items-center justify-between">
                    <Link href={`/players/${player.slug}`} className="flex items-center gap-2 group">
                      <Image
                        src={player.headshot || "/images/placeholder.jpg"}
                        alt={player.name}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                      />
                      <span className="text-sm font-medium group-hover:underline">
                        {index + 1}. {player.name}
                      </span>
                    </Link>
                    <span className="font-bold text-lg text-yellow-400">
                      {category.key.includes('Percentage') 
                        ? `${((player.stats[category.key] || 0) * 100).toFixed(1)}%`
                        : (player.stats[category.key] || 0).toFixed(1)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
