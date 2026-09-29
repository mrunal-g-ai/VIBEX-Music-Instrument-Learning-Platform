/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NoteGuide } from '../../types/vibex';
import { VibexAudioEngine } from '../../services/audioEngine';

interface PianoVisualizerProps {
  activeNote?: NoteGuide | null;
  onKeyPlay?: (noteName: string, frequency: number) => void;
}

// 2 Octaves: C4 to B5
const WHITE_KEYS = [
  { name: 'C4', freq: 261.63, midi: 60 },
  { name: 'D4', freq: 293.66, midi: 62 },
  { name: 'E4', freq: 329.63, midi: 64 },
  { name: 'F4', freq: 349.23, midi: 65 },
  { name: 'G4', freq: 392.00, midi: 67 },
  { name: 'A4', freq: 440.00, midi: 69 },
  { name: 'B4', freq: 493.88, midi: 71 },
  { name: 'C5', freq: 523.25, midi: 72 },
  { name: 'D5', freq: 587.33, midi: 74 },
  { name: 'E5', freq: 659.25, midi: 76 },
  { name: 'F5', freq: 698.46, midi: 77 },
  { name: 'G5', freq: 783.99, midi: 79 },
  { name: 'A5', freq: 880.00, midi: 81 },
  { name: 'B5', freq: 987.77, midi: 83 },
];

const BLACK_KEYS = [
  { name: 'C#4', freq: 277.18, midi: 61, leftPercent: 5.2 },
  { name: 'D#4', freq: 311.13, midi: 63, leftPercent: 12.4 },
  { name: 'F#4', freq: 369.99, midi: 66, leftPercent: 26.6 },
  { name: 'G#4', freq: 415.30, midi: 68, leftPercent: 33.8 },
  { name: 'A#4', freq: 466.16, midi: 70, leftPercent: 41.0 },
  { name: 'C#5', freq: 554.37, midi: 73, leftPercent: 55.2 },
  { name: 'D#5', freq: 622.25, midi: 75, leftPercent: 62.4 },
  { name: 'F#5', freq: 739.99, midi: 78, leftPercent: 76.6 },
  { name: 'G#5', freq: 830.61, midi: 80, leftPercent: 83.8 },
  { name: 'A#5', freq: 932.33, midi: 82, leftPercent: 91.0 },
];

export const PianoVisualizer: React.FC<PianoVisualizerProps> = ({
  activeNote,
  onKeyPlay,
}) => {
  const audioEngine = VibexAudioEngine.getInstance();

  const handleKeyPress = (name: string, freq: number) => {
    audioEngine.playInstrumentNote('keyboard', freq, 900);
    if (onKeyPlay) onKeyPlay(name, freq);
  };

  const isKeyActive = (name: string) => {
    return activeNote?.name === name;
  };

  return (
    <div className="w-full bg-[#151725] rounded-xl border border-[#303348] p-4 flex flex-col gap-3">
      {/* Visualizer Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8067FF]" />
          <span className="text-xs font-semibold text-[#F6F4FF]">
            INTERACTIVE GRAND PIANO KEYBED
          </span>
          <span className="text-[11px] text-[#A9A8BA]">· C4–B5</span>
        </div>
        {activeNote && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#A9A8BA]">Active Target:</span>
            <span className="font-mono font-bold text-[#8067FF] px-2 py-0.5 bg-[#8067FF]/15 rounded">
              {activeNote.name} {activeNote.finger ? `(Finger ${activeNote.finger})` : ''}
            </span>
          </div>
        )}
      </div>

      {/* Piano Keyboard Container */}
      <div className="relative w-full h-36 bg-[#0D0E17] p-2 rounded-lg border border-[#303348] select-none overflow-x-auto">
        <div className="relative w-full min-w-[500px] h-full flex">
          {/* White Keys */}
          {WHITE_KEYS.map((key) => {
            const active = isKeyActive(key.name);
            return (
              <button
                key={key.name}
                onClick={() => handleKeyPress(key.name, key.freq)}
                className={`relative flex-1 h-full rounded-b-md border-r border-[#1D2032] flex flex-col justify-end items-center pb-2.5 transition-all duration-75 ${
                  active
                    ? 'bg-[#8067FF] text-[#F6F4FF] shadow-[0_0_15px_#8067FF]'
                    : 'bg-[#F6F4FF] text-[#151725] hover:bg-[#E2DEFA] active:bg-[#D5D0F5]'
                }`}
              >
                {/* Finger Guide Badge */}
                {active && activeNote?.finger && (
                  <span className="absolute top-3 w-5 h-5 rounded-full bg-[#151725] text-[#8067FF] font-mono text-[11px] font-bold flex items-center justify-center border border-[#8067FF]">
                    {activeNote.finger}
                  </span>
                )}
                <span className="text-[10px] font-mono font-bold">{key.name}</span>
              </button>
            );
          })}

          {/* Black Keys */}
          {BLACK_KEYS.map((key) => {
            const active = isKeyActive(key.name);
            return (
              <button
                key={key.name}
                onClick={(e) => {
                  e.stopPropagation();
                  handleKeyPress(key.name, key.freq);
                }}
                style={{ left: `${key.leftPercent}%` }}
                className={`absolute top-0 w-[4.6%] h-[60%] z-20 rounded-b-md border border-[#0D0E17] flex flex-col justify-end items-center pb-1.5 transition-all duration-75 shadow-md ${
                  active
                    ? 'bg-[#A99BFF] text-[#0D0E17] shadow-[0_0_15px_#A99BFF]'
                    : 'bg-[#151725] text-[#A9A8BA] hover:bg-[#1D2032]'
                }`}
              >
                {active && activeNote?.finger && (
                  <span className="absolute top-2 w-4 h-4 rounded-full bg-[#F6F4FF] text-[#151725] font-mono text-[9px] font-bold flex items-center justify-center">
                    {activeNote.finger}
                  </span>
                )}
                <span className="text-[8px] font-mono font-medium">{key.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
