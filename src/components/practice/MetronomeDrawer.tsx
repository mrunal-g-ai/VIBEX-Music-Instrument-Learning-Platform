/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { VibexAudioEngine } from '../../services/audioEngine';
import { Play, Square, Volume2, Music2, Gauge, Disc } from 'lucide-react';

interface MetronomeDrawerProps {
  onBpmChange?: (bpm: number) => void;
}

const ROOTS = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'];

export const MetronomeDrawer: React.FC<MetronomeDrawerProps> = ({ onBpmChange }) => {
  const [bpm, setBpm] = useState<number>(72);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [subdivision, setSubdivision] = useState<'quarter' | 'eighth' | 'triplet' | 'sixteenth'>('quarter');
  const [soundType, setSoundType] = useState<'woodblock' | 'beep' | 'bell'>('woodblock');
  const [beatPulse, setBeatPulse] = useState<number>(0);
  const [isDroneOn, setIsDroneOn] = useState<boolean>(false);
  const [droneRoot, setDroneRoot] = useState<string>('C3');

  const tapTimesRef = useRef<number[]>([]);
  const audioEngine = VibexAudioEngine.getInstance();

  const handleToggleMetronome = () => {
    if (isPlaying) {
      audioEngine.stopMetronome();
      setIsPlaying(false);
    } else {
      audioEngine.startMetronome(bpm, subdivision, soundType, (beat) => {
        setBeatPulse(beat);
      });
      setIsPlaying(true);
    }
  };

  const updateBpm = (newBpm: number) => {
    const clamped = Math.max(30, Math.min(200, newBpm));
    setBpm(clamped);
    if (onBpmChange) onBpmChange(clamped);
    if (isPlaying) {
      audioEngine.startMetronome(clamped, subdivision, soundType, (beat) => {
        setBeatPulse(beat);
      });
    }
  };

  const handleTapTempo = () => {
    const now = Date.now();
    const taps = tapTimesRef.current;
    taps.push(now);
    if (taps.length > 4) taps.shift();

    if (taps.length >= 2) {
      const intervals = [];
      for (let i = 1; i < taps.length; i++) {
        intervals.push(taps[i] - taps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      if (avgInterval > 250 && avgInterval < 2000) {
        const calculatedBpm = Math.round(60000 / avgInterval);
        updateBpm(calculatedBpm);
      }
    }
  };

  const handleToggleDrone = () => {
    if (isDroneOn) {
      audioEngine.stopTanpuraDrone();
      setIsDroneOn(false);
    } else {
      audioEngine.startTanpuraDrone(droneRoot);
      setIsDroneOn(true);
    }
  };

  useEffect(() => {
    return () => {
      audioEngine.stopMetronome();
      audioEngine.stopTanpuraDrone();
    };
  }, []);

  const isDownbeat = beatPulse % 4 === 0;

  return (
    <div className="w-full bg-[#151725] rounded-xl border border-[#303348] p-4 flex flex-col gap-4">
      {/* Title & Pulse Display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-[#8067FF]" />
          <span className="text-xs font-semibold text-[#F6F4FF]">
            PULSE & DRONE STUDIO
          </span>
          <span className="text-[11px] text-[#A9A8BA]">· 30–200 BPM</span>
        </div>

        {/* 4 Beat Visual Indicators */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3].map((b) => {
            const active = isPlaying && (beatPulse % 4 === b);
            return (
              <span
                key={b}
                className={`w-3 h-3 rounded-full transition-all duration-75 border ${
                  active
                    ? b === 0
                      ? 'bg-[#54D6C3] border-[#54D6C3] shadow-[0_0_8px_#54D6C3] scale-125'
                      : 'bg-[#8067FF] border-[#8067FF] shadow-[0_0_6px_#8067FF]'
                    : 'bg-[#1D2032] border-[#303348]'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* BPM Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Metronome Column */}
        <div className="flex flex-col gap-3 p-3 bg-[#0D0E17] rounded-lg border border-[#303348]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A9A8BA]">Tempo</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-mono text-[#F6F4FF]">{bpm}</span>
              <span className="text-xs text-[#A9A8BA]">BPM</span>
            </div>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="30"
            max="200"
            value={bpm}
            onChange={(e) => updateBpm(Number(e.target.value))}
            className="w-full accent-[#8067FF] cursor-pointer"
          />

          {/* Buttons Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateBpm(bpm - 1)}
                className="w-7 h-7 rounded bg-[#1D2032] text-[#F6F4FF] border border-[#303348] text-xs font-mono font-bold hover:bg-[#303348] transition-colors"
              >
                -1
              </button>
              <button
                onClick={() => updateBpm(bpm + 1)}
                className="w-7 h-7 rounded bg-[#1D2032] text-[#F6F4FF] border border-[#303348] text-xs font-mono font-bold hover:bg-[#303348] transition-colors"
              >
                +1
              </button>
              <button
                onClick={handleTapTempo}
                className="px-2.5 h-7 rounded bg-[#1D2032] text-[#A99BFF] border border-[#303348] text-xs font-medium hover:bg-[#303348] transition-colors"
              >
                Tap
              </button>
            </div>

            <button
              onClick={handleToggleMetronome}
              className={`px-4 h-7 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isPlaying
                  ? 'bg-[#F06B78] text-white hover:bg-[#D95361]'
                  : 'bg-[#8067FF] text-white hover:bg-[#6952E6]'
              }`}
            >
              {isPlaying ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
              <span>{isPlaying ? 'Stop' : 'Start'}</span>
            </button>
          </div>

          {/* Subdivisions */}
          <div className="flex items-center gap-1 pt-1">
            {(['quarter', 'eighth', 'triplet', 'sixteenth'] as const).map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setSubdivision(sub);
                  if (isPlaying) {
                    audioEngine.startMetronome(bpm, sub, soundType, (beat) => setBeatPulse(beat));
                  }
                }}
                className={`flex-1 py-1 text-[10px] font-medium rounded transition-colors ${
                  subdivision === sub
                    ? 'bg-[#8067FF]/20 text-[#A99BFF] border border-[#8067FF]/50'
                    : 'text-[#A9A8BA] hover:text-[#F6F4FF]'
                }`}
              >
                {sub === 'quarter' ? '1/4' : sub === 'eighth' ? '1/8' : sub === 'triplet' ? '1/3' : '1/16'}
              </button>
            ))}
          </div>
        </div>

        {/* Tanpura Drone Column */}
        <div className="flex flex-col gap-3 p-3 bg-[#0D0E17] rounded-lg border border-[#303348]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A9A8BA]">Tanpura Classical Drone</span>
            <span className="text-[11px] font-mono text-[#54D6C3]">Sa + Pa Harmonic</span>
          </div>

          {/* Drone Root Selector */}
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs text-[#A9A8BA]">Root Key (Sa):</label>
            <select
              value={droneRoot}
              onChange={(e) => {
                setDroneRoot(e.target.value);
                if (isDroneOn) {
                  audioEngine.startTanpuraDrone(e.target.value);
                }
              }}
              className="bg-[#1D2032] border border-[#303348] text-[#F6F4FF] text-xs rounded px-2.5 py-1 font-mono focus:outline-none focus:border-[#8067FF]"
            >
              {ROOTS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Drone Toggle */}
          <button
            onClick={handleToggleDrone}
            className={`w-full h-8 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
              isDroneOn
                ? 'bg-[#54D6C3] text-[#0D0E17] hover:bg-[#43B8A7]'
                : 'bg-[#1D2032] text-[#F6F4FF] border border-[#303348] hover:bg-[#303348]'
            }`}
          >
            <Disc className={`w-3.5 h-3.5 ${isDroneOn ? 'animate-spin' : ''}`} />
            <span>{isDroneOn ? 'Tanpura Resonating (Active)' : 'Activate Tanpura Drone'}</span>
          </button>

          <span className="text-[10px] text-[#A9A8BA] italic">
            Provides continuous acoustic root reference for intonation and Raga development.
          </span>
        </div>
      </div>
    </div>
  );
};
