/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { InstrumentType } from '../types/vibex';
import { CURRICULA, RECOMMENDED_SONGS } from '../data/curriculumData';
import { Flame, Play, ArrowRight, Sparkles, Award, Clock, Target, CheckCircle2 } from 'lucide-react';

interface DashboardViewProps {
  activeInstrument: InstrumentType;
  onSelectInstrument: (inst: InstrumentType) => void;
  onStartPractice: (exerciseId?: string) => void;
  onOpenCurriculum: () => void;
  streakCount: number;
}

const INSTRUMENT_IMAGES: Record<InstrumentType, string> = {
  piano: '/src/assets/images/vibex_hero_piano_1790614064462.jpg',
  guitar: '/src/assets/images/vibex_hero_guitar_1790614080065.jpg',
  violin: '/src/assets/images/vibex_hero_violin_1790614095969.jpg',
  bansuri: '/src/assets/images/vibex_hero_bansuri_1790614111939.jpg',
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  activeInstrument,
  onSelectInstrument,
  onStartPractice,
  onOpenCurriculum,
  streakCount,
}) => {
  const currentCurriculum = CURRICULA[activeInstrument];
  const activeLevel = currentCurriculum.levels[1] || currentCurriculum.levels[0];
  const activeExercise = activeLevel.exercises[0] || currentCurriculum.levels[0].exercises[0];
  const recommendedSong =
    RECOMMENDED_SONGS.find((s) => s.instrument === activeInstrument) || RECOMMENDED_SONGS[0];

  const instruments: { id: InstrumentType; name: string; accent: string; description: string }[] = [
    { id: 'piano', name: 'Keyboard / Piano', accent: '#8067FF', description: 'Polyphonic hand arch & 5-finger independence' },
    { id: 'guitar', name: 'Acoustic Guitar', accent: '#FF8066', description: 'Fret proximity & barre chord knuckle arch' },
    { id: 'violin', name: 'Classical Violin', accent: '#E889A5', description: 'Straight bow highway & micro-tonal intonation' },
    { id: 'bansuri', name: 'Bamboo Bansuri', accent: '#54D6C3', description: 'Embouchure lip seal & 6-hole pad coverage' },
  ];

  return (
    <div className="w-full flex flex-col gap-8 pb-16">
      {/* Hero Welcome & Continue Learning Banner */}
      <section className="relative w-full rounded-2xl bg-[#151725] border border-[#303348] overflow-hidden p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
        {/* Ambient Glow */}
        <div
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ backgroundColor: currentCurriculum.accentColor }}
        />

        <div className="flex-1 flex flex-col gap-3 z-10">
          {/* Metadata Discipline */}
          <div className="flex items-center gap-2 text-xs text-[#A9A8BA]">
            <span className="text-[#54D6C3] font-semibold">Active Session</span>
            <span aria-hidden="true">·</span>
            <span>{currentCurriculum.displayName}</span>
            <span aria-hidden="true">·</span>
            <span>{activeLevel.tierName}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F6F4FF] tracking-tight">
            Continue Your Journey on {currentCurriculum.displayName}
          </h1>

          <p className="text-sm text-[#A9A8BA] max-w-2xl leading-relaxed">
            {activeExercise ? `${activeExercise.title}: ${activeExercise.subtitle}` : currentCurriculum.tagline}
          </p>

          {/* Progress Track in Aqua Mint (#54D6C3) */}
          <div className="flex flex-col gap-1.5 pt-2 max-w-md">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A9A8BA]">Level 2 Progression</span>
              <span className="font-mono font-bold text-[#54D6C3]">50% Completed</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-[#0D0E17] border border-[#303348] overflow-hidden">
              <div
                className="h-full bg-[#54D6C3] rounded-full transition-all duration-500 shadow-[0_0_8px_#54D6C3]"
                style={{ width: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* Quick Launch CTA */}
        <div className="z-10 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={() => onStartPractice(activeExercise?.id)}
            className="px-6 py-3.5 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#8067FF]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch 3-Step Practice</span>
          </button>

          <button
            onClick={onOpenCurriculum}
            className="px-5 py-3 rounded-xl bg-[#1D2032] hover:bg-[#303348] text-[#F6F4FF] font-medium text-xs border border-[#303348] flex items-center justify-center gap-2 transition-colors"
          >
            <span>Explore Practice Map</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A9A8BA]" />
          </button>
        </div>
      </section>

      {/* 4 Instrument Selector Cards */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#F6F4FF] tracking-tight">
              Select Practice Instrument
            </h2>
            <p className="text-xs text-[#A9A8BA]">
              Each instrument features tailored computer vision posture benchmarks and real-time audio analysis.
            </p>
          </div>
          <span className="text-xs font-mono text-[#A9A8BA]">4 Instruments Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {instruments.map((inst) => {
            const isSelected = activeInstrument === inst.id;
            const imgSrc = INSTRUMENT_IMAGES[inst.id];

            return (
              <div
                key={inst.id}
                onClick={() => onSelectInstrument(inst.id)}
                className={`group cursor-pointer rounded-xl bg-[#151725] border transition-all duration-200 overflow-hidden flex flex-col ${
                  isSelected
                    ? 'border-[#8067FF] shadow-[0_0_20px_rgba(128,103,255,0.2)] ring-1 ring-[#8067FF]'
                    : 'border-[#303348] hover:border-[#8067FF]/50'
                }`}
              >
                {/* Visual Header Image with Fallback */}
                <div className="relative w-full h-32 bg-[#0D0E17] overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={inst.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151725] via-transparent to-transparent opacity-80" />

                  {/* Active Indicator Badge */}
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#8067FF] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Active</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: inst.accent }}
                      />
                      <h3 className="font-bold text-sm text-[#F6F4FF]">{inst.name}</h3>
                    </div>
                    <p className="text-xs text-[#A9A8BA] mt-1.5 line-clamp-2">
                      {inst.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#303348]/60 flex items-center justify-between text-xs">
                    <span className="text-[#A9A8BA]">5 Mastery Levels</span>
                    <span
                      className="font-medium group-hover:translate-x-0.5 transition-transform"
                      style={{ color: inst.accent }}
                    >
                      {isSelected ? 'Practicing →' : 'Switch →'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Song Spotlight (Coral Orange #FF8066) & Practice Telemetry */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Recommended Repertoire Card (Highlighted in Coral Orange) */}
        <div className="lg:col-span-2 rounded-xl bg-[#151725] border-2 border-[#FF8066]/50 p-6 flex flex-col justify-between gap-4 shadow-lg shadow-[#FF8066]/5 relative overflow-hidden">
          {/* Subtle Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8066]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-2 z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-[#FF8066] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF8066]" />
                <span>Featured Master Repertoire</span>
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#FF8066]/15 text-[#FF8066] border border-[#FF8066]/30">
                +{recommendedSong.xpReward} XP
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#F6F4FF] mt-1">
              {recommendedSong.title}
            </h3>

            <div className="flex items-center gap-2 text-xs text-[#A9A8BA]">
              <span>Composer: {recommendedSong.composer}</span>
              <span aria-hidden="true">·</span>
              <span>Tempo: {recommendedSong.tempoBpm} BPM</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#FF8066] font-medium">{recommendedSong.difficulty}</span>
            </div>

            <p className="text-xs text-[#A9A8BA] mt-2 leading-relaxed">
              {recommendedSong.description}
            </p>
          </div>

          <div className="pt-4 border-t border-[#303348] flex items-center justify-between gap-4 z-10">
            <span className="text-xs text-[#A9A8BA]">Includes synchronized MIDI sheet tabs</span>
            <button
              onClick={() => onStartPractice(activeExercise?.id)}
              className="px-5 py-2.5 rounded-lg bg-[#FF8066] hover:bg-[#E56E55] text-[#0D0E17] font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Study Song Master</span>
            </button>
          </div>
        </div>

        {/* Practice Telemetry & Consistency Card */}
        <div className="rounded-xl bg-[#151725] border border-[#303348] p-6 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#F6F4FF]">Practice Consistency</h4>
              <Award className="w-4 h-4 text-[#F4BB55]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#0D0E17] rounded-lg border border-[#303348] flex flex-col">
                <span className="text-[11px] text-[#A9A8BA]">Daily Streak</span>
                <span className="text-lg font-bold font-mono text-[#FF8066] mt-1 flex items-center gap-1">
                  <Flame className="w-4 h-4 text-[#FF8066]" />
                  {streakCount} Days
                </span>
              </div>

              <div className="p-3 bg-[#0D0E17] rounded-lg border border-[#303348] flex flex-col">
                <span className="text-[11px] text-[#A9A8BA]">Pitch Accuracy</span>
                <span className="text-lg font-bold font-mono text-[#54D6C3] mt-1">
                  96.4%
                </span>
              </div>

              <div className="p-3 bg-[#0D0E17] rounded-lg border border-[#303348] flex flex-col">
                <span className="text-[11px] text-[#A9A8BA]">Total Time</span>
                <span className="text-lg font-bold font-mono text-[#F6F4FF] mt-1 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#8067FF]" />
                  14.8 hrs
                </span>
              </div>

              <div className="p-3 bg-[#0D0E17] rounded-lg border border-[#303348] flex flex-col">
                <span className="text-[11px] text-[#A9A8BA]">Total XP</span>
                <span className="text-lg font-bold font-mono text-[#A99BFF] mt-1">
                  1,420 XP
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#1D2032] border border-[#303348] flex items-center gap-2 text-xs text-[#A9A8BA]">
            <Target className="w-4 h-4 text-[#54D6C3] shrink-0" />
            <span>Next milestone: Unlock Level 3 at 800 XP for {currentCurriculum.displayName}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
