import React from "react";
import { ARTICLES, type Article } from "@/data/news";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

// This function tells Next.js which article pages to build at compile time
export async function generateStaticParams() {
  return Object.values(ARTICLES).map((article) => ({
    slug: article.slug,
  }));
}

// Main Page Component
export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug];

  if (!article) {
    notFound(); // Redirect to a 404 page if article slug is invalid
  }

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="bg-black text-white">
      {/* Hero Image Section */}
      <header className="relative w-full h-[40vh] md:h-[50vh]">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </header>

      {/* Article Content Section */}
      <div className="relative -mt-24 md:-mt-32 z-10">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10">
            {/* Article Header */}
            <div className="text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-yellow-400">
                {article.category}
              </span>
              <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
                {article.title}
              </h1>
              <p className="mt-4 text-white/70">
                By {article.author} • {formattedDate}
              </p>
            </div>

            <hr className="border-white/10 my-8" />

            {/* Article Body */}
            <div
              className="prose prose-invert prose-lg max-w-none prose-p:text-white/80 prose-headings:text-white"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="mt-12 text-center">
                <Link href="/sports/basketball/news" className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
                    ← Back to All News
                </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
