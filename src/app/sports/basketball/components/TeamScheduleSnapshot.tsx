import React from "react";
import { SCHEDULE, type Game } from "@/data/schedule";
import { TEAMS } from "@/data/teams";
import Link from "next/link";
import Image from "next/image";

// Helper to safely get team
function getTeam(slug: string) {
  const team = Object.values(TEAMS).find(t => t.slug === slug);
  return team || { name: "TBD", logo: "/images/placeholder.jpg", slug: "#" };
}

export default function TeamScheduleSnapshot({ teamSlug }: { teamSlug: string }) {
  const upcomingGames = SCHEDULE.filter(
    (game) =>
      (game.homeTeamSlug === teamSlug || game.awayTeamSlug === teamSlug) &&
      game.status === "UPCOMING"
  )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3); // Show next 3 games

  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-white">Upcoming Games</h3>
      {upcomingGames.length > 0 ? (
        <ul className="space-y-4">
          {upcomingGames.map((game) => {
            // Find the opponent based on the slug
            const opponentSlug = game.homeTeamSlug === teamSlug ? game.awayTeamSlug : game.homeTeamSlug;
            const opponent = getTeam(opponentSlug);
            
            const gameDate = new Date(game.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
            const gameTime = new Date(game.date).toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true });

            return (
              <li key={game.id} className="p-3 bg-white/5 rounded-lg border border-white/10 transition-colors hover:border-white/20">
                <Link href={`/sports/basketball/games/${game.id}`} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={opponent.logo} alt={opponent.name} width={28} height={28} />
                    <span className="font-semibold">{opponent.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white/90">{gameDate}</div>
                    <div className="text-xs text-white/60">{gameTime}</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-white/60">No upcoming games scheduled.</p>
      )}
      <Link href="/sports/basketball/schedule" className="block text-center mt-4 text-yellow-400 font-semibold text-sm hover:underline">
        View Full Schedule
      </Link>
    </div>
  );
}

