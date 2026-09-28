/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NoteGuide } from '../../types/vibex';
import { VibexAudioEngine } from '../../services/audioEngine';

interface GuitarVisualizerProps {
  activeNote?: NoteGuide | null;
  onFretPlay?: (stringIdx: number, fret: number, freq: number) => void;
}

// 6 Strings: Standard Tuning E2, A2, D3, G3, B3, E4
const STRINGS = [
  { name: 'E4 (1st)', baseFreq: 329.63, gauge: 1.2 },
  { name: 'B3 (2nd)', baseFreq: 246.94, gauge: 1.6 },
  { name: 'G3 (3rd)', baseFreq: 196.00, gauge: 2.0 },
  { name: 'D3 (4th)', baseFreq: 146.83, gauge: 2.4 },
  { name: 'A2 (5th)', baseFreq: 110.00, gauge: 2.8 },
  { name: 'E2 (6th)', baseFreq: 82.41, gauge: 3.2 },
];

const FRETS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const FRET_MARKERS = [3, 5, 7, 9, 12];

export const GuitarVisualizer: React.FC<GuitarVisualizerProps> = ({
  activeNote,
  onFretPlay,
}) => {
  const [pluckedString, setPluckedString] = useState<number | null>(null);
  const audioEngine = VibexAudioEngine.getInstance();

  const handleFretClick = (stringIndex: number, fret: number) => {
    const baseFreq = STRINGS[stringIndex].baseFreq;
    const freq = baseFreq * Math.pow(2, fret / 12);

    setPluckedString(stringIndex);
    audioEngine.playInstrumentNote('guitar', freq, 1200);

    setTimeout(() => {
      setPluckedString(null);
    }, 350);

    if (onFretPlay) {
      onFretPlay(stringIndex, fret, freq);
    }
  };

  return (
    <div className="w-full bg-[#151725] rounded-xl border border-[#303348] p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF8066]" />
          <span className="text-xs font-semibold text-[#F6F4FF]">
            INTERACTIVE GUITAR FRETBOARD
          </span>
          <span className="text-[11px] text-[#A9A8BA]">· 12 Frets / Standard Tuning</span>
        </div>
        {activeNote && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#A9A8BA]">Target:</span>
            <span className="font-mono font-bold text-[#FF8066] px-2 py-0.5 bg-[#FF8066]/15 rounded">
              Fret {activeNote.fret ?? 0} on String {(activeNote.stringIndex ?? 0) + 1}
              {activeNote.finger ? ` · Finger ${activeNote.finger}` : ''}
            </span>
          </div>
        )}
      </div>

      {/* Fretboard Graphic Container */}
      <div className="relative w-full bg-[#201815] rounded-lg border-2 border-[#38261F] p-3 overflow-x-auto select-none shadow-inner">
        <div className="relative min-w-[620px] h-32 flex flex-col justify-between py-1">
          {/* Fret markers dots in wood background */}
          <div className="absolute inset-0 pointer-events-none flex">
            {FRETS.map((fret) => {
              const hasMarker = FRET_MARKERS.includes(fret);
              const isDoubleDot = fret === 12;
              return (
                <div
                  key={`marker-${fret}`}
                  className="flex-1 flex flex-col items-center justify-center relative"
                >
                  {hasMarker && !isDoubleDot && (
                    <span className="w-3 h-3 rounded-full bg-[#E5DFD5]/40 border border-[#FAF6EE]/60 shadow-sm" />
                  )}
                  {isDoubleDot && (
                    <div className="flex flex-col gap-5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD5]/40 border border-[#FAF6EE]/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD5]/40 border border-[#FAF6EE]/60" />
                    </div>
                  )}
                  {/* Fret number label */}
                  <span className="absolute bottom-[-14px] text-[9px] font-mono text-[#A9A8BA]">
                    {fret === 0 ? 'Nut' : fret}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Strings and Clickable Frets */}
          {STRINGS.map((str, sIdx) => {
            const isPlucked = pluckedString === sIdx;
            return (
              <div key={str.name} className="relative w-full h-4 flex items-center z-10">
                {/* Horizontal String Line */}
                <div
                  className={`absolute inset-x-0 transition-transform duration-75 ${
                    isPlucked ? 'animate-bounce' : ''
                  }`}
                  style={{
                    height: `${str.gauge}px`,
                    background: sIdx > 2 ? '#C5A059' : '#D1D5DB', // bronze wound vs plain steel
                    boxShadow: isPlucked ? '0 0 8px #FF8066' : '0 1px 2px rgba(0,0,0,0.5)',
                  }}
                />

                {/* Fret cells */}
                <div className="relative w-full h-full flex">
                  {FRETS.map((fret) => {
                    const isTarget =
                      activeNote?.stringIndex === sIdx && (activeNote?.fret ?? 0) === fret;

                    return (
                      <button
                        key={`cell-${sIdx}-${fret}`}
                        onClick={() => handleFretClick(sIdx, fret)}
                        className={`flex-1 h-full relative group border-r ${
                          fret === 0 ? 'border-r-4 border-r-[#F6F4FF]/70' : 'border-r-[#9E8E7D]/50'
                        } flex items-center justify-center`}
                      >
                        {/* Target Marker with Coral Orange accent */}
                        {isTarget ? (
                          <div className="relative z-20 w-6 h-6 rounded-full bg-[#FF8066] text-[#0D0E17] font-mono text-[11px] font-bold flex items-center justify-center shadow-[0_0_12px_#FF8066] ring-2 ring-white animate-pulse">
                            {activeNote?.finger ?? '●'}
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-white/0 group-hover:bg-[#FF8066]/30 transition-colors" />
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
