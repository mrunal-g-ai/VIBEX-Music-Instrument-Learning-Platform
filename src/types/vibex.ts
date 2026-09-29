/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type InstrumentType = 'guitar' | 'keyboard' | 'violin' | 'bansuri';

export type TeachingStep = 'watch' | 'your_turn' | 'feedback';

export type EvaluationRating = 'perfect' | 'adjust' | 'try_again' | 'idle';

export interface NoteGuide {
  id: string;
  name: string; // e.g. "C4", "E4", "Sa", "Pa"
  swara?: string; // e.g. "Sa", "Re", "Ga", "Ma", "Pa", "Dha", "Ni"
  frequency: number; // Hz
  durationMs: number;
  fret?: number; // for guitar
  stringIndex?: number; // 0 to 5 for guitar (0 = low E, 5 = high E), 0 to 3 for violin (G, D, A, E)
  finger?: number; // 1=Index, 2=Middle, 3=Ring, 4=Pinky, 0=Thumb/Open
  pianoKeyIndex?: number; // MIDI key or relative index
  holes?: boolean[]; // For bansuri: array of 6 boolean values (true=closed, false=open)
  bowDirection?: 'down' | 'up'; // For violin
  startTimeMs: number;
}

export interface RepertoirePiece {
  title: string;
  artistOrComposer: string;
  type: 'Western/Classical' | 'Indian/Hindi' | 'Contemporary/Pop' | 'Traditional Raga';
  keyOrRaga: string;
  tempoBpm: number;
}

export interface ExerciseItem {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  goal: string;
  category: 'posture' | 'technique' | 'chords_triads' | 'scales_alankars' | 'raga' | 'repertoire';
  tempoBpm: number;
  timeSignature: string;
  keySignature: string;
  notes: NoteGuide[];
  postureGuidance: {
    ideal: string;
    commonMistakes: string[];
    correctiveTip: string;
  };
  repertoirePairing?: RepertoirePiece[];
}

export interface LessonLevel {
  levelNumber: number; // 1 to 5
  title: string;
  tierName: 'Absolute Beginner' | 'Early Intermediate' | 'Intermediate' | 'Advanced' | 'Professional';
  durationSpan: string; // e.g., "Weeks 1–4", "Months 2–4", "Months 5–8", etc.
  dailyPracticeMinutes: string; // e.g., "30–45 min/day"
  focusSummary: string;
  outcome: string;
  accentColor: string;
  requiredXp: number;
  unlocked: boolean;
  completed: boolean;
  completionPercent: number;
  dailyRoutine: { activity: string; minutes: number }[];
  exercises: ExerciseItem[];
  repertoireMilestones: RepertoirePiece[];
}

export interface InstrumentCurriculum {
  instrument: InstrumentType;
  displayName: string;
  tagline: string;
  accentColor: string; // e.g. Violet, Coral, Rose, Mint
  focusAreas: string[];
  levels: LessonLevel[];
}

export interface BansuriScale {
  id: string;
  name: string; // e.g. "C Medium", "E Bass", "G Natural", "D Medium", "F Bass"
  basePitchName: string; // e.g. "C4", "E3", "G4"
  baseFrequency: number; // Hz for 'Sa'
  type: 'Bass' | 'Medium' | 'Anu-Mandra';
  lengthInches: number;
}

export interface PostureFeedback {
  postureScore: number; // 0 to 100
  pitchScore: number; // 0 to 100
  timingScore: number; // 0 to 100
  overallRating: EvaluationRating;
  message: string;
  vectorAdvice: string;
  faultDetected?: string;
}

export interface PitchTrackingResult {
  detectedFrequency: number | null;
  detectedNote: string | null;
  targetFrequency: number;
  centsDeviation: number; // -50 to +50 cents
  isRecognized: boolean;
  algorithm: 'YIN' | 'MPM';
  clarity: number; // 0.0 to 1.0 confidence
}

export interface RecordedTake {
  id: string;
  timestamp: string;
  exerciseId: string;
  exerciseTitle: string;
  instrument: InstrumentType;
  audioBlobUrl?: string;
  durationSeconds: number;
  pitchScores: number[];
  averageScore: number;
  accuracyRate: number;
}

export interface EarTrainingQuestion {
  id: string;
  prompt: string;
  category: 'chord' | 'single_note' | 'swara' | 'interval';
  targetFrequencies: number[];
  options: { label: string; isCorrect: boolean }[];
  explanation: string;
}

export type PracticeNodeType = 'tutorial' | 'practice' | 'ear_gym' | 'boss';
export type PracticeNodeStatus = 'locked' | 'active' | 'completed';

export interface LessonTutorial {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  summary: string;
  videoTimestamp?: string;
  keyTakeaways: string[];
  visualAids?: string[];
  postureTips: string[];
}

export interface PracticeNode {
  id: string;
  levelNumber: number; // 1 to 5
  moduleId: string; // e.g., "mod-1.1"
  moduleTitle: string; // e.g., "Module 1.1: Posture & Tuning"
  nodeIndex: number;
  title: string;
  subtitle: string;
  type: PracticeNodeType;
  exerciseId?: string;
  tutorialId?: string;
  earGymQuestionId?: string;
  durationMinutes: number;
  xpReward: number;
  status: PracticeNodeStatus;
  stars?: 0 | 1 | 2 | 3;
  accuracyScore?: number; // 0 to 100
  bossTier?: boolean;
  bossBadge?: string;
  pathOffset?: number; // -1 (left), 0 (center), 1 (right) for serpentine rendering
}

export interface CurriculumModule {
  id: string;
  levelNumber: number;
  title: string;
  subtitle: string;
  description: string;
  tutorial: LessonTutorial;
  practiceNodes: PracticeNode[];
}

