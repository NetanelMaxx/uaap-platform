// src/app/sports/basketball/players/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PLAYERS, type Player } from "@/data/players"; // Assumes this path is correct

/**
 * Helper function to group players by team
 */
function groupByTeam(players: Player[]) {
  const map = new Map<string, Player[]>();
  players.forEach((p) => {
    const team = p.team ?? "Unattached";
    if (!map.has(team)) map.set(team, []);
    map.get(team)!.push(p);
  });
  return map;
}

export default function PlayersIndexPage() {
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("all"); // "all" is the default

  // 1. Get all players and all unique team names once
  const allPlayers = useMemo(() => Object.values(PLAYERS), []);
  const allTeams = useMemo(
    () => [
      "all",
      ...Array.from(new Set(allPlayers.map((p) => p.team ?? "Unattached"))).sort(),
    ],
    [allPlayers]
  );

  // 2. Apply filters to the flat list of players
  const filteredPlayers = useMemo(() => {
    return allPlayers.filter((p) => {
      const matchesTeam =
        teamFilter === "all" ? true : p.team === teamFilter;
      const matchesSearch = p.name
        ? p.name.toLowerCase().includes(search.toLowerCase())
        : false;
      return matchesTeam && matchesSearch;
    });
  }, [allPlayers, search, teamFilter]);

  // 3. Group the *filtered* list of players
  const grouped = useMemo(() => groupByTeam(filteredPlayers), [filteredPlayers]);
  
  // 4. Get the list of teams that *actually have players* after filtering
  const visibleTeams = useMemo(
    () => Array.from(grouped.keys()).sort((a, b) => a.localeCompare(b)),
    [grouped]
  );

  return (
    <main className="bg-black text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold">Players</h1>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Browse all players by team. Click a player to view their full
            profile.
          </p>

          {/* Filter Controls */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {allTeams.map((team) => (
                <option
                  key={team}
                  value={team}
                  className="bg-gray-900 text-white"
                >
                  {team === "all" ? "All Teams" : team}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* Player Groups */}
        <div className="space-y-12">
          {visibleTeams.length > 0 ? (
            visibleTeams.map((team) => {
              const players = grouped.get(team) || [];
              // Sort players by name within their group
              players.sort((a, b) =>
                (a.name ?? "").localeCompare(b.name ?? "")
              );

              return (
                <section key={team} className="pt-2">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">{team}</h2>
                    <div className="text-sm text-white/70">
                      {players.length} players
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {players.map((p) => (
                      <PlayerTile key={p.slug} player={p} />
                    ))}
                  </div>
                </section>
              );
            })
          ) : (
            // No results message
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-white/90">
                No Players Found
              </h3>
              <p className="text-white/60 mt-2">
                Try adjusting your search or filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* Small presentational tile. 
  Keeping this in the same file for convenience.
*/
function PlayerTile({ player }: { player: Player }) {
  const hero =
    player.headshot ||
    player.cutout ||
    player.heroImage ||
    "/images/placeholder.jpg";
    
  return (
    <Link
      href={`/players/${player.slug}`}
      className="group block rounded-2xl overflow-hidden transform transition will-change-transform hover:scale-[1.02] hover:shadow-2xl bg-gray-900 border border-white/10"
    >
      <div className="relative w-full h-48 bg-white/5">
        <Image
          src={hero}
          alt={player.name ?? "Player"}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold leading-tight">
              {player.name ?? "Unnamed Player"}
            </h3>
            <div className="mt-1 text-sm text-white/80">
              #{player.number ?? "-"} • {player.position ?? "—"}
            </div>
          </div>

          <div className="text-right text-sm text-white/70 flex-shrink-0">
            <div>{player.team}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
          <div className="px-2 py-1 rounded-full bg-white/10">
            PPG {player.stats.pointsPerGame?.toFixed(1) ?? "N/A"}
          </div>
          <div className="px-2 py-1 rounded-full bg-white/10">
            RPG {player.stats.reboundsPerGame?.toFixed(1) ?? "N/A"}
          </div>
          <div className="px-2 py-1 rounded-full bg-white/10">
            APG {player.stats.assistsPerGame?.toFixed(1) ?? "N/A"}
          </div>
        </div>
      </div>
    </Link>
  );
}