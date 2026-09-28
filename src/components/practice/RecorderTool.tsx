/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Trash2, Download, AlertCircle } from 'lucide-react';

export const RecorderTool: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    setErrorMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      setErrorMsg('Microphone access is required to record your guitar takes.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  const togglePlayback = () => {
    if (!audioElementRef.current) return;
    if (isPlayingAudio) {
      audioElementRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioElementRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  const deleteRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setIsPlayingAudio(false);
    setRecordingSeconds(0);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="w-full bg-[#151725] border border-[#303348] rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#303348] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#F6F4FF]">Session Take Recorder</h3>
          <p className="text-xs text-[#A9A8BA]">
            Record your acoustic practice takes, evaluate clarity, and track personal tone
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-[#0D0E17] border border-[#F06B78]/40 text-xs text-[#F06B78] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Recording Display */}
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0D0E17] border border-[#303348] gap-4">
        <div className="flex items-center gap-2">
          {isRecording && <span className="w-3 h-3 rounded-full bg-[#F06B78] animate-ping" />}
          <span className="text-4xl font-extrabold font-mono text-[#F6F4FF]">
            {formatTime(recordingSeconds)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-6 py-3 rounded-xl bg-[#F06B78] hover:bg-[#e05866] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#F06B78]/20 transition-all"
            >
              <Mic className="w-4 h-4" />
              <span>Record New Take</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-6 py-3 rounded-xl bg-[#1D2032] hover:bg-[#303348] border border-[#F06B78] text-[#F06B78] font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Stop Recording</span>
            </button>
          )}
        </div>
      </div>

      {/* Playback Container */}
      {audioUrl && (
        <div className="p-4 rounded-xl bg-[#1D2032] border border-[#303348] flex items-center justify-between gap-4">
          <audio
            ref={audioElementRef}
            src={audioUrl}
            onEnded={() => setIsPlayingAudio(false)}
            className="hidden"
          />

          <div className="flex items-center gap-3">
            <button
              onClick={togglePlayback}
              className="w-10 h-10 rounded-xl bg-[#54D6C3] text-[#0D0E17] font-bold flex items-center justify-center shadow-md transition-all hover:scale-105"
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <div>
              <span className="text-xs font-bold text-[#F6F4FF] block">Recorded Practice Take</span>
              <span className="text-[10px] text-[#A9A8BA]">Duration: {formatTime(recordingSeconds)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={audioUrl}
              download="vibex_guitar_take.webm"
              className="p-2 rounded-lg bg-[#151725] text-[#A9A8BA] hover:text-[#F6F4FF] transition-colors"
              title="Download take"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={deleteRecording}
              className="p-2 rounded-lg bg-[#151725] text-[#F06B78] hover:bg-[#F06B78]/20 transition-colors"
              title="Delete take"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
