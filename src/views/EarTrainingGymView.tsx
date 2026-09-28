/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EAR_TRAINING_QUESTIONS } from '../data/curriculumData';
import { VibexAudioEngine } from '../services/audioEngine';
import { EarTrainingQuestion } from '../types/vibex';
import { Ear, Play, Volume2, CheckCircle2, XCircle, RotateCcw, Award, Flame, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EarTrainingGymViewProps {
  onAddXp?: (xp: number) => void;
}

export const EarTrainingGymView: React.FC<EarTrainingGymViewProps> = ({ onAddXp }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(120); // 2-minute workout
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isGymCompleted, setIsGymCompleted] = useState<boolean>(false);

  const audioEngine = VibexAudioEngine.getInstance();
  const currentQuestion: EarTrainingQuestion = EAR_TRAINING_QUESTIONS[currentIdx % EAR_TRAINING_QUESTIONS.length];

  // 2-minute countdown timer
  useEffect(() => {
    let interval: number | null = null;
    if (isTimerRunning && timerSeconds > 0 && !isGymCompleted) {
      interval = window.setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsGymCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, isGymCompleted]);

  const playMysteryAudio = () => {
    if (currentQuestion.category === 'chord') {
      audioEngine.playChord(currentQuestion.targetFrequencies, 1400);
    } else {
      currentQuestion.targetFrequencies.forEach((freq, idx) => {
        setTimeout(() => {
          audioEngine.playInstrumentNote('piano', freq, 1000);
        }, idx * 600);
      });
    }
  };

  // Play audio automatically when question loads
  useEffect(() => {
    setSelectedOption(null);
    setHasAnswered(false);
    playMysteryAudio();
  }, [currentIdx]);

  const handleSelectOption = (idx: number, isCorrect: boolean) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (isCorrect) {
      setScore((s) => s + 100);
      if (onAddXp) onAddXp(50);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#54D6C3', '#45D483', '#8067FF'],
      });
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 >= EAR_TRAINING_QUESTIONS.length) {
      setIsGymCompleted(true);
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.5 },
      });
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleRestartGym = () => {
    setCurrentIdx(0);
    setScore(0);
    setTimerSeconds(120);
    setIsGymCompleted(false);
    setIsTimerRunning(true);
  };

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#303348] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#A9A8BA]">
            <Ear className="w-4 h-4 text-[#8067FF]" />
            <span className="font-semibold text-[#F6F4FF]">2-Minute Daily Ear Gym</span>
            <span aria-hidden="true">·</span>
            <span>Micro-Interval & Swara Conditioning</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#F6F4FF] mt-1 tracking-tight">
            Acoustic Ear Identification
          </h1>
        </div>

        {/* Timer & Score Pill */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-[#151725] border border-[#303348] flex items-center gap-2 text-xs">
            <Clock className="w-4 h-4 text-[#FF8066]" />
            <span className="text-[#A9A8BA]">Workout:</span>
            <span className="font-mono font-bold text-[#F6F4FF]">{formattedTime}</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-[#151725] border border-[#303348] flex items-center gap-2 text-xs">
            <Flame className="w-4 h-4 text-[#54D6C3]" />
            <span className="text-[#A9A8BA]">Score:</span>
            <span className="font-mono font-bold text-[#54D6C3]">{score} XP</span>
          </div>
        </div>
      </div>

      {!isGymCompleted ? (
        <div className="w-full bg-[#151725] rounded-xl border border-[#303348] p-6 sm:p-8 flex flex-col gap-6 shadow-xl">
          {/* Question Category & Progress */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono uppercase font-bold text-[#8067FF] px-2.5 py-1 rounded bg-[#8067FF]/15 border border-[#8067FF]/30">
              {currentQuestion.category.toUpperCase()} CHALLENGE
            </span>
            <span className="text-[#A9A8BA] font-mono">
              Question {currentIdx + 1} of {EAR_TRAINING_QUESTIONS.length}
            </span>
          </div>

          {/* Question Prompt */}
          <h2 className="text-lg font-bold text-[#F6F4FF]">{currentQuestion.prompt}</h2>

          {/* Mystery Audio Audition Button */}
          <div className="flex items-center justify-center p-6 bg-[#0D0E17] rounded-xl border border-[#303348]">
            <button
              onClick={playMysteryAudio}
              className="px-6 py-3.5 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white font-semibold text-sm flex items-center gap-2.5 shadow-lg shadow-[#8067FF]/20 transition-all hover:scale-105 active:scale-95"
            >
              <Volume2 className="w-5 h-5" />
              <span>Audition Mystery Tone</span>
            </button>
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const showResult = hasAnswered;

              let buttonStyle = 'bg-[#1D2032] border-[#303348] text-[#F6F4FF] hover:border-[#8067FF]';
              if (showResult) {
                if (opt.isCorrect) {
                  buttonStyle = 'bg-[#45D483]/15 border-[#45D483] text-[#45D483]';
                } else if (isSelected && !opt.isCorrect) {
                  buttonStyle = 'bg-[#F06B78]/15 border-[#F06B78] text-[#F06B78]';
                } else {
                  buttonStyle = 'bg-[#0D0E17] border-[#303348] text-[#A9A8BA] opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx, opt.isCorrect)}
                  className={`p-4 rounded-xl border text-left font-medium text-xs sm:text-sm flex items-center justify-between transition-all ${buttonStyle}`}
                >
                  <span>{opt.label}</span>
                  {showResult && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-[#45D483] shrink-0" />
                  )}
                  {showResult && isSelected && !opt.isCorrect && (
                    <XCircle className="w-4 h-4 text-[#F06B78] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {hasAnswered && (
            <div className="p-4 bg-[#0D0E17] rounded-lg border border-[#303348] flex flex-col gap-2">
              <span className="text-xs font-bold text-[#54D6C3]">Acoustic Analysis:</span>
              <p className="text-xs text-[#A9A8BA] leading-relaxed">
                {currentQuestion.explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-lg bg-[#8067FF] hover:bg-[#6952E6] text-white text-xs font-semibold transition-colors"
                >
                  {currentIdx + 1 >= EAR_TRAINING_QUESTIONS.length ? 'Finish Workout' : 'Next Question →'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Completed Summary */
        <div className="w-full bg-[#151725] rounded-xl border border-[#303348] p-8 flex flex-col items-center justify-center text-center gap-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#54D6C3]/15 text-[#54D6C3] border border-[#54D6C3]/40 flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#F6F4FF]">Workout Completed!</h2>
            <p className="text-xs text-[#A9A8BA] mt-1 max-w-md">
              You exercised your pitch discrimination and Swara identification neural pathways.
            </p>
          </div>

          <div className="flex items-center gap-6 p-4 bg-[#0D0E17] rounded-xl border border-[#303348]">
            <div className="flex flex-col">
              <span className="text-xs text-[#A9A8BA]">Final Score</span>
              <span className="text-2xl font-bold font-mono text-[#54D6C3] mt-1">
                {score} XP
              </span>
            </div>
            <div className="w-px h-10 bg-[#303348]" />
            <div className="flex flex-col">
              <span className="text-xs text-[#A9A8BA]">Intonation Precision</span>
              <span className="text-2xl font-bold font-mono text-[#45D483] mt-1">
                98%
              </span>
            </div>
          </div>

          <button
            onClick={handleRestartGym}
            className="px-6 py-3 rounded-xl bg-[#8067FF] hover:bg-[#6952E6] text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Another 2-Minute Session</span>
          </button>
        </div>
      )}
    </div>
  );
};
