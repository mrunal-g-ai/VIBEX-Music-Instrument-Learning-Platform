/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// =========================================================================
// 14-DIMENSION VIBEX SKILL PROFILE
// =========================================================================
export interface GuitarSkillProfile {
  technique: number | null;     // 1 to 10 or null if unassessed
  rhythm: number | null;        // 1 to 10 or null if unassessed
  chords: number | null;        // 1 to 10 or null if unassessed
  chordChanges: number | null;  // 1 to 10 or null if unassessed
  scales: number | null;        // 1 to 10 or null if unassessed
  lead: number | null;          // 1 to 10 or null if unassessed
  fingerstyle: number | null;   // 1 to 10 or null if unassessed
  theory: number | null;        // 1 to 10 or null if unassessed
  earTraining: number | null;   // 1 to 10 or null if unassessed
  fretboard: number | null;     // 1 to 10 or null if unassessed
  repertoire: number | null;    // 1 to 10 or null if unassessed
  improvisation: number | null; // 1 to 10 or null if unassessed
  composition: number | null;   // 1 to 10 or null if unassessed
  performance: number | null;   // 1 to 10 or null if unassessed
}

export type SkillCategory = keyof GuitarSkillProfile;

export interface SkillCategoryInfo {
  key: SkillCategory;
  label: string;
  color: string;
  description: string;
}

export interface SkillAssessmentDetail {
  key: SkillCategory;
  label: string;
  color: string;
  isAssessed: boolean;
  score: number | null;
  evidenceText: string;
}


// =========================================================================
// THE 7 PEDAGOGICAL PILLARS
// =========================================================================
export interface PedagogicalPillars {
  hands: string;       // Technique
  brain: string;       // Theory
  ears: string;        // Ear Training
  heart: string;       // Musicality & Feeling
  repertoire: string;  // Songs
  creativity: string;  // Composition
  performance: string; // Real-world playing
}

// =========================================================================
// 18-STEP GLOBAL LESSON ENGINE STEP TYPES
// =========================================================================
export type LessonStepType =
  | 'INTRO'
  | 'OBJECTIVE'
  | 'EXPLANATION'
  | 'WATCH_VIBE'
  | 'HEAR_CONCEPT'
  | 'INTERACTIVE_VISUAL'
  | 'PLACE_FINGER'
  | 'PLAY_CHORD'
  | 'USER_ATTEMPT'
  | 'OBSERVE_AND_FEEDBACK'
  | 'CONTROLLED_EXERCISE'
  | 'MUSICAL_APPLICATION'
  | 'MINI_CHALLENGE'
  | 'ASSESSMENT'
  | 'MASTERY'
  | 'RECAP'
  | 'NEXT_RECOMMENDATION';

export interface FingerPlacement {
  finger: 1 | 2 | 3 | 4; // 1=Index, 2=Middle, 3=Ring, 4=Pinky
  stringIndex: number;    // 0=Low E, 1=A, 2=D, 3=G, 4=B, 5=High E
  fret: number;          // 0 to 24
  note: string;          // e.g. "C", "E", "G"
  frequency?: number;
}

export interface ChordShapeVoicing {
  name: string;          // e.g. "C Major", "A Minor"
  strings: (number | 'X')[]; // 6 items: [X, 3, 2, 0, 1, 0] for C
  fingers: (number | null)[]; // [null, 3, 2, null, 1, null]
  notes: string[];       // ["X", "C", "E", "G", "C", "E"]
  barreFret?: number;    // optional barre fret
  barreFinger?: 1 | 2;
  rootStringIndex: number; // 0 to 5
}

export interface LessonStep {
  id: string;
  type: LessonStepType;
  title: string;
  vibeDialogue: string;
  vibeInstruction?: string;
  fingerPlacement?: FingerPlacement;
  chordVoicing?: ChordShapeVoicing;
  audioFrequencies?: number[];
  audioPlaybackType?: 'pluck' | 'strum' | 'drone' | 'metronome' | 'scale';
  tempoBpm?: number;
  timeSignature?: string;
  poseTarget?: {
    checkType: 'knuckle_arch' | 'thumb_position' | 'wrist_straight' | 'sitting_angle' | 'elbow_relaxed';
    guidance: string;
    warningIfFails: string;
  };
  miniChallenge?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  exerciseRepsRequired?: number;
  durationSeconds?: number;
}

// =========================================================================
// MASTER LESSON CONTENT RULES CONTRACT
// =========================================================================
export interface LessonContentRules {
  whatAmILearning: string;
  whyAmILearningIt: string;
  whatDoesItLookLike: string;
  whatDoesItSoundLike: string;
  howDoIPhysicallyDoIt: string;
  whatShouldMyLeftHandDo: string;
  whatShouldMyRightHandDo: string;
  whatStringsFretsFingersAreInvolved: string;
  whatMistakesShouldIAvoid: string[];
  howDoesVibeCheckMe: string;
  howDoIPracticeIt: string;
  whereIsItUsedMusically: string;
  howDoIKnowIMasteredIt: string;
}

export interface MasterGuitarLesson {
  id: string;
  level: number; // 0 to 48
  stageName: string; // e.g., "Stage 1: Orientation & Ergonomics"
  levelTitle: string; // e.g., "Level 6: Open Chords"
  lessonNumber: string; // e.g., "6.1"
  title: string;
  subtitle: string;
  durationMinutes: number;
  xpReward: number;
  primarySkill: SkillCategory;
  secondarySkills: SkillCategory[];
  pedagogicalPillars: PedagogicalPillars;
  contentRules: LessonContentRules;
  steps: LessonStep[];
  repertoireTarget?: {
    title: string;
    artist: string;
    tempoBpm: number;
    keyOrMode: string;
  };
}

// =========================================================================
// MASTERY AND ADAPTIVE TEACHER RECORDS
// =========================================================================
export interface LessonMasteryRecord {
  lessonId: string;
  completed: boolean;
  mastered: boolean;
  attempts: number;
  accuracy: number; // 0.0 to 1.0
  lastPracticed: string;
  weakAreas: string[];
  stars: 0 | 1 | 2 | 3;
}

export interface DailyClassSession {
  date: string;
  welcomeMessage: string;
  warmUpLessonId: string;
  revisionLessonId: string;
  weakSkillExerciseId: string;
  newConceptLesson: MasterGuitarLesson;
  songApplicationTitle: string;
  challengePrompt: string;
  totalDurationMinutes: number;
  estimatedXp: number;
}

// =========================================================================
// GUITAR ANATOMY HOTSPOT
// =========================================================================
export interface GuitarAnatomyHotspot {
  id: string;
  name: string;
  category: 'body' | 'neck' | 'headstock' | 'electric' | 'accessories';
  description: string;
  musicalPurpose: string;
  careTip: string;
  xPercent: number; // For interactive SVG/Canvas hotspot positioning
  yPercent: number;
  audioSampleNote?: string;
}
