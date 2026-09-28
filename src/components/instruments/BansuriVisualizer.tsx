/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NoteGuide, BansuriScale } from '../../types/vibex';
import { VibexAudioEngine } from '../../services/audioEngine';
import { Wind } from 'lucide-react';

interface BansuriVisualizerProps {
  activeNote?: NoteGuide | null;
  activeScale?: BansuriScale;
  onSwaraPlay?: (swara: string, freq: number) => void;
}

export const BansuriVisualizer: React.FC<BansuriVisualizerProps> = ({
  activeNote,
  activeScale,
  onSwaraPlay,
}) => {
  // 6 holes state (true = closed, false = open)
  const defaultHoles = activeNote?.holes || [true, true, true, false, false, false];
  const [holes, setHoles] = useState<boolean[]>(defaultHoles);
  const audioEngine = VibexAudioEngine.getInstance();

  const baseFreq = activeScale?.baseFrequency || 261.63; // Default C4

  // Swara mapping for finger hole combinations:
  // [1,2,3 closed, 4,5,6 open] => Sa
  // [1,2 closed, 3,4,5,6 open] => Re
  // [1 closed, 2,3,4,5,6 open] => Ga
  // [all open] => Ma (Teevra)
  // [all closed] => Pa (Pancham)
  const getSwaraFromHoles = (h: boolean[]): { swara: string; freqMultiplier: number } => {
    const closedCount = h.filter(Boolean).length;
    if (closedCount === 6) return { swara: 'Pa (Pancham)', freqMultiplier: 1.5 };
    if (closedCount === 5) return { swara: 'Dha (Dhaivat)', freqMultiplier: 1.68 };
    if (closedCount === 4) return { swara: 'Ni (Nishad)', freqMultiplier: 1.88 };
    if (closedCount === 3 && h[0] && h[1] && h[2]) return { swara: 'Sa (Shadja)', freqMultiplier: 1.0 };
    if (closedCount === 2 && h[0] && h[1]) return { swara: 'Re (Rishabh)', freqMultiplier: 1.125 };
    if (closedCount === 1 && h[0]) return { swara: 'Ga (Gandhar)', freqMultiplier: 1.25 };
    return { swara: 'Ma (Madhyam)', freqMultiplier: 1.41 };
  };

  const currentSwara = getSwaraFromHoles(activeNote?.holes || holes);

  const toggleHole = (index: number) => {
    const next = [...holes];
    next[index] = !next[index];
    setHoles(next);

    const swaraInfo = getSwaraFromHoles(next);
    const freq = baseFreq * swaraInfo.freqMultiplier;
    audioEngine.playInstrumentNote('bansuri', freq, 1600);

    if (onSwaraPlay) {
      onSwaraPlay(swaraInfo.swara, freq);
    }
  };

  const playCurrentSwara = () => {
    const freq = baseFreq * currentSwara.freqMultiplier;
    audioEngine.playInstrumentNote('bansuri', freq, 1800);
    if (onSwaraPlay) {
      onSwaraPlay(currentSwara.swara, freq);
    }
  };

  const currentHoleStates = activeNote?.holes || holes;

  return (
    <div className="w-full bg-[#151725] rounded-xl border border-[#303348] p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#54D6C3]" />
          <span className="text-xs font-semibold text-[#F6F4FF]">
            AUTHENTIC 6-HOLE BANSURI FLUTE
          </span>
          <span className="text-[11px] text-[#A9A8BA]">
            · Scale: {activeScale?.name || 'C Medium (261 Hz)'}
          </span>
        </div>

        {/* Current Swara Audio Trigger */}
        <button
          onClick={playCurrentSwara}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#54D6C3]/15 border border-[#54D6C3]/40 text-[#54D6C3] hover:bg-[#54D6C3]/25 transition-colors text-xs font-medium"
        >
          <Wind className="w-3.5 h-3.5" />
          <span>Breath Pulse: </span>
          <span className="font-bold font-mono">{currentSwara.swara.split(' ')[0]}</span>
        </button>
      </div>

      {/* Bamboo Flute Graphic Container */}
      <div className="relative w-full bg-[#1E1C18] rounded-lg border-2 border-[#38332A] p-4 overflow-x-auto select-none shadow-inner">
        <div className="relative min-w-[580px] h-28 flex items-center justify-center">
          {/* Bamboo Body Cylinder */}
          <div className="relative w-full h-14 bg-gradient-to-r from-[#D9A05B] via-[#E8B87A] to-[#C9904D] rounded-full border-2 border-[#8C5E28] shadow-md flex items-center px-6 justify-between">
            {/* Thread Bindings (Crimson silk thread) */}
            <div className="w-4 h-full bg-[#991B1B] border-x border-[#7F1D1D]/70 shrink-0" />

            {/* Blowhole (Embouchure) */}
            <div className="relative flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#151725] border-2 border-[#0D0E17] shadow-inner flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#54D6C3]/40" />
              </div>
              <span className="absolute -bottom-6 text-[9px] font-mono text-[#F6F4FF] whitespace-nowrap">
                Blowhole
              </span>
            </div>

            <div className="w-3 h-full bg-[#991B1B] border-x border-[#7F1D1D]/70 shrink-0" />

            {/* Left Hand Section (Holes 1, 2, 3) */}
            <div className="flex items-center gap-7">
              {[0, 1, 2].map((idx) => {
                const isClosed = currentHoleStates[idx];
                return (
                  <button
                    key={`lh-${idx}`}
                    onClick={() => toggleHole(idx)}
                    className="relative flex flex-col items-center group"
                  >
                    <div
                      className={`w-7 h-7 rounded-full border-2 transition-all duration-100 flex items-center justify-center shadow-inner ${
                        isClosed
                          ? 'bg-[#54D6C3] border-[#38A89A] shadow-[0_0_10px_#54D6C3]'
                          : 'bg-[#151725] border-[#0D0E17] group-hover:border-[#54D6C3]'
                      }`}
                    >
                      {isClosed && <span className="w-2.5 h-2.5 rounded-full bg-[#0D0E17]" />}
                    </div>
                    <span className="absolute -bottom-5 text-[9px] font-mono text-[#A9A8BA]">
                      LH-{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="w-2 h-full bg-[#991B1B] border-x border-[#7F1D1D]/70 shrink-0" />

            {/* Right Hand Section (Holes 4, 5, 6) */}
            <div className="flex items-center gap-7">
              {[3, 4, 5].map((idx) => {
                const isClosed = currentHoleStates[idx];
                return (
                  <button
                    key={`rh-${idx}`}
                    onClick={() => toggleHole(idx)}
                    className="relative flex flex-col items-center group"
                  >
                    <div
                      className={`w-7 h-7 rounded-full border-2 transition-all duration-100 flex items-center justify-center shadow-inner ${
                        isClosed
                          ? 'bg-[#54D6C3] border-[#38A89A] shadow-[0_0_10px_#54D6C3]'
                          : 'bg-[#151725] border-[#0D0E17] group-hover:border-[#54D6C3]'
                      }`}
                    >
                      {isClosed && <span className="w-2.5 h-2.5 rounded-full bg-[#0D0E17]" />}
                    </div>
                    <span className="absolute -bottom-5 text-[9px] font-mono text-[#A9A8BA]">
                      RH-{idx - 2}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right End Thread Binding */}
            <div className="w-5 h-full bg-[#991B1B] border-x border-[#7F1D1D]/70 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
