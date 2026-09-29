/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChordShapeVoicing, FingerPlacement } from '../../types/guitarCurriculum';
import { VibexAudioEngine } from '../../services/audioEngine';
import { Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

interface MasterGuitarFretboardProps {
  chordVoicing?: ChordShapeVoicing | null;
  activeFingerPlacement?: FingerPlacement | null;
  highlightedFrets?: { stringIndex: number; fret: number; label?: string; finger?: number }[];
  onStringPluck?: (stringIndex: number, fret: number, freq: number) => void;
  interactive?: boolean;
}

// 6 Strings: Standard Tuning (0=Low E, 1=A, 2=D, 3=G, 4=B, 5=High E)
const STRINGS_INFO = [
  { name: 'E2', num: 6, baseFreq: 82.41, thickness: 3.8 },
  { name: 'A2', num: 5, baseFreq: 110.00, thickness: 3.2 },
  { name: 'D3', num: 4, baseFreq: 146.83, thickness: 2.6 },
  { name: 'G3', num: 3, baseFreq: 196.00, thickness: 2.1 },
  { name: 'B3', num: 2, baseFreq: 246.94, thickness: 1.6 },
  { name: 'E4', num: 1, baseFreq: 329.63, thickness: 1.2 },
];

const FRETS_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const FRET_MARKERS = [3, 5, 7, 9, 12];

export const MasterGuitarFretboard: React.FC<MasterGuitarFretboardProps> = ({
  chordVoicing,
  activeFingerPlacement,
  highlightedFrets = [],
  onStringPluck,
  interactive = true,
}) => {
  const [pluckedStringIndex, setPluckedStringIndex] = useState<number | null>(null);
  const [testedStrings, setTestedStrings] = useState<Set<number>>(new Set());
  const [isStrummingAnim, setIsStrummingAnim] = useState<boolean>(false);
  const [strumPickY, setStrumPickY] = useState<number>(0);
  const audioEngine = VibexAudioEngine.getInstance();

  const handlePluck = (stringIndex: number, fret: number) => {
    if (!interactive) return;
    const baseFreq = STRINGS_INFO[stringIndex].baseFreq;
    const freq = baseFreq * Math.pow(2, fret / 12);

    setPluckedStringIndex(stringIndex);
    setTestedStrings((prev) => new Set(prev).add(stringIndex));

    audioEngine.playInstrumentNote('guitar', freq, 1200);

    setTimeout(() => {
      setPluckedStringIndex(null);
    }, 350);

    if (onStringPluck) {
      onStringPluck(stringIndex, fret, freq);
    }
  };

  const strumAllStrings = () => {
    setIsStrummingAnim(true);
    STRINGS_INFO.forEach((str, idx) => {
      let targetFret = 0;
      if (chordVoicing) {
        const val = chordVoicing.strings[idx];
        if (val === 'X') return; // muted
        targetFret = typeof val === 'number' ? val : 0;
      }
      setTimeout(() => {
        setStrumPickY(idx * 30 + 10);
        handlePluck(idx, targetFret);
      }, idx * 70);
    });

    setTimeout(() => {
      setIsStrummingAnim(false);
    }, STRINGS_INFO.length * 70 + 300);
  };

  return (
    <div className="w-full bg-[#151725] rounded-2xl border border-[#303348] p-4 sm:p-5 flex flex-col gap-4 shadow-xl relative">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#303348] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-[#FF8066] shadow-[0_0_8px_#FF8066]" />
          <h4 className="text-sm font-bold text-[#F6F4FF] tracking-tight">
            VIBEX Dynamic Fretboard Engine
          </h4>
          {chordVoicing && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF8066]/20 border border-[#FF8066]/40 text-[#FF8066] text-xs font-bold font-mono">
              {chordVoicing.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isStrummingAnim && (
            <span className="text-[11px] font-mono text-[#54D6C3] font-bold flex items-center gap-1 animate-pulse">
              <span>↓ Downstroke</span>
            </span>
          )}
          <button
            onClick={strumAllStrings}
            disabled={isStrummingAnim}
            className="px-3.5 py-1.5 rounded-lg bg-[#FF8066] hover:bg-[#ff6c4e] disabled:opacity-50 text-[#0D0E17] font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isStrummingAnim ? 'Strumming...' : 'Strum Chord'}</span>
          </button>
        </div>
      </div>

      {/* Fretboard Canvas Container */}
      <div className="relative w-full bg-gradient-to-r from-[#1C1310] via-[#241712] to-[#1C1310] rounded-xl border-2 border-[#38261F] p-4 overflow-x-auto select-none shadow-inner">
        <div className="relative min-w-[700px] h-48 flex flex-col justify-between py-2">
          {/* Fret Position Markers Inlaid in Rosewood */}
          <div className="absolute inset-0 pointer-events-none flex">
            {FRETS_ARRAY.map((fret) => {
              const hasMarker = FRET_MARKERS.includes(fret);
              const isDoubleDot = fret === 12;
              return (
                <div
                  key={`marker-${fret}`}
                  className="flex-1 flex flex-col items-center justify-center relative"
                >
                  {hasMarker && !isDoubleDot && (
                    <span className="w-3 h-3 rounded-full bg-[#E5DFD5]/40 border border-[#FAF6EE]/50 shadow-sm" />
                  )}
                  {isDoubleDot && (
                    <div className="flex flex-col gap-6">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD5]/40 border border-[#FAF6EE]/50" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD5]/40 border border-[#FAF6EE]/50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Fret Wires (Vertical metal dividers) */}
          <div className="absolute inset-0 pointer-events-none flex">
            {FRETS_ARRAY.map((fret) => (
              <div
                key={`wire-${fret}`}
                className={`flex-1 border-r flex flex-col justify-end pb-1 pr-1 ${
                  fret === 0
                    ? 'border-r-4 border-r-[#E5DFD5]/90 shadow-[0_0_10px_rgba(255,255,255,0.4)]' // The Nut
                    : 'border-r-2 border-r-[#8B939C]/60 shadow-[1px_0_2px_rgba(0,0,0,0.6)]'
                }`}
              >
                <span className="text-[10px] font-mono text-[#A9A8BA]/60 self-center">
                  {fret === 0 ? 'Nut' : fret}
                </span>
              </div>
            ))}
          </div>

          {/* Animated Strum Pick Indicator */}
          {isStrummingAnim && (
            <div
              className="absolute left-10 z-30 pointer-events-none transition-all duration-75 flex items-center gap-1.5"
              style={{ top: `${strumPickY}px` }}
            >
              <div className="w-3.5 h-3.5 rotate-45 bg-[#FF8066] border border-[#FAF6EE] rounded-sm shadow-[0_0_12px_#FF8066]" />
              <span className="text-[9px] font-mono font-bold text-[#FF8066] bg-[#0D0E17]/90 px-1.5 py-0.5 rounded border border-[#FF8066]/40 shadow-sm">
                Pick
              </span>
            </div>
          )}

          {/* 6 Guitar Strings (Horizontal) */}
          {STRINGS_INFO.map((str, stringIdx) => {
            const isPlucked = pluckedStringIndex === stringIdx;

            // Determine if chord voicing has this string muted or fretted
            let chordFret: number | 'X' | null = null;
            let chordFinger: number | null = null;
            if (chordVoicing) {
              chordFret = chordVoicing.strings[stringIdx];
              chordFinger = chordVoicing.fingers[stringIdx];
            }

            // Determine if active single finger placement targets this string
            const isTargetedBySingleFinger =
              activeFingerPlacement && activeFingerPlacement.stringIndex === stringIdx;

            return (
              <div
                key={str.name}
                className="relative w-full h-7 flex items-center z-10"
              >
                {/* String Label Tag */}
                <div className="w-12 flex-shrink-0 flex items-center justify-between pr-2 text-xs font-mono font-bold text-[#A9A8BA]">
                  <span>{str.num}</span>
                  <span className="text-[11px] text-[#FF8066]">{str.name}</span>
                </div>

                {/* String Line */}
                <div className="relative flex-1 h-full flex items-center">
                  <div
                    className={`w-full transition-all duration-75 ${
                      isPlucked
                        ? 'bg-[#54D6C3] shadow-[0_0_12px_#54D6C3] scale-y-125'
                        : 'bg-gradient-to-r from-[#D1D5DB] via-[#9CA3AF] to-[#6B7280]'
                    }`}
                    style={{ height: `${str.thickness}px` }}
                  />

                  {/* Fret Click Zones (0 to 12) */}
                  <div className="absolute inset-0 flex">
                    {FRETS_ARRAY.map((fret) => {
                      const isChordNote =
                        chordFret === fret && typeof chordFret === 'number';
                      const isSingleFinger =
                        isTargetedBySingleFinger &&
                        activeFingerPlacement?.fret === fret;
                      const isHighlighted = highlightedFrets.some(
                        (h) => h.stringIndex === stringIdx && h.fret === fret
                      );

                      const shouldRenderDot =
                        isChordNote || isSingleFinger || isHighlighted;

                      let displayFinger = chordFinger;
                      if (isSingleFinger) {
                        displayFinger = activeFingerPlacement.finger;
                      }

                      return (
                        <div
                          key={`click-${stringIdx}-${fret}`}
                          onClick={() => handlePluck(stringIdx, fret)}
                          className="flex-1 h-full flex items-center justify-center cursor-pointer group hover:bg-[#8067FF]/10 transition-colors relative"
                        >
                          {/* Muted String Indicator on Nut (X) */}
                          {fret === 0 && chordFret === 'X' && (
                            <span className="w-5 h-5 rounded-full bg-[#EF4444]/20 border border-[#EF4444] text-[#EF4444] text-xs font-bold flex items-center justify-center shadow-md">
                              ✕
                            </span>
                          )}

                          {/* Open String Ringing Indicator (O) */}
                          {fret === 0 && chordFret === 0 && (
                            <span className="w-5 h-5 rounded-full bg-[#45D483]/20 border border-[#45D483] text-[#45D483] text-xs font-bold flex items-center justify-center shadow-md">
                              ○
                            </span>
                          )}

                          {/* Active Fretted Note Badge */}
                          {shouldRenderDot && fret > 0 && (
                            <div className="relative flex items-center justify-center animate-in zoom-in-50 duration-200">
                              <span className="absolute -inset-1 rounded-full bg-[#FF8066]/30 blur-sm animate-pulse" />
                              <span className="relative w-6 h-6 rounded-full bg-[#FF8066] border-2 border-[#FAF6EE] text-[#0D0E17] font-extrabold text-xs font-mono flex items-center justify-center shadow-lg">
                                {displayFinger ?? '●'}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual String Testing Matrix */}
      {chordVoicing && (
        <div className="p-3 bg-[#0D0E17] rounded-xl border border-[#303348] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#54D6C3]" />
            <span className="text-[#A9A8BA]">Individual String Clarity Test:</span>
          </div>
          <div className="flex items-center gap-2">
            {STRINGS_INFO.map((str, idx) => {
              const isTested = testedStrings.has(idx);
              const isMuted = chordVoicing.strings[idx] === 'X';
              return (
                <button
                  key={`test-${idx}`}
                  onClick={() => {
                    const f = chordVoicing.strings[idx];
                    handlePluck(idx, typeof f === 'number' ? f : 0);
                  }}
                  className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold border transition-all ${
                    isMuted
                      ? 'bg-[#151725] border-[#EF4444]/40 text-[#EF4444]'
                      : isTested
                      ? 'bg-[#12241C] border-[#45D483] text-[#45D483]'
                      : 'bg-[#151725] border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
                  }`}
                >
                  Str {str.num}: {isMuted ? '✕' : typeof chordVoicing.strings[idx] === 'number' ? `F${chordVoicing.strings[idx]}` : '0'}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
