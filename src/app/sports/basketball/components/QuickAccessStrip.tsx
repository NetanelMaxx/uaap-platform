import React from "react";

interface QuickCardProps {
  image: string; // URL of image (team logo, player photo, etc.)
  title: string;
  subtitle?: string;
  link?: string;
}

const QuickCard: React.FC<QuickCardProps> = ({ image, title, subtitle, link }) => {
  return (
    <a
      href={link || "#"}
      className="relative flex-shrink-0 w-60 md:w-72 h-40 md:h-48 rounded-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
        <h3 className="text-white text-lg md:text-xl font-bold">{title}</h3>
        {subtitle && <p className="text-gray-200 text-sm md:text-base">{subtitle}</p>}
      </div>
    </a>
  );
};

interface QuickAccessStripProps {
  cards: QuickCardProps[];
}

const QuickAccessStrip: React.FC<QuickAccessStripProps> = ({ cards }) => {
  return (
    <div className="mt-8 px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Quick Access
      </h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-2">
        {cards.map((card, idx) => (
          <QuickCard key={idx} {...card} />
        ))}
      </div>
    </div>
  );
};

export default QuickAccessStrip;
