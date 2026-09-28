/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BansuriScale } from '../../types/vibex';
import { BANSURI_SCALES } from '../../data/curriculumData';
import { VibexAudioEngine } from '../../services/audioEngine';
import { X, Sliders, Volume2, CheckCircle2, Wind } from 'lucide-react';

interface BansuriTunerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedScale: BansuriScale;
  onSelectScale: (scale: BansuriScale) => void;
}

interface SwaraDefinition {
  name: string;
  hindustani: string;
  ratio: number;
  holes: boolean[]; // 6 holes
  description: string;
}

const SWARAS: SwaraDefinition[] = [
  { name: 'Sa', hindustani: 'Shadja (Tonic)', ratio: 1.0, holes: [true, true, true, false, false, false], description: 'Top 3 holes closed by Left Hand.' },
  { name: 'Re (Komal)', hindustani: 'Komal Rishabh (Flat 2nd)', ratio: 1.0667, holes: [true, true, false, false, false, false], description: 'Hole 3 half covered.' },
  { name: 'Re', hindustani: 'Shuddha Rishabh (Major 2nd)', ratio: 1.125, holes: [true, true, false, false, false, false], description: 'Top 2 holes closed.' },
  { name: 'Ga (Komal)', hindustani: 'Komal Gandhar (Minor 3rd)', ratio: 1.185, holes: [true, false, false, false, false, false], description: 'Hole 2 half covered.' },
  { name: 'Ga', hindustani: 'Shuddha Gandhar (Major 3rd)', ratio: 1.25, holes: [true, false, false, false, false, false], description: 'Only Hole 1 closed.' },
  { name: 'Ma', hindustani: 'Shuddha Madhyam (Perfect 4th)', ratio: 1.3333, holes: [false, true, true, false, false, false], description: 'Hole 1 open, 2 & 3 closed.' },
  { name: 'Ma (Teevra)', hindustani: 'Teevra Madhyam (Augmented 4th)', ratio: 1.414, holes: [false, false, false, false, false, false], description: 'All 6 holes open.' },
  { name: 'Pa', hindustani: 'Pancham (Perfect 5th)', ratio: 1.5, holes: [true, true, true, true, true, true], description: 'All 6 holes completely sealed.' },
  { name: 'Dha', hindustani: 'Shuddha Dhaivat (Major 6th)', ratio: 1.6667, holes: [true, true, true, true, true, false], description: 'Holes 1 to 5 closed.' },
  { name: 'Ni', hindustani: 'Shuddha Nishad (Major 7th)', ratio: 1.875, holes: [true, true, true, true, false, false], description: 'Holes 1 to 4 closed.' },
];

export const BansuriTunerModal: React.FC<BansuriTunerModalProps> = ({
  isOpen,
  onClose,
  selectedScale,
  onSelectScale,
}) => {
  const [activeSwara, setActiveSwara] = useState<SwaraDefinition>(SWARAS[0]);
  const audioEngine = VibexAudioEngine.getInstance();

  if (!isOpen) return null;

  const playSwaraAudio = (swara: SwaraDefinition) => {
    setActiveSwara(swara);
    const freq = selectedScale.baseFrequency * swara.ratio;
    audioEngine.playInstrumentNote('bansuri', freq, 1800);
  };

  const calculatedFreq = Math.round(selectedScale.baseFrequency * activeSwara.ratio * 10) / 10;

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0E17]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#151725] rounded-xl border border-[#303348] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#303348] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#54D6C3]" />
            <h3 className="text-base font-semibold text-[#F6F4FF]">
              Flute Scale Tuner & Swara Transposition Matrix
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#A9A8BA] hover:text-[#F6F4FF] hover:bg-[#1D2032] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          {/* Scale Selector Grid */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#F6F4FF]">
                SELECT FLUTE SCALE / BASE TONIC
              </label>
              <span className="text-[11px] font-mono text-[#54D6C3]">
                Tonic Sa = {selectedScale.baseFrequency} Hz
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BANSURI_SCALES.map((scale) => {
                const isSelected = scale.id === selectedScale.id;
                return (
                  <button
                    key={scale.id}
                    onClick={() => {
                      onSelectScale(scale);
                      audioEngine.playInstrumentNote('bansuri', scale.baseFrequency, 1200);
                    }}
                    className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                      isSelected
                        ? 'bg-[#54D6C3]/15 border-[#54D6C3] text-[#F6F4FF]'
                        : 'bg-[#1D2032] border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] hover:border-[#8067FF]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{scale.name.split(' (')[0]}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0D0E17] text-[#54D6C3]">
                        {scale.basePitchName}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A9A8BA]">
                      {scale.type} · {scale.lengthInches}&quot;
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Swara Calibration Box */}
          <div className="p-4 bg-[#0D0E17] rounded-xl border border-[#303348] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#54D6C3] uppercase tracking-wider">
                  Target Calibrated Swara
                </span>
                <h4 className="text-xl font-bold text-[#F6F4FF] flex items-center gap-2">
                  <span>{activeSwara.name}</span>
                  <span className="text-sm font-normal text-[#A9A8BA]">
                    — {activeSwara.hindustani}
                  </span>
                </h4>
              </div>

              <div className="text-right">
                <span className="text-xl font-bold font-mono text-[#54D6C3]">
                  {calculatedFreq} Hz
                </span>
                <div className="text-[11px] text-[#A9A8BA]">Frequency Target</div>
              </div>
            </div>

            {/* Hole Coverage Visualization */}
            <div className="p-3 bg-[#151725] rounded-lg border border-[#303348] flex flex-col gap-2">
              <span className="text-xs text-[#A9A8BA]">
                6-Hole Finger Placement Guidance:
              </span>
              <div className="flex items-center justify-between px-4 py-2 bg-[#0D0E17] rounded">
                <span className="text-[11px] font-mono text-[#A9A8BA]">Blowhole ◖</span>
                <div className="flex items-center gap-4">
                  {activeSwara.holes.map((closed, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          closed
                            ? 'bg-[#54D6C3] border-[#54D6C3] shadow-[0_0_8px_#54D6C3]'
                            : 'bg-[#1D2032] border-[#303348]'
                        }`}
                      >
                        {closed && <span className="w-2 h-2 rounded-full bg-[#0D0E17]" />}
                      </div>
                      <span className="text-[9px] font-mono text-[#A9A8BA]">
                        {idx < 3 ? `L${idx + 1}` : `R${idx - 2}`}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="text-[11px] font-mono text-[#A9A8BA]">Tail ◗</span>
              </div>
              <p className="text-xs text-[#F6F4FF]/90 italic">{activeSwara.description}</p>
            </div>

            {/* Test Pitch Audio Trigger */}
            <button
              onClick={() => playSwaraAudio(activeSwara)}
              className="w-full py-2.5 rounded-lg bg-[#54D6C3] text-[#0D0E17] font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#43B8A7] transition-colors"
            >
              <Wind className="w-4 h-4" />
              <span>Audition Calibrated Frequency ({calculatedFreq} Hz)</span>
            </button>
          </div>

          {/* All Swaras Selection Matrix */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[#F6F4FF]">
              SELECT SWARA TO AUDITION / TUNE
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {SWARAS.map((swara) => {
                const isCurrent = swara.name === activeSwara.name;
                const freq = Math.round(selectedScale.baseFrequency * swara.ratio * 10) / 10;
                return (
                  <button
                    key={swara.name}
                    onClick={() => playSwaraAudio(swara)}
                    className={`p-2 rounded-md border text-center transition-all ${
                      isCurrent
                        ? 'bg-[#54D6C3]/20 border-[#54D6C3] text-[#F6F4FF]'
                        : 'bg-[#1D2032] border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
                    }`}
                  >
                    <div className="font-bold text-xs">{swara.name}</div>
                    <div className="font-mono text-[10px] text-[#54D6C3]">{freq} Hz</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#303348] bg-[#0D0E17] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#8067FF] text-white text-xs font-semibold hover:bg-[#6952E6] transition-colors"
          >
            Apply Scale Calibration
          </button>
        </div>
      </div>
    </div>
  );
};
