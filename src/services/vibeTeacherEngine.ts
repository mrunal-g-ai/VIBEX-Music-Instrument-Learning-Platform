/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  GuitarSkillProfile,
  SkillCategory,
  LessonMasteryRecord,
  MasterGuitarLesson,
  DailyClassSession,
  SkillCategoryInfo,
} from '../types/guitarCurriculum';

export const SKILL_CATEGORIES_METADATA: SkillCategoryInfo[] = [
  { key: 'technique', label: 'Technique', color: '#8067FF', description: 'Finger curvature, knuckle arch, pick grip & economy' },
  { key: 'rhythm', label: 'Rhythm', color: '#54D6C3', description: 'Metronome pulse, quarter/8th/16th grid, syncopation' },
  { key: 'chords', label: 'Chords', color: '#FF8066', description: 'Open voicings, barre shapes, 7ths, extensions & clarity' },
  { key: 'chordChanges', label: 'Chord Changes', color: '#F4BB55', description: 'Pivot fingers, switches per minute, zero-pause flow' },
  { key: 'scales', label: 'Scales', color: '#E889A5', description: 'Pentatonic boxes, major/minor formulas, 7 modes' },
  { key: 'lead', label: 'Lead & Expression', color: '#FF5C93', description: 'Bends, vibrato, slides, hammer-ons & pull-offs' },
  { key: 'fingerstyle', label: 'Fingerstyle', color: '#7EE787', description: 'P-I-M-A thumb independence, Travis picking' },
  { key: 'theory', label: 'Music Theory', color: '#45D483', description: 'Intervals, triad construction, circle of fifths' },
  { key: 'earTraining', label: 'Ear Training', color: '#2BD2FF', description: 'Higher/lower pitch, intervals, chord quality, transcription' },
  { key: 'fretboard', label: 'Fretboard Mastery', color: '#A78BFA', description: 'Note location on all 6 strings, octaves, CAGED' },
  { key: 'repertoire', label: 'Repertoire', color: '#FBBF24', description: 'Full songs, chord charts, intro riffs, dynamic arrangements' },
  { key: 'improvisation', label: 'Improvisation', color: '#38BDF8', description: 'Call & response, motif repetition, phrasing & space' },
  { key: 'composition', label: 'Composition', color: '#C084FC', description: 'Songwriting, riffs, chord progressions, harmonies' },
  { key: 'performance', label: 'Performance', color: '#FB7185', description: 'Stage poise, recording takes, tone shaping, click tracking' },
];

const DEFAULT_PROFILE: GuitarSkillProfile = {
  technique: 6,
  rhythm: 7,
  chords: 6,
  chordChanges: 5,
  scales: 4,
  lead: 4,
  fingerstyle: 3,
  theory: 5,
  earTraining: 3,
  fretboard: 4,
  repertoire: 6,
  improvisation: 3,
  composition: 2,
  performance: 4,
};

const STORAGE_KEY_PROFILE = 'vibex_guitar_skill_profile';
const STORAGE_KEY_MASTERY = 'vibex_guitar_mastery_records';

export class VibeTeacherEngine {
  private static instance: VibeTeacherEngine;
  private skillProfile: GuitarSkillProfile;
  private masteryRecords: Map<string, LessonMasteryRecord>;

  private constructor() {
    this.skillProfile = this.loadProfile();
    this.masteryRecords = this.loadMasteryRecords();
  }

  public static getInstance(): VibeTeacherEngine {
    if (!VibeTeacherEngine.instance) {
      VibeTeacherEngine.instance = new VibeTeacherEngine();
    }
    return VibeTeacherEngine.instance;
  }

  // =========================================================================
  // SKILL PROFILE MANAGEMENT
  // =========================================================================
  private loadProfile(): GuitarSkillProfile {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_PROFILE;
  }

  public getSkillProfile(): GuitarSkillProfile {
    return { ...this.skillProfile };
  }

  public updateSkillScore(skill: SkillCategory, delta: number): void {
    const current = this.skillProfile[skill];
    const updated = Math.min(10, Math.max(1, current + delta));
    this.skillProfile[skill] = updated;
    this.persistProfile();
  }

  private persistProfile(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(this.skillProfile));
    } catch {
      // ignore
    }
  }

  // =========================================================================
  // MASTERY RECORDS
  // =========================================================================
  private loadMasteryRecords(): Map<string, LessonMasteryRecord> {
    const map = new Map<string, LessonMasteryRecord>();
    if (typeof window === 'undefined') return map;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MASTERY);
      if (saved) {
        const parsed: Record<string, LessonMasteryRecord> = JSON.parse(saved);
        Object.entries(parsed).forEach(([k, v]) => map.set(k, v));
      }
    } catch {
      // ignore
    }
    return map;
  }

  public getMasteryRecord(lessonId: string): LessonMasteryRecord | undefined {
    return this.masteryRecords.get(lessonId);
  }

  public recordLessonAttempt(
    lessonId: string,
    accuracy: number,
    weakAreas: string[] = []
  ): LessonMasteryRecord {
    const existing = this.masteryRecords.get(lessonId) || {
      lessonId,
      completed: false,
      mastered: false,
      attempts: 0,
      accuracy: 0,
      lastPracticed: new Date().toISOString(),
      weakAreas: [],
      stars: 0,
    };

    const newAttempts = existing.attempts + 1;
    const bestAccuracy = Math.max(existing.accuracy, accuracy);
    const completed = true;
    const mastered = bestAccuracy >= 0.85;
    const stars: 0 | 1 | 2 | 3 =
      bestAccuracy >= 0.9 ? 3 : bestAccuracy >= 0.75 ? 2 : bestAccuracy >= 0.6 ? 1 : 0;

    const updatedRecord: LessonMasteryRecord = {
      lessonId,
      completed,
      mastered,
      attempts: newAttempts,
      accuracy: bestAccuracy,
      lastPracticed: new Date().toISOString(),
      weakAreas: Array.from(new Set([...existing.weakAreas, ...weakAreas])),
      stars,
    };

    this.masteryRecords.set(lessonId, updatedRecord);
    this.persistMasteryRecords();
    return updatedRecord;
  }

  private persistMasteryRecords(): void {
    if (typeof window === 'undefined') return;
    try {
      const obj: Record<string, LessonMasteryRecord> = {};
      this.masteryRecords.forEach((v, k) => (obj[k] = v));
      localStorage.setItem(STORAGE_KEY_MASTERY, JSON.stringify(obj));
    } catch {
      // ignore
    }
  }

  // =========================================================================
  // ADAPTIVE DIAGNOSIS & TODAY'S CLASS GENERATION
  // =========================================================================
  public diagnoseWeaknesses(): {
    strengths: SkillCategoryInfo[];
    weaknesses: SkillCategoryInfo[];
    vibeRecommendation: string;
  } {
    const profile = this.skillProfile;
    const sorted = [...SKILL_CATEGORIES_METADATA].sort(
      (a, b) => profile[a.key] - profile[b.key]
    );

    const weaknesses = sorted.slice(0, 3);
    const strengths = sorted.slice(-3).reverse();

    let vibeRecommendation = `Your ${strengths[0].label} (${profile[strengths[0].key]}/10) is showing remarkable confidence! `;
    if (profile[weaknesses[0].key] <= 4) {
      vibeRecommendation += `However, your ${weaknesses[0].label} (${profile[weaknesses[0].key]}/10) needs reinforcement before we leap ahead. Today Vibe prepared a balanced 15-minute workout to synchronize your fretboard with your ear!`;
    } else {
      vibeRecommendation += `All fundamental pillars are stabilizing nicely. Let's tackle a new milestone chord change and syncopated rhythm!`;
    }

    return { strengths, weaknesses, vibeRecommendation };
  }

  public generateDailyClass(availableLessons: MasterGuitarLesson[]): DailyClassSession {
    const { vibeRecommendation, weaknesses } = this.diagnoseWeaknesses();

    // Find lesson that targets weakness or is the next unmastered lesson
    const primaryWeakness = weaknesses[0].key;
    const targetedLesson =
      availableLessons.find(
        (l) =>
          l.primarySkill === primaryWeakness && !this.masteryRecords.get(l.id)?.mastered
      ) ||
      availableLessons.find((l) => !this.masteryRecords.get(l.id)?.completed) ||
      availableLessons[0];

    const todayDateStr = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    return {
      date: todayDateStr,
      welcomeMessage: `Welcome to Today's Custom Studio Session! ${vibeRecommendation}`,
      warmUpLessonId: 'guitar_spider_warmup',
      revisionLessonId: 'guitar_open_chords_rev',
      weakSkillExerciseId: `ear_fretboard_${primaryWeakness}`,
      newConceptLesson: targetedLesson,
      songApplicationTitle: targetedLesson.repertoireTarget?.title || 'Knockin on Heavens Door',
      challengePrompt: `Can you achieve a 3-star intonation score on ${targetedLesson.title} without looking at your fretting hand?`,
      totalDurationMinutes: 25,
      estimatedXp: 350,
    };
  }
}
