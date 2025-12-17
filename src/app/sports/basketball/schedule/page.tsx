import React from "react";
import { SCHEDULE, type Game } from "@/data/schedule"; // Imports from our new schedule file
import { TEAMS } from "@/data/teams"; // Imports team data to look up details
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Helper function to group games by date.
 */
function groupGamesByDate(games: Game[]): Map<string, Game[]> {
  const grouped = new Map<string, Game[]>();

  // Sort games by date (most recent first)
  const sortedGames = [...games].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  sortedGames.forEach((game) => {
    const gameDate = new Date(game.date);
    const dateKey = gameDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)!.push(game);
  });
  return grouped;
}

// Main Page Component
export default function SchedulePage() {
  const groupedGames = groupGamesByDate(SCHEDULE);
  const dates = Array.from(groupedGames.keys());

  return (
    <main className="bg-gradient-to-b from-[#101010] to-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Game Center
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            The official hub for all UAAP game schedules and results.
          </p>
        </header>

        <div className="space-y-12">
          {dates.map((date) => (
            <section key={date}>
              <h2 className="text-xl font-semibold text-center text-white/80 tracking-widest uppercase mb-6">
                {date}
              </h2>
              <div className="space-y-6">
                {groupedGames.get(date)?.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

// --- "NBA 2K Style" Game Card Component (Corrected) ---
function GameCard({ game }: { game: Game }) {
  const gameTime = new Date(game.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Safely get team data from the TEAMS object using the slug from the game
  const awayTeam = Object.values(TEAMS).find(t => t.slug === game.awayTeamSlug);
  const homeTeam = Object.values(TEAMS).find(t => t.slug === game.homeTeamSlug);

  // Fallback data in case a team isn't found (prevents crash)
  const safeAwayTeam = awayTeam || { name: game.awayTeamSlug, slug: '#', logo: '/images/placeholder.jpg', wins: 0, losses: 0 };
  const safeHomeTeam = homeTeam || { name: game.homeTeamSlug, slug: '#', logo: '/images/placeholder.jpg', wins: 0, losses: 0 };

  const awayTeamRecord = awayTeam ? `${awayTeam.wins}-${awayTeam.losses}` : '0-0';
  const homeTeamRecord = homeTeam ? `${homeTeam.wins}-${homeTeam.losses}` : '0-0';

  const isAwayWinner = game.status === "FINAL" && (game.awayTeamScore ?? 0) > (game.homeTeamScore ?? 0);
  const isHomeWinner = game.status === "FINAL" && (game.homeTeamScore ?? 0) > (game.awayTeamScore ?? 0);

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-yellow-400/50">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Teams Matchup Section */}
        <div className="w-full flex-grow p-6 grid grid-cols-11 gap-4 items-center">
          {/* Away Team */}
          <div className="col-span-5 flex flex-col items-end text-right">
            <Link href={`/sports/basketball/teams/${safeAwayTeam.slug}`} className="group flex flex-col items-end">
              <Image src={safeAwayTeam.logo} alt={`${safeAwayTeam.name} logo`} width={64} height={64} className="mb-2 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-lg md:text-xl font-bold group-hover:text-yellow-400">{safeAwayTeam.name}</h3>
              <p className="text-sm text-white/60">{awayTeamRecord}</p>
            </Link>
          </div>
          
          {/* Score / Status */}
          <div className="col-span-1 text-center">
            {game.status === 'FINAL' ? (
              <div className="flex flex-col items-center justify-center">
                <span className={`text-2xl md:text-3xl font-bold ${isAwayWinner ? 'text-white' : 'text-white/50'}`}>{game.awayTeamScore ?? '-'}</span>
                <span className={`text-2xl md:text-3xl font-bold ${isHomeWinner ? 'text-white' : 'text-white/50'}`}>{game.homeTeamScore ?? '-'}</span>
              </div>
            ) : game.status === 'LIVE' ? (
               <div className="flex flex-col items-center justify-center">
                <span className={`text-2xl md:text-3xl font-bold`}>{game.awayTeamScore ?? '0'}</span>
                <span className={`text-2xl md:text-3xl font-bold`}>{game.homeTeamScore ?? '0'}</span>
              </div>
            ) : (
               <span className="text-2xl font-bold text-gray-600">VS</span>
            )}
          </div>

          {/* Home Team */}
          <div className="col-span-5 flex flex-col items-start text-left">
             <Link href={`/sports/basketball/teams/${safeHomeTeam.slug}`} className="group flex flex-col items-start">
              <Image src={safeHomeTeam.logo} alt={`${safeHomeTeam.name} logo`} width={64} height={64} className="mb-2 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-lg md:text-xl font-bold group-hover:text-yellow-400">{safeHomeTeam.name}</h3>
              <p className="text-sm text-white/60">{homeTeamRecord}</p>
            </Link>
          </div>
        </div>

        {/* Game Info & CTA Section */}
        <div className="w-full md:w-56 flex-shrink-0 bg-black/30 p-6 text-center md:text-right border-t md:border-t-0 md:border-l border-white/10">
          {game.status === "LIVE" && (
             <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
              <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
              <span className="font-bold text-lg text-red-500">LIVE</span>
            </div>
          )}
          {game.status === "UPCOMING" && <div className="font-bold text-lg text-yellow-400 mb-2">{gameTime}</div>}
          {game.status === "FINAL" && <div className="font-bold mb-2 text-lg text-gray-400">FINAL</div>}
          
          <p className="text-sm text-white/70">{game.venue}</p>
          {game.broadcast && <p className="text-xs text-white/50 mt-1">{game.broadcast}</p>}

          {game.liveStreamLink && game.status !== 'FINAL' && (
            <Link href={game.liveStreamLink} className="mt-4 inline-block bg-yellow-500 text-black text-sm font-bold px-4 py-2 rounded-lg transition hover:bg-yellow-400">
              {game.status === 'LIVE' ? 'Watch Live' : 'Game Center'}
            </Link>
          )}
           {game.status === 'FINAL' && (
            <Link href={`/sports/basketball/games/${game.id}`} className="mt-4 inline-block bg-gray-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition hover:bg-gray-600">
              View Recap
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

