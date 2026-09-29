/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InstrumentType } from '../types/vibex';
import { CURRICULA, RECOMMENDED_SONGS } from '../data/curriculumData';
import { MASTER_GUITAR_LESSONS } from '../data/guitarMasterCurriculum';
import { VibeTeacherEngine, SKILL_CATEGORIES_METADATA } from '../services/vibeTeacherEngine';
import { MasterGuitarLesson, DailyClassSession } from '../types/guitarCurriculum';
import { InteractiveLessonRunner } from '../components/lessons/InteractiveLessonRunner';
import { GuitarAnatomyExplorer } from '../components/lessons/GuitarAnatomyExplorer';
import { MasterGuitarFretboard } from '../components/instruments/MasterGuitarFretboard';
import {
  Flame,
  Play,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  Target,
  CheckCircle2,
  Calendar,
  Compass,
  Zap,
  BookOpen,
  Activity,
  Layers,
  ChevronRight,
  X,
  Volume2,
} from 'lucide-react';

interface DashboardViewProps {
  activeInstrument: InstrumentType;
  onSelectInstrument: (inst: InstrumentType) => void;
  onStartPractice: (exerciseId?: string) => void;
  onOpenCurriculum: () => void;
  streakCount: number;
}

const INSTRUMENT_IMAGES: Record<InstrumentType, string> = {
  keyboard: '/src/assets/images/vibex_hero_piano_1790614064462.jpg',
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

  // Guitar Adaptive Studio & Lesson Runner States
  const [activeLesson, setActiveLesson] = useState<MasterGuitarLesson | null>(null);
  const [dailyClassModalOpen, setDailyClassModalOpen] = useState<boolean>(false);
  const [dailySessionData, setDailySessionData] = useState<DailyClassSession | null>(null);
  const [isAnatomyOpen, setIsAnatomyOpen] = useState<boolean>(false);
  const [isFretboardLabOpen, setIsFretboardLabOpen] = useState<boolean>(false);

  const teacherEngine = VibeTeacherEngine.getInstance();
  const skillProfile = teacherEngine.getSkillProfile();
  const diagnosis = teacherEngine.diagnoseWeaknesses();

  const handleStartDailyClass = () => {
    const session = teacherEngine.generateDailyClass(MASTER_GUITAR_LESSONS);
    setDailySessionData(session);
    setDailyClassModalOpen(true);
  };

  const handleLaunchTargetedLesson = (lesson: MasterGuitarLesson) => {
    setDailyClassModalOpen(false);
    setActiveLesson(lesson);
  };

  const instruments: { id: InstrumentType; name: string; accent: string; description: string }[] = [
    { id: 'keyboard', name: 'Keyboard / Piano', accent: '#8067FF', description: 'Polyphonic hand arch & 5-finger independence' },
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
            <span className="text-[#54D6C3] font-semibold">Adaptive Studio</span>
            <span aria-hidden="true">·</span>
            <span>{currentCurriculum.displayName}</span>
            <span aria-hidden="true">·</span>
            <span>Levels 0 to 48</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F6F4FF] tracking-tight">
            Continue Your Journey on {currentCurriculum.displayName}
          </h1>

          <p className="text-sm text-[#A9A8BA] max-w-2xl leading-relaxed">
            {activeInstrument === 'guitar'
              ? 'Complete interactive teaching curriculum from Absolute Beginner to Professional Musician, powered by Vibe AI Teacher.'
              : activeExercise
              ? `${activeExercise.title}: ${activeExercise.subtitle}`
              : currentCurriculum.tagline}
          </p>

          {/* Progress Track in Aqua Mint (#54D6C3) */}
          <div className="flex flex-col gap-1.5 pt-2 max-w-md">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A9A8BA]">Master Curriculum Progression</span>
              <span className="font-mono font-bold text-[#54D6C3]">Active Stage 1</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#0D0E17] border border-[#303348] overflow-hidden">
              <div
                className="h-full bg-[#54D6C3] rounded-full transition-all duration-500 shadow-[0_0_8px_#54D6C3]"
                style={{ width: '42%' }}
              />
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="z-10 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
          {activeInstrument === 'guitar' && (
            <button
              onClick={handleStartDailyClass}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF8066] to-[#E889A5] hover:brightness-110 text-[#0D0E17] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF8066]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 fill-current text-[#0D0E17]" />
              <span>START TODAY'S CLASS</span>
            </button>
          )}

          <button
            onClick={() => onStartPractice(activeExercise?.id)}
            className="px-6 py-3 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#8067FF]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch 3-Step Practice</span>
          </button>

          <button
            onClick={onOpenCurriculum}
            className="px-5 py-2.5 rounded-xl bg-[#1D2032] hover:bg-[#303348] text-[#F6F4FF] font-medium text-xs border border-[#303348] flex items-center justify-center gap-2 transition-colors"
          >
            <span>Explore Practice Map</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A9A8BA]" />
          </button>
        </div>
      </section>

      {/* 14-DIMENSION VIBEX SKILL PROFILE (For Guitar) */}
      {activeInstrument === 'guitar' && (
        <section className="rounded-2xl bg-[#151725] border border-[#303348] p-6 flex flex-col gap-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#303348] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8067FF]" />
                <h3 className="text-base sm:text-lg font-bold text-[#F6F4FF]">
                  14-Dimension VIBEX Skill Profile
                </h3>
              </div>
              <p className="text-xs text-[#A9A8BA] mt-1">
                Real-time tracking of technique, ear, fretboard, repertoire, and musicianship
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#54D6C3]/15 border border-[#54D6C3]/30 text-[#54D6C3] font-semibold">
                Strengths: {diagnosis.strengths.map((s) => s.label).join(', ')}
              </span>
            </div>
          </div>

          {/* VIBE Adaptive Recommendation Callout */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#1D2032] to-[#151725] border border-[#8067FF]/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#8067FF] shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-[#E2E1EC]">
              <span className="font-bold text-[#F6F4FF]">VIBE Adaptive Diagnosis: </span>
              <span>{diagnosis.vibeRecommendation}</span>
            </div>
          </div>

          {/* 14 Skills Progress Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
            {SKILL_CATEGORIES_METADATA.map((cat) => {
              const score = skillProfile[cat.key];
              const percent = score !== null ? (score / 10) * 100 : 0;

              return (
                <div
                  key={cat.key}
                  className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348] flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#F6F4FF] line-clamp-1">
                      {cat.label}
                    </span>
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: cat.color }}
                    >
                      {score}/10
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-[#1D2032] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: cat.color,
                        boxShadow: `0 0 6px ${cat.color}`,
                      }}
                    />
                  </div>

                  <span className="text-[10px] text-[#A9A8BA] line-clamp-1">
                    {cat.description}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Labs Launchers */}
          <div className="pt-2 border-t border-[#303348] flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#A9A8BA]">Interactive Exploration Labs:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAnatomyOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-[#1D2032] hover:bg-[#303348] border border-[#303348] text-xs font-semibold text-[#F6F4FF] flex items-center gap-1.5 transition-colors"
              >
                <Compass className="w-4 h-4 text-[#FF8066]" />
                <span>Guitar Anatomy Explorer</span>
              </button>

              <button
                onClick={() => setIsFretboardLabOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-[#1D2032] hover:bg-[#303348] border border-[#303348] text-xs font-semibold text-[#F6F4FF] flex items-center gap-1.5 transition-colors"
              >
                <Layers className="w-4 h-4 text-[#54D6C3]" />
                <span>Master Fretboard Lab</span>
              </button>

              <button
                onClick={() => handleLaunchTargetedLesson(MASTER_GUITAR_LESSONS[6])} // Level 6.1 C Major
                className="px-3.5 py-1.5 rounded-xl bg-[#8067FF]/20 hover:bg-[#8067FF]/30 border border-[#8067FF]/40 text-xs font-bold text-[#8067FF] flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play C Major Lesson</span>
              </button>
            </div>
          </div>
        </section>
      )}

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
                <div className="relative w-full h-32 bg-[#0D0E17] overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={inst.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151725] via-transparent to-transparent opacity-80" />

                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#8067FF] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Active</span>
                    </div>
                  )}
                </div>

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
                    <span className="text-[#A9A8BA]">Levels 0 to 48</span>
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

      {/* Recommended Song Spotlight & Consistency Telemetry */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 rounded-xl bg-[#151725] border-2 border-[#FF8066]/50 p-6 flex flex-col justify-between gap-4 shadow-lg shadow-[#FF8066]/5 relative overflow-hidden">
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

        {/* Practice Telemetry */}
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
            <span>Grandmaster Goal: Level 48 Capstone Studio Certification</span>
          </div>
        </div>
      </section>

      {/* DAILY CLASS ADAPTIVE SESSION MODAL */}
      {dailyClassModalOpen && dailySessionData && (
        <div className="fixed inset-0 z-50 bg-[#0D0E17]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#151725] border border-[#303348] rounded-3xl p-6 sm:p-7 flex flex-col gap-6 shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#303348] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF8066] to-[#E889A5] flex items-center justify-center text-[#0D0E17] font-bold shadow-lg shadow-[#FF8066]/20">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#FF8066] uppercase tracking-wider font-mono">
                      VIBE DAILY STUDIO CLASS
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#303348] text-[#A9A8BA] font-mono">
                      {dailySessionData.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#F6F4FF] mt-0.5">
                    Tailored 6-Part Mastery Routine
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setDailyClassModalOpen(false)}
                className="p-1.5 rounded-lg text-[#A9A8BA] hover:text-[#F6F4FF] hover:bg-[#1D2032]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Welcome & Diagnosis Message */}
            <div className="p-4 rounded-2xl bg-[#0D0E17] border border-[#8067FF]/30 text-xs sm:text-sm text-[#E2E1EC] leading-relaxed">
              {dailySessionData.welcomeMessage}
            </div>

            {/* Routine Steps List */}
            <div className="flex flex-col gap-2.5">
              <div className="p-3 rounded-xl bg-[#1D2032] border border-[#303348] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#8067FF]/20 text-[#8067FF] font-bold flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span className="font-semibold text-[#F6F4FF]">Warm-Up: Spider Stretch & Finger Independence</span>
                </div>
                <span className="text-[#A9A8BA] font-mono">5 min</span>
              </div>

              <div className="p-3 rounded-xl bg-[#1D2032] border border-[#303348] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#54D6C3]/20 text-[#54D6C3] font-bold flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span className="font-semibold text-[#F6F4FF]">Revision: Open Chords Intonation & Clarity</span>
                </div>
                <span className="text-[#A9A8BA] font-mono">5 min</span>
              </div>

              <div className="p-3 rounded-xl bg-[#1D2032] border border-[#303348] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#2BD2FF]/20 text-[#2BD2FF] font-bold flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span className="font-semibold text-[#F6F4FF]">Weak-Skill Workout: Ear Training & Fretboard Synchronization</span>
                </div>
                <span className="text-[#A9A8BA] font-mono">5 min</span>
              </div>

              <div className="p-3 rounded-xl bg-[#FF8066]/15 border border-[#FF8066]/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FF8066] text-[#0D0E17] font-bold flex items-center justify-center text-[10px]">
                    4
                  </span>
                  <div>
                    <span className="font-bold text-[#F6F4FF] block">
                      New Concept: {dailySessionData.newConceptLesson.title}
                    </span>
                    <span className="text-[#FF8066] text-[11px]">
                      Level {dailySessionData.newConceptLesson.lessonNumber} · {dailySessionData.newConceptLesson.subtitle}
                    </span>
                  </div>
                </div>
                <span className="text-[#FF8066] font-mono font-bold">10 min</span>
              </div>

              <div className="p-3 rounded-xl bg-[#1D2032] border border-[#303348] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FBBF24]/20 text-[#FBBF24] font-bold flex items-center justify-center text-[10px]">
                    5
                  </span>
                  <span className="font-semibold text-[#F6F4FF]">
                    Song Application: {dailySessionData.songApplicationTitle}
                  </span>
                </div>
                <span className="text-[#A9A8BA] font-mono">5 min</span>
              </div>
            </div>

            {/* Launch Daily Class Session */}
            <div className="flex items-center justify-between pt-2 border-t border-[#303348]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F4BB55]">
                <Award className="w-4 h-4" />
                <span>+{dailySessionData.estimatedXp} XP for Completion</span>
              </div>

              <button
                onClick={() => handleLaunchTargetedLesson(dailySessionData.newConceptLesson)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF8066] to-[#E889A5] hover:brightness-110 text-[#0D0E17] font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#FF8066]/30 transition-all hover:scale-[1.02]"
              >
                <span>Enter Guided Studio Session</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GUITAR ANATOMY EXPLORER MODAL */}
      {isAnatomyOpen && (
        <div className="fixed inset-0 z-50 bg-[#0D0E17]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto">
            <GuitarAnatomyExplorer onClose={() => setIsAnatomyOpen(false)} />
          </div>
        </div>
      )}

      {/* MASTER FRETBOARD LAB MODAL */}
      {isFretboardLabOpen && (
        <div className="fixed inset-0 z-50 bg-[#0D0E17]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-[#151725] border border-[#303348] rounded-3xl p-6 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#303348] pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#54D6C3]" />
                <h3 className="text-base font-bold text-[#F6F4FF]">
                  Master Guitar Fretboard Free Lab
                </h3>
              </div>
              <button
                onClick={() => setIsFretboardLabOpen(false)}
                className="p-1 rounded-lg text-[#A9A8BA] hover:text-[#F6F4FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <MasterGuitarFretboard interactive={true} />
          </div>
        </div>
      )}

      {/* INTERACTIVE LESSON RUNNER MODAL */}
      {activeLesson && (
        <InteractiveLessonRunner
          lesson={activeLesson}
          onComplete={(rec) => {
            setActiveLesson(null);
          }}
          onClose={() => setActiveLesson(null)}
        />
      )}
    </div>
  );
};
