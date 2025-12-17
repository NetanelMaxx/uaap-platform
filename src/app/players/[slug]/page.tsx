import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PLAYERS, type Player, type GameLogEntry } from "@/data/players";
import { TEAMS, type Team } from "@/data/teams";
import { TwitterIcon, InstagramIcon, FacebookIcon, ChartIcon, CalendarIcon, UsersIcon } from "@/components/layout/icons";
import QuickPlayerSwitcher from "@/components/player/QuickPlayerSwitcher"; // <-- IMPORT NEW COMPONENT

// This function tells Next.js which player pages to build for performance
export async function generateStaticParams() {
  return Object.values(PLAYERS).map((player) => ({
    slug: player.slug,
  }));
}

// Helper function to find player (case-insensitive)
function getPlayerBySlug(slug: string): Player | undefined {
  const key = Object.keys(PLAYERS).find(
    (key) => key.toLowerCase() === slug.toLowerCase()
  );
  return key ? PLAYERS[key] : undefined;
}

// Main Page Component
export default async function PlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);

  if (!player) {
    notFound(); // 404
  }

  const team = Object.values(TEAMS).find(t => t.slug === player.teamSlug);

  return (
    <main className="bg-gradient-to-b from-black via-[#111] to-black text-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <PlayerHero player={player} />

      {/* Page content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-16">
        
        {/* 2. MAIN GRID (Stats, Bio, etc.) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-6">
            <PlayerIdentityCard player={player} />
            <StatsTable player={player} />
            <RecentGames player={player} />
          </div>

          {/* Sidebar (Right) */}
          <aside className="lg:col-span-1 space-y-6">
            {/* ADDED THE NEW COMPONENT HERE */}
            {team && (
              <QuickPlayerSwitcher 
                currentPlayerSlug={player.slug} 
                teamSlug={team.slug}
                teamName={team.name}
              />
            )}
            <PlayerBioInfo player={player} />
            {team && <TeamQuickLinks team={team} />}
          </aside>

        </div>
      </div>
    </main>
  );
}

// --- Page-Specific Components ---

/**
 * PlayerHero: Big cinematic image at the top
 */
function PlayerHero({ player }: { player: Player }) {
  const heroImage = player.heroImage || "/images/hero-basketball.jpg";
  return (
    <header className="relative w-full h-[50vh] md:h-[60vh] flex items-end p-6 md:p-12">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={`${player.name} action shot`}
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 p-6 md:p-12 z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
          {player.name}
        </h1>
        <p className="text-xl md:text-3xl text-white/80 font-semibold" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
          #{player.number} • {player.position} •{" "}
          <Link href={`/sports/basketball/teams/${player.teamSlug}`} className="hover:text-yellow-400 transition">
              {player.team}
          </Link>
        </p>
      </div>
    </header>
  );
}

/**
 * PlayerIdentityCard: Contains headshot, name, team, and social links.
 */
function PlayerIdentityCard({ player }: { player: Player }) {
  return (
    <section className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center gap-6 p-6">
      <Image
        src={player.headshot || "https://placehold.co/150x150/222/fff?text=?"}
        alt={player.name}
        width={150}
        height={150}
        className="h-28 w-28 sm:h-36 sm:w-36 rounded-full object-cover border-4 border-white/10 ring-1 ring-white/10"
      />
      <div className="flex-1 text-center sm:text-left">
        <p className="text-sm uppercase text-yellow-400 font-bold tracking-wider">
          {player.team}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">
          {player.name}
        </h2>
        <p className="text-lg text-white/70">
          #{player.number} | {player.position}
        </p> 
        
        {/* Social Links */}
        <div className="flex justify-center sm:justify-start gap-4 mt-3">
          {player.socials?.twitter && (
            <a href={player.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors"><TwitterIcon /></a>
          )}
          {player.socials?.instagram && (
            <a href={player.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors"><InstagramIcon /></a>
          )}
          {player.socials?.facebook && (
            <a href={player.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors"><FacebookIcon /></a>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * PlayerBioInfo: The new section for Height, Weight, Age, etc.
 */
function PlayerBioInfo({ player }: { player: Player }) {
  return (
    <section className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-white">Bio</h3>
      <div className="space-y-3 text-lg">
        <div className="flex justify-between">
          <span className="text-white/60">Height</span>
          <span className="font-semibold">{player.height || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Weight</span>
          <span className="font-semibold">{player.weight || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Birthdate</span>
          <span className="font-semibold">{player.birthdate || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">College</span>
          <span className="font-semibold">{player.college || "N/A"}</span>
        </div>
         <div className="flex justify-between">
          <span className="text-white/60">Status</span>
          <span className={`font-semibold ${player.status !== 'Active' ? 'text-red-400' : ''}`}>{player.status || "N/A"}</span>
        </div>
      </div>
      
      {player.bio && (
        <>
          <hr className="border-white/10 my-4" />
          <p className="text-white/80 leading-relaxed">{player.bio}</p>
        </>
      )}
    </section>
  );
}

/**
 * StatsTable: Combined Season and Career stats.
 */
function StatsTable({ player }: { player: Player }) {
  const stats = player.stats;
  const careerStats = player.careerStats;

  return (
    <section className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-x-auto">
      <h3 className="text-2xl font-bold mb-4 text-white">Statistics</h3>
      <table className="w-full text-left min-w-[600px]">
        <thead>
          <tr className="text-sm uppercase text-white/60 border-b border-white/20">
            <th className="py-2 font-medium">Season</th>
            <th className="py-2 text-center font-medium">GP</th>
            <th className="py-2 text-center font-medium">PPG</th>
            <th className="py-2 text-center font-medium">RPG</th>
            <th className="py-2 text-center font-medium">APG</th>
            <th className="py-2 text-center font-medium">FG%</th>
            <th className="py-2 text-center font-medium">3P%</th>
            <th className="py-2 text-center font-medium">FT%</th>
            <th className="py-2 text-center font-medium">STL</th>
            <th className="py-2 text-center font-medium">BLK</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {/* Current Season Stats */}
          {stats && (
            <tr className="hover:bg-white/5">
              <td className="py-3 font-semibold">Season 88 (Current)</td>
              <td className="py-3 text-center">{stats.gamesPlayed ?? 'N/A'}</td>
              <td className="py-3 text-center font-bold text-yellow-400">{stats.pointsPerGame?.toFixed(1) ?? 'N/A'}</td>
              <td className="py-3 text-center">{stats.reboundsPerGame?.toFixed(1) ?? 'N/A'}</td>
              <td className="py-3 text-center">{stats.assistsPerGame?.toFixed(1) ?? 'N/A'}</td>
              <td className="py-3 text-center">{stats.fieldGoalPercentage ? (stats.fieldGoalPercentage * 100).toFixed(1) + '%' : 'N/A'}</td>
              <td className="py-3 text-center">{stats.threePointPercentage ? (stats.threePointPercentage * 100).toFixed(1) + '%' : 'N/A'}</td>
              <td className="py-3 text-center">{stats.freeThrowPercentage ? (stats.freeThrowPercentage * 100).toFixed(1) + '%' : 'N/A'}</td>
              <td className="py-3 text-center">{stats.stealsPerGame?.toFixed(1) ?? 'N/A'}</td>
              <td className="py-3 text-center">{stats.blocksPerGame?.toFixed(1) ?? 'N/A'}</td>
            </tr>
          )}
          {/* Career Stats */}
          {careerStats && (
            <tr className="bg-white/5 hover:bg-white/10">
              <td className="py-3 font-semibold">Career</td>
              <td className="py-3 text-center">{careerStats.gamesPlayed ?? 'N/A'}</td>
              <td className="py-3 text-center font-bold">{careerStats.pointsPerGame?.toFixed(1) ?? 'N/A'}</td>
              <td className="py-3 text-center">{careerStats.reboundsPerGame?.toFixed(1) ?? 'N/A'}</td>
              <td className="py-3 text-center">{careerStats.assistsPerGame?.toFixed(1) ?? 'N/A'}</td>
              <td className="py-3 text-center">{careerStats.fieldGoalPercentage ? (careerStats.fieldGoalPercentage * 100).toFixed(1) + '%' : 'N/A'}</td>
              <td className="py-3 text-center">{careerStats.threePointPercentage ? (careerStats.threePointPercentage * 100).toFixed(1) + '%' : 'N/A'}</td>
              <td className="py-3 text-center">{careerStats.freeThrowPercentage ? (careerStats.freeThrowPercentage * 100).toFixed(1) + '%' : 'N/A'}</td>
              <td className="py-3 text-center">{careerStats.stealsPerGame?.toFixed(1) ?? 'N/A'}</td>
              <td className="py-3 text-center">{careerStats.blocksPerGame?.toFixed(1) ?? 'N/A'}</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

/**
 * RecentGames: Shows a log of the player's most recent games.
 */
function RecentGames({ player }: { player: Player }) {
  if (!player.recentGames || player.recentGames.length === 0) {
    return null; // Don't show the section if there's no game data
  }

  return (
    <section>
      <h3 className="text-2xl font-bold mb-4 text-white">Recent Games</h3>
      <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl">
        <div className="grid grid-cols-6 p-4 text-sm font-semibold text-white/60">
          <div className="col-span-2">Opponent</div>
          <div className="text-center">Result</div>
          <div className="text-center">PTS</div>
          <div className="text-center">REB</div>
          <div className="text-center">AST</div>
        </div>
        <div className="divide-y divide-white/10">
          {player.recentGames.map((game) => (
            <Link
              href={`/sports/basketball/games/${game.gameId}`}
              key={game.gameId}
              className="grid grid-cols-6 p-4 items-center hover:bg-white/5 transition"
            >
              <div className="col-span-2 flex items-center gap-3">
                <Image src={game.opponentLogo} alt={game.opponentName} width={28} height={28} />
                <span className="font-semibold">{game.opponentName}</span>
              </div>
              <div className={`text-center font-bold ${game.result.startsWith('W') ? 'text-green-400' : 'text-red-400'}`}>{game.result}</div>
              <div className="text-center font-semibold text-lg">{game.points}</div>
              <div className="text-center text-white/80">{game.rebounds}</div>
              <div className="text-center text-white/80">{game.assists}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


/**
 * TeamQuickLinks: Replaces the old "Quick Links" with the new ESPN-style.
 */
function TeamQuickLinks({ team }: { team: Team }) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Image src={team.logo} alt={team.name} width={40} height={40} />
        <h3 className="text-xl font-bold text-white">{team.name}</h3>
      </div>
      <ul className="space-y-2">
        <li>
          <Link href={`/sports/basketball/teams/${team.slug}#roster`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
            <UsersIcon className="w-5 h-5 text-white/70" />
            <span className="font-medium">Full Roster</span>
          </Link>
        </li>
         <li>
          <Link href={`/sports/basketball/teams/${team.slug}#stats`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
            <ChartIcon className="w-5 h-5 text-white/70" />
            <span className="font-medium">Team Stats</span>
          </Link>
        </li>
        <li>
          <Link href="/sports/basketball/schedule" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
            <CalendarIcon className="w-5 h-5 text-white/70" />
            <span className="font-medium">Full Schedule</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
