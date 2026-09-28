/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LessonStatus = 'not_started' | 'in_progress' | 'completed' | 'mastered';
export type LessonDifficulty = 'Absolute Beginner' | 'Beginner' | 'Early Intermediate' | 'Intermediate' | 'Advanced' | 'Professional';

export interface FingerInstruction {
  finger: 1 | 2 | 3 | 4; // 1=Index, 2=Middle, 3=Ring, 4=Pinky
  stringNum: 1 | 2 | 3 | 4 | 5 | 6; // 6=Low E, 5=A, 4=D, 3=G, 2=B, 1=High E
  fret: number; // 0=Open, 1-24
  note: string;
}

export type StepActionType =
  | 'INTRO'
  | 'EXPLAIN'
  | 'WATCH'
  | 'LISTEN'
  | 'DEMONSTRATE'
  | 'PLACE_FINGER'
  | 'PLAY_STRING'
  | 'PLAY_NOTE'
  | 'PLAY_CHORD'
  | 'STRUM'
  | 'PICK'
  | 'RHYTHM'
  | 'REPEAT'
  | 'FEEDBACK'
  | 'RETRY'
  | 'CHALLENGE'
  | 'SONG_APPLICATION'
  | 'ASSESSMENT'
  | 'RECAP'
  | 'COMPLETE';

export interface LessonStepItem {
  id: string;
  type: StepActionType;
  title: string;
  vibeText: string;
  vibeDialogue: string;
  fingerInstruction?: FingerInstruction;
  chordName?: string;
  chordStrings?: (number | 'X')[]; // 6 strings: [6th, 5th, 4th, 3rd, 2nd, 1st]
  chordFingers?: (number | null)[];
  chordNotes?: string[];
  singleStringNum?: number; // 1 to 6
  fretTarget?: number;
  audioFreq?: number;
  scaleNotes?: string[];
  tempoBpm?: number;
  timeSignature?: string;
  challengeQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  repsRequired?: number;
}

export interface GuitarLesson {
  id: string;
  lessonNumber: string; // e.g. "1.1", "4.2"
  title: string;
  subtitle: string;
  moduleId: string;
  moduleName: string;
  level: number; // 1 to 5
  levelName: LessonDifficulty;
  durationMinutes: number;
  difficulty: LessonDifficulty;
  category: 'Foundation' | 'First Sounds' | 'Technique' | 'Chords' | 'Rhythm' | 'Chord Changes' | 'Songs' | 'Scales' | 'Lead' | 'Advanced';
  status: LessonStatus;
  isImplemented: boolean; // True if step-by-step interactive engine is ready; False if curriculum defined preview
  objectives: string[];
  whatYouWillLearn: string[];
  steps: LessonStepItem[];
  repertoireSongRef?: string;
}

export interface GuitarModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  level: number;
  lessons: GuitarLesson[];
}

export interface CompletedSkillRecord {
  id: string;
  skillName: string;
  category: 'Chords' | 'Technique' | 'Scales' | 'Rhythm' | 'Chord Changes';
  completedDate: string;
  lastPracticedDate: string;
  practiceCount: number;
  bestBpm: number;
  accuracy: number; // 0 to 100
  isMastered: boolean;
}

export interface SpeedLabRecord {
  exerciseId: string;
  exerciseName: string;
  date: string;
  bpm: number;
  durationSeconds: number;
  cleanRepetitions: number;
  accuracy: number;
}

export interface GuitarSongItem {
  id: string;
  title: string;
  artist: string;
  chords: string[];
  difficulty: LessonDifficulty;
  tempoBpm: number;
  timeSignature: string;
  strummingPattern: string; // e.g. "D - D - U - U - D"
  description: string;
  isUnlocked: boolean;
}
