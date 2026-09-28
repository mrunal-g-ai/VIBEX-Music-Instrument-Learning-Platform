/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GuitarProgressService } from '../services/guitarProgressService';
import { CompletedSkillRecord } from '../types/guitarLessons';
import { SpeedLabView } from '../components/practice/SpeedLabView';
import { MetronomeTool } from '../components/practice/MetronomeTool';
import { TunerTool } from '../components/practice/TunerTool';
import { RecorderTool } from '../components/practice/RecorderTool';
import { MasterGuitarFretboard } from '../components/instruments/MasterGuitarFretboard';
import { VibexAudioEngine } from '../services/audioEngine';
import {
  Zap,
  Gauge,
  Sparkles,
  Trophy,
  Activity,
  Layers,
  Clock,
  Mic,
  Music,
  Play,
  Pause,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Radio,
  BookOpen,
  Volume2,
  ChevronRight,
} from 'lucide-react';

interface PracticeViewProps {
  onNavigateToLearn: () => void;
  onNavigateToSongs: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  onNavigateToLearn,
  onNavigateToSongs,
}) => {
  const [activeTab, setActiveTab] = useState<'skills' | 'speed_lab' | 'tools' | 'free_play' | 'coached'>('skills');
  const [activeTool, setActiveTool] = useState<'metronome' | 'tuner' | 'recorder' | 'backing_track'>('metronome');

  // Backing Track State
  const [isPlayingBacking, setIsPlayingBacking] = useState<boolean>(false);
  const [backingBpm, setBackingBpm] = useState<number>(85);
  const [backingStyle, setBackingStyle] = useState<'blues' | 'acoustic' | 'rock'>('acoustic');

  const progressService = GuitarProgressService.getInstance();
  const completedSkills = progressService.getCompletedSkills();
  const audioEngine = VibexAudioEngine.getInstance();

  // Handle Backing Track Play/Stop
  const toggleBackingTrack = () => {
    if (isPlayingBacking) {
      audioEngine.stopMetronome();
      setIsPlayingBacking(false);
    } else {
      audioEngine.startMetronome(backingBpm, 'eighth', 'woodblock');
      setIsPlayingBacking(true);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-20 text-[#F6F4FF]">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#303348] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8066]" />
            <span className="text-xs font-mono font-bold text-[#FF8066] uppercase tracking-wider">
              GUITAR PRACTICE STUDIO
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F6F4FF] tracking-tight mt-1">
            Practice Workbench
          </h1>
          <p className="text-xs text-[#A9A8BA] mt-0.5">
            What do you want to practice right now? Choose a completed skill, Speed Lab, or studio tool.
          </p>
        </div>

        {/* Coached Practice Button */}
        <button
          onClick={() => setActiveTab('coached')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8066] to-[#E889A5] hover:brightness-110 text-[#0D0E17] font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#FF8066]/20 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>Vibe Coached Session</span>
        </button>
      </div>

      {/* Main Studio Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'skills'
              ? 'bg-[#8067FF] text-[#F6F4FF] shadow-md shadow-[#8067FF]/20'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          Completed Skills ({completedSkills.length})
        </button>

        <button
          onClick={() => setActiveTab('speed_lab')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'speed_lab'
              ? 'bg-[#FF8066] text-[#0D0E17] shadow-md'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Speed Lab</span>
        </button>

        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'tools'
              ? 'bg-[#8067FF] text-[#F6F4FF] shadow-md'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Studio Tools</span>
        </button>

        <button
          onClick={() => setActiveTab('free_play')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'free_play'
              ? 'bg-[#54D6C3] text-[#0D0E17] shadow-md'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Free Play Lab</span>
        </button>
      </div>

      {/* TAB 1: COMPLETED SKILLS */}
      {activeTab === 'skills' && (
        <div className="flex flex-col gap-5">
          {completedSkills.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col items-center justify-center text-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8067FF]/20 border border-[#8067FF] flex items-center justify-center text-[#8067FF]">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="max-w-md">
                <h3 className="text-base font-bold text-[#F6F4FF]">No Completed Skills Yet</h3>
                <p className="text-xs text-[#A9A8BA] mt-1.5 leading-relaxed">
                  Practice is built from the skills you have actually completed in Learn. Complete your first lesson (like Spider Walk or C Major) to add it to your practice studio!
                </p>
              </div>
              <button
                onClick={onNavigateToLearn}
                className="px-6 py-2.5 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#8067FF]/20 transition-all"
              >
                <span>Go to Learn Curriculum</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-5 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col justify-between gap-4 shadow-lg hover:border-[#8067FF]/60 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1D2032] text-[#54D6C3] uppercase">
                        {skill.category}
                      </span>
                      <h3 className="text-base font-bold text-[#F6F4FF] mt-1.5">
                        {skill.skillName}
                      </h3>
                    </div>
                    {skill.isMastered && (
                      <span className="px-2 py-0.5 rounded-full bg-[#45D483]/20 border border-[#45D483] text-[#45D483] text-[10px] font-bold">
                        Mastered
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-[#A9A8BA] border-t border-[#303348] pt-3">
                    <span>Best: {skill.bestBpm} BPM</span>
                    <span>Practiced: {skill.practiceCount}x</span>
                  </div>

                  {/* Practice Options */}
                  <div className="grid grid-cols-3 gap-1.5 text-xs font-bold text-center">
                    <button
                      onClick={() => progressService.recordSkillPractice(skill.skillName, 50, 92)}
                      className="py-1.5 rounded-lg bg-[#0D0E17] hover:bg-[#1D2032] text-[#A9A8BA] hover:text-[#F6F4FF] border border-[#303348]"
                    >
                      Slow (50)
                    </button>
                    <button
                      onClick={() => progressService.recordSkillPractice(skill.skillName, 70, 94)}
                      className="py-1.5 rounded-lg bg-[#0D0E17] hover:bg-[#1D2032] text-[#54D6C3] border border-[#303348]"
                    >
                      Normal (70)
                    </button>
                    <button
                      onClick={() => progressService.recordSkillPractice(skill.skillName, 90, 90)}
                      className="py-1.5 rounded-lg bg-[#0D0E17] hover:bg-[#1D2032] text-[#FF8066] border border-[#303348]"
                    >
                      Speed (90)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SPEED LAB */}
      {activeTab === 'speed_lab' && (
        <SpeedLabView onBack={() => setActiveTab('skills')} />
      )}

      {/* TAB 3: TOOLS (Metronome, Tuner, Recorder, Backing Tracks) */}
      {activeTab === 'tools' && (
        <div className="flex flex-col gap-6">
          {/* Sub-tools Picker */}
          <div className="flex items-center gap-2 border-b border-[#303348] pb-3 text-xs">
            <button
              onClick={() => setActiveTool('metronome')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTool === 'metronome'
                  ? 'bg-[#8067FF] text-[#F6F4FF]'
                  : 'bg-[#151725] text-[#A9A8BA] hover:text-[#F6F4FF]'
              }`}
            >
              Metronome
            </button>
            <button
              onClick={() => setActiveTool('tuner')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTool === 'tuner'
                  ? 'bg-[#54D6C3] text-[#0D0E17]'
                  : 'bg-[#151725] text-[#A9A8BA] hover:text-[#F6F4FF]'
              }`}
            >
              Guitar Tuner
            </button>
            <button
              onClick={() => setActiveTool('recorder')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTool === 'recorder'
                  ? 'bg-[#F06B78] text-white'
                  : 'bg-[#151725] text-[#A9A8BA] hover:text-[#F6F4FF]'
              }`}
            >
              Take Recorder
            </button>
            <button
              onClick={() => setActiveTool('backing_track')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTool === 'backing_track'
                  ? 'bg-[#FF8066] text-[#0D0E17]'
                  : 'bg-[#151725] text-[#A9A8BA] hover:text-[#F6F4FF]'
              }`}
            >
              Backing Tracks
            </button>
          </div>

          {activeTool === 'metronome' && <MetronomeTool />}
          {activeTool === 'tuner' && <TunerTool />}
          {activeTool === 'recorder' && <RecorderTool />}

          {/* BACKING TRACKS TOOL */}
          {activeTool === 'backing_track' && (
            <div className="p-6 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-[#303348] pb-3">
                <div>
                  <h3 className="text-base font-bold text-[#F6F4FF]">Rhythm Backing Tracks</h3>
                  <p className="text-xs text-[#A9A8BA]">Jam along to continuous acoustic and blues rhythm grooves</p>
                </div>

                <div className="flex items-center gap-2">
                  {(['acoustic', 'blues', 'rock'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setBackingStyle(st)}
                      className={`px-3 py-1 rounded-lg text-xs capitalize font-bold ${
                        backingStyle === st ? 'bg-[#FF8066] text-[#0D0E17]' : 'bg-[#0D0E17] text-[#A9A8BA]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-[#0D0E17] border border-[#303348]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleBackingTrack}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white transition-all ${
                      isPlayingBacking ? 'bg-[#F06B78]' : 'bg-[#54D6C3] text-[#0D0E17]'
                    }`}
                  >
                    {isPlayingBacking ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>
                  <div>
                    <span className="text-sm font-bold text-[#F6F4FF] capitalize">
                      {backingStyle} Rhythm Groove ({backingBpm} BPM)
                    </span>
                    <span className="text-xs text-[#A9A8BA] block">
                      {backingStyle === 'acoustic' ? 'Chords: G - D - Am - C' : backingStyle === 'blues' ? '12-Bar Blues in E' : 'Rock Drive in A Minor'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-[#A9A8BA]">Tempo:</span>
                  <input
                    type="range"
                    min={60}
                    max={140}
                    value={backingBpm}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      setBackingBpm(v);
                      if (isPlayingBacking) {
                        audioEngine.startMetronome(v, 'eighth', 'woodblock');
                      }
                    }}
                    className="w-32 h-1.5 bg-[#1D2032] rounded-lg appearance-none cursor-pointer accent-[#FF8066]"
                  />
                  <span className="text-[#FF8066] font-bold w-12">{backingBpm} BPM</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: FREE PLAY LAB */}
      {activeTab === 'free_play' && (
        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-[#151725] border border-[#303348]">
          <div className="flex items-center justify-between border-b border-[#303348] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#F6F4FF]">Free Play Fretboard Lab</h3>
              <p className="text-xs text-[#A9A8BA]">
                Pluck any string or fret to explore notes, discover chords, and experiment freely
              </p>
            </div>
          </div>
          <MasterGuitarFretboard interactive={true} />
        </div>
      )}

      {/* TAB 5: VIBE COACHED SESSION */}
      {activeTab === 'coached' && (
        <div className="p-6 rounded-2xl bg-[#151725] border border-[#FF8066]/40 flex flex-col gap-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#303348] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FF8066]/20 border border-[#FF8066] flex items-center justify-center text-[#FF8066]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F6F4FF]">Vibe Coached Practice Routine</h3>
                <p className="text-xs text-[#A9A8BA]">Guided 5-phase structured practice workout</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('skills')}
              className="text-xs text-[#A9A8BA] hover:text-[#F6F4FF]"
            >
              Back to Studio
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F6F4FF]">1. Warm-Up: 3 min Spider Walk (1-2-3-4)</span>
              <span className="text-[#54D6C3] font-mono">50 BPM</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F6F4FF]">2. Precision: 5 min C → G Transitions</span>
              <span className="text-[#FF8066] font-mono">30s Sprint</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F6F4FF]">3. Rhythm: 5 min D-D-U-U-D Folk Strumming</span>
              <span className="text-[#8067FF] font-mono">65 BPM</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F6F4FF]">4. Song: 5 min Knockin on Heavens Door</span>
              <span className="text-[#F4BB55] font-mono">Full Loop</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F6F4FF]">5. Cool-Down: Free Play & Ear Check</span>
              <span className="text-[#A9A8BA] font-mono">2 min</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('speed_lab')}
            className="w-full py-3 rounded-xl bg-[#FF8066] hover:bg-[#ff6e50] text-[#0D0E17] font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Start Phase 1: Spider Walk in Speed Lab</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
