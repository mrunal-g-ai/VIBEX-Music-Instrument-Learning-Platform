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

import { GuitarProgressService } from './guitarProgressService';

const DEFAULT_PROFILE: GuitarSkillProfile = {
  technique: null,
  rhythm: null,
  chords: null,
  chordChanges: null,
  scales: null,
  lead: null,
  fingerstyle: null,
  theory: null,
  earTraining: null,
  fretboard: null,
  repertoire: null,
  improvisation: null,
  composition: null,
  performance: null,
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
  // SKILL PROFILE MANAGEMENT (REAL EVIDENCE BASED)
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

  /**
   * Returns honest, evidence-backed skill assessments.
   * If user has no sessions or completed lessons in a category, returns 'Not assessed yet'.
   */
  public getSkillAssessmentDetails() {
    const progressService = GuitarProgressService.getInstance();
    const completedSkills = progressService.getCompletedSkills();
    const sessions = progressService.getPracticeSessions();
    const speedHistory = progressService.getSpeedLabHistory();

    const chordSkills = completedSkills.filter((s) => s.category === 'Chords');
    const techniqueSessions = sessions.filter((s) => s.category === 'Technique' || s.exerciseName.includes('Spider'));
    const rhythmSessions = sessions.filter((s) => s.category === 'Rhythm' || s.exerciseName.includes('Strum'));
    const speedSessions = speedHistory.length;

    return SKILL_CATEGORIES_METADATA.map((cat) => {
      let isAssessed = false;
      let score: number | null = null;
      let evidenceText = 'Not assessed yet';

      if (cat.key === 'chords') {
        if (chordSkills.length > 0) {
          isAssessed = true;
          const avgAcc = chordSkills.reduce((acc, s) => acc + s.accuracy, 0) / chordSkills.length;
          score = Math.round((avgAcc / 10) * 10) / 10;
          evidenceText = `${chordSkills.length} chord${chordSkills.length > 1 ? 's' : ''} learned · ${chordSkills.reduce((acc, s) => acc + s.practiceCount, 0)} practices`;
        }
      } else if (cat.key === 'technique') {
        if (techniqueSessions.length > 0) {
          isAssessed = true;
          score = Math.min(10, Math.round(5.0 + techniqueSessions.length * 0.4));
          evidenceText = `Based on ${techniqueSessions.length} dexterity drill${techniqueSessions.length > 1 ? 's' : ''}`;
        }
      } else if (cat.key === 'chordChanges') {
        if (speedSessions > 0) {
          isAssessed = true;
          const best = Math.max(...speedHistory.map((s) => s.cleanRepetitions));
          score = Math.min(10, Math.round((best / 25) * 10));
          evidenceText = `Best: ${best} switches/30s · ${speedSessions} tests`;
        }
      } else if (cat.key === 'rhythm') {
        if (rhythmSessions.length > 0) {
          isAssessed = true;
          score = Math.min(10, Math.round(5.0 + rhythmSessions.length * 0.5));
          evidenceText = `Based on ${rhythmSessions.length} metronome sessions`;
        }
      } else if (cat.key === 'repertoire') {
        const songSessions = sessions.filter((s) => s.category === 'Songs');
        if (songSessions.length > 0) {
          isAssessed = true;
          score = Math.min(10, Math.round(4.0 + songSessions.length * 0.5));
          evidenceText = `${songSessions.length} song practice take${songSessions.length > 1 ? 's' : ''}`;
        }
      }

      return {
        key: cat.key,
        label: cat.label,
        color: cat.color,
        description: cat.description,
        isAssessed,
        score,
        evidenceText,
      };
    });
  }

  public updateSkillScore(skill: SkillCategory, delta: number): void {
    const current = this.skillProfile[skill] || 5;
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
      (a, b) => (profile[a.key] ?? 0) - (profile[b.key] ?? 0)
    );

    const weaknesses = sorted.slice(0, 3);
    const strengths = sorted.slice(-3).reverse();

    const hasAnyAssessment = Object.values(profile).some((v) => v !== null);

    let vibeRecommendation: string;
    if (!hasAnyAssessment) {
      vibeRecommendation =
        'Welcome to VIBEX Guitar Studio! Start with foundational guitar posture, string names, and your first complete chord (C Major) to establish your personal skill baseline.';
    } else {
      const bestScore = profile[strengths[0].key];
      vibeRecommendation = `Your ${strengths[0].label}${bestScore !== null ? ` (${bestScore}/10)` : ''} is developing with practice. Let's continue reinforcing fundamental open chords and steady strumming.`;
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
