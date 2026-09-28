/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GuitarProgressService } from '../services/guitarProgressService';
import { VibeTeacherEngine, SKILL_CATEGORIES_METADATA } from '../services/vibeTeacherEngine';
import {
  User,
  Award,
  Clock,
  Flame,
  CheckCircle2,
  Zap,
  Activity,
  Shield,
  Sliders,
} from 'lucide-react';

interface ProfileViewProps {
  streakCount: number;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ streakCount }) => {
  const teacherEngine = VibeTeacherEngine.getInstance();
  const skillProfile = teacherEngine.getSkillProfile();
  const progressService = GuitarProgressService.getInstance();
  const completedSkills = progressService.getCompletedSkills();
  const speedHistory = progressService.getSpeedLabHistory();

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-20 text-[#F6F4FF]">
      {/* Profile Header */}
      <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8067FF] to-[#FF8066] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#8067FF]/25">
            G
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#FF8066] uppercase">
                Guitarist
              </span>
              <span className="text-[#303348]">·</span>
              <span className="text-xs text-[#54D6C3] font-mono font-bold">VIBEX Student</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#F6F4FF] mt-0.5">
              Guitar Learning Profile
            </h1>
            <p className="text-xs text-[#A9A8BA]">
              Active Level 1: Absolute Beginner to Early Intermediate
            </p>
          </div>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#0D0E17] rounded-xl border border-[#303348] text-center">
            <span className="text-[10px] text-[#A9A8BA] block uppercase">Streak</span>
            <span className="text-sm font-bold font-mono text-[#FF8066] flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#FF8066]" /> {streakCount} Days
            </span>
          </div>

          <div className="p-3 bg-[#0D0E17] rounded-xl border border-[#303348] text-center">
            <span className="text-[10px] text-[#A9A8BA] block uppercase">Completed</span>
            <span className="text-sm font-bold font-mono text-[#54D6C3]">
              {completedSkills.length} Skills
            </span>
          </div>
        </div>
      </div>

      {/* 14-Dimension Skill Radar / Breakdown */}
      <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#303348] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#F6F4FF]">14-Dimension Skill Profile</h3>
            <p className="text-xs text-[#A9A8BA]">
              Tracked across technique, rhythm, chords, fretboard, and musicianship
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {SKILL_CATEGORIES_METADATA.map((cat) => {
            const score = skillProfile[cat.key];
            const percent = (score / 10) * 100;

            return (
              <div
                key={cat.key}
                className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348] flex flex-col justify-between gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#F6F4FF] line-clamp-1">
                    {cat.label}
                  </span>
                  <span className="font-mono text-xs font-bold" style={{ color: cat.color }}>
                    {score}/10
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-[#1D2032] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real Speed Lab History */}
      <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-4">
        <h3 className="text-base font-bold text-[#F6F4FF]">Speed Lab Practice Logs</h3>
        {speedHistory.length === 0 ? (
          <p className="text-xs text-[#A9A8BA]">
            No speed lab sessions recorded yet. Launch the 30-second Chord Sprint or Spider Walk in Practice to start logging your personal bests!
          </p>
        ) : (
          <div className="divide-y divide-[#303348] text-xs">
            {speedHistory.map((rec, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#F6F4FF]">{rec.exerciseName}</span>
                  <span className="text-[10px] text-[#A9A8BA] block font-mono">
                    {new Date(rec.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-[#54D6C3] font-bold">{rec.bpm} BPM</span>
                  <span className="text-[#A9A8BA]">{rec.cleanRepetitions} clean reps</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
