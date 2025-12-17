"use client";

import HeroSection from "./components/HeroSection";
import type { HeroSlideProps } from "./components/HeroSection"; // Import the type
import QuickAccessStrip from "./components/QuickAccessStrip";
import WhatsHot from "./components/WhatsHot";
import { SCHEDULE, type Game } from "@/data/schedule"; // Import schedule data and type

export default function BasketballPage() {
  
  // Get the next 1 upcoming or live game for the bottom strip
  const upcomingGames = SCHEDULE
    .filter(g => g.status === 'UPCOMING' || g.status === 'LIVE')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 1); // Get the very next game

  // Data for the new Hero Carousel
  const heroSlides: HeroSlideProps[] = [
    {
      type: "team",
      title: "Ateneo Blue Eagles",
      tagline: "Defending champions aiming for another title.",
      bgImage: "/images/teams/ateneo-full.png",
      logo: "/images/teams/ateneo-logo.png",
      ctaText: "Explore Team Hub",
      ctaLink: "/sports/basketball/teams/ateneo-blue-eagles",
    },
    {
      type: "team",
      title: "DLSU Green Archers",
      tagline: "A powerhouse team on a historic winning streak.",
      bgImage: "/images/teams/la-salle-bg.jpg",
      logo: "/images/teams/la-salle-logo.png",
      ctaText: "View Team Stats",
      ctaLink: "/sports/basketball/teams/dlsu-green-archers",
    },
     {
      type: "matchup",
      title: "Rivalry Week",
      tagline: "Ateneo vs. La Salle: The classic showdown returns.",
      bgImage: "/images/hero-basketball.jpg",
      ctaText: "Go to Game Center",
      ctaLink: "/sports/basketball/games/game-001",
    },
  ];

  const quickCards = [
    {
      image: "/images/teams/ateneo-bg.jpg",
      title: "Next Game: UE vs ADMU",
      subtitle: "Oct 22, 4:00 PM",
      link: "/sports/basketball/games/game-001", // Use a real game ID
    },
    {
      image: "/images/players/cj-austria.jpg",
      title: "Top Player: John Doe",
      subtitle: "Avg 22 PPG",
      link: "/players/john-doe",
    },
    {
      image: "/images/teams/la-salle-bg.jpg",
      title: "Trending Team: La Salle",
      subtitle: "Wins 5 in a row",
      link: "/sports/basketball/teams/dlsu-green-archers",
    },
  ];

  const whatsHotItems = [
    {
      image: "/images/players/cj-austria.jpg",
      title: "Jane Smith",
      subtitle: "Scored 30 points last game",
      link: "/players/john-doe",
      type: "player",
    },
    {
      image: "/images/teams/ateneo-bg.jpg",
      title: "ADMU vs UE Recap",
      subtitle: "Thrilling OT game highlights",
      link: "/sports/basketball/news/admu-ue-recap",
      type: "article",
    },
    {
      image: "/images/teams/la-salle-bg.jpg",
      title: "La Salle",
      subtitle: "Winning streak continues",
      link: "/sports/basketball/teams/la-salle",
      type: "team",
    },
  ] as const;

  return (
    <main className="bg-black text-white">
      {/* Pass the correct props */}
      <HeroSection slides={heroSlides} upcomingGames={upcomingGames} />
      <QuickAccessStrip cards={quickCards} />
      <WhatsHot items={whatsHotItems} />
    </main>
  );
}

