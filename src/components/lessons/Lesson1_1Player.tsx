/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GuitarProgressService } from '../../services/guitarProgressService';
import { VibexAudioEngine } from '../../services/audioEngine';
import { SpeechCoach } from '../../services/speechCoach';
import { VibeAvatar } from './VibeAvatar';
import { VibexLessonVideoPlayer } from './VibexLessonVideoPlayer';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Award,
  Zap,
  HelpCircle,
  X,
  Music,
  ChevronRight,
  Check,
  Shield,
  Activity,
} from 'lucide-react';

interface Lesson1_1PlayerProps {
  onClose: () => void;
  onComplete: () => void;
  onNavigateToPractice?: (skillName?: string) => void;
}

type LessonStage =
  | 'intro'
  | 'discover'
  | 'guitar_types'
  | 'compare'
  | 'string_vibration'
  | 'hear_it'
  | 'scale_length'
  | 'mini_game'
  | 'quiz'
  | 'complete';

const STAGES: { id: LessonStage; label: string }[] = [
  { id: 'intro', label: 'Intro' },
  { id: 'discover', label: 'Discover' },
  { id: 'guitar_types', label: 'Guitar Types' },
  { id: 'compare', label: 'Compare' },
  { id: 'string_vibration', label: 'Vibration' },
  { id: 'hear_it', label: 'Hear It' },
  { id: 'scale_length', label: 'Scale Length' },
  { id: 'mini_game', label: 'Mini Game' },
  { id: 'quiz', label: 'Challenge' },
  { id: 'complete', label: 'Victory' },
];

export const Lesson1_1Player: React.FC<Lesson1_1PlayerProps> = ({
  onClose,
  onComplete,
  onNavigateToPractice,
}) => {
  const [currentStage, setCurrentStage] = useState<LessonStage>('intro');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);

  // Stage 2: Discover state
  const [activePart, setActivePart] = useState<'headstock' | 'neck' | 'fretboard' | 'strings' | 'body'>('body');
  const [discoveredParts, setDiscoveredParts] = useState<Set<string>>(new Set(['body']));

  // Stage 3: Guitar types state
  const [selectedGuitarType, setSelectedGuitarType] = useState<'acoustic' | 'electric' | 'classical'>('acoustic');

  // Stage 4: Interactive compare state
  const [compareStep, setCompareStep] = useState<number>(0);
  const [compareFeedback, setCompareFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Stage 5: String vibration simulator state
  const [isPlucked, setIsPlucked] = useState<boolean>(false);
  const [pluckCount, setPluckCount] = useState<number>(0);

  // Stage 6: Audio timbres state
  const [playingTimbre, setPlayingTimbre] = useState<'acoustic' | 'electric' | 'classical' | null>(null);

  // Stage 8: Mini Game state
  const [miniGameIdx, setMiniGameIdx] = useState<number>(0);
  const [miniGameFeedback, setMiniGameFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Stage 9: Final Quiz state
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<(boolean | null)[]>([null, null, null, null, null]);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  const progressService = GuitarProgressService.getInstance();
  const audioEngine = VibexAudioEngine.getInstance();

  const stageIndex = STAGES.findIndex((s) => s.id === currentStage);

  // Spoken teacher guidance for each stage
  useEffect(() => {
    if (!voiceEnabled) return;

    switch (currentStage) {
      case 'intro':
        SpeechCoach.speak('Before we play our first note, let us understand the instrument in your hands.');
        break;
      case 'discover':
        SpeechCoach.speak('This is a guitar. Tap each part to discover how it contributes to the instrument.');
        break;
      case 'guitar_types':
        SpeechCoach.speak('Guitars come in three primary families: Acoustic, Electric, and Classical.');
        break;
      case 'compare':
        SpeechCoach.speak('Let us test what you noticed. Which guitar belongs to each characteristic?');
        break;
      case 'string_vibration':
        SpeechCoach.speak('When you pluck a guitar string, it vibrates back and forth rapidly. That vibration creates sound.');
        break;
      case 'hear_it':
        SpeechCoach.speak('Listen closely to how string materials and amplification shape the voice of each guitar.');
        break;
      case 'scale_length':
        SpeechCoach.speak('Scale length is the vibrating length of the string between the nut and the bridge.');
        break;
      case 'mini_game':
        SpeechCoach.speak('Time for a quick interactive challenge to test your memory.');
        break;
      case 'quiz':
        SpeechCoach.speak('Final challenge! Complete these five questions to finish your first guitar level.');
        break;
      case 'complete':
        SpeechCoach.speak('Congratulations! You have completed Lesson 1.1. Welcome to the world of guitar!');
        audioEngine.playCelebrationChime();
        break;
    }
  }, [currentStage, voiceEnabled]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      SpeechCoach.cancel();
    };
  }, []);

  // Handle stage completion
  const handleNextStage = () => {
    if (stageIndex < STAGES.length - 1) {
      const next = STAGES[stageIndex + 1].id;
      setCurrentStage(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Pluck vibration helper
  const handlePluckString = (freq: number = 196.0) => {
    setIsPlucked(true);
    setPluckCount((prev) => prev + 1);
    audioEngine.playGuitarTimbre('acoustic', freq, 1500);
    setTimeout(() => {
      setIsPlucked(false);
    }, 1200);
  };

  // Play timbre sample helper
  const handlePlayTimbre = (type: 'acoustic' | 'electric' | 'classical') => {
    setPlayingTimbre(type);
    const freq = type === 'electric' ? 246.94 : type === 'classical' ? 146.83 : 196.0;
    audioEngine.playGuitarTimbre(type, freq, 1800);
    setTimeout(() => {
      setPlayingTimbre(null);
    }, 1800);
  };

  // Stage 4 Compare Questions
  const compareQuestions = [
    {
      prompt: 'Which guitar commonly uses nylon strings that feel soft under the fingers?',
      correct: 'classical' as const,
      explanation: 'Classical guitars use nylon strings for treble notes, giving them a warm, mellow tone that is gentle on beginner fingertips.',
    },
    {
      prompt: 'Which guitar relies on magnetic pickups and an external amplifier to project its volume?',
      correct: 'electric' as const,
      explanation: 'Electric guitars have solid or semi-hollow bodies and require electromagnetic pickups to translate string vibrations into sound.',
    },
    {
      prompt: 'Which guitar projects naturally into the room via its hollow wooden soundboard cavity?',
      correct: 'acoustic' as const,
      explanation: 'Acoustic guitars use their wooden soundboard and soundhole to naturally amplify string vibrations without plugging in.',
    },
  ];

  // Stage 8 Mini Game Questions
  const miniGameQuestions = [
    {
      question: 'Tap the part of the guitar that physically vibrates when played:',
      options: [
        { label: 'Strings', isCorrect: true },
        { label: 'Tuning Pegs', isCorrect: false },
        { label: 'Headstock', isCorrect: false },
        { label: 'Strap Button', isCorrect: false },
      ],
      correctExplanation: 'The strings are what we physically pluck or strum to initiate vibration!',
    },
    {
      question: 'Which guitar family relies on electromagnetic pickups to send signal to an amplifier?',
      options: [
        { label: 'Electric Guitar', isCorrect: true },
        { label: 'Classical Guitar', isCorrect: false },
        { label: 'Acoustic Dreadnought', isCorrect: false },
      ],
      correctExplanation: 'Electric guitars use magnetic wire-wound pickups to capture vibrating steel strings!',
    },
    {
      question: 'What material are Classical guitar strings traditionally made of?',
      options: [
        { label: 'Nylon', isCorrect: true },
        { label: 'Steel Wire', isCorrect: false },
        { label: 'Brass Alloy', isCorrect: false },
      ],
      correctExplanation: 'Nylon strings produce a warm, round, intimate tone ideal for classical & Spanish music.',
    },
    {
      question: 'What happens immediately when a guitar string is plucked?',
      options: [
        { label: 'It oscillates and vibrates', isCorrect: true },
        { label: 'It changes color', isCorrect: false },
        { label: 'It stops making sound', isCorrect: false },
      ],
      correctExplanation: 'Rapid mechanical vibration displaces surrounding air or magnetic fields to create sound waves!',
    },
  ];

  // Stage 9 Final Quiz Questions
  const quizQuestions = [
    {
      question: '1. Which part of the guitar vibrates to produce the initial sound waves?',
      options: ['Strings', 'Tuning Pegs', 'Pickguard', 'Truss Rod'],
      correctIdx: 0,
      explanation: 'Strings are the vibrating sound generator of the entire instrument.',
    },
    {
      question: '2. Which guitar type is most commonly strung with nylon strings?',
      options: ['Classical Guitar', 'Heavy Metal Electric', 'Steel-String Dreadnought', 'Archtop Jazz Guitar'],
      correctIdx: 0,
      explanation: 'Classical guitars use nylon strings for lower tension and a warm, mellow tone.',
    },
    {
      question: '3. How does a solid-body electric guitar project loud sound?',
      options: [
        'Electromagnetic pickups convert string vibrations into an electrical signal sent to an amplifier',
        'A hollow wooden cavity projects sound naturally',
        'Strings are made of louder brass alloy',
        'A small microphone is glued inside the neck',
      ],
      correctIdx: 0,
      explanation: 'Pickups detect steel string movement and send the signal to an external speaker amplifier.',
    },
    {
      question: '4. What is a guitar’s "scale length"?',
      options: [
        'The vibrating length of the string between the nut and the bridge',
        'The total length from headstock to strap button',
        'The width of the neck at the 12th fret',
        'The distance between the 1st and 6th string',
      ],
      correctIdx: 0,
      explanation: 'Scale length is the exact distance between the nut and bridge where the string vibrates freely.',
    },
    {
      question: '5. When you pluck a guitar string, how does it begin producing sound?',
      options: [
        'It vibrates back and forth rapidly',
        'It heats up the metal fret wires',
        'It rotates in a circle around the bridge',
        'It alters the tension on the strap',
      ],
      correctIdx: 0,
      explanation: 'Vibration is the root source of pitch and acoustic sound projection.',
    },
  ];

  // Finish lesson and store progress
  const handleFinalizeLesson = () => {
    progressService.markLessonCompleted('lesson_1_1');
    progressService.unlockAchievement('first_step');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0E17] text-[#F6F4FF] overflow-y-auto flex flex-col justify-between selection:bg-[#8067FF] selection:text-white">
      {/* 1. Game Level Top Header */}
      <div className="sticky top-0 z-30 bg-[#151725]/95 backdrop-blur-md border-b border-[#303348] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        {/* Left: Exit & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0D0E17] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] hover:border-[#8067FF] transition-all flex items-center gap-1.5 text-xs font-mono font-bold"
            title="Exit Level"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit Level</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#8067FF]/20 text-[#8067FF] text-[10px] font-mono font-bold uppercase tracking-wider">
                Level 1.1
              </span>
              <span className="text-[11px] text-[#A9A8BA] hidden md:inline font-mono">
                Foundation · Concept
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-extrabold text-[#F6F4FF] tracking-tight">
              What Is a Guitar?
            </h1>
          </div>
        </div>

        {/* Center: Stage Progress Dots */}
        <div className="hidden lg:flex items-center gap-1.5 bg-[#0D0E17] px-3 py-1.5 rounded-full border border-[#303348]">
          {STAGES.map((s, idx) => {
            const isDone = idx < stageIndex;
            const isCurrent = idx === stageIndex;
            return (
              <div
                key={s.id}
                className="flex items-center"
                title={`${idx + 1}. ${s.label}`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isDone
                      ? 'bg-[#45D483]'
                      : isCurrent
                      ? 'bg-[#8067FF] ring-2 ring-[#8067FF]/40 scale-125'
                      : 'bg-[#303348]'
                  }`}
                />
                {idx < STAGES.length - 1 && (
                  <div
                    className={`w-2.5 h-0.5 transition-all ${
                      isDone ? 'bg-[#45D483]/60' : 'bg-[#303348]/60'
                    }`}
                  />
                )}
              </div>
            );
          })}
          <span className="ml-2 text-[10px] font-mono font-bold text-[#A9A8BA]">
            {stageIndex + 1}/{STAGES.length}
          </span>
        </div>

        {/* Right: Voice Coach & Progress */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (voiceEnabled) SpeechCoach.cancel();
              setVoiceEnabled(!voiceEnabled);
            }}
            className={`p-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              voiceEnabled
                ? 'bg-[#8067FF]/20 border-[#8067FF] text-[#A99BFF]'
                : 'bg-[#0D0E17] border-[#303348] text-[#A9A8BA]'
            }`}
            title={voiceEnabled ? 'Mute Vibe Voice' : 'Enable Vibe Voice'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-[#A99BFF]" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">Vibe Voice</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Stage Canvas */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-center">
        {/* ======================================================== */}
        {/* STAGE 1: INTRO */}
        {/* ======================================================== */}
        {currentStage === 'intro' && (
          <div className="flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#8067FF] to-[#FF8066] p-0.5 shadow-2xl shadow-[#8067FF]/30">
              <div className="w-full h-full rounded-[22px] bg-[#151725] flex items-center justify-center">
                <Music className="w-10 h-10 text-[#FF8066]" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8067FF]/15 border border-[#8067FF]/30 text-[#A99BFF] text-xs font-mono font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FIRST CONTACT · LEVEL 1.1</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#F6F4FF] tracking-tight">
                Meet the Guitar
              </h2>
            </div>

            {/* Vibe Mentor Box - Intro */}
            <div className="p-4 rounded-2xl bg-[#1D2032] border border-[#8067FF]/40 flex items-start gap-3.5 w-full max-w-2xl text-left shadow-lg">
              <VibeAvatar expression="happy" size="sm" />
              <div>
                <span className="text-[11px] font-mono font-bold text-[#A99BFF] block uppercase tracking-wider">
                  Vibe Coach
                </span>
                <p className="text-sm text-[#F6F4FF] mt-0.5 leading-relaxed">
                  "Before we pluck our first note or learn hand positions, let’s watch a quick introduction to the instrument you’re about to master."
                </p>
              </div>
            </div>

            {/* Video Demonstration */}
            <div className="w-full max-w-2xl mx-auto shadow-2xl shadow-[#8067FF]/10 rounded-2xl">
              <VibexLessonVideoPlayer 
                src="/assets/videos/guitar/lessons/lesson_1_1/lesson_1_1_intro.mp4" 
              />
            </div>

            {/* Stylized Guitar Hero Silhouette */}
            <div className="w-full max-w-md p-6 rounded-3xl bg-[#151725] border border-[#303348] relative overflow-hidden shadow-xl">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#8067FF]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-center py-4">
                <svg
                  viewBox="0 0 320 120"
                  className="w-full h-28 text-[#8067FF]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Guitar Body outline */}
                  <path
                    d="M30 60 C30 30, 70 20, 110 38 C130 46, 140 46, 150 40 C170 30, 210 35, 210 60 C210 85, 170 90, 150 80 C140 74, 130 74, 110 82 C70 100, 30 90, 30 60 Z"
                    fill="#1D2032"
                    stroke="#8067FF"
                    strokeWidth="2.5"
                  />
                  {/* Soundhole */}
                  <circle cx="160" cy="60" r="18" fill="#0D0E17" stroke="#FF8066" strokeWidth="2" />
                  {/* Bridge */}
                  <rect x="90" y="52" width="10" height="16" rx="2" fill="#54D6C3" />
                  {/* Neck */}
                  <rect x="210" y="54" width="80" height="12" fill="#1D2032" stroke="#303348" strokeWidth="1.5" />
                  {/* Headstock */}
                  <polygon points="290,52 315,48 315,72 290,68" fill="#8067FF" fillOpacity="0.4" stroke="#8067FF" strokeWidth="1.5" />
                  {/* Strings */}
                  <line x1="95" y1="56" x2="305" y2="56" stroke="#F6F4FF" strokeWidth="1" strokeOpacity="0.8" />
                  <line x1="95" y1="58" x2="305" y2="58" stroke="#F6F4FF" strokeWidth="1" strokeOpacity="0.8" />
                  <line x1="95" y1="60" x2="305" y2="60" stroke="#F6F4FF" strokeWidth="1" strokeOpacity="0.8" />
                  <line x1="95" y1="62" x2="305" y2="62" stroke="#F6F4FF" strokeWidth="1" strokeOpacity="0.8" />
                  <line x1="95" y1="64" x2="305" y2="64" stroke="#F6F4FF" strokeWidth="1" strokeOpacity="0.8" />
                </svg>
              </div>
              <div className="flex items-center justify-between text-xs text-[#A9A8BA] font-mono border-t border-[#303348] pt-3">
                <span className="flex items-center gap-1.5 text-[#54D6C3]">
                  <Check className="w-3.5 h-3.5" /> 6 Strings
                </span>
                <span>·</span>
                <span className="text-[#A99BFF]">Acoustic & Electric</span>
                <span>·</span>
                <span className="text-[#FF8066]">12-TET Tuning</span>
              </div>
            </div>

            {/* Vibe Mentor Box - Explains before interactive */}
            <div className="p-4 rounded-2xl bg-[#1D2032] border border-[#8067FF]/40 flex items-start gap-3.5 w-full max-w-2xl text-left shadow-lg">
              <VibeAvatar expression="talking" size="sm" />
              <div>
                <span className="text-[11px] font-mono font-bold text-[#A99BFF] block uppercase tracking-wider">
                  Vibe Coach
                </span>
                <p className="text-sm text-[#F6F4FF] mt-0.5 leading-relaxed">
                  "The guitar is one of the most expressive string instruments on earth. Let’s explore how its anatomy turns simple string vibrations into beautiful music."
                </p>
              </div>
            </div>

            <button
              onClick={handleNextStage}
              className="mt-2 px-8 py-3.5 rounded-2xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-sm flex items-center gap-2.5 shadow-xl shadow-[#8067FF]/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>Let's Begin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 2: DISCOVER (Interactive Guitar Anatomy Explorer) */}
        {/* ======================================================== */}
        {currentStage === 'discover' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF8066] uppercase tracking-wider block">
                Step 1 · Instrument Explorer
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F6F4FF] mt-1">
                Explore the Guitar Parts
              </h2>
              <p className="text-xs sm:text-sm text-[#A9A8BA] mt-1">
                Tap each glowing hotspot on the guitar to reveal what it does.
              </p>
            </div>

            {/* Interactive Guitar Diagram */}
            <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] relative flex flex-col items-center shadow-xl">
              {/* Hotspot buttons */}
              <div className="w-full flex items-center justify-center gap-2 flex-wrap mb-4">
                {(['headstock', 'neck', 'fretboard', 'strings', 'body'] as const).map((part) => {
                  const isExplored = discoveredParts.has(part);
                  const isSelected = activePart === part;
                  return (
                    <button
                      key={part}
                      onClick={() => {
                        setActivePart(part);
                        setDiscoveredParts((prev) => new Set([...prev, part]));
                        audioEngine.playInstrumentNote('guitar', 220, 200);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold capitalize transition-all border ${
                        isSelected
                          ? 'bg-[#8067FF] border-[#8067FF] text-white shadow-lg shadow-[#8067FF]/30 scale-105'
                          : isExplored
                          ? 'bg-[#0D0E17] border-[#45D483]/40 text-[#45D483]'
                          : 'bg-[#0D0E17] border-[#303348] text-[#A9A8BA] hover:border-[#8067FF]'
                      }`}
                    >
                      {part} {isExplored ? '✓' : '●'}
                    </button>
                  );
                })}
              </div>

              {/* Vector Guitar Hotspot View */}
              <div className="relative w-full max-w-xl h-44 bg-[#0D0E17] rounded-2xl border border-[#303348] p-4 flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 500 160"
                  className="w-full h-full select-none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Body */}
                  <path
                    d="M40 80 C40 35, 100 25, 160 55 C190 70, 210 70, 230 60 C260 45, 320 50, 320 80 C320 110, 260 115, 230 100 C210 90, 190 90, 160 105 C100 135, 40 125, 40 80 Z"
                    fill={activePart === 'body' ? '#8067FF' : '#1D2032'}
                    fillOpacity={activePart === 'body' ? 0.35 : 0.9}
                    stroke={activePart === 'body' ? '#8067FF' : '#303348'}
                    strokeWidth={activePart === 'body' ? 3 : 2}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => {
                      setActivePart('body');
                      setDiscoveredParts((prev) => new Set([...prev, 'body']));
                    }}
                  />

                  {/* Soundhole */}
                  <circle cx="230" cy="80" r="24" fill="#0D0E17" stroke="#FF8066" strokeWidth="2.5" />

                  {/* Neck */}
                  <rect
                    x="320"
                    y="72"
                    width="120"
                    height="16"
                    fill={activePart === 'neck' ? '#8067FF' : '#1D2032'}
                    fillOpacity={activePart === 'neck' ? 0.4 : 0.8}
                    stroke={activePart === 'neck' ? '#8067FF' : '#303348'}
                    strokeWidth={activePart === 'neck' ? 2.5 : 1.5}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => {
                      setActivePart('neck');
                      setDiscoveredParts((prev) => new Set([...prev, 'neck']));
                    }}
                  />

                  {/* Fretboard wires */}
                  {[340, 360, 380, 400, 420].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="72"
                      x2={x}
                      y2="88"
                      stroke={activePart === 'fretboard' ? '#54D6C3' : '#303348'}
                      strokeWidth={activePart === 'fretboard' ? 2 : 1}
                    />
                  ))}

                  {/* Headstock */}
                  <polygon
                    points="440,70 480,64 480,96 440,90"
                    fill={activePart === 'headstock' ? '#8067FF' : '#1D2032'}
                    fillOpacity={activePart === 'headstock' ? 0.5 : 0.8}
                    stroke={activePart === 'headstock' ? '#8067FF' : '#303348'}
                    strokeWidth={activePart === 'headstock' ? 2.5 : 1.5}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => {
                      setActivePart('headstock');
                      setDiscoveredParts((prev) => new Set([...prev, 'headstock']));
                    }}
                  />

                  {/* Strings */}
                  {[74, 76.5, 79, 81.5, 84, 86.5].map((y, idx) => (
                    <line
                      key={idx}
                      x1="130"
                      y1={y}
                      x2="465"
                      y2={y}
                      stroke={activePart === 'strings' ? '#FF8066' : '#F6F4FF'}
                      strokeOpacity={activePart === 'strings' ? 1 : 0.7}
                      strokeWidth={activePart === 'strings' ? 2 : 1}
                      className="cursor-pointer transition-all"
                      onClick={() => {
                        setActivePart('strings');
                        setDiscoveredParts((prev) => new Set([...prev, 'strings']));
                        handlePluckString(196);
                      }}
                    />
                  ))}
                </svg>

                {/* Hotspot Pulse Callouts */}
                <div className="absolute bottom-2 right-3 text-[10px] font-mono text-[#A9A8BA]">
                  Tap any part or use pills above
                </div>
              </div>

              {/* Selected Part Explanation Card */}
              <div className="w-full mt-4 p-4 rounded-2xl bg-[#0D0E17] border border-[#8067FF]/30 flex flex-col gap-1.5 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FF8066] uppercase">
                    {activePart}
                  </span>
                  <span className="text-[10px] font-mono text-[#54D6C3] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Explored
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#F6F4FF]">
                  {activePart === 'body' && 'The Guitar Body'}
                  {activePart === 'neck' && 'The Guitar Neck'}
                  {activePart === 'fretboard' && 'The Fretboard (Fingerboard)'}
                  {activePart === 'strings' && 'The 6 Strings'}
                  {activePart === 'headstock' && 'The Headstock & Tuning Pegs'}
                </h4>
                <p className="text-xs text-[#A9A8BA] leading-relaxed">
                  {activePart === 'body' &&
                    'The body supports the instrument’s structure. On an acoustic guitar, its hollow wooden soundboard naturally projects vibrations into the room.'}
                  {activePart === 'neck' &&
                    'Connects the body to the headstock and withstands the tension of 6 tightly tuned steel or nylon strings.'}
                  {activePart === 'fretboard' &&
                    'The flat wooden surface with metal fret wires where your left hand presses to shorten vibrating string length and change pitches.'}
                  {activePart === 'strings' &&
                    'The 6 strings (Low E to High E) are what we physically pluck, strum, or pick to generate sound waves.'}
                  {activePart === 'headstock' &&
                    'Located at the top of the neck, it holds the 6 tuning machine pegs that turn to tighten or loosen each string to exact pitch.'}
                </p>
              </div>

              {/* Progress counter */}
              <div className="w-full flex items-center justify-between mt-4 pt-3 border-t border-[#303348] text-xs font-mono text-[#A9A8BA]">
                <span>Parts Explored: {discoveredParts.size} of 5</span>
                <span className="text-[#54D6C3]">
                  {discoveredParts.size === 5 ? '✓ All parts explored!' : 'Explore all to continue'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStage('intro')}
                className="px-4 py-2.5 rounded-xl border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-mono"
              >
                Back
              </button>
              <button
                onClick={handleNextStage}
                className="px-7 py-3 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#8067FF]/25 transition-all hover:scale-102"
              >
                <span>Continue: Guitar Types</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 3: GUITAR TYPES */}
        {/* ======================================================== */}
        {currentStage === 'guitar_types' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono font-bold text-[#54D6C3] uppercase tracking-wider block">
                Step 2 · Guitar Families
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F6F4FF] mt-1">
                The 3 Major Guitar Types
              </h2>
              <p className="text-xs sm:text-sm text-[#A9A8BA] mt-1">
                Guitars come in three primary families. Select each to discover how they differ in strings, body, and sound.
              </p>
            </div>

            {/* 3 Interactive Guitar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Acoustic */}
              <div
                onClick={() => {
                  setSelectedGuitarType('acoustic');
                  handlePlayTimbre('acoustic');
                }}
                className={`p-5 rounded-2xl border cursor-pointer flex flex-col justify-between gap-4 transition-all ${
                  selectedGuitarType === 'acoustic'
                    ? 'bg-[#151725] border-[#FF8066] shadow-xl shadow-[#FF8066]/15 scale-[1.02]'
                    : 'bg-[#0D0E17] border-[#303348] hover:border-[#303348]/90 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#FF8066] uppercase">
                      Family 1
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF8066]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F6F4FF]">Acoustic Guitar</h3>
                  <p className="text-xs text-[#A9A8BA] mt-1.5 leading-relaxed">
                    Uses steel strings and a hollow wooden body soundboard to naturally project bright, resonant volume into the room.
                  </p>
                </div>

                <div className="space-y-1.5 text-[11px] font-mono border-t border-[#303348] pt-3 text-[#A9A8BA]">
                  <div className="flex justify-between">
                    <span>Strings:</span>
                    <span className="text-[#F6F4FF] font-bold">Steel Strings</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amplification:</span>
                    <span className="text-[#54D6C3] font-bold">Natural Body</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Styles:</span>
                    <span className="text-[#A99BFF]">Folk, Pop, Rock</span>
                  </div>
                </div>
              </div>

              {/* Electric */}
              <div
                onClick={() => {
                  setSelectedGuitarType('electric');
                  handlePlayTimbre('electric');
                }}
                className={`p-5 rounded-2xl border cursor-pointer flex flex-col justify-between gap-4 transition-all ${
                  selectedGuitarType === 'electric'
                    ? 'bg-[#151725] border-[#8067FF] shadow-xl shadow-[#8067FF]/20 scale-[1.02]'
                    : 'bg-[#0D0E17] border-[#303348] hover:border-[#303348]/90 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#8067FF] uppercase">
                      Family 2
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8067FF]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F6F4FF]">Electric Guitar</h3>
                  <p className="text-xs text-[#A9A8BA] mt-1.5 leading-relaxed">
                    Has a solid body with electromagnetic pickups that convert steel string vibrations into an electrical signal sent to an amplifier.
                  </p>
                </div>

                <div className="space-y-1.5 text-[11px] font-mono border-t border-[#303348] pt-3 text-[#A9A8BA]">
                  <div className="flex justify-between">
                    <span>Strings:</span>
                    <span className="text-[#F6F4FF] font-bold">Nickel-Steel</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amplification:</span>
                    <span className="text-[#8067FF] font-bold">Pickups + Amp</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Styles:</span>
                    <span className="text-[#A99BFF]">Rock, Blues, Jazz</span>
                  </div>
                </div>
              </div>

              {/* Classical */}
              <div
                onClick={() => {
                  setSelectedGuitarType('classical');
                  handlePlayTimbre('classical');
                }}
                className={`p-5 rounded-2xl border cursor-pointer flex flex-col justify-between gap-4 transition-all ${
                  selectedGuitarType === 'classical'
                    ? 'bg-[#151725] border-[#54D6C3] shadow-xl shadow-[#54D6C3]/20 scale-[1.02]'
                    : 'bg-[#0D0E17] border-[#303348] hover:border-[#303348]/90 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#54D6C3] uppercase">
                      Family 3
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#54D6C3]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F6F4FF]">Classical Guitar</h3>
                  <p className="text-xs text-[#A9A8BA] mt-1.5 leading-relaxed">
                    Strung with nylon strings on a wider neck. Produces a warm, rounded, mellow tone that is gentle on beginner fingertips.
                  </p>
                </div>

                <div className="space-y-1.5 text-[11px] font-mono border-t border-[#303348] pt-3 text-[#A9A8BA]">
                  <div className="flex justify-between">
                    <span>Strings:</span>
                    <span className="text-[#54D6C3] font-bold">Nylon Strings</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amplification:</span>
                    <span className="text-[#54D6C3] font-bold">Natural Body</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Styles:</span>
                    <span className="text-[#A99BFF]">Classical, Spanish</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Preview Banner */}
            <div className="p-4 rounded-2xl bg-[#151725] border border-[#303348] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePlayTimbre(selectedGuitarType)}
                  className="px-3.5 py-2 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-mono font-bold flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Hear {selectedGuitarType.toUpperCase()} Note</span>
                </button>
                <span className="text-[#A9A8BA] hidden sm:inline">
                  Synthesized in real-time via Web Audio API
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#54D6C3]">
                {playingTimbre ? 'Playing...' : 'Ready'}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStage('discover')}
                className="px-4 py-2.5 rounded-xl border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-mono"
              >
                Back
              </button>
              <button
                onClick={handleNextStage}
                className="px-7 py-3 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#8067FF]/25 transition-all hover:scale-102"
              >
                <span>Continue: Compare Them</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 4: INTERACTIVE COMPARISON */}
        {/* ======================================================== */}
        {currentStage === 'compare' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono font-bold text-[#A99BFF] uppercase tracking-wider block">
                Step 3 · Quick Match
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F6F4FF] mt-1">
                Spot the Difference
              </h2>
              <p className="text-xs sm:text-sm text-[#A9A8BA] mt-1">
                Test your understanding by matching each characteristic to the right guitar.
              </p>
            </div>

            {/* Question Card */}
            <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#303348] pb-3 text-xs font-mono">
                <span className="text-[#FF8066]">Match {compareStep + 1} of {compareQuestions.length}</span>
                <span className="text-[#A9A8BA]">No heavy penalties · Learning mode</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#F6F4FF]">
                {compareQuestions[compareStep].prompt}
              </h3>

              {/* 3 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'acoustic', label: 'Acoustic Guitar' },
                  { id: 'electric', label: 'Electric Guitar' },
                  { id: 'classical', label: 'Classical Guitar' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      const isCorrect = opt.id === compareQuestions[compareStep].correct;
                      if (isCorrect) {
                        setCompareFeedback({
                          isCorrect: true,
                          text: `✓ Correct! ${compareQuestions[compareStep].explanation}`,
                        });
                        audioEngine.playGuitarTimbre('acoustic', 329.63, 600);
                      } else {
                        setCompareFeedback({
                          isCorrect: false,
                          text: 'Almost! Check the string and amplification type and try again.',
                        });
                      }
                    }}
                    className="p-4 rounded-2xl bg-[#0D0E17] border border-[#303348] hover:border-[#8067FF] text-left transition-all font-bold text-xs sm:text-sm text-[#F6F4FF] hover:bg-[#1D2032]"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Feedback Alert */}
              {compareFeedback && (
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed transition-all ${
                    compareFeedback.isCorrect
                      ? 'bg-[#45D483]/15 border-[#45D483] text-[#45D483]'
                      : 'bg-[#F4BB55]/15 border-[#F4BB55] text-[#F4BB55]'
                  }`}
                >
                  <p className="font-bold">{compareFeedback.text}</p>
                  {compareFeedback.isCorrect && (
                    <button
                      onClick={() => {
                        setCompareFeedback(null);
                        if (compareStep < compareQuestions.length - 1) {
                          setCompareStep((prev) => prev + 1);
                        } else {
                          handleNextStage();
                        }
                      }}
                      className="mt-3 px-4 py-2 rounded-xl bg-[#45D483] text-black font-extrabold text-xs flex items-center gap-1.5 shadow"
                    >
                      <span>
                        {compareStep < compareQuestions.length - 1 ? 'Next Question' : 'Continue to String Vibration'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStage('guitar_types')}
                className="px-4 py-2.5 rounded-xl border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-mono"
              >
                Back
              </button>
              <button
                onClick={handleNextStage}
                className="px-6 py-3 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center gap-2"
              >
                <span>Skip to Vibration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 5: HOW STRINGS MAKE SOUND (Vibration Physics) */}
        {/* ======================================================== */}
        {currentStage === 'string_vibration' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF8066] uppercase tracking-wider block">
                Step 4 · Physics of Sound
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F6F4FF] mt-1">
                How Strings Produce Sound
              </h2>
              <p className="text-xs sm:text-sm text-[#A9A8BA] mt-1">
                Pluck the string below to watch how mechanical vibration becomes the acoustic notes you hear.
              </p>
            </div>

            {/* Interactive String Pluck Simulator */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col items-center gap-6 shadow-xl relative overflow-hidden">
              {/* String Anchor Points */}
              <div className="w-full flex items-center justify-between text-xs font-mono text-[#A9A8BA]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8067FF]" />
                  <span className="font-bold text-[#F6F4FF]">The Nut (Neck End)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#F6F4FF]">The Bridge (Body End)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#54D6C3]" />
                </div>
              </div>

              {/* Vibrating String SVG */}
              <div
                onClick={() => handlePluckString(196)}
                className="relative w-full h-32 bg-[#0D0E17] rounded-2xl border border-[#303348] flex items-center justify-center cursor-pointer select-none group"
              >
                <svg
                  viewBox="0 0 500 120"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Nut & Bridge End Blocks */}
                  <rect x="20" y="30" width="16" height="60" rx="3" fill="#8067FF" />
                  <rect x="464" y="30" width="16" height="60" rx="3" fill="#54D6C3" />

                  {/* Vibrating Sine String */}
                  {isPlucked ? (
                    <path
                      d="M36 60 Q 140 30, 250 60 T 464 60"
                      fill="none"
                      stroke="#FF8066"
                      strokeWidth="3.5"
                      className="animate-pulse"
                    />
                  ) : (
                    <line x1="36" y1="60" x2="464" y2="60" stroke="#F6F4FF" strokeWidth="2.5" />
                  )}

                  {/* Concentric sound wave rings when plucked */}
                  {isPlucked && (
                    <>
                      <circle cx="250" cy="60" r="30" fill="none" stroke="#FF8066" strokeWidth="1.5" strokeOpacity="0.6" />
                      <circle cx="250" cy="60" r="50" fill="none" stroke="#8067FF" strokeWidth="1" strokeOpacity="0.4" />
                    </>
                  )}
                </svg>

                <div className="absolute bottom-2 text-[10px] font-mono text-[#A9A8BA] group-hover:text-[#FF8066] transition-colors">
                  {isPlucked ? '⚡ Vibrating at 196 Hz (G string)' : '👉 Click string or press button to pluck'}
                </div>
              </div>

              {/* Pluck Action Button */}
              <button
                onClick={() => handlePluckString(196)}
                className="px-6 py-3 rounded-2xl bg-[#FF8066] hover:bg-[#e66f57] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#FF8066]/25 transition-all hover:scale-105"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Pluck the String (Listen & Watch)</span>
              </button>

              {/* 4-Step Chain Explanation */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 w-full border-t border-[#303348] pt-5 text-xs">
                <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348]">
                  <span className="text-[#FF8066] font-mono font-bold block mb-1">1. Rest</span>
                  <p className="text-[#A9A8BA] text-[11px] leading-tight">
                    String is strung tightly under tension between Nut and Bridge.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348]">
                  <span className="text-[#54D6C3] font-mono font-bold block mb-1">2. Pluck</span>
                  <p className="text-[#A9A8BA] text-[11px] leading-tight">
                    Fingertip or pick pulls the string away from its center rest position.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348]">
                  <span className="text-[#8067FF] font-mono font-bold block mb-1">3. Vibration</span>
                  <p className="text-[#A9A8BA] text-[11px] leading-tight">
                    String snaps back and oscillates hundreds of times per second (Hertz).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348]">
                  <span className="text-[#45D483] font-mono font-bold block mb-1">4. Sound</span>
                  <p className="text-[#A9A8BA] text-[11px] leading-tight">
                    Body resonance (acoustic) or pickup coils (electric) project the sound.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStage('compare')}
                className="px-4 py-2.5 rounded-xl border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-mono"
              >
                Back
              </button>
              <button
                onClick={handleNextStage}
                className="px-7 py-3 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#8067FF]/25"
              >
                <span>Continue: Hear the Timbres</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 6: HEAR IT (Audio Timbre Laboratory) */}
        {/* ======================================================== */}
        {currentStage === 'hear_it' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono font-bold text-[#54D6C3] uppercase tracking-wider block">
                Step 5 · Audio Timbre Laboratory
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F6F4FF] mt-1">
                Hear the Different Timbres
              </h2>
              <p className="text-xs sm:text-sm text-[#A9A8BA] mt-1">
                Listen to how string materials and physical construction shape the sonic character of each guitar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Acoustic Timbre */}
              <div className="p-5 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#FF8066] uppercase">
                    Steel String
                  </span>
                  <h3 className="text-base font-bold text-[#F6F4FF] mt-1">Acoustic Tone</h3>
                  <p className="text-xs text-[#A9A8BA] mt-1 leading-relaxed">
                    Crisp, bright steel string attack with natural room decay and wooden cavity warmth.
                  </p>
                </div>
                <button
                  onClick={() => handlePlayTimbre('acoustic')}
                  className={`w-full py-3 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    playingTimbre === 'acoustic'
                      ? 'bg-[#FF8066] text-white'
                      : 'bg-[#0D0E17] border border-[#FF8066] text-[#FF8066] hover:bg-[#FF8066]/10'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{playingTimbre === 'acoustic' ? 'Playing Acoustic...' : 'Hear Acoustic'}</span>
                </button>
              </div>

              {/* Electric Timbre */}
              <div className="p-5 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#8067FF] uppercase">
                    Magnetic Pickups
                  </span>
                  <h3 className="text-base font-bold text-[#F6F4FF] mt-1">Electric Tone</h3>
                  <p className="text-xs text-[#A9A8BA] mt-1 leading-relaxed">
                    Sustained harmonic presence with smooth electric transients and amplifier resonance.
                  </p>
                </div>
                <button
                  onClick={() => handlePlayTimbre('electric')}
                  className={`w-full py-3 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    playingTimbre === 'electric'
                      ? 'bg-[#8067FF] text-white'
                      : 'bg-[#0D0E17] border border-[#8067FF] text-[#8067FF] hover:bg-[#8067FF]/10'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{playingTimbre === 'electric' ? 'Playing Electric...' : 'Hear Electric'}</span>
                </button>
              </div>

              {/* Classical Timbre */}
              <div className="p-5 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#54D6C3] uppercase">
                    Nylon String
                  </span>
                  <h3 className="text-base font-bold text-[#F6F4FF] mt-1">Classical Tone</h3>
                  <p className="text-xs text-[#A9A8BA] mt-1 leading-relaxed">
                    Mellow, round, intimate fingerstyle warmth with gentle attack and soft decay.
                  </p>
                </div>
                <button
                  onClick={() => handlePlayTimbre('classical')}
                  className={`w-full py-3 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    playingTimbre === 'classical'
                      ? 'bg-[#54D6C3] text-black'
                      : 'bg-[#0D0E17] border border-[#54D6C3] text-[#54D6C3] hover:bg-[#54D6C3]/10'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{playingTimbre === 'classical' ? 'Playing Classical...' : 'Hear Classical'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStage('string_vibration')}
                className="px-4 py-2.5 rounded-xl border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-mono"
              >
                Back
              </button>
              <button
                onClick={handleNextStage}
                className="px-7 py-3 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#8067FF]/25"
              >
                <span>Continue: Scale Length</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 7: SCALE LENGTH CONCEPT */}
        {/* ======================================================== */}
        {currentStage === 'scale_length' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono font-bold text-[#8067FF] uppercase tracking-wider block">
                Step 6 · Key Musical Concept
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F6F4FF] mt-1">
                What is "Scale Length"?
              </h2>
              <p className="text-xs sm:text-sm text-[#A9A8BA] mt-1">
                A simple measurement that shapes string tension, fret spacing, and playing feel.
              </p>
            </div>

            {/* Scale Length Visual Diagram */}
            <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-6 shadow-xl">
              <div className="relative w-full h-36 bg-[#0D0E17] rounded-2xl border border-[#303348] p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8067FF] font-bold">Nut</span>
                  <span className="text-[#54D6C3] font-bold">Bridge</span>
                </div>

                {/* Ruler Measurement graphic */}
                <div className="relative flex items-center justify-between px-6">
                  {/* Left Nut pin */}
                  <div className="w-3 h-8 rounded bg-[#8067FF]" />

                  {/* Vibrating string with measurement line */}
                  <div className="flex-1 flex flex-col items-center">
                    <span className="text-xs font-mono font-bold text-[#FF8066] mb-1">
                      ↔ Vibrating Scale Length (~24.75" to 25.5") ↔
                    </span>
                    <div className="w-full h-1 bg-gradient-to-r from-[#8067FF] via-[#FF8066] to-[#54D6C3] rounded-full" />
                  </div>

                  {/* Right Bridge pin */}
                  <div className="w-3 h-8 rounded bg-[#54D6C3]" />
                </div>

                <div className="text-center text-[11px] font-mono text-[#A9A8BA]">
                  Only the string portion between the Nut and the Bridge vibrates to make musical pitch!
                </div>
              </div>

              {/* Takeaway bullet points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#54D6C3] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#F6F4FF] block">Fret Spacing Rule</span>
                    <p className="text-[#A9A8BA] text-[11px] mt-0.5">
                      Scale length mathematically dictates the distance between fret wires.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8067FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#F6F4FF] block">String Tension Feel</span>
                    <p className="text-[#A9A8BA] text-[11px] mt-0.5">
                      Longer scale lengths have slightly tighter strings; shorter scales feel slinkier.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStage('hear_it')}
                className="px-4 py-2.5 rounded-xl border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-mono"
              >
                Back
              </button>
              <button
                onClick={handleNextStage}
                className="px-7 py-3 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#8067FF]/25"
              >
                <span>I Understand: Mini Game</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 8: MINI GAME (Meet Your Guitar) */}
        {/* ======================================================== */}
        {currentStage === 'mini_game' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF8066] uppercase tracking-wider block">
                Step 7 · Rapid Mini Game
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F6F4FF] mt-1">
                Meet Your Guitar: Quick Round
              </h2>
              <p className="text-xs sm:text-sm text-[#A9A8BA] mt-1">
                Test your reflexes with quick rapid-fire questions before the final challenge.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#303348] pb-3 text-xs font-mono">
                <span className="text-[#54D6C3]">Question {miniGameIdx + 1} of {miniGameQuestions.length}</span>
                <span className="text-[#A9A8BA]">Tap the correct answer</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#F6F4FF]">
                {miniGameQuestions[miniGameIdx].question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {miniGameQuestions[miniGameIdx].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (opt.isCorrect) {
                        setMiniGameFeedback({
                          isCorrect: true,
                          text: `✓ Correct! ${miniGameQuestions[miniGameIdx].correctExplanation}`,
                        });
                        audioEngine.playCelebrationChime();
                      } else {
                        setMiniGameFeedback({
                          isCorrect: false,
                          text: 'Try again! Think back to what we explored.',
                        });
                      }
                    }}
                    className="p-4 rounded-2xl bg-[#0D0E17] border border-[#303348] hover:border-[#8067FF] text-left transition-all font-bold text-xs sm:text-sm text-[#F6F4FF] hover:bg-[#1D2032]"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Feedback box */}
              {miniGameFeedback && (
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    miniGameFeedback.isCorrect
                      ? 'bg-[#45D483]/15 border-[#45D483] text-[#45D483]'
                      : 'bg-[#F4BB55]/15 border-[#F4BB55] text-[#F4BB55]'
                  }`}
                >
                  <p className="font-bold">{miniGameFeedback.text}</p>
                  {miniGameFeedback.isCorrect && (
                    <button
                      onClick={() => {
                        setMiniGameFeedback(null);
                        if (miniGameIdx < miniGameQuestions.length - 1) {
                          setMiniGameIdx((prev) => prev + 1);
                        } else {
                          handleNextStage();
                        }
                      }}
                      className="mt-3 px-4 py-2 rounded-xl bg-[#45D483] text-black font-extrabold text-xs flex items-center gap-1.5 shadow"
                    >
                      <span>
                        {miniGameIdx < miniGameQuestions.length - 1 ? 'Next Question' : 'Start Final Challenge'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStage('scale_length')}
                className="px-4 py-2.5 rounded-xl border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-mono"
              >
                Back
              </button>
              <button
                onClick={handleNextStage}
                className="px-7 py-3 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center gap-2"
              >
                <span>Final Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 9: FINAL QUIZ (First Guitar Challenge) */}
        {/* ======================================================== */}
        {currentStage === 'quiz' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono font-bold text-[#45D483] uppercase tracking-wider block">
                Final Assessment · Level 1.1 Checkpoint
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F6F4FF] mt-1">
                First Guitar Challenge
              </h2>
              <p className="text-xs sm:text-sm text-[#A9A8BA] mt-1">
                Complete these 5 curriculum questions to master Lesson 1.1 and unlock your badge.
              </p>
            </div>

            {/* Quiz Card */}
            <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-6 shadow-xl">
              {/* Progress Dots: ○ ○ ○ ○ ○ -> ● ● ● ● ● */}
              <div className="flex items-center justify-between border-b border-[#303348] pb-3">
                <div className="flex items-center gap-2">
                  {quizQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all ${
                        quizAnswers[i] === true
                          ? 'bg-[#45D483]'
                          : i === quizIdx
                          ? 'bg-[#8067FF] ring-2 ring-[#8067FF]/40'
                          : 'bg-[#303348]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-[#A9A8BA]">
                  Question {quizIdx + 1} of {quizQuestions.length}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#F6F4FF]">
                {quizQuestions[quizIdx].question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {quizQuestions[quizIdx].options.map((optText, optIdx) => {
                  const isSelected = selectedQuizOption === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => {
                        setSelectedQuizOption(optIdx);
                        const isCorrect = optIdx === quizQuestions[quizIdx].correctIdx;
                        const newAnswers = [...quizAnswers];
                        newAnswers[quizIdx] = isCorrect;
                        setQuizAnswers(newAnswers);

                        if (isCorrect) {
                          setQuizFeedback({
                            isCorrect: true,
                            explanation: `✓ Correct! ${quizQuestions[quizIdx].explanation}`,
                          });
                          audioEngine.playGuitarTimbre('acoustic', 392, 500);
                        } else {
                          setQuizFeedback({
                            isCorrect: false,
                            explanation: 'Not quite. Check the concepts and try again!',
                          });
                        }
                      }}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between ${
                        isSelected
                          ? quizFeedback?.isCorrect
                            ? 'bg-[#45D483]/15 border-[#45D483] text-[#45D483]'
                            : 'bg-[#F06B78]/15 border-[#F06B78] text-[#F06B78]'
                          : 'bg-[#0D0E17] border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]'
                      }`}
                    >
                      <span>{optText}</span>
                      {isSelected && quizFeedback?.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-[#45D483] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert */}
              {quizFeedback && (
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    quizFeedback.isCorrect
                      ? 'bg-[#45D483]/15 border-[#45D483] text-[#45D483]'
                      : 'bg-[#F4BB55]/15 border-[#F4BB55] text-[#F4BB55]'
                  }`}
                >
                  <p className="font-bold">{quizFeedback.explanation}</p>
                  {quizFeedback.isCorrect && (
                    <button
                      onClick={() => {
                        setQuizFeedback(null);
                        setSelectedQuizOption(null);
                        if (quizIdx < quizQuestions.length - 1) {
                          setQuizIdx((prev) => prev + 1);
                        } else {
                          handleFinalizeLesson();
                          setCurrentStage('complete');
                        }
                      }}
                      className="mt-3 px-5 py-2.5 rounded-xl bg-[#45D483] text-black font-extrabold text-xs flex items-center gap-1.5 shadow"
                    >
                      <span>
                        {quizIdx < quizQuestions.length - 1 ? 'Next Question' : 'Complete Lesson 1.1'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 10: VICTORY & COMPLETION RECAP */}
        {/* ======================================================== */}
        {currentStage === 'complete' && (
          <div className="flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-400 py-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8067FF] via-[#FF8066] to-[#54D6C3] p-1 shadow-2xl shadow-[#8067FF]/35">
              <div className="w-full h-full rounded-full bg-[#151725] flex items-center justify-center">
                <Award className="w-12 h-12 text-[#45D483]" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#45D483]/15 border border-[#45D483]/30 text-[#45D483] text-xs font-mono font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>★ LESSON COMPLETE ★</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#F6F4FF] tracking-tight">
                What Is a Guitar? Completed!
              </h2>
              <p className="text-xs sm:text-sm text-[#A9A8BA] max-w-md mx-auto mt-1">
                You’ve completed your first official guitar milestone.
              </p>
            </div>

            {/* What you learned summary */}
            <div className="w-full max-w-md p-5 rounded-3xl bg-[#151725] border border-[#303348] text-left shadow-xl space-y-2.5">
              <h4 className="text-xs font-bold font-mono text-[#FF8066] uppercase tracking-wider mb-2">
                Knowledge Mastered:
              </h4>
              <div className="flex items-center gap-2.5 text-xs text-[#E2E1EC]">
                <CheckCircle2 className="w-4 h-4 text-[#54D6C3] shrink-0" />
                <span>Guitar structure: Body, Neck, Headstock, Fretboard & Strings</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#E2E1EC]">
                <CheckCircle2 className="w-4 h-4 text-[#54D6C3] shrink-0" />
                <span>The 3 guitar types: Acoustic, Electric & Classical nylon</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#E2E1EC]">
                <CheckCircle2 className="w-4 h-4 text-[#54D6C3] shrink-0" />
                <span>How strings vibrate to produce acoustic waves and magnetic signals</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#E2E1EC]">
                <CheckCircle2 className="w-4 h-4 text-[#54D6C3] shrink-0" />
                <span>Scale length: the vibrating distance between Nut and Bridge</span>
              </div>

              {/* Reward Badge Card */}
              <div className="mt-4 pt-3 border-t border-[#303348] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8067FF]/20 border border-[#8067FF] flex items-center justify-center text-[#8067FF]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#54D6C3] font-bold block uppercase">
                    Badge Unlocked
                  </span>
                  <span className="text-xs font-bold text-[#F6F4FF]">
                    "First Step" Milestone
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mt-2">
              <button
                onClick={onClose}
                className="w-full sm:flex-1 py-3.5 rounded-2xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl shadow-[#8067FF]/30 transition-all hover:scale-102"
              >
                <span>Continue Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentStage('intro');
                  setDiscoveredParts(new Set(['body']));
                  setQuizIdx(0);
                  setQuizAnswers([null, null, null, null, null]);
                  setMiniGameIdx(0);
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#0D0E17] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] font-mono text-xs flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Review</span>
              </button>

              {onNavigateToPractice && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToPractice();
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#151725] border border-[#54D6C3]/40 text-[#54D6C3] hover:bg-[#54D6C3]/10 font-mono text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Practice Studio</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Bottom Guidance Footer */}
      <div className="bg-[#151725]/90 border-t border-[#303348] px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs text-[#A9A8BA] font-mono">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#54D6C3]" />
          <span>VIBEX Learning Engine</span>
        </span>
        <span>
          Stage: {STAGES[stageIndex].label} ({stageIndex + 1}/{STAGES.length})
        </span>
      </div>
    </div>
  );
};
