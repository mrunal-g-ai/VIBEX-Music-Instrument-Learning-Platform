/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GUITAR_SONG_LIBRARY } from '../data/guitarStructuredCurriculum';
import { GuitarSongItem } from '../types/guitarLessons';
import { VibexAudioEngine } from '../services/audioEngine';
import {
  Music,
  Play,
  Pause,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Volume2,
} from 'lucide-react';

export const SongsView: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<GuitarSongItem | null>(null);
  const [isPlayingJam, setIsPlayingJam] = useState<boolean>(false);
  const audioEngine = VibexAudioEngine.getInstance();

  const handleToggleSongPractice = (song: GuitarSongItem) => {
    setSelectedSong(song);
    if (isPlayingJam) {
      audioEngine.stopMetronome();
      setIsPlayingJam(false);
    } else {
      audioEngine.startMetronome(song.tempoBpm, 'quarter', 'woodblock');
      setIsPlayingJam(true);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-20 text-[#F6F4FF]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#303348] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8066]" />
            <span className="text-xs font-mono font-bold text-[#FF8066] uppercase tracking-wider">
              SONG REPERTOIRE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F6F4FF] tracking-tight mt-1">
            Guitar Song Library
          </h1>
          <p className="text-xs text-[#A9A8BA] mt-0.5">
            Apply your open chords and folk strumming rhythms to legendary acoustic songs.
          </p>
        </div>
      </div>

      {/* Song Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {GUITAR_SONG_LIBRARY.map((song) => {
          const isSelected = selectedSong?.id === song.id;

          return (
            <div
              key={song.id}
              className={`p-6 rounded-2xl bg-[#151725] border transition-all duration-200 flex flex-col justify-between gap-4 shadow-lg ${
                isSelected
                  ? 'border-[#FF8066] shadow-[0_0_15px_rgba(255,128,102,0.15)] ring-1 ring-[#FF8066]'
                  : 'border-[#303348] hover:border-[#8067FF]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs text-[#A9A8BA]">{song.artist}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1D2032] text-[#54D6C3] text-[10px] font-mono font-bold">
                    {song.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#F6F4FF]">{song.title}</h3>
                <p className="text-xs text-[#A9A8BA] mt-1.5 leading-relaxed">
                  {song.description}
                </p>

                {/* Chords Used */}
                <div className="flex items-center gap-1.5 flex-wrap mt-3">
                  <span className="text-[11px] text-[#A9A8BA]">Chords:</span>
                  {song.chords.map((ch) => (
                    <span
                      key={ch}
                      className="px-2 py-0.5 rounded bg-[#0D0E17] border border-[#303348] text-xs font-mono font-bold text-[#FF8066]"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-[#303348] flex items-center justify-between gap-2 text-xs">
                <span className="text-[#A9A8BA] font-mono">{song.tempoBpm} BPM</span>

                <button
                  onClick={() => handleToggleSongPractice(song)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isSelected && isPlayingJam
                      ? 'bg-[#F06B78] text-white'
                      : 'bg-[#FF8066] hover:bg-[#ff6e50] text-[#0D0E17]'
                  }`}
                >
                  {isSelected && isPlayingJam ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  <span>{isSelected && isPlayingJam ? 'Pause Jam' : 'Practice Song'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Song Practice Details */}
      {selectedSong && (
        <div className="p-6 rounded-2xl bg-[#1D2032] border border-[#FF8066]/40 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#303348] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#FF8066] uppercase font-bold">
                Active Song Practice
              </span>
              <h3 className="text-lg font-bold text-[#F6F4FF]">
                {selectedSong.title} — {selectedSong.artist}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#54D6C3] font-bold">
                Rhythm: {selectedSong.strummingPattern}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#E2E1EC] leading-relaxed">
            {selectedSong.description} Practice changing between the chords cleanly on the downbeats with the {selectedSong.tempoBpm} BPM click.
          </p>
        </div>
      )}
    </div>
  );
};
