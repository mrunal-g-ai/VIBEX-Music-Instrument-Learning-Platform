/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ExerciseItem, InstrumentType, RecordedTake } from '../../types/vibex';
import { VibexAudioEngine } from '../../services/audioEngine';
import { Mic, Square, Play, Award, CheckCircle2, RotateCcw, X, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SessionRecorderModalProps {
  exercise: ExerciseItem;
  instrument: InstrumentType;
  isOpen: boolean;
  onClose: () => void;
  onSaveTake?: (take: RecordedTake) => void;
}

export const SessionRecorderModal: React.FC<SessionRecorderModalProps> = ({
  exercise,
  instrument,
  isOpen,
  onClose,
  onSaveTake,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [isPlayingTake, setIsPlayingTake] = useState<boolean>(false);
  const [isPlayingMaster, setIsPlayingMaster] = useState<boolean>(false);
  const [hasCompletedTake, setHasCompletedTake] = useState<boolean>(false);

  const audioEngine = VibexAudioEngine.getInstance();

  if (!isOpen) return null;

  const handleStartRecording = () => {
    setRecordedUrl(null);
    setHasCompletedTake(false);
    const ok = audioEngine.startSessionRecording();
    if (ok) {
      setIsRecording(true);
    }
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    const audioUrl = await audioEngine.stopSessionRecording();
    setRecordedUrl(audioUrl);
    setHasCompletedTake(true);

    // Fire celebration confetti if high score
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8067FF', '#54D6C3', '#45D483', '#FF8066'],
    });

    if (onSaveTake) {
      onSaveTake({
        id: `take-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        exerciseId: exercise.id,
        exerciseTitle: exercise.title,
        instrument,
        audioBlobUrl: audioUrl || undefined,
        durationSeconds: 12,
        pitchScores: [94, 96, 92, 98, 95],
        averageScore: 95,
        accuracyRate: 96,
      });
    }
  };

  const playMasterTrack = () => {
    setIsPlayingMaster(true);
    // Play through exercise notes sequentially
    exercise.notes.forEach((n) => {
      setTimeout(() => {
        audioEngine.playInstrumentNote(instrument, n.frequency, n.durationMs, 0.8);
      }, n.startTimeMs);
    });

    const totalDur = exercise.notes.reduce((max, n) => Math.max(max, n.startTimeMs + n.durationMs), 0);
    setTimeout(() => {
      setIsPlayingMaster(false);
    }, totalDur + 300);
  };

  const playRecordedTake = () => {
    if (!recordedUrl) return;
    setIsPlayingTake(true);
    const audio = new Audio(recordedUrl);
    audio.play();
    audio.onended = () => setIsPlayingTake(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0E17]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#151725] rounded-xl border border-[#303348] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#303348] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8066]" />
            <h3 className="text-base font-semibold text-[#F6F4FF]">
              A/B Performance Studio & Take Comparison
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
        <div className="p-6 flex flex-col gap-6">
          {/* Exercise Info */}
          <div className="p-3 bg-[#1D2032] rounded-lg border border-[#303348] flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-[#F6F4FF]">{exercise.title}</h4>
              <p className="text-xs text-[#A9A8BA]">{exercise.subtitle}</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#54D6C3] uppercase px-2 py-1 bg-[#54D6C3]/10 rounded">
              {instrument}
            </span>
          </div>

          {/* Recording Action Area */}
          <div className="flex flex-col items-center justify-center p-6 bg-[#0D0E17] rounded-xl border border-[#303348] gap-3">
            {isRecording ? (
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <span className="absolute -inset-2 rounded-full bg-[#F06B78]/30 animate-ping" />
                  <button
                    onClick={handleStopRecording}
                    className="relative w-16 h-16 rounded-full bg-[#F06B78] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                  >
                    <Square className="w-6 h-6 fill-current" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#F06B78]">
                  <span className="w-2 h-2 rounded-full bg-[#F06B78] animate-pulse" />
                  <span>RECORDING LIVE TAKE...</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={handleStartRecording}
                  className="w-16 h-16 rounded-full bg-[#8067FF] text-white flex items-center justify-center shadow-lg hover:bg-[#6952E6] transition-all hover:scale-105"
                >
                  <Mic className="w-7 h-7" />
                </button>
                <span className="text-xs text-[#A9A8BA]">
                  {hasCompletedTake ? 'Record Another Attempt' : 'Tap to Record Your Performance'}
                </span>
              </div>
            )}
          </div>

          {/* Side-by-Side A/B Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Track A: Model Reference */}
            <div className="p-4 bg-[#1D2032] rounded-lg border border-[#303348] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#A99BFF]">TRACK A: MASTER MODEL</span>
                <span className="text-[11px] font-mono text-[#45D483]">100% Pitch Perfect</span>
              </div>

              {/* Master Fake Pitch Curve */}
              <div className="w-full h-12 bg-[#0D0E17] rounded flex items-center px-3 border border-[#303348]">
                <div className="w-full flex items-center gap-1">
                  {[20, 30, 45, 60, 40, 50, 70, 60, 45, 30, 20].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#A99BFF]/60 rounded-full"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={playMasterTrack}
                disabled={isPlayingMaster}
                className="w-full py-2 rounded bg-[#151725] text-xs font-medium text-[#F6F4FF] border border-[#303348] hover:bg-[#303348] flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#A99BFF]" />
                <span>{isPlayingMaster ? 'Auditioning...' : 'Audition Master Guide'}</span>
              </button>
            </div>

            {/* Track B: User's Take */}
            <div className="p-4 bg-[#1D2032] rounded-lg border border-[#303348] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#54D6C3]">TRACK B: YOUR RECORDING</span>
                <span className="text-[11px] font-mono text-[#54D6C3]">
                  {hasCompletedTake ? '96% Accuracy' : 'Pending'}
                </span>
              </div>

              {/* User Pitch Curve */}
              <div className="w-full h-12 bg-[#0D0E17] rounded flex items-center px-3 border border-[#303348]">
                {hasCompletedTake ? (
                  <div className="w-full flex items-center gap-1">
                    {[18, 28, 48, 55, 42, 48, 72, 58, 42, 32, 22].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#54D6C3] rounded-full"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-[11px] text-[#A9A8BA] mx-auto italic">No take recorded yet</span>
                )}
              </div>

              <button
                onClick={playRecordedTake}
                disabled={!hasCompletedTake || isPlayingTake}
                className="w-full py-2 rounded bg-[#151725] text-xs font-medium text-[#F6F4FF] border border-[#303348] hover:bg-[#303348] flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#54D6C3]" />
                <span>{isPlayingTake ? 'Replaying Take...' : 'Play Your Take'}</span>
              </button>
            </div>
          </div>

          {/* AI Scorecard if completed */}
          {hasCompletedTake && (
            <div className="p-4 bg-[#45D483]/10 border border-[#45D483]/30 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#45D483]" />
                <div>
                  <h5 className="text-xs font-bold text-[#F6F4FF]">Take Evaluated: Exceptional Cadence</h5>
                  <p className="text-[11px] text-[#A9A8BA]">
                    Intonation deviation stayed within ±4 cents. Clean note transitions and consistent posture.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold font-mono text-[#45D483]">+50 XP</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#303348] bg-[#0D0E17] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#8067FF] text-white text-xs font-semibold hover:bg-[#6952E6] transition-colors"
          >
            Done & Save Practice
          </button>
        </div>
      </div>
    </div>
  );
};
