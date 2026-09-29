/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PracticeExerciseItem, PracticeVisualMode } from '../../types/guitarLessons';
import { VibexAudioEngine } from '../../services/audioEngine';
import { GuitarProgressService } from '../../services/guitarProgressService';
import { SpeechCoach } from '../../services/speechCoach';
import { MasterGuitarFretboard } from '../instruments/MasterGuitarFretboard';
import {
  Sparkles,
  Play,
  Pause,
  Volume2,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  X,
  Clock,
  Zap,
  Award,
  ChevronRight,
  Music,
  Check,
  AlertCircle,
} from 'lucide-react';

interface InteractivePracticeSessionProps {
  routineTitle: string;
  totalDurationMinutes: number;
  exercises: PracticeExerciseItem[];
  onClose: () => void;
  onFinishSession: (totalMinutes: number) => void;
}

type StepStage = 'explain' | 'demonstrate' | 'your_turn' | 'observe' | 'challenge' | 'result' | 'complete';

export const InteractivePracticeSession: React.FC<InteractivePracticeSessionProps> = ({
  routineTitle,
  totalDurationMinutes,
  exercises,
  onClose,
  onFinishSession,
}) => {
  const [currentExIndex, setCurrentExIndex] = useState<number>(0);
  const [stage, setStage] = useState<StepStage>('explain');

  // Exercise state
  const [demoSpeed, setDemoSpeed] = useState<'slow' | 'normal'>('slow');
  const [isMetronomeActive, setIsMetronomeActive] = useState<boolean>(false);
  const [exerciseBpm, setExerciseBpm] = useState<number>(50);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [cleanRoundsCount, setCleanRoundsCount] = useState<number>(0);
  const [testedStrings, setTestedStrings] = useState<Set<number>>(new Set());

  // Spider walk state
  const [spiderStep, setSpiderStep] = useState<number>(1); // 1, 2, 3, 4
  const [spiderString, setSpiderString] = useState<number>(6); // 6 down to 1

  const currentExercise = exercises[currentExIndex];
  const audioEngine = VibexAudioEngine.getInstance();
  const progressService = GuitarProgressService.getInstance();

  // Reset exercise state when exercise changes
  useEffect(() => {
    setStage('explain');
    setCleanRoundsCount(0);
    setTestedStrings(new Set());
    setSpiderStep(1);
    setSpiderString(6);
    if (currentExercise.targetTempo) {
      setExerciseBpm(currentExercise.targetTempo);
    }
  }, [currentExIndex]);

  // Clean up audio on exit
  useEffect(() => {
    return () => {
      audioEngine.stopMetronome();
    };
  }, []);

  // Voice mentor speech on stage changes
  useEffect(() => {
    if (!currentExercise) return;
    if (stage === 'explain') {
      SpeechCoach.speak(`${currentExercise.title}. ${currentExercise.why}`);
    } else if (stage === 'demonstrate') {
      SpeechCoach.speak(`Watch and listen closely to the motion.`);
    } else if (stage === 'your_turn') {
      SpeechCoach.speak(`Now it is your turn. Take your position on the guitar.`);
    } else if (stage === 'observe') {
      SpeechCoach.speak(`Observation check: Keep your wrist relaxed and fingers close to the fretboard.`);
    } else if (stage === 'challenge') {
      SpeechCoach.speak(`Challenge round: Complete 3 clean repetitions with the pulse.`);
    }
  }, [stage, currentExIndex]);

  // Metronome toggle
  const toggleMetronome = () => {
    if (isMetronomeActive) {
      audioEngine.stopMetronome();
      setIsMetronomeActive(false);
    } else {
      audioEngine.startMetronome(exerciseBpm, 'quarter', 'woodblock', (b) => {
        setCurrentBeat(b % 4);
      });
      setIsMetronomeActive(true);
    }
  };

  // Play audio notes for Spider Walk step
  const handleSpiderPluck = (finger: number) => {
    setSpiderStep(finger);
    const baseFreqs = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];
    const strIdx = 6 - spiderString;
    const freq = baseFreqs[strIdx] * Math.pow(2, finger / 12);
    audioEngine.playInstrumentNote('guitar', freq, 800);

    if (finger === 4) {
      setTimeout(() => {
        if (spiderString > 1) {
          setSpiderString((p) => p - 1);
          setSpiderStep(1);
        } else {
          setSpiderString(6);
          setSpiderStep(1);
          setCleanRoundsCount((p) => p + 1);
        }
      }, 400);
    }
  };

  // Complete current exercise
  const handleCompleteExercise = () => {
    if (currentExercise.skillId) {
      progressService.recordPracticeSkill(
        currentExercise.skillId,
        currentExercise.durationMinutes,
        exerciseBpm,
        cleanRoundsCount
      );
    } else {
      progressService.recordPracticeSession({
        exerciseName: currentExercise.title,
        category: (currentExercise.category as any) || 'Technique',
        durationMinutes: currentExercise.durationMinutes,
        bpm: exerciseBpm,
        cleanRepetitions: cleanRoundsCount,
      });
    }

    if (currentExIndex < exercises.length - 1) {
      setStage('result');
    } else {
      setStage('complete');
    }
  };

  if (!currentExercise && stage !== 'complete') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0E17] text-[#F6F4FF] flex flex-col justify-between overflow-y-auto selection:bg-[#FF8066]/30">
      {/* 1. TOP HEADER BAR */}
      <header className="w-full bg-[#151725] border-b border-[#303348] px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1D2032] border border-[#303348] hover:border-[#FF8066] text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit Practice</span>
          </button>
          <div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#FF8066]/20 text-[#FF8066] font-bold">
              {routineTitle}
            </span>
            <h1 className="text-sm sm:text-base font-bold text-[#F6F4FF] truncate max-w-[200px] sm:max-w-md">
              {stage === 'complete' ? 'Session Complete' : currentExercise.title}
            </h1>
          </div>
        </div>

        {/* Exercise Progress Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#A9A8BA]">
            <Clock className="w-3.5 h-3.5 text-[#54D6C3]" />
            <span>Activity {currentExIndex + 1} of {exercises.length}</span>
          </div>

          <div className="flex items-center gap-1">
            {exercises.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentExIndex
                    ? 'bg-[#FF8066] scale-125 shadow-[0_0_8px_#FF8066]'
                    : idx < currentExIndex
                    ? 'bg-[#54D6C3]'
                    : 'bg-[#303348]'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKBENCH STAGE */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col gap-6 justify-center">
        {/* STAGE: COMPLETE */}
        {stage === 'complete' ? (
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1D2032] via-[#151725] to-[#1D2032] border-2 border-[#45D483] flex flex-col items-center text-center gap-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#45D483]/20 border border-[#45D483] flex items-center justify-center text-[#45D483] shadow-[0_0_20px_rgba(69,212,131,0.3)]">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-[#45D483] uppercase tracking-wider">
                PRACTICE SESSION COMPLETED
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F6F4FF] mt-1">
                Outstanding Practice Work!
              </h2>
              <p className="text-xs sm:text-sm text-[#A9A8BA] max-w-lg mt-2 leading-relaxed">
                You logged {totalDurationMinutes} minutes of focused, teacher-guided guitar practice. Your technique repetitions and skill stats have been recorded to your profile.
              </p>
            </div>

            <div className="w-full max-w-md bg-[#0D0E17] border border-[#303348] rounded-2xl p-4 flex flex-col gap-2.5 text-left text-xs">
              <span className="text-[#A9A8BA] font-mono uppercase font-bold text-[10px]">
                Activities Mastered Today:
              </span>
              {exercises.map((ex, i) => (
                <div key={i} className="flex items-center justify-between text-[#F6F4FF]">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#45D483]" />
                    <span>{ex.title}</span>
                  </span>
                  <span className="font-mono text-[#54D6C3]">{ex.durationMinutes} min</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                onFinishSession(totalDurationMinutes);
                onClose();
              }}
              className="px-8 py-3.5 rounded-xl bg-[#45D483] hover:bg-[#3dbf75] text-[#0D0E17] font-extrabold text-xs shadow-lg shadow-[#45D483]/20 transition-all hover:scale-105"
            >
              Done & Save to Profile
            </button>
          </div>
        ) : (
          <>
            {/* EXERCISE HEADER CARD (WHY & WHAT) */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1D2032] to-[#151725] border border-[#303348] flex flex-col gap-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FF8066] uppercase tracking-wider">
                  {currentExercise.category} • Stage: {stage.toUpperCase().replace('_', ' ')}
                </span>
                <span className="text-xs font-mono text-[#A9A8BA]">
                  Target: {currentExercise.durationMinutes} Minutes
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#F6F4FF]">
                {currentExercise.title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348]">
                  <span className="font-bold text-[#FF8066] block mb-0.5">WHY THIS MATTERS:</span>
                  <p className="text-[#E2E1EC] leading-relaxed">{currentExercise.why}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348]">
                  <span className="font-bold text-[#54D6C3] block mb-0.5">WHAT TO DO:</span>
                  <p className="text-[#E2E1EC] leading-relaxed">{currentExercise.what}</p>
                </div>
              </div>
            </div>

            {/* STAGE 1: EXPLAIN */}
            {stage === 'explain' && (
              <div className="p-6 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col gap-4 shadow-lg animate-in fade-in duration-150">
                <h3 className="text-sm font-bold text-[#F6F4FF] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF8066]" />
                  <span>How to Perform This Exercise</span>
                </h3>
                <p className="text-xs text-[#E2E1EC] leading-relaxed">
                  {currentExercise.how}
                </p>

                <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] text-xs text-[#A9A8BA] flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-[#F4BB55] shrink-0 mt-0.5" />
                  <span>
                    Practice rule: Never rush. Clean clarity and proper knuckle arch always come before speed.
                  </span>
                </div>

                <button
                  onClick={() => setStage('demonstrate')}
                  className="self-end px-6 py-3 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                >
                  <span>Watch Demonstration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STAGE 2: DEMONSTRATE */}
            {stage === 'demonstrate' && (
              <div className="p-6 rounded-2xl bg-[#151725] border border-[#8067FF]/40 flex flex-col gap-4 shadow-lg animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-[#303348] pb-3">
                  <span className="text-xs font-bold text-[#8067FF] flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    <span>VISUAL & AUDIO DEMONSTRATION</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setDemoSpeed('slow')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                        demoSpeed === 'slow' ? 'bg-[#54D6C3] text-[#0D0E17]' : 'bg-[#0D0E17] text-[#A9A8BA]'
                      }`}
                    >
                      Slow (40 BPM)
                    </button>
                    <button
                      onClick={() => setDemoSpeed('normal')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                        demoSpeed === 'normal' ? 'bg-[#FF8066] text-[#0D0E17]' : 'bg-[#0D0E17] text-[#A9A8BA]'
                      }`}
                    >
                      Normal (60 BPM)
                    </button>
                  </div>
                </div>

                {/* Demonstration Visual based on VisualMode */}
                {currentExercise.visualMode === 'RHYTHM_GRID' ? (
                  <div className="grid grid-cols-5 gap-2 my-2">
                    {['D', 'D', 'U', 'U', 'D'].map((s, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#0D0E17] border border-[#FF8066]/40 text-center flex flex-col items-center gap-1"
                      >
                        <span className="text-xl font-black font-mono text-[#FF8066]">
                          {s === 'D' ? '↓' : '↑'}
                        </span>
                        <span className="text-[10px] font-mono text-[#A9A8BA]">
                          {s === 'D' ? 'Down' : 'Up'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : currentExercise.visualMode === 'CHORD_DIAGRAM' ? (
                  <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#FF8066] font-bold text-sm">Shape: X 3 2 0 1 0</span>
                    <span className="text-[#54D6C3]">Finger 1 (Str 2 F1) • Finger 2 (Str 4 F2) • Finger 3 (Str 5 F3)</span>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#54D6C3] font-bold">Sequence: 1 → 2 → 3 → 4</span>
                    <span className="text-[#A9A8BA]">Index (F1) → Middle (F2) → Ring (F3) → Pinky (F4)</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      const freqs = [82.41, 87.31, 92.5, 98.0];
                      freqs.forEach((f, i) => {
                        setTimeout(() => audioEngine.playInstrumentNote('guitar', f, 600), i * (demoSpeed === 'slow' ? 350 : 220));
                      });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0D0E17] border border-[#303348] hover:border-[#54D6C3] text-xs font-bold text-[#54D6C3] flex items-center gap-2 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Audio Demonstration</span>
                  </button>

                  <button
                    onClick={() => setStage('your_turn')}
                    className="px-6 py-2.5 rounded-xl bg-[#FF8066] hover:bg-[#ff6e50] text-[#0D0E17] font-extrabold text-xs flex items-center gap-2 shadow-md transition-all"
                  >
                    <span>I'm Ready to Try</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 3: YOUR TURN (INTERACTIVE PRACTICE) */}
            {stage === 'your_turn' && (
              <div className="p-6 rounded-2xl bg-[#151725] border border-[#54D6C3]/40 flex flex-col gap-5 shadow-lg animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-[#303348] pb-3">
                  <div>
                    <span className="text-xs font-bold text-[#54D6C3] flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>YOUR TURN: PERFORM EXERCISE</span>
                    </span>
                    <p className="text-xs text-[#A9A8BA] mt-0.5">
                      Follow the prompts and perform with relaxed hand ergonomics.
                    </p>
                  </div>

                  {/* Metronome quick toggle */}
                  <button
                    onClick={toggleMetronome}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-colors ${
                      isMetronomeActive
                        ? 'bg-[#F06B78] text-white'
                        : 'bg-[#0D0E17] border border-[#303348] text-[#54D6C3]'
                    }`}
                  >
                    <Music className="w-3.5 h-3.5" />
                    <span>{isMetronomeActive ? `Metronome: ${exerciseBpm} BPM` : 'Enable Metronome'}</span>
                  </button>
                </div>

                {/* SPIDER WALK INTERACTIVE WORKBENCH */}
                {currentExercise.id === 'spider_walk' && (
                  <div className="p-5 rounded-2xl bg-[#0D0E17] border border-[#303348] flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#F6F4FF]">
                        Current Target: <span className="text-[#FF8066]">String {spiderString}</span>
                      </span>
                      <span className="font-mono text-[#54D6C3]">
                        {cleanRoundsCount} Full Round(s) Completed
                      </span>
                    </div>

                    {/* 4 Fingers Clickable Tracker */}
                    <div className="grid grid-cols-4 gap-3">
                      {[1, 2, 3, 4].map((f) => {
                        const isCurrentFret = spiderStep === f;
                        return (
                          <button
                            key={f}
                            onClick={() => handleSpiderPluck(f)}
                            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                              isCurrentFret
                                ? 'bg-[#FF8066] text-[#0D0E17] border-[#FAF6EE] shadow-[0_0_12px_#FF8066] scale-105'
                                : 'bg-[#151725] border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
                            }`}
                          >
                            <span className="text-[10px] font-mono uppercase font-bold">Fret {f}</span>
                            <span className="text-base font-black">
                              {f === 1 ? 'Index' : f === 2 ? 'Middle' : f === 3 ? 'Ring' : 'Pinky'}
                            </span>
                            <span className="text-[9px] font-mono mt-0.5">
                              {isCurrentFret ? 'Active Press' : `Finger ${f}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* CHORD / CLARITY INTERACTIVE WORKBENCH */}
                {currentExercise.category === 'Chords' && (
                  <div className="p-5 rounded-2xl bg-[#0D0E17] border border-[#303348] flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#F6F4FF]">String Clarity Check:</span>
                      <span className="font-mono text-[#54D6C3]">{testedStrings.size} of 5 strings tested</span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 text-center">
                      {[
                        { num: 5, note: 'C3 (Fret 3)', freq: 130.81 },
                        { num: 4, note: 'E3 (Fret 2)', freq: 164.81 },
                        { num: 3, note: 'G3 (Open)', freq: 196.0 },
                        { num: 2, note: 'C4 (Fret 1)', freq: 261.63 },
                        { num: 1, note: 'E4 (Open)', freq: 329.63 },
                      ].map((item) => (
                        <button
                          key={item.num}
                          onClick={() => {
                            audioEngine.playInstrumentNote('guitar', item.freq, 1000);
                            setTestedStrings((p) => new Set(p).add(item.num));
                          }}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                            testedStrings.has(item.num)
                              ? 'bg-[#12241C] border-[#45D483] text-[#45D483]'
                              : 'bg-[#151725] border-[#303348] text-[#F6F4FF]'
                          }`}
                        >
                          <span className="text-[10px] text-[#A9A8BA]">Str {item.num}</span>
                          <span className="text-xs font-bold font-mono mt-0.5">{item.note}</span>
                          <span className="text-[9px] mt-1 font-mono">
                            {testedStrings.has(item.num) ? '✓ Pure' : 'Pluck'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* RHYTHM STRUMMING WORKBENCH */}
                {currentExercise.category === 'Rhythm' && (
                  <div className="p-5 rounded-2xl bg-[#0D0E17] border border-[#303348] flex flex-col gap-3">
                    <span className="text-xs font-mono text-[#A9A8BA]">FOLLOW THE PENDULUM PULSE:</span>
                    <div className="grid grid-cols-5 gap-2 text-center font-mono">
                      {['1 (↓)', '2 (↓)', '& (↑)', '& (↑)', '4 (↓)'].map((beat, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-[#151725] border border-[#303348] text-[#F6F4FF] font-bold text-xs"
                        >
                          {beat}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[#A9A8BA]">
                    Take your time. Play smoothly before advancing.
                  </span>

                  <button
                    onClick={() => setStage('observe')}
                    className="px-6 py-2.5 rounded-xl bg-[#54D6C3] hover:bg-[#45c2b0] text-[#0D0E17] font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>Check Hand Observation</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 4: OBSERVE & FEEDBACK */}
            {stage === 'observe' && (
              <div className="p-6 rounded-2xl bg-[#151725] border border-[#FF8066]/40 flex flex-col gap-4 shadow-lg animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FF8066]">
                  <Sparkles className="w-4 h-4" />
                  <span>VIBE TEACHER OBSERVATION</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] flex flex-col gap-2">
                  <h4 className="text-sm font-bold text-[#F6F4FF]">Single Actionable Correction:</h4>
                  <p className="text-xs text-[#E2E1EC] leading-relaxed">
                    {currentExercise.category === 'Chords'
                      ? 'Arch finger 1 higher so it does not brush against the open High E string. Keep your thumb centered behind the neck.'
                      : currentExercise.category === 'Rhythm'
                      ? 'Relax your strumming wrist. Let it swing like a loose pendulum instead of stiffening from the elbow.'
                      : 'Keep fingers 1, 2, 3 hover-close to the frets when finger 4 presses down. Do not let your fingers fly away from the neck.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setStage('your_turn')}
                    className="px-4 py-2 rounded-xl bg-[#0D0E17] border border-[#303348] text-xs font-bold text-[#A9A8BA] hover:text-[#F6F4FF]"
                  >
                    Retry Practice Attempt
                  </button>

                  <button
                    onClick={() => setStage('challenge')}
                    className="px-6 py-2.5 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all"
                  >
                    <span>Understood — Enter Challenge</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 5: CONTROLLED REPETITION CHALLENGE */}
            {stage === 'challenge' && (
              <div className="p-6 rounded-2xl bg-[#151725] border border-[#54D6C3]/40 flex flex-col gap-5 shadow-lg animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-[#303348] pb-3">
                  <div>
                    <h3 className="text-base font-bold text-[#F6F4FF]">Controlled Practice Challenge</h3>
                    <p className="text-xs text-[#A9A8BA]">
                      Complete 3 clean rounds at {exerciseBpm} BPM.
                    </p>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#54D6C3]">
                    {cleanRoundsCount} / 3 Rounds Complete
                  </span>
                </div>

                {/* 3-Round Tracker Badges */}
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((r) => {
                    const isDone = cleanRoundsCount >= r;
                    return (
                      <div
                        key={r}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-1 transition-all ${
                          isDone
                            ? 'bg-[#12241C] border-[#45D483] text-[#45D483]'
                            : 'bg-[#0D0E17] border-[#303348] text-[#A9A8BA]'
                        }`}
                      >
                        <span className="text-[10px] font-mono uppercase font-bold">Round {r}</span>
                        <span className="text-xs font-bold text-[#F6F4FF]">
                          {isDone ? '✓ Clean Round' : 'In Progress'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      const next = cleanRoundsCount + 1;
                      setCleanRoundsCount(next);
                      if (next === 1) SpeechCoach.speak('Round 1 clean! Keep that same smooth motion.');
                      else if (next === 2) SpeechCoach.speak('Round 2 locked in! One more.');
                      else if (next >= 3) SpeechCoach.speak('Outstanding! 3 clean rounds completed.');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#54D6C3] hover:bg-[#43bfac] text-[#0D0E17] font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>+ Log 1 Clean Round (Manual)</span>
                  </button>

                  <button
                    onClick={handleCompleteExercise}
                    disabled={cleanRoundsCount < 3}
                    className="px-6 py-2.5 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] disabled:opacity-40 text-white font-extrabold text-xs flex items-center gap-2 transition-all shadow-lg"
                  >
                    <span>Finish Exercise →</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 6: RESULT OF EXERCISE (INTERMEDIATE) */}
            {stage === 'result' && (
              <div className="p-6 rounded-2xl bg-[#151725] border border-[#45D483]/40 flex flex-col gap-4 shadow-xl animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-xs font-bold text-[#45D483]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>ACTIVITY COMPLETED</span>
                </div>

                <h3 className="text-xl font-bold text-[#F6F4FF]">
                  {currentExercise.title} Finished!
                </h3>
                <p className="text-xs text-[#A9A8BA]">
                  {cleanRoundsCount} clean rounds completed. Data saved to your practice stats.
                </p>

                <div className="pt-3 border-t border-[#303348] flex items-center justify-between">
                  <span className="text-xs text-[#A9A8BA]">
                    Next up: <span className="text-[#F6F4FF] font-bold">{exercises[currentExIndex + 1]?.title}</span>
                  </span>

                  <button
                    onClick={() => {
                      setCurrentExIndex((p) => p + 1);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#FF8066] hover:bg-[#ff6e50] text-[#0D0E17] font-extrabold text-xs flex items-center gap-2 shadow-md transition-all"
                  >
                    <span>Start Next Activity</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};
