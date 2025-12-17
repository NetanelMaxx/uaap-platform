// This interface should already exist in /src/data/players.ts
// But we'll re-declare it here briefly for the TeamLeaders component.
// A better long-term solution would be a central `types.ts` file.
interface PlayerStats {
  gamesPlayed: number;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
}

// --- DEFINE NEW TYPES ---
interface TeamStats {
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
}

interface TeamHistory {
  season: string;
  record: string; // e.g., "12-2"
  result: string; // e.g., "Champions", "Final Four", "Eliminated"
}

interface InjuryReport {
  playerName: string;
  status: string; // e.g., "Day-to-Day", "Out"
  details: string; // e.g., "Sprained Ankle"
}

// --- UPDATE THE MAIN TEAM TYPE ---
export interface Team {
  slug: string;
  name: string;
  logo: string; // Path to logo
  bgImage: string; // Path to general background image
  heroImage: string; // Path to specific hero image
  wins: number;
  losses: number;
  stats: TeamStats;
  history?: TeamHistory[]; // <-- ADDED (optional)
  injuries?: InjuryReport[]; // <-- ADDED (optional)
}

// Mock Team Data (This should be the same as before)
export const TEAMS: Record<string, Team> = {
  "ateneo-blue-eagles": {
    slug: "ateneo-blue-eagles",
    name: "Ateneo Blue Eagles",
    logo: "/images/teams/ateneo-logo.png",
    bgImage: "/images/teams/ateneo-bg.jpg",
    heroImage: "/images/teams/ateneo-full.png",
    wins: 11,
    losses: 3,
    stats: {
      pointsPerGame: 78.5,
      reboundsPerGame: 40.2,
      assistsPerGame: 15.1,
      stealsPerGame: 7.3,
      blocksPerGame: 4.1,
      fieldGoalPercentage: 0.44,
      threePointPercentage: 0.32,
    },
    history: [
      { season: "S87", record: "12-2", result: "Champions" },
      { season: "S86", record: "10-4", result: "Final Four" },
      { season: "S85", record: "11-3", result: "Runner-up" },
    ],
    injuries: [
      { playerName: "Mike Nieto", status: "Day-to-Day", details: "Ankle Sprain" }
    ]
  },
  "dlsu-green-archers": {
    slug: "dlsu-green-archers",
    name: "DLSU Green Archers",
    logo: "/images/teams/la-salle-logo.png",
    bgImage: "/images/teams/la-salle-bg.jpg",
    heroImage: "/images/teams/la-salle-bg.jpg",
    wins: 10,
    losses: 4,
    stats: {
      pointsPerGame: 82.1,
      reboundsPerGame: 42.5,
      assistsPerGame: 14.5,
      stealsPerGame: 8.1,
      blocksPerGame: 5.0,
      fieldGoalPercentage: 0.45,
      threePointPercentage: 0.30,
    },
    history: [
      { season: "S87", record: "10-4", result: "Runner-up" },
      { season: "S86", record: "11-3", result: "Champions" },
      { season: "S85", record: "9-5", result: "Final Four" },
    ],
    injuries: []
  },
  "up-fighting-maroons": {
    slug: "up-fighting-maroons",
    name: "UP Fighting Maroons",
    logo: "/images/teams/up-logo.png",
    bgImage: "/images/teams/up-bg.jpg",
    heroImage: "/images/teams/up-bg.webp",
    wins: 12,
    losses: 2,
    stats: {
      pointsPerGame: 80.2,
      reboundsPerGame: 41.0,
      assistsPerGame: 16.2,
      stealsPerGame: 7.8,
      blocksPerGame: 4.5,
      fieldGoalPercentage: 0.46,
      threePointPercentage: 0.34,
    },
     history: [
      { season: "S87", record: "12-2", result: "Final Four" },
      { season: "S86", record: "12-2", result: "Runner-up" },
      { season: "S85", record: "14-0", result: "Champions" },
    ],
    injuries: [
        { playerName: "Gerry Abadiano", status: "Out", details: "Knee Injury" },
        { playerName: "CJ Cansino", status: "Probable", details: "Flu" }
    ]
  },
  "ust-growling-tigers": {
    slug: "ust-growling-tigers",
    name: "UST Growling Tigers",
    logo: "/images/teams/ust-logo.png",
    bgImage: "/images/teams/ust-bg.jpeg",
    heroImage: "/images/teams/ust-bg.jpeg",
    wins: 6,
    losses: 8,
    stats: {
      pointsPerGame: 75.5,
      reboundsPerGame: 38.1,
      assistsPerGame: 13.5,
      stealsPerGame: 6.5,
      blocksPerGame: 3.1,
      fieldGoalPercentage: 0.41,
      threePointPercentage: 0.29,
    },
    history: [
      { season: "S87", record: "6-8", result: "5th Place" },
      { season: "S86", record: "2-12", result: "7th Place" },
      { season: "S85", record: "5-9", result: "6th Place" },
    ],
    injuries: []
  },
  "feu-tamaraws": {
    slug: "feu-tamaraws",
    name: "FEU Tamaraws",
    logo: "/images/teams/feu-logo.png",
    bgImage: "/images/teams/feu-bg.jpg",
    heroImage: "/images/teams/feu-bg.jpg",
    wins: 8,
    losses: 6,
    stats: {
      pointsPerGame: 72.0,
      reboundsPerGame: 39.5,
      assistsPerGame: 14.0,
      stealsPerGame: 7.0,
      blocksPerGame: 3.5,
      fieldGoalPercentage: 0.42,
      threePointPercentage: 0.31,
    },
    history: [
      { season: "S87", record: "8-6", result: "Final Four" },
      { season: "S86", record: "7-7", result: "5th Place" },
      { season: "S85", record: "7-7", result: "5th Place" },
    ],
    injuries: []
  },
  "nu-bulldogs": {
    slug: "nu-bulldogs",
    name: "NU Bulldogs",
    logo: "/images/teams/nu-logo.png",
    bgImage: "/images/teams/nu-bg.jpg",
    heroImage: "/images/teams/nu-bg.jpg",
    wins: 9,
    losses: 5,
    stats: {
      pointsPerGame: 77.3,
      reboundsPerGame: 43.1,
      assistsPerGame: 13.8,
      stealsPerGame: 7.1,
      blocksPerGame: 4.8,
      fieldGoalPercentage: 0.43,
      threePointPercentage: 0.30,
    },
     history: [
      { season: "S87", record: "9-5", result: "Final Four" },
      { season: "S86", record: "9-5", result: "Final Four" },
      { season: "S85", record: "8-6", result: "4th Place" },
    ],
    injuries: []
  },
};
