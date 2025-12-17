import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type Game } from '@/data/schedule';
import { TEAMS } from '@/data/teams';

interface ScoreBoxProps {
  game: Game;
}

export default function ScoreBox({ game }: ScoreBoxProps) {
  const gameTime = new Date(game.date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Safely get team data
  const homeTeam = Object.values(TEAMS).find(t => t.slug === game.homeTeamSlug);
  const awayTeam = Object.values(TEAMS).find(t => t.slug === game.awayTeamSlug);
  
  // Fallback data in case a team isn't found (prevents crash)
  const safeAwayTeam = awayTeam || { name: game.awayTeamSlug, slug: '#', logo: '/images/placeholder.jpg', wins: 0, losses: 0 };
  const safeHomeTeam = homeTeam || { name: game.homeTeamSlug, slug: '#', logo: '/images/placeholder.jpg', wins: 0, losses: 0 };

  const isAwayWinner = game.status === 'FINAL' && (game.awayTeamScore ?? 0) > (game.homeTeamScore ?? 0);
  const isHomeWinner = game.status === 'FINAL' && (game.homeTeamScore ?? 0) > (game.awayTeamScore ?? 0);

  return (
    <Link href={`/sports/basketball/games/${game.id}`} className="block">
      <div className="bg-gray-900/50 border border-white/10 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:border-yellow-400/50 hover:bg-gray-800/60">
        <div className="flex items-center justify-between p-4">
          {/* Teams Column */}
          <div className="flex-1 space-y-2">
            {/* Away Team */}
            <div className="flex items-center gap-3">
              <Image
                src={safeAwayTeam.logo}
                alt={safeAwayTeam.name}
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className={`text-lg ${isAwayWinner ? 'font-bold text-white' : 'text-white/80'}`}>
                {safeAwayTeam.name}
              </span>
              {game.status !== 'UPCOMING' && (
                <span className={`ml-auto text-lg font-bold ${isAwayWinner ? 'text-white' : 'text-white/60'}`}>
                  {game.awayTeamScore}
                </span>
              )}
            </div>
            {/* Home Team */}
            <div className="flex items-center gap-3">
              <Image
                src={safeHomeTeam.logo}
                alt={safeHomeTeam.name}
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className={`text-lg ${isHomeWinner ? 'font-bold text-white' : 'text-white/80'}`}>
                {safeHomeTeam.name}
              </span>
              {game.status !== 'UPCOMING' && (
                <span className={`ml-auto text-lg font-bold ${isHomeWinner ? 'text-white' : 'text-white/60'}`}>
                  {game.homeTeamScore}
                </span>
              )}
            </div>
          </div>

          {/* Status Column */}
          <div className="w-24 flex-shrink-0 text-right">
            {game.status === 'LIVE' && (
              <div className="flex items-center justify-end gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-red-500 font-bold text-sm">LIVE</span>
              </div>
            )}
            {game.status === 'UPCOMING' && (
              <span className="font-semibold text-sm text-yellow-400">{gameTime}</span>
            )}
            {game.status === 'FINAL' && (
              <span className="font-semibold text-sm text-gray-400">FINAL</span>
            )}
            <p className="text-xs text-white/50 mt-1">{game.venue}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}