/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  MasterGuitarLesson,
  LessonStep,
  LessonMasteryRecord,
} from '../../types/guitarCurriculum';
import { VibeTeacherEngine } from '../../services/vibeTeacherEngine';
import { VibexAudioEngine } from '../../services/audioEngine';
import { SpeechCoach } from '../../services/speechCoach';
import { MasterGuitarFretboard } from '../instruments/MasterGuitarFretboard';
import { VisionMonitor } from '../practice/VisionMonitor';
import { PostureFeedback } from '../../types/vibex';
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Award,
  Camera,
  CameraOff,
  HelpCircle,
  Info,
  X,
  ChevronRight,
  ChevronLeft,
  Star,
  Activity,
  Music,
  BookOpen,
  Heart,
  Brain,
  Hand,
  Radio,
  Sliders,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

interface InteractiveLessonRunnerProps {
  lesson: MasterGuitarLesson;
  onComplete: (record: LessonMasteryRecord) => void;
  onClose: () => void;
}

export const InteractiveLessonRunner: React.FC<InteractiveLessonRunnerProps> = ({
  lesson,
  onComplete,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isVisionActive, setIsVisionActive] = useState<boolean>(false);
  const [isMetronomeActive, setIsMetronomeActive] = useState<boolean>(false);
  const [metronomeBeat, setMetronomeBeat] = useState<number>(0);
  const [exerciseRepsDone, setExerciseRepsDone] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState<boolean>(false);
  const [isPillarsOpen, setIsPillarsOpen] = useState<boolean>(false);
  const [testedStringsSet, setTestedStringsSet] = useState<Set<number>>(new Set());
  const [postureFeedback, setPostureFeedback] = useState<PostureFeedback | null>(null);
  const [accuracyScore, setAccuracyScore] = useState<number>(94);
  const [attemptCount, setAttemptCount] = useState<number>(1);
  const [masteryCelebrated, setMasteryCelebrated] = useState<boolean>(false);

  const teacherEngine = VibeTeacherEngine.getInstance();
  const audioEngine = VibexAudioEngine.getInstance();

  const currentStep: LessonStep = lesson.steps[currentStepIndex] || lesson.steps[0];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  // Speak Vibe's dialogue upon navigating to a step
  useEffect(() => {
    if (currentStep) {
      SpeechCoach.speak(currentStep.vibeDialogue);
    }
    // Stop metronome when changing steps
    audioEngine.stopMetronome();
    setIsMetronomeActive(false);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setExerciseRepsDone(0);
  }, [currentStepIndex]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      audioEngine.stopMetronome();
      audioEngine.stopPitchTracking();
    };
  }, []);

  // Handle Play/Demonstrate Audio for the Step
  const handlePlayStepAudio = () => {
    setIsPlayingAudio(true);

    if (currentStep.chordVoicing) {
      // Strum chord voicing
      const strVoicing = currentStep.chordVoicing;
      const baseFreqs = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];
      strVoicing.strings.forEach((fretVal, idx) => {
        if (fretVal !== 'X') {
          const fretNum = typeof fretVal === 'number' ? fretVal : 0;
          const freq = baseFreqs[idx] * Math.pow(2, fretNum / 12);
          setTimeout(() => {
            audioEngine.playInstrumentNote('guitar', freq, 1200);
          }, idx * 65);
        }
      });
      setTimeout(() => setIsPlayingAudio(false), 800);
    } else if (currentStep.fingerPlacement) {
      // Pluck single targeted note
      const baseFreqs = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];
      const strIdx = currentStep.fingerPlacement.stringIndex;
      const fret = currentStep.fingerPlacement.fret;
      const freq = currentStep.fingerPlacement.frequency || (baseFreqs[strIdx] * Math.pow(2, fret / 12));
      audioEngine.playInstrumentNote('guitar', freq, 1200);
      setTimeout(() => setIsPlayingAudio(false), 500);
    } else if (currentStep.audioFrequencies && currentStep.audioFrequencies.length > 0) {
      // Play scale sequence
      currentStep.audioFrequencies.forEach((freq, idx) => {
        setTimeout(() => {
          audioEngine.playInstrumentNote('guitar', freq, 450);
          if (idx === currentStep.audioFrequencies!.length - 1) {
            setIsPlayingAudio(false);
          }
        }, idx * 320);
      });
    } else {
      // Play root sample
      audioEngine.playInstrumentNote('guitar', 130.81, 1000);
      setTimeout(() => setIsPlayingAudio(false), 600);
    }
  };

  // Toggle Controlled Metronome Exercise
  const handleToggleMetronome = () => {
    if (isMetronomeActive) {
      audioEngine.stopMetronome();
      setIsMetronomeActive(false);
    } else {
      const bpm = currentStep.tempoBpm || 70;
      audioEngine.startMetronome(bpm, 'quarter', 'woodblock', (beat) => {
        setMetronomeBeat(beat % 4);
        setExerciseRepsDone((prev) => {
          const target = currentStep.exerciseRepsRequired || 8;
          const next = prev + 1;
          if (next >= target) {
            SpeechCoach.speak('Excellent consistency! Rhythm exercise complete.');
          }
          return next;
        });
      });
      setIsMetronomeActive(true);
    }
  };

  // Fretboard pluck interaction
  const handleFretboardPluck = (stringIndex: number, fret: number) => {
    setTestedStringsSet((prev) => new Set(prev).add(stringIndex));
    // If placing a finger, check if matched
    if (currentStep.fingerPlacement) {
      if (
        stringIndex === currentStep.fingerPlacement.stringIndex &&
        fret === currentStep.fingerPlacement.fret
      ) {
        SpeechCoach.speak(`Clean placement! Finger ${currentStep.fingerPlacement.finger} on string ${6 - stringIndex}.`);
      }
    }
  };

  // Navigation handlers
  const handleNextStep = () => {
    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleFinalizeMastery();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Complete and Record Mastery
  const handleFinalizeMastery = () => {
    setMasteryCelebrated(true);
    const scoreDecimal = accuracyScore / 100;
    const record = teacherEngine.recordLessonAttempt(lesson.id, scoreDecimal);

    // Boost primary skill
    teacherEngine.updateSkillScore(lesson.primarySkill, 0.5);

    SpeechCoach.speak(
      `Congratulations! You have completed ${lesson.title} with ${record.stars} stars!`
    );

    setTimeout(() => {
      onComplete(record);
    }, 2400);
  };

  // Step type badge metadata
  const getStepTypeBadge = (type: string) => {
    switch (type) {
      case 'INTRO':
      case 'OBJECTIVE':
      case 'EXPLANATION':
        return { label: 'Teacher Intro', color: '#8067FF', bg: 'rgba(128, 103, 255, 0.15)' };
      case 'WATCH_VIBE':
        return { label: 'Watch Vibe', color: '#54D6C3', bg: 'rgba(84, 214, 195, 0.15)' };
      case 'HEAR_CONCEPT':
        return { label: 'Hear Concept', color: '#2BD2FF', bg: 'rgba(43, 210, 255, 0.15)' };
      case 'PLACE_FINGER':
        return { label: 'Place Finger', color: '#FF8066', bg: 'rgba(255, 128, 102, 0.15)' };
      case 'PLAY_CHORD':
        return { label: 'Play Chord', color: '#FF5C93', bg: 'rgba(255, 92, 147, 0.15)' };
      case 'USER_ATTEMPT':
        return { label: 'Your Turn', color: '#F4BB55', bg: 'rgba(244, 187, 85, 0.15)' };
      case 'CONTROLLED_EXERCISE':
        return { label: 'Controlled Reps', color: '#54D6C3', bg: 'rgba(84, 214, 195, 0.15)' };
      case 'MINI_CHALLENGE':
        return { label: 'Mini Challenge', color: '#FBBF24', bg: 'rgba(251, 191, 36, 0.15)' };
      case 'ASSESSMENT':
        return { label: 'Assessment', color: '#FB7185', bg: 'rgba(251, 113, 133, 0.15)' };
      case 'MASTERY':
        return { label: 'Mastery', color: '#7EE787', bg: 'rgba(126, 231, 135, 0.15)' };
      default:
        return { label: 'Interactive Step', color: '#8067FF', bg: 'rgba(128, 103, 255, 0.15)' };
    }
  };

  const badgeInfo = getStepTypeBadge(currentStep.type);

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0E17]/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="w-full max-w-5xl bg-[#151725] border border-[#303348] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto max-h-[96vh]">
        {/* Top App Bar */}
        <div className="px-5 py-4 border-b border-[#303348] flex items-center justify-between bg-[#111320] gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-[#8067FF]/20 text-[#8067FF] border border-[#8067FF]/40">
              Level {lesson.lessonNumber}
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#F6F4FF] tracking-tight">
                {lesson.title}
              </h2>
              <p className="text-xs text-[#A9A8BA] line-clamp-1">{lesson.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 7 Pillars button */}
            <button
              onClick={() => setIsPillarsOpen(!isPillarsOpen)}
              className="p-2 rounded-xl bg-[#1D2032] border border-[#303348] hover:border-[#8067FF] text-[#A9A8BA] hover:text-[#F6F4FF] transition-colors flex items-center gap-1.5 text-xs"
              title="7 Pedagogical Pillars"
            >
              <Heart className="w-4 h-4 text-[#FF8066]" />
              <span className="hidden sm:inline font-medium">7 Pillars</span>
            </button>

            {/* Content Rules Spec button */}
            <button
              onClick={() => setIsRulesModalOpen(true)}
              className="p-2 rounded-xl bg-[#1D2032] border border-[#303348] hover:border-[#8067FF] text-[#A9A8BA] hover:text-[#F6F4FF] transition-colors flex items-center gap-1.5 text-xs"
              title="Master Lesson Content Rules"
            >
              <BookOpen className="w-4 h-4 text-[#54D6C3]" />
              <span className="hidden sm:inline font-medium">Rules</span>
            </button>

            {/* Camera / Posture toggle */}
            <button
              onClick={() => setIsVisionActive(!isVisionActive)}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs ${
                isVisionActive
                  ? 'bg-[#8067FF]/20 border-[#8067FF] text-[#8067FF]'
                  : 'bg-[#1D2032] border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
              }`}
              title="Toggle Live Camera Posture Check"
            >
              {isVisionActive ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              <span className="hidden sm:inline font-medium">Camera</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#A9A8BA] hover:text-[#F6F4FF] hover:bg-[#1D2032] transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Progress Track (Steps Bar) */}
        <div className="w-full bg-[#0D0E17] px-5 py-2.5 border-b border-[#303348] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-[#54D6C3] font-bold">
              Step {currentStepIndex + 1} of {lesson.steps.length}
            </span>
            <span className="text-[#303348]">|</span>
            <span
              className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
              style={{ color: badgeInfo.color, backgroundColor: badgeInfo.bg }}
            >
              {badgeInfo.label}
            </span>
          </div>

          <div className="flex-1 max-w-md h-2 rounded-full bg-[#1D2032] overflow-hidden border border-[#303348]">
            <div
              className="h-full bg-gradient-to-r from-[#8067FF] via-[#54D6C3] to-[#FF8066] transition-all duration-300"
              style={{
                width: `${((currentStepIndex + 1) / lesson.steps.length) * 100}%`,
              }}
            />
          </div>

          <div className="text-xs font-mono text-[#F4BB55] font-bold flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>+{lesson.xpReward} XP</span>
          </div>
        </div>

        {/* 7 Pillars Drawer (Collapsible) */}
        {isPillarsOpen && (
          <div className="px-5 py-3 bg-[#111320] border-b border-[#303348] grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs animate-in fade-in duration-200">
            <div className="p-2 rounded-lg bg-[#151725] border border-[#303348]">
              <span className="font-bold text-[#8067FF] flex items-center gap-1 mb-1">
                <Hand className="w-3 h-3" /> Hands (Tech)
              </span>
              <p className="text-[11px] text-[#A9A8BA] line-clamp-2">
                {lesson.pedagogicalPillars.hands}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-[#151725] border border-[#303348]">
              <span className="font-bold text-[#54D6C3] flex items-center gap-1 mb-1">
                <Brain className="w-3 h-3" /> Brain (Theory)
              </span>
              <p className="text-[11px] text-[#A9A8BA] line-clamp-2">
                {lesson.pedagogicalPillars.brain}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-[#151725] border border-[#303348]">
              <span className="font-bold text-[#2BD2FF] flex items-center gap-1 mb-1">
                <Radio className="w-3 h-3" /> Ears (Training)
              </span>
              <p className="text-[11px] text-[#A9A8BA] line-clamp-2">
                {lesson.pedagogicalPillars.ears}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-[#151725] border border-[#303348]">
              <span className="font-bold text-[#FF5C93] flex items-center gap-1 mb-1">
                <Heart className="w-3 h-3" /> Heart (Feel)
              </span>
              <p className="text-[11px] text-[#A9A8BA] line-clamp-2">
                {lesson.pedagogicalPillars.heart}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-[#151725] border border-[#303348]">
              <span className="font-bold text-[#FBBF24] flex items-center gap-1 mb-1">
                <Music className="w-3 h-3" /> Repertoire
              </span>
              <p className="text-[11px] text-[#A9A8BA] line-clamp-2">
                {lesson.pedagogicalPillars.repertoire}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-[#151725] border border-[#303348]">
              <span className="font-bold text-[#C084FC] flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3" /> Creativity
              </span>
              <p className="text-[11px] text-[#A9A8BA] line-clamp-2">
                {lesson.pedagogicalPillars.creativity}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-[#151725] border border-[#303348]">
              <span className="font-bold text-[#FB7185] flex items-center gap-1 mb-1">
                <Activity className="w-3 h-3" /> Performance
              </span>
              <p className="text-[11px] text-[#A9A8BA] line-clamp-2">
                {lesson.pedagogicalPillars.performance}
              </p>
            </div>
          </div>
        )}

        {/* Main Interactive Stage Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          {/* VIBE Speech & Guidance Card */}
          <div className="rounded-2xl bg-gradient-to-r from-[#1D2032] to-[#151725] border border-[#8067FF]/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4 shadow-lg relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#8067FF]/20 border border-[#8067FF] flex items-center justify-center shrink-0 text-[#8067FF] shadow-[0_0_12px_rgba(128,103,255,0.4)]">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#8067FF] uppercase tracking-wider">
                    Vibe Teacher
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#54D6C3]/20 text-[#54D6C3] font-mono font-bold">
                    Active Audio Coach
                  </span>
                </div>
                <button
                  onClick={() => SpeechCoach.speak(currentStep.vibeDialogue)}
                  className="p-1 rounded-lg text-[#A9A8BA] hover:text-[#8067FF] transition-colors"
                  title="Re-speak dialogue"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#F6F4FF]">
                {currentStep.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#E2E1EC] leading-relaxed">
                "{currentStep.vibeDialogue}"
              </p>

              {currentStep.vibeInstruction && (
                <div className="mt-2 p-2.5 rounded-xl bg-[#0D0E17]/60 border border-[#303348] text-xs text-[#54D6C3] flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 shrink-0 text-[#F4BB55]" />
                  <span>{currentStep.vibeInstruction}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Content Views depending on Step Type */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Center Area (Fretboard / Exercise / Quiz) */}
            <div className={`${isVisionActive ? 'lg:col-span-2' : 'lg:col-span-3'} flex flex-col gap-5`}>
              {/* Audio & Demonstration Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayStepAudio}
                    disabled={isPlayingAudio}
                    className="px-4 py-2 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isPlayingAudio ? 'Listening...' : 'Hear Vibe Demo'}</span>
                  </button>

                  {/* Finger placement guide badge */}
                  {currentStep.fingerPlacement && (
                    <span className="px-3 py-1 rounded-lg bg-[#FF8066]/20 border border-[#FF8066]/40 text-[#FF8066] text-xs font-bold font-mono">
                      Finger {currentStep.fingerPlacement.finger} → String{' '}
                      {6 - currentStep.fingerPlacement.stringIndex} (Fret {currentStep.fingerPlacement.fret})
                    </span>
                  )}
                </div>

                {/* Finger Legend Reminder */}
                <div className="flex items-center gap-3 text-[11px] text-[#A9A8BA]">
                  <span className="hidden sm:inline">Left Hand:</span>
                  <span className="font-mono text-[#F6F4FF]">1=Index</span>
                  <span className="font-mono text-[#F6F4FF]">2=Mid</span>
                  <span className="font-mono text-[#F6F4FF]">3=Ring</span>
                  <span className="font-mono text-[#F6F4FF]">4=Pinky</span>
                </div>
              </div>

              {/* Interactive Fretboard Stage */}
              <MasterGuitarFretboard
                chordVoicing={currentStep.chordVoicing}
                activeFingerPlacement={currentStep.fingerPlacement}
                onStringPluck={handleFretboardPluck}
                interactive={true}
              />

              {/* Controlled Exercise Reps Counter (If step requires reps) */}
              {currentStep.type === 'CONTROLLED_EXERCISE' && (
                <div className="p-4 rounded-xl bg-[#151725] border border-[#54D6C3]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleToggleMetronome}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white transition-all ${
                        isMetronomeActive ? 'bg-[#FF5C93]' : 'bg-[#54D6C3] text-[#0D0E17]'
                      }`}
                    >
                      {isMetronomeActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>
                    <div>
                      <h4 className="text-sm font-bold text-[#F6F4FF]">
                        Metronome Groove ({currentStep.tempoBpm || 70} BPM)
                      </h4>
                      <p className="text-xs text-[#A9A8BA]">
                        Sync your strokes to the wooden beat click
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Visual 4-beat pulse */}
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2, 3].map((b) => (
                        <div
                          key={b}
                          className={`w-3.5 h-3.5 rounded-full transition-all duration-100 ${
                            isMetronomeActive && metronomeBeat === b
                              ? 'bg-[#54D6C3] scale-125 shadow-[0_0_8px_#54D6C3]'
                              : 'bg-[#303348]'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-[#0D0E17] border border-[#303348] text-center">
                      <span className="text-[10px] text-[#A9A8BA] block uppercase">Reps</span>
                      <span className="text-base font-bold font-mono text-[#54D6C3]">
                        {exerciseRepsDone} / {currentStep.exerciseRepsRequired || 8}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mini Challenge Quiz Widget (If step has quiz) */}
              {currentStep.miniChallenge && (
                <div className="p-5 rounded-2xl bg-[#1D2032] border border-[#FBBF24]/40 flex flex-col gap-4 shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FBBF24]">
                    <HelpCircle className="w-4 h-4" />
                    <span>VIBE MINI CHALLENGE</span>
                  </div>

                  <p className="text-sm font-bold text-[#F6F4FF]">
                    {currentStep.miniChallenge.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentStep.miniChallenge.options.map((opt, idx) => {
                      const isSelected = selectedQuizOption === idx;
                      const isCorrect = idx === currentStep.miniChallenge!.correctIndex;

                      let btnStyle = 'bg-[#151725] border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]';
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-[#54D6C3]/20 border-[#54D6C3] text-[#54D6C3] font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-[#FB7185]/20 border-[#FB7185] text-[#FB7185]';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-[#8067FF]/20 border-[#8067FF] text-[#8067FF] font-bold';
                      }

                      return (
                        <button
                          key={idx}
                          disabled={quizSubmitted}
                          onClick={() => setSelectedQuizOption(idx)}
                          className={`p-3 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                        >
                          <span className="font-mono mr-2 font-bold opacity-60">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      disabled={selectedQuizOption === null}
                      onClick={() => {
                        setQuizSubmitted(true);
                        const isCorrect = selectedQuizOption === currentStep.miniChallenge!.correctIndex;
                        SpeechCoach.speak(
                          isCorrect ? 'Outstanding! That is correct!' : 'Not quite. Check the explanation below!'
                        );
                      }}
                      className="self-end px-5 py-2 rounded-xl bg-[#FBBF24] hover:bg-[#e5ac1f] disabled:opacity-40 text-[#0D0E17] font-bold text-xs transition-colors shadow-md"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348] text-xs text-[#E2E1EC] flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#54D6C3] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#F6F4FF]">Explanation: </span>
                        <span>{currentStep.miniChallenge.explanation}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mastery Celebration Banner (If on mastery step) */}
              {currentStep.type === 'MASTERY' && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1D2032] via-[#151725] to-[#0D0E17] border-2 border-[#7EE787] flex flex-col items-center text-center gap-4 shadow-2xl relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-[#7EE787]/20 border-2 border-[#7EE787] flex items-center justify-center text-[#7EE787] shadow-[0_0_20px_#7EE787]">
                    <Award className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-[#F6F4FF]">
                      Lesson Conquered!
                    </h3>
                    <p className="text-xs text-[#A9A8BA] mt-1 max-w-md">
                      You demonstrated correct finger curvature, clean intonation, and rhythmic synchrony.
                    </p>
                  </div>

                  {/* 3 Stars Award */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        className="w-7 h-7 text-[#FBBF24] fill-current drop-shadow-[0_0_8px_#FBBF24]"
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-[#7EE787] font-bold">Accuracy: 95%</span>
                    <span className="text-[#303348]">|</span>
                    <span className="text-[#FBBF24] font-bold">+{lesson.xpReward} XP Gained</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Split Area: Live Camera Vision Monitor */}
            {isVisionActive && (
              <div className="lg:col-span-1 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs border-b border-[#303348] pb-2">
                  <span className="font-bold text-[#8067FF] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Vision Posture Monitor</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#54D6C3] px-2 py-0.5 rounded bg-[#54D6C3]/20">
                    60 FPS CV
                  </span>
                </div>

                <div className="w-full h-64 rounded-xl overflow-hidden border border-[#303348] shadow-lg">
                  <VisionMonitor
                    instrument="guitar"
                    isActive={isVisionActive}
                    onFeedbackUpdate={(fb) => {
                      setPostureFeedback(fb);
                      setAccuracyScore(fb.postureScore);
                    }}
                  />
                </div>

                {/* Target Posture Guidance */}
                {currentStep.poseTarget && (
                  <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348] text-xs flex flex-col gap-1.5">
                    <span className="font-bold text-[#F4BB55] uppercase text-[10px] tracking-wider">
                      Target Check: {currentStep.poseTarget.checkType.replace('_', ' ')}
                    </span>
                    <p className="text-[#A9A8BA] text-[11px] leading-relaxed">
                      {currentStep.poseTarget.guidance}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation Control Bar */}
        <div className="px-5 py-4 border-t border-[#303348] bg-[#111320] flex items-center justify-between gap-4">
          <button
            onClick={handlePrevStep}
            disabled={isFirstStep}
            className="px-4 py-2.5 rounded-xl border border-[#303348] hover:border-[#8067FF] disabled:opacity-30 text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => SpeechCoach.speak(currentStep.vibeDialogue)}
              className="px-3.5 py-2 rounded-xl bg-[#1D2032] border border-[#303348] hover:border-[#8067FF] text-[#A9A8BA] hover:text-[#F6F4FF] text-xs flex items-center gap-1.5 transition-colors"
              title="Repeat instructions"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Retry Audio</span>
            </button>

            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8067FF] to-[#6952E6] hover:brightness-110 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#8067FF]/25 transition-all"
            >
              <span>{isLastStep ? 'Complete Lesson' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MASTER CONTENT RULES MODAL */}
      {isRulesModalOpen && (
        <div className="fixed inset-0 z-60 bg-[#0D0E17]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#151725] border border-[#303348] rounded-2xl p-6 flex flex-col gap-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#303348] pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#54D6C3]" />
                <h3 className="text-base font-bold text-[#F6F4FF]">
                  Master Lesson Content Rules Specification
                </h3>
              </div>
              <button
                onClick={() => setIsRulesModalOpen(false)}
                className="p-1 rounded-lg text-[#A9A8BA] hover:text-[#F6F4FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs divide-y divide-[#303348]">
              <div className="pt-2">
                <span className="font-bold text-[#54D6C3] block mb-0.5">WHAT am I learning?</span>
                <p className="text-[#A9A8BA]">{lesson.contentRules.whatAmILearning}</p>
              </div>
              <div className="pt-2">
                <span className="font-bold text-[#8067FF] block mb-0.5">WHY am I learning it?</span>
                <p className="text-[#A9A8BA]">{lesson.contentRules.whyAmILearningIt}</p>
              </div>
              <div className="pt-2">
                <span className="font-bold text-[#2BD2FF] block mb-0.5">WHAT does it look like?</span>
                <p className="text-[#A9A8BA]">{lesson.contentRules.whatDoesItLookLike}</p>
              </div>
              <div className="pt-2">
                <span className="font-bold text-[#FF8066] block mb-0.5">WHAT does it sound like?</span>
                <p className="text-[#A9A8BA]">{lesson.contentRules.whatDoesItSoundLike}</p>
              </div>
              <div className="pt-2">
                <span className="font-bold text-[#F4BB55] block mb-0.5">HOW do I physically do it?</span>
                <p className="text-[#A9A8BA]">{lesson.contentRules.howDoIPhysicallyDoIt}</p>
              </div>
              <div className="pt-2">
                <span className="font-bold text-[#7EE787] block mb-0.5">WHAT should my left hand do?</span>
                <p className="text-[#A9A8BA]">{lesson.contentRules.whatShouldMyLeftHandDo}</p>
              </div>
              <div className="pt-2">
                <span className="font-bold text-[#7EE787] block mb-0.5">WHAT should my right hand do?</span>
                <p className="text-[#A9A8BA]">{lesson.contentRules.whatShouldMyRightHandDo}</p>
              </div>
              <div className="pt-2">
                <span className="font-bold text-[#FF5C93] block mb-0.5">WHAT strings/frets/fingers are involved?</span>
                <p className="text-[#A9A8BA]">{lesson.contentRules.whatStringsFretsFingersAreInvolved}</p>
              </div>
              <div className="pt-2">
                <span className="font-bold text-[#FB7185] block mb-0.5">WHAT mistakes should I avoid?</span>
                <ul className="list-disc list-inside text-[#A9A8BA] space-y-1">
                  {lesson.contentRules.whatMistakesShouldIAvoid.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <span className="font-bold text-[#8067FF] block mb-0.5">HOW does Vibe check me?</span>
                <p className="text-[#A9A8BA]">{lesson.contentRules.howDoesVibeCheckMe}</p>
              </div>
              <div className="pt-2">
                <span className="font-bold text-[#54D6C3] block mb-0.5">WHERE is it used musically?</span>
                <p className="text-[#A9A8BA]">{lesson.contentRules.whereIsItUsedMusically}</p>
              </div>
              <div className="pt-2">
                <span className="font-bold text-[#FBBF24] block mb-0.5">HOW do I know I mastered it?</span>
                <p className="text-[#A9A8BA]">{lesson.contentRules.howDoIKnowIMasteredIt}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
