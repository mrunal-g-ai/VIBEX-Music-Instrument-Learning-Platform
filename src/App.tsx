/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InstrumentType, BansuriScale } from './types/vibex';
import { BANSURI_SCALES } from './data/curriculumData';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { DashboardView } from './views/DashboardView';
import { CurriculumMapView } from './views/CurriculumMapView';
import { PracticeView } from './views/PracticeView';
import { EarTrainingGymView } from './views/EarTrainingGymView';
import { BansuriTunerModal } from './components/tuner/BansuriTunerModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [activeInstrument, setActiveInstrument] = useState<InstrumentType>('piano');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | undefined>(undefined);
  const [isTunerModalOpen, setIsTunerModalOpen] = useState<boolean>(false);
  const [activeBansuriScale, setActiveBansuriScale] = useState<BansuriScale>(BANSURI_SCALES[0]);
  const [streakCount, setStreakCount] = useState<number>(7);

  const handleStartPractice = (exerciseId?: string) => {
    setSelectedExerciseId(exerciseId);
    setCurrentTab('practice');
  };

  const handleSelectTab = (tab: string) => {
    if (tab === 'tuner') {
      setIsTunerModalOpen(true);
    } else {
      setCurrentTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0E17] text-[#F6F4FF] flex flex-col antialiased selection:bg-[#8067FF]/30">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        activeInstrument={activeInstrument}
        onSelectInstrument={setActiveInstrument}
        streakCount={streakCount}
      />

      {/* Main Responsive Canvas Viewport */}
      <main className="flex-1 flex justify-center w-full px-4 sm:px-6 py-6 overflow-x-hidden">
        <div className="w-full max-w-7xl">
          {currentTab === 'dashboard' && (
            <DashboardView
              activeInstrument={activeInstrument}
              onSelectInstrument={setActiveInstrument}
              onStartPractice={handleStartPractice}
              onOpenCurriculum={() => setCurrentTab('curriculum')}
              streakCount={streakCount}
            />
          )}

          {currentTab === 'curriculum' && (
            <CurriculumMapView
              activeInstrument={activeInstrument}
              onSelectExercise={(exId) => handleStartPractice(exId)}
            />
          )}

          {currentTab === 'practice' && (
            <PracticeView
              activeInstrument={activeInstrument}
              selectedExerciseId={selectedExerciseId}
              onOpenTuner={() => setIsTunerModalOpen(true)}
            />
          )}

          {currentTab === 'ear-gym' && (
            <EarTrainingGymView
              onAddXp={(xp) => setStreakCount((prev) => prev)}
            />
          )}
        </div>
      </main>

      {/* Dedicated Flute Scale Tuner & Calibration Modal */}
      <BansuriTunerModal
        isOpen={isTunerModalOpen}
        onClose={() => setIsTunerModalOpen(false)}
        selectedScale={activeBansuriScale}
        onSelectScale={(scale) => setActiveBansuriScale(scale)}
      />

      {/* Mobile Bottom Navigation (Shown natively on small screens < md) */}
      <div className="block md:hidden">
        <BottomNav
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
        />
      </div>
    </div>
  );
}
