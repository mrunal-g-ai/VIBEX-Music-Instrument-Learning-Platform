/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { VibexAudioEngine } from '../../services/audioEngine';
import { Mic, MicOff, AlertCircle, CheckCircle2 } from 'lucide-react';

const GUITAR_STRINGS = [
  { name: 'E2', num: 6, freq: 82.41 },
  { name: 'A2', num: 5, freq: 110.0 },
  { name: 'D3', num: 4, freq: 146.83 },
  { name: 'G3', num: 3, freq: 196.0 },
  { name: 'B3', num: 2, freq: 246.94 },
  { name: 'E4', num: 1, freq: 329.63 },
];

export const TunerTool: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [detectedNote, setDetectedNote] = useState<string>('--');
  const [detectedFreq, setDetectedFreq] = useState<number | null>(null);
  const [centsDeviation, setCentsDeviation] = useState<number>(0);
  const [closestString, setClosestString] = useState<typeof GUITAR_STRINGS[0] | null>(null);

  const audioEngine = VibexAudioEngine.getInstance();
  const animFrameRef = useRef<number | null>(null);
  const bufferRef = useRef<Float32Array>(new Float32Array(2048));

  const startTuner = async () => {
    setMicError(null);
    const success = await audioEngine.startPitchTracking();
    if (!success) {
      setMicError('Microphone permission denied or not available. Please grant mic access in your browser to tune your guitar.');
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

  const isInTune = Math.abs(centsDeviation) <= 5 && detectedNote !== '--';

  return (
    <div className="w-full bg-[#151725] border border-[#303348] rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#303348] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#F6F4FF]">Standard Guitar Tuner (E A D G B E)</h3>
          <p className="text-xs text-[#A9A8BA]">
            Real-time fundamental frequency pitch tracking with sub-cent accuracy
          </p>
        </div>

        <button
          onClick={isListening ? stopTuner : startTuner}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            isListening
              ? 'bg-[#F06B78] text-white'
              : 'bg-[#54D6C3] text-[#0D0E17] hover:bg-[#45c2b0]'
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          <span>{isListening ? 'Stop Tuner' : 'Enable Microphone'}</span>
        </button>
      </div>

      {micError && (
        <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#F06B78]/40 text-xs text-[#F06B78] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{micError}</span>
        </div>
      )}

      {/* Main Pitch Dial */}
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0D0E17] border border-[#303348] gap-4">
        <div className="text-center">
          <span className="text-xs text-[#A9A8BA] font-mono block mb-1 uppercase tracking-wider">
            Detected Pitch
          </span>
          <span
            className={`text-6xl font-extrabold font-mono transition-colors ${
              isInTune ? 'text-[#45D483]' : 'text-[#F6F4FF]'
            }`}
          >
            {detectedNote}
          </span>
          <span className="text-xs font-mono text-[#A9A8BA] block mt-1">
            {detectedFreq ? `${detectedFreq} Hz` : '-- Hz'}
          </span>
        </div>

        {/* Cents Needle Display (-50 to +50 cents) */}
        <div className="w-full max-w-md flex flex-col gap-2">
          <div className="relative w-full h-4 bg-[#1D2032] rounded-full overflow-hidden border border-[#303348]">
            {/* Center zero line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#45D483] z-10" />

            {/* Needle indicator */}
            {isListening && detectedFreq && (
              <div
                className={`absolute top-0 bottom-0 w-3 rounded-full transition-all duration-75 transform -translate-x-1/2 ${
                  isInTune ? 'bg-[#45D483] shadow-[0_0_8px_#45D483]' : 'bg-[#FF8066]'
                }`}
                style={{
                  left: `${Math.min(100, Math.max(0, 50 + centsDeviation))}%`,
                }}
              />
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#A9A8BA]">
            <span>-50 cents (Flat)</span>
            <span className={isInTune ? 'text-[#45D483] font-bold' : ''}>
              {detectedNote !== '--' ? `${centsDeviation > 0 ? '+' : ''}${centsDeviation} cents` : 'In Tune (0)'}
            </span>
            <span>+50 cents (Sharp)</span>
          </div>
        </div>
      </div>

      {/* Standard 6 Strings Reference Bar */}
      <div className="grid grid-cols-6 gap-2 text-center text-xs font-mono">
        {GUITAR_STRINGS.map((s) => {
          const isTargeted = closestString?.num === s.num;
          return (
            <div
              key={s.num}
              className={`p-2.5 rounded-xl border transition-all ${
                isTargeted
                  ? 'bg-[#FF8066]/20 border-[#FF8066] text-[#FF8066] font-bold shadow-md'
                  : 'bg-[#0D0E17] border-[#303348] text-[#A9A8BA]'
              }`}
            >
              <span className="block text-[10px] text-[#A9A8BA]">String {s.num}</span>
              <span className="text-sm font-bold text-[#F6F4FF]">{s.name}</span>
              <span className="block text-[10px] text-[#A9A8BA]">{s.freq} Hz</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
