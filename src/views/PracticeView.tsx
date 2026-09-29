/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GuitarProgressService } from '../services/guitarProgressService';
import { CompletedSkillRecord } from '../types/guitarLessons';
import { SpeedLabView } from '../components/practice/SpeedLabView';
import { MetronomeTool } from '../components/practice/MetronomeTool';
import { TunerTool } from '../components/practice/TunerTool';
import { RecorderTool } from '../components/practice/RecorderTool';
import { MasterGuitarFretboard } from '../components/instruments/MasterGuitarFretboard';
import { VibexAudioEngine } from '../services/audioEngine';
import {
  Zap,
  Gauge,
  Sparkles,
  Trophy,
  Activity,
  Layers,
  Clock,
  Mic,
  Music,
  Play,
  Pause,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Radio,
  BookOpen,
  Volume2,
  ChevronRight,
} from 'lucide-react';

interface PracticeViewProps {
  onNavigateToLearn: () => void;
  onNavigateToSongs: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  onNavigateToLearn,
  onNavigateToSongs,
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'skills' | 'speed_lab' | 'tools' | 'free_play' | 'coached'>('quick');
  const [activeTool, setActiveTool] = useState<'metronome' | 'tuner' | 'recorder' | 'backing_track'>('metronome');

  // Quick Practice Duration Selector (5, 15, 30, 45, 60 min)
  const [quickDuration, setQuickDuration] = useState<5 | 15 | 30 | 45 | 60>(15);
  const [isQuickRoutineActive, setIsQuickRoutineActive] = useState<boolean>(false);
  const [activeQuickPhaseIdx, setActiveQuickPhaseIdx] = useState<number>(0);

  // Backing Track State
  const [isPlayingBacking, setIsPlayingBacking] = useState<boolean>(false);
  const [backingBpm, setBackingBpm] = useState<number>(85);
  const [backingStyle, setBackingStyle] = useState<'blues' | 'acoustic' | 'rock'>('acoustic');

  const progressService = GuitarProgressService.getInstance();
  const completedSkills = progressService.getCompletedSkills();
  const audioEngine = VibexAudioEngine.getInstance();

  // Quick practice routine schedules based on duration
  const quickRoutines: Record<number, { title: string; phases: { name: string; minutes: number; action: string }[] }> = {
    5: {
      title: '5 MIN QUICK WARMUP',
      phases: [
        { name: 'Warm-up & Tuning', minutes: 1, action: 'Check tuning with the studio tuner' },
        { name: 'Spider Walk (1-2-3-4)', minutes: 2, action: 'Clean fretting at 50 BPM' },
        { name: 'Open Chord Strum', minutes: 2, action: 'Clean ringing of C Major or Em' },
      ],
    },
    15: {
      title: '15 MIN QUICK PRACTICE',
      phases: [
        { name: 'Warm-up & Tuning', minutes: 2, action: 'Tune all 6 strings and stretch fingers' },
        { name: 'Spider Walk', minutes: 4, action: 'Finger independence across strings 6 to 1' },
        { name: 'Chord Switching', minutes: 4, action: 'C → G transition speed drill' },
        { name: 'Strumming Rhythm', minutes: 3, action: 'Down-Down-Up-Up-Down folk pulse' },
        { name: 'Free Play', minutes: 2, action: 'Explore chords and notes with metronome' },
      ],
    },
    30: {
      title: '30 MIN DEEP PRACTICE',
      phases: [
        { name: 'Tuning & Chromatic Warmup', minutes: 4, action: 'Tuner check + 1-2-3-4 spider walk' },
        { name: 'Technique & Finger Independence', minutes: 7, action: 'Reverse spider and string skipping' },
        { name: 'Chord Voicings & Clarity', minutes: 8, action: 'C Major, G Major, Em, D Major clear ringing' },
        { name: 'Speed Lab Transitions', minutes: 6, action: '30-second chord change sprints' },
        { name: 'Song Application & Jam', minutes: 5, action: 'Play Knockin on Heavens Door arrangement' },
      ],
    },
    45: {
      title: '45 MIN EXTENDED WORKOUT',
      phases: [
        { name: 'Tuning & Ergonomics', minutes: 5, action: 'Posture check + chromatic warm-up' },
        { name: 'Finger Independence & Picking', minutes: 10, action: 'Alternate picking on Spider Walk' },
        { name: 'Chord Switching & Speed Lab', minutes: 12, action: 'C → G, G → D, Em → C transitions' },
        { name: 'Rhythm & Metronome Subdivisions', minutes: 10, action: 'Quarter and 8th-note strumming' },
        { name: 'Song Repertoire Jam', minutes: 8, action: 'Full song accompanying backing track' },
      ],
    },
    60: {
      title: '60 MIN MASTER STUDIO SESSION',
      phases: [
        { name: 'Tuning, Warmup & Stretching', minutes: 8, action: 'Full instrument prep' },
        { name: 'Technique Lab', minutes: 15, action: 'Spider walk, string skips, dexterity' },
        { name: 'Harmony & Open Chords', minutes: 15, action: 'Voicing clarity and transitions' },
        { name: 'Speed Lab & Metronome Challenge', minutes: 12, action: 'Pushing BPM thresholds' },
        { name: 'Song Application & Free Play', minutes: 10, action: 'Musical exploration & recording take' },
      ],
    },
  };

  const currentRoutine = quickRoutines[quickDuration];

  // Handle Backing Track Play/Stop
  const toggleBackingTrack = () => {
    if (isPlayingBacking) {
      audioEngine.stopMetronome();
      setIsPlayingBacking(false);
    } else {
      audioEngine.startMetronome(backingBpm, 'eighth', 'woodblock');
      setIsPlayingBacking(true);
    }
  };

  const handleStartQuickPractice = () => {
    setIsQuickRoutineActive(true);
    setActiveQuickPhaseIdx(0);
    progressService.recordPracticeSession({
      exerciseName: `${quickDuration}-Min Quick Practice Routine`,
      category: 'Technique',
      durationMinutes: quickDuration,
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-20 text-[#F6F4FF]">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#303348] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8066]" />
            <span className="text-xs font-mono font-bold text-[#FF8066] uppercase tracking-wider">
              GUITAR PRACTICE STUDIO
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F6F4FF] tracking-tight mt-1">
            Guitar Practice Studio
          </h1>
          <p className="text-xs text-[#A9A8BA] mt-0.5">
            What do you want to practice right now? Choose a quick session, Speed Lab, or studio tool.
          </p>
        </div>

        {/* Coached Practice Button */}
        <button
          onClick={() => setActiveTab('coached')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8066] to-[#E889A5] hover:brightness-110 text-[#0D0E17] font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#FF8066]/20 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>Vibe Coached Session</span>
        </button>
      </div>

      {/* Main Studio Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveTab('quick')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'quick'
              ? 'bg-[#FF8066] text-[#0D0E17] shadow-md'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Quick Practice</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'skills'
              ? 'bg-[#8067FF] text-[#F6F4FF] shadow-md shadow-[#8067FF]/20'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Completed Skills ({completedSkills.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('speed_lab')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'speed_lab'
              ? 'bg-[#FF8066] text-[#0D0E17] shadow-md'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Speed Lab</span>
        </button>

        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'tools'
              ? 'bg-[#8067FF] text-[#F6F4FF] shadow-md'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Studio Tools</span>
        </button>

        <button
          onClick={() => setActiveTab('free_play')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'free_play'
              ? 'bg-[#54D6C3] text-[#0D0E17] shadow-md'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Free Play Lab</span>
        </button>
      </div>

      {/* TAB 0: QUICK PRACTICE (Section 17 & 18) */}
      {activeTab === 'quick' && (
        <div className="flex flex-col gap-6">
          {/* Duration Chips Selector */}
          <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#303348] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#F6F4FF]">Structured Quick Practice Routine</h3>
                <p className="text-xs text-[#A9A8BA]">Select your available practice duration for today</p>
              </div>

              {/* Minute buttons */}
              <div className="flex items-center gap-2">
                {([5, 15, 30, 45, 60] as const).map((mins) => (
                  <button
                    key={mins}
                    onClick={() => {
                      setQuickDuration(mins);
                      setIsQuickRoutineActive(false);
                    }}
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

            {/* Routine Schedule Breakdown */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#FF8066] font-bold">{currentRoutine.title}</span>
                <span className="text-[#A9A8BA]">Total: {quickDuration} minutes</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {currentRoutine.phases.map((phase, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 transition-all ${
                      isQuickRoutineActive && activeQuickPhaseIdx === i
                        ? 'bg-[#1D2032] border-[#FF8066] shadow-[0_0_10px_rgba(255,128,102,0.2)]'
                        : 'bg-[#0D0E17] border-[#303348]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#FF8066]">
                          Phase {i + 1}
                        </span>
                        <span className="text-[10px] font-mono text-[#54D6C3] font-bold">
                          {phase.minutes} min
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[#F6F4FF] mt-1">{phase.name}</h4>
                    </div>
                    <p className="text-[10px] text-[#A9A8BA] leading-relaxed">{phase.action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Quick Practice Button */}
            {!isQuickRoutineActive ? (
              <button
                onClick={handleStartQuickPractice}
                className="w-full py-3.5 rounded-xl bg-[#FF8066] hover:bg-[#ff6e50] text-[#0D0E17] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF8066]/20 transition-all hover:scale-[1.01]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start {quickDuration}-Minute Practice Routine</span>
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#FF8066] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#FF8066] animate-pulse" />
                  <div>
                    <span className="text-xs font-bold text-[#F6F4FF]">
                      Active: Phase {activeQuickPhaseIdx + 1} — {currentRoutine.phases[activeQuickPhaseIdx].name}
                    </span>
                    <span className="text-[11px] text-[#A9A8BA] block">
                      {currentRoutine.phases[activeQuickPhaseIdx].action}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (activeQuickPhaseIdx < currentRoutine.phases.length - 1) {
                        setActiveQuickPhaseIdx((p) => p + 1);
                      } else {
                        setIsQuickRoutineActive(false);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-[#FF8066] text-[#0D0E17] font-bold text-xs"
                  >
                    {activeQuickPhaseIdx === currentRoutine.phases.length - 1 ? 'Finish Routine' : 'Next Phase →'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* General Available Practice Activities (Section 3.B) */}
          <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#303348] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#F6F4FF]">Available Practice Activities</h3>
                <p className="text-xs text-[#A9A8BA]">Always accessible practice modules for technique and rhythm</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Technique - Spider Walk */}
              <div
                onClick={() => setActiveTab('speed_lab')}
                className="p-4 rounded-2xl bg-[#0D0E17] border border-[#303348] hover:border-[#FF8066] cursor-pointer flex flex-col justify-between gap-3 transition-colors group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1D2032] text-[#FF8066] font-bold">
                    Technique
                  </span>
                  <h4 className="text-sm font-bold text-[#F6F4FF] mt-2 group-hover:text-[#FF8066] transition-colors">
                    Spider Walk (1-2-3-4)
                  </h4>
                  <p className="text-xs text-[#A9A8BA] mt-1 leading-relaxed">
                    Chromatic finger independence drill across frets 1 to 4 on all 6 strings.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#FF8066] flex items-center gap-1">
                  <span>Start Drill</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Chords - Open Chord Practice */}
              <div
                onClick={() => setActiveTab('skills')}
                className="p-4 rounded-2xl bg-[#0D0E17] border border-[#303348] hover:border-[#8067FF] cursor-pointer flex flex-col justify-between gap-3 transition-colors group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1D2032] text-[#8067FF] font-bold">
                    Chords
                  </span>
                  <h4 className="text-sm font-bold text-[#F6F4FF] mt-2 group-hover:text-[#8067FF] transition-colors">
                    Open Chord Practice
                  </h4>
                  <p className="text-xs text-[#A9A8BA] mt-1 leading-relaxed">
                    Test individual string clarity and fret placement for C Major, Em, and G.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#8067FF] flex items-center gap-1">
                  <span>Practice Chords</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Rhythm - Strumming Practice */}
              <div
                onClick={() => {
                  setActiveTab('tools');
                  setActiveTool('backing_track');
                }}
                className="p-4 rounded-2xl bg-[#0D0E17] border border-[#303348] hover:border-[#54D6C3] cursor-pointer flex flex-col justify-between gap-3 transition-colors group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1D2032] text-[#54D6C3] font-bold">
                    Rhythm
                  </span>
                  <h4 className="text-sm font-bold text-[#F6F4FF] mt-2 group-hover:text-[#54D6C3] transition-colors">
                    Strumming Practice
                  </h4>
                  <p className="text-xs text-[#A9A8BA] mt-1 leading-relaxed">
                    Down-Down-Up-Up-Down-Up rhythm pulse synchronization with audio tracks.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#54D6C3] flex items-center gap-1">
                  <span>Launch Rhythm</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Speed - Speed Lab */}
              <div
                onClick={() => setActiveTab('speed_lab')}
                className="p-4 rounded-2xl bg-[#0D0E17] border border-[#303348] hover:border-[#F4BB55] cursor-pointer flex flex-col justify-between gap-3 transition-colors group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1D2032] text-[#F4BB55] font-bold">
                    Speed
                  </span>
                  <h4 className="text-sm font-bold text-[#F6F4FF] mt-2 group-hover:text-[#F4BB55] transition-colors">
                    Speed Lab Sprint
                  </h4>
                  <p className="text-xs text-[#A9A8BA] mt-1 leading-relaxed">
                    Measure your 30-second clean chord change speed with target BPM thresholds.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#F4BB55] flex items-center gap-1">
                  <span>Open Speed Lab</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: COMPLETED SKILLS (Section 3.B & 19) */}
      {activeTab === 'skills' && (
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#303348] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#F6F4FF]">Completed Skills</h3>
                <p className="text-xs text-[#A9A8BA]">
                  Skills unlocked through completed lessons in the structured curriculum
                </p>
              </div>
              <span className="text-xs font-mono text-[#54D6C3] font-bold">
                {completedSkills.length} Unlocked
              </span>
            </div>

            {completedSkills.length === 0 ? (
              <div className="py-6 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8067FF]/20 border border-[#8067FF] flex items-center justify-center text-[#8067FF]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="max-w-md">
                  <h4 className="text-sm font-bold text-[#F6F4FF]">No completed skills yet.</h4>
                  <p className="text-xs text-[#A9A8BA] mt-1 leading-relaxed">
                    Complete lessons in the curriculum (such as C Major) to add personalized practice skills. In the meantime, use the Quick Practice and Speed Lab drills above!
                  </p>
                </div>
                <button
                  onClick={onNavigateToLearn}
                  className="px-5 py-2.5 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-bold text-xs flex items-center gap-2 transition-all mt-1"
                >
                  <span>Go to Learn Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-5 rounded-2xl bg-[#0D0E17] border border-[#303348] flex flex-col justify-between gap-4 shadow-lg hover:border-[#8067FF]/60 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1D2032] text-[#54D6C3] uppercase">
                          {skill.category}
                        </span>
                        <h3 className="text-base font-bold text-[#F6F4FF] mt-1.5">
                          {skill.skillName}
                        </h3>
                      </div>
                      {skill.isMastered && (
                        <span className="px-2 py-0.5 rounded-full bg-[#45D483]/20 border border-[#45D483] text-[#45D483] text-[10px] font-bold">
                          Mastered
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-[#A9A8BA] border-t border-[#303348] pt-3">
                      <span>Best: {skill.bestBpm} BPM</span>
                      <span>Practiced: {skill.practiceCount}x</span>
                    </div>

                    {/* Practice Options */}
                    <div className="grid grid-cols-3 gap-1.5 text-xs font-bold text-center">
                      <button
                        onClick={() => progressService.recordSkillPractice(skill.skillName, 50, 92)}
                        className="py-1.5 rounded-lg bg-[#151725] hover:bg-[#1D2032] text-[#A9A8BA] hover:text-[#F6F4FF] border border-[#303348]"
                      >
                        Slow (50)
                      </button>
                      <button
                        onClick={() => progressService.recordSkillPractice(skill.skillName, 70, 94)}
                        className="py-1.5 rounded-lg bg-[#151725] hover:bg-[#1D2032] text-[#54D6C3] border border-[#303348]"
                      >
                        Normal (70)
                      </button>
                      <button
                        onClick={() => progressService.recordSkillPractice(skill.skillName, 90, 90)}
                        className="py-1.5 rounded-lg bg-[#151725] hover:bg-[#1D2032] text-[#FF8066] border border-[#303348]"
                      >
                        Speed (90)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}


      {/* TAB 2: SPEED LAB */}
      {activeTab === 'speed_lab' && (
        <SpeedLabView onBack={() => setActiveTab('skills')} />
      )}

      {/* TAB 3: TOOLS (Metronome, Tuner, Recorder, Backing Tracks) */}
      {activeTab === 'tools' && (
        <div className="flex flex-col gap-6">
          {/* Sub-tools Picker */}
          <div className="flex items-center gap-2 border-b border-[#303348] pb-3 text-xs">
            <button
              onClick={() => setActiveTool('metronome')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTool === 'metronome'
                  ? 'bg-[#8067FF] text-[#F6F4FF]'
                  : 'bg-[#151725] text-[#A9A8BA] hover:text-[#F6F4FF]'
              }`}
            >
              Metronome
            </button>
            <button
              onClick={() => setActiveTool('tuner')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTool === 'tuner'
                  ? 'bg-[#54D6C3] text-[#0D0E17]'
                  : 'bg-[#151725] text-[#A9A8BA] hover:text-[#F6F4FF]'
              }`}
            >
              Guitar Tuner
            </button>
            <button
              onClick={() => setActiveTool('recorder')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTool === 'recorder'
                  ? 'bg-[#F06B78] text-white'
                  : 'bg-[#151725] text-[#A9A8BA] hover:text-[#F6F4FF]'
              }`}
            >
              Take Recorder
            </button>
            <button
              onClick={() => setActiveTool('backing_track')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTool === 'backing_track'
                  ? 'bg-[#FF8066] text-[#0D0E17]'
                  : 'bg-[#151725] text-[#A9A8BA] hover:text-[#F6F4FF]'
              }`}
            >
              Backing Tracks
            </button>
          </div>

          {activeTool === 'metronome' && <MetronomeTool />}
          {activeTool === 'tuner' && <TunerTool />}
          {activeTool === 'recorder' && <RecorderTool />}

          {/* BACKING TRACKS TOOL */}
          {activeTool === 'backing_track' && (
            <div className="p-6 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-[#303348] pb-3">
                <div>
                  <h3 className="text-base font-bold text-[#F6F4FF]">Rhythm Backing Tracks</h3>
                  <p className="text-xs text-[#A9A8BA]">Jam along to continuous acoustic and blues rhythm grooves</p>
                </div>

                <div className="flex items-center gap-2">
                  {(['acoustic', 'blues', 'rock'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setBackingStyle(st)}
                      className={`px-3 py-1 rounded-lg text-xs capitalize font-bold ${
                        backingStyle === st ? 'bg-[#FF8066] text-[#0D0E17]' : 'bg-[#0D0E17] text-[#A9A8BA]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-[#0D0E17] border border-[#303348]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleBackingTrack}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white transition-all ${
                      isPlayingBacking ? 'bg-[#F06B78]' : 'bg-[#54D6C3] text-[#0D0E17]'
                    }`}
                  >
                    {isPlayingBacking ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>
                  <div>
                    <span className="text-sm font-bold text-[#F6F4FF] capitalize">
                      {backingStyle} Rhythm Groove ({backingBpm} BPM)
                    </span>
                    <span className="text-xs text-[#A9A8BA] block">
                      {backingStyle === 'acoustic' ? 'Chords: G - D - Am - C' : backingStyle === 'blues' ? '12-Bar Blues in E' : 'Rock Drive in A Minor'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-[#A9A8BA]">Tempo:</span>
                  <input
                    type="range"
                    min={60}
                    max={140}
                    value={backingBpm}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      setBackingBpm(v);
                      if (isPlayingBacking) {
                        audioEngine.startMetronome(v, 'eighth', 'woodblock');
                      }
                    }}
                    className="w-32 h-1.5 bg-[#1D2032] rounded-lg appearance-none cursor-pointer accent-[#FF8066]"
                  />
                  <span className="text-[#FF8066] font-bold w-12">{backingBpm} BPM</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: FREE PLAY LAB */}
      {activeTab === 'free_play' && (
        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-[#151725] border border-[#303348]">
          <div className="flex items-center justify-between border-b border-[#303348] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#F6F4FF]">Free Play Fretboard Lab</h3>
              <p className="text-xs text-[#A9A8BA]">
                Pluck any string or fret to explore notes, discover chords, and experiment freely
              </p>
            </div>
          </div>
          <MasterGuitarFretboard interactive={true} />
        </div>
      )}

      {/* TAB 5: VIBE COACHED SESSION */}
      {activeTab === 'coached' && (
        <div className="p-6 rounded-2xl bg-[#151725] border border-[#FF8066]/40 flex flex-col gap-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#303348] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FF8066]/20 border border-[#FF8066] flex items-center justify-center text-[#FF8066]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F6F4FF]">Vibe Coached Practice Routine</h3>
                <p className="text-xs text-[#A9A8BA]">Guided 5-phase structured practice workout</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('skills')}
              className="text-xs text-[#A9A8BA] hover:text-[#F6F4FF]"
            >
              Back to Studio
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F6F4FF]">1. Warm-Up: 3 min Spider Walk (1-2-3-4)</span>
              <span className="text-[#54D6C3] font-mono">50 BPM</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F6F4FF]">2. Precision: 5 min C → G Transitions</span>
              <span className="text-[#FF8066] font-mono">30s Sprint</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F6F4FF]">3. Rhythm: 5 min D-D-U-U-D Folk Strumming</span>
              <span className="text-[#8067FF] font-mono">65 BPM</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F6F4FF]">4. Song: 5 min Knockin on Heavens Door</span>
              <span className="text-[#F4BB55] font-mono">Full Loop</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F6F4FF]">5. Cool-Down: Free Play & Ear Check</span>
              <span className="text-[#A9A8BA] font-mono">2 min</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('speed_lab')}
            className="w-full py-3 rounded-xl bg-[#FF8066] hover:bg-[#ff6e50] text-[#0D0E17] font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Start Phase 1: Spider Walk in Speed Lab</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
