import React from 'react';
import { type Team } from '@/data/teams';

export default function TeamHistory({ team }: { team: Team }) {
  if (!team.history || team.history.length === 0) return null;

  return (
    <section className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-white">Season History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/20 text-white/60 uppercase text-sm">
              <th className="py-2 pr-4 font-medium">Season</th>
              <th className="py-2 px-4 font-medium">Record</th>
              <th className="py-2 pl-4 font-medium">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {team.history.map((season) => (
              <tr key={season.season}>
                <td className="py-3 pr-4 font-semibold">{season.season}</td>
                <td className="py-3 px-4">{season.record}</td>
                <td className="py-3 pl-4">{season.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
