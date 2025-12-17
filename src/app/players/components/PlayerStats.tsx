"use client";

import { Player } from "@/data/players"; // Adjust path if needed
import { motion } from "framer-motion";

interface PlayerStatsProps {
  stats: Player["stats"];
}

/**
 * Displays the 3 key stat blocks (PPG, RPG, APG)
 * with a subtle "glowing" feel.
 */
export default function PlayerStats({ stats }: PlayerStatsProps) {
  const statItems = [
    { label: "Points Per Game", value: stats.pointsPerGame },
    { label: "Rebounds Per Game", value: stats.reboundsPerGame },
    { label: "Assists Per Game", value: stats.assistsPerGame },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <h2 className="text-3xl font-bold text-white mb-8">Season Averages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="relative bg-white/5 border border-white/10 rounded-xl p-6 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
          >
            {/* Subtle glow effect */}
            <div
              className="absolute -top-1/2 left-1/4 w-full h-full bg-white/5 opacity-50 blur-3xl"
              aria-hidden
            />
            
            <p className="text-5xl font-extrabold text-white tracking-tighter">
              {item.value.toFixed(1)}
            </p>
            <p className="mt-1 text-sm uppercase text-white/70 tracking-wider">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}