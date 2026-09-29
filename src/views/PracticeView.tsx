/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GuitarProgressService } from '../services/guitarProgressService';
import { PracticeSkillItem, PracticeExerciseItem } from '../types/guitarLessons';
import { SpeedLabView } from '../components/practice/SpeedLabView';
import { MetronomeTool } from '../components/practice/MetronomeTool';
import { TunerTool } from '../components/practice/TunerTool';
import { InteractivePracticeSession } from '../components/practice/InteractivePracticeSession';
import {
  Clock,
  BookOpen,
  Zap,
  Mic,
  Music,
  Play,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Lock,
  Layers,
  Award,
  Sliders,
} from 'lucide-react';

interface PracticeViewProps {
  onNavigateToLearn: () => void;
  onNavigateToSongs: () => void;
}

type PracticeTab = 'quick' | 'skills' | 'speed_lab';

export const PracticeView: React.FC<PracticeViewProps> = ({
  onNavigateToLearn,
  onNavigateToSongs,
}) => {
  const [activeTab, setActiveTab] = useState<PracticeTab>('quick');

  // Quick Practice Duration Selector (5, 15, 30, 45, 60 min)
  const [quickDuration, setQuickDuration] = useState<5 | 15 | 30 | 45 | 60>(15);

  // Active Interactive Practice Session Modal
  const [activePracticeSession, setActivePracticeSession] = useState<{
    title: string;
    duration: number;
    exercises: PracticeExerciseItem[];
  } | null>(null);

  // Utility Drawer / Modal State (Tuner & Metronome)
  const [activeUtility, setActiveUtility] = useState<'none' | 'tuner' | 'metronome'>('none');

  const progressService = GuitarProgressService.getInstance();
  const practiceSkills = progressService.getPracticeSkills();

  // Helper: Status badge styling for My Skills
  const getStatusBadge = (status: PracticeSkillItem['status']) => {
    switch (status) {
      case 'MASTERED':
        return { label: 'Mastered', color: '#45D483', bg: 'rgba(69, 212, 131, 0.15)' };
      case 'IMPROVING':
        return { label: 'Improving', color: '#FF8066', bg: 'rgba(255, 128, 102, 0.15)' };
      case 'PRACTICING':
        return { label: 'Practicing', color: '#54D6C3', bg: 'rgba(84, 214, 195, 0.15)' };
      case 'LEARNED':
        return { label: 'Learned', color: '#8067FF', bg: 'rgba(128, 103, 255, 0.15)' };
      case 'NOT_LEARNED':
      default:
        return { label: 'Not Learned', color: '#A9A8BA', bg: 'rgba(169, 168, 186, 0.15)' };
    }
  };

  // Generate dynamic Quick Practice routine based on actual user state
  const generateDynamicRoutine = (duration: number): {
    title: string;
    focus: string;
    goal: string;
    phases: { name: string; minutes: number; action: string }[];
    exercises: PracticeExerciseItem[];
  } => {
    const hasC = practiceSkills.find((s) => s.id === 'c_major_chord')?.status !== 'NOT_LEARNED';
    const hasSpider = practiceSkills.find((s) => s.id === 'spider_walk')?.status !== 'NOT_LEARNED';
    const hasSwitching = practiceSkills.find((s) => s.id === 'c_g_switching')?.status !== 'NOT_LEARNED';
    const hasFolkStrumming = practiceSkills.find((s) => s.id === 'folk_strumming')?.status !== 'NOT_LEARNED';

    const exercises: PracticeExerciseItem[] = [];
    const phases: { name: string; minutes: number; action: string }[] = [];

    // Phase 1: Technique / Warmup
    if (hasSpider) {
      exercises.push({
        id: 'spider_walk',
        title: 'Spider Walk (1-2-3-4)',
        category: 'Technique',
        why: 'Builds finger independence so each fretting finger moves without stiffness or tension.',
        what: 'Play frets 1, 2, 3, 4 sequentially on each string from 6th (Low E) down to 1st (High E).',
        how: 'Finger 1 on fret 1, Finger 2 on fret 2, Finger 3 on fret 3, Finger 4 on fret 4. Keep knuckles arched.',
        visualMode: 'TECHNIQUE',
        targetTempo: 50,
        durationMinutes: duration >= 30 ? 6 : duration >= 15 ? 4 : 2,
        skillId: 'spider_walk',
      });
      phases.push({
        name: 'Spider Walk (1-2-3-4)',
        minutes: duration >= 30 ? 6 : duration >= 15 ? 4 : 2,
        action: 'Chromatic finger independence across strings 6 to 1',
      });
    } else {
      exercises.push({
        id: 'open_strings_picking',
        title: 'Open String Targeting & Picking',
        category: 'Technique',
        why: 'Builds muscle memory for your picking hand without needing to stare down at the strings.',
        what: 'Pluck strings 6, 5, 4, 3, 2, 1 cleanly with steady downstrokes.',
        how: 'Rest your right forearm comfortably and pluck each string cleanly with your pick or thumb.',
        visualMode: 'TECHNIQUE',
        durationMinutes: duration >= 15 ? 3 : 2,
        skillId: 'open_strings_picking',
      });
      phases.push({
        name: 'Open String Targeting',
        minutes: duration >= 15 ? 3 : 2,
        action: 'Clean plucking across all 6 strings',
      });
    }

    // Phase 2: Chord Formation or Clarity
    if (hasC) {
      exercises.push({
        id: 'c_major_chord',
        title: 'C Major Chord & Clarity',
        category: 'Chords',
        why: 'The cornerstone major chord. Requires arched knuckles to prevent muting open strings.',
        what: 'Form C Major (X 3 2 0 1 0), test each string individually, and strum cleanly.',
        how: 'Finger 1 on Str 2 F1, Finger 2 on Str 4 F2, Finger 3 on Str 5 F3. Mute string 6.',
        visualMode: 'CHORD_DIAGRAM',
        targetTempo: 60,
        durationMinutes: duration >= 30 ? 8 : duration >= 15 ? 4 : 3,
        skillId: 'c_major_chord',
      });
      phases.push({
        name: 'C Major Formation & Clarity',
        minutes: duration >= 30 ? 8 : duration >= 15 ? 4 : 3,
        action: 'Form shape X 3 2 0 1 0 and test individual string resonance',
      });
    }

    // Phase 3: Chord Switching (for 15+ min)
    if (duration >= 15) {
      if (hasSwitching) {
        exercises.push({
          id: 'c_g_switching',
          title: 'C → G Chord Switching',
          category: 'Chord Changes',
          why: 'Switching smoothly between chords on the beat is the key to playing acoustic songs.',
          what: 'Switch from C Major to G Major every 4 beats with the metronome at 50 BPM.',
          how: 'Keep your motion compact. Do not lift fingers far off the fretboard.',
          visualMode: 'CHORD_DIAGRAM',
          targetTempo: 50,
          durationMinutes: duration >= 30 ? 8 : 4,
          skillId: 'c_g_switching',
        });
        phases.push({
          name: 'C → G Chord Switching',
          minutes: duration >= 30 ? 8 : 4,
          action: 'Transition drill with steady pulse',
        });
      } else {
        exercises.push({
          id: 'open_strings_picking',
          title: 'String Targeting & Coordination',
          category: 'Technique',
          why: 'Master precision picking across string pairs.',
          what: 'Alternate pluck between 6th and 1st string.',
          how: 'Keep hand relaxed and anchored over the guitar bridge contour.',
          visualMode: 'TECHNIQUE',
          durationMinutes: 4,
          skillId: 'open_strings_picking',
        });
        phases.push({
          name: 'String Targeting & Coordination',
          minutes: 4,
          action: 'Alternate picking across string pairs',
        });
      }
    }

    // Phase 4: Strumming Rhythm (for 15+ min)
    if (duration >= 15) {
      exercises.push({
        id: 'folk_strumming',
        title: 'Folk Strumming Pattern (D - D - U - U - D)',
        category: 'Rhythm',
        why: 'The essential acoustic strumming rhythm used in hundreds of folk and rock anthems.',
        what: 'Swing your right hand in a continuous pendulum. Strike strings on 1, 2, & of 2, & of 3, 4.',
        how: 'Down on 1, Down on 2, Up on &, Up on &, Down on 4.',
        visualMode: 'RHYTHM_GRID',
        targetTempo: 65,
        durationMinutes: duration >= 30 ? 8 : 3,
        skillId: 'folk_strumming',
      });
      phases.push({
        name: 'Folk Strumming Rhythm',
        minutes: duration >= 30 ? 8 : 3,
        action: 'D - D - U - U - D pendulum pulse',
      });
    }

    // Determine focus and goal text
    let focus = 'Technique • Finger Independence';
    let goal = 'Clean finger placement and relaxed hand ergonomics';

    if (hasC && hasSwitching) {
      focus = 'Technique • Chords • Rhythm';
      goal = 'Improve C → G switching at 50 BPM with clean ringing strings';
    } else if (hasC) {
      focus = 'Chords • Clarity • Technique';
      goal = 'Master clean 5-string resonance on C Major';
    }

    return {
      title: `${duration} MIN TODAY'S PRACTICE`,
      focus,
      goal,
      phases,
      exercises,
    };
  };

  const dynamicRoutine = generateDynamicRoutine(quickDuration);

  // Launch a practice session for a single specific skill
  const handleLaunchSingleSkill = (skill: PracticeSkillItem) => {
    let ex: PracticeExerciseItem;

    if (skill.id === 'spider_walk') {
      ex = {
        id: 'spider_walk',
        title: 'Spider Walk (1-2-3-4)',
        category: 'Technique',
        why: 'Builds finger independence so each fretting finger moves without stiffness or tension.',
        what: 'Play frets 1, 2, 3, 4 sequentially on each string from 6th (Low E) down to 1st (High E).',
        how: 'Finger 1 on fret 1, Finger 2 on fret 2, Finger 3 on fret 3, Finger 4 on fret 4. Keep knuckles arched.',
        visualMode: 'TECHNIQUE',
        targetTempo: skill.bestBpm || 50,
        durationMinutes: 5,
        skillId: 'spider_walk',
      };
    } else if (skill.category === 'Chords') {
      ex = {
        id: skill.id,
        title: `${skill.skillName} Practice`,
        category: 'Chords',
        why: 'Ensures every note in the chord rings cleanly without buzzing or accidental muting.',
        what: 'Place fingers, test each string individually, and strum with steady tone.',
        how: 'Press firmly right behind fretwires. Keep knuckles curved like holding a tennis ball.',
        visualMode: 'CHORD_DIAGRAM',
        durationMinutes: 5,
        skillId: skill.id,
      };
    } else if (skill.id === 'c_g_switching') {
      ex = {
        id: 'c_g_switching',
        title: 'C → G Chord Switching',
        category: 'Chord Changes',
        why: 'Eliminates pauses between chord shapes for fluid musical performance.',
        what: 'Switch from C Major to G Major every 4 beats with the metronome.',
        how: 'Keep movement compact and use finger pivots where possible.',
        visualMode: 'CHORD_DIAGRAM',
        targetTempo: skill.bestBpm || 50,
        durationMinutes: 5,
        skillId: 'c_g_switching',
      };
    } else {
      ex = {
        id: skill.id,
        title: `${skill.skillName} Practice`,
        category: skill.category,
        why: skill.description,
        what: 'Practice with steady tempo and clean technique.',
        how: 'Listen carefully to each note and follow the metronome pulse.',
        visualMode: 'RHYTHM_GRID',
        durationMinutes: 5,
        skillId: skill.id,
      };
    }

    setActivePracticeSession({
      title: `${skill.skillName} Practice Session`,
      duration: 5,
      exercises: [ex],
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-20 text-[#F6F4FF]">
      {/* 1. STUDIO HEADER WITH UTILITY ACTIONS (Section 3 & 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#303348] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8066]" />
            <span className="text-xs font-mono font-bold text-[#FF8066] uppercase tracking-wider">
              PRACTICE STUDIO
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F6F4FF] tracking-tight mt-1">
            Guitar Practice Studio
          </h1>
          <p className="text-xs text-[#A9A8BA] mt-0.5">
            Practice what you've learned. Build technique. Improve timing. Get better.
          </p>
        </div>

        {/* Small Utility Actions (Section 3) */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setActiveUtility(activeUtility === 'tuner' ? 'none' : 'tuner')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all border ${
              activeUtility === 'tuner'
                ? 'bg-[#54D6C3] text-[#0D0E17] border-[#54D6C3] shadow-md shadow-[#54D6C3]/20'
                : 'bg-[#151725] border-[#303348] text-[#54D6C3] hover:border-[#54D6C3]'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Tuner</span>
          </button>

          <button
            onClick={() => setActiveUtility(activeUtility === 'metronome' ? 'none' : 'metronome')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all border ${
              activeUtility === 'metronome'
                ? 'bg-[#8067FF] text-white border-[#8067FF] shadow-md shadow-[#8067FF]/20'
                : 'bg-[#151725] border-[#303348] text-[#8067FF] hover:border-[#8067FF]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Metronome</span>
          </button>
        </div>
      </div>

      {/* UTILITY MODAL / DRAWER (Tuner or Metronome) */}
      {activeUtility === 'tuner' && (
        <div className="animate-in fade-in duration-150">
          <TunerTool onClose={() => setActiveUtility('none')} />
        </div>
      )}

      {activeUtility === 'metronome' && (
        <div className="animate-in fade-in duration-150">
          <MetronomeTool onClose={() => setActiveUtility('none')} />
        </div>
      )}

      {/* 2. PRIMARY NAVIGATION (Section 4: Quick Practice, My Skills, Speed Lab) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveTab('quick')}
          className={`px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'quick'
              ? 'bg-[#FF8066] text-[#0D0E17] shadow-lg shadow-[#FF8066]/20'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Quick Practice</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'skills'
              ? 'bg-[#8067FF] text-white shadow-lg shadow-[#8067FF]/20'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>My Skills</span>
        </button>

        <button
          onClick={() => setActiveTab('speed_lab')}
          className={`px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'speed_lab'
              ? 'bg-[#FF8066] text-[#0D0E17] shadow-lg shadow-[#FF8066]/20'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Speed Lab</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: QUICK PRACTICE (Section 8, 9, 10, 11)             */}
      {/* ======================================================== */}
      {activeTab === 'quick' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-150">
          {/* Duration Selector Bar */}
          <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#303348] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#F6F4FF]">Choose Available Practice Time</h3>
                <p className="text-xs text-[#A9A8BA]">
                  VIBEX dynamically generates your tailored routine based on completed skills and goals
                </p>
              </div>

              {/* Minute Options Chips */}
              <div className="flex items-center gap-2">
                {([5, 15, 30, 45, 60] as const).map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setQuickDuration(mins)}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                      quickDuration === mins
                        ? 'bg-[#FF8066] text-[#0D0E17] shadow-md'
                        : 'bg-[#0D0E17] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* PRE-SESSION BRIEFING START SCREEN (Section 11) */}
            <div className="p-5 rounded-2xl bg-[#0D0E17] border border-[#FF8066]/40 flex flex-col gap-4 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#303348] pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#FF8066]">
                    TODAY'S PRACTICE
                  </span>
                  <h3 className="text-lg font-black text-[#F6F4FF] mt-0.5">
                    {dynamicRoutine.title}
                  </h3>
                </div>
                <div className="text-xs font-mono text-[#54D6C3] font-bold">
                  Total Duration: {quickDuration} Minutes
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#151725] border border-[#303348]">
                  <span className="text-[#A9A8BA] block text-[10px] font-mono uppercase mb-0.5">
                    Today's Focus:
                  </span>
                  <span className="font-bold text-[#F6F4FF]">{dynamicRoutine.focus}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#151725] border border-[#303348]">
                  <span className="text-[#A9A8BA] block text-[10px] font-mono uppercase mb-0.5">
                    Target Goal:
                  </span>
                  <span className="font-bold text-[#54D6C3]">{dynamicRoutine.goal}</span>
                </div>
              </div>

              {/* Multi-phase Activity Breakdown */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-[10px] font-mono uppercase text-[#A9A8BA] font-bold">
                  Scheduled Activities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {dynamicRoutine.phases.map((phase, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#151725] border border-[#303348] flex flex-col justify-between gap-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#FF8066] font-bold">
                          {i + 1}. {phase.name}
                        </span>
                        <span className="text-[10px] font-mono text-[#54D6C3]">
                          {phase.minutes}m
                        </span>
                      </div>
                      <p className="text-[10px] text-[#A9A8BA] line-clamp-2">{phase.action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Practice Primary Button (Section 11) */}
              <button
                onClick={() =>
                  setActivePracticeSession({
                    title: dynamicRoutine.title,
                    duration: quickDuration,
                    exercises: dynamicRoutine.exercises,
                  })
                }
                className="w-full mt-2 py-3.5 rounded-xl bg-[#FF8066] hover:bg-[#ff6e50] text-[#0D0E17] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF8066]/20 transition-all hover:scale-[1.01]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Practice ({quickDuration} min)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: MY SKILLS (Section 5, 6, 7)                      */}
      {/* ======================================================== */}
      {activeTab === 'skills' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-150">
          <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#303348] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#F6F4FF]">My Skills</h3>
                <p className="text-xs text-[#A9A8BA]">
                  Practiceable skills unlocked through your learning progress in the curriculum
                </p>
              </div>
              <div className="text-xs font-mono text-[#54D6C3] font-bold">
                {practiceSkills.filter((s) => s.status !== 'NOT_LEARNED').length} of {practiceSkills.length} Learned
              </div>
            </div>

            {/* Skills Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {practiceSkills.map((skill) => {
                const badge = getStatusBadge(skill.status);
                const isUnlocked = skill.status !== 'NOT_LEARNED';

                return (
                  <div
                    key={skill.id}
                    className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all shadow-md ${
                      isUnlocked
                        ? 'bg-[#0D0E17] border-[#303348] hover:border-[#8067FF]'
                        : 'bg-[#0D0E17]/60 border-[#303348]/40 opacity-70'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1D2032] text-[#A9A8BA]">
                          {skill.category}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold"
                          style={{ color: badge.color, backgroundColor: badge.bg }}
                        >
                          {badge.label}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[#F6F4FF]">{skill.skillName}</h4>
                      <p className="text-xs text-[#A9A8BA] mt-1 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    {/* Metrics Section: Real data or Honest Conceptual display (Section 7) */}
                    <div className="border-t border-[#303348] pt-3 flex items-center justify-between text-xs">
                      {isUnlocked ? (
                        <>
                          <div className="font-mono text-[#A9A8BA] text-[11px]">
                            {skill.isSpeedBased && skill.bestBpm ? (
                              <span>Best: {skill.bestBpm} BPM</span>
                            ) : (
                              <span>Clarity Verified</span>
                            )}
                            {skill.practiceCount > 0 && (
                              <span className="ml-2 text-[#54D6C3]">({skill.practiceCount}x)</span>
                            )}
                          </div>

                          <button
                            onClick={() => handleLaunchSingleSkill(skill)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#8067FF] hover:bg-[#6952E6] text-white font-bold text-xs flex items-center gap-1 transition-all"
                          >
                            <span>Practice</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-[11px] text-[#A9A8BA] flex items-center gap-1">
                            <Lock className="w-3 h-3 text-[#A9A8BA]" />
                            <span>Locked in Learn</span>
                          </span>

                          <button
                            onClick={onNavigateToLearn}
                            className="px-3 py-1.5 rounded-lg bg-[#1D2032] hover:bg-[#303348] text-[#F6F4FF] text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <span>Open Learn</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: SPEED LAB (Section 21, 22, 23)                    */}
      {/* ======================================================== */}
      {activeTab === 'speed_lab' && (
        <div className="animate-in fade-in duration-150">
          <SpeedLabView onBack={() => setActiveTab('skills')} />
        </div>
      )}

      {/* ======================================================== */}
      {/* INTERACTIVE PRACTICE ENGINE RUNNER (Section 12 - 20)      */}
      {/* ======================================================== */}
      {activePracticeSession && (
        <InteractivePracticeSession
          routineTitle={activePracticeSession.title}
          totalDurationMinutes={activePracticeSession.duration}
          exercises={activePracticeSession.exercises}
          onClose={() => setActivePracticeSession(null)}
          onFinishSession={(minutes) => {
            setActivePracticeSession(null);
          }}
        />
      )}
    </div>
  );
};
