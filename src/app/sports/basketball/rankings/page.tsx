import React from "react";
import { TEAMS } from "@/data/teams";
import { PLAYERS } from "@/data/players";
import Image from "next/image";
import Link from "next/link";

/**
 * Rankings Hub Page
 * - Server component
 * - Fetches data from mock files for teams and players
 * - Displays team standings and player leaderboards
 */
export default function RankingsPage() {
  // --- Data Preparation ---

  // Sort teams by wins (descending) for standings
  const sortedTeams = Object.values(TEAMS).sort((a, b) => {
    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    }
    return a.losses - b.losses; // If wins are tied, fewer losses is better
  });

  // Get all players and sort for leaderboards
  const allPlayers = Object.values(PLAYERS);

  const topScorers = [...allPlayers]
    .sort((a, b) => (b.stats.pointsPerGame ?? 0) - (a.stats.pointsPerGame ?? 0))
    .slice(0, 10);

  const topRebounders = [...allPlayers]
    .sort((a, b) => (b.stats.reboundsPerGame ?? 0) - (a.stats.reboundsPerGame ?? 0))
    .slice(0, 10);

  const topAssists = [...allPlayers]
    .sort((a, b) => (b.stats.assistsPerGame ?? 0) - (a.stats.assistsPerGame ?? 0))
    .slice(0, 10);

  return (
    <main className="bg-black text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Rankings & Leaders
          </h1>
          <p className="mt-2 text-gray-300 max-w-2xl">
            View the official team standings and top individual performers in
            the league.
          </p>
        </header>

        {/* --- Main Content: Standings and Leaderboards --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Team Standings (takes 2/3 of the width on large screens) */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-4">Team Standings</h2>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">Team</th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold">W</th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold">L</th>
                    <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-center text-sm font-semibold">PPG</th>
                    <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-center text-sm font-semibold">RPG</th>
                    <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-center text-sm font-semibold">APG</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-gray-900/50">
                  {sortedTeams.map((team, index) => (
                    <tr key={team.slug} className="hover:bg-white/5 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                        <Link href={`/sports/basketball/teams/${team.slug}`} className="flex items-center gap-3 group">
                          <span className="w-6 text-center text-white/50">{index + 1}</span>
                          <Image src={team.logo} alt={`${team.name} logo`} width={24} height={24} className="h-6 w-6"/>
                          <span className="group-hover:text-yellow-400">{team.name}</span>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-center font-semibold text-white">{team.wins}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-white/70">{team.losses}</td>
                      <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-center text-white/70">{team.stats.pointsPerGame.toFixed(1)}</td>
                      <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-center text-white/70">{team.stats.reboundsPerGame.toFixed(1)}</td>
                      <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-center text-white/70">{team.stats.assistsPerGame.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Player Leaderboards (takes 1/3 of the width on large screens) */}
          <div className="space-y-8">
            <PlayerLeaderboard title="Points Per Game" players={topScorers} statKey="pointsPerGame" />
            <PlayerLeaderboard title="Rebounds Per Game" players={topRebounders} statKey="reboundsPerGame" />
            <PlayerLeaderboard title="Assists Per Game" players={topAssists} statKey="assistsPerGame" />
          </div>
        </div>
      </div>
    </main>
  );
}

// --- Player Leaderboard Component ---
function PlayerLeaderboard({ title, players, statKey }: { title: string; players: (typeof PLAYERS)[string][]; statKey: keyof (typeof PLAYERS)[string]['stats'] }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <ul className="space-y-2">
        {players.map((player, index) => (
          <li key={player.slug}>
            <Link href={`/players/${player.slug}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-colors">
              <span className="w-6 text-center text-sm font-semibold text-white/70">{index + 1}.</span>
              <Image src={player.headshot || "/images/placeholder.jpg"} alt={player.name ?? "Player"} width={40} height={40} className="h-10 w-10 rounded-full object-cover bg-white/10"/>
              <div className="flex-grow">
                <p className="font-semibold leading-tight">{player.name}</p>
                <p className="text-xs text-white/60">{player.team}</p>
              </div>
              <p className="text-lg font-bold">
                {player.stats[statKey]?.toFixed(1) ?? "0.0"}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
