/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GUITAR_MODULES } from '../data/guitarStructuredCurriculum';
import { GuitarLesson, LessonStatus } from '../types/guitarLessons';
import { GuitarProgressService } from '../services/guitarProgressService';
import { useInstrument } from '../contexts/InstrumentContext';
import { InstrumentEmptyState } from '../components/layout/InstrumentEmptyState';
import { FullScreenLessonView } from '../components/lessons/FullScreenLessonView';
import { GamifiedLearningMap } from '../components/lessons/GamifiedLearningMap';
import { Lesson1_1Player } from '../components/lessons/Lesson1_1Player';
import { LessonPlayerEngine, LessonPlayerConfig } from '../components/lessons/LessonPlayerEngine';
import { LESSON_1_2_CONFIG } from '../data/lesson1_2Config';
import { LESSON_1_3_CONFIG } from '../data/lesson1_3Config';
import { LESSON_1_4_CONFIG } from '../data/lesson1_4Config';
import { LESSON_1_6_CONFIG } from '../data/lesson1_6Config';
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

// Map of lesson IDs to their interactive engine configs
const INTERACTIVE_LESSON_CONFIGS: Record<string, LessonPlayerConfig> = {
  lesson_1_2: LESSON_1_2_CONFIG,
  lesson_1_3: LESSON_1_3_CONFIG,
  lesson_1_4: LESSON_1_4_CONFIG,
  lesson_1_6: LESSON_1_6_CONFIG,
};

export const LearnView: React.FC<LearnViewProps> = ({ onNavigateToPractice }) => {
  const [selectedLessonForPreview, setSelectedLessonForPreview] = useState<GuitarLesson | null>(null);
  const [activeFullScreenLesson, setActiveFullScreenLesson] = useState<GuitarLesson | null>(null);
  const [activeLesson1_1, setActiveLesson1_1] = useState<boolean>(false);
  const [activeInteractiveConfig, setActiveInteractiveConfig] = useState<LessonPlayerConfig | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const { activeInstrument } = useInstrument();

  if (activeInstrument !== 'guitar') {
    return <InstrumentEmptyState />;
  }

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

  const handleSelectLesson = (lesson: GuitarLesson) => {
    if (lesson.id === 'lesson_1_1') {
      setActiveLesson1_1(true);
    } else if (INTERACTIVE_LESSON_CONFIGS[lesson.id]) {
      // Launch the interactive engine directly for lessons with configs
      progressService.markLessonStarted(lesson.id);
      setActiveInteractiveConfig(INTERACTIVE_LESSON_CONFIGS[lesson.id]);
    } else {
      setSelectedLessonForPreview(lesson);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 text-[#F6F4FF]">
      {/* Gamified Guitar Learning Map */}
      <GamifiedLearningMap
        modules={GUITAR_MODULES}
        getLessonStatus={getLessonStatus}
        onSelectLesson={handleSelectLesson}
      />

      {/* FULL-SCREEN LEVEL 1.1 INTERACTIVE EXPERIENCE */}
      {activeLesson1_1 && (
        <Lesson1_1Player
          onClose={() => setActiveLesson1_1(false)}
          onComplete={() => {
            setActiveLesson1_1(false);
            setRefreshTrigger((prev) => prev + 1);
          }}
          onNavigateToPractice={onNavigateToPractice}
        />
      )}

      {/* INTERACTIVE LESSON ENGINE (1.2, 1.3, 1.4, 1.6) */}
      {activeInteractiveConfig && (
        <LessonPlayerEngine
          config={activeInteractiveConfig}
          onClose={() => setActiveInteractiveConfig(null)}
          onComplete={() => {
            setActiveInteractiveConfig(null);
            setRefreshTrigger((prev) => prev + 1);
          }}
          onNavigateToPractice={onNavigateToPractice}
        />
      )}

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
