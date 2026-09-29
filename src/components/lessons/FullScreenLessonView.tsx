/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GuitarLesson, LessonStepItem } from '../../types/guitarLessons';
import { GuitarProgressService } from '../../services/guitarProgressService';
import { VibexAudioEngine } from '../../services/audioEngine';
import { SpeechCoach } from '../../services/speechCoach';
import { MasterGuitarFretboard } from '../instruments/MasterGuitarFretboard';
import {
  ArrowLeft,
  Volume2,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  X,
  ChevronRight,
  Award,
  AlertCircle,
  Music,
  Check,
  Zap,
} from 'lucide-react';

interface FullScreenLessonViewProps {
  lesson: GuitarLesson;
  onClose: () => void;
  onLessonCompleted: (lessonId: string) => void;
  onNavigateToPractice?: (skillName?: string) => void;
  onNavigateToLearn?: () => void;
}

export const FullScreenLessonView: React.FC<FullScreenLessonViewProps> = ({
  lesson,
  onClose,
  onLessonCompleted,
  onNavigateToPractice,
  onNavigateToLearn,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [exerciseCount, setExerciseCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [testedStrings, setTestedStrings] = useState<Set<number>>(new Set());
  const [isStrumDemonstrationActive, setIsStrumDemonstrationActive] = useState<boolean>(false);

  const progressService = GuitarProgressService.getInstance();
  const audioEngine = VibexAudioEngine.getInstance();

  const steps = lesson.steps;
  const currentStep: LessonStepItem | undefined = steps[currentStepIndex];

  // Speak Vibe's dialogue whenever step changes
  useEffect(() => {
    if (currentStep) {
      SpeechCoach.speak(currentStep.vibeDialogue);
    }
    setSelectedQuizIdx(null);
    setQuizSubmitted(false);
    setExerciseCount(0);
    setTestedStrings(new Set());
  }, [currentStepIndex]);

  // Clean up speech and metronome on exit
  useEffect(() => {
    return () => {
      audioEngine.stopMetronome();
    };
  }, []);

  // Standard string frequencies (0=Low E, 1=A, 2=D, 3=G, 4=B, 5=High E)
  const baseFreqs = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];

  // Play audio for current step
  const handlePlayAudio = () => {
    if (!currentStep) return;
    setIsPlayingAudio(true);

    if (currentStep.chordStrings) {
      // Strum chord
      currentStep.chordStrings.forEach((fretVal, idx) => {
        if (fretVal !== 'X') {
          const fretNum = typeof fretVal === 'number' ? fretVal : 0;
          const freq = baseFreqs[idx] * Math.pow(2, fretNum / 12);
          setTimeout(() => {
            audioEngine.playInstrumentNote('guitar', freq, 1200);
          }, idx * 60);
        }
      });
      setTimeout(() => setIsPlayingAudio(false), 700);
    } else if (currentStep.fingerInstruction) {
      // Pluck fretted note
      const strIdx = 6 - currentStep.fingerInstruction.stringNum;
      const fret = currentStep.fingerInstruction.fret;
      const freq = baseFreqs[strIdx] * Math.pow(2, fret / 12);
      audioEngine.playInstrumentNote('guitar', freq, 1100);
      setTimeout(() => setIsPlayingAudio(false), 500);
    } else if (currentStep.singleStringNum) {
      // Open string pluck
      const strIdx = 6 - currentStep.singleStringNum;
      audioEngine.playInstrumentNote('guitar', baseFreqs[strIdx], 1100);
      setTimeout(() => setIsPlayingAudio(false), 500);
    } else {
      audioEngine.playInstrumentNote('guitar', 130.81, 800);
      setTimeout(() => setIsPlayingAudio(false), 500);
    }
  };

  // Play a specific string with fretting
  const playSingleString = (strNum: number, fret: number) => {
    const strIdx = 6 - strNum;
    const freq = baseFreqs[strIdx] * Math.pow(2, fret / 12);
    audioEngine.playInstrumentNote('guitar', freq, 1200);
    setTestedStrings((prev) => new Set(prev).add(strNum));
  };

  // Strum demonstration: Slow swept vs regular tempo
  const handleDemonstrationStrum = (speedMs: number) => {
    setIsStrumDemonstrationActive(true);
    // C Major strings: 5th (C3), 4th (E3), 3rd (G3), 2nd (C4), 1st (E4)
    const cFretData = [
      { strNum: 5, fret: 3, freq: 130.81 },
      { strNum: 4, fret: 2, freq: 164.81 },
      { strNum: 3, fret: 0, freq: 196.00 },
      { strNum: 2, fret: 1, freq: 261.63 },
      { strNum: 1, fret: 0, freq: 329.63 },
    ];

    cFretData.forEach((item, index) => {
      setTimeout(() => {
        audioEngine.playInstrumentNote('guitar', item.freq, 1100);
        setTestedStrings((p) => new Set(p).add(item.strNum));
      }, index * speedMs);
    });

    setTimeout(() => {
      setIsStrumDemonstrationActive(false);
    }, cFretData.length * speedMs + 400);
  };

  // Play C -> G or C -> Am progression demonstration
  const handlePlayProgressionDemo = (targetChord: 'G' | 'Am') => {
    setIsPlayingAudio(true);

    // Strum C Major (Beat 1 & 2)
    const playC = () => {
      [130.81, 164.81, 196.0, 261.63, 329.63].forEach((f, i) => {
        setTimeout(() => audioEngine.playInstrumentNote('guitar', f, 900), i * 35);
      });
    };

    // Strum Target Chord (Beat 3 & 4)
    const playTarget = () => {
      if (targetChord === 'G') {
        [98.0, 123.47, 146.83, 196.0, 246.94, 392.0].forEach((f, i) => {
          setTimeout(() => audioEngine.playInstrumentNote('guitar', f, 1100), i * 35);
        });
      } else {
        [110.0, 164.81, 220.0, 261.63, 329.63].forEach((f, i) => {
          setTimeout(() => audioEngine.playInstrumentNote('guitar', f, 1100), i * 35);
        });
      }
    };

    playC();
    setTimeout(playC, 600);
    setTimeout(playTarget, 1300);
    setTimeout(playTarget, 1900);
    setTimeout(() => setIsPlayingAudio(false), 2600);
  };

  // Complete lesson and persist state
  const finalizeLessonCompletion = () => {
    setIsCompleted(true);
    progressService.markLessonCompleted(lesson.id, {
      skillName: lesson.title,
      category: (lesson.category as any) || 'Chords',
      defaultBpm: 60,
    });
    SpeechCoach.speak(`Congratulations! You have completed ${lesson.title}. It is now in your practice studio!`);
    onLessonCompleted(lesson.id);
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      finalizeLessonCompletion();
    }
  };

  // Dynamic primary action button label
  const getPrimaryActionLabel = () => {
    if (!currentStep) return 'Next Step';
    if (currentStepIndex === steps.length - 1) return 'Finish Lesson 🎉';

    switch (currentStep.type) {
      case 'INTRO':
        return 'Begin Lesson →';
      case 'PLACE_FINGER':
        return `Finger Placed → Next`;
      case 'PLAY_STRING':
        return 'Strings Clear → Next';
      case 'STRUM':
        return 'I Heard The Strum → Next';
      case 'PLAY_CHORD':
        return 'I Strummed C Major → Next';
      case 'REPEAT':
        return exerciseCount >= (currentStep.repsRequired || 3)
          ? 'Challenge Mastered → Next'
          : `Continue (${exerciseCount}/${currentStep.repsRequired || 3} Reps)`;
      case 'CHALLENGE':
        return quizSubmitted ? 'Next Step →' : 'Check Knowledge';
      default:
        return 'Next Step →';
    }
  };

  // If lesson is an advanced curriculum preview (not yet implemented)
  if (!lesson.isImplemented || steps.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0D0E17] text-[#F6F4FF] flex flex-col p-6 sm:p-10 justify-between overflow-y-auto animate-in fade-in duration-200">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#303348] pb-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-xs font-semibold text-[#A9A8BA] hover:text-[#F6F4FF] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Curriculum</span>
            </button>
            <span className="px-3 py-1 rounded-full bg-[#1D2032] border border-[#303348] text-xs font-mono text-[#F4BB55]">
              Curriculum Defined (Preview)
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#F4BB55]" />
              <h2 className="text-xl font-bold text-[#F6F4FF]">{lesson.title}</h2>
            </div>
            <p className="text-sm text-[#A9A8BA]">{lesson.subtitle}</p>

            <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#F4BB55] shrink-0 mt-0.5" />
              <div className="text-xs text-[#E2E1EC] leading-relaxed">
                <span className="font-bold text-[#F6F4FF] block mb-1">Honest Development State:</span>
                This advanced lesson syllabus is fully defined in the VIBEX curriculum. Step-by-step interactive engine telemetry is currently pending implementation in this phase. Foundational levels are fully interactive.
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#F6F4FF] uppercase tracking-wider mb-2">
                Planned Learning Objectives
              </h4>
              <ul className="space-y-1.5 text-xs text-[#A9A8BA]">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8067FF]" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto w-full pt-4">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#1D2032] hover:bg-[#303348] text-[#F6F4FF] font-semibold text-xs border border-[#303348] transition-colors"
          >
            Return to Curriculum
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // ACTIVE STEP MAPPINGS
  // ==========================================
  const activeFretboardVoicing = currentStep?.chordStrings
    ? {
        name: currentStep.chordName || lesson.title,
        strings: currentStep.chordStrings,
        fingers: currentStep.chordFingers || [null, null, null, null, null, null],
        notes: currentStep.chordNotes || ['X', 'X', 'X', 'X', 'X', 'X'],
        rootStringIndex: 1,
      }
    : undefined;

  const activeFingerPlacement = currentStep?.fingerInstruction
    ? {
        finger: currentStep.fingerInstruction.finger,
        stringIndex: 6 - currentStep.fingerInstruction.stringNum,
        fret: currentStep.fingerInstruction.fret,
        note: currentStep.fingerInstruction.note,
      }
    : undefined;

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0E17] text-[#F6F4FF] flex flex-col justify-between overflow-y-auto selection:bg-[#FF8066]/30">
      {/* 1. TOP BAR */}
      <header className="w-full bg-[#151725] border-b border-[#303348] px-4 sm:px-8 py-3 flex flex-col gap-2 sticky top-0 z-20 shadow-md">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1D2032] hover:bg-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-semibold flex items-center gap-1.5 border border-[#303348] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Exit Lesson</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF8066]/20 text-[#FF8066] font-bold">
                  Lesson {lesson.lessonNumber}
                </span>
                <h1 className="text-sm sm:text-base font-bold text-[#F6F4FF] tracking-tight truncate max-w-[200px] sm:max-w-md">
                  {lesson.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Step Indicator & Volume */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#A9A8BA]">
              <span className="text-[#FF8066] font-bold">{currentStepIndex + 1}</span>
              <span>/</span>
              <span>{steps.length}</span>
            </div>

            <button
              onClick={() => currentStep && SpeechCoach.speak(currentStep.vibeDialogue)}
              className="p-2 rounded-xl bg-[#1D2032] border border-[#303348] hover:border-[#8067FF] text-[#A9A8BA] hover:text-[#F6F4FF] transition-colors"
              title="Re-speak Vibe's dialogue"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#A9A8BA] hover:text-[#F6F4FF] hover:bg-[#1D2032] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar & Dots */}
        <div className="w-full flex items-center gap-1.5 pt-1">
          {steps.map((s, idx) => {
            const isPassed = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={s.id || idx}
                onClick={() => setCurrentStepIndex(idx)}
                title={`Step ${idx + 1}: ${s.title}`}
                className={`h-1.5 flex-1 rounded-full cursor-pointer transition-all duration-200 ${
                  isCurrent
                    ? 'bg-[#FF8066] shadow-[0_0_8px_#FF8066]'
                    : isPassed
                    ? 'bg-[#54D6C3]'
                    : 'bg-[#303348]'
                }`}
              />
            );
          })}
        </div>
      </header>

      {/* 2. MAIN TEACHING STAGE */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col gap-6 justify-center">
        {/* VIBE TEACHER DIALOGUE CARD */}
        <div className="rounded-2xl bg-gradient-to-r from-[#1D2032] to-[#151725] border border-[#303348] p-5 flex items-start gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#FF8066]/20 border border-[#FF8066] flex items-center justify-center text-[#FF8066] shrink-0 shadow-[0_0_12px_rgba(255,128,102,0.3)]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#FF8066] uppercase tracking-wider">
                VIBE TEACHER MENTOR
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1D2032] text-[#A9A8BA]">
                Step {currentStepIndex + 1}: {currentStep?.type}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#F6F4FF]">
              {currentStep?.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#E2E1EC] leading-relaxed">
              "{currentStep?.vibeText}"
            </p>
          </div>
        </div>

        {/* FINGER INSTRUCTION CALLOUT (When placing a finger) */}
        {currentStep?.fingerInstruction && (
          <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#FF8066]/40 flex items-center justify-between text-xs animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#FF8066] text-[#0D0E17] font-bold font-mono">
                Finger {currentStep.fingerInstruction.finger}
              </span>
              <span className="text-[#F6F4FF] font-semibold">
                String {currentStep.fingerInstruction.stringNum} → Fret {currentStep.fingerInstruction.fret}
              </span>
            </div>
            <span className="font-mono text-[#54D6C3] font-bold">
              Target Note: {currentStep.fingerInstruction.note}
            </span>
          </div>
        )}

        {/* INTERACTIVE FRETBOARD */}
        <div className="w-full">
          <MasterGuitarFretboard
            chordVoicing={activeFretboardVoicing}
            activeFingerPlacement={activeFingerPlacement}
            interactive={true}
          />
        </div>

        {/* STEP 9 INTERACTIVE: CLARITY STRING-BY-STRING TEST */}
        {currentStep?.type === 'PLAY_STRING' && (
          <div className="p-5 rounded-2xl bg-[#151725] border border-[#54D6C3]/40 flex flex-col gap-3 shadow-lg animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#54D6C3]">
                <Zap className="w-4 h-4" />
                <span>INTERACTIVE CLARITY STRING TEST</span>
              </div>
              <span className="text-xs font-mono text-[#A9A8BA]">
                {testedStrings.size} of 5 strings tested
              </span>
            </div>

            <p className="text-xs text-[#A9A8BA]">
              Click each string below or on the fretboard to test note clarity. Ensure no fingers lean or mute adjacent open strings!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {/* String 6: Muted */}
              <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#EF4444]/40 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-[#A9A8BA]">Str 6 (Low E)</span>
                <span className="text-xs font-bold font-mono text-[#EF4444] mt-0.5">✕ Muted</span>
                <span className="text-[9px] text-[#A9A8BA] mt-1">Do not pluck</span>
              </div>

              {/* String 5: C3 */}
              <button
                onClick={() => playSingleString(5, 3)}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  testedStrings.has(5)
                    ? 'bg-[#12241C] border-[#45D483] text-[#45D483]'
                    : 'bg-[#0D0E17] border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]'
                }`}
              >
                <span className="text-[10px] text-[#A9A8BA]">Str 5 (A)</span>
                <span className="text-xs font-bold font-mono mt-0.5">Fret 3 (C3)</span>
                <span className="text-[9px] font-mono mt-1">
                  {testedStrings.has(5) ? '✓ Tested' : 'Pluck Note'}
                </span>
              </button>

              {/* String 4: E3 */}
              <button
                onClick={() => playSingleString(4, 2)}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  testedStrings.has(4)
                    ? 'bg-[#12241C] border-[#45D483] text-[#45D483]'
                    : 'bg-[#0D0E17] border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]'
                }`}
              >
                <span className="text-[10px] text-[#A9A8BA]">Str 4 (D)</span>
                <span className="text-xs font-bold font-mono mt-0.5">Fret 2 (E3)</span>
                <span className="text-[9px] font-mono mt-1">
                  {testedStrings.has(4) ? '✓ Tested' : 'Pluck Note'}
                </span>
              </button>

              {/* String 3: G3 Open */}
              <button
                onClick={() => playSingleString(3, 0)}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  testedStrings.has(3)
                    ? 'bg-[#12241C] border-[#45D483] text-[#45D483]'
                    : 'bg-[#0D0E17] border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]'
                }`}
              >
                <span className="text-[10px] text-[#A9A8BA]">Str 3 (G)</span>
                <span className="text-xs font-bold font-mono mt-0.5">Open (G3)</span>
                <span className="text-[9px] font-mono mt-1">
                  {testedStrings.has(3) ? '✓ Tested' : 'Pluck Note'}
                </span>
              </button>

              {/* String 2: C4 */}
              <button
                onClick={() => playSingleString(2, 1)}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  testedStrings.has(2)
                    ? 'bg-[#12241C] border-[#45D483] text-[#45D483]'
                    : 'bg-[#0D0E17] border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]'
                }`}
              >
                <span className="text-[10px] text-[#A9A8BA]">Str 2 (B)</span>
                <span className="text-xs font-bold font-mono mt-0.5">Fret 1 (C4)</span>
                <span className="text-[9px] font-mono mt-1">
                  {testedStrings.has(2) ? '✓ Tested' : 'Pluck Note'}
                </span>
              </button>

              {/* String 1: E4 Open */}
              <button
                onClick={() => playSingleString(1, 0)}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  testedStrings.has(1)
                    ? 'bg-[#12241C] border-[#45D483] text-[#45D483]'
                    : 'bg-[#0D0E17] border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]'
                }`}
              >
                <span className="text-[10px] text-[#A9A8BA]">Str 1 (High E)</span>
                <span className="text-xs font-bold font-mono mt-0.5">Open (E4)</span>
                <span className="text-[9px] font-mono mt-1">
                  {testedStrings.has(1) ? '✓ Tested' : 'Pluck Note'}
                </span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#303348]">
              <button
                onClick={() => handleDemonstrationStrum(300)}
                className="px-4 py-2 rounded-xl bg-[#0D0E17] border border-[#303348] hover:border-[#54D6C3] text-xs font-semibold text-[#54D6C3] flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Test All 5 in Sequence</span>
              </button>

              {testedStrings.size >= 4 && (
                <span className="text-xs text-[#45D483] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Strings Tested & Clear</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* STEP 10 INTERACTIVE: STRUM DEMONSTRATION */}
        {currentStep?.type === 'STRUM' && (
          <div className="p-5 rounded-2xl bg-[#151725] border border-[#8067FF]/40 flex flex-col gap-4 shadow-lg animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8067FF]">
              <Volume2 className="w-4 h-4" />
              <span>STRUM TELEMETRY & AUDIO DEMONSTRATION</span>
            </div>

            <p className="text-xs text-[#E2E1EC]">
              Listen carefully to the difference between a slow downward brush (string by string) and a unified rhythmic chord strum:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                disabled={isStrumDemonstrationActive}
                onClick={() => handleDemonstrationStrum(120)}
                className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] hover:border-[#8067FF] flex items-center gap-3 text-left transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#8067FF]/20 text-[#8067FF] flex items-center justify-center shrink-0">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F6F4FF]">Slow Swept Strum</h4>
                  <p className="text-[11px] text-[#A9A8BA]">120ms brush (Hear all 5 voices ring)</p>
                </div>
              </button>

              <button
                disabled={isStrumDemonstrationActive}
                onClick={() => handleDemonstrationStrum(40)}
                className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] hover:border-[#FF8066] flex items-center gap-3 text-left transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FF8066]/20 text-[#FF8066] flex items-center justify-center shrink-0">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F6F4FF]">Regular Tempo Strum</h4>
                  <p className="text-[11px] text-[#A9A8BA]">40ms downstroke (Unified acoustic chord)</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 15 INTERACTIVE: 3-REP CONTROLLED PRACTICE CHALLENGE */}
        {currentStep?.type === 'REPEAT' && (
          <div className="p-5 rounded-2xl bg-[#151725] border border-[#54D6C3]/40 flex flex-col gap-4 shadow-lg animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#303348] pb-3">
              <div>
                <h4 className="text-sm font-bold text-[#F6F4FF]">
                  3-Rep Controlled Challenge
                </h4>
                <p className="text-xs text-[#A9A8BA]">
                  Lift hand off neck, place fingers back on C Major, and strum cleanly 3 times.
                </p>
              </div>
              <span className="font-mono text-sm font-bold text-[#54D6C3]">
                {exerciseCount} / 3 Complete
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((rep) => {
                const isRepDone = exerciseCount >= rep;
                return (
                  <div
                    key={rep}
                    className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center gap-1 transition-all ${
                      isRepDone
                        ? 'bg-[#12241C] border-[#45D483] text-[#45D483]'
                        : 'bg-[#0D0E17] border-[#303348] text-[#A9A8BA]'
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase font-bold">Rep {rep}</span>
                    <span className="text-xs font-bold text-[#F6F4FF]">
                      {isRepDone ? '✓ Clean Strum' : 'Release & Place'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  const newCount = exerciseCount + 1;
                  setExerciseCount(newCount);
                  handleDemonstrationStrum(50);
                  if (newCount === 1) SpeechCoach.speak('Rep 1 complete! Release your fingers and form the shape again.');
                  else if (newCount === 2) SpeechCoach.speak('Rep 2 locked in! One more clean rep.');
                  else if (newCount >= 3) SpeechCoach.speak('Outstanding! 3 reps completed with clean ringing notes.');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#54D6C3] hover:bg-[#43bfac] text-[#0D0E17] font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>+ Strum & Record Clean Rep</span>
              </button>

              {exerciseCount >= 3 && (
                <span className="text-xs font-bold text-[#45D483] flex items-center gap-1.5 animate-in zoom-in-95">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>3 Reps Mastered! Ready to advance.</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* STEP 16 INTERACTIVE: MUSICAL APPLICATION PROGRESSIONS */}
        {currentStep?.type === 'SONG_APPLICATION' && (
          <div className="p-5 rounded-2xl bg-[#151725] border border-[#FF8066]/40 flex flex-col gap-4 shadow-lg animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#303348] pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF8066]">
                <Music className="w-4 h-4" />
                <span>MUSICAL CONTEXT: COMMON CHORD PROGRESSIONS</span>
              </div>
            </div>

            <p className="text-xs text-[#E2E1EC]">
              Hear how C Major resolves naturally to G Major or connects into A Minor in hundreds of iconic acoustic songs:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                disabled={isPlayingAudio}
                onClick={() => handlePlayProgressionDemo('G')}
                className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] hover:border-[#FF8066] flex items-center justify-between text-left transition-all"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#F6F4FF]">C Major ➔ G Major</h4>
                  <p className="text-[11px] text-[#A9A8BA]">Folk & Pop standard cadence</p>
                </div>
                <div className="p-2 rounded-lg bg-[#FF8066]/20 text-[#FF8066]">
                  <Play className="w-4 h-4 fill-current" />
                </div>
              </button>

              <button
                disabled={isPlayingAudio}
                onClick={() => handlePlayProgressionDemo('Am')}
                className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] hover:border-[#8067FF] flex items-center justify-between text-left transition-all"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#F6F4FF]">C Major ➔ A Minor</h4>
                  <p className="text-[11px] text-[#A9A8BA]">Relative minor emotional movement</p>
                </div>
                <div className="p-2 rounded-lg bg-[#8067FF]/20 text-[#8067FF]">
                  <Play className="w-4 h-4 fill-current" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 17 KNOWLEDGE CHECK / QUIZ */}
        {currentStep?.challengeQuestion && (
          <div className="p-5 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col gap-3 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F4BB55]">
              <HelpCircle className="w-4 h-4" />
              <span>KNOWLEDGE CHECK</span>
            </div>
            <p className="text-sm font-semibold text-[#F6F4FF]">
              {currentStep.challengeQuestion.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {currentStep.challengeQuestion.options.map((opt, i) => {
                const isSelected = selectedQuizIdx === i;
                const isCorrect = i === currentStep.challengeQuestion!.correctIndex;
                let btnClass = 'bg-[#0D0E17] border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]';
                if (quizSubmitted) {
                  if (isCorrect) btnClass = 'bg-[#45D483]/20 border-[#45D483] text-[#45D483] font-bold';
                  else if (isSelected) btnClass = 'bg-[#F06B78]/20 border-[#F06B78] text-[#F06B78]';
                } else if (isSelected) {
                  btnClass = 'bg-[#8067FF]/20 border-[#8067FF] text-[#8067FF] font-bold';
                }

                return (
                  <button
                    key={i}
                    disabled={quizSubmitted}
                    onClick={() => setSelectedQuizIdx(i)}
                    className={`p-3 rounded-xl border text-xs text-left transition-colors ${btnClass}`}
                  >
                    <span className="font-mono mr-2 opacity-50">{String.fromCharCode(65 + i)}.</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {!quizSubmitted ? (
              <button
                disabled={selectedQuizIdx === null}
                onClick={() => {
                  setQuizSubmitted(true);
                  const correct = selectedQuizIdx === currentStep.challengeQuestion!.correctIndex;
                  SpeechCoach.speak(correct ? 'Correct! Outstanding answer.' : 'Not quite. Check the explanation below.');
                }}
                className="self-end px-4 py-2 rounded-xl bg-[#F4BB55] hover:bg-[#e0a944] disabled:opacity-40 text-[#0D0E17] font-bold text-xs transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348] text-xs text-[#A9A8BA]">
                <span className="font-bold text-[#F6F4FF]">Explanation: </span>
                <span>{currentStep.challengeQuestion.explanation}</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 18 / COMPLETION CELEBRATION (Section 14 Step 18) */}
        {(isCompleted || currentStep?.type === 'COMPLETE') && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1D2032] via-[#151725] to-[#1D2032] border-2 border-[#45D483] flex flex-col items-center text-center gap-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#45D483]/20 border border-[#45D483] flex items-center justify-center text-[#45D483] shadow-[0_0_20px_rgba(69,212,131,0.3)]">
              <Award className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-[#45D483] uppercase tracking-wider">
                CURRICULUM MILESTONE CONQUERED
              </span>
              <h3 className="text-2xl font-black text-[#F6F4FF] mt-1">
                {lesson.title} Mastered!
              </h3>
              <p className="text-xs sm:text-sm text-[#A9A8BA] max-w-lg mt-2 leading-relaxed">
                Outstanding work! You have finished all 18 structured steps, verified finger placement, tested individual string clarity, and unlocked <span className="text-[#F6F4FF] font-bold">C Major</span> in your Practice Studio.
              </p>
            </div>

            {/* Action Buttons: Practice Studio vs Continue Curriculum */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mt-2">
              <button
                onClick={() => {
                  finalizeLessonCompletion();
                  if (onNavigateToPractice) {
                    onNavigateToPractice('C Major');
                  } else {
                    onClose();
                  }
                }}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#FF8066] hover:bg-[#ff6e50] text-[#0D0E17] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF8066]/20 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Practice C Major</span>
              </button>

              <button
                onClick={() => {
                  finalizeLessonCompletion();
                  if (onNavigateToLearn) {
                    onNavigateToLearn();
                  } else {
                    onClose();
                  }
                }}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#1D2032] hover:bg-[#303348] text-[#F6F4FF] border border-[#303348] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Continue Learning</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 3. BOTTOM ACTION BAR */}
      <footer className="w-full bg-[#151725] border-t border-[#303348] px-4 sm:px-8 py-4 flex items-center justify-between gap-4 sticky bottom-0 z-20">
        <button
          onClick={handlePlayAudio}
          disabled={isPlayingAudio}
          className="px-5 py-2.5 rounded-xl bg-[#1D2032] hover:bg-[#303348] border border-[#303348] text-xs font-semibold text-[#F6F4FF] flex items-center gap-2 transition-colors shadow-sm"
        >
          <Volume2 className="w-4 h-4 text-[#FF8066]" />
          <span>{isPlayingAudio ? 'Playing...' : 'Hear Vibe Demo'}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (currentStepIndex > 0) setCurrentStepIndex((p) => p - 1);
            }}
            disabled={currentStepIndex === 0}
            className="px-4 py-2.5 rounded-xl bg-[#0D0E17] border border-[#303348] disabled:opacity-30 text-[#A9A8BA] text-xs font-semibold hover:text-[#F6F4FF] transition-colors"
          >
            Previous
          </button>

          <button
            onClick={handleNextStep}
            className="px-6 py-2.5 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#8067FF]/20 transition-all hover:scale-[1.02]"
          >
            <span>{getPrimaryActionLabel()}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
