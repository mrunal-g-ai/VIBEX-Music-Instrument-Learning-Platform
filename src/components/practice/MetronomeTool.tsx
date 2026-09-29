/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { VibexAudioEngine } from '../../services/audioEngine';
import { Play, Pause, Volume2, Plus, Minus, RotateCcw, X } from 'lucide-react';

interface MetronomeToolProps {
  onClose?: () => void;
}

export const MetronomeTool: React.FC<MetronomeToolProps> = ({ onClose }) => {
  const [bpm, setBpm] = useState<number>(80);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [subdivision, setSubdivision] = useState<'quarter' | 'eighth' | 'triplet' | 'sixteenth'>('quarter');
  const [soundType, setSoundType] = useState<'woodblock' | 'beep' | 'bell'>('woodblock');

  const audioEngine = VibexAudioEngine.getInstance();
  const tapTimesRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      audioEngine.stopMetronome();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioEngine.stopMetronome();
      setIsPlaying(false);
    } else {
      audioEngine.startMetronome(bpm, subdivision, soundType, (beat) => {
        setCurrentBeat(beat % 4);
      });
      setIsPlaying(true);
    }
  };

  const handleBpmChange = (newBpm: number) => {
    const clamped = Math.min(220, Math.max(30, newBpm));
    setBpm(clamped);
    if (isPlaying) {
      audioEngine.startMetronome(clamped, subdivision, soundType, (beat) => {
        setCurrentBeat(beat % 4);
      });
    }
  };

  const handleTapTempo = () => {
    const now = Date.now();
    const tapTimes = tapTimesRef.current;
    tapTimes.push(now);

    // Keep only last 4 taps within 2.5 seconds
    while (tapTimes.length > 4 || (tapTimes.length > 1 && now - tapTimes[0] > 2500)) {
      tapTimes.shift();
    }

    if (tapTimes.length >= 2) {
      let intervals = 0;
      for (let i = 1; i < tapTimes.length; i++) {
        intervals += tapTimes[i] - tapTimes[i - 1];
      }
      const avgInterval = intervals / (tapTimes.length - 1);
      const calculatedBpm = Math.round(60000 / avgInterval);
      handleBpmChange(calculatedBpm);
    }
  };

  return (
    <div className="w-full bg-[#151725] border border-[#303348] rounded-2xl p-6 flex flex-col gap-6 shadow-2xl animate-in fade-in duration-200">
      {/* Top Header if in modal/drawer */}
      <div className="flex items-center justify-between border-b border-[#303348] pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#8067FF]/20 text-[#8067FF] font-bold">
            Studio Utility
          </span>
          <h3 className="text-base font-bold text-[#F6F4FF] mt-1">Precision Metronome</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1D2032] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Visual BPM Display */}
      <div className="flex flex-col items-center justify-center text-center gap-2">
        <span className="text-5xl sm:text-6xl font-extrabold font-mono text-[#F6F4FF] tracking-tight">
          {bpm}
        </span>
        <span className="text-xs text-[#A9A8BA] uppercase tracking-wider font-mono">
          Beats Per Minute
        </span>
      </div>

      {/* 4-Beat Pulse Dots */}
      <div className="flex items-center justify-center gap-3">
        {[0, 1, 2, 3].map((b) => (
          <div
            key={b}
            className={`w-5 h-5 rounded-full transition-all duration-100 ${
              isPlaying && currentBeat === b
                ? b === 0
                  ? 'bg-[#FF8066] scale-125 shadow-[0_0_12px_#FF8066]'
                  : 'bg-[#54D6C3] scale-125 shadow-[0_0_10px_#54D6C3]'
                : 'bg-[#0D0E17] border border-[#303348]'
            }`}
          />
        ))}
      </div>

      {/* Slider & Quick Step Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleBpmChange(bpm - 1)}
          className="p-2.5 rounded-xl bg-[#1D2032] border border-[#303348] text-[#F6F4FF] hover:bg-[#303348] transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>

        <input
          type="range"
          min={30}
          max={220}
          value={bpm}
          onChange={(e) => handleBpmChange(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-[#0D0E17] rounded-lg appearance-none cursor-pointer accent-[#8067FF]"
        />

        <button
          onClick={() => handleBpmChange(bpm + 1)}
          className="p-2.5 rounded-xl bg-[#1D2032] border border-[#303348] text-[#F6F4FF] hover:bg-[#303348] transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={togglePlay}
          className={`px-8 py-3.5 rounded-xl font-extrabold text-sm flex items-center gap-2 shadow-lg transition-all ${
            isPlaying
              ? 'bg-[#F06B78] text-white'
              : 'bg-[#8067FF] hover:bg-[#6952E6] text-white shadow-[#8067FF]/20'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isPlaying ? 'Stop' : 'Start Metronome'}</span>
        </button>

        <button
          onClick={handleTapTempo}
          className="px-6 py-3.5 rounded-xl bg-[#1D2032] border border-[#303348] hover:border-[#8067FF] text-xs font-bold text-[#F6F4FF] transition-colors"
        >
          Tap Tempo
        </button>
      </div>

      {/* Subdivisions & Sound Type */}
      <div className="pt-4 border-t border-[#303348] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#A9A8BA]">Subdivision:</span>
          {(['quarter', 'eighth', 'triplet', 'sixteenth'] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setSubdivision(s);
                if (isPlaying) {
                  audioEngine.startMetronome(bpm, s, soundType, (beat) => setCurrentBeat(beat % 4));
                }
              }}
              className={`px-2.5 py-1 rounded-lg capitalize font-medium ${
                subdivision === s ? 'bg-[#8067FF] text-[#F6F4FF]' : 'bg-[#0D0E17] text-[#A9A8BA]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#A9A8BA]">Sound:</span>
          {(['woodblock', 'beep', 'bell'] as const).map((snd) => (
            <button
              key={snd}
              onClick={() => {
                setSoundType(snd);
                if (isPlaying) {
                  audioEngine.startMetronome(bpm, subdivision, snd, (beat) => setCurrentBeat(beat % 4));
                }
              }}
              className={`px-2.5 py-1 rounded-lg capitalize font-medium ${
                soundType === snd ? 'bg-[#54D6C3] text-[#0D0E17] font-bold' : 'bg-[#0D0E17] text-[#A9A8BA]'
              }`}
            >
              {snd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
