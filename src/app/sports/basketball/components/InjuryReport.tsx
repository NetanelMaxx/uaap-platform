import React from 'react';
import { type Team } from '@/data/teams';

export default function InjuryReport({ team }: { team: Team }) {
  return (
    <section className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-white">Injury Report</h3>
      {(!team.injuries || team.injuries.length === 0) ? (
        <p className="text-white/60">No injuries reported.</p>
      ) : (
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
      )}
    </section>
  );
}