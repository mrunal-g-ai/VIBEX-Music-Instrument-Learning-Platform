/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { VibexAudioEngine } from '../../services/audioEngine';
import { GuitarProgressService } from '../../services/guitarProgressService';
import { MasterGuitarFretboard } from '../instruments/MasterGuitarFretboard';
import {
  Zap,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Activity,
  ChevronRight,
  Clock,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

interface SpeedLabViewProps {
  onBack: () => void;
}

type SpeedLabMode = 'spider' | 'chord_speed' | 'string_skip' | 'alt_pick' | 'scale_speed';

export const SpeedLabView: React.FC<SpeedLabViewProps> = ({ onBack }) => {
  const [activeMode, setActiveMode] = useState<SpeedLabMode>('spider');
  const [bpm, setBpm] = useState<number>(50);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [repsCount, setRepsCount] = useState<number>(0);

  // 30-Second Chord Transition State
  const [selectedChordPair, setSelectedChordPair] = useState<string>('C → G');
  const [chordTimerSeconds, setChordTimerSeconds] = useState<number>(30);
  const [chordTransitionsCount, setChordTransitionsCount] = useState<number>(0);
  const [isChordTimerRunning, setIsChordTimerRunning] = useState<boolean>(false);
  const [chordSpeedFinished, setChordSpeedFinished] = useState<boolean>(false);

  const audioEngine = VibexAudioEngine.getInstance();
  const progressService = GuitarProgressService.getInstance();
  const timerIntervalRef = useRef<number | null>(null);

  const personalBestTransitions = progressService.getChordSpeedBest(selectedChordPair);

  // Stop metronome on unmount or mode switch
  useEffect(() => {
    audioEngine.stopMetronome();
    setIsRunning(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsChordTimerRunning(false);
  }, [activeMode]);

  // Metronome handler for Speed Drills
  const toggleMetronome = () => {
    if (isRunning) {
      audioEngine.stopMetronome();
      setIsRunning(false);
    } else {
      audioEngine.startMetronome(bpm, 'quarter', 'woodblock', (beat) => {
        setCurrentBeat(beat % 4);
      });
      setIsRunning(true);
    }
  };

  // 30s Countdown timer for Chord Change Speed
  const startChordTimer = () => {
    setChordTransitionsCount(0);
    setChordTimerSeconds(30);
    setChordSpeedFinished(false);
    setIsChordTimerRunning(true);

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = window.setInterval(() => {
      setChordTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current!);
          setIsChordTimerRunning(false);
          setChordSpeedFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRecordChordTransition = () => {
    if (!isChordTimerRunning) return;
    const nextCount = chordTransitionsCount + 1;
    setChordTransitionsCount(nextCount);
    if (nextCount > personalBestTransitions) {
      progressService.recordChordSpeed(selectedChordPair, nextCount);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 text-[#F6F4FF]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#303348] pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-[#1D2032] border border-[#303348] hover:border-[#8067FF] text-[#A9A8BA] hover:text-[#F6F4FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF8066]" />
              <h2 className="text-lg font-bold text-[#F6F4FF]">Speed Lab & Technique Studio</h2>
            </div>
            <p className="text-xs text-[#A9A8BA]">
              Dedicated precision drills: finger independence, transitions, and picking speed
            </p>
          </div>
        </div>

        {/* BPM Stepper */}
        {activeMode !== 'chord_speed' && (
          <div className="flex items-center gap-2 bg-[#151725] border border-[#303348] p-1.5 rounded-xl">
            <button
              onClick={() => setBpm((p) => Math.max(30, p - 5))}
              className="px-2 py-1 bg-[#1D2032] rounded-lg text-xs font-bold hover:bg-[#303348]"
            >
              -5
            </button>
            <span className="font-mono text-xs font-bold px-2 text-[#54D6C3]">{bpm} BPM</span>
            <button
              onClick={() => setBpm((p) => Math.min(180, p + 5))}
              className="px-2 py-1 bg-[#1D2032] rounded-lg text-xs font-bold hover:bg-[#303348]"
            >
              +5
            </button>
          </div>
        )}
      </div>

      {/* Drill Mode Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveMode('spider')}
          className={`px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeMode === 'spider'
              ? 'bg-[#FF8066] text-[#0D0E17] font-bold shadow-md'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          1. Spider Walk (1-2-3-4)
        </button>

        <button
          onClick={() => setActiveMode('chord_speed')}
          className={`px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeMode === 'chord_speed'
              ? 'bg-[#FF8066] text-[#0D0E17] font-bold shadow-md'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          2. Chord Change Speed (30s)
        </button>

        <button
          onClick={() => setActiveMode('string_skip')}
          className={`px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeMode === 'string_skip'
              ? 'bg-[#FF8066] text-[#0D0E17] font-bold shadow-md'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          3. String Skipping
        </button>

        <button
          onClick={() => setActiveMode('alt_pick')}
          className={`px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
            activeMode === 'alt_pick'
              ? 'bg-[#FF8066] text-[#0D0E17] font-bold shadow-md'
              : 'bg-[#151725] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
          }`}
        >
          4. Alternate Picking (↓ ↑)
        </button>
      </div>

      {/* DRILL 1: SPIDER WALK */}
      {activeMode === 'spider' && (
        <div className="flex flex-col gap-5 p-5 rounded-2xl bg-[#151725] border border-[#303348]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-[#F6F4FF]">Spider Walk (1-2-3-4)</h3>
              <p className="text-xs text-[#A9A8BA]">
                Fret 1 (Index), Fret 2 (Middle), Fret 3 (Ring), Fret 4 (Pinky) across all 6 strings
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleMetronome}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  isRunning ? 'bg-[#F06B78] text-white' : 'bg-[#54D6C3] text-[#0D0E17]'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isRunning ? 'Stop Metronome' : `Start (${bpm} BPM)`}</span>
              </button>

              <button
                onClick={() => setRepsCount((p) => p + 1)}
                className="px-3.5 py-2 rounded-xl bg-[#1D2032] border border-[#303348] text-xs font-semibold hover:border-[#8067FF]"
              >
                + Rep ({repsCount})
              </button>
            </div>
          </div>

          {/* Beat visualizer */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#0D0E17] border border-[#303348]">
            <span className="text-xs text-[#A9A8BA] font-mono mr-2">Beat:</span>
            {[0, 1, 2, 3].map((b) => (
              <div
                key={b}
                className={`w-3.5 h-3.5 rounded-full transition-all ${
                  isRunning && currentBeat === b
                    ? 'bg-[#54D6C3] scale-125 shadow-[0_0_8px_#54D6C3]'
                    : 'bg-[#1D2032]'
                }`}
              />
            ))}
          </div>

          <MasterGuitarFretboard interactive={true} />
        </div>
      )}

      {/* DRILL 2: 30-SECOND CHORD CHANGE SPEED */}
      {activeMode === 'chord_speed' && (
        <div className="flex flex-col gap-6 p-6 rounded-2xl bg-[#151725] border border-[#303348]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#F6F4FF]">30-Second Chord Switch Sprint</h3>
              <p className="text-xs text-[#A9A8BA]">
                Switch cleanly between two shapes. Tap "Clean Switch" for each completed change!
              </p>
            </div>

            {/* Chord Pair Picker */}
            <div className="flex items-center gap-1.5 bg-[#0D0E17] p-1 rounded-xl border border-[#303348] text-xs">
              {['C → G', 'G → D', 'Am → C', 'Em → D'].map((pair) => (
                <button
                  key={pair}
                  onClick={() => {
                    setSelectedChordPair(pair);
                    setChordTransitionsCount(0);
                    setChordTimerSeconds(30);
                    setChordSpeedFinished(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    selectedChordPair === pair
                      ? 'bg-[#8067FF] text-[#F6F4FF]'
                      : 'text-[#A9A8BA] hover:text-[#F6F4FF]'
                  }`}
                >
                  {pair}
                </button>
              ))}
            </div>
          </div>

          {/* Timer & Count Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] flex flex-col items-center justify-center text-center">
              <span className="text-xs text-[#A9A8BA] flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5" /> Time Remaining
              </span>
              <span className="text-3xl font-extrabold font-mono text-[#F4BB55]">
                {chordTimerSeconds}s
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] flex flex-col items-center justify-center text-center">
              <span className="text-xs text-[#A9A8BA] mb-1">Clean Switches</span>
              <span className="text-3xl font-extrabold font-mono text-[#54D6C3]">
                {chordTransitionsCount}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] flex flex-col items-center justify-center text-center">
              <span className="text-xs text-[#A9A8BA] flex items-center gap-1 mb-1">
                <Trophy className="w-3.5 h-3.5 text-[#F4BB55]" /> Personal Best
              </span>
              <span className="text-3xl font-extrabold font-mono text-[#FF8066]">
                {personalBestTransitions}
              </span>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
            {!isChordTimerRunning ? (
              <button
                onClick={startChordTimer}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FF8066] hover:bg-[#ff6e50] text-[#0D0E17] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF8066]/20 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{chordSpeedFinished ? 'Restart 30s Sprint' : 'Start 30s Sprint'}</span>
              </button>
            ) : (
              <button
                onClick={handleRecordChordTransition}
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-[#54D6C3] hover:bg-[#43c4b1] active:scale-95 text-[#0D0E17] font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-[#54D6C3]/30 transition-transform"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span>TAP CLEAN SWITCH ({chordTransitionsCount})</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* DRILL 3: STRING SKIPPING */}
      {activeMode === 'string_skip' && (
        <div className="p-6 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#F6F4FF]">String Skipping Dexterity</h3>
          <p className="text-xs text-[#A9A8BA]">
            Practice pick jumps: 6 → 4, 5 → 3, 4 → 2, 3 → 1, then reverse!
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348] text-[#54D6C3]">
              String 6 → String 4
            </div>
            <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348] text-[#54D6C3]">
              String 5 → String 3
            </div>
            <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348] text-[#54D6C3]">
              String 4 → String 2
            </div>
            <div className="p-3 rounded-xl bg-[#0D0E17] border border-[#303348] text-[#54D6C3]">
              String 3 → String 1
            </div>
          </div>
          <button
            onClick={toggleMetronome}
            className={`self-start px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 ${
              isRunning ? 'bg-[#F06B78] text-white' : 'bg-[#8067FF] text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isRunning ? 'Stop Metronome' : `Play with Metronome (${bpm} BPM)`}</span>
          </button>
        </div>
      )}

      {/* DRILL 4: ALTERNATE PICKING */}
      {activeMode === 'alt_pick' && (
        <div className="p-6 rounded-2xl bg-[#151725] border border-[#303348] flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#F6F4FF]">Alternate Picking Grid (↓ ↑ ↓ ↑)</h3>
          <p className="text-xs text-[#A9A8BA]">
            Strict alternate picking. Downstroke on downbeat, Upstroke on upbeat.
          </p>
          <div className="flex items-center gap-3 text-base font-mono font-bold text-[#FF8066]">
            <span>↓ Down</span>
            <span className="text-[#303348]">·</span>
            <span>↑ Up</span>
            <span className="text-[#303348]">·</span>
            <span>↓ Down</span>
            <span className="text-[#303348]">·</span>
            <span>↑ Up</span>
          </div>
          <button
            onClick={toggleMetronome}
            className={`self-start px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 ${
              isRunning ? 'bg-[#F06B78] text-white' : 'bg-[#54D6C3] text-[#0D0E17]'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isRunning ? 'Stop Metronome' : `Lock to ${bpm} BPM`}</span>
          </button>
        </div>
      )}
    </div>
  );
};
