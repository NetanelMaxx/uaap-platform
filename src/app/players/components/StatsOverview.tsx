// src/app/players/components/StatsOverview.tsx
import React from "react";
import type { PlayerStats } from "@/data/players";

export default function StatsOverview({ stats }: { stats: PlayerStats }) {
  const blocks = [
    { label: "PTS", value: stats.pointsPerGame.toFixed(1) },
    { label: "REB", value: stats.reboundsPerGame.toFixed(1) },
    { label: "AST", value: stats.assistsPerGame.toFixed(1) },
  ];

  return (
    <aside className="bg-black/50 backdrop-blur-lg rounded-2xl p-4 border border-white/6">
      <h4 className="text-sm text-white/80 mb-3">Season Averages</h4>
      <div className="grid grid-cols-3 gap-3">
        {blocks.map((b) => (
          <div key={b.label} className="rounded-lg p-3 bg-gradient-to-b from-white/6 to-white/2 text-center">
            <div className="text-2xl font-extrabold">{b.value}</div>
            <div className="text-xs text-white/80 mt-1">{b.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-white/70">
        <div>FG%: {stats.fieldGoalPercentage ?? "--"} • 3PT%: {stats.threePointPercentage ?? "--"} • FT%: {stats.freeThrowPercentage ?? "--"}</div>
      </div>
    </aside>
  );
}
