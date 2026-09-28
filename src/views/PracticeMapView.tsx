/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  InstrumentType,
  PracticeNode,
  LessonTutorial,
  EarTrainingQuestion,
} from '../types/vibex';
import {
  CURRICULA,
  PRACTICE_NODES_MAP,
  LESSON_TUTORIALS,
  EAR_TRAINING_QUESTIONS,
} from '../data/curriculumData';
import { EarTrainingGymView } from './EarTrainingGymView';
import {
  Lock,
  Play,
  CheckCircle2,
  Star,
  Award,
  Crown,
  Ear,
  Sparkles,
  BookOpen,
  ArrowRight,
  X,
  Clock,
  Flame,
  ShieldCheck,
  ChevronRight,
  Compass,
} from 'lucide-react';

interface PracticeMapViewProps {
  activeInstrument: InstrumentType;
  onSelectExercise: (exerciseId: string) => void;
  onOpenTuner?: () => void;
  streakCount: number;
}

export const PracticeMapView: React.FC<PracticeMapViewProps> = ({
  activeInstrument,
  onSelectExercise,
  onOpenTuner,
  streakCount,
}) => {
  const curriculum = CURRICULA[activeInstrument];
  const nodes: PracticeNode[] = PRACTICE_NODES_MAP[activeInstrument] || [];

  // Modal / Drawer state for active node inspection
  const [selectedNode, setSelectedNode] = useState<PracticeNode | null>(null);
  const [modalMode, setModalMode] = useState<'watch' | 'your_turn'>('watch');
  const [activeEarGymQuestion, setActiveEarGymQuestion] = useState<EarTrainingQuestion | null>(null);
  const [isEarGymOpen, setIsEarGymOpen] = useState<boolean>(false);

  // Filter or group by level
  const levels = [1, 2, 3, 4, 5];
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | 'all'>('all');

  const filteredNodes =
    selectedLevelFilter === 'all'
      ? nodes
      : nodes.filter((n) => n.levelNumber === selectedLevelFilter);

  const activeNode = nodes.find((n) => n.status === 'active') || nodes[0];

  const handleNodeClick = (node: PracticeNode) => {
    if (node.type === 'ear_gym') {
      const q =
        EAR_TRAINING_QUESTIONS.find((item) => item.id === node.earGymQuestionId) ||
        EAR_TRAINING_QUESTIONS[0];
      setActiveEarGymQuestion(q);
      setIsEarGymOpen(true);
      return;
    }

    setSelectedNode(node);
    setModalMode(node.type === 'tutorial' ? 'watch' : 'your_turn');
  };

  const activeTutorial: LessonTutorial | undefined = selectedNode?.tutorialId
    ? LESSON_TUTORIALS[selectedNode.tutorialId]
    : undefined;

  return (
    <div className="w-full flex flex-col gap-8 pb-20">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#303348] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#A9A8BA]">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: curriculum.accentColor }}
            />
            <span className="font-semibold text-[#F6F4FF]">{curriculum.displayName}</span>
            <span aria-hidden="true">·</span>
            <span>Gamified Practice Road</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F6F4FF] mt-1 tracking-tight">
            Practice Map & Skill Progression
          </h1>
          <p className="text-xs text-[#A9A8BA] mt-1 max-w-2xl">
            Step along the winding progression trail. Complete tutorial lessons (Watch), master targeted skills (Your Turn), crush 2-minute Ear Gym challenges, and defeat Level Bosses!
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto">
          {/* Level Filter Chips */}
          <div className="flex items-center p-1 bg-[#151725] rounded-xl border border-[#303348] text-xs">
            <button
              onClick={() => setSelectedLevelFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedLevelFilter === 'all'
                  ? 'bg-[#8067FF] text-[#F6F4FF]'
                  : 'text-[#A9A8BA] hover:text-[#F6F4FF]'
              }`}
            >
              All Levels
            </button>
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedLevelFilter === lvl
                    ? 'bg-[#8067FF] text-[#F6F4FF]'
                    : 'text-[#A9A8BA] hover:text-[#F6F4FF]'
                }`}
              >
                Lvl {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Target Lesson Banner */}
      {activeNode && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E1B4B]/80 via-[#151725] to-[#151725] border border-[#8067FF]/50 p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#8067FF]/20 border border-[#8067FF] flex items-center justify-center animate-pulse">
              <Play className="w-6 h-6 text-[#8067FF] fill-[#8067FF]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8067FF]/30 text-[#8067FF] uppercase tracking-wider">
                  Current Target
                </span>
                <span className="text-xs text-[#A9A8BA]">
                  Level {activeNode.levelNumber} · {activeNode.moduleTitle}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#F6F4FF] mt-0.5">
                {activeNode.title}
              </h3>
              <p className="text-xs text-[#A9A8BA]">{activeNode.subtitle}</p>
            </div>
          </div>

          <button
            onClick={() => handleNodeClick(activeNode)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#8067FF] hover:bg-[#6c51ff] text-[#F6F4FF] font-semibold text-xs transition-all shadow-md hover:shadow-[#8067FF]/25 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Play Target Node</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Candy Crush Style Winding Trail Canvas */}
      <div className="relative w-full max-w-3xl mx-auto py-8 flex flex-col items-center">
        {/* Background Sinuous Path line */}
        <div className="absolute top-8 bottom-8 w-1 bg-gradient-to-b from-[#45D483]/50 via-[#8067FF]/40 to-[#303348] rounded-full pointer-events-none" />

        {/* Trail Nodes */}
        <div className="w-full flex flex-col gap-12 sm:gap-16 z-10">
          {levels.map((lvl) => {
            const levelNodes = filteredNodes.filter((n) => n.levelNumber === lvl);
            if (levelNodes.length === 0) return null;

            return (
              <div key={lvl} className="w-full flex flex-col items-center gap-8">
                {/* Level Tier Landmark Banner */}
                <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#151725] border border-[#303348] text-xs shadow-md">
                  <Crown className="w-4 h-4 text-[#FF8066]" />
                  <span className="font-bold text-[#F6F4FF]">Level {lvl}</span>
                  <span className="text-[#A9A8BA]">
                    {lvl === 1
                      ? 'Absolute Beginner'
                      : lvl === 2
                      ? 'Early Intermediate'
                      : lvl === 3
                      ? 'Intermediate'
                      : lvl === 4
                      ? 'Advanced'
                      : 'Professional'}
                  </span>
                </div>

                {/* Nodes inside this level */}
                <div className="w-full flex flex-col gap-12 sm:gap-14">
                  {levelNodes.map((node) => {
                    const isLocked = node.status === 'locked';
                    const isActive = node.status === 'active';
                    const isCompleted = node.status === 'completed';
                    const isBoss = node.type === 'boss';
                    const isEarGym = node.type === 'ear_gym';
                    const isTutorial = node.type === 'tutorial';

                    // Calculate serpentine horizontal translation
                    const offsetClass =
                      node.pathOffset && node.pathOffset < -0.3
                        ? '-translate-x-16 sm:-translate-x-32'
                        : node.pathOffset && node.pathOffset > 0.3
                        ? 'translate-x-16 sm:translate-x-32'
                        : 'translate-x-0';

                    return (
                      <div
                        key={node.id}
                        className={`flex flex-col items-center justify-center transition-transform duration-300 ${offsetClass}`}
                      >
                        {/* Node Token */}
                        <div className="relative group">
                          {/* Pulsing Aura for Active Node */}
                          {isActive && (
                            <div className="absolute -inset-2 rounded-full bg-[#8067FF]/30 blur-md animate-pulse" />
                          )}

                          {/* Boss Aura */}
                          {isBoss && (
                            <div className="absolute -inset-2 rounded-full bg-[#FF8066]/20 blur-md" />
                          )}

                          <button
                            onClick={() => handleNodeClick(node)}
                            disabled={isLocked}
                            className={`relative flex items-center justify-center transition-all duration-200 ${
                              isBoss
                                ? 'w-20 h-20 rounded-2xl rotate-45 border-2 shadow-xl'
                                : 'w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 shadow-lg'
                            } ${
                              isLocked
                                ? 'bg-[#151725] border-[#303348] text-[#A9A8BA] cursor-not-allowed opacity-70'
                                : isActive
                                ? 'bg-[#1D2032] border-[#8067FF] text-[#8067FF] scale-110 shadow-[#8067FF]/40 cursor-pointer hover:scale-115'
                                : isBoss
                                ? 'bg-[#2A1820] border-[#FF8066] text-[#FF8066] cursor-pointer hover:scale-110'
                                : isEarGym
                                ? 'bg-[#122424] border-[#54D6C3] text-[#54D6C3] cursor-pointer hover:scale-110'
                                : 'bg-[#12241C] border-[#45D483] text-[#45D483] cursor-pointer hover:scale-110'
                            }`}
                          >
                            <div className={isBoss ? '-rotate-45 flex items-center justify-center' : ''}>
                              {isLocked ? (
                                <Lock className="w-6 h-6 text-[#A9A8BA]" />
                              ) : isActive ? (
                                <Play className="w-7 h-7 text-[#8067FF] fill-[#8067FF]" />
                              ) : isBoss ? (
                                <Crown className="w-8 h-8 text-[#FF8066] fill-[#FF8066]/20" />
                              ) : isEarGym ? (
                                <Ear className="w-7 h-7 text-[#54D6C3]" />
                              ) : (
                                <CheckCircle2 className="w-7 h-7 text-[#45D483]" />
                              )}
                            </div>
                          </button>

                          {/* Node Step Tag / Stars */}
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-0.5 whitespace-nowrap">
                            {isCompleted && node.stars && (
                              <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#151725] border border-[#45D483]/40 shadow-sm">
                                {[1, 2, 3].map((starIdx) => (
                                  <Star
                                    key={starIdx}
                                    className={`w-3 h-3 ${
                                      starIdx <= node.stars!
                                        ? 'text-[#45D483] fill-[#45D483]'
                                        : 'text-[#303348]'
                                    }`}
                                  />
                                ))}
                              </div>
                            )}

                            {isActive && (
                              <span className="px-2 py-0.5 rounded-full bg-[#8067FF] text-[#F6F4FF] text-[10px] font-bold shadow-md animate-bounce">
                                GO!
                              </span>
                            )}

                            {isBoss && isLocked && (
                              <span className="px-2 py-0.5 rounded-full bg-[#FF8066]/20 border border-[#FF8066]/40 text-[#FF8066] text-[10px] font-bold">
                                BOSS
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title Caption */}
                        <div className="mt-8 text-center max-w-[200px] flex flex-col items-center">
                          <span className="text-[11px] font-semibold text-[#F6F4FF] leading-tight line-clamp-2">
                            {node.title}
                          </span>
                          <span className="text-[10px] text-[#A9A8BA] mt-0.5">
                            {isTutorial
                              ? 'Lesson Tutorial'
                              : isEarGym
                              ? 'Ear Gym Drill'
                              : isBoss
                              ? 'Boss Battle'
                              : 'Skill Practice'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Interactive Modal (Watch Tutorial vs Your Turn Practice) */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#151725] border border-[#303348] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#303348] bg-[#0D0E17]">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    selectedNode.type === 'boss'
                      ? 'bg-[#FF8066]/20 border-[#FF8066] text-[#FF8066]'
                      : selectedNode.type === 'ear_gym'
                      ? 'bg-[#54D6C3]/20 border-[#54D6C3] text-[#54D6C3]'
                      : 'bg-[#8067FF]/20 border-[#8067FF] text-[#8067FF]'
                  }`}
                >
                  {selectedNode.type === 'boss' ? (
                    <Crown className="w-5 h-5" />
                  ) : selectedNode.type === 'ear_gym' ? (
                    <Ear className="w-5 h-5" />
                  ) : (
                    <BookOpen className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#A9A8BA] uppercase tracking-wider">
                    {selectedNode.moduleTitle}
                  </span>
                  <h2 className="text-lg font-bold text-[#F6F4FF] leading-snug">
                    {selectedNode.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="p-1.5 rounded-lg text-[#A9A8BA] hover:text-[#F6F4FF] hover:bg-[#1D2032] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex border-b border-[#303348] bg-[#151725] px-5 pt-3">
              <button
                onClick={() => setModalMode('watch')}
                className={`flex items-center gap-2 pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  modalMode === 'watch'
                    ? 'border-[#8067FF] text-[#F6F4FF]'
                    : 'border-transparent text-[#A9A8BA] hover:text-[#F6F4FF]'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#8067FF]" />
                <span>1. Watch Tutorial (Lesson)</span>
              </button>
              <button
                onClick={() => setModalMode('your_turn')}
                className={`flex items-center gap-2 pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  modalMode === 'your_turn'
                    ? 'border-[#45D483] text-[#F6F4FF]'
                    : 'border-transparent text-[#A9A8BA] hover:text-[#F6F4FF]'
                }`}
              >
                <Play className="w-4 h-4 text-[#45D483]" />
                <span>2. Your Turn (Practice Session)</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-5 text-sm text-[#F6F4FF]">
              {modalMode === 'watch' ? (
                // Watch Mode Content
                <div className="flex flex-col gap-4">
                  {activeTutorial ? (
                    <>
                      <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] flex flex-col gap-2">
                        <span className="text-xs font-bold text-[#8067FF] uppercase">
                          Tutorial Overview
                        </span>
                        <p className="text-xs sm:text-sm text-[#F6F4FF] leading-relaxed">
                          {activeTutorial.summary}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-[#A9A8BA] uppercase tracking-wider">
                          Key Takeaways & Technique Mechanics
                        </span>
                        <ul className="flex flex-col gap-2">
                          {activeTutorial.keyTakeaways.map((tip, idx) => (
                            <li
                              key={idx}
                              className="text-xs sm:text-sm text-[#A9A8BA] flex items-start gap-2.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8067FF] mt-1.5 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {activeTutorial.postureTips && activeTutorial.postureTips.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-[#1D2032] border border-[#8067FF]/30 flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#8067FF]">
                            <ShieldCheck className="w-4 h-4" />
                            <span>AI Vision Posture Rules</span>
                          </div>
                          {activeTutorial.postureTips.map((p, idx) => (
                            <p key={idx} className="text-xs text-[#F6F4FF]">
                              • {p}
                            </p>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#303348] text-xs text-[#A9A8BA]">
                      <p className="text-sm font-semibold text-[#F6F4FF] mb-1">
                        {selectedNode.title}
                      </p>
                      <p>{selectedNode.subtitle}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-[#303348] mt-2">
                    <span className="text-xs text-[#A9A8BA] flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{selectedNode.durationMinutes} min lesson</span>
                    </span>

                    <button
                      onClick={() => setModalMode('your_turn')}
                      className="px-4 py-2 rounded-xl bg-[#8067FF] hover:bg-[#6c51ff] text-[#F6F4FF] text-xs font-semibold transition-colors flex items-center gap-2"
                    >
                      <span>Proceed to Your Turn</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                // Your Turn Mode Content
                <div className="flex flex-col gap-4">
                  <div className="p-4 rounded-xl bg-[#0D0E17] border border-[#45D483]/30 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#45D483] uppercase flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>Interactive Performance Stage</span>
                      </span>
                      <span className="text-xs font-bold text-[#FF8066]">
                        +{selectedNode.xpReward} XP
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#F6F4FF]">
                      Test your accuracy with the real-time YIN/MPM pitch detection engine and live camera posture evaluator.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#0D0E17] border border-[#303348] flex flex-col gap-1">
                      <span className="text-[#A9A8BA]">Pitch Engine</span>
                      <span className="font-semibold text-[#54D6C3]">Dual YIN / MPM</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0D0E17] border border-[#303348] flex flex-col gap-1">
                      <span className="text-[#A9A8BA]">Vision AI</span>
                      <span className="font-semibold text-[#8067FF]">Ergonomic Landmarks</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#303348] mt-2">
                    <button
                      onClick={() => setModalMode('watch')}
                      className="text-xs text-[#A9A8BA] hover:text-[#F6F4FF] transition-colors"
                    >
                      ← Back to Tutorial
                    </button>

                    <button
                      onClick={() => {
                        const exId = selectedNode.exerciseId || 'guitar-l1-ex1';
                        setSelectedNode(null);
                        onSelectExercise(exId);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#45D483] hover:bg-[#3bc275] text-[#0D0E17] font-extrabold text-xs transition-all shadow-lg hover:shadow-[#45D483]/20 flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Start Practice Room</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Integrated Ear Gym Micro-Workout Modal */}
      {isEarGymOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#151725] border border-[#54D6C3]/40 shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#303348]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#54D6C3]/20 border border-[#54D6C3] flex items-center justify-center text-[#54D6C3]">
                  <Ear className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F6F4FF]">
                    2-Minute Ear Gym Quickfire
                  </h3>
                  <span className="text-[11px] text-[#A9A8BA]">
                    Integrated auditory skill challenge
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsEarGymOpen(false)}
                className="p-1 rounded-lg text-[#A9A8BA] hover:text-[#F6F4FF] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-4">
              <EarTrainingGymView
                onAddXp={() => {}}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
