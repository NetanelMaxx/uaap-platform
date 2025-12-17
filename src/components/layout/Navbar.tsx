"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MenuIcon, CloseIcon } from "./icons";
import Image from "next/image";

// --- Navigation Data Structure ---
const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Basketball",
    href: "/sports/basketball",
    dropdown: [
      { label: "Home", href: "/sports/basketball" },
      { label: "Players", href: "/sports/basketball/players" },
      { label: "Teams", href: "/sports/basketball/teams" },
      { label: "Schedule", href: "/sports/basketball/schedule" },
      { label: "Rankings", href: "/sports/basketball/rankings" },
      { label: "News", href: "/sports/basketball/news" },
    ],
  },
];

// --- Main Navbar Component ---
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo />
          <DesktopNav />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            setIsOpen={setIsMobileMenuOpen}
          />
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </nav>
  );
}

// --- Sub-components ---

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 group">
    <Image src="/images/uaap-logo.png" alt="UAAP Logo" width={40} height={40} className="group-hover:scale-105 transition-transform" />
    <span className="text-white font-extrabold text-xl tracking-tight hidden sm:block">
      UAAP
    </span>
  </Link>
);

const DesktopNav = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="hidden md:flex items-center gap-2">
      {navLinks.map((link) => (
        <div
          key={link.label}
          onMouseEnter={() => setHoveredItem(link.label)}
          onMouseLeave={() => setHoveredItem(null)}
          className="relative"
        >
          <Link
            href={link.href}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              pathname.startsWith(link.href) && link.href !== "/" || pathname === link.href
                ? "text-white bg-white/10"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            {link.label}
            {link.dropdown && <ChevronDown className="mt-0.5" />}
          </Link>
          <AnimatePresence>
            {hoveredItem === link.label && link.dropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 mt-2 w-48 bg-gray-900/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl overflow-hidden"
              >
                <div className="py-2">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-yellow-500/10 hover:text-yellow-400"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const MobileNavToggle = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; }) => (
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="md:hidden p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors z-50"
    aria-label="Toggle menu"
  >
    {isOpen ? <CloseIcon /> : <MenuIcon />}
  </button>
);

const MobileMenu = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 top-0 bg-black pt-20 px-6 pb-6 md:hidden z-40"
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                onClick={() => !link.dropdown && setIsOpen(false)}
                className="flex justify-between items-center w-full px-4 py-3 text-lg font-semibold text-white/90 rounded-lg hover:bg-white/5"
              >
                {link.label}
                {link.dropdown && <ChevronDown />}
              </Link>
              {link.dropdown && (
                <div className="pl-8 pt-1 pb-2 space-y-1">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-base text-white/70 rounded-md hover:bg-white/5"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
