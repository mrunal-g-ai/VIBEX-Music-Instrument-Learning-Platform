/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GUITAR_SONG_LIBRARY } from '../data/guitarStructuredCurriculum';
import { GuitarSongItem } from '../types/guitarLessons';
import { VibexAudioEngine } from '../services/audioEngine';
import { useInstrument } from '../contexts/InstrumentContext';
import { InstrumentEmptyState } from '../components/layout/InstrumentEmptyState';
import { GuitarProgressService } from '../services/guitarProgressService';
import { SpeechCoach } from '../services/speechCoach';
import { MasterGuitarFretboard } from '../components/instruments/MasterGuitarFretboard';
import {
  Music,
  Play,
  Pause,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Volume2,
  Sliders,
  RotateCcw,
  Layers,
  ChevronRight,
  Award,
  Zap,
  CheckCircle2,
  Repeat,
} from 'lucide-react';

type StudioMode = 'chords' | 'rhythm' | 'song' | 'challenge';

// Voicing dictionary for songs
const CHORD_VOICINGS: Record<string, { strings: (number | 'X')[]; fingers: (number | null)[]; notes: string[] }> = {
  G: {
    strings: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, null, null, null, 3],
    notes: ['G2', 'B2', 'D3', 'G3', 'B3', 'G4'],
  },
  D: {
    strings: ['X', 'X', 0, 2, 3, 2],
    fingers: [null, null, null, 1, 3, 2],
    notes: ['X', 'X', 'D3', 'A3', 'D4', 'F#4'],
  },
  Am: {
    strings: ['X', 0, 2, 2, 1, 0],
    fingers: [null, null, 2, 3, 1, null],
    notes: ['X', 'A2', 'E3', 'A3', 'C4', 'E4'],
  },
  C: {
    strings: ['X', 3, 2, 0, 1, 0],
    fingers: [null, 3, 2, null, 1, null],
    notes: ['X', 'C3', 'E3', 'G3', 'C4', 'E4'],
  },
  Em: {
    strings: [0, 2, 2, 0, 0, 0],
    fingers: [null, 2, 3, null, null, null],
    notes: ['E2', 'B2', 'E3', 'G3', 'B3', 'E4'],
  },
  'D6/9': {
    strings: ['X', 'X', 0, 2, 0, 0],
    fingers: [null, null, null, 2, null, null],
    notes: ['X', 'X', 'D3', 'A3', 'B3', 'E4'],
  },
  Em7: {
    strings: [0, 2, 2, 0, 3, 3],
    fingers: [null, 1, 2, null, 3, 4],
    notes: ['E2', 'B2', 'E3', 'G3', 'D4', 'G4'],
  },
  Dsus4: {
    strings: ['X', 'X', 0, 2, 3, 3],
    fingers: [null, null, null, 1, 2, 3],
    notes: ['X', 'X', 'D3', 'A3', 'D4', 'G4'],
  },
  A7sus4: {
    strings: ['X', 0, 2, 2, 3, 3],
    fingers: [null, null, 1, 2, 3, 4],
    notes: ['X', 'A2', 'E3', 'A3', 'D4', 'G4'],
  },
  F: {
    strings: ['X', 'X', 3, 2, 1, 1],
    fingers: [null, null, 3, 2, 1, 1],
    notes: ['X', 'X', 'F3', 'A3', 'C4', 'F4'],
  },
  E: {
    strings: [0, 2, 2, 1, 0, 0],
    fingers: [null, 2, 3, 1, null, null],
    notes: ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4'],
  },
};

// Song lyrics & arrangements
const SONG_ARRANGEMENTS: Record<string, { sections: { title: string; lines: { chords: string; lyrics: string }[] }[] }> = {
  song_knockin: {
    sections: [
      {
        title: 'Verse 1',
        lines: [
          { chords: 'G          D                Am', lyrics: 'Mama, take this badge off of me' },
          { chords: 'Am', lyrics: "I can't use it anymore" },
          { chords: 'G                D             C', lyrics: "It's gettin' dark, too dark to see" },
          { chords: 'C', lyrics: "I feel I'm knockin' on heaven's door" },
        ],
      },
      {
        title: 'Chorus',
        lines: [
          { chords: 'G            D                    Am', lyrics: "Knock, knock, knockin' on heaven's door" },
          { chords: 'G            D                    C', lyrics: "Knock, knock, knockin' on heaven's door" },
          { chords: 'G            D                    Am', lyrics: "Knock, knock, knockin' on heaven's door" },
          { chords: 'G            D                    C', lyrics: "Knock, knock, knockin' on heaven's door" },
        ],
      },
    ],
  },
  song_horse: {
    sections: [
      {
        title: 'Verse 1',
        lines: [
          { chords: 'Em                    D6/9', lyrics: 'On the first part of the journey' },
          { chords: 'Em                    D6/9', lyrics: 'I was lookin’ at all the life' },
          { chords: 'Em                             D6/9', lyrics: 'There were plants and birds and rocks and things' },
          { chords: 'Em                      D6/9', lyrics: 'There was sand and hills and rings' },
        ],
      },
      {
        title: 'Chorus',
        lines: [
          { chords: 'Em                                 D6/9', lyrics: "I've been through the desert on a horse with no name" },
          { chords: 'Em                         D6/9', lyrics: 'It felt good to be out of the rain' },
        ],
      },
    ],
  },
  song_let_it_be: {
    sections: [
      {
        title: 'Verse 1',
        lines: [
          { chords: 'C             G                Am          F', lyrics: 'When I find myself in times of trouble, Mother Mary comes to me' },
          { chords: 'C                G              F       C', lyrics: 'Speaking words of wisdom, let it be' },
        ],
      },
      {
        title: 'Chorus',
        lines: [
          { chords: 'Am         G          F          C', lyrics: 'Let it be, let it be, let it be, let it be' },
          { chords: 'C                G              F       C', lyrics: 'Whisper words of wisdom, let it be' },
        ],
      },
    ],
  },
};

export const SongsView: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<GuitarSongItem | null>(null);
  const [studioMode, setStudioMode] = useState<StudioMode>('chords');
  const [selectedChordKey, setSelectedChordKey] = useState<string>('G');
  const [isPlayingJam, setIsPlayingJam] = useState<boolean>(false);
  const [tempoSpeedMultiplier, setTempoSpeedMultiplier] = useState<number>(1.0); // 0.5, 0.75, 1.0
  const [sectionLoop, setSectionLoop] = useState<'all' | 'verse' | 'chorus'>('all');
  const [currentBeat, setCurrentBeat] = useState<number>(1);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [challengeTargetChordIndex, setChallengeTargetChordIndex] = useState<number>(0);
  const [sessionLoggedToast, setSessionLoggedToast] = useState<string | null>(null);

  const audioEngine = VibexAudioEngine.getInstance();
  const progressService = GuitarProgressService.getInstance();
  const { activeInstrument } = useInstrument();

  // Effective BPM
  const effectiveBpm = selectedSong ? Math.round(selectedSong.tempoBpm * tempoSpeedMultiplier) : 70;

  // Clean up on unmount or song switch
  useEffect(() => {
    return () => {
      audioEngine.stopMetronome();
    };
  }, []);

  // When song changes, select its first chord
  useEffect(() => {
    if (selectedSong && selectedSong.chords.length > 0) {
      setSelectedChordKey(selectedSong.chords[0]);
      setChallengeScore(0);
      setChallengeTargetChordIndex(0);
    }
  }, [selectedSong]);

  // Metronome beat simulation when playing
  useEffect(() => {
    let timer: any = null;
    if (isPlayingJam) {
      const beatIntervalMs = (60 / effectiveBpm) * 1000;
      timer = setInterval(() => {
        setCurrentBeat((p) => (p % 4) + 1);
      }, beatIntervalMs);
    } else {
      setCurrentBeat(1);
    }
    return () => clearInterval(timer);
  }, [isPlayingJam, effectiveBpm]);

  // Toggle Jam Metronome
  const handleTogglePlay = () => {
    if (isPlayingJam) {
      audioEngine.stopMetronome();
      setIsPlayingJam(false);
    } else {
      audioEngine.startMetronome(effectiveBpm, 'quarter', 'woodblock');
      setIsPlayingJam(true);
    }
  };

  // Strum single chord
  const handleStrumChord = (chordKey: string) => {
    const voicing = CHORD_VOICINGS[chordKey];
    if (!voicing) return;

    const baseFreqs = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];
    voicing.strings.forEach((val, idx) => {
      if (val !== 'X') {
        const fret = typeof val === 'number' ? val : 0;
        const freq = baseFreqs[idx] * Math.pow(2, fret / 12);
        setTimeout(() => {
          audioEngine.playInstrumentNote('guitar', freq, 1200);
        }, idx * 55);
      }
    });
  };

  // Log session to profile
  const handleLogPractice = (minutes: number) => {
    if (!selectedSong) return;
    progressService.recordPracticeSession({
      exerciseName: `${selectedSong.title} (${selectedSong.artist})`,
      category: 'Songs',
      durationMinutes: minutes,
      bpm: effectiveBpm,
    });
    setSessionLoggedToast(`Logged ${minutes} minutes of song practice to your profile!`);
    setTimeout(() => setSessionLoggedToast(null), 3000);
  };

  // ==========================================
  // VIEW 1: SONG SELECTION OVERVIEW
  // ==========================================
  if (activeInstrument !== 'guitar') {
    return <InstrumentEmptyState 
      title={`${activeInstrument} Songs`} 
      message={`The song library for ${activeInstrument} is coming soon.`}
    />;
  }

  if (!selectedSong) {
    return (
      <div className="w-full flex flex-col gap-6 pb-20 text-[#F6F4FF]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#303348] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF8066]" />
              <span className="text-xs font-mono font-bold text-[#FF8066] uppercase tracking-wider">
                SONG REPERTOIRE STUDIO
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F6F4FF] tracking-tight mt-1">
              Guitar Song Library
            </h1>
            <p className="text-xs text-[#A9A8BA] mt-0.5">
              Practice real acoustic songs with interactive chord voicings, rhythm slowdown, section loops, and play-along challenge.
            </p>
          </div>
        </div>

        {/* Song Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GUITAR_SONG_LIBRARY.map((song) => {
            return (
              <div
                key={song.id}
                onClick={() => setSelectedSong(song)}
                className="p-6 rounded-2xl bg-[#151725] border border-[#303348] hover:border-[#FF8066] cursor-pointer transition-all duration-200 flex flex-col justify-between gap-4 shadow-lg group hover:shadow-[0_0_20px_rgba(255,128,102,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs text-[#A9A8BA]">{song.artist}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1D2032] text-[#54D6C3] text-[10px] font-mono font-bold">
                      {song.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#F6F4FF] group-hover:text-[#FF8066] transition-colors">
                    {song.title}
                  </h3>
                  <p className="text-xs text-[#A9A8BA] mt-1.5 leading-relaxed line-clamp-2">
                    {song.description}
                  </p>

                  {/* Chords Used */}
                  <div className="flex items-center gap-1.5 flex-wrap mt-3">
                    <span className="text-[11px] text-[#A9A8BA]">Chords:</span>
                    {song.chords.map((ch) => (
                      <span
                        key={ch}
                        className="px-2 py-0.5 rounded bg-[#0D0E17] border border-[#303348] text-xs font-mono font-bold text-[#FF8066]"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-[#303348] flex items-center justify-between gap-2 text-xs">
                  <span className="text-[#A9A8BA] font-mono">{song.tempoBpm} BPM</span>

                  <span className="px-4 py-2 rounded-xl bg-[#FF8066] group-hover:bg-[#ff6e50] text-[#0D0E17] font-bold text-xs flex items-center gap-1.5 transition-all">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Open Song Studio</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: INTERACTIVE SONG PRACTICE STUDIO
  // ==========================================
  const activeVoicingData = CHORD_VOICINGS[selectedChordKey] || {
    strings: ['X', 3, 2, 0, 1, 0],
    fingers: [null, 3, 2, null, 1, null],
    notes: ['X', 'C3', 'E3', 'G3', 'C4', 'E4'],
  };

  const activeVoicing = {
    name: `${selectedChordKey} Chord`,
    strings: activeVoicingData.strings,
    fingers: activeVoicingData.fingers,
    notes: activeVoicingData.notes,
    rootStringIndex: 1,
  };

  const arrangement = SONG_ARRANGEMENTS[selectedSong.id];

  return (
    <div className="w-full flex flex-col gap-6 pb-20 text-[#F6F4FF]">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#303348] pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioEngine.stopMetronome();
              setIsPlayingJam(false);
              setSelectedSong(null);
            }}
            className="p-2.5 rounded-xl bg-[#1D2032] border border-[#303348] hover:border-[#8067FF] text-[#A9A8BA] hover:text-[#F6F4FF] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>← All Songs</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF8066]/20 text-[#FF8066] font-bold">
                Song Studio
              </span>
              <span className="text-xs text-[#A9A8BA]">{selectedSong.artist}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#F6F4FF]">{selectedSong.title}</h1>
          </div>
        </div>

        {/* Global Song Playback Deck */}
        <div className="flex items-center gap-3 bg-[#151725] border border-[#303348] p-2 rounded-2xl">
          {/* Beat Indicator */}
          <div className="flex items-center gap-1 px-3">
            {[1, 2, 3, 4].map((b) => (
              <span
                key={b}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  isPlayingJam && currentBeat === b
                    ? 'bg-[#54D6C3] shadow-[0_0_8px_#54D6C3] scale-125'
                    : 'bg-[#303348]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleTogglePlay}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              isPlayingJam
                ? 'bg-[#F06B78] text-white'
                : 'bg-[#FF8066] hover:bg-[#ff6e50] text-[#0D0E17]'
            }`}
          >
            {isPlayingJam ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlayingJam ? 'Stop Click' : 'Start Click'}</span>
          </button>
        </div>
      </div>

      {/* Studio Deck Bar: Tempo Slowdown & Section Loop Controls */}
      <div className="p-4 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tempo Slowdown Presets (Section 8) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#A9A8BA] font-bold flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-[#54D6C3]" />
            <span>Tempo:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {[
              { label: '50% Slow', mult: 0.5 },
              { label: '75% Mid', mult: 0.75 },
              { label: '100% Target', mult: 1.0 },
            ].map((p) => {
              const active = tempoSpeedMultiplier === p.mult;
              return (
                <button
                  key={p.mult}
                  onClick={() => {
                    setTempoSpeedMultiplier(p.mult);
                    if (isPlayingJam) {
                      audioEngine.startMetronome(
                        Math.round(selectedSong.tempoBpm * p.mult),
                        'quarter',
                        'woodblock'
                      );
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    active
                      ? 'bg-[#54D6C3] text-[#0D0E17] shadow-sm'
                      : 'bg-[#0D0E17] text-[#A9A8BA] hover:text-[#F6F4FF] border border-[#303348]'
                  }`}
                >
                  {p.label} ({Math.round(selectedSong.tempoBpm * p.mult)} BPM)
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Looper */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#A9A8BA] font-bold flex items-center gap-1">
            <Repeat className="w-3.5 h-3.5 text-[#8067FF]" />
            <span>Loop:</span>
          </span>
          <div className="flex items-center gap-1">
            {(['all', 'verse', 'chorus'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSectionLoop(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                  sectionLoop === mode
                    ? 'bg-[#8067FF] text-white font-bold'
                    : 'bg-[#0D0E17] text-[#A9A8BA] hover:text-[#F6F4FF] border border-[#303348]'
                }`}
              >
                {mode === 'all' ? 'Full Song' : `${mode} Only`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Mode Tabs (Phase 8 Specification) */}
      <div className="flex items-center gap-2 border-b border-[#303348] pb-2 overflow-x-auto">
        {[
          { key: 'chords', label: '1. Chord Mode', desc: 'Shapes & clean changes' },
          { key: 'rhythm', label: '2. Rhythm Mode', desc: 'Strumming pattern & counts' },
          { key: 'song', label: '3. Song Mode', desc: 'Arrangement & lyrics' },
          { key: 'challenge', label: '4. Challenge Mode', desc: 'Target tempo test' },
        ].map((tab) => {
          const isActive = studioMode === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setStudioMode(tab.key as StudioMode)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-start ${
                isActive
                  ? 'bg-[#8067FF] text-white shadow-md'
                  : 'bg-[#151725] text-[#A9A8BA] hover:text-[#F6F4FF] hover:bg-[#1D2032]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-normal ${isActive ? 'text-white/80' : 'text-[#A9A8BA]/60'}`}>
                {tab.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Toast Notification */}
      {sessionLoggedToast && (
        <div className="p-3 rounded-xl bg-[#12241C] border border-[#45D483] text-xs text-[#45D483] font-bold flex items-center gap-2 shadow-lg animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{sessionLoggedToast}</span>
        </div>
      )}

      {/* TAB 1: CHORD MODE */}
      {studioMode === 'chords' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          {/* Chord Selector Bar */}
          <div className="p-5 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col gap-3">
            <span className="text-xs font-mono font-bold text-[#A9A8BA]">
              CHORDS IN THIS SONG (Click a chord to view voicing & hear sound):
            </span>
            <div className="flex items-center gap-3 flex-wrap">
              {selectedSong.chords.map((ch) => {
                const isSelected = selectedChordKey === ch;
                return (
                  <button
                    key={ch}
                    onClick={() => {
                      setSelectedChordKey(ch);
                      handleStrumChord(ch);
                    }}
                    className={`px-5 py-3 rounded-xl font-mono text-base font-extrabold transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#FF8066] text-[#0D0E17] shadow-lg shadow-[#FF8066]/20 scale-105'
                        : 'bg-[#0D0E17] border border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]'
                    }`}
                  >
                    <span>{ch}</span>
                    <Volume2 className="w-3.5 h-3.5 opacity-70" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Fretboard for Selected Chord */}
          <div className="w-full">
            <MasterGuitarFretboard chordVoicing={activeVoicing} interactive={true} />
          </div>

          {/* Transition Drill Card */}
          <div className="p-5 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div>
              <h4 className="text-sm font-bold text-[#F6F4FF]">Switching Practice Drill</h4>
              <p className="text-xs text-[#A9A8BA]">
                Switch between chords smoothly without pausing or lifting all fingers at once.
              </p>
            </div>
            <button
              onClick={() => handleLogPractice(5)}
              className="px-5 py-2.5 rounded-xl bg-[#1D2032] hover:bg-[#303348] border border-[#303348] text-xs font-bold text-[#54D6C3] flex items-center gap-2 transition-colors shrink-0"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Log 5 Min Chord Drill</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: RHYTHM MODE */}
      {studioMode === 'rhythm' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col gap-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#303348] pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#54D6C3]">RHYTHMIC STRUMMING PATTERN</span>
                <h3 className="text-lg font-bold text-[#F6F4FF] mt-0.5">{selectedSong.strummingPattern}</h3>
              </div>
              <span className="text-xs font-mono text-[#A9A8BA]">{selectedSong.timeSignature} Time</span>
            </div>

            {/* Visual Strumming Arrow Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 my-2">
              {[
                { count: '1', stroke: 'D', isDown: true },
                { count: '&', stroke: '—', isDown: null },
                { count: '2', stroke: 'D', isDown: true },
                { count: '&', stroke: 'U', isDown: false },
                { count: '3', stroke: '—', isDown: null },
                { count: '&', stroke: 'U', isDown: false },
                { count: '4', stroke: 'D', isDown: true },
                { count: '&', stroke: '—', isDown: null },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 ${
                    item.isDown === true
                      ? 'bg-[#FF8066]/15 border-[#FF8066] text-[#FF8066]'
                      : item.isDown === false
                      ? 'bg-[#54D6C3]/15 border-[#54D6C3] text-[#54D6C3]'
                      : 'bg-[#0D0E17] border-[#303348] text-[#A9A8BA]/40'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold">{item.count}</span>
                  <span className="text-base font-extrabold font-mono">
                    {item.isDown === true ? '↓' : item.isDown === false ? '↑' : '—'}
                  </span>
                  <span className="text-[9px] font-mono">
                    {item.isDown === true ? 'Down' : item.isDown === false ? 'Up' : 'Rest'}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] text-xs text-[#A9A8BA] leading-relaxed">
              <span className="font-bold text-[#F6F4FF] block mb-1">Rhythm Guidance:</span>
              Keep your right wrist loose and oscillating like a pendulum. Downstrokes hit on the numbers, upstrokes hit on the 'and' counts. Even on rest counts, your hand continues moving smoothly without striking the strings.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SONG MODE (ARRANGEMENT & LYRICS) */}
      {studioMode === 'song' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col gap-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#303348] pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#8067FF]">ACOUSTIC ARRANGEMENT & LYRICS</span>
                <h3 className="text-lg font-bold text-[#F6F4FF]">{selectedSong.title}</h3>
              </div>
              <span className="text-xs font-mono text-[#54D6C3] font-bold">
                Tempo: {effectiveBpm} BPM
              </span>
            </div>

            {arrangement ? (
              <div className="flex flex-col gap-6">
                {arrangement.sections.map((section, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] flex flex-col gap-3">
                    <span className="text-xs font-mono font-bold text-[#FF8066] uppercase">
                      {section.title}
                    </span>
                    <div className="space-y-3 font-mono text-xs">
                      {section.lines.map((line, lIdx) => (
                        <div key={lIdx} className="flex flex-col">
                          <span className="text-[#FF8066] font-bold tracking-wider">{line.chords}</span>
                          <span className="text-[#E2E1EC] font-sans text-sm mt-0.5">{line.lyrics}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-[#0D0E17] border border-[#303348] text-xs text-[#A9A8BA]">
                Full chord chart defined: {selectedSong.chords.join(' - ')} across 4/4 folk progression.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: CHALLENGE MODE */}
      {studioMode === 'challenge' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-[#151725] border border-[#FF8066]/40 flex flex-col gap-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#303348] pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#FF8066]">TEMPO CHALLENGE</span>
                <h3 className="text-lg font-bold text-[#F6F4FF]">Clean Chord Switch Challenge</h3>
              </div>
              <span className="font-mono text-sm font-bold text-[#45D483]">
                Score: {challengeScore} Points
              </span>
            </div>

            <p className="text-xs text-[#E2E1EC]">
              Play with the metronome at {effectiveBpm} BPM. When the chord changes, switch your fingers smoothly and hit "Clean Switch"!
            </p>

            {/* Target Chord Card */}
            <div className="p-6 rounded-2xl bg-[#0D0E17] border-2 border-[#54D6C3] flex flex-col items-center text-center gap-2">
              <span className="text-xs font-mono text-[#A9A8BA]">CURRENT ACTIVE CHORD</span>
              <span className="text-4xl font-black font-mono text-[#54D6C3]">
                {selectedSong.chords[challengeTargetChordIndex % selectedSong.chords.length]}
              </span>
              <span className="text-xs text-[#A9A8BA]">
                Next up: {selectedSong.chords[(challengeTargetChordIndex + 1) % selectedSong.chords.length]}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  const targetCh = selectedSong.chords[challengeTargetChordIndex % selectedSong.chords.length];
                  handleStrumChord(targetCh);
                  setChallengeScore((p) => p + 10);
                  setChallengeTargetChordIndex((p) => p + 1);
                }}
                className="px-6 py-3 rounded-xl bg-[#45D483] hover:bg-[#3ec277] text-[#0D0E17] font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>+ Clean Switch Completed</span>
              </button>

              <button
                onClick={() => handleLogPractice(10)}
                className="px-5 py-2.5 rounded-xl bg-[#1D2032] hover:bg-[#303348] border border-[#303348] text-xs font-bold text-[#F6F4FF] transition-colors"
              >
                Log 10 Min Song Challenge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
