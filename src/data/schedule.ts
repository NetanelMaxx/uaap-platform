// This interface defines the structure of a game
export interface Game {
  id: string;
  date: string; // ISO 8601 format: "YYYY-MM-DDTHH:mm:ss.sssZ"
  venue: string;
  status: "UPCOMING" | "LIVE" | "FINAL";
  homeTeamSlug: string; // e.g., "ateneo-blue-eagles"
  awayTeamSlug: string; // e.g., "dlsu-green-archers"
  homeTeamScore?: number;
  awayTeamScore?: number;
  broadcast?: string; // e.g., "UAAP Varsity Channel"
  liveStreamLink?: string;
  ticketLink?: string; 
}

// This is the exported list of games
export const SCHEDULE: Game[] = [
  // --- UPCOMING GAMES ---
  {
    id: "game-001",
    date: "2025-10-22T16:00:00.000Z", // 4:00 PM
    venue: "Mall of Asia Arena",
    status: "UPCOMING",
    homeTeamSlug: "ateneo-blue-eagles",
    awayTeamSlug: "dlsu-green-archers",
    broadcast: "UAAP Varsity Channel",
    liveStreamLink: "#",
    ticketLink: "#tickets-sm-aura",
  },
  {
    id: "game-002",
    date: "2025-10-22T18:00:00.000Z", // 6:00 PM
    venue: "Mall of Asia Arena",
    status: "UPCOMING",
    homeTeamSlug: "up-fighting-maroons",
    awayTeamSlug: "ust-growling-tigers",
    broadcast: "One Sports+",
    liveStreamLink: "#",
    ticketLink: "#tickets-sm-aura",
  },
  
  // --- A LIVE GAME ---
  {
    id: "game-003",
    date: "2025-10-20T16:00:00.000Z",
    venue: "Smart Araneta Coliseum",
    status: "LIVE",
    homeTeamSlug: "feu-tamaraws",
    awayTeamSlug: "nu-bulldogs",
    homeTeamScore: 68,
    awayTeamScore: 72,
    broadcast: "UAAP Varsity Channel",
    liveStreamLink: "#",
  },
  
  // --- FINAL/PAST GAMES ---
  {
    id: "game-004",
    date: "2025-10-18T18:00:00.000Z",
    venue: "Smart Araneta Coliseum",
    status: "FINAL",
    homeTeamSlug: "ateneo-blue-eagles",
    awayTeamSlug: "up-fighting-maroons",
    homeTeamScore: 88,
    awayTeamScore: 85,
  },
  {
    id: "game-005",
    date: "2025-10-18T16:00:00.000Z",
    venue: "Smart Araneta Coliseum",
    status: "FINAL",
    homeTeamSlug: "dlsu-green-archers",
    awayTeamSlug: "ust-growling-tigers",
    homeTeamScore: 92,
    awayTeamScore: 78,
  },
  {
    id: "game-006",
    date: "2025-10-15T16:00:00.000Z",
    venue: "Mall of Asia Arena",
    status: "FINAL",
    homeTeamSlug: "up-fighting-maroons",
    awayTeamSlug: "feu-tamaraws",
    homeTeamScore: 76,
    awayTeamScore: 70,
  },
];
