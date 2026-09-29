/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { GuitarProgressService } from '../../services/guitarProgressService';
import { VibexAudioEngine } from '../../services/audioEngine';
import { SpeechCoach } from '../../services/speechCoach';
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
  Eye,
  Hand,
  Target,
  Lightbulb,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import { VibeAvatar, MentorExpression } from './VibeAvatar';

// =========================================================================
// STAGE DEFINITION TYPES — data-driven lesson architecture
// =========================================================================

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export interface InteractivePart {
  id: string;
  label: string;
  description: string;
  icon?: string;
  color: string;
}

export interface MatchItem {
  prompt: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export interface AudioSample {
  label: string;
  frequency: number;
  timbre?: 'acoustic' | 'electric' | 'classical';
  durationMs?: number;
}

export type StageType =
  | 'intro'
  | 'explore'
  | 'teach'
  | 'interactive'
  | 'listen'
  | 'demonstrate'
  | 'match_game'
  | 'practice'
  | 'quiz'
  | 'complete';

export interface LessonStageConfig {
  id: string;
  type: StageType;
  label: string;
  title: string;
  vibeDialogue: string;
  subtitle?: string;

  // For 'explore' stages — interactive parts to discover
  exploreParts?: InteractivePart[];

  // For 'teach' stages — bullet points of knowledge
  teachPoints?: { icon: string; text: string; color: string }[];
  teachTip?: string;

  // For 'interactive' stages — user performs a specific action
  interactionPrompt?: string;
  interactionType?: 'tap_parts' | 'pluck_strings' | 'hold_position' | 'finger_placement' | 'fretboard';
  targetCount?: number;

  // For 'listen' stages — audio samples to play
  audioSamples?: AudioSample[];

  // For 'demonstrate' stages — step-by-step visual guide
  demonstrationSteps?: { instruction: string; detail: string; icon: string }[];

  // For 'match_game' stages
  matchItems?: MatchItem[];

  // For 'practice' stages — timed or rep-based
  practiceInstruction?: string;
  practiceTimer?: number; // seconds
  practiceReps?: number;

  // For 'quiz' stages
  quizQuestions?: QuizQuestion[];

  // For 'complete' stages
  completionSummary?: string[];
  badgeTitle?: string;
  badgeDescription?: string;
  xpReward?: number;
}

export interface LessonPlayerConfig {
  lessonId: string;
  lessonNumber: string;
  title: string;
  subtitle: string;
  achievementId?: string;
  stages: LessonStageConfig[];
}

interface LessonPlayerEngineProps {
  config: LessonPlayerConfig;
  onClose: () => void;
  onComplete: () => void;
  onNavigateToPractice?: (skillName?: string) => void;
}

// =========================================================================
// THE ENGINE
// =========================================================================
export const LessonPlayerEngine: React.FC<LessonPlayerEngineProps> = ({
  config,
  onClose,
  onComplete,
  onNavigateToPractice,
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);

  // Interactive state
  const [discoveredParts, setDiscoveredParts] = useState<Set<string>>(new Set());
  const [selectedPart, setSelectedPart] = useState<InteractivePart | null>(null);
  const [interactionCount, setInteractionCount] = useState<number>(0);
  const [practiceTimer, setPracticeTimer] = useState<number>(0);
  const [isPracticing, setIsPracticing] = useState<boolean>(false);

  // Match game state
  const [matchIdx, setMatchIdx] = useState<number>(0);
  const [matchFeedback, setMatchFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<(boolean | null)[]>([]);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  // Audio state
  const [playingAudioIdx, setPlayingAudioIdx] = useState<number | null>(null);

  const progressService = GuitarProgressService.getInstance();
  const audioEngine = VibexAudioEngine.getInstance();

  const stage = config.stages[currentStageIdx];
  const isFirstStage = currentStageIdx === 0;
  const isLastStage = currentStageIdx === config.stages.length - 1;
  const progressPercent = ((currentStageIdx + 1) / config.stages.length) * 100;

  // Determine current expression based on stage state
  const getMentorExpression = (): MentorExpression => {
    if (!stage) return 'happy';
    if (stage.type === 'intro') return 'happy';
    if (stage.type === 'explore' || stage.type === 'teach' || stage.type === 'listen') return 'talking';
    if (stage.type === 'demonstrate') return 'focused';
    if (stage.type === 'interactive' || stage.type === 'practice') return 'encouraging';
    if (stage.type === 'match_game') {
      if (matchFeedback?.isCorrect) return 'cheerful';
      if (matchFeedback && !matchFeedback.isCorrect) return 'calm';
      return 'talking';
    }
    if (stage.type === 'quiz') {
      if (quizFeedback?.isCorrect) return 'cheerful';
      if (quizFeedback && !quizFeedback.isCorrect) return 'calm';
      return 'talking';
    }
    if (stage.type === 'complete') return 'celebrating';
    return 'happy';
  };

  const currentExpression = getMentorExpression();

  // Speak dialogue on stage change
  useEffect(() => {
    if (voiceEnabled && stage) {
      SpeechCoach.speak(stage.vibeDialogue);
    }
    // Reset per-stage state
    setSelectedPart(null);
    setInteractionCount(0);
    setMatchIdx(0);
    setMatchFeedback(null);
    setPracticeTimer(0);
    setIsPracticing(false);
    setPlayingAudioIdx(null);

    // Reset quiz state for quiz stages
    if (stage?.type === 'quiz' && stage.quizQuestions) {
      setQuizIdx(0);
      setQuizAnswers(new Array(stage.quizQuestions.length).fill(null));
      setSelectedQuizOption(null);
      setQuizFeedback(null);
    }

    // Auto-play celebration on complete
    if (stage?.type === 'complete') {
      audioEngine.playCelebrationChime();
    }
  }, [currentStageIdx]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      SpeechCoach.cancel();
    };
  }, []);

  // Practice timer effect
  useEffect(() => {
    if (!isPracticing || !stage?.practiceTimer) return;
    const interval = setInterval(() => {
      setPracticeTimer(prev => {
        if (prev >= stage.practiceTimer!) {
          setIsPracticing(false);
          clearInterval(interval);
          SpeechCoach.speak('Time is up! Great effort.');
          return stage.practiceTimer!;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPracticing]);

  // Navigation
  const handleNextStage = () => {
    if (currentStageIdx < config.stages.length - 1) {
      setCurrentStageIdx(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStage = () => {
    if (currentStageIdx > 0) {
      setCurrentStageIdx(prev => prev - 1);
    }
  };

  // Finalize lesson
  const handleFinalizeLesson = () => {
    progressService.markLessonCompleted(config.lessonId);
    if (config.achievementId) {
      progressService.unlockAchievement(config.achievementId);
    }
    onComplete();
  };

  // Audio helpers
  const handlePlaySample = (sample: AudioSample, idx: number) => {
    setPlayingAudioIdx(idx);
    if (sample.timbre) {
      audioEngine.playGuitarTimbre(sample.timbre, sample.frequency, sample.durationMs || 1500);
    } else {
      audioEngine.playInstrumentNote('guitar', sample.frequency, sample.durationMs || 1200);
    }
    setTimeout(() => setPlayingAudioIdx(null), sample.durationMs || 1500);
  };

  // Part discovery
  const handleDiscoverPart = (part: InteractivePart) => {
    setSelectedPart(part);
    setDiscoveredParts(prev => new Set(prev).add(part.id));
    SpeechCoach.speak(`${part.label}. ${part.description}`);
  };

  // Interaction counting
  const handleInteraction = () => {
    setInteractionCount(prev => prev + 1);
    const target = stage?.targetCount || 3;
    if (interactionCount + 1 >= target) {
      SpeechCoach.speak('Excellent! You have completed this activity.');
    }
  };

  // Match game
  const handleMatchAnswer = (answer: string) => {
    if (!stage?.matchItems) return;
    const current = stage.matchItems[matchIdx];
    const isCorrect = answer === current.correctAnswer;
    setMatchFeedback({
      isCorrect,
      text: isCorrect ? `Correct! ${current.explanation}` : `Not quite. ${current.explanation}`,
    });
    if (isCorrect) {
      SpeechCoach.speak('Correct!');
    } else {
      SpeechCoach.speak('Not quite. Check the explanation.');
    }
  };

  const handleNextMatch = () => {
    if (stage?.matchItems && matchIdx < stage.matchItems.length - 1) {
      setMatchIdx(prev => prev + 1);
      setMatchFeedback(null);
    }
  };

  // Quiz
  const handleQuizSubmit = () => {
    if (!stage?.quizQuestions || selectedQuizOption === null) return;
    const currentQ = stage.quizQuestions[quizIdx];
    const isCorrect = selectedQuizOption === currentQ.correctIdx;
    const newAnswers = [...quizAnswers];
    newAnswers[quizIdx] = isCorrect;
    setQuizAnswers(newAnswers);
    setQuizFeedback({ isCorrect, explanation: currentQ.explanation });
    SpeechCoach.speak(isCorrect ? 'Correct!' : 'Not quite. Check the explanation.');
  };

  const handleNextQuiz = () => {
    if (!stage?.quizQuestions) return;
    if (quizIdx < stage.quizQuestions.length - 1) {
      setQuizIdx(prev => prev + 1);
      setSelectedQuizOption(null);
      setQuizFeedback(null);
    }
  };

  const correctQuizCount = quizAnswers.filter(a => a === true).length;

  // =========================================================================
  // RENDER HELPERS
  // =========================================================================

  const renderVibeTeacher = () => (
    <div className="rounded-2xl bg-gradient-to-r from-[#1D2032] to-[#151725] border border-[#8067FF]/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4 shadow-lg relative overflow-hidden">
      <VibeAvatar expression={currentExpression} size="md" />
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#8067FF] uppercase tracking-wider">
            Vibe Teacher
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#54D6C3]/20 text-[#54D6C3] font-mono font-bold">
            Active Coach
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#F6F4FF]">
          {stage.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#E2E1EC] leading-relaxed">
          "{stage.vibeDialogue}"
        </p>
        {stage.subtitle && (
          <p className="text-[11px] text-[#A9A8BA] mt-1 italic">{stage.subtitle}</p>
        )}
      </div>
      <button
        onClick={() => SpeechCoach.speak(stage.vibeDialogue)}
        className="p-2 rounded-xl text-[#A9A8BA] hover:text-[#8067FF] transition-colors"
        title="Re-speak"
      >
        <Volume2 className="w-4 h-4" />
      </button>
    </div>
  );

  const renderExploreParts = () => {
    if (!stage.exploreParts) return null;
    const allDiscovered = stage.exploreParts.every(p => discoveredParts.has(p.id));
    return (
      <div className="flex flex-col gap-4">
        {/* Progress */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[#54D6C3] font-bold">
            Discovered: {discoveredParts.size} / {stage.exploreParts.length}
          </span>
          {allDiscovered && (
            <span className="px-3 py-1 rounded-full bg-[#45D483]/15 border border-[#45D483]/30 text-[#45D483] font-bold flex items-center gap-1">
              <Check className="w-3 h-3" /> All Parts Found!
            </span>
          )}
        </div>
        {/* Parts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {stage.exploreParts.map(part => {
            const isDiscovered = discoveredParts.has(part.id);
            const isSelected = selectedPart?.id === part.id;
            return (
              <button
                key={part.id}
                onClick={() => handleDiscoverPart(part)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 hover:scale-[1.02] ${
                  isSelected
                    ? `bg-[${part.color}]/15 border-[${part.color}] shadow-lg`
                    : isDiscovered
                    ? 'bg-[#1D2032] border-[#303348] opacity-80'
                    : 'bg-[#0D0E17] border-[#303348] hover:border-[#8067FF]'
                }`}
                style={isSelected ? { borderColor: part.color, backgroundColor: `${part.color}15` } : {}}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {isDiscovered ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: part.color }} />
                  ) : (
                    <Target className="w-4 h-4 text-[#A9A8BA] shrink-0" />
                  )}
                  <span className="text-xs font-bold text-[#F6F4FF] truncate">{part.label}</span>
                </div>
                {isSelected && (
                  <p className="text-[11px] text-[#E2E1EC] leading-relaxed mt-1 line-clamp-3">
                    {part.description}
                  </p>
                )}
              </button>
            );
          })}
        </div>
        {/* Detail panel */}
        {selectedPart && (
          <div
            className="p-4 rounded-xl border flex flex-col gap-2"
            style={{ borderColor: `${selectedPart.color}60`, backgroundColor: `${selectedPart.color}08` }}
          >
            <h4 className="text-sm font-bold text-[#F6F4FF] flex items-center gap-2">
              <Lightbulb className="w-4 h-4" style={{ color: selectedPart.color }} />
              {selectedPart.label}
            </h4>
            <p className="text-xs text-[#E2E1EC] leading-relaxed">{selectedPart.description}</p>
          </div>
        )}
      </div>
    );
  };

  const renderTeachPoints = () => {
    if (!stage.teachPoints) return null;
    return (
      <div className="flex flex-col gap-3">
        <div className="space-y-2.5">
          {stage.teachPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-start gap-3"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
                style={{ backgroundColor: `${point.color}20`, color: point.color }}
              >
                {idx + 1}
              </div>
              <p className="text-xs text-[#E2E1EC] leading-relaxed pt-1">{point.text}</p>
            </div>
          ))}
        </div>
        {stage.teachTip && (
          <div className="p-3 rounded-xl bg-[#F4BB55]/10 border border-[#F4BB55]/30 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-[#F4BB55] shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#F4BB55] font-medium">{stage.teachTip}</p>
          </div>
        )}
      </div>
    );
  };

  const renderListenSamples = () => {
    if (!stage.audioSamples) return null;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {stage.audioSamples.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => handlePlaySample(sample, idx)}
            disabled={playingAudioIdx !== null}
            className={`p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
              playingAudioIdx === idx
                ? 'bg-[#8067FF]/20 border-[#8067FF] scale-[1.02] shadow-lg shadow-[#8067FF]/20'
                : 'bg-[#0D0E17] border-[#303348] hover:border-[#8067FF] hover:scale-[1.01]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                playingAudioIdx === idx
                  ? 'bg-[#8067FF] text-white'
                  : 'bg-[#1D2032] text-[#A9A8BA]'
              }`}
            >
              {playingAudioIdx === idx ? (
                <Activity className="w-5 h-5 animate-pulse" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-[#F6F4FF] block">{sample.label}</span>
              <span className="text-[10px] text-[#A9A8BA] font-mono">
                {sample.frequency.toFixed(1)} Hz
              </span>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderDemonstration = () => {
    if (!stage.demonstrationSteps) return null;
    return (
      <div className="flex flex-col gap-3">
        {stage.demonstrationSteps.map((step, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8067FF]/20 border border-[#8067FF]/40 flex items-center justify-center text-[#8067FF] font-bold text-sm shrink-0">
              {idx + 1}
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#F6F4FF] mb-0.5">{step.instruction}</h4>
              <p className="text-[11px] text-[#A9A8BA] leading-relaxed">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMatchGame = () => {
    if (!stage.matchItems) return null;
    const current = stage.matchItems[matchIdx];
    return (
      <div className="p-5 rounded-2xl bg-[#1D2032] border border-[#FBBF24]/40 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FBBF24]">
            <Zap className="w-4 h-4" />
            <span>QUICK MATCH</span>
          </div>
          <span className="text-[10px] font-mono text-[#A9A8BA]">
            {matchIdx + 1} / {stage.matchItems.length}
          </span>
        </div>
        <p className="text-sm font-bold text-[#F6F4FF]">{current.prompt}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {current.options.map((opt, idx) => {
            let btnStyle = 'bg-[#151725] border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]';
            if (matchFeedback) {
              if (opt === current.correctAnswer) {
                btnStyle = 'bg-[#54D6C3]/20 border-[#54D6C3] text-[#54D6C3] font-bold';
              } else if (matchFeedback && !matchFeedback.isCorrect) {
                btnStyle = 'bg-[#151725] border-[#303348] text-[#A9A8BA] opacity-60';
              }
            }
            return (
              <button
                key={idx}
                onClick={() => handleMatchAnswer(opt)}
                disabled={!!matchFeedback}
                className={`p-3 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
              >
                <span className="font-mono mr-2 font-bold opacity-60">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>
        {matchFeedback && (
          <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
            matchFeedback.isCorrect
              ? 'bg-[#54D6C3]/10 border-[#54D6C3]/30 text-[#54D6C3]'
              : 'bg-[#FB7185]/10 border-[#FB7185]/30 text-[#FB7185]'
          }`}>
            {matchFeedback.isCorrect ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{matchFeedback.text}</span>
          </div>
        )}
        {matchFeedback && matchIdx < stage.matchItems.length - 1 && (
          <button
            onClick={handleNextMatch}
            className="self-end px-4 py-2 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  };

  const renderPractice = () => {
    const timerTarget = stage.practiceTimer || 20;
    const repsTarget = stage.practiceReps || 0;
    return (
      <div className="p-5 rounded-2xl bg-[#1D2032] border border-[#54D6C3]/40 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#54D6C3]">
          <Hand className="w-4 h-4" />
          <span>GUIDED PRACTICE</span>
        </div>
        {stage.practiceInstruction && (
          <p className="text-sm text-[#E2E1EC] leading-relaxed">{stage.practiceInstruction}</p>
        )}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setIsPracticing(!isPracticing);
              if (!isPracticing) {
                setPracticeTimer(0);
                SpeechCoach.speak('Begin now.');
              }
            }}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white transition-all shadow-lg ${
              isPracticing ? 'bg-[#FF5C93]' : 'bg-[#54D6C3] text-[#0D0E17]'
            }`}
          >
            {isPracticing ? (
              <X className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 fill-current" />
            )}
          </button>
          <div>
            <h4 className="text-sm font-bold text-[#F6F4FF]">
              {isPracticing ? 'In Progress...' : 'Start Practice'}
            </h4>
            <p className="text-xs text-[#A9A8BA]">
              {practiceTimer >= timerTarget ? 'Complete!' : `${timerTarget - practiceTimer}s remaining`}
            </p>
          </div>
          {/* Timer visualization */}
          <div className="flex-1 max-w-32">
            <div className="w-full h-3 rounded-full bg-[#0D0E17] border border-[#303348] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#54D6C3] to-[#8067FF] transition-all duration-1000"
                style={{ width: `${Math.min((practiceTimer / timerTarget) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
        {practiceTimer >= timerTarget && (
          <div className="p-3 rounded-xl bg-[#45D483]/10 border border-[#45D483]/30 text-xs text-[#45D483] flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Practice complete! You did great.</span>
          </div>
        )}
      </div>
    );
  };

  const renderQuiz = () => {
    if (!stage.quizQuestions) return null;
    const currentQ = stage.quizQuestions[quizIdx];
    const isLastQuestion = quizIdx === stage.quizQuestions.length - 1;
    const allAnswered = quizAnswers.every(a => a !== null);
    return (
      <div className="p-5 rounded-2xl bg-[#1D2032] border border-[#FF8066]/40 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF8066]">
            <HelpCircle className="w-4 h-4" />
            <span>MASTERY QUIZ</span>
          </div>
          <span className="text-[10px] font-mono text-[#A9A8BA]">
            Question {quizIdx + 1} / {stage.quizQuestions.length}
          </span>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5">
          {stage.quizQuestions.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                quizAnswers[idx] === true
                  ? 'bg-[#45D483]'
                  : quizAnswers[idx] === false
                  ? 'bg-[#FB7185]'
                  : idx === quizIdx
                  ? 'bg-[#8067FF] scale-125'
                  : 'bg-[#303348]'
              }`}
            />
          ))}
        </div>

        <p className="text-sm font-bold text-[#F6F4FF]">{currentQ.question}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedQuizOption === idx;
            const isCorrect = idx === currentQ.correctIdx;
            let btnStyle = 'bg-[#151725] border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]';
            if (quizFeedback) {
              if (isCorrect) {
                btnStyle = 'bg-[#54D6C3]/20 border-[#54D6C3] text-[#54D6C3] font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-[#FB7185]/20 border-[#FB7185] text-[#FB7185]';
              } else {
                btnStyle = 'bg-[#151725] border-[#303348] text-[#A9A8BA] opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'bg-[#8067FF]/20 border-[#8067FF] text-[#8067FF] font-bold';
            }
            return (
              <button
                key={idx}
                disabled={!!quizFeedback}
                onClick={() => setSelectedQuizOption(idx)}
                className={`p-3 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
              >
                <span className="font-mono mr-2 font-bold opacity-60">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {!quizFeedback ? (
          <button
            disabled={selectedQuizOption === null}
            onClick={handleQuizSubmit}
            className="self-end px-5 py-2 rounded-xl bg-[#FF8066] hover:bg-[#e66b52] disabled:opacity-40 text-white font-bold text-xs transition-colors shadow-md"
          >
            Submit Answer
          </button>
        ) : (
          <>
            <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
              quizFeedback.isCorrect
                ? 'bg-[#54D6C3]/10 border-[#54D6C3]/30 text-[#E2E1EC]'
                : 'bg-[#FB7185]/10 border-[#FB7185]/30 text-[#E2E1EC]'
            }`}>
              <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                quizFeedback.isCorrect ? 'text-[#54D6C3]' : 'text-[#FB7185]'
              }`} />
              <div>
                <span className="font-bold text-[#F6F4FF]">
                  {quizFeedback.isCorrect ? 'Correct!' : 'Not quite.'}{' '}
                </span>
                <span>{quizFeedback.explanation}</span>
              </div>
            </div>
            {!isLastQuestion ? (
              <button
                onClick={handleNextQuiz}
                className="self-end px-4 py-2 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Next Question</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-[#45D483]/10 border border-[#45D483]/30 text-xs text-[#45D483] font-bold flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>
                  Quiz Complete! {correctQuizCount} / {stage.quizQuestions.length} correct
                </span>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const renderVictory = () => (
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
          {config.title} Completed!
        </h2>
        <p className="text-xs sm:text-sm text-[#A9A8BA] max-w-md mx-auto mt-1">
          Lesson {config.lessonNumber} mastered. Great work!
        </p>
      </div>

      {/* Summary */}
      {stage.completionSummary && stage.completionSummary.length > 0 && (
        <div className="w-full max-w-md p-5 rounded-3xl bg-[#151725] border border-[#303348] text-left shadow-xl space-y-2.5">
          <h4 className="text-xs font-bold font-mono text-[#FF8066] uppercase tracking-wider mb-2">
            Knowledge Mastered:
          </h4>
          {stage.completionSummary.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-[#E2E1EC]">
              <CheckCircle2 className="w-4 h-4 text-[#54D6C3] shrink-0" />
              <span>{item}</span>
            </div>
          ))}

          {/* Badge */}
          {stage.badgeTitle && (
            <div className="mt-4 pt-3 border-t border-[#303348] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8067FF]/20 border border-[#8067FF] flex items-center justify-center text-[#8067FF]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#54D6C3] font-bold block uppercase">
                  {stage.badgeDescription || 'Badge Unlocked'}
                </span>
                <span className="text-xs font-bold text-[#F6F4FF]">
                  {stage.badgeTitle}
                </span>
              </div>
            </div>
          )}

          {/* XP */}
          {stage.xpReward && (
            <div className="mt-2 pt-2 border-t border-[#303348] flex items-center gap-2 text-xs font-mono text-[#F4BB55] font-bold">
              <Zap className="w-4 h-4" />
              <span>+{stage.xpReward} XP Earned</span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mt-2">
        <button
          onClick={handleFinalizeLesson}
          className="w-full sm:flex-1 py-3.5 rounded-2xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl shadow-[#8067FF]/30 transition-all hover:scale-[1.02]"
        >
          <span>Continue Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            setCurrentStageIdx(0);
            setDiscoveredParts(new Set());
          }}
          className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#0D0E17] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] font-mono text-xs flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Review</span>
        </button>

        {onNavigateToPractice && (
          <button
            onClick={() => {
              handleFinalizeLesson();
              onNavigateToPractice();
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#151725] border border-[#54D6C3]/40 text-[#54D6C3] hover:bg-[#54D6C3]/10 font-mono text-xs flex items-center justify-center gap-1.5"
          >
            <span>Practice Studio</span>
          </button>
        )}
      </div>
    </div>
  );

  const renderInteractive = () => {
    const target = stage.targetCount || 3;
    const done = interactionCount >= target;
    return (
      <div className="p-5 rounded-2xl bg-[#1D2032] border border-[#8067FF]/40 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8067FF]">
          <Eye className="w-4 h-4" />
          <span>YOUR TURN</span>
        </div>
        {stage.interactionPrompt && (
          <p className="text-sm text-[#E2E1EC] leading-relaxed">{stage.interactionPrompt}</p>
        )}
        <div className="flex items-center gap-4">
          <button
            onClick={handleInteraction}
            disabled={done}
            className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
              done
                ? 'bg-[#45D483]/20 border border-[#45D483] text-[#45D483]'
                : 'bg-[#8067FF] hover:bg-[#6952E6] text-white'
            }`}
          >
            {done ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Done!</span>
              </>
            ) : (
              <>
                <Hand className="w-4 h-4" />
                <span>I Did It ({interactionCount}/{target})</span>
              </>
            )}
          </button>
          {!done && (
            <span className="text-[10px] text-[#A9A8BA] font-mono">
              {target - interactionCount} remaining
            </span>
          )}
        </div>
      </div>
    );
  };

  // =========================================================================
  // STAGE CONTENT ROUTER
  // =========================================================================
  const renderStageContent = () => {
    switch (stage.type) {
      case 'intro':
        return null; // Just the Vibe teacher card
      case 'explore':
        return renderExploreParts();
      case 'teach':
        return renderTeachPoints();
      case 'listen':
        return renderListenSamples();
      case 'demonstrate':
        return renderDemonstration();
      case 'interactive':
        return renderInteractive();
      case 'match_game':
        return renderMatchGame();
      case 'practice':
        return renderPractice();
      case 'quiz':
        return renderQuiz();
      case 'complete':
        return renderVictory();
      default:
        return null;
    }
  };

  // =========================================================================
  // MAIN RENDER
  // =========================================================================
  return (
    <div className="fixed inset-0 z-50 bg-[#0D0E17] text-[#F6F4FF] overflow-y-auto flex flex-col justify-between selection:bg-[#8067FF] selection:text-white">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-[#151725]/95 backdrop-blur-md border-b border-[#303348] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        {/* Left: Exit & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-[#303348] text-[#A9A8BA] hover:text-[#FF8066] hover:border-[#FF8066] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] font-mono font-bold text-[#FF8066] uppercase">
              Lesson {config.lessonNumber}
            </span>
            <h1 className="text-sm sm:text-base font-extrabold tracking-tight">{config.title}</h1>
          </div>
        </div>

        {/* Center: Stage Progress */}
        <div className="hidden sm:flex items-center gap-1.5">
          {config.stages.map((s, idx) => (
            <div
              key={s.id}
              title={s.label}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-default ${
                idx < currentStageIdx
                  ? 'bg-[#45D483]'
                  : idx === currentStageIdx
                  ? 'bg-[#8067FF] scale-125 shadow-[0_0_8px_#8067FF]'
                  : 'bg-[#303348]'
              }`}
            />
          ))}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-xl border transition-colors ${
              voiceEnabled
                ? 'bg-[#8067FF]/20 border-[#8067FF] text-[#8067FF]'
                : 'bg-[#1D2032] border-[#303348] text-[#A9A8BA]'
            }`}
            title={voiceEnabled ? 'Mute coach' : 'Enable coach'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#A9A8BA] hover:text-[#F6F4FF] hover:bg-[#1D2032] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#0D0E17] px-4 sm:px-8 py-2 flex items-center gap-3 text-xs border-b border-[#303348]">
        <span className="font-mono text-[#54D6C3] font-bold">
          {stage.label}
        </span>
        <div className="flex-1 h-2 rounded-full bg-[#1D2032] overflow-hidden border border-[#303348]">
          <div
            className="h-full bg-gradient-to-r from-[#8067FF] via-[#54D6C3] to-[#FF8066] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="font-mono text-[#A9A8BA]">
          {currentStageIdx + 1}/{config.stages.length}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-8 py-6 sm:py-8 max-w-4xl mx-auto w-full flex flex-col gap-6">
        {stage.type !== 'complete' && renderVibeTeacher()}
        {renderStageContent()}
      </div>

      {/* Bottom Navigation */}
      {stage.type !== 'complete' && (
        <div className="bg-[#151725]/90 border-t border-[#303348] px-4 sm:px-8 py-3 flex items-center justify-between">
          <button
            onClick={handlePrevStage}
            disabled={isFirstStage}
            className="px-4 py-2.5 rounded-xl border border-[#303348] hover:border-[#8067FF] disabled:opacity-30 text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNextStage}
            disabled={isLastStage}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8067FF] to-[#6952E6] hover:brightness-110 disabled:opacity-30 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#8067FF]/25 transition-all"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="bg-[#151725]/90 border-t border-[#303348] px-4 sm:px-8 py-2 flex items-center justify-between text-xs text-[#A9A8BA] font-mono">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#54D6C3]" />
          <span>VIBEX Learning Engine</span>
        </span>
        <span>
          Stage: {stage.label} ({currentStageIdx + 1}/{config.stages.length})
        </span>
      </div>
    </div>
  );
};
