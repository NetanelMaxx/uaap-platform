import React from "react";
import { SCHEDULE, type Game } from "@/data/schedule";
import { TEAMS, type Team } from "@/data/teams";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChartIcon, CalendarIcon, UsersIcon } from "@/components/layout/icons";
import { Player, PLAYERS } from "@/data/players";
import TeamLeaders from "../../components/TeamLeaders";
import TeamScheduleSnapshot from "../../components/TeamScheduleSnapshot";
import TeamHistory from "../../components/TeamHistory";

export async function generateStaticParams() {
  return SCHEDULE.map((game) => ({
    id: game.id,
  }));
}

// Helper function to find team (using the key, which is the slug)
function getTeamBySlug(slug: string): Team | undefined {
  return Object.values(TEAMS).find(t => t.slug === slug);
}

// Main Page Component
export default function GameCenterPage({ params }: { params: { id: string } }) {
  const game = SCHEDULE.find((g) => g.id === params.id);
  if (!game) {
    notFound();
  }

  // --- THIS IS THE FIXED SECTION ---
  // We now use homeTeamSlug and awayTeamSlug to find the teams
  const homeTeam = getTeamBySlug(game.homeTeamSlug);
  const awayTeam = getTeamBySlug(game.awayTeamSlug);
  // --- END OF FIX ---

  if (!homeTeam || !awayTeam) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Team data could not be loaded for this game.
      </div>
    );
  }

  // Get rosters for each team to pass to TeamLeaders
  const homeRoster = Object.values(PLAYERS).filter(
    (p) => p.teamSlug === homeTeam.slug
  );
  const awayRoster = Object.values(PLAYERS).filter(
    (p) => p.teamSlug === awayTeam.slug
  );

  return (
    <main className="bg-gradient-to-b from-black via-[#111] to-black text-white min-h-screen">
      <MatchupHero game={game} homeTeam={homeTeam} awayTeam={awayTeam} />

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <HeadToHead homeTeam={homeTeam} awayTeam={awayTeam} />
          
          {/* Ad Placeholder */}
          <div className="bg-gray-800/50 border border-white/10 rounded-2xl h-40 flex items-center justify-center text-white/40">
            Advertisement
          </div>

          <TeamRoster roster={homeRoster} teamName={`${homeTeam.name} Roster`} teamSlug={homeTeam.slug} />
          <TeamRoster roster={awayRoster} teamName={`${awayTeam.name} Roster`} teamSlug={awayTeam.slug} />
        </div>
        <aside className="lg:col-span-1 space-y-6">
          <MatchupPredictor homeTeam={homeTeam} awayTeam={awayTeam} />
          <InjuryReport team={homeTeam} />
          <InjuryReport team={awayTeam} />
        </aside>
      </div>
    </main>
  );
}

// --- Sub-components for the Game Center Page ---

function MatchupHero({
  game,
  homeTeam,
  awayTeam,
}: {
  game: Game;
  homeTeam: Team;
  awayTeam: Team;
}) {
  const gameTime = new Date(game.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const gameDate = new Date(game.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-0 h-full w-1/2">
          <Image
            src={awayTeam.heroImage || awayTeam.bgImage}
            alt={`${awayTeam.name} background`}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image
            src={homeTeam.heroImage || homeTeam.bgImage}
            alt={`${homeTeam.name} background`}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/50 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="flex items-center justify-around w-full max-w-2xl">
          <Link
            href={`/sports/basketball/teams/${awayTeam.slug}`}
            className="flex flex-col items-center group"
          >
            <Image
              src={awayTeam.logo}
              alt={awayTeam.name}
              width={120}
              height={120}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <h2 className="text-2xl font-bold mt-2">{awayTeam.name}</h2>
            <p className="text-white/70">
              {awayTeam.wins}-{awayTeam.losses}
            </p>
          </Link>
          <span className="text-4xl font-bold text-gray-500 mx-8">VS</span>
          <Link
            href={`/sports/basketball/teams/${homeTeam.slug}`}
            className="flex flex-col items-center group"
          >
            <Image
              src={homeTeam.logo}
              alt={homeTeam.name}
              width={120}
              height={120}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <h2 className="text-2xl font-bold mt-2">{homeTeam.name}</h2>
            <p className="text-white/70">
              {homeTeam.wins}-{homeTeam.losses}
            </p>
          </Link>
        </div>
        <div className="mt-8 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-6 py-3">
          <p className="text-xl font-bold text-yellow-400">{gameTime}</p>
          <p className="text-white/80">
            {gameDate} • {game.venue}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-4">
          {game.status !== "FINAL" && game.ticketLink && (
            <Link
              href={game.ticketLink}
              className="bg-white text-black font-bold px-6 py-3 rounded-lg text-lg hover:bg-gray-200 transition"
            >
              Buy Tickets
            </Link>
          )}

          {game.liveStreamLink ? (
            <Link
              href={game.liveStreamLink}
              className="bg-red-600 text-white font-bold px-6 py-3 rounded-lg text-lg hover:bg-red-500 transition flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              {game.status === "LIVE" ? "Watch Live" : "Watch"}
            </Link>
          ) : (
            game.status !== "FINAL" && (
                <button
                className="bg-gray-700 text-white/50 font-bold px-6 py-3 rounded-lg text-lg cursor-not-allowed flex items-center gap-2"
                disabled
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                No Stream
                </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}

function HeadToHead({ homeTeam, awayTeam }: { homeTeam: Team; awayTeam: Team }) {
  const stats = [
    {
      label: "Points Per Game",
      home: homeTeam.stats.pointsPerGame,
      away: awayTeam.stats.pointsPerGame,
    },
    {
      label: "Rebounds Per Game",
      home: homeTeam.stats.reboundsPerGame,
      away: awayTeam.stats.reboundsPerGame,
    },
    {
      label: "Assists Per Game",
      home: homeTeam.stats.assistsPerGame,
      away: awayTeam.stats.assistsPerGame,
    },
    {
      label: "FG%",
      home: homeTeam.stats.fieldGoalPercentage * 100,
      away: awayTeam.stats.fieldGoalPercentage * 100,
    },
    {
      label: "3P%",
      home: homeTeam.stats.threePointPercentage * 100,
      away: awayTeam.stats.threePointPercentage * 100,
    },
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">Head-to-Head Stats</h2>
      <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6 space-y-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="grid grid-cols-3 items-center text-center gap-4"
          >
            <span
              className={`text-2xl font-bold ${
                stat.away > stat.home ? "text-white" : "text-white/60"
              }`}
            >
              {stat.away.toFixed(1)}
              {stat.label.includes("%") && "%"}
            </span>
            <span className="text-sm text-white/70">{stat.label}</span>
            <span
              className={`text-2xl font-bold ${
                stat.home > stat.away ? "text-white" : "text-white/60"
              }`}
            >
              {stat.home.toFixed(1)}
              {stat.label.includes("%") && "%"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MatchupPredictor({
  homeTeam,
  awayTeam,
}: {
  homeTeam: Team;
  awayTeam: Team;
}) {
  const calculatePowerIndex = (team: Team) => {
    const totalGames = team.wins + team.losses;
    if (totalGames === 0) return 50;
    const winPercentage = team.wins / totalGames;
    let pointDifferential = 0;
    const fgp = team.stats.fieldGoalPercentage;
    if (fgp && typeof fgp === "number" && fgp > 0) {
      const estimatedOpponentPPG =
        team.stats.pointsPerGame / (fgp * 2);
      pointDifferential = team.stats.pointsPerGame - estimatedOpponentPPG;
    }
    return winPercentage * 100 + pointDifferential;
  };

  const homePower = calculatePowerIndex(homeTeam);
  const awayPower = calculatePowerIndex(awayTeam);
  const totalPower = homePower + awayPower;
  const homeWinProbability = totalPower > 0 ? (homePower / totalPower) * 100 : 50;
  const awayWinProbability = totalPower > 0 ? (awayPower / totalPower) * 100 : 50;
  const awayDasharray = `${awayWinProbability.toFixed(2)} ${
    (100 - awayWinProbability).toFixed(2)
  }`;

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">Matchup Predictor</h2>
      <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6 flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#00529b" // Home team color
              strokeWidth="4"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#006400" // Away team color
              strokeWidth="4"
              strokeDasharray={awayDasharray}
              strokeDashoffset="25"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={awayTeam.logo}
              alt={awayTeam.name}
              width={40}
              height={40}
              className="absolute -ml-12"
            />
            <div className="h-16 w-px bg-white/20"></div>
            <Image
              src={homeTeam.logo}
              alt={homeTeam.name}
              width={40}
              height={40}
              className="absolute ml-12"
            />
          </div>
        </div>

        <div className="flex justify-between w-full mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">
              {awayWinProbability.toFixed(1)}%
            </p>
            <p className="text-sm text-white/70">{awayTeam.name}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">
              {homeWinProbability.toFixed(1)}%
            </p>
            <p className="text-sm text-white/70">{homeTeam.name}</p>
          </div>
        </div>

        <p className="text-xs text-white/50 mt-4">Based on Team Power Index</p>
      </div>
    </section>
  );
}

/**
 * TeamRoster: Displays a list of players on the team.
 * Re-using the component from the main team page, but we must
 * define it here or import it from a shared components folder.
 */
function TeamRoster({ roster, teamName, teamSlug }: { roster: Player[]; teamName: string; teamSlug: string }) {
    return (
      <section id="roster" className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-6">{teamName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div className="mt-6 text-right">
            <Link href={`/sports/basketball/teams/${teamSlug}`} className="text-sm font-medium text-yellow-400 hover:underline">
                View Full Team Hub →
            </Link>
        </div>
      </section>
    );
  }

/**
 * InjuryReport: Shows a list of injured players for a team.
 */
function InjuryReport({ team }: { team: Team }) {
    if (!team.injuries || team.injuries.length === 0) {
      return null; // Don't show the component if no injuries
    }
  
    return (
      <section className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
        <h3 className="text-2xl font-bold mb-4 text-white">Injury Report</h3>
        <ul className="space-y-3">
          {team.injuries.map((injury) => (
            <li key={injury.playerName} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{injury.playerName}</p>
                <p className="text-sm text-white/60">{injury.details}</p>
              </div>
              <span className="font-semibold text-red-400">{injury.status}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }
