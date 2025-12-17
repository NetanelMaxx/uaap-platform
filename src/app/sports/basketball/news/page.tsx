"use client"; // This page now needs to be a client component for the carousel's interactivity

import React, { useCallback, useState, useEffect } from "react";
import { ARTICLES, type Article } from "@/data/news";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay"; // Import the autoplay plugin
import { PrevButton, NextButton } from "@/components/ui/EmblaCarouselButtons";

// Main Page Component
export default function NewsIndexPage() {
  const allArticles = Object.values(ARTICLES).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const carouselArticles = allArticles.slice(0, 4);
  const otherArticles = allArticles.slice(4);

  return (
    <main className="bg-gradient-to-b from-[#101010] to-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            The UAAP Bulletin
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Your source for the latest game recaps, player spotlights, and league news.
          </p>
        </header>

        {carouselArticles.length > 0 && (
          <FeaturedNewsCarousel articles={carouselArticles} />
        )}

        {otherArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6">More News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


// --- Carousel Component (Updated with Autoplay and Active Slide Tracking) ---
function FeaturedNewsCarousel({ articles }: { articles: Article[] }) {
  // Initialize the autoplay plugin with a 5-second delay
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);
  
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    // Set initial index
    onSelect(); 
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);


  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {articles.map((article, index) => (
            <div className="flex-grow-0 flex-shrink-0 w-full" key={article.id}>
              <FeaturedArticleSlide 
                article={article} 
                isActive={index === activeIndex} // Pass active state to the slide
              />
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} />
      <NextButton onClick={scrollNext} />
    </div>
  );
}

/**
 * FeaturedArticleSlide: A single slide in the carousel (Updated for Zoom Effect).
 */
function FeaturedArticleSlide({ article, isActive }: { article: Article, isActive: boolean }) {
    const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <Link
      href={`/sports/basketball/news/${article.slug}`}
      className="group block w-full overflow-hidden relative"
    >
      <div className="relative w-full h-[55vh] overflow-hidden"> {/* Added overflow-hidden */}
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          // Add key to re-trigger animation when slide becomes active
          key={article.id + (isActive ? '-active' : '')}
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isActive ? "animate-kenburns" : "scale-100"}`}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 p-6 md:p-10">
        <span className="text-sm font-bold uppercase tracking-widest text-yellow-400">
          {article.category}
        </span>
        <h2 className="mt-2 text-2xl md:text-4xl font-extrabold text-white leading-tight group-hover:text-yellow-300 transition-colors">
          {article.title}
        </h2>
        <p className="mt-2 text-white/80 max-w-2xl hidden md:block">{article.summary}</p>
        <p className="text-xs text-white/60 mt-4">
          By {article.author} • {formattedDate}
        </p>
      </div>
    </Link>
  );
}

/**
 * ArticleCard: A standard card for the grid view (unchanged).
 */
function ArticleCard({ article }: { article: Article }) {
    const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

  return (
    <Link
      href={`/sports/basketball/news/${article.slug}`}
      className="group block bg-gray-900/50 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-yellow-400/50 hover:bg-gray-900"
    >
      <div className="relative w-full h-48">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <span className="text-xs font-bold uppercase tracking-wider text-yellow-500">
          {article.category}
        </span>
        <h3 className="mt-2 text-lg font-bold leading-tight text-white">
          {article.title}
        </h3>
        <p className="text-sm text-white/60 mt-4">
          {article.author} • {formattedDate}
        </p>
      </div>
    </Link>
  );
}
