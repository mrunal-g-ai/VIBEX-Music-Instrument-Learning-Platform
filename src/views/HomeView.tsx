/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GuitarProgressService } from '../services/guitarProgressService';
import { GUITAR_MODULES } from '../data/guitarStructuredCurriculum';
import { GuitarLesson } from '../types/guitarLessons';
import {
  BookOpen,
  Zap,
  Clock,
  ArrowRight,
  Flame,
  CheckCircle2,
  Play,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface HomeViewProps {
  onNavigateToLearn: () => void;
  onNavigateToPractice: () => void;
  onNavigateToSongs: () => void;
  onStartLesson: (lesson: GuitarLesson) => void;
  streakCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateToLearn,
  onNavigateToPractice,
  onNavigateToSongs,
  onStartLesson,
  streakCount,
}) => {
  const progressService = GuitarProgressService.getInstance();
  const completedSkills = progressService.getCompletedSkills();

  // Find the next lesson to learn
  const allLessons = GUITAR_MODULES.flatMap((m) => m.lessons);
  const nextLesson =
    allLessons.find((l) => progressService.getLessonStatus(l.id) === 'in_progress') ||
    allLessons.find((l) => progressService.getLessonStatus(l.id) === 'not_started') ||
    allLessons[0];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-20 text-[#F6F4FF]">
      {/* 1. Header Greeting & Current Goal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#303348] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8066]" />
            <span className="text-xs font-mono font-bold text-[#FF8066] uppercase tracking-wider">
              VIBEX GUITAR
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F6F4FF] tracking-tight mt-1">
            Welcome back, Guitarist
          </h1>
          <p className="text-xs text-[#A9A8BA] mt-0.5">
            What should you do now? Continue your lesson or jump into the practice studio.
          </p>
        </div>

        {/* Daily Streak & Goal */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#151725] rounded-xl border border-[#303348] flex items-center gap-2 text-xs">
            <Flame className="w-4 h-4 text-[#FF8066]" />
            <span className="font-bold font-mono text-[#F6F4FF]">{streakCount} Days Streak</span>
          </div>
          <div className="p-3 bg-[#151725] rounded-xl border border-[#303348] flex items-center gap-2 text-xs">
            <Clock className="w-4 h-4 text-[#54D6C3]" />
            <span className="font-bold text-[#A9A8BA]">Goal: <span className="text-[#54D6C3]">15 min/day</span></span>
          </div>
        </div>
      </div>

      {/* 2. Primary Action Cards: CONTINUE LEARNING vs PRACTICE STUDIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Continue Learning Card */}
        <div className="p-6 rounded-3xl bg-[#151725] border border-[#8067FF]/40 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group hover:border-[#8067FF] transition-colors">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#8067FF]/20 text-[#8067FF] text-xs font-mono font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Continue Learning</span>
              </span>
              <span className="text-xs font-mono text-[#A9A8BA]">
                {nextLesson.durationMinutes} min
              </span>
            </div>

            <div>
              <span className="text-xs text-[#A9A8BA]">
                Lesson {nextLesson.lessonNumber} · {nextLesson.moduleName}
              </span>
              <h2 className="text-xl font-bold text-[#F6F4FF] mt-1">
                {nextLesson.title}
              </h2>
              <p className="text-xs text-[#A9A8BA] mt-2 line-clamp-2 leading-relaxed">
                {nextLesson.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => onStartLesson(nextLesson)}
            className="w-full py-3.5 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#8067FF]/25 transition-all hover:scale-[1.01]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Continue Lesson</span>
          </button>
        </div>

        {/* Practice Studio Card */}
        <div className="p-6 rounded-3xl bg-[#151725] border border-[#FF8066]/40 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group hover:border-[#FF8066] transition-colors">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FF8066]/20 text-[#FF8066] text-xs font-mono font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Practice Studio</span>
              </span>
              <span className="text-xs font-mono text-[#54D6C3] font-bold">
                {completedSkills.length} Skills Ready
              </span>
            </div>

            <div>
              <span className="text-xs text-[#A9A8BA]">
                Technique, Speed & Repetition Workbench
              </span>
              <h2 className="text-xl font-bold text-[#F6F4FF] mt-1">
                Your Practice Workbench
              </h2>
              <p className="text-xs text-[#A9A8BA] mt-2 leading-relaxed">
                {completedSkills.length > 0
                  ? `Strengthen your ${completedSkills[0].skillName} and test your 30s chord switch speed in the Speed Lab.`
                  : 'Practice spider walk dexterity drills, metronome pulse timing, or tune your instrument.'}
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToPractice}
            className="w-full py-3.5 rounded-xl bg-[#FF8066] hover:bg-[#ff6e50] text-[#0D0E17] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF8066]/25 transition-all hover:scale-[1.01]"
          >
            <span>Open Practice Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Recently Completed Skills Section */}
      <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#303348] pb-3">
          <h3 className="text-sm font-bold text-[#F6F4FF]">Recently Completed Skills</h3>
          <button
            onClick={onNavigateToLearn}
            className="text-xs text-[#8067FF] hover:underline flex items-center gap-1"
          >
            <span>Full Curriculum</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {completedSkills.length === 0 ? (
          <div className="py-4 text-xs text-[#A9A8BA] text-center">
            You haven't completed any lessons yet. Complete your first lesson in{' '}
            <button onClick={onNavigateToLearn} className="text-[#8067FF] underline font-bold">
              Learn
            </button>{' '}
            to start unlocking completed skills.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {completedSkills.slice(0, 4).map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348] flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#F6F4FF]">{s.skillName}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#45D483]" />
                </div>
                <span className="text-[10px] text-[#A9A8BA] font-mono">
                  Best: {s.bestBpm} BPM
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Quick Repertoire Spotlight */}
      <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#54D6C3]/20 border border-[#54D6C3] flex items-center justify-center text-[#54D6C3] shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#F6F4FF]">Repertoire Milestone</h4>
            <p className="text-xs text-[#A9A8BA] mt-0.5">
              Knockin' on Heaven's Door (G - D - Am / G - D - C) at 70 BPM
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToSongs}
          className="px-4 py-2 rounded-xl bg-[#1D2032] hover:bg-[#303348] text-xs font-semibold text-[#F6F4FF] border border-[#303348] flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>Explore Songs</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#A9A8BA]" />
        </button>
      </div>
    </div>
  );
};
