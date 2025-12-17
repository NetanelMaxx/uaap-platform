"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { PLAYERS, type Player } from "@/data/players";

interface QuickPlayerSwitcherProps {
  currentPlayerSlug: string;
  teamSlug: string;
  teamName: string;
}

export default function QuickPlayerSwitcher({
  currentPlayerSlug,
  teamSlug,
  teamName,
}: QuickPlayerSwitcherProps) {
  const router = useRouter();

  // Find all teammates (excluding the current player)
  const teammates = useMemo(() => {
    return Object.values(PLAYERS)
      .filter((p) => p.teamSlug === teamSlug && p.slug !== currentPlayerSlug)
      .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
  }, [currentPlayerSlug, teamSlug]);

  if (teammates.length === 0) {
    return null; // Don't show the switcher if there are no other teammates
  }

  // Handle dropdown selection change
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSlug = e.target.value;
    if (selectedSlug) {
      router.push(`/players/${selectedSlug}`);
    }
  };

  return (
    <section className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4 text-white">
        More from {teamName}
      </h3>
      
      <label htmlFor="player-switcher" className="text-sm font-medium text-white/70">
        Switch Player
      </label>
      <select
        id="player-switcher"
        value={currentPlayerSlug}
        onChange={handleChange}
        className="mt-2 block w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        <option value={currentPlayerSlug} disabled>
          {PLAYERS[currentPlayerSlug]?.name || "Select Player"}
        </option>
        {teammates.map((player) => (
          <option key={player.slug} value={player.slug} className="bg-gray-800 text-white">
            #{player.number} {player.name}
          </option>
        ))}
      </select>
    </section>
  );
}