/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Flame } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  streakCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  streakCount,
}) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'learn', label: 'Learn' },
    { id: 'practice', label: 'Practice' },
    { id: 'songs', label: 'Songs' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#151725]/95 backdrop-blur-md border-b border-[#303348]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Wordmark with Guitar identity */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-[#F6F4FF] hover:opacity-90 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF8066]" />
          <span>VIBEX</span>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#FF8066]/20 text-[#FF8066] border border-[#FF8066]/30 font-bold ml-1">
            Guitar
          </span>
        </button>

        {/* Clean text navigation links: Home, Learn, Practice, Songs, Profile */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`transition-colors py-1 relative ${
                  isActive ? 'text-[#F6F4FF]' : 'text-[#A9A8BA] hover:text-[#F6F4FF]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF8066] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Daily Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D0E17] rounded-xl border border-[#303348] text-xs font-mono">
          <Flame className="w-4 h-4 text-[#FF8066]" />
          <span className="font-bold text-[#F6F4FF]">{streakCount} Days</span>
        </div>
      </div>
    </header>
  );
};
