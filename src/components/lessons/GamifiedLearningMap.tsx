/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GuitarLesson, LessonStatus, GuitarModule } from '../../types/guitarLessons';
import {
  Check,
  Star,
  Play,
  Clock,
  Sparkles,
  ChevronRight,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';

interface GamifiedLearningMapProps {
  modules: GuitarModule[];
  getLessonStatus: (lessonId: string) => LessonStatus;
  onSelectLesson: (lesson: GuitarLesson) => void;
  streakCount?: number;
}

export const GamifiedLearningMap: React.FC<GamifiedLearningMapProps> = ({
  modules,
  getLessonStatus,
  onSelectLesson,
  streakCount = 7,
}) => {
  const mod1 = modules[0]; // Module 1: First Contact
  const mod1Lessons = mod1?.lessons || [];

  // Calculate real progress for Module 1
  const completedCount = mod1Lessons.filter((l) => {
    const s = getLessonStatus(l.id);
    return s === 'completed' || s === 'mastered';
  }).length;

  const totalMod1Count = mod1Lessons.length;
  const progressPercent = Math.round((completedCount / (totalMod1Count || 1)) * 100);

  // Find the current "Next Stop" (first lesson that is not completed)
  const nextStopLesson = mod1Lessons.find((l) => {
    const s = getLessonStatus(l.id);
    return s !== 'completed' && s !== 'mastered';
  }) || mod1Lessons[0];

  // Alternating horizontal alignments for the curved path
  // 'left' | 'center' | 'right'
  const getNodeAlignment = (idx: number): 'left' | 'center' | 'right' => {
    const pattern = ['center', 'left', 'right', 'left', 'center', 'right', 'left'];
    return (pattern[idx % pattern.length] as 'left' | 'center' | 'right') || 'center';
  };

  // Node status styling helper
  const getNodeVisual = (status: LessonStatus, isNextStop: boolean) => {
    switch (status) {
      case 'mastered':
        return {
          icon: <Star className="w-5 h-5 fill-current text-white" />,
          bgColor: 'bg-gradient-to-br from-[#8067FF] to-[#54D6C3]',
          borderColor: 'border-[#54D6C3]',
          glow: 'shadow-lg shadow-[#54D6C3]/30',
          label: 'Mastered',
        };
      case 'completed':
        return {
          icon: <Check className="w-5 h-5 text-white stroke-[3]" />,
          bgColor: 'bg-gradient-to-br from-[#8067FF] to-[#45D483]',
          borderColor: 'border-[#45D483]',
          glow: 'shadow-lg shadow-[#45D483]/25',
          label: 'Completed',
        };
      case 'in_progress':
        return {
          icon: <span className="w-3.5 h-3.5 rounded-full bg-[#8067FF] animate-ping" />,
          bgColor: 'bg-[#1D2032]',
          borderColor: 'border-[#8067FF]',
          glow: 'shadow-lg shadow-[#8067FF]/35 ring-4 ring-[#8067FF]/20',
          label: 'In Progress',
        };
      case 'not_started':
      default:
        if (isNextStop) {
          return {
            icon: <Play className="w-4 h-4 text-[#8067FF] fill-current ml-0.5" />,
            bgColor: 'bg-[#151725]',
            borderColor: 'border-[#8067FF]',
            glow: 'shadow-xl shadow-[#8067FF]/30 ring-4 ring-[#8067FF]/25 animate-pulse',
            label: 'Next Stop',
          };
        }
        return {
          icon: <span className="w-2.5 h-2.5 rounded-full bg-[#303348]" />,
          bgColor: 'bg-[#151725]',
          borderColor: 'border-[#303348]',
          glow: 'hover:border-[#8067FF]/60',
          label: 'Available',
        };
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 pb-28 text-[#F6F4FF]">
      {/* 1. Journey Header Banner */}
      <div className="w-full max-w-4xl p-6 sm:p-7 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#8067FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8067FF] to-[#FF8066] p-0.5 shadow-lg shadow-[#8067FF]/25">
            <div className="w-full h-full rounded-[14px] bg-[#151725] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-[#FF8066]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-[#FF8066] uppercase tracking-wider">
                Guitar Journey
              </span>
              <span className="text-[#303348]">·</span>
              <span className="text-xs text-[#54D6C3] font-mono font-bold">
                Absolute Beginner → Professional
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#F6F4FF] tracking-tight mt-0.5">
              Module 1: First Contact
            </h1>
            <p className="text-xs text-[#A9A8BA] mt-0.5">
              What you'll learn: Instrument anatomy, posture, 6 strings, pick grip, and first tone.
            </p>
          </div>
        </div>

        {/* Real Progress Counter Pill */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end z-10">
          <div className="p-3 bg-[#0D0E17] rounded-2xl border border-[#303348] text-center min-w-[100px]">
            <span className="text-[10px] text-[#A9A8BA] block uppercase font-mono">Progress</span>
            <span className="text-sm font-extrabold font-mono text-[#54D6C3]">
              {completedCount} / {totalMod1Count}
            </span>
          </div>

          <div className="p-3 bg-[#0D0E17] rounded-2xl border border-[#303348] text-center min-w-[100px]">
            <span className="text-[10px] text-[#A9A8BA] block uppercase font-mono">Streak</span>
            <span className="text-sm font-extrabold font-mono text-[#FF8066] flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#FF8066]" /> {streakCount}d
            </span>
          </div>

          <div className="p-3 bg-[#0D0E17] rounded-2xl border border-[#303348] text-center min-w-[90px]">
            <span className="text-[10px] text-[#A9A8BA] block uppercase font-mono">Mastery</span>
            <span className="text-sm font-extrabold font-mono text-[#8067FF]">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Gamified Learning Path */}
      <div className="w-full max-w-2xl relative flex flex-col items-center">
        {/* START Node */}
        <div className="flex flex-col items-center mb-6">
          <div className="px-4 py-1.5 rounded-full bg-[#8067FF]/20 border border-[#8067FF]/40 text-[#A99BFF] font-mono text-xs font-bold shadow-lg shadow-[#8067FF]/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8067FF] animate-pulse" />
            <span>JOURNEY START</span>
          </div>
          <div className="w-0.5 h-8 bg-gradient-to-b from-[#8067FF] to-[#303348]" />
        </div>

        {/* Vertical Journey Nodes */}
        <div className="w-full flex flex-col gap-10 relative">
          {mod1Lessons.map((lesson, idx) => {
            const status = getLessonStatus(lesson.id);
            const isNextStop = nextStopLesson?.id === lesson.id;
            const alignment = getNodeAlignment(idx);
            const visual = getNodeVisual(status, isNextStop);
            const isFirstLesson = lesson.id === 'lesson_1_1';

            // Alignment coordinates
            const alignClass =
              alignment === 'left'
                ? 'sm:self-start sm:ml-8'
                : alignment === 'right'
                ? 'sm:self-end sm:mr-8'
                : 'self-center';

            return (
              <div
                key={lesson.id}
                className={`flex flex-col items-center transition-all ${alignClass}`}
              >
                {/* Node Connection Line to next node */}
                {idx > 0 && (
                  <div
                    className={`w-0.5 h-8 -mt-9 mb-1 transition-colors ${
                      status === 'completed' || status === 'mastered'
                        ? 'bg-[#45D483]'
                        : 'bg-[#303348]'
                    }`}
                  />
                )}

                {/* Node Button & Card */}
                <div
                  onClick={() => onSelectLesson(lesson)}
                  className={`group cursor-pointer flex items-center gap-4 p-3.5 sm:p-4 rounded-3xl bg-[#151725] border transition-all duration-300 ${
                    isNextStop
                      ? 'border-[#8067FF] bg-[#1D2032] shadow-2xl shadow-[#8067FF]/25 scale-105'
                      : status === 'completed' || status === 'mastered'
                      ? 'border-[#45D483]/40 hover:border-[#45D483] shadow-md'
                      : 'border-[#303348] hover:border-[#8067FF]/80 hover:bg-[#1D2032]'
                  } max-w-sm w-full`}
                >
                  {/* Large Circular Node */}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all ${visual.bgColor} ${visual.borderColor} ${visual.glow} group-hover:scale-110`}
                  >
                    {visual.icon}
                  </div>

                  {/* Node Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[10px] font-mono font-bold text-[#FF8066] uppercase">
                        Lesson {lesson.lessonNumber}
                      </span>
                      {isNextStop ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#8067FF] text-white text-[9px] font-mono font-bold uppercase tracking-wider shadow">
                          Next Stop
                        </span>
                      ) : (
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            status === 'completed'
                              ? 'text-[#45D483]'
                              : status === 'mastered'
                              ? 'text-[#54D6C3]'
                              : 'text-[#A9A8BA]'
                          }`}
                        >
                          {visual.label}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-[#F6F4FF] group-hover:text-[#FF8066] transition-colors truncate">
                      {lesson.title}
                    </h3>

                    <p className="text-[11px] text-[#A9A8BA] line-clamp-1 mt-0.5 leading-snug">
                      {lesson.subtitle}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[10px] text-[#A9A8BA] font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#8067FF]" />
                        <span>{lesson.durationMinutes} min</span>
                      </span>
                      {isFirstLesson && (
                        <span className="px-1.5 py-0.5 rounded bg-[#45D483]/20 text-[#45D483] font-bold">
                          ★ Interactive Level
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-[#A9A8BA] group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                </div>

                {/* Mid-Module Checkpoint after Lesson 1.3 */}
                {idx === 2 && (
                  <div className="w-full flex flex-col items-center my-6">
                    <div className="w-0.5 h-6 bg-[#303348]" />
                    <div className="px-5 py-2.5 rounded-2xl bg-[#0D0E17] border border-[#FF8066]/40 flex items-center gap-2.5 shadow-lg">
                      <Award className="w-4 h-4 text-[#FF8066]" />
                      <div className="text-left">
                        <span className="text-[10px] font-mono font-bold text-[#FF8066] block uppercase tracking-wider">
                          Checkpoint 1
                        </span>
                        <span className="text-xs font-bold text-[#F6F4FF]">
                          Instrument Foundations Review
                        </span>
                      </div>
                    </div>
                    <div className="w-0.5 h-6 bg-[#303348]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Module 1 Final Milestone Checkpoint */}
        <div className="w-full flex flex-col items-center mt-10">
          <div className="w-0.5 h-10 bg-gradient-to-b from-[#303348] to-[#FF8066]" />
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#151725] to-[#1D2032] border border-[#FF8066]/50 flex items-center gap-4 max-w-md w-full shadow-2xl shadow-[#FF8066]/15">
            <div className="w-14 h-14 rounded-2xl bg-[#FF8066]/20 border border-[#FF8066] flex items-center justify-center shrink-0 text-[#FF8066]">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-[#FF8066] uppercase">
                  Module 1 Milestone
                </span>
                <span className="text-[#303348]">·</span>
                <span className="text-[10px] font-mono text-[#A9A8BA]">
                  {completedCount === totalMod1Count ? 'Ready' : 'Locked until complete'}
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-[#F6F4FF] mt-0.5">
                First Contact Mastery Checkpoint
              </h4>
              <p className="text-[11px] text-[#A9A8BA] mt-0.5">
                Demonstrate instrument knowledge, posture, and your first clean sound.
              </p>
            </div>
          </div>
        </div>

        {/* Future Modules Roadmap Stations */}
        <div className="w-full max-w-md mt-16 flex flex-col gap-4 border-t border-[#303348] pt-8">
          <span className="text-xs font-mono font-bold text-[#A9A8BA] uppercase tracking-wider text-center block">
            Upcoming Modules in Your Journey
          </span>

          {modules.slice(1, 5).map((mod) => (
            <div
              key={mod.id}
              className="p-4 rounded-2xl bg-[#0D0E17]/80 border border-[#303348]/60 flex items-center justify-between opacity-75 hover:opacity-100 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#1D2032] border border-[#303348] flex items-center justify-center text-xs font-mono font-bold text-[#8067FF]">
                  M{mod.moduleNumber}
                </span>
                <div>
                  <h5 className="text-xs font-bold text-[#F6F4FF]">{mod.title}</h5>
                  <span className="text-[10px] text-[#A9A8BA] font-mono">
                    {mod.lessons.length} lessons
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#A9A8BA]">Available</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
