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
  const practiceSkills = progressService.getPracticeSkills();
  const recommendedSkill = practiceSkills.find((s) => s.status === 'PRACTICING' || s.status === 'LEARNED') || practiceSkills.find((s) => s.status !== 'NOT_LEARNED');
  const completedCount = progressService.getCompletedLessonsCount();
  const practiceMinutesToday = progressService.getPracticeMinutesToday();

  // Find the next lesson dynamically from curriculum + progress state
  const allLessons = GUITAR_MODULES.flatMap((m) => m.lessons);
  const nextLesson =
    allLessons.find((l) => progressService.getLessonStatus(l.id) === 'in_progress') ||
    allLessons.find((l) => progressService.getLessonStatus(l.id) === 'not_started') ||
    allLessons[0];

  const nextLessonStatus = progressService.getLessonStatus(nextLesson.id);

  // Get recently completed lessons
  const completedLessons = allLessons.filter(
    (l) => progressService.getLessonStatus(l.id) === 'completed' || progressService.getLessonStatus(l.id) === 'mastered'
  );

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-20 text-[#F6F4FF]">
      {/* 1. Header Greeting & Current Context */}
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
            Personal teacher guidance + interactive guitar studio.
          </p>
        </div>

        {/* Real Progress Summary */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <div className="p-3 bg-[#151725] rounded-xl border border-[#303348] flex items-center gap-2 text-xs">
            <Flame className="w-4 h-4 text-[#FF8066]" />
            <span className="font-bold font-mono text-[#F6F4FF]">{streakCount} Day Streak</span>
          </div>

          <div className="p-3 bg-[#151725] rounded-xl border border-[#303348] flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-[#45D483]" />
            <span className="font-bold font-mono text-[#F6F4FF]">{completedCount} Completed</span>
          </div>

          <div className="p-3 bg-[#151725] rounded-xl border border-[#303348] flex items-center gap-2 text-xs">
            <Clock className="w-4 h-4 text-[#54D6C3]" />
            <span className="font-bold text-[#A9A8BA]">
              Today: <span className="text-[#54D6C3] font-mono">{practiceMinutesToday} min</span> / 15m goal
            </span>
          </div>
        </div>
      </div>

      {/* 2. Today's Recommendation & Primary Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Today's Recommendation / Continue Learning */}
        <div className="p-6 rounded-3xl bg-[#151725] border border-[#8067FF]/40 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group hover:border-[#8067FF] transition-colors">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#8067FF]/20 text-[#8067FF] text-xs font-mono font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>TODAY'S RECOMMENDATION</span>
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

          <div className="flex flex-col gap-2 pt-2 border-t border-[#303348]/60">
            <button
              onClick={() => {
                progressService.markLessonStarted(nextLesson.id);
                onStartLesson(nextLesson);
              }}
              className="w-full py-3.5 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#8067FF]/25 transition-all hover:scale-[1.01]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{nextLessonStatus === 'in_progress' ? 'Continue Lesson' : 'Start Lesson'}</span>
            </button>
          </div>
        </div>

        {/* Today's Practice Recommendation (Section 38) */}
        <div className="p-6 rounded-3xl bg-[#151725] border border-[#FF8066]/40 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group hover:border-[#FF8066] transition-colors">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FF8066]/20 text-[#FF8066] text-xs font-mono font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>TODAY'S PRACTICE</span>
              </span>
              <span className="text-xs font-mono text-[#54D6C3] font-bold">
                15 Minutes
              </span>
            </div>

            <div>
              <span className="text-xs text-[#A9A8BA]">
                {recommendedSkill ? 'Targeted Technique & Repetition' : 'Foundational Practice Routine'}
              </span>
              <h2 className="text-xl font-bold text-[#F6F4FF] mt-1">
                {recommendedSkill ? `Recommended: ${recommendedSkill.skillName}` : 'Recommended: Spider Walk & Tuning'}
              </h2>
              <p className="text-xs text-[#A9A8BA] mt-2 leading-relaxed">
                {recommendedSkill
                  ? `Build muscle memory, individual string clarity, and transition speed with a structured 15-minute workout.`
                  : 'Develop finger independence with the 1-2-3-4 spider walk and calibrate your guitar in the studio.'}
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToPractice}
            className="w-full py-3.5 rounded-xl bg-[#FF8066] hover:bg-[#ff6e50] text-[#0D0E17] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF8066]/25 transition-all hover:scale-[1.01]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Practice (15m)</span>
          </button>
        </div>
      </div>

      {/* 3. Dynamic Learning Status (No Large Empty Box) */}
      <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#303348] pb-3">
          <h3 className="text-sm font-bold text-[#F6F4FF]">
            {completedLessons.length > 0 ? 'Recently Learned' : 'Currently Learning'}
          </h3>
          <button
            onClick={onNavigateToLearn}
            className="text-xs text-[#8067FF] hover:underline flex items-center gap-1"
          >
            <span>Full Curriculum</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {completedLessons.length === 0 ? (
          <div className="py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8067FF] animate-pulse" />
              <div>
                <span className="text-xs font-mono text-[#A9A8BA]">
                  Lesson {nextLesson.lessonNumber} · {nextLesson.moduleName}
                </span>
                <h4 className="text-sm font-bold text-[#F6F4FF]">{nextLesson.title}</h4>
                <p className="text-xs text-[#A9A8BA]">{nextLesson.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => {
                progressService.markLessonStarted(nextLesson.id);
                onStartLesson(nextLesson);
              }}
              className="px-4 py-2 rounded-xl bg-[#1D2032] hover:bg-[#303348] text-[#F6F4FF] border border-[#303348] text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Start Lesson</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8067FF]" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {completedLessons.slice(0, 3).map((l) => (
              <div
                key={l.id}
                className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#45D483] shrink-0" />
                  <div>
                    <span className="font-bold text-[#F6F4FF] block">{l.title}</span>
                    <span className="text-[10px] text-[#A9A8BA] font-mono">
                      Lesson {l.lessonNumber}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Honest Next Musical Goal (Not Fake Completed Milestone) */}
      <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#54D6C3]/20 border border-[#54D6C3] flex items-center justify-center text-[#54D6C3] shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1D2032] text-[#54D6C3] font-bold">
                Target Song
              </span>
              <h4 className="text-sm font-bold text-[#F6F4FF]">NEXT MUSICAL GOAL</h4>
            </div>
            <p className="text-xs text-[#F6F4FF] font-semibold mt-1">
              Knockin' on Heaven's Door
            </p>
            <p className="text-xs text-[#A9A8BA] mt-0.5 font-mono">
              G → D → Am → G → D → C · 70 BPM target
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToSongs}
          className="px-4 py-2.5 rounded-xl bg-[#1D2032] hover:bg-[#303348] text-xs font-semibold text-[#F6F4FF] border border-[#303348] flex items-center gap-1.5 transition-colors shrink-0 self-start sm:self-auto"
        >
          <span>Explore Song</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#54D6C3]" />
        </button>
      </div>
    </div>
  );
};

