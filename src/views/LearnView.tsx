/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GUITAR_MODULES } from '../data/guitarStructuredCurriculum';
import { GuitarLesson, LessonStatus } from '../types/guitarLessons';
import { GuitarProgressService } from '../services/guitarProgressService';
import { FullScreenLessonView } from '../components/lessons/FullScreenLessonView';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Play,
  X,
  Award,
  Layers,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

interface LearnViewProps {
  onNavigateToPractice?: (skillName?: string) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ onNavigateToPractice }) => {
  const [selectedLessonForPreview, setSelectedLessonForPreview] = useState<GuitarLesson | null>(null);
  const [activeFullScreenLesson, setActiveFullScreenLesson] = useState<GuitarLesson | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const progressService = GuitarProgressService.getInstance();

  const getLessonStatus = (lessonId: string): LessonStatus => {
    return progressService.getLessonStatus(lessonId);
  };

  const getStatusBadge = (status: LessonStatus) => {
    switch (status) {
      case 'completed':
        return { label: 'Completed', color: '#45D483', bg: 'rgba(69, 212, 131, 0.15)' };
      case 'mastered':
        return { label: 'Mastered', color: '#8067FF', bg: 'rgba(128, 103, 255, 0.15)' };
      case 'in_progress':
        return { label: 'In Progress', color: '#F4BB55', bg: 'rgba(244, 187, 85, 0.15)' };
      default:
        return { label: 'Not Started', color: '#A9A8BA', bg: 'rgba(169, 168, 186, 0.15)' };
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-20 text-[#F6F4FF]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#303348] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8067FF]" />
            <span className="text-xs font-mono font-bold text-[#8067FF] uppercase tracking-wider">
              STRUCTURED CURRICULUM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F6F4FF] tracking-tight mt-1">
            Guitar Learning Path
          </h1>
          <p className="text-xs text-[#A9A8BA] mt-0.5">
            Teacher-led structured guitar curriculum from Absolute Beginner to Mastery.
          </p>
        </div>
      </div>

      {/* Modules and Lessons List */}
      <div className="flex flex-col gap-10">
        {GUITAR_MODULES.map((module) => (
          <div key={module.id} className="flex flex-col gap-4">
            {/* Module Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#303348]/60 pb-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-md bg-[#8067FF]/20 text-[#8067FF] font-mono text-xs font-bold">
                  Module {module.moduleNumber}
                </span>
                <h2 className="text-lg font-bold text-[#F6F4FF]">{module.title}</h2>
              </div>
              <p className="text-xs text-[#A9A8BA]">{module.description}</p>
            </div>

            {/* Lesson Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {module.lessons.map((lesson) => {
                const status = getLessonStatus(lesson.id);
                const badge = getStatusBadge(status);

                let actionLabel = 'Start Lesson';
                if (status === 'in_progress') actionLabel = 'Continue Lesson';
                else if (status === 'completed') actionLabel = 'Review Lesson';
                else if (status === 'mastered') actionLabel = 'Practice Skill';

                return (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLessonForPreview(lesson)}
                    className="p-5 rounded-2xl bg-[#151725] border border-[#303348] hover:border-[#8067FF] cursor-pointer flex flex-col justify-between gap-4 transition-all duration-200 shadow-md group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-[#A9A8BA]">
                          Lesson {lesson.lessonNumber}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono"
                          style={{ color: badge.color, backgroundColor: badge.bg }}
                        >
                          {badge.label}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#F6F4FF] group-hover:text-[#FF8066] transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-[#A9A8BA] mt-1 line-clamp-2 leading-relaxed">
                        {lesson.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#303348]/60 flex items-center justify-between text-xs text-[#A9A8BA]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lesson.durationMinutes} min</span>
                      </span>

                      <span className="font-semibold text-[#8067FF] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        <span>{actionLabel}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* LESSON DETAIL PREVIEW MODAL (Section 53) */}
      {selectedLessonForPreview && (
        <div className="fixed inset-0 z-50 bg-[#0D0E17]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#151725] border border-[#303348] rounded-3xl p-6 sm:p-7 flex flex-col gap-6 shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#303348] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-[#FF8066]">
                    Lesson {selectedLessonForPreview.lessonNumber}
                  </span>
                  <span className="text-[#303348]">·</span>
                  <span className="text-xs text-[#A9A8BA]">
                    {selectedLessonForPreview.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#F6F4FF]">
                  {selectedLessonForPreview.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedLessonForPreview(null)}
                className="p-1.5 rounded-lg text-[#A9A8BA] hover:text-[#F6F4FF] hover:bg-[#1D2032] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subtitle & Goal */}
            <div className="flex flex-col gap-3">
              <p className="text-xs text-[#E2E1EC] leading-relaxed">
                {selectedLessonForPreview.subtitle}
              </p>

              <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs">
                <span className="text-[#A9A8BA] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#8067FF]" />
                  <span>Duration: {selectedLessonForPreview.durationMinutes} minutes</span>
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold"
                  style={{
                    color: getStatusBadge(getLessonStatus(selectedLessonForPreview.id)).color,
                    backgroundColor: getStatusBadge(getLessonStatus(selectedLessonForPreview.id)).bg,
                  }}
                >
                  {getStatusBadge(getLessonStatus(selectedLessonForPreview.id)).label}
                </span>
              </div>
            </div>

            {/* What you will learn */}
            <div>
              <h4 className="text-xs font-bold text-[#F6F4FF] uppercase tracking-wider mb-2">
                What You Will Learn
              </h4>
              <ul className="space-y-2 text-xs text-[#A9A8BA]">
                {selectedLessonForPreview.whatYouWillLearn.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#54D6C3] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Launch Lesson Button */}
            <div className="pt-2 border-t border-[#303348] flex items-center justify-between">
              <button
                onClick={() => setSelectedLessonForPreview(null)}
                className="text-xs text-[#A9A8BA] hover:text-[#F6F4FF]"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  const target = selectedLessonForPreview;
                  setSelectedLessonForPreview(null);
                  if (target) {
                    progressService.markLessonStarted(target.id);
                    setActiveFullScreenLesson(target);
                  }
                }}
                className="px-6 py-3 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#8067FF]/25 transition-all hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>
                  {selectedLessonForPreview && getLessonStatus(selectedLessonForPreview.id) === 'in_progress'
                    ? 'Continue Lesson'
                    : selectedLessonForPreview && getLessonStatus(selectedLessonForPreview.id) === 'completed'
                    ? 'Review Lesson'
                    : 'Start Lesson'}
                </span>
              </button>

            </div>
          </div>
        </div>
      )}

      {/* FULL-SCREEN LESSON VIEW */}
      {activeFullScreenLesson && (
        <FullScreenLessonView
          lesson={activeFullScreenLesson}
          onClose={() => setActiveFullScreenLesson(null)}
          onLessonCompleted={(lessonId) => {
            setActiveFullScreenLesson(null);
          }}
          onNavigateToPractice={(skill) => {
            setActiveFullScreenLesson(null);
            if (onNavigateToPractice) onNavigateToPractice(skill);
          }}
          onNavigateToLearn={() => {
            setActiveFullScreenLesson(null);
          }}
        />
      )}
    </div>
  );
};
