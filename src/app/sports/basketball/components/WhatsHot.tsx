import React from "react";

// Allow 'type' to be a string, which makes it compatible with `as const`
interface HotCardProps {
  image: string; // player/team/article image
  title: string;
  subtitle?: string;
  link?: string;
  type?: string; 
}

const HotCard: React.FC<HotCardProps> = ({ image, title, subtitle, link, type }) => {
  return (
    <a
      href={link || "#"}
      className="relative flex-shrink-0 w-60 md:w-64 h-64 rounded-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
        {type && (
          <span className="text-xs uppercase text-yellow-400 font-bold">
            {type}
          </span>
        )}
        <h3 className="text-white text-lg md:text-xl font-bold mt-1">{title}</h3>
        {subtitle && <p className="text-gray-200 text-sm md:text-base">{subtitle}</p>}
      </div>
    </a>
  );
};

interface WhatsHotProps {
  items: readonly HotCardProps[]; // <-- Use readonly here
}

const WhatsHot: React.FC<WhatsHotProps> = ({ items }) => {
  return (
    <div className="mt-12 px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        What’s Hot Right Now
      </h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-2">
        {items.map((item, idx) => (
          <HotCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};

export default WhatsHot;