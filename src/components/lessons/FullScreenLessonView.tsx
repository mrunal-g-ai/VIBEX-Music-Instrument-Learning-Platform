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
} from 'lucide-react';

interface FullScreenLessonViewProps {
  lesson: GuitarLesson;
  onClose: () => void;
  onLessonCompleted: (lessonId: string) => void;
}

export const FullScreenLessonView: React.FC<FullScreenLessonViewProps> = ({
  lesson,
  onClose,
  onLessonCompleted,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [exerciseCount, setExerciseCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

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
  }, [currentStepIndex]);

  // Clean up speech on exit
  useEffect(() => {
    return () => {
      audioEngine.stopMetronome();
    };
  }, []);

  // Play audio for current step (Pluck single string, play chord, or scale)
  const handlePlayAudio = () => {
    if (!currentStep) return;
    setIsPlayingAudio(true);

    if (currentStep.chordStrings) {
      // Strum chord
      const baseFreqs = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];
      currentStep.chordStrings.forEach((fretVal, idx) => {
        if (fretVal !== 'X') {
          const fretNum = typeof fretVal === 'number' ? fretVal : 0;
          const freq = baseFreqs[idx] * Math.pow(2, fretNum / 12);
          setTimeout(() => {
            audioEngine.playInstrumentNote('guitar', freq, 1200);
          }, idx * 70);
        }
      });
      setTimeout(() => setIsPlayingAudio(false), 800);
    } else if (currentStep.fingerInstruction) {
      // Pluck fretted note
      const baseFreqs = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];
      const strIdx = 6 - currentStep.fingerInstruction.stringNum;
      const fret = currentStep.fingerInstruction.fret;
      const freq = baseFreqs[strIdx] * Math.pow(2, fret / 12);
      audioEngine.playInstrumentNote('guitar', freq, 1100);
      setTimeout(() => setIsPlayingAudio(false), 500);
    } else if (currentStep.singleStringNum) {
      // Open string pluck
      const baseFreqs = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];
      const strIdx = 6 - currentStep.singleStringNum;
      audioEngine.playInstrumentNote('guitar', baseFreqs[strIdx], 1100);
      setTimeout(() => setIsPlayingAudio(false), 500);
    } else if (currentStep.scaleNotes && currentStep.scaleNotes.length > 0) {
      // Play ascending scale
      const freqs = [110, 130.81, 146.83, 164.81, 196, 220, 261.63, 293.66, 329.63, 392, 440, 523.25];
      freqs.forEach((f, i) => {
        setTimeout(() => {
          audioEngine.playInstrumentNote('guitar', f, 350);
          if (i === freqs.length - 1) setIsPlayingAudio(false);
        }, i * 280);
      });
    } else {
      audioEngine.playInstrumentNote('guitar', 130.81, 800);
      setTimeout(() => setIsPlayingAudio(false), 500);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Complete lesson
      setIsCompleted(true);
      progressService.markLessonCompleted(lesson.id, {
        skillName: lesson.title,
        category: (lesson.category as any) || 'Chords',
        defaultBpm: 60,
      });
      SpeechCoach.speak(`Congratulations! You have completed ${lesson.title}. It is now in your practice studio!`);
      setTimeout(() => {
        onLessonCompleted(lesson.id);
        onClose();
      }, 2200);
    }
  };

  // If lesson is an advanced curriculum preview (not yet implemented)
  if (!lesson.isImplemented || steps.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0D0E17] text-[#F6F4FF] flex flex-col p-6 sm:p-10 justify-between overflow-y-auto animate-in fade-in duration-200">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
          {/* Header */}
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
                This advanced lesson syllabus is fully defined in the VIBEX curriculum. Step-by-step interactive engine telemetry is currently pending implementation in this phase. All foundational levels (Modules 1–7) are fully interactive and openable.
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
  // FULL-SCREEN INTERACTIVE LESSON
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
      <header className="w-full bg-[#151725] border-b border-[#303348] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1D2032] hover:bg-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-semibold flex items-center gap-1.5 border border-[#303348] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF8066]/20 text-[#FF8066] font-bold">
                Lesson {lesson.lessonNumber}
              </span>
              <h1 className="text-sm sm:text-base font-bold text-[#F6F4FF] tracking-tight">
                {lesson.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
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
                VIBE TEACHER
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1D2032] text-[#A9A8BA]">
                {currentStep?.type}
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
          <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#FF8066]/40 flex items-center justify-between text-xs">
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

        {/* MINI CHALLENGE STEP */}
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

        {/* METRONOME REPETITION STEP */}
        {currentStep?.type === 'REPEAT' && currentStep.tempoBpm && (
          <div className="p-4 rounded-xl bg-[#151725] border border-[#303348] flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#F6F4FF]">
                Rhythm Repetition ({currentStep.tempoBpm} BPM)
              </h4>
              <p className="text-xs text-[#A9A8BA]">Play cleanly with the metronome beat</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-[#54D6C3]">
                {exerciseCount} / {currentStep.repsRequired || 8} Reps
              </span>
              <button
                onClick={() => setExerciseCount((p) => p + 1)}
                className="px-3.5 py-1.5 rounded-lg bg-[#54D6C3] text-[#0D0E17] font-bold text-xs transition-colors"
              >
                + Tap Rep
              </button>
            </div>
          </div>
        )}

        {/* COMPLETION CELEBRATION */}
        {isCompleted && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1D2032] to-[#151725] border-2 border-[#45D483] flex flex-col items-center text-center gap-3 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#45D483]/20 border border-[#45D483] flex items-center justify-center text-[#45D483]">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#F6F4FF]">Lesson Completed!</h3>
            <p className="text-xs text-[#A9A8BA] max-w-md">
              Congratulations! This skill is now officially unlocked in your Practice Studio.
            </p>
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
            <span>{currentStepIndex === steps.length - 1 ? 'Complete Lesson' : 'Next Step'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
