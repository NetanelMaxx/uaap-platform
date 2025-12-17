import React from 'react';
import Link from 'next/link';
import { TwitterIcon, InstagramIcon, FacebookIcon } from './icons'; // Re-using the icons we already have

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Logo & Social */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-white font-extrabold text-2xl">UAAP</span>
            </Link>
            <p className="text-sm text-gray-400">
              The official hub for Philippine collegiate sports.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Sports</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/sports/basketball" className="text-base hover:text-white transition-colors">Basketball</Link></li>
              <li><Link href="/sports/volleyball" className="text-base hover:text-white transition-colors">Volleyball</Link></li>
              <li><Link href="/sports/badminton" className="text-base hover:text-white transition-colors">Badminton</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/sports/basketball/schedule" className="text-base hover:text-white transition-colors">Schedule</Link></li>
              <li><Link href="/sports/basketball/scores" className="text-base hover:text-white transition-colors">Scores</Link></li>
              <li><Link href="/sports/basketball/rankings" className="text-base hover:text-white transition-colors">Standings</Link></li>
              <li><Link href="/sports/basketball/news" className="text-base hover:text-white transition-colors">News</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-base hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-base hover:text-white transition-colors">Ad Choices</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} UAAP. All rights reserved. Not affiliated with any official league or team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
