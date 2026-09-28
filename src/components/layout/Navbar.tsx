/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { InstrumentType } from '../../types/vibex';
import { Flame } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  activeInstrument: InstrumentType;
  onSelectInstrument: (inst: InstrumentType) => void;
  streakCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  activeInstrument,
  onSelectInstrument,
  streakCount,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'practice', label: 'Practice' },
    { id: 'tuner', label: 'Flute Tuner' },
    { id: 'ear-gym', label: 'Ear Gym' },
  ];

  const instruments: { id: InstrumentType; label: string; color: string }[] = [
    { id: 'piano', label: 'Piano', color: '#8067FF' },
    { id: 'guitar', label: 'Guitar', color: '#FF8066' },
    { id: 'violin', label: 'Violin', color: '#E889A5' },
    { id: 'bansuri', label: 'Bansuri', color: '#54D6C3' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#151725]/95 backdrop-blur-md border-b border-[#303348]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('dashboard')}
          className="text-xl font-bold tracking-tight text-[#F6F4FF] hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          VIBEX
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-[#F6F4FF]'
                    : 'text-[#A9A8BA] hover:text-[#F6F4FF]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8067FF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Instrument Switcher & Daily Streak) */}
        <div className="flex items-center gap-3">
          {/* Instrument Selector Segmented Control */}
          <div className="hidden sm:flex items-center p-0.5 bg-[#0D0E17] rounded-lg border border-[#303348]">
            {instruments.map((inst) => {
              const selected = activeInstrument === inst.id;
              return (
                <button
                  key={inst.id}
                  onClick={() => onSelectInstrument(inst.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selected
                      ? 'bg-[#1D2032] text-[#F6F4FF] shadow-sm'
                      : 'text-[#A9A8BA] hover:text-[#F6F4FF]'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: inst.color }}
                  />
                  <span>{inst.label}</span>
                </button>
              );
            })}
          </div>

          {/* Daily Streak Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0D0E17] rounded-lg border border-[#303348] text-xs">
            <Flame className="w-4 h-4 text-[#FF8066] fill-[#FF8066]/20" />
            <span className="font-mono font-bold text-[#F6F4FF]">{streakCount}</span>
            <span className="text-[11px] text-[#A9A8BA] hidden sm:inline">Days</span>
          </div>
        </div>
      </div>
    </header>
  );
};

