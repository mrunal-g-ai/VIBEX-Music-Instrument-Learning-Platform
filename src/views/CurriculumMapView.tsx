/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InstrumentType, LessonLevel, ExerciseItem } from '../types/vibex';
import { CURRICULA } from '../data/curriculumData';
import {
  Lock,
  CheckCircle2,
  Play,
  Clock,
  ChevronDown,
  ChevronUp,
  Target,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  Music,
} from 'lucide-react';

interface CurriculumMapViewProps {
  activeInstrument: InstrumentType;
  onSelectExercise: (exerciseId: string) => void;
}

export const CurriculumMapView: React.FC<CurriculumMapViewProps> = ({
  activeInstrument,
  onSelectExercise,
}) => {
  const curriculum = CURRICULA[activeInstrument];
  const [expandedTier, setExpandedTier] = useState<number>(1);

  const toggleTier = (levelNumber: number) => {
    setExpandedTier((prev) => (prev === levelNumber ? 0 : levelNumber));
  };

  const renderDifficultyDots = (difficulty: number) => {
    return (
      <div className="flex items-center gap-1" title={`Difficulty: ${difficulty}/5`}>
        {[1, 2, 3, 4, 5].map((d) => (
          <span
            key={d}
            className={`w-1.5 h-1.5 rounded-full ${
              d <= difficulty ? 'bg-[#54D6C3]' : 'bg-[#303348]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-16">
      {/* Pedagogical Header & Instrument Focus Areas */}
      <div className="flex flex-col gap-5 border-b border-[#303348] pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#A9A8BA]">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: curriculum.accentColor }}
              />
              <span className="font-semibold text-[#F6F4FF]">{curriculum.displayName}</span>
              <span aria-hidden="true">·</span>
              <span>5-Tier Pedagogical Syllabus</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F6F4FF] mt-1 tracking-tight">
              Curriculum Roadmap & Module Repository
            </h1>
          </div>

          <div className="px-3.5 py-1.5 rounded-lg bg-[#151725] border border-[#303348] flex items-center gap-2 text-xs">
            <Layers className="w-4 h-4 text-[#8067FF]" />
            <span className="text-[#A9A8BA]">Structure:</span>
            <span className="font-mono font-bold text-[#54D6C3]">5 Levels · 10+ Modules</span>
          </div>
        </div>

        {/* Focus Areas Showcase */}
        <div className="p-4 rounded-xl bg-[#151725] border border-[#303348] flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F6F4FF]">
            <Target className="w-3.5 h-3.5 text-[#54D6C3]" />
            <span>Core Pedagogical Focus Areas for {curriculum.displayName}:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {curriculum.focusAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-[#1D2032] border border-[#303348] text-xs text-[#A9A8BA] font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 5-Tier Interactive Modules */}
      <div className="flex flex-col gap-5">
        {curriculum.levels.map((level) => {
          const isExpanded = expandedTier === level.levelNumber;
          const isCompleted = level.completed;
          const isUnlocked = level.unlocked;

          return (
            <div
              key={level.levelNumber}
              className={`rounded-xl border transition-all overflow-hidden ${
                isCompleted
                  ? 'bg-[#151725] border-[#45D483]/40'
                  : isUnlocked
                  ? 'bg-[#151725] border-[#8067FF] shadow-lg shadow-[#8067FF]/5'
                  : 'bg-[#121420] border-[#303348]/70 opacity-80'
              }`}
            >
              {/* Level Tier Header Banner */}
              <div
                onClick={() => toggleTier(level.levelNumber)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#1D2032]/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Status / Node Badge */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                      isCompleted
                        ? 'bg-[#45D483]/15 text-[#45D483] border-[#45D483]/50'
                        : isUnlocked
                        ? 'bg-[#8067FF]/15 text-[#8067FF] border-[#8067FF]/50 shadow-[0_0_10px_rgba(128,103,255,0.3)]'
                        : 'bg-[#1D2032] text-[#A9A8BA] border-[#303348]'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : !isUnlocked ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <span>T{level.levelNumber}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-[#F6F4FF]">{level.title}</h3>
                      <span className="text-[11px] text-[#A9A8BA] font-mono">
                        ({level.durationSpan})
                      </span>
                      <span className="text-[11px] font-mono text-[#54D6C3] px-2 py-0.5 rounded bg-[#54D6C3]/10 border border-[#54D6C3]/20">
                        {level.dailyPracticeMinutes}
                      </span>
                    </div>
                    <p className="text-xs text-[#A9A8BA] leading-relaxed max-w-2xl">
                      {level.focusSummary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#303348]">
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-[#A9A8BA]">Outcome Target</span>
                    <p className="text-xs font-semibold text-[#54D6C3] max-w-xs truncate">
                      {level.outcome}
                    </p>
                  </div>
                  <button className="p-1 rounded text-[#A9A8BA] hover:text-[#F6F4FF]">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Tier Details (Daily Routine + Exercise Repository Cards + Repertoire) */}
              {isExpanded && (
                <div className="p-5 sm:p-6 bg-[#0D0E17]/60 border-t border-[#303348] flex flex-col gap-6">
                  {/* Daily Routine Schedule Template */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#F6F4FF]">
                      <Calendar className="w-3.5 h-3.5 text-[#FF8066]" />
                      <span>Recommended Daily Routine Structure ({level.dailyPracticeMinutes})</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {level.dailyRoutine.map((r, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-2.5 rounded-lg bg-[#151725] border border-[#303348] flex items-center justify-between text-xs"
                        >
                          <span className="text-[#A9A8BA] truncate pr-2">{r.activity}</span>
                          <span className="font-mono font-bold text-[#54D6C3] shrink-0">
                            {r.minutes}m
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modular Exercise Repository Cards */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#F6F4FF]">
                        <BookOpen className="w-3.5 h-3.5 text-[#8067FF]" />
                        <span>Interactive Exercises for {level.tierName}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#A9A8BA]">
                        {level.exercises.length} Interactive Lessons
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {level.exercises.map((ex) => (
                        <div
                          key={ex.id}
                          className="rounded-xl bg-[#151725] border border-[#303348] p-4 flex flex-col justify-between gap-3 hover:border-[#8067FF]/60 transition-all shadow-sm"
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-[#1D2032] border border-[#303348] text-[#54D6C3]">
                                {ex.category.replace('_', ' ')}
                              </span>
                              <div className="flex items-center gap-2 text-[11px] font-mono text-[#A9A8BA]">
                                <Clock className="w-3 h-3" />
                                <span>{ex.durationMinutes} min</span>
                                <span>·</span>
                                {renderDifficultyDots(ex.difficulty)}
                              </div>
                            </div>

                            <h4 className="text-sm font-bold text-[#F6F4FF] mt-1">{ex.title}</h4>
                            <p className="text-xs text-[#A9A8BA]">{ex.subtitle}</p>

                            <div className="p-2 rounded bg-[#0D0E17] border border-[#303348] text-[11px] text-[#A9A8BA] flex items-start gap-1.5">
                              <Target className="w-3.5 h-3.5 text-[#FF8066] shrink-0 mt-0.5" />
                              <span>{ex.goal}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-[#303348]/70 flex items-center justify-between">
                            <span className="text-[11px] font-mono text-[#A9A8BA]">
                              {ex.tempoBpm} BPM · {ex.notes.length} target notes
                            </span>
                            <button
                              onClick={() => onSelectExercise(ex.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#8067FF] hover:bg-[#6952E6] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Start Practice</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Repertoire Milestones (Western + Indian/Hindi friendly options) */}
                  {level.repertoireMilestones.length > 0 && (
                    <div className="flex flex-col gap-2 pt-2 border-t border-[#303348]">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#F6F4FF]">
                        <Music className="w-3.5 h-3.5 text-[#FF8066]" />
                        <span>Repertoire Milestones (Western & Indian/Hindi options):</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {level.repertoireMilestones.map((song, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-3 rounded-lg bg-[#151725] border border-[#303348] flex flex-col gap-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-[#F6F4FF] truncate">
                                {song.title}
                              </span>
                              <span className="text-[9px] font-mono text-[#FF8066] px-1.5 py-0.2 rounded bg-[#FF8066]/10">
                                {song.type}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-[#A9A8BA]">
                              <span>{song.artistOrComposer}</span>
                              <span className="font-mono">{song.keyOrRaga}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
