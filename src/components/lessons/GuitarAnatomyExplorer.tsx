/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GUITAR_ANATOMY_HOTSPOTS } from '../../data/guitarMasterCurriculum';
import { GuitarAnatomyHotspot } from '../../types/guitarCurriculum';
import { SpeechCoach } from '../../services/speechCoach';
import { Volume2, CheckCircle2, HelpCircle, Sparkles, X, ChevronRight, Info } from 'lucide-react';

interface GuitarAnatomyExplorerProps {
  onClose?: () => void;
}

export const GuitarAnatomyExplorer: React.FC<GuitarAnatomyExplorerProps> = ({ onClose }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<GuitarAnatomyHotspot>(
    GUITAR_ANATOMY_HOTSPOTS[0]
  );
  const [activeCategory, setActiveCategory] = useState<'all' | 'body' | 'neck' | 'headstock' | 'electric'>('all');
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [targetQuizHotspot, setTargetQuizHotspot] = useState<GuitarAnatomyHotspot>(
    GUITAR_ANATOMY_HOTSPOTS[6] // The Nut
  );
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const filteredHotspots =
    activeCategory === 'all'
      ? GUITAR_ANATOMY_HOTSPOTS
      : GUITAR_ANATOMY_HOTSPOTS.filter((h) => h.category === activeCategory);

  const handleSelectHotspot = (hotspot: GuitarAnatomyHotspot) => {
    if (quizMode) {
      if (hotspot.id === targetQuizHotspot.id) {
        setQuizFeedback(`Correct! You tapped the ${hotspot.name}. Excellent eye!`);
        SpeechCoach.speak(`Correct! That is the ${hotspot.name}.`);
      } else {
        setQuizFeedback(`Not quite. You tapped the ${hotspot.name}. Find the ${targetQuizHotspot.name}!`);
        SpeechCoach.speak(`Not quite. Find the ${targetQuizHotspot.name}.`);
      }
      return;
    }

    setSelectedHotspot(hotspot);
    SpeechCoach.speak(`${hotspot.name}. ${hotspot.description}`);
  };

  const startQuiz = () => {
    const random = GUITAR_ANATOMY_HOTSPOTS[Math.floor(Math.random() * GUITAR_ANATOMY_HOTSPOTS.length)];
    setTargetQuizHotspot(random);
    setQuizFeedback(null);
    setQuizMode(true);
    SpeechCoach.speak(`Challenge: Tap the ${random.name}!`);
  };

  return (
    <div className="w-full bg-[#151725] rounded-2xl border border-[#303348] p-5 sm:p-6 flex flex-col gap-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#303348] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF8066]/20 border border-[#FF8066] flex items-center justify-center text-[#FF8066]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#F6F4FF]">
              Interactive Guitar Anatomy Explorer
            </h3>
            <p className="text-xs text-[#A9A8BA]">
              Master physical lutherie components, tone physics, and maintenance rules
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={quizMode ? () => setQuizMode(false) : startQuiz}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 ${
              quizMode
                ? 'bg-[#8067FF] text-[#F6F4FF]'
                : 'bg-[#1D2032] border border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-[#FF8066]" />
            <span>{quizMode ? 'Exit Quiz' : 'Start Anatomy Quiz'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#A9A8BA] hover:text-[#F6F4FF] hover:bg-[#1D2032] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      {!quizMode && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {(['all', 'body', 'neck', 'headstock', 'electric'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap capitalize ${
                activeCategory === cat
                  ? 'bg-[#FF8066] text-[#0D0E17] font-bold'
                  : 'bg-[#1D2032] text-[#A9A8BA] hover:text-[#F6F4FF] border border-[#303348]'
              }`}
            >
              {cat} Parts
            </button>
          ))}
        </div>
      )}

      {/* Quiz Prompt Banner */}
      {quizMode && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#1E1B4B] to-[#151725] border border-[#8067FF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#8067FF] text-white text-xs font-bold uppercase">
              Challenge
            </span>
            <span className="text-sm font-bold text-[#F6F4FF]">
              Can you find and tap: <span className="text-[#FF8066] underline">{targetQuizHotspot.name}</span>?
            </span>
          </div>

          {quizFeedback && (
            <span className="text-xs font-bold font-mono text-[#54D6C3] bg-[#122424] px-3 py-1 rounded border border-[#54D6C3]/40">
              {quizFeedback}
            </span>
          )}
        </div>
      )}

      {/* Visual Canvas with Hotspots */}
      <div className="relative w-full h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-[#0D0E17] via-[#151725] to-[#0D0E17] border border-[#303348] overflow-hidden flex items-center justify-center shadow-inner">
        {/* Schematic Outline Guitar Graphic */}
        <div className="relative w-[90%] max-w-2xl h-36 flex items-center select-none">
          {/* Headstock */}
          <div className="w-[18%] h-24 bg-gradient-to-r from-[#201815] to-[#2E201B] border-2 border-[#5A3E31] rounded-l-2xl relative flex items-center justify-center shadow-lg">
            <span className="text-[10px] font-bold font-mono text-[#A9A8BA]/60 tracking-widest -rotate-90">
              HEADSTOCK
            </span>
          </div>

          {/* Neck */}
          <div className="w-[42%] h-16 bg-gradient-to-r from-[#2A1E1A] via-[#38261F] to-[#2A1E1A] border-y-2 border-[#5A3E31] relative flex items-center justify-center">
            {/* Frets Wire lines */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-full border-r border-[#8B939C]/40 flex-1 flex items-center justify-center"
              />
            ))}
            <span className="absolute text-[10px] font-bold font-mono text-[#A9A8BA]/50 tracking-widest pointer-events-none">
              FINGERBOARD
            </span>
          </div>

          {/* Body */}
          <div className="w-[40%] h-36 bg-gradient-to-r from-[#2E1E17] via-[#4A2D22] to-[#2E1E17] border-2 border-[#6A4738] rounded-r-3xl relative flex items-center justify-center shadow-2xl">
            {/* Soundhole */}
            <div className="w-16 h-16 rounded-full bg-[#0D0E17] border-4 border-[#1A120E] shadow-inner flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border border-[#D4AF37]/40" />
            </div>
          </div>

          {/* Interactive Hotspot Buttons */}
          {filteredHotspots.map((hotspot) => {
            const isSelected = selectedHotspot.id === hotspot.id;
            return (
              <button
                key={hotspot.id}
                onClick={() => handleSelectHotspot(hotspot)}
                className={`absolute w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all flex items-center justify-center z-20 group ${
                  isSelected
                    ? 'bg-[#FF8066] border-white scale-125 shadow-[0_0_15px_#FF8066]'
                    : 'bg-[#151725] border-[#FF8066] text-[#FF8066] hover:scale-115 hover:bg-[#FF8066] hover:text-[#0D0E17]'
                }`}
                style={{
                  left: `${hotspot.xPercent}%`,
                  top: `${hotspot.yPercent}%`,
                }}
                title={hotspot.name}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Hotspot Detailed Inspector Card */}
      {!quizMode && selectedHotspot && (
        <div className="p-5 rounded-xl bg-[#0D0E17] border border-[#303348] flex flex-col gap-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#FF8066] uppercase tracking-wider">
                {selectedHotspot.category} Component
              </span>
              <span aria-hidden="true" className="text-[#A9A8BA]">·</span>
              <h4 className="text-base font-bold text-[#F6F4FF]">
                {selectedHotspot.name}
              </h4>
            </div>

            <button
              onClick={() => SpeechCoach.speak(`${selectedHotspot.name}. ${selectedHotspot.description}`)}
              className="p-1.5 rounded-lg bg-[#151725] text-[#A9A8BA] hover:text-[#F6F4FF] transition-colors"
              title="Hear description"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[#F6F4FF] leading-relaxed">
            {selectedHotspot.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#303348]/60 text-xs">
            <div className="p-3 rounded-lg bg-[#151725] border border-[#303348] flex flex-col gap-1">
              <span className="font-semibold text-[#54D6C3] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Musical Function</span>
              </span>
              <span className="text-[#A9A8BA] leading-normal">
                {selectedHotspot.musicalPurpose}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#151725] border border-[#303348] flex flex-col gap-1">
              <span className="font-semibold text-[#F4BB55] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Maintenance & Care Tip</span>
              </span>
              <span className="text-[#A9A8BA] leading-normal">
                {selectedHotspot.careTip}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
