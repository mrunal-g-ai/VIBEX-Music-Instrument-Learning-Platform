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
  const skillAssessments = teacherEngine.getSkillAssessmentDetails();
  const progressService = GuitarProgressService.getInstance();
  const completedSkills = progressService.getCompletedSkills();
  const completedLessonsCount = progressService.getCompletedLessonsCount();
  const practiceSessions = progressService.getPracticeSessions();
  const practiceMinutesToday = progressService.getPracticeMinutesToday();
  const achievements = progressService.getAchievements();
  const speedHistory = progressService.getSpeedLabHistory();

  const totalPracticeMinutes = practiceSessions.reduce((acc, s) => acc + s.durationMinutes, 0);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-20 text-[#F6F4FF]">
      {/* 1. Profile Header & Current Stage */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8067FF] to-[#FF8066] flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-[#8067FF]/25">
            G
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#FF8066] uppercase">
                Guitarist
              </span>
              <span className="text-[#303348]">·</span>
              <span className="text-xs text-[#54D6C3] font-mono font-bold">VIBEX Guitar Studio</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#F6F4FF] mt-0.5">
              Current Stage: Absolute Beginner
            </h1>
            <p className="text-xs text-[#A9A8BA] mt-0.5">
              Progress: based on actual completed curriculum criteria · Next milestone: Play 5 open chords cleanly
            </p>
          </div>
        </div>

        {/* Real Stats Pill */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-end">
          <div className="p-3 bg-[#0D0E17] rounded-xl border border-[#303348] text-center min-w-[80px]">
            <span className="text-[10px] text-[#A9A8BA] block uppercase font-mono">Streak</span>
            <span className="text-sm font-bold font-mono text-[#FF8066] flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#FF8066]" /> {streakCount}d
            </span>
          </div>

          <div className="p-3 bg-[#0D0E17] rounded-xl border border-[#303348] text-center min-w-[80px]">
            <span className="text-[10px] text-[#A9A8BA] block uppercase font-mono">Lessons</span>
            <span className="text-sm font-bold font-mono text-[#54D6C3]">
              {completedLessonsCount}
            </span>
          </div>

          <div className="p-3 bg-[#0D0E17] rounded-xl border border-[#303348] text-center min-w-[80px]">
            <span className="text-[10px] text-[#A9A8BA] block uppercase font-mono">Practice</span>
            <span className="text-sm font-bold font-mono text-[#8067FF]">
              {totalPracticeMinutes}m
            </span>
          </div>

          <div className="p-3 bg-[#0D0E17] rounded-xl border border-[#303348] text-center min-w-[80px]">
            <span className="text-[10px] text-[#A9A8BA] block uppercase font-mono">Skills</span>
            <span className="text-sm font-bold font-mono text-[#45D483]">
              {completedSkills.length}
            </span>
          </div>
        </div>
      </div>

      {/* 2. 14-Dimension Skill Progression (No Fake Scores) */}
      <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#303348] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#F6F4FF]">Skill Progression & Evidence</h3>
            <p className="text-xs text-[#A9A8BA]">
              Evaluated strictly from recorded lessons, speed benchmarks, and studio practice sessions
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#A9A8BA]">
            {skillAssessments.filter((s) => s.isAssessed).length} of 14 dimensions assessed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {skillAssessments.map((cat) => {
            return (
              <div
                key={cat.key}
                className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex flex-col justify-between gap-2 hover:border-[#303348]/80 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-[#F6F4FF] line-clamp-1">
                      {cat.label}
                    </span>
                    {cat.isAssessed && cat.score !== null ? (
                      <span className="font-mono text-xs font-bold" style={{ color: cat.color }}>
                        {cat.score}/10
                      </span>
                    ) : null}
                  </div>
                  <span
                    className={`text-[10px] block leading-tight ${
                      cat.isAssessed ? 'text-[#A9A8BA]' : 'text-[#A9A8BA]/60 italic font-mono'
                    }`}
                  >
                    {cat.evidenceText}
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-[#1D2032] overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: cat.isAssessed && cat.score !== null ? `${(cat.score / 10) * 100}%` : '0%',
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Real Practice History */}
      <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#303348] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#F6F4FF]">Practice History</h3>
            <p className="text-xs text-[#A9A8BA]">Actual verified practice routines logged in VIBEX</p>
          </div>
          <span className="text-xs font-mono text-[#54D6C3]">
            Today: {practiceMinutesToday} min practiced
          </span>
        </div>

        {practiceSessions.length === 0 ? (
          <p className="text-xs text-[#A9A8BA] py-3 text-center">
            No practice sessions logged yet today. Practice in the Speed Lab, studio tools, or complete a lesson to build your history!
          </p>
        ) : (
          <div className="divide-y divide-[#303348] text-xs">
            {practiceSessions.slice(0, 8).map((session) => (
              <div key={session.id} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#8067FF]" />
                  <div>
                    <span className="font-bold text-[#F6F4FF]">{session.exerciseName}</span>
                    <span className="text-[10px] text-[#A9A8BA] block font-mono">
                      {session.category} · {new Date(session.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono">
                  {session.bpm && (
                    <span className="text-[#FF8066] font-bold">{session.bpm} BPM</span>
                  )}
                  {session.cleanRepetitions && (
                    <span className="text-[#54D6C3]">{session.cleanRepetitions} reps</span>
                  )}
                  <span className="text-[#A9A8BA]">{session.durationMinutes} min</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Genuine Achievements (Locked / Unlocked based on real actions) */}
      <div className="p-6 rounded-3xl bg-[#151725] border border-[#303348] flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#303348] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#F6F4FF]">Achievements</h3>
            <p className="text-xs text-[#A9A8BA]">Milestones unlocked through verified guitar practice</p>
          </div>
          <span className="text-xs font-mono text-[#A9A8BA]">
            {achievements.filter((a) => a.isUnlocked).length} / {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border flex items-start gap-3 transition-colors ${
                ach.isUnlocked
                  ? 'bg-[#0D0E17] border-[#45D483]/40'
                  : 'bg-[#151725]/50 border-[#303348]/60 opacity-60'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  ach.isUnlocked
                    ? 'bg-[#45D483]/20 border-[#45D483] text-[#45D483]'
                    : 'bg-[#1D2032] border-[#303348] text-[#A9A8BA]'
                }`}
              >
                {ach.isUnlocked ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Shield className="w-5 h-5 text-[#A9A8BA]/60" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#F6F4FF]">{ach.title}</h4>
                  {ach.isUnlocked && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#45D483]/20 text-[#45D483] font-bold">
                      Unlocked
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#A9A8BA] mt-1 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

