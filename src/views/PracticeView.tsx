/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { InstrumentType, ExerciseItem, TeachingStep, PostureFeedback, PitchTrackingResult, NoteGuide, BansuriScale } from '../types/vibex';
import { CURRICULA, BANSURI_SCALES } from '../data/curriculumData';
import { VibexAudioEngine } from '../services/audioEngine';
import { SpeechCoach } from '../services/speechCoach';
import { VisionMonitor } from '../components/practice/VisionMonitor';
import { PitchVisualizer } from '../components/practice/PitchVisualizer';
import { MetronomeDrawer } from '../components/practice/MetronomeDrawer';
import { SessionRecorderModal } from '../components/practice/SessionRecorderModal';
import { PianoVisualizer } from '../components/instruments/PianoVisualizer';
import { GuitarVisualizer } from '../components/instruments/GuitarVisualizer';
import { ViolinVisualizer } from '../components/instruments/ViolinVisualizer';
import { BansuriVisualizer } from '../components/instruments/BansuriVisualizer';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Gauge,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  UserCheck,
  Disc,
  Radio,
} from 'lucide-react';

interface PracticeViewProps {
  activeInstrument: InstrumentType;
  selectedExerciseId?: string;
  onOpenTuner: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  activeInstrument,
  selectedExerciseId,
  onOpenTuner,
}) => {
  const curriculum = CURRICULA[activeInstrument];
  // Find exercise or default to first available
  const allExercises = curriculum.levels.flatMap((l) => l.exercises);
  const initialExercise =
    allExercises.find((e) => e.id === selectedExerciseId) || allExercises[0] || curriculum.levels[0].exercises[0];

  const [currentExercise, setCurrentExercise] = useState<ExerciseItem>(initialExercise);
  const [teachingStep, setTeachingStep] = useState<TeachingStep>('watch');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isPlayingLoop, setIsPlayingLoop] = useState<boolean>(false);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(0);
  const [isSpeechCoachActive, setIsSpeechCoachActive] = useState<boolean>(true);
  const [isMetronomeDrawerOpen, setIsMetronomeDrawerOpen] = useState<boolean>(false);
  const [isRecorderOpen, setIsRecorderOpen] = useState<boolean>(false);
  const [selectedBansuriScale, setSelectedBansuriScale] = useState<BansuriScale>(BANSURI_SCALES[0]);

  // Real-time evaluation state
  const [postureFeedback, setPostureFeedback] = useState<PostureFeedback>({
    postureScore: 94,
    pitchScore: 95,
    timingScore: 92,
    overallRating: 'perfect',
    message: 'Ideal anatomical alignment and fingertip curve.',
    vectorAdvice: 'Maintain relaxed shoulder level and straight spine.',
  });

  const [currentPitchResult, setCurrentPitchResult] = useState<PitchTrackingResult | null>(null);
  const audioEngine = VibexAudioEngine.getInstance();
  const loopTimerRef = useRef<number | null>(null);

  // When selectedExerciseId or activeInstrument prop changes
  useEffect(() => {
    const isCurrentInActive = allExercises.some((e) => e.id === currentExercise.id);
    if (selectedExerciseId) {
      const match = allExercises.find((e) => e.id === selectedExerciseId);
      if (match) {
        setCurrentExercise(match);
        setActiveNoteIndex(0);
        return;
      }
    }
    if (!isCurrentInActive) {
      const fallback = allExercises[0] || curriculum.levels[0].exercises[0];
      if (fallback) {
        setCurrentExercise(fallback);
        setActiveNoteIndex(0);
      }
    }
  }, [selectedExerciseId, activeInstrument]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
      audioEngine.stopPitchTracking();
      SpeechCoach.cancel();
    };
  }, []);

  const activeNote: NoteGuide | null = currentExercise.notes[activeNoteIndex] || null;

  // Step 1: Watch Mode Playback Loop
  const startTeachingLoop = (step: TeachingStep) => {
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    setTeachingStep(step);
    setIsPlayingLoop(true);
    setActiveNoteIndex(0);

    if (step === 'watch') {
      SpeechCoach.speak(`Step 1: Watch and listen to the master phrase on ${curriculum.displayName}.`, 'urgent');
      playNoteSequence(0, 1.0);
    } else if (step === 'your_turn') {
      SpeechCoach.speak('Step 2: Your Turn. Play along with dynamic tempo matching.', 'urgent');
      // In Your Turn mode, start sequence with adaptive tempo
      playNoteSequence(0, playbackSpeed);
    } else {
      SpeechCoach.speak('Step 3: AI Real-Time Feedback and Posture Analysis.', 'urgent');
    }
  };

  const stopTeachingLoop = () => {
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    setIsPlayingLoop(false);
  };

  const playNoteSequence = (index: number, speed: number) => {
    if (index >= currentExercise.notes.length) {
      // Loop finished: advance teaching step
      if (teachingStep === 'watch') {
        setTimeout(() => {
          setTeachingStep('your_turn');
          SpeechCoach.speak('Now it is your turn. Play into the microphone.', 'normal');
          playNoteSequence(0, speed);
        }, 1200);
      } else if (teachingStep === 'your_turn') {
        setTimeout(() => {
          setTeachingStep('feedback');
          SpeechCoach.speak(
            postureFeedback.overallRating === 'perfect'
              ? 'Excellent performance! Pitch accuracy 96% and ideal posture maintained.'
              : `Review feedback: ${postureFeedback.message}`,
            'urgent'
          );
        }, 1000);
      }
      return;
    }

    setActiveNoteIndex(index);
    const note = currentExercise.notes[index];
    const duration = (note.durationMs / speed);

    // Audio play (in Watch mode always play; in Your Turn play backing harmony)
    if (teachingStep === 'watch') {
      audioEngine.playInstrumentNote(activeInstrument, note.frequency, duration);
    } else if (teachingStep === 'your_turn') {
      // Light backing guide
      audioEngine.playInstrumentNote(activeInstrument, note.frequency, duration * 0.7, 0.4);
    }

    loopTimerRef.current = window.setTimeout(() => {
      playNoteSequence(index + 1, speed);
    }, duration);
  };

  // Feedback status color token lookup
  const getTeachingStepStyle = () => {
    switch (teachingStep) {
      case 'watch':
        return {
          title: 'WATCH',
          label: 'Master Reference Playback',
          color: '#A99BFF', // Soft Lavender per spec
          bg: 'rgba(169, 155, 255, 0.15)',
          border: '#A99BFF',
        };
      case 'your_turn':
        return {
          title: 'YOUR TURN',
          label: 'Live Mic & Vision Tracking Active',
          color: '#FF8066', // Coral Orange per spec
          bg: 'rgba(255, 128, 102, 0.15)',
          border: '#FF8066',
        };
      case 'feedback':
        return {
          title: 'AI FEEDBACK',
          label: 'Real-Time Posture & Pitch Evaluation',
          color: postureFeedback.overallRating === 'perfect' ? '#45D483' : '#F4BB55',
          bg: postureFeedback.overallRating === 'perfect' ? 'rgba(69, 212, 131, 0.15)' : 'rgba(244, 187, 85, 0.15)',
          border: postureFeedback.overallRating === 'perfect' ? '#45D483' : '#F4BB55',
        };
    }
  };

  const stepStyle = getTeachingStepStyle();

  return (
    <div className="w-full flex flex-col gap-6 pb-20">
      {/* Top Exercise & Teaching Loop Stepper Bar */}
      <div className="w-full bg-[#151725] rounded-xl border border-[#303348] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Exercise Metadata */}
        <div>
          <div className="flex items-center gap-2 text-xs text-[#A9A8BA] flex-wrap">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: curriculum.accentColor }}
            />
            <span className="font-semibold text-[#F6F4FF]">{curriculum.displayName}</span>
            <span aria-hidden="true">·</span>
            <span>{currentExercise.keySignature}</span>
            <span aria-hidden="true">·</span>
            <span>{currentExercise.tempoBpm} BPM</span>
            <span aria-hidden="true">·</span>
            <select
              value={currentExercise.id}
              onChange={(e) => {
                const found = allExercises.find((x) => x.id === e.target.value);
                if (found) {
                  setCurrentExercise(found);
                  setActiveNoteIndex(0);
                }
              }}
              className="bg-[#0D0E17] border border-[#303348] text-[#54D6C3] text-xs rounded px-2 py-0.5 font-medium focus:outline-none focus:border-[#8067FF] cursor-pointer"
            >
              {curriculum.levels.map((lvl) => (
                <optgroup key={lvl.levelNumber} label={`${lvl.title} (${lvl.tierName})`}>
                  {lvl.exercises.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.title} ({ex.durationMinutes}m)
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <h2 className="text-xl font-bold text-[#F6F4FF] mt-1">{currentExercise.title}</h2>
          <p className="text-xs text-[#A9A8BA] mt-0.5">{currentExercise.subtitle}</p>
        </div>

        {/* 3-Step Interactive Teaching Loop Buttons */}
        <div className="flex items-center p-1 bg-[#0D0E17] rounded-xl border border-[#303348] gap-1 self-stretch md:self-auto">
          {/* Step 1: Watch */}
          <button
            onClick={() => startTeachingLoop('watch')}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              teachingStep === 'watch'
                ? 'bg-[#A99BFF] text-[#0D0E17] shadow-[0_0_12px_rgba(169,155,255,0.4)]'
                : 'text-[#A9A8BA] hover:text-[#F6F4FF]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>1. Watch</span>
          </button>

          {/* Step 2: Your Turn */}
          <button
            onClick={() => startTeachingLoop('your_turn')}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              teachingStep === 'your_turn'
                ? 'bg-[#FF8066] text-[#0D0E17] shadow-[0_0_12px_rgba(255,128,102,0.4)]'
                : 'text-[#A9A8BA] hover:text-[#F6F4FF]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>2. Your Turn</span>
          </button>

          {/* Step 3: AI Real-Time Correction */}
          <button
            onClick={() => startTeachingLoop('feedback')}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              teachingStep === 'feedback'
                ? 'bg-[#54D6C3] text-[#0D0E17] shadow-[0_0_12px_rgba(84,214,195,0.4)]'
                : 'text-[#A9A8BA] hover:text-[#F6F4FF]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3. Feedback</span>
          </button>
        </div>
      </div>

      {/* Main Split Viewport (Dynamic Instrument Tab Renderer + Live AI Vision Monitor) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Dynamic Instrument Visualizer & Tab Notation */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Active Teaching State Notification Banner */}
          <div
            className="p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition-colors"
            style={{
              backgroundColor: stepStyle.bg,
              borderColor: stepStyle.border,
              color: '#F6F4FF',
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="font-bold font-mono px-2 py-0.5 rounded text-[11px] uppercase tracking-wider"
                style={{ backgroundColor: stepStyle.color, color: '#0D0E17' }}
              >
                {stepStyle.title}
              </span>
              <span className="font-medium">{stepStyle.label}</span>
            </div>

            {/* Pitch Lock Speed Controller (0.5x, 0.75x, 1.0x, 1.25x) */}
            <div className="flex items-center gap-1 bg-[#151725]/80 p-0.5 rounded-lg border border-[#303348]">
              {[0.5, 0.75, 1.0, 1.25].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 text-[10px] font-mono font-medium rounded transition-colors ${
                    playbackSpeed === spd
                      ? 'bg-[#8067FF] text-[#F6F4FF]'
                      : 'text-[#A9A8BA] hover:text-[#F6F4FF]'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Instrument Visualizer Component */}
          {activeInstrument === 'piano' && (
            <PianoVisualizer activeNote={activeNote} />
          )}

          {activeInstrument === 'guitar' && (
            <GuitarVisualizer activeNote={activeNote} />
          )}

          {activeInstrument === 'violin' && (
            <ViolinVisualizer activeNote={activeNote} />
          )}

          {activeInstrument === 'bansuri' && (
            <BansuriVisualizer
              activeNote={activeNote}
              activeScale={selectedBansuriScale}
            />
          )}

          {/* Dynamic Auto-Scrolling Sheet Music & Tab Ribbon */}
          <div className="w-full bg-[#151725] rounded-xl border border-[#303348] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#F6F4FF]">
                SYNCHRONIZED TAB & NOTE NOTATION
              </span>
              <span className="text-[11px] font-mono text-[#A9A8BA]">
                Note {activeNoteIndex + 1} of {currentExercise.notes.length}
              </span>
            </div>

            {/* Note Sequence Flow */}
            <div className="flex items-center gap-2 overflow-x-auto py-2">
              {currentExercise.notes.map((n, idx) => {
                const isActive = activeNoteIndex === idx;
                return (
                  <button
                    key={n.id}
                    onClick={() => {
                      setActiveNoteIndex(idx);
                      audioEngine.playInstrumentNote(activeInstrument, n.frequency, 800);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border min-w-[70px] transition-all ${
                      isActive
                        ? 'bg-[#8067FF]/20 border-[#8067FF] shadow-[0_0_12px_rgba(128,103,255,0.4)] scale-105'
                        : 'bg-[#0D0E17] border-[#303348] text-[#A9A8BA] hover:border-[#8067FF]/50'
                    }`}
                  >
                    <span
                      className={`text-sm font-bold font-mono ${
                        isActive ? 'text-[#F6F4FF]' : 'text-[#A9A8BA]'
                      }`}
                    >
                      {n.swara || n.name}
                    </span>
                    <span className="text-[10px] text-[#A9A8BA] mt-0.5">
                      {n.fret !== undefined ? `Fret ${n.fret}` : `${Math.round(n.frequency)}Hz`}
                    </span>
                    {n.finger !== undefined && (
                      <span className="text-[9px] font-mono text-[#54D6C3]">
                        F-{n.finger}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Transport & Auxiliary Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-[#303348]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isPlayingLoop) {
                      stopTeachingLoop();
                    } else {
                      startTeachingLoop(teachingStep);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
                    isPlayingLoop
                      ? 'bg-[#F06B78] text-white hover:bg-[#D95361]'
                      : 'bg-[#8067FF] text-white hover:bg-[#6952E6]'
                  }`}
                >
                  {isPlayingLoop ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlayingLoop ? 'Pause Loop' : 'Play Phrase'}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveNoteIndex(0);
                    startTeachingLoop(teachingStep);
                  }}
                  className="p-2 rounded-lg bg-[#1D2032] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] transition-colors"
                  title="Restart Phrase"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Voice Speech Coach Toggle */}
                <button
                  onClick={() => {
                    const next = !isSpeechCoachActive;
                    setIsSpeechCoachActive(next);
                    SpeechCoach.setEnabled(next);
                  }}
                  className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                    isSpeechCoachActive
                      ? 'bg-[#45D483]/10 border-[#45D483]/30 text-[#45D483]'
                      : 'bg-[#1D2032] border-[#303348] text-[#A9A8BA]'
                  }`}
                  title={isSpeechCoachActive ? 'Voice Coach On' : 'Voice Coach Muted'}
                >
                  {isSpeechCoachActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="hidden sm:inline">Voice Coach</span>
                </button>

                {/* Metronome Drawer Toggle */}
                <button
                  onClick={() => setIsMetronomeDrawerOpen(!isMetronomeDrawerOpen)}
                  className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    isMetronomeDrawerOpen
                      ? 'bg-[#8067FF] text-white border-[#8067FF]'
                      : 'bg-[#1D2032] border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF]'
                  }`}
                >
                  <Gauge className="w-3.5 h-3.5" />
                  <span>Pulse Studio</span>
                </button>

                {/* Record Take Button */}
                <button
                  onClick={() => setIsRecorderOpen(true)}
                  className="px-3 py-2 rounded-lg bg-[#FF8066] hover:bg-[#E56E55] text-[#0D0E17] text-xs font-bold flex items-center gap-1.5 shadow transition-colors"
                >
                  <Radio className="w-3.5 h-3.5 fill-current" />
                  <span>Record Take</span>
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible Metronome & Drone Studio Drawer */}
          {isMetronomeDrawerOpen && (
            <MetronomeDrawer />
          )}
        </div>

        {/* Right Column (5 cols): AI Vision Monitor & Sub-Cent Pitch Tracker */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Vision Monitor */}
          <VisionMonitor
            instrument={activeInstrument}
            isActive={true}
            onFeedbackUpdate={(fb) => setPostureFeedback(fb)}
          />

          {/* Sub-Cent Pitch Visualizer */}
          <PitchVisualizer
            targetNote={activeNote}
            isActive={true}
            onPitchResult={(res) => setCurrentPitchResult(res)}
          />

          {/* AI Real-Time Correction Box */}
          <div className="p-4 bg-[#151725] rounded-xl border border-[#303348] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F6F4FF] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#54D6C3]" />
                <span>AI MULTIMODAL CORRECTIVE GUIDANCE</span>
              </span>
              <span className="font-mono text-xs text-[#54D6C3] font-bold">
                {postureFeedback.postureScore}% Score
              </span>
            </div>

            <p className="text-xs text-[#F6F4FF] font-medium leading-relaxed">
              {postureFeedback.message}
            </p>

            <div className="p-2.5 rounded bg-[#0D0E17] border border-[#303348] text-xs text-[#A9A8BA]">
              <span className="text-[#A99BFF] font-semibold">Vector Adjustment: </span>
              <span>{postureFeedback.vectorAdvice}</span>
            </div>

            {/* Posture Guidance Specs */}
            <div className="pt-2 border-t border-[#303348] flex flex-col gap-1.5 text-xs text-[#A9A8BA]">
              <span className="font-semibold text-[#F6F4FF]">Ergonomic Checklist:</span>
              <ul className="list-disc pl-4 space-y-1">
                {currentExercise.postureGuidance.commonMistakes.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Session Recorder & A/B Studio Modal */}
      <SessionRecorderModal
        exercise={currentExercise}
        instrument={activeInstrument}
        isOpen={isRecorderOpen}
        onClose={() => setIsRecorderOpen(false)}
      />
    </div>
  );
};
