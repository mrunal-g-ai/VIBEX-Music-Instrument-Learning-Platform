/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  LessonStatus,
  CompletedSkillRecord,
  SpeedLabRecord,
  PracticeSessionRecord,
  AchievementItem,
} from '../types/guitarLessons';

const STORAGE_KEY_LESSON_PROGRESS = 'vibex_guitar_lesson_progress';
const STORAGE_KEY_COMPLETED_SKILLS = 'vibex_guitar_completed_skills';
const STORAGE_KEY_SPEED_LAB_RECORDS = 'vibex_guitar_speed_lab_records';
const STORAGE_KEY_CHORD_SPEED_BESTS = 'vibex_guitar_chord_speed_bests';
const STORAGE_KEY_PRACTICE_SESSIONS = 'vibex_guitar_practice_sessions';
const STORAGE_KEY_ACHIEVEMENTS = 'vibex_guitar_achievements';

const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'first_chord',
    title: 'First Complete Chord',
    description: 'Learned and played your first complete guitar chord cleanly.',
    isUnlocked: false,
    icon: 'Trophy',
  },
  {
    id: 'clean_switcher',
    title: 'Clean Switcher',
    description: 'Completed 20+ clean chord switches in the 30-second Speed Lab.',
    isUnlocked: false,
    icon: 'Zap',
  },
  {
    id: 'rhythm_keeper',
    title: 'Rhythm Keeper',
    description: 'Maintained steady metronome pulse for a full exercise duration.',
    isUnlocked: false,
    icon: 'Activity',
  },
  {
    id: 'first_song',
    title: 'First Song Jam',
    description: 'Completed your first song accompaniment practice in the Song Studio.',
    isUnlocked: false,
    icon: 'Music',
  },
  {
    id: '7_day_streak',
    title: '7-Day Streak',
    description: 'Maintained consistent daily guitar practice for 7 consecutive days.',
    isUnlocked: true,
    unlockedDate: new Date().toISOString(),
    icon: 'Flame',
  },
];

export class GuitarProgressService {
  private static instance: GuitarProgressService;

  private constructor() {}

  public static getInstance(): GuitarProgressService {
    if (!GuitarProgressService.instance) {
      GuitarProgressService.instance = new GuitarProgressService();
    }
    return GuitarProgressService.instance;
  }

  // ==========================================
  // LESSON STATUS PERSISTENCE
  // ==========================================
  public getLessonStatus(lessonId: string): LessonStatus {
    if (typeof window === 'undefined') return 'not_started';
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LESSON_PROGRESS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed[lessonId]) return parsed[lessonId];
      }
    } catch {
      // fallback
    }
    return 'not_started';
  }

  public setLessonStatus(lessonId: string, status: LessonStatus): void {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LESSON_PROGRESS);
      const parsed = saved ? JSON.parse(saved) : {};
      parsed[lessonId] = status;
      localStorage.setItem(STORAGE_KEY_LESSON_PROGRESS, JSON.stringify(parsed));
    } catch {
      // ignore
    }
  }

  public markLessonStarted(lessonId: string): void {
    const current = this.getLessonStatus(lessonId);
    if (current === 'not_started') {
      this.setLessonStatus(lessonId, 'in_progress');
    }
  }

  public markLessonCompleted(
    lessonId: string,
    skillData?: {
      skillName: string;
      category: 'Chords' | 'Technique' | 'Scales' | 'Rhythm' | 'Chord Changes';
      defaultBpm: number;
    }
  ): void {
    this.setLessonStatus(lessonId, 'completed');

    if (skillData) {
      const skills = this.getCompletedSkills();
      const existingIdx = skills.findIndex((s) => s.skillName === skillData.skillName);

      const now = new Date().toISOString();
      if (existingIdx >= 0) {
        skills[existingIdx].lastPracticedDate = now;
        skills[existingIdx].practiceCount += 1;
      } else {
        const newSkill: CompletedSkillRecord = {
          id: `skill_${Date.now()}`,
          skillName: skillData.skillName,
          category: skillData.category,
          completedDate: now,
          lastPracticedDate: now,
          practiceCount: 1,
          bestBpm: skillData.defaultBpm,
          accuracy: 90,
          isMastered: false,
        };
        skills.push(newSkill);
      }
      this.persistCompletedSkills(skills);

      // Unlock First Chord achievement if a chord was learned
      if (skillData.category === 'Chords') {
        this.unlockAchievement('first_chord');
      }
    }
  }

  public getCompletedLessonsCount(): number {
    if (typeof window === 'undefined') return 0;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LESSON_PROGRESS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Object.values(parsed).filter((s) => s === 'completed' || s === 'mastered').length;
      }
    } catch {
      // ignore
    }
    return 0;
  }

  // ==========================================
  // COMPLETED SKILLS IN PRACTICE
  // ==========================================
  public getCompletedSkills(): CompletedSkillRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETED_SKILLS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  }

  private persistCompletedSkills(skills: CompletedSkillRecord[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED_SKILLS, JSON.stringify(skills));
    } catch {
      // ignore
    }
  }

  public recordSkillPractice(skillName: string, bpm: number, accuracy: number): void {
    const skills = this.getCompletedSkills();
    const target = skills.find((s) => s.skillName === skillName);
    if (target) {
      target.lastPracticedDate = new Date().toISOString();
      target.practiceCount += 1;
      target.bestBpm = Math.max(target.bestBpm, bpm);
      target.accuracy = Math.round((target.accuracy + accuracy) / 2);
      if (target.practiceCount >= 8 && target.accuracy >= 90) {
        target.isMastered = true;
      }
      this.persistCompletedSkills(skills);
    }

    // Also record into real practice history
    this.recordPracticeSession({
      exerciseName: `${skillName} Practice`,
      category: target?.category === 'Chords' ? 'Chords' : 'Technique',
      durationMinutes: 5,
      bpm,
      cleanRepetitions: Math.round(bpm * 0.4),
    });
  }

  // ==========================================
  // REAL PRACTICE SESSIONS & HISTORY
  // ==========================================
  public getPracticeSessions(): PracticeSessionRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRACTICE_SESSIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  }

  public recordPracticeSession(
    session: Omit<PracticeSessionRecord, 'id' | 'timestamp'>
  ): PracticeSessionRecord {
    const list = this.getPracticeSessions();
    const newRecord: PracticeSessionRecord = {
      ...session,
      id: `ps_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    list.unshift(newRecord);
    if (list.length > 50) list.pop();
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_PRACTICE_SESSIONS, JSON.stringify(list));
      } catch {
        // ignore
      }
    }
    return newRecord;
  }

  public getPracticeMinutesToday(): number {
    const sessions = this.getPracticeSessions();
    const today = new Date().toDateString();
    return sessions
      .filter((s) => new Date(s.timestamp).toDateString() === today)
      .reduce((sum, s) => sum + s.durationMinutes, 0);
  }

  // ==========================================
  // ACHIEVEMENTS
  // ==========================================
  public getAchievements(): AchievementItem[] {
    if (typeof window === 'undefined') return INITIAL_ACHIEVEMENTS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ACHIEVEMENTS;
  }

  public unlockAchievement(id: string): void {
    const achievements = this.getAchievements();
    const target = achievements.find((a) => a.id === id);
    if (target && !target.isUnlocked) {
      target.isUnlocked = true;
      target.unlockedDate = new Date().toISOString();
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(achievements));
        } catch {
          // ignore
        }
      }
    }
  }

  // ==========================================
  // SPEED LAB RECORDS
  // ==========================================
  public getSpeedLabHistory(): SpeedLabRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SPEED_LAB_RECORDS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  }

  public recordSpeedLabAttempt(record: SpeedLabRecord): void {
    const list = this.getSpeedLabHistory();
    list.unshift(record);
    if (list.length > 30) list.pop();
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_SPEED_LAB_RECORDS, JSON.stringify(list));
    }

    if (record.cleanRepetitions >= 20) {
      this.unlockAchievement('clean_switcher');
    }

    // Also record in practice sessions history
    this.recordPracticeSession({
      exerciseName: record.exerciseName,
      category: 'Speed Lab',
      durationMinutes: Math.max(1, Math.round(record.durationSeconds / 60)),
      bpm: record.bpm,
      cleanRepetitions: record.cleanRepetitions,
    });
  }

  public getChordSpeedBest(pair: string): number {
    if (typeof window === 'undefined') return 0;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHORD_SPEED_BESTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed[pair] || 0;
      }
    } catch {
      // fallback
    }
    return 0;
  }

  public recordChordSpeed(pair: string, count: number): void {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHORD_SPEED_BESTS);
      const parsed = saved ? JSON.parse(saved) : {};
      const current = parsed[pair] || 0;
      if (count > current) {
        parsed[pair] = count;
        localStorage.setItem(STORAGE_KEY_CHORD_SPEED_BESTS, JSON.stringify(parsed));
      }
    } catch {
      // ignore
    }
  }
}

