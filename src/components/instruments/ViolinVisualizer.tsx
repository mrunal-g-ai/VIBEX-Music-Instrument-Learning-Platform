/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NoteGuide } from '../../types/vibex';
import { VibexAudioEngine } from '../../services/audioEngine';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface ViolinVisualizerProps {
  activeNote?: NoteGuide | null;
  onNotePlay?: (stringIdx: number, finger: number, freq: number) => void;
}

const VIOLIN_STRINGS = [
  { name: 'G3', baseFreq: 196.00, color: '#D97706' }, // silver wound
  { name: 'D4', baseFreq: 293.66, color: '#A3A3A3' },
  { name: 'A4', baseFreq: 440.00, color: '#E5E5E5' },
  { name: 'E5', baseFreq: 659.25, color: '#F5F5F5' }, // gold/steel
];

// Positions along the fingerboard: Open, 1st finger, 2nd (high), 3rd, 4th
const FINGER_POSITIONS = [
  { finger: 0, label: 'Open', semitones: 0 },
  { finger: 1, label: '1st Finger', semitones: 2 },
  { finger: 2, label: '2nd Finger', semitones: 4 },
  { finger: 3, label: '3rd Finger', semitones: 5 },
  { finger: 4, label: '4th Finger', semitones: 7 },
];

export const ViolinVisualizer: React.FC<ViolinVisualizerProps> = ({
  activeNote,
  onNotePlay,
}) => {
  const [bowDirection, setBowDirection] = useState<'down' | 'up'>('down');
  const audioEngine = VibexAudioEngine.getInstance();

  const handleFingerTouch = (stringIndex: number, finger: number, semitones: number) => {
    const baseFreq = VIOLIN_STRINGS[stringIndex].baseFreq;
    const freq = baseFreq * Math.pow(2, semitones / 12);

    // alternate bow direction on touch
    setBowDirection((prev) => (prev === 'down' ? 'up' : 'down'));
    audioEngine.playInstrumentNote('violin', freq, 1500);

    if (onNotePlay) {
      onNotePlay(stringIndex, finger, freq);
    }
  };

  const bowDir = activeNote?.bowDirection || bowDirection;

  return (
    <div className="w-full bg-[#151725] rounded-xl border border-[#303348] p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E889A5]" />
          <span className="text-xs font-semibold text-[#F6F4FF]">
            VIOLIN FINGERBOARD & BOW HIGHWAY
          </span>
          <span className="text-[11px] text-[#A9A8BA]">· 1st Position Tape Guides</span>
        </div>

        {/* Live Bow Stroke Indicator */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#A9A8BA]">Bow Stroke:</span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#1D2032] border border-[#303348] text-[#E889A5] font-mono font-bold">
            {bowDir === 'down' ? (
              <>
                <ArrowDown className="w-3.5 h-3.5 text-[#E889A5]" />
                <span>Down-Bow [⨅]</span>
              </>
            ) : (
              <>
                <ArrowUp className="w-3.5 h-3.5 text-[#E889A5]" />
                <span>Up-Bow [V]</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Ebony Fingerboard & Bridge Graphic */}
      <div className="relative w-full bg-[#111116] rounded-lg border-2 border-[#232029] p-4 overflow-x-auto select-none shadow-inner">
        <div className="relative min-w-[540px] h-32 flex flex-col justify-between py-1">
          {/* Tape Intonation Marks */}
          <div className="absolute inset-0 pointer-events-none flex">
            {FINGER_POSITIONS.map((pos) => (
              <div
                key={`tape-${pos.finger}`}
                className="flex-1 border-r border-[#E889A5]/25 relative flex flex-col justify-end pb-1"
              >
                <span className="text-[9px] font-mono text-[#E889A5]/60 pl-1">
                  {pos.finger === 0 ? 'Nut (Open)' : `Tape ${pos.finger}`}
                </span>
              </div>
            ))}
          </div>

          {/* 4 Strings (G, D, A, E) */}
          {VIOLIN_STRINGS.map((str, sIdx) => {
            return (
              <div key={str.name} className="relative w-full h-5 flex items-center z-10">
                {/* String Label */}
                <span className="w-8 text-[11px] font-mono font-bold text-[#A9A8BA]">
                  {str.name}
                </span>

                {/* String line */}
                <div
                  className="absolute inset-x-8"
                  style={{
                    height: `${2.8 - sIdx * 0.5}px`,
                    background: str.color,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.6)',
                  }}
                />

                {/* Finger Tape Targets */}
                <div className="relative w-full ml-2 h-full flex">
                  {FINGER_POSITIONS.map((pos) => {
                    const isTarget =
                      activeNote?.stringIndex === sIdx &&
                      (activeNote?.finger ?? 0) === pos.finger;

                    return (
                      <button
                        key={`cell-${sIdx}-${pos.finger}`}
                        onClick={() => handleFingerTouch(sIdx, pos.finger, pos.semitones)}
                        className="flex-1 h-full relative group flex items-center justify-center"
                      >
                        {isTarget ? (
                          <div className="relative z-20 w-6 h-6 rounded-full bg-[#E889A5] text-[#0D0E17] font-mono text-[11px] font-bold flex items-center justify-center shadow-[0_0_12px_#E889A5] ring-2 ring-white animate-pulse">
                            {pos.finger === 0 ? '0' : pos.finger}
                          </div>
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full bg-white/0 group-hover:bg-[#E889A5]/30 transition-colors" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
