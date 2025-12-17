// Define the structure for player statistics (can be reused for season/career)
export interface PlayerStats {
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

// Define the structure for a single game log entry
export interface GameLogEntry {
  gameId: string; // Link to the game in schedule.ts
  opponentSlug: string; // Slug of the opponent team
  opponentName: string;
  opponentLogo: string;
  result: string; // e.g., "W 98-95"
  date: string; // e.g., "Oct 26"
  points: number;
  rebounds: number;
  assists: number;
}

// Define the main Player type with all the new fields
export interface Player {
  slug: string; // Unique identifier (e.g., "john-doe")
  name: string;
  number: number;
  position: string;
  team: string; // Team name
  teamSlug: string; // Team identifier (e.g., "ateneo-blue-eagles")

  // Images
  headshot: string; // URL for close-up photo
  cutout?: string; // URL for cutout image (optional)
  heroImage: string; // URL for a wide banner/background image

  // Bio & Details
  height: string; // e.g., "6'5\""
  weight: string; // e.g., "210 lbs"
  birthdate: string; // e.g., "March 15, 2001 (Age 24)"
  college: string; // e.g., "Ateneo de Manila University"
  status: string; // e.g., "Active", "Injured (Knee)", "Suspended"
  bio: string; // Short biography paragraph

  // Social Media Links (Optional)
  socials?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };

  // Current Season Stats (Expanded) - Let's assume this represents "Season 88"
  stats: PlayerStats;

  // Career Stats (NEW)
  careerStats: PlayerStats;

  // Recent Game Log (NEW)
  recentGames: GameLogEntry[];
}

// Mock Player Data (Expanded with at least 2 players per team)
export const PLAYERS: Record<string, Player> = {
  // --- Ateneo ---
  "kymani-ladi": {
    slug: "kymani-ladi",
    name: "Kymani Ladi",
    number: 7,
    position: "Forward",
    team: "Ateneo Blue Eagles",
    teamSlug: "ateneo-blue-eagles",
    headshot: "/images/players/Kymani.jpg",
    heroImage: "/images/teams/ateneo-full.png",
    height: "6'8\"",
    weight: "185 lbs",
    birthdate: "N/A",
    college: "Ateneo de Manila University",
    status: "Active",
    bio: "A dynamic scoring forward known for his clutch shooting and court vision. Led the Blue Eagles to the championship last season and is a frontrunner for this year's MVP award.",
    socials: {
      twitter: "https://twitter.com/uaap",
      instagram: "https://instagram.com/uaap",
    },
    stats: {
      gamesPlayed: 14,
      pointsPerGame: 22.5,
      reboundsPerGame: 5.1,
      assistsPerGame: 4.3,
      stealsPerGame: 1.5,
      blocksPerGame: 0.3,
      fieldGoalPercentage: 0.48,
      threePointPercentage: 0.39,
      freeThrowPercentage: 0.88,
    },
    careerStats: {
      gamesPlayed: 58,
      pointsPerGame: 18.2,
      reboundsPerGame: 4.5,
      assistsPerGame: 3.8,
      stealsPerGame: 1.2,
      blocksPerGame: 0.2,
      fieldGoalPercentage: 0.46,
      threePointPercentage: 0.37,
      freeThrowPercentage: 0.85,
    },
    recentGames: [
      { gameId: "game-004", opponentSlug: "up-fighting-maroons", opponentName: "UP", opponentLogo: "/images/teams/up-logo.png", date: "Oct 18", result: "W 88-85", points: 25, rebounds: 6, assists: 5 },
      { gameId: "game-001", opponentSlug: "dlsu-green-archers", opponentName: "DLSU", opponentLogo: "/images/teams/la-salle-logo.png", date: "Oct 15", result: "L 78-65", points: 18, rebounds: 4, assists: 3 },
    ],
  },
  "kyle-gamber": {
    slug: "kyle-gamber",
    name: "Kyle Gamber",
    number: 11,
    position: "Guard/Forward",
    team: "Ateneo Blue Eagles",
    teamSlug: "ateneo-blue-eagles",
    headshot: "/images/players/Kyle.jpg",
    heroImage: "/images/teams/ateneo-bg.jpg",
    height: "6'3\"",
    weight: "210 lbs",
    birthdate: "N/A",
    college: "Ateneo de Manila University",
    status: "Active",
    bio: "A versatile forward known for his high-energy play and defensive prowess. A key lockdown defender for the Blue Eagles.",
    socials: {},
    stats: {
      gamesPlayed: 14,
      pointsPerGame: 12.1,
      reboundsPerGame: 7.8,
      assistsPerGame: 2.2,
      stealsPerGame: 1.8,
      blocksPerGame: 1.1,
      fieldGoalPercentage: 0.51,
      threePointPercentage: 0.30,
      freeThrowPercentage: 0.72,
    },
    careerStats: {
      gamesPlayed: 55,
      pointsPerGame: 9.5,
      reboundsPerGame: 6.2,
      assistsPerGame: 1.9,
      stealsPerGame: 1.4,
      blocksPerGame: 0.9,
      fieldGoalPercentage: 0.49,
      threePointPercentage: 0.28,
      freeThrowPercentage: 0.70,
    },
    recentGames: [
      { gameId: "game-004", opponentSlug: "up-fighting-maroons", opponentName: "UP", opponentLogo: "/images/teams/up-logo.png", date: "Oct 18", result: "W 88-85", points: 14, rebounds: 9, assists: 2 },
      { gameId: "game-001", opponentSlug: "dlsu-green-archers", opponentName: "DLSU", opponentLogo: "/images/teams/la-salle-logo.png", date: "Oct 15", result: "L 78-65", points: 10, rebounds: 6, assists: 1 },
    ],
  },

  // --- DLSU ---
  "kevin-quiambao": {
    slug: "kevin-quiambao",
    name: "Kevin Quiambao",
    number: 14,
    position: "Forward",
    team: "DLSU Green Archers",
    teamSlug: "dlsu-green-archers",
    headshot: "/images/players/kevin-quiambao.webp",
    heroImage: "/images/teams/la-salle-bg.jpg",
    height: "6'6\"",
    weight: "215 lbs",
    birthdate: "April 22, 2001 (Age 24)",
    college: "De La Salle University",
    status: "Active",
    bio: "Reigning MVP known for his all-around game, playmaking ability, and leadership on the court. A consistent triple-double threat every time he steps on the floor.",
    socials: {
      instagram: "https://instagram.com/uaap",
    },
    stats: {
      gamesPlayed: 14,
      pointsPerGame: 16.7,
      reboundsPerGame: 10.9,
      assistsPerGame: 6.0,
      stealsPerGame: 1.9,
      blocksPerGame: 1.2,
      fieldGoalPercentage: 0.45,
      threePointPercentage: 0.28,
      freeThrowPercentage: 0.77,
    },
    careerStats: {
      gamesPlayed: 42,
      pointsPerGame: 14.5,
      reboundsPerGame: 9.0,
      assistsPerGame: 5.1,
      stealsPerGame: 1.5,
      blocksPerGame: 1.0,
      fieldGoalPercentage: 0.44,
      threePointPercentage: 0.27,
      freeThrowPercentage: 0.75,
    },
    recentGames: [
      { gameId: "game-005", opponentSlug: "ust-growling-tigers", opponentName: "UST", opponentLogo: "/images/teams/ust-logo.png", date: "Oct 18", result: "W 92-78", points: 22, rebounds: 14, assists: 8 },
      { gameId: "game-001", opponentSlug: "ateneo-blue-eagles", opponentName: "ADMU", opponentLogo: "/images/teams/ateneo-logo.png", date: "Oct 15", result: "W 78-65", points: 19, rebounds: 11, assists: 7 },
    ],
  },
  "guillian-quines": {
    slug: "guillian-quines",
    name: "Guillian Quines",
    number: 23,
    position: "Guard",
    team: "DLSU Green Archers",
    teamSlug: "dlsu-green-archers",
    headshot: "/images/players/guillian.jpg",
    heroImage: "/images/players/jane-smith-hero.jpg",
    height: "6'0\"",
    weight: "175 lbs",
    birthdate: "July 20, 2000 (Age 25)",
    college: "De La Salle University",
    status: "Active",
    bio: "A sharpshooting guard with a quick release. Smith is a key floor spacer for the Green Archers, known for hitting timely three-pointers.",
    socials: {
        instagram: "https://instagram.com/janesmith"
    },
    stats: {
      gamesPlayed: 14,
      pointsPerGame: 14.2,
      reboundsPerGame: 3.1,
      assistsPerGame: 2.5,
      stealsPerGame: 1.1,
      blocksPerGame: 0.1,
      fieldGoalPercentage: 0.42,
      threePointPercentage: 0.41,
      freeThrowPercentage: 0.90,
    },
     careerStats: { 
      gamesPlayed: 40,
      pointsPerGame: 12.1,
      reboundsPerGame: 2.5,
      assistsPerGame: 2.0,
      stealsPerGame: 0.9,
      blocksPerGame: 0.1,
      fieldGoalPercentage: 0.40,
      threePointPercentage: 0.39,
      freeThrowPercentage: 0.88,
    },
    recentGames: [
        { gameId: "game-005", opponentSlug: "ust-growling-tigers", opponentName: "UST", opponentLogo: "/images/teams/ust-logo.png", date: "Oct 18", result: "W 92-78", points: 15, rebounds: 3, assists: 4 },
        { gameId: "game-001", opponentSlug: "ateneo-blue-eagles", opponentName: "ADMU", opponentLogo: "/images/teams/ateneo-logo.png", date: "Oct 15", result: "W 78-65", points: 18, rebounds: 2, assists: 3 },
    ]
  },

  // --- UP ---
  "carl-tamayo": {
    slug: "carl-tamayo",
    name: "Carl Tamayo",
    number: 33,
    position: "Forward/Center",
    team: "UP Fighting Maroons",
    teamSlug: "up-fighting-maroons",
    headshot: "/images/players/carl-tamayo-headshot.png",
    heroImage: "/images/teams/up-full.png",
    height: "6'8\"",
    weight: "225 lbs",
    birthdate: "February 13, 2001 (Age 24)",
    college: "University of the Philippines",
    status: "Active",
    bio: "Former UAAP MVP known for his scoring prowess and versatility inside and out. A cornerstone of the UP Fighting Maroons' recent success.",
    stats: { 
      gamesPlayed: 14,
      pointsPerGame: 19.1,
      reboundsPerGame: 9.8,
      assistsPerGame: 2.5,
      stealsPerGame: 0.9,
      blocksPerGame: 1.1,
      fieldGoalPercentage: 0.49,
      threePointPercentage: 0.35,
      freeThrowPercentage: 0.78,
    },
    careerStats: {
      gamesPlayed: 56,
      pointsPerGame: 17.5,
      reboundsPerGame: 9.2,
      assistsPerGame: 2.2,
      stealsPerGame: 0.8,
      blocksPerGame: 1.0,
      fieldGoalPercentage: 0.47,
      threePointPercentage: 0.33,
      freeThrowPercentage: 0.76,
    },
    recentGames: [
         { gameId: "game-004", opponentSlug: "ateneo-blue-eagles", opponentName:"ADMU", opponentLogo: "/images/teams/ateneo-logo.png", date: "Oct 18", result: "L 85-88", points: 21, rebounds: 11, assists: 3 },
         { gameId: "game-006", opponentSlug: "feu-tamaraws", opponentName:"FEU", opponentLogo: "/images/teams/feu-logo.png", date: "Oct 15", result: "W 76-70", points: 24, rebounds: 10, assists: 2 },
    ]
  },
  "gerry-abadiano": {
    slug: "gerry-abadiano",
    name: "Gerry Abadiano",
    number: 1,
    position: "Guard",
    team: "UP Fighting Maroons",
    teamSlug: "up-fighting-maroons",
    headshot: "https://placehold.co/200x200/800000/FFFFFF?text=G+A",
    heroImage: "/images/teams/up-bg.jpg",
    height: "6'0\"",
    weight: "175 lbs",
    birthdate: "May 10, 2000 (Age 25)",
    college: "University of the Philippines",
    status: "Injured (Knee)",
    bio: "Tenacious defender and reliable point guard, currently recovering from a knee injury.",
    socials: {},
    stats: {
      gamesPlayed: 5,
      pointsPerGame: 8.2,
      reboundsPerGame: 2.1,
      assistsPerGame: 3.5,
      stealsPerGame: 1.4,
      blocksPerGame: 0.1,
      fieldGoalPercentage: 0.41,
      threePointPercentage: 0.33,
      freeThrowPercentage: 0.81,
    },
    careerStats: {
      gamesPlayed: 50,
      pointsPerGame: 9.5,
      reboundsPerGame: 2.8,
      assistsPerGame: 4.0,
      stealsPerGame: 1.6,
      blocksPerGame: 0.2,
      fieldGoalPercentage: 0.43,
      threePointPercentage: 0.34,
      freeThrowPercentage: 0.80,
    },
    recentGames: []
  },
  // --- UST ---
  "nic-cabanero": {
    slug: "nic-cabanero",
    name: "Nic Cabañero",
    number: 9,
    position: "Guard/Forward",
    team: "UST Growling Tigers",
    teamSlug: "ust-growling-tigers",
    headshot: "https://placehold.co/200x200/FFC72C/000000?text=NC",
    heroImage: "/images/teams/ust-full.png",
    height: "6'3\"",
    weight: "190 lbs",
    birthdate: "January 1, 2003 (Age 22)",
    college: "University of Santo Tomas",
    status: "Active",
    bio: "The primary offensive weapon for the Tigers, known for his scoring ability and toughness.",
    socials: {},
    stats: {
      gamesPlayed: 14,
      pointsPerGame: 24.1,
      reboundsPerGame: 6.5,
      assistsPerGame: 2.8,
      stealsPerGame: 1.1,
      blocksPerGame: 0.4,
      fieldGoalPercentage: 0.42,
      threePointPercentage: 0.31,
      freeThrowPercentage: 0.81,
    },
    careerStats: {
      gamesPlayed: 42,
      pointsPerGame: 20.2,
      reboundsPerGame: 5.8,
      assistsPerGame: 2.5,
      stealsPerGame: 1.0,
      blocksPerGame: 0.3,
      fieldGoalPercentage: 0.41,
      threePointPercentage: 0.30,
      freeThrowPercentage: 0.79,
    },
    recentGames: [
      { gameId: "game-005", opponentSlug: "dlsu-green-archers", opponentName: "DLSU", opponentLogo: "/images/teams/la-salle-logo.png", date: "Oct 18", result: "L 78-92", points: 30, rebounds: 7, assists: 3 },
    ]
  },
  "mark-nonoy": {
    slug: "mark-nonoy",
    name: "Mark Nonoy",
    number: 8,
    position: "Guard",
    team: "UST Growling Tigers",
    teamSlug: "ust-growling-tigers",
    headshot: "https://placehold.co/200x200/FFC72C/000000?text=MN",
    heroImage: "/images/teams/ust-bg.jpg",
    height: "5'10\"",
    weight: "165 lbs",
    birthdate: "April 4, 2000 (Age 25)",
    college: "University of Santo Tomas",
    status: "Active",
    bio: "A quick and shifty guard, providing a secondary scoring punch and solid defense for the Tigers.",
    socials: {},
    stats: {
      gamesPlayed: 14,
      pointsPerGame: 11.2,
      reboundsPerGame: 2.5,
      assistsPerGame: 3.1,
      stealsPerGame: 1.3,
      blocksPerGame: 0.1,
      fieldGoalPercentage: 0.40,
      threePointPercentage: 0.33,
      freeThrowPercentage: 0.75,
    },
    careerStats: {
      gamesPlayed: 50,
      pointsPerGame: 10.5,
      reboundsPerGame: 2.2,
      assistsPerGame: 2.8,
      stealsPerGame: 1.1,
      blocksPerGame: 0.1,
      fieldGoalPercentage: 0.39,
      threePointPercentage: 0.32,
      freeThrowPercentage: 0.77,
    },
    recentGames: [
      { gameId: "game-005", opponentSlug: "dlsu-green-archers", opponentName: "DLSU", opponentLogo: "/images/teams/la-salle-logo.png", date: "Oct 18", result: "L 78-92", points: 12, rebounds: 2, assists: 4 },
    ]
  },
  
  // --- FEU ---
  "lj-reyes": {
    slug: "lj-reyes",
    name: "LJ Reyes",
    number: 10,
    position: "Guard",
    team: "FEU Tamaraws",
    teamSlug: "feu-tamaraws",
    headshot: "https://placehold.co/200x200/006400/FFFFFF?text=LJ",
    heroImage: "/images/teams/feu-full.png",
    height: "6'1\"",
    weight: "180 lbs",
    birthdate: "June 1, 2002 (Age 23)",
    college: "Far Eastern University",
    status: "Active",
    bio: "A reliable playmaker and the leader of the Tamaraws' backcourt.",
    socials: {},
    stats: {
      gamesPlayed: 14,
      pointsPerGame: 14.5,
      reboundsPerGame: 4.5,
      assistsPerGame: 5.5,
      stealsPerGame: 1.6,
      blocksPerGame: 0.2,
      fieldGoalPercentage: 0.43,
      threePointPercentage: 0.36,
      freeThrowPercentage: 0.80,
    },
    careerStats: {
      gamesPlayed: 40,
      pointsPerGame: 12.0,
      reboundsPerGame: 3.8,
      assistsPerGame: 4.2,
      stealsPerGame: 1.3,
      blocksPerGame: 0.1,
      fieldGoalPercentage: 0.41,
      threePointPercentage: 0.34,
      freeThrowPercentage: 0.78,
    },
    recentGames: [
      { gameId: "game-006", opponentSlug: "up-fighting-maroons", opponentName: "UP", opponentLogo: "/images/teams/up-logo.png", date: "Oct 15", result: "L 70-76", points: 16, rebounds: 5, assists: 7 },
    ]
  },
  "patrick-tchuente": {
    slug: "patrick-tchuente",
    name: "Patrick Tchuente",
    number: 21,
    position: "Center",
    team: "FEU Tamaraws",
    teamSlug: "feu-tamaraws",
    headshot: "https://placehold.co/200x200/006400/FFFFFF?text=PT",
    heroImage: "/images/teams/feu-bg.jpg",
    height: "6'10\"",
    weight: "240 lbs",
    birthdate: "Sep 9, 1999 (Age 26)",
    college: "Far Eastern University",
    status: "Active",
    bio: "A dominant force in the paint, leading the league in blocked shots.",
    socials: {},
    stats: {
      gamesPlayed: 14,
      pointsPerGame: 11.2,
      reboundsPerGame: 11.5,
      assistsPerGame: 1.0,
      stealsPerGame: 0.5,
      blocksPerGame: 2.8,
      fieldGoalPercentage: 0.55,
      threePointPercentage: 0.0,
      freeThrowPercentage: 0.60,
    },
    careerStats: {
      gamesPlayed: 42,
      pointsPerGame: 10.1,
      reboundsPerGame: 10.8,
      assistsPerGame: 0.8,
      stealsPerGame: 0.4,
      blocksPerGame: 2.5,
      fieldGoalPercentage: 0.53,
      threePointPercentage: 0.0,
      freeThrowPercentage: 0.58,
    },
    recentGames: [
      { gameId: "game-006", opponentSlug: "up-fighting-maroons", opponentName: "UP", opponentLogo: "/images/teams/up-logo.png", date: "Oct 15", result: "L 70-76", points: 12, rebounds: 15, assists: 1 },
    ]
  },
  // --- NU Bulldogs ---
  "steve-nash-enriquez": {
    slug: "steve-nash-enriquez",
    name: "Steve Nash Enriquez",
    number: 10,
    position: "Guard",
    team: "NU Bulldogs",
    teamSlug: "nu-bulldogs",
    headshot: "https://placehold.co/200x200/000080/FFFFFF?text=SN",
    heroImage: "/images/teams/nu-full.png",
    height: "5'11\"",
    weight: "170 lbs",
    birthdate: "Jan 30, 2002 (Age 23)",
    college: "National University",
    status: "Active",
    bio: "A quick and crafty point guard who runs the offense for the Bulldogs. Known for his high basketball IQ and ability to deliver in the clutch.",
    socials: {},
    stats: {
      gamesPlayed: 14,
      pointsPerGame: 13.5,
      reboundsPerGame: 3.2,
      assistsPerGame: 5.8,
      stealsPerGame: 1.9,
      blocksPerGame: 0.1,
      fieldGoalPercentage: 0.43,
      threePointPercentage: 0.37,
      freeThrowPercentage: 0.84,
    },
    careerStats: {
      gamesPlayed: 40,
      pointsPerGame: 11.2,
      reboundsPerGame: 2.9,
      assistsPerGame: 4.5,
      stealsPerGame: 1.5,
      blocksPerGame: 0.1,
      fieldGoalPercentage: 0.41,
      threePointPercentage: 0.35,
      freeThrowPercentage: 0.82,
    },
    recentGames: [
      { gameId: "game-003", opponentSlug: "feu-tamaraws", opponentName: "FEU", opponentLogo: "/images/teams/feu-logo.png", date: "Oct 20", result: "W 72-68", points: 18, rebounds: 4, assists: 7 },
    ]
  },
  "jake-figueroa": {
    slug: "jake-figueroa",
    name: "Jake Figueroa",
    number: 13,
    position: "Forward",
    team: "NU Bulldogs",
    teamSlug: "nu-bulldogs",
    headshot: "https://placehold.co/200x200/000080/FFFFFF?text=JF",
    heroImage: "/images/teams/nu-bg.jpg",
    height: "6'4\"",
    weight: "205 lbs",
    birthdate: "May 1, 2001 (Age 24)",
    college: "National University",
    status: "Active",
    bio: "A strong and athletic wing who excels at defense and rebounding. Provides grit and toughness for the Bulldogs.",
    socials: {},
    stats: {
      gamesPlayed: 14,
      pointsPerGame: 9.8,
      reboundsPerGame: 8.5,
      assistsPerGame: 1.5,
      stealsPerGame: 1.1,
      blocksPerGame: 0.9,
      fieldGoalPercentage: 0.47,
      threePointPercentage: 0.28,
      freeThrowPercentage: 0.65,
    },
    careerStats: {
      gamesPlayed: 42,
      pointsPerGame: 8.5,
      reboundsPerGame: 7.9,
      assistsPerGame: 1.2,
      stealsPerGame: 1.0,
      blocksPerGame: 0.7,
      fieldGoalPercentage: 0.45,
      threePointPercentage: 0.25,
      freeThrowPercentage: 0.62,
    },
    recentGames: [
      { gameId: "game-003", opponentSlug: "feu-tamaraws", opponentName: "FEU", opponentLogo: "/images/teams/feu-logo.png", date: "Oct 20", result: "W 72-68", points: 12, rebounds: 10, assists: 2 },
    ]
  },
};
