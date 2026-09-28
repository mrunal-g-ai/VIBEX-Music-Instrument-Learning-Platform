/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LessonStatus, CompletedSkillRecord, SpeedLabRecord } from '../types/guitarLessons';

const STORAGE_KEY_LESSON_PROGRESS = 'vibex_guitar_lesson_progress';
const STORAGE_KEY_COMPLETED_SKILLS = 'vibex_guitar_completed_skills';
const STORAGE_KEY_SPEED_LAB_RECORDS = 'vibex_guitar_speed_lab_records';
const STORAGE_KEY_CHORD_SPEED_BESTS = 'vibex_guitar_chord_speed_bests';

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
    }
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
