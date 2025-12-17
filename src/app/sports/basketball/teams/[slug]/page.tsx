import React from "react";
import { TEAMS, type Team } from "@/data/teams";
import { PLAYERS, type Player } from "@/data/players";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TeamLeaders from "../../components/TeamLeaders";
import TeamScheduleSnapshot from "../../components/TeamScheduleSnapshot";
import InjuryReport from "../../components/InjuryReport";
import TeamHistory from "../../components/TeamHistory"; // <-- IMPORT THE COMPONENT

// This function tells Next.js which team pages to build at compile time
export async function generateStaticParams() {
  return Object.values(TEAMS).map((team) => ({
    slug: team.slug,
  }));
}

// Helper function to find team (using the key, which is the slug)
function getTeamBySlug(slug: string): Team | undefined {
  // Use the slug as the key directly
  return TEAMS[slug];
}

// Main Page Component
export default function TeamProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const team = getTeamBySlug(params.slug);
  if (!team) {
    notFound(); // Redirect to a 404 page if team slug is invalid
  }

  // Find all players belonging to this team
  const roster = Object.values(PLAYERS).filter(
    (p) => p.teamSlug === team.slug
  );
  
  // Get team's rank
  const standings = Object.values(TEAMS).sort((a,b) => b.wins - a.wins);
  const rank = standings.findIndex(t => t.slug === team.slug) + 1;

  return (
    <main className="bg-gradient-to-b from-black via-[#111] to-black text-white min-h-screen">
      <TeamHero team={team} />

      {/* Page content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-6">
            <TeamStatsOverview team={team} rank={rank} />
            <TeamRoster roster={roster} teamName={team.name} />
            <TeamHistory team={team} /> {/* <-- ADDED TEAM HISTORY COMPONENT */}
          </div>

          {/* Sidebar (Right Column) */}
          <aside className="lg:col-span-1 space-y-6">
            <TeamLeaders roster={roster} />
            <TeamScheduleSnapshot teamSlug={team.slug} />
            <InjuryReport team={team} />
            
            {/* Ad Placeholder */}
            <div className="bg-gray-900/50 border border-white/10 rounded-2xl h-64 flex items-center justify-center text-white/40">
              Advertisement
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// --- Sub-components for the Team Profile Page ---

/**
 * TeamHero: Displays the main banner for the team.
 */
function TeamHero({ team }: { team: Team }) {
  const heroBg = team.heroImage || team.bgImage || "/images/hero-basketball.jpg";
  return (
    <header
      className="relative w-full h-[50vh] md:h-[60vh] bg-cover bg-center flex items-end p-6 md:p-12"
    >
      <div className="absolute inset-0 z-0">
          <Image
            src={heroBg}
            alt={`${team.name} background`}
            fill
            className="object-cover object-center"
            priority
          />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>
      
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
        <Image
          src={team.logo}
          alt={`${team.name} logo`}
          width={150}
          height={150}
          className="h-28 w-28 md:h-36 md:w-36 flex-shrink-0"
        />
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-center sm:text-left">
            {team.name}
          </h1>
          <div className="mt-2 text-2xl font-bold text-yellow-400 text-center sm:text-left">
            {team.wins} - {team.losses}
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * TeamStatsOverview: Shows a grid of key team statistics.
 */
function TeamStatsOverview({ team, rank }: { team: Team, rank: number }) {
  const stats = [
    { label: "League Rank", value: `#${rank}` },
    { label: "Points Per Game", value: team.stats.pointsPerGame.toFixed(1) },
    { label: "Rebounds Per Game", value: team.stats.reboundsPerGame.toFixed(1) },
    { label: "Assists Per Game", value: team.stats.assistsPerGame.toFixed(1) },
  ];
  return (
    <div id="stats" className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-white">Team Stats (Season 88)</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center bg-white/5 p-4 rounded-lg">
            <p className="text-3xl font-bold text-yellow-400">{stat.value}</p>
            <p className="text-sm text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <Link href="/sports/basketball/rankings" className="text-sm font-medium text-yellow-400 hover:underline">
          View Full Team Rankings →
        </Link>
      </div>
    </div>
  );
}

/**
 * TeamRoster: Displays a list of players on the team.
 */
function TeamRoster({ roster, teamName }: { roster: Player[]; teamName: string }) {
  return (
    <section id="roster" className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <h2 className="text-3xl font-bold mb-6">{teamName} Roster</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {roster.length > 0 ? (
          roster
            .sort((a, b) => (a.number ?? 99) - (b.number ?? 99))
            .map((player) => (
              <Link
                href={`/players/${player.slug}`}
                key={player.slug}
                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Image
                  src={player.headshot || "/images/placeholder.jpg"}
                  alt={player.name ?? "Player"}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover border-2 border-white/20 group-hover:border-yellow-400 transition"
                />
                <div>
                  <h3 className="font-bold text-lg leading-tight">{player.name}</h3>
                  <p className="text-sm text-white/60">
                    #{player.number} • {player.position}
                  </p>
                </div>
              </Link>
            ))
        ) : (
          <p className="col-span-full text-white/70">
            Roster information is not yet available.
          </p>
        )}
      </div>
    </section>
  );
}
