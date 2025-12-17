import React from "react";
import { TEAMS, type Team } from "@/data/teams";
import Image from "next/image";
import Link from "next/link";

// Main Page Component
export default function TeamsIndexPage() {
  // Sort teams by number of wins, descending
  const sortedTeams = Object.values(TEAMS).sort((a, b) => b.wins - a.wins);

  return (
    <main className="bg-black text-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Meet the Teams
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Explore the official standings and team hubs for the season.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedTeams.map((team) => (
            // CORRECTED: Use team.slug for the key, as it's guaranteed to be unique
            <TeamTile key={team.slug} team={team} />
          ))}
        </div>
      </div>
    </main>
  );
}

// --- Team Tile Component ---
function TeamTile({ team }: { team: Team }) {
  const heroBg = team.heroImage || team.bgImage || "/images/hero-basketball.jpg";

  return (
    <Link
      href={`/sports/basketball/teams/${team.slug}`}
      className="group block rounded-2xl overflow-hidden transform transition will-change-transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10"
    >
      <div className="relative w-full h-40 bg-white/5">
        <Image
          src={heroBg}
          alt={`${team.name} background`}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
          {/* CORRECTED: Display wins and losses instead of nickname */}
          {team.wins} - {team.losses}
        </div>
      </div>

      <div className="p-4 bg-gray-900 border-t-2 border-yellow-500/50 flex items-center gap-4">
        <Image
          src={team.logo}
          alt={`${team.name} logo`}
          width={48}
          height={48}
          className="flex-shrink-0"
        />
        <div>
          <h3 className="text-lg font-bold leading-tight">{team.name}</h3>
        </div>
      </div>
    </Link>
  );
}
