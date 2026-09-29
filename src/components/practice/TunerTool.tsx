/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { VibexAudioEngine } from '../../services/audioEngine';
import { Mic, MicOff, AlertCircle, CheckCircle2, X, ChevronRight } from 'lucide-react';

export const GUITAR_STRINGS = [
  { name: 'E2', num: 6, label: 'Low E', freq: 82.41 },
  { name: 'A2', num: 5, label: 'A', freq: 110.0 },
  { name: 'D3', num: 4, label: 'D', freq: 146.83 },
  { name: 'G3', num: 3, label: 'G', freq: 196.0 },
  { name: 'B3', num: 2, label: 'B', freq: 246.94 },
  { name: 'E4', num: 1, label: 'High E', freq: 329.63 },
];

interface TunerToolProps {
  onClose?: () => void;
}

export const TunerTool: React.FC<TunerToolProps> = ({ onClose }) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [detectedNote, setDetectedNote] = useState<string>('--');
  const [detectedFreq, setDetectedFreq] = useState<number | null>(null);
  const [centsDeviation, setCentsDeviation] = useState<number>(0);
  const [closestString, setClosestString] = useState<typeof GUITAR_STRINGS[0]>(GUITAR_STRINGS[0]);
  const [targetStringNum, setTargetStringNum] = useState<number>(6);

  const audioEngine = VibexAudioEngine.getInstance();
  const animFrameRef = useRef<number | null>(null);
  const bufferRef = useRef<Float32Array>(new Float32Array(2048));

  const startTuner = async () => {
    setMicError(null);
    const success = await audioEngine.startPitchTracking();
    if (!success) {
      setMicError('Microphone permission denied. Please allow microphone access in your browser to tune your guitar.');
      setIsListening(false);
      return;
    }
    setIsListening(true);
  };

  const stopTuner = () => {
    audioEngine.stopPitchTracking();
    setIsListening(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setDetectedNote('--');
    setDetectedFreq(null);
  };

  useEffect(() => {
    if (!isListening) return;

    const audioCtx = audioEngine.getAudioContext();
    const sampleRate = audioCtx.sampleRate;

    const loop = () => {
      audioEngine.getAudioTimeData(bufferRef.current);
      const res = audioEngine.detectPitchYIN(bufferRef.current, sampleRate, 0.15);

      if (res.frequency && res.clarity > 0.65) {
        const freq = res.frequency;
        setDetectedFreq(Math.round(freq * 10) / 10);
        const { noteName, centsDeviation } = audioEngine.frequencyToNote(freq);
        setDetectedNote(noteName);
        setCentsDeviation(centsDeviation);

        // Find closest standard guitar string
        let minDiff = Infinity;
        let matched = GUITAR_STRINGS[0];
        GUITAR_STRINGS.forEach((s) => {
          const diff = Math.abs(s.freq - freq);
          if (diff < minDiff) {
            minDiff = diff;
            matched = s;
          }
        });
        setClosestString(matched);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      audioEngine.stopPitchTracking();
    };
  }, [isListening]);

  const isInTune = Math.abs(centsDeviation) <= 3 && detectedNote !== '--';
  const isTooLow = centsDeviation < -3 && detectedNote !== '--';
  const isTooHigh = centsDeviation > 3 && detectedNote !== '--';

  return (
    <div className="w-full bg-[#151725] border border-[#303348] rounded-2xl p-6 flex flex-col gap-6 shadow-2xl animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#303348] pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#54D6C3]/20 text-[#54D6C3] font-bold">
            Interactive Guitar Tuner
          </span>
          <h3 className="text-base font-bold text-[#F6F4FF] mt-1">Standard Tuning (E A D G B E)</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={isListening ? stopTuner : startTuner}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              isListening
                ? 'bg-[#F06B78] text-white'
                : 'bg-[#54D6C3] text-[#0D0E17] hover:bg-[#45c2b0]'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isListening ? 'Stop Mic' : 'Enable Microphone'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1D2032] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {micError && (
        <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#F06B78]/40 text-xs text-[#F06B78] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{micError}</span>
        </div>
      )}

      {/* Beginner Step Guidance Callout */}
      <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#303348] flex items-center justify-between text-xs">
        <span className="font-semibold text-[#F6F4FF]">
          Target: String {targetStringNum} ({GUITAR_STRINGS.find((s) => s.num === targetStringNum)?.label})
        </span>
        <span className="text-[#A9A8BA]">
          Pluck string cleanly and watch the needle below
        </span>
      </div>

      {/* Main Pitch & Guidance Dial */}
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0D0E17] border border-[#303348] gap-4">
        {/* Tuning Instruction Banner (Section 24 & 26) */}
        <div className="text-center min-h-[48px] flex flex-col items-center justify-center">
          {!isListening ? (
            <span className="text-xs text-[#A9A8BA]">Click 'Enable Microphone' above to begin tuning</span>
          ) : detectedNote === '--' ? (
            <span className="text-xs text-[#A9A8BA] animate-pulse">Pluck any open string...</span>
          ) : isInTune ? (
            <span className="text-xs font-bold text-[#45D483] flex items-center gap-1.5 animate-in zoom-in-95">
              <CheckCircle2 className="w-4 h-4" />
              <span>✓ IN TUNE — Pure Resonance!</span>
            </span>
          ) : isTooLow ? (
            <span className="text-xs font-bold text-[#F4BB55]">
              TOO LOW — Turn tuning peg slightly higher (Tighten →)
            </span>
          ) : (
            <span className="text-xs font-bold text-[#FF8066]">
              TOO HIGH — Loosen tuning peg slightly (← Loosen)
            </span>
          )}
        </div>

        {/* Big Note & Frequency Display */}
        <div className="text-center">
          <span
            className={`text-6xl sm:text-7xl font-black font-mono transition-colors ${
              isInTune ? 'text-[#45D483]' : 'text-[#F6F4FF]'
            }`}
          >
            {detectedNote}
          </span>
          <span className="text-xs font-mono text-[#A9A8BA] block mt-1">
            {detectedFreq ? `${detectedFreq} Hz` : '-- Hz'}
          </span>
        </div>

        {/* Central Tuner Needle Display (Section 25) */}
        <div className="w-full max-w-md flex flex-col gap-2 mt-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#A9A8BA]">
            <span className="text-[#F4BB55]">← Loosen (Flat)</span>
            <span className="text-[#45D483] font-bold">IN TUNE (0)</span>
            <span className="text-[#FF8066]">Tighten → (Sharp)</span>
          </div>

          <div className="relative w-full h-5 bg-[#1D2032] rounded-full overflow-hidden border border-[#303348]">
            {/* Center zero in-tune target zone */}
            <div className="absolute top-0 bottom-0 left-[48%] right-[48%] bg-[#45D483]/30 z-0" />
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#45D483] z-10" />

            {/* Needle indicator */}
            {isListening && detectedFreq && (
              <div
                className={`absolute top-0 bottom-0 w-3 rounded-full transition-all duration-75 transform -translate-x-1/2 z-20 ${
                  isInTune
                    ? 'bg-[#45D483] shadow-[0_0_12px_#45D483]'
                    : isTooLow
                    ? 'bg-[#F4BB55]'
                    : 'bg-[#FF8066]'
                }`}
                style={{
                  left: `${Math.min(100, Math.max(0, 50 + centsDeviation))}%`,
                }}
              />
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#A9A8BA]">
            <span>-50 cents</span>
            <span className={isInTune ? 'text-[#45D483] font-bold' : ''}>
              {detectedNote !== '--' ? `${centsDeviation > 0 ? '+' : ''}${centsDeviation} cents` : '0 cents'}
            </span>
            <span>+50 cents</span>
          </div>
        </div>
      </div>

      {/* 6 Guitar Strings Reference Grid (Section 25) */}
      <div className="grid grid-cols-6 gap-2 text-center text-xs font-mono">
        {GUITAR_STRINGS.map((s) => {
          const isTargeted = targetStringNum === s.num;
          const isDetected = closestString?.num === s.num && detectedNote !== '--';
          return (
            <button
              key={s.num}
              onClick={() => setTargetStringNum(s.num)}
              className={`p-3 rounded-xl border transition-all ${
                isTargeted
                  ? 'bg-[#FF8066]/20 border-[#FF8066] text-[#FF8066] font-bold shadow-md'
                  : isDetected
                  ? 'bg-[#1D2032] border-[#54D6C3] text-[#54D6C3]'
                  : 'bg-[#0D0E17] border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
              }`}
            >
              <span className="block text-[10px] text-[#A9A8BA]">Str {s.num}</span>
              <span className="text-sm font-bold text-[#F6F4FF]">{s.name}</span>
              <span className="block text-[9px] text-[#A9A8BA]">{s.freq} Hz</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
