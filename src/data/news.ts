import { TEAMS } from "./teams";
import { PLAYERS } from "./players";

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // Full content as HTML string
  heroImage: string;
  category: "Game Recap" | "Player Spotlight" | "League News";
  author: string;
  date: string; // ISO 8601 date string
  // Optional: Link to a specific player or team
  relatedPlayer?: string; // slug
  relatedTeam?: string; // slug
}

// We'll use the slugs from our other data files to link content
const ateneoSlug = "ateneo-blue-eagles";
const laSalleSlug = "dlsu-green-archers";
const upSlug = "up-fighting-maroons";

export const ARTICLES: Record<string, Article> = {
  "ateneo-vs-dlsu-classic-recap": {
    id: "news-001",
    slug: "ateneo-vs-dlsu-classic-recap",
    title: "Ateneo Triumphs Over La Salle in Overtime Thriller",
    summary:
      "A last-second shot seals the deal in a classic rivalry matchup that went down to the wire.",
    content: `
      <p>In a game that will be remembered for years, the Ateneo Blue Eagles secured a nail-biting 88-85 victory over the DLSU Green Archers in overtime.</p>
      <p>The Araneta Coliseum was electric as both teams traded blows. <strong>John Doe</strong>, Ateneo's star guard, hit a clutch three-pointer with 1.2 seconds left in regulation to send the game into overtime. He finished with a team-high 25 points and 5 assists.</p>
      <h3>Turning Point</h3>
      <p>La Salle's <strong>Kevin Quiambao</strong> was a force to be reckoned with, posting a double-double with 22 points and 14 rebounds. However, foul trouble in the final minutes of overtime saw him foul out, giving Ateneo the opening they needed. "We just kept fighting," said Ateneo's coach. "This team has heart."</p>
    `,
    heroImage: "/images/articles/game-recap1.jpg",
    category: "Game Recap",
    author: "UAAP Press",
    date: "2025-10-19T10:00:00.000Z",
    relatedTeam: ateneoSlug,
  },
  "quiambao-mvp-watch": {
    id: "news-002",
    slug: "quiambao-mvp-watch",
    title: "Is Kevin Quiambao on Track for a Second MVP?",
    summary:
      "We break down the stats and impact of La Salle's dominant forward and why he's the clear frontrunner for the league's top honor.",
    content: `
      <p>Halfway through the season, Kevin Quiambao is not just meeting expectations; he's exceeding them. Averaging a near triple-double with 16.7 points, 10.9 rebounds, and 6.0 assists per game, he has been the undeniable engine for the Green Archers.</p>
      <p>His court vision and playmaking ability, combined with his dominance on the boards, make him a unique and unstoppable force in the collegiate ranks. We analyze his performance against other top contenders and make the case for his back-to-back MVP campaign.</p>
    `,
    heroImage: "/images/players/kevin-quiambao-hero.jpg",
    category: "Player Spotlight",
    author: "Anton Roxas",
    date: "2025-10-21T09:00:00.000Z",
    relatedPlayer: "kevin-quiambao",
  },
  "league-updates-week-3": {
    id: "news-003",
    slug: "league-updates-week-3",
    title: "UAAP Season 88: Week 3 Power Rankings",
    summary:
      "After a chaotic week of upsets and statement wins, we take a look at how the teams stack up.",
    content: `
      <p>The league table is starting to take shape. While Ateneo and UP remain at the top, La Salle's recent winning streak has catapulted them into the championship conversation. Meanwhile, the NU Bulldogs are proving to be the dark horse of the tournament.</p>
      <p>Here are our official Power Rankings for Week 3...</p>
    `,
    heroImage: "/images/hero-basketball.jpg",
    category: "League News",
    author: "UAAP Media Team",
    date: "2025-10-20T14:30:00.000Z",
  },
  "tamayo-returns-to-up": {
    id: "news-004",
    slug: "tamayo-returns-to-up",
    title: "Carl Tamayo's Return Bolsters UP's Title Hopes",
    summary:
      "The former MVP returns to Katipunan, bringing veteran leadership and scoring punch to an already deep Fighting Maroons roster.",
    content: `
      <p>In a move that sent shockwaves through the league, Carl Tamayo has rejoined the UP Fighting Maroons. After a stint playing professionally overseas, Tamayo brings his refined skills back to the collegiate level.</p>
      <p>"I'm here to win," Tamayo stated in a press conference. "Whatever the team needs, I'm ready to provide." His addition immediately makes UP a favorite to win the championship.</p>
    `,
    heroImage: "/images/players/carl-tamayo-hero.jpg",
    category: "Player Spotlight",
    author: "Jane dela Cruz",
    date: "2025-10-17T11:00:00.000Z",
    relatedPlayer: "carl-tamayo",
  },
  "new-arena-rules": {
    id: "news-005",
    slug: "new-arena-rules",
    title: "UAAP Announces New Fan Safety Protocols for Season 88",
    summary:
      "Updated guidelines for entry and conduct in all game venues have been released.",
    content: `
      <p>With stadiums returning to full capacity, the UAAP has issued new guidelines to ensure the safety and enjoyment of all fans. This includes new policies on bag checks, prohibited items, and court-side conduct.</p>
      <p>Read the full guidelines here before heading to the game...</p>
    `,
    heroImage: "/images/teams/arena-crowd.jpg",
    category: "League News",
    author: "UAAP Admin",
    date: "2025-10-16T17:00:00.000Z",
  },
};
