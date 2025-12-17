import React from "react";
import { SCHEDULE, type Game } from "@/data/schedule"; // Correct import
import ScoreBox from "../components/ScoreBox"; // Import the new component

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
export default function ScoresPage() {
  // Filter for only LIVE and FINAL games
  const completedGames = SCHEDULE.filter(
    (game) => game.status === "LIVE" || game.status === "FINAL"
  );
  
  const groupedGames = groupGamesByDate(completedGames);
  const dates = Array.from(groupedGames.keys());

  return (
    <main className="bg-gradient-to-b from-[#101010] to-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Scores & Recaps
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Catch up on all the recent action from around the league.
          </p>
        </header>

        <div className="space-y-10">
          {dates.length > 0 ? (
            dates.map((date) => (
              <section key={date}>
                <h2 className="text-xl font-semibold text-center text-white/80 tracking-widest uppercase mb-6">
                  {date}
                </h2>
                <div className="space-y-4">
                  {groupedGames.get(date)?.map((game) => (
                    <ScoreBox key={game.id} game={game} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-white/90">
                No scores to display.
              </h3>
              <p className="text-white/60 mt-2">
                Check back soon for the latest results.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

