/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { HomeView } from './views/HomeView';
import { LearnView } from './views/LearnView';
import { PracticeView } from './views/PracticeView';
import { SongsView } from './views/SongsView';
import { ProfileView } from './views/ProfileView';
import { FullScreenLessonView } from './components/lessons/FullScreenLessonView';
import { GuitarLesson } from './types/guitarLessons';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [streakCount, setStreakCount] = useState<number>(7);
  const [activeFullScreenLesson, setActiveFullScreenLesson] = useState<GuitarLesson | null>(null);

  return (
    <div className="min-h-screen bg-[#0D0E17] text-[#F6F4FF] flex flex-col antialiased selection:bg-[#FF8066]/30">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        streakCount={streakCount}
      />

      {/* Main Responsive Canvas Viewport */}
      <main className="flex-1 flex justify-center w-full px-4 sm:px-6 py-6 overflow-x-hidden">
        <div className="w-full max-w-7xl">
          {currentTab === 'home' && (
            <HomeView
              onNavigateToLearn={() => setCurrentTab('learn')}
              onNavigateToPractice={() => setCurrentTab('practice')}
              onNavigateToSongs={() => setCurrentTab('songs')}
              onStartLesson={(lesson) => setActiveFullScreenLesson(lesson)}
              streakCount={streakCount}
            />
          )}

          {currentTab === 'learn' && (
            <LearnView onNavigateToPractice={() => setCurrentTab('practice')} />
          )}

          {currentTab === 'practice' && (
            <PracticeView
              onNavigateToLearn={() => setCurrentTab('learn')}
              onNavigateToSongs={() => setCurrentTab('songs')}
            />
          )}

          {currentTab === 'songs' && <SongsView />}

          {currentTab === 'profile' && <ProfileView streakCount={streakCount} />}
        </div>
      </main>

      {/* Full-Screen Lesson View (When opened from Home or Learn) */}
      {activeFullScreenLesson && (
        <FullScreenLessonView
          lesson={activeFullScreenLesson}
          onClose={() => setActiveFullScreenLesson(null)}
          onLessonCompleted={(lessonId) => {
            setActiveFullScreenLesson(null);
          }}
          onNavigateToPractice={(skill) => {
            setActiveFullScreenLesson(null);
            setCurrentTab('practice');
          }}
          onNavigateToLearn={() => {
            setActiveFullScreenLesson(null);
            setCurrentTab('learn');
          }}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <div className="block md:hidden">
        <BottomNav
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
        />
      </div>
    </div>
  );
}
