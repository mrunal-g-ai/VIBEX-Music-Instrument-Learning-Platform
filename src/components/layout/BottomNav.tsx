/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, Map, PlayCircle, Sliders, Ear } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'curriculum', label: 'Paths', icon: Map },
    { id: 'practice', label: 'Practice', icon: PlayCircle },
    { id: 'tuner', label: 'Tuner', icon: Sliders },
    { id: 'ear-gym', label: 'Ear Gym', icon: Ear },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#151725]/95 backdrop-blur-md border-t border-[#303348] py-1.5 px-3 flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors ${
              isActive
                ? 'text-[#8067FF]'
                : 'text-[#A9A8BA] hover:text-[#F6F4FF]'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
