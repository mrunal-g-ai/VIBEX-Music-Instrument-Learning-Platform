/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InstrumentType, PitchTrackingResult } from '../types/vibex';

// Note names for 12-TET
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export class VibexAudioEngine {
  private static instance: VibexAudioEngine;
  private audioCtx: AudioContext | null = null;
  private micStream: MediaStream | null = null;
  private micSource: MediaStreamAudioSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isListening = false;
  private metronomeTimer: number | null = null;
  private metronomeCurrentBeat = 0;
  private droneOscillators: OscillatorNode[] = [];
  private droneGain: GainNode | null = null;
  private isDroneActive = false;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  private constructor() {}

  public static getInstance(): VibexAudioEngine {
    if (!VibexAudioEngine.instance) {
      VibexAudioEngine.instance = new VibexAudioEngine();
    }
    return VibexAudioEngine.instance;
  }

  public getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // ==========================================
  // INSTRUMENT SYNTHESIZERS
  // ==========================================
  public playInstrumentNote(
    instrument: InstrumentType,
    frequency: number,
    durationMs: number = 800,
    velocity: number = 0.8
  ): void {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;
    const durSec = durationMs / 1000;

    switch (instrument) {
      case 'keyboard': {
        // Grand Piano physical modeling with 3 harmonic partials and soft hammer transient
        const fundamental = ctx.createOscillator();
        const overtone1 = ctx.createOscillator();
        const overtone2 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        fundamental.type = 'triangle';
        fundamental.frequency.setValueAtTime(frequency, now);

        overtone1.type = 'sine';
        overtone1.frequency.setValueAtTime(frequency * 2, now);

        overtone2.type = 'sine';
        overtone2.frequency.setValueAtTime(frequency * 3, now);

        // Hammer click impulse
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(Math.min(4500, frequency * 5), now);
        filter.frequency.exponentialRampToValueAtTime(frequency * 1.5, now + durSec * 0.4);

        // ADSR envelope
        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.linearRampToValueAtTime(velocity * 0.45, now + 0.015);
        gainNode.gain.exponentialRampToValueAtTime(velocity * 0.25, now + 0.12);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durSec);

        fundamental.connect(filter);
        overtone1.connect(filter);
        overtone2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        fundamental.start(now);
        overtone1.start(now);
        overtone2.start(now);
        fundamental.stop(now + durSec);
        overtone1.stop(now + durSec);
        overtone2.stop(now + durSec);
        break;
      }

      case 'guitar': {
        // Acoustic guitar Karplus-Strong style string pluck synthesis
        const osc = ctx.createOscillator();
        const oscSub = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(frequency, now);

        oscSub.type = 'triangle';
        oscSub.frequency.setValueAtTime(frequency, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(Math.min(5000, frequency * 6), now);
        filter.frequency.exponentialRampToValueAtTime(frequency * 1.2, now + durSec * 0.6);

        // Sharp acoustic pluck attack and gradual string ring
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(velocity * 0.5, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.18, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec * 1.2);

        osc.connect(filter);
        oscSub.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        oscSub.start(now);
        osc.stop(now + durSec * 1.2);
        oscSub.stop(now + durSec * 1.2);
        break;
      }

      case 'violin': {
        // Classical Violin bowed string with formant shaping & continuous bow vibrato
        const osc = ctx.createOscillator();
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        const gain = ctx.createGain();
        const formant = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(frequency, now);

        // 5.5 Hz bow vibrato
        vibrato.frequency.setValueAtTime(5.5, now);
        vibratoGain.gain.setValueAtTime(frequency * 0.015, now); // ~25 cents vibrato depth
        vibrato.connect(osc.frequency);

        // Violin wood body resonance formant (~2500 Hz)
        formant.type = 'bandpass';
        formant.frequency.setValueAtTime(2500, now);
        formant.Q.setValueAtTime(2.2, now);

        // Bowed swell attack (crescendo into sustained stroke)
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(velocity * 0.35, now + 0.08);
        gain.gain.setValueAtTime(velocity * 0.32, now + durSec * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec);

        osc.connect(formant);
        formant.connect(gain);
        gain.connect(ctx.destination);

        vibrato.start(now);
        osc.start(now);
        vibrato.stop(now + durSec);
        osc.stop(now + durSec);
        break;
      }

      case 'bansuri': {
        // Bamboo flute breath resonance with pure fundamental and subtle breath overtone
        const fundamental = ctx.createOscillator();
        const breathOsc = ctx.createOscillator();
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        fundamental.type = 'sine';
        fundamental.frequency.setValueAtTime(frequency, now);

        // Subtle gentle breath flutter (Gamak/vibrato 4.8 Hz)
        vibrato.frequency.setValueAtTime(4.8, now);
        vibratoGain.gain.setValueAtTime(frequency * 0.008, now);
        vibrato.connect(fundamental.frequency);

        // Upper airy harmonic
        breathOsc.type = 'triangle';
        breathOsc.frequency.setValueAtTime(frequency * 2, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(frequency * 3.5, now);

        // Flute soft embouchure breath envelope
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(velocity * 0.42, now + 0.06);
        gain.gain.exponentialRampToValueAtTime(velocity * 0.28, now + durSec * 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec);

        fundamental.connect(filter);
        breathOsc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        vibrato.start(now);
        fundamental.start(now);
        breathOsc.start(now);
        vibrato.stop(now + durSec);
        fundamental.stop(now + durSec);
        breathOsc.stop(now + durSec);
        break;
      }
    }
  }

  // Play a sequence or chord
  public playChord(frequencies: number[], durationMs: number = 1500): void {
    frequencies.forEach((freq, idx) => {
      setTimeout(() => {
        this.playInstrumentNote('keyboard', freq, durationMs, 0.7);
      }, idx * 40); // slight strum/roll
    });
  }

  // ==========================================
  // REAL-TIME MICROPHONE & PITCH EXTRACTION
  // ==========================================
  public async startPitchTracking(): Promise<boolean> {
    try {
      const ctx = this.getAudioContext();
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('Microphone access not available in this environment');
        return false;
      }

      this.micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
        },
      });

      this.micSource = ctx.createMediaStreamSource(this.micStream);
      this.analyser = ctx.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.8;
      this.micSource.connect(this.analyser);
      this.isListening = true;
      return true;
    } catch (err) {
      console.warn('Could not initialize microphone for live pitch tracking:', err);
      return false;
    }
  }

  public stopPitchTracking(): void {
    this.isListening = false;
    if (this.micStream) {
      this.micStream.getTracks().forEach((track) => track.stop());
      this.micStream = null;
    }
    if (this.micSource) {
      this.micSource.disconnect();
      this.micSource = null;
    }
  }

  public getAudioTimeData(buffer: Float32Array): void {
    if (this.analyser) {
      // Cast to satisfy TS DOM Float32Array<ArrayBuffer>
      this.analyser.getFloatTimeDomainData(buffer as unknown as Float32Array<ArrayBuffer>);
    }
  }

  // =========================================================================
  // YIN PITCH DETECTION ALGORITHM (de Cheveigné & Kawahara, 2002)
  // Sub-cent accurate fundamental frequency estimation
  // =========================================================================
  public detectPitchYIN(buffer: Float32Array, sampleRate: number, threshold = 0.15): { frequency: number | null; clarity: number } {
    const bufferSize = buffer.length;
    const halfBufferSize = Math.floor(bufferSize / 2);
    const yinBuffer = new Float32Array(halfBufferSize);

    // Step 1: Difference function d_t(tau)
    for (let tau = 0; tau < halfBufferSize; tau++) {
      let sum = 0;
      for (let i = 0; i < halfBufferSize; i++) {
        const delta = buffer[i] - buffer[i + tau];
        sum += delta * delta;
      }
      yinBuffer[tau] = sum;
    }

    // Step 2: Cumulative Mean Normalized Difference Function d'_t(tau)
    yinBuffer[0] = 1;
    let runningSum = 0;
    for (let tau = 1; tau < halfBufferSize; tau++) {
      runningSum += yinBuffer[tau];
      yinBuffer[tau] = runningSum > 0 ? (yinBuffer[tau] * tau) / runningSum : 1;
    }

    // Step 3: Absolute thresholding
    let tauEstimate = -1;
    for (let tau = 2; tau < halfBufferSize; tau++) {
      if (yinBuffer[tau] < threshold) {
        while (tau + 1 < halfBufferSize && yinBuffer[tau + 1] < yinBuffer[tau]) {
          tau++;
        }
        tauEstimate = tau;
        break;
      }
    }

    if (tauEstimate === -1) {
      // Find global minimum if below threshold not found
      let minTau = 2;
      let minVal = yinBuffer[2];
      for (let tau = 3; tau < halfBufferSize; tau++) {
        if (yinBuffer[tau] < minVal) {
          minVal = yinBuffer[tau];
          minTau = tau;
        }
      }
      if (minVal < 0.4) {
        tauEstimate = minTau;
      } else {
        return { frequency: null, clarity: 0 };
      }
    }

    // Step 4: Parabolic interpolation for sub-sample accuracy
    let betterTau: number;
    const x0 = tauEstimate < 1 ? tauEstimate : tauEstimate - 1;
    const x2 = tauEstimate + 1 < halfBufferSize ? tauEstimate + 1 : tauEstimate;
    if (x0 === tauEstimate) {
      betterTau = yinBuffer[tauEstimate] <= yinBuffer[x2] ? tauEstimate : x2;
    } else if (x2 === tauEstimate) {
      betterTau = yinBuffer[tauEstimate] <= yinBuffer[x0] ? tauEstimate : x0;
    } else {
      const s0 = yinBuffer[x0];
      const s1 = yinBuffer[tauEstimate];
      const s2 = yinBuffer[x2];
      const bottom = 2 * (2 * s1 - s2 - s0);
      betterTau = bottom === 0 ? tauEstimate : tauEstimate + (s2 - s0) / bottom;
    }

    const frequency = sampleRate / betterTau;
    const clarity = Math.max(0, 1 - yinBuffer[tauEstimate]);

    // Musical frequency range cutoff (50 Hz to 2200 Hz)
    if (frequency >= 50 && frequency <= 2200) {
      return { frequency, clarity };
    }
    return { frequency: null, clarity: 0 };
  }

  // =========================================================================
  // MCLEOD PITCH METHOD (MPM)
  // Normalized Square Difference Function (NSDF) peak refinement
  // =========================================================================
  public detectPitchMPM(buffer: Float32Array, sampleRate: number, cutoff = 0.9): { frequency: number | null; clarity: number } {
    const size = buffer.length;
    const nsdf = new Float32Array(size);

    for (let tau = 0; tau < size; tau++) {
      let acf = 0;
      let divisorM = 0;
      for (let i = 0; i < size - tau; i++) {
        acf += buffer[i] * buffer[i + tau];
        divisorM += buffer[i] * buffer[i] + buffer[i + tau] * buffer[i + tau];
      }
      nsdf[tau] = divisorM > 0 ? (2 * acf) / divisorM : 0;
    }

    // Peak picking
    const maxPositions: number[] = [];
    let pos = 0;
    let curMaxPos = 0;

    // Find first negative zero-crossing
    while (pos < size - 1 && nsdf[pos] > 0) pos++;
    while (pos < size - 1 && nsdf[pos] <= 0) pos++;
    if (pos === 0) pos = 1;

    while (pos < size - 1) {
      if (nsdf[pos] > nsdf[pos - 1] && nsdf[pos] >= nsdf[pos + 1]) {
        if (curMaxPos === 0 || nsdf[pos] > nsdf[curMaxPos]) {
          curMaxPos = pos;
        }
      }
      pos++;
      if (pos < size - 1 && nsdf[pos] <= 0) {
        if (curMaxPos > 0) {
          maxPositions.push(curMaxPos);
          curMaxPos = 0;
        }
        while (pos < size - 1 && nsdf[pos] <= 0) pos++;
      }
    }
    if (curMaxPos > 0) maxPositions.push(curMaxPos);

    if (maxPositions.length === 0) return { frequency: null, clarity: 0 };

    let highestAmp = -Infinity;
    for (const p of maxPositions) {
      if (nsdf[p] > highestAmp) highestAmp = nsdf[p];
    }

    const threshold = highestAmp * cutoff;
    let periodIndex = -1;
    for (const p of maxPositions) {
      if (nsdf[p] >= threshold) {
        periodIndex = p;
        break;
      }
    }

    if (periodIndex === -1) return { frequency: null, clarity: 0 };

    // Parabolic interpolation for peak
    const y1 = nsdf[periodIndex - 1];
    const y2 = nsdf[periodIndex];
    const y3 = nsdf[periodIndex + 1];
    const delta = y1 - 2 * y2 + y3 !== 0 ? (y3 - y1) / (2 * (2 * y2 - y1 - y3)) : 0;
    const period = periodIndex + delta;

    const frequency = sampleRate / period;
    const clarity = Math.min(1, Math.max(0, y2));

    if (frequency >= 50 && frequency <= 2200) {
      return { frequency, clarity };
    }
    return { frequency: null, clarity: 0 };
  }

  // ==========================================
  // NOTE & CENTS MATH HELPER
  // ==========================================
  public frequencyToNote(frequency: number): { noteName: string; centsDeviation: number; midi: number } {
    const midi = 69 + 12 * Math.log2(frequency / 440);
    const roundedMidi = Math.round(midi);
    const centsDeviation = Math.round((midi - roundedMidi) * 100);
    const noteIndex = ((roundedMidi % 12) + 12) % 12;
    const octave = Math.floor(roundedMidi / 12) - 1;
    const noteName = `${NOTE_NAMES[noteIndex]}${octave}`;

    return { noteName, centsDeviation, midi: roundedMidi };
  }

  public noteToFrequency(noteName: string): number {
    const match = noteName.match(/^([A-G]#?)(-?\d+)$/);
    if (!match) return 440;
    const name = match[1];
    const octave = parseInt(match[2], 10);
    const semitone = NOTE_NAMES.indexOf(name);
    if (semitone === -1) return 440;
    const midi = (octave + 1) * 12 + semitone;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  // ==========================================
  // INTERACTIVE METRONOME
  // ==========================================
  public startMetronome(
    bpm: number,
    subdivision: 'quarter' | 'eighth' | 'triplet' | 'sixteenth' = 'quarter',
    soundType: 'woodblock' | 'beep' | 'bell' = 'woodblock',
    onTick?: (beat: number) => void
  ): void {
    this.stopMetronome();
    const ctx = this.getAudioContext();

    const multiplier = subdivision === 'quarter' ? 1 : subdivision === 'eighth' ? 2 : subdivision === 'triplet' ? 3 : 4;
    const intervalMs = (60000 / bpm) / multiplier;

    this.metronomeTimer = window.setInterval(() => {
      const now = ctx.currentTime;
      const isDownbeat = this.metronomeCurrentBeat % (4 * multiplier) === 0;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (soundType === 'woodblock') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(isDownbeat ? 1200 : 800, now);
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      } else if (soundType === 'bell') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(isDownbeat ? 1760 : 880, now);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(isDownbeat ? 1000 : 500, now);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);

      if (onTick) {
        onTick(this.metronomeCurrentBeat);
      }
      this.metronomeCurrentBeat++;
    }, intervalMs);
  }

  public stopMetronome(): void {
    if (this.metronomeTimer !== null) {
      clearInterval(this.metronomeTimer);
      this.metronomeTimer = null;
      this.metronomeCurrentBeat = 0;
    }
  }

  // ==========================================
  // TANPURA / DRONE PLAYER
  // ==========================================
  public startTanpuraDrone(rootPitchName: string = 'C4'): void {
    this.stopTanpuraDrone();
    const ctx = this.getAudioContext();
    const baseFreq = this.noteToFrequency(rootPitchName);
    const paFreq = baseFreq * 1.5; // Pancham harmonic

    this.droneGain = ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, ctx.currentTime);
    this.droneGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5);

    // 4 strings typical for Tanpura: Pa - Sa - Sa - Sa (lower octave)
    const pitches = [paFreq, baseFreq, baseFreq, baseFreq * 0.5];

    pitches.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const stringGain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Low pass filter to replicate gourd acoustic body resonance
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 3, ctx.currentTime);

      stringGain.gain.setValueAtTime(0.25 - idx * 0.04, ctx.currentTime);

      osc.connect(filter);
      filter.connect(stringGain);
      stringGain.connect(this.droneGain!);
      osc.start(ctx.currentTime);
      this.droneOscillators.push(osc);
    });

    this.droneGain.connect(ctx.destination);
    this.isDroneActive = true;
  }

  public stopTanpuraDrone(): void {
    if (this.droneGain && this.audioCtx) {
      this.droneGain.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.5);
    }
    setTimeout(() => {
      this.droneOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore if already stopped
        }
      });
      this.droneOscillators = [];
      this.isDroneActive = false;
    }, 600);
  }

  public isDronePlaying(): boolean {
    return this.isDroneActive;
  }

  // ==========================================
  // PRACTICE SESSION RECORDER
  // ==========================================
  public startSessionRecording(): boolean {
    try {
      if (!this.micStream) return false;
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(this.micStream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };
      this.mediaRecorder.start();
      return true;
    } catch (err) {
      console.warn('MediaRecorder error:', err);
      return false;
    }
  }

  public stopSessionRecording(): Promise<string | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        resolve(audioUrl);
      };
      this.mediaRecorder.stop();
    });
  }

  // ==========================================
  // TIMBRE DEMONSTRATION & REWARD CHIMES
  // ==========================================
  public playGuitarTimbre(
    type: 'acoustic' | 'electric' | 'classical',
    frequency: number = 196.0,
    durationMs: number = 1400
  ): void {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;
    const durSec = durationMs / 1000;

    switch (type) {
      case 'acoustic': {
        // Steel string acoustic: crisp attack + wooden body cavity resonance
        const osc = ctx.createOscillator();
        const oscSub = ctx.createOscillator();
        const bodyResonance = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(frequency, now);

        oscSub.type = 'triangle';
        oscSub.frequency.setValueAtTime(frequency * 2, now);

        bodyResonance.type = 'bandpass';
        bodyResonance.frequency.setValueAtTime(450, now);
        bodyResonance.Q.setValueAtTime(1.5, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.5, now + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.2, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec);

        osc.connect(gain);
        oscSub.connect(bodyResonance);
        bodyResonance.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        oscSub.start(now);
        osc.stop(now + durSec);
        oscSub.stop(now + durSec);
        break;
      }

      case 'electric': {
        // Electric guitar: magnetic pickup harmonics + sustained amp character
        const osc = ctx.createOscillator();
        const pickupTone = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(frequency, now);

        pickupTone.type = 'lowpass';
        pickupTone.frequency.setValueAtTime(2800, now);

        // Extended sustain characteristic of amplified electric guitar
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.45, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.35, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec * 1.3);

        osc.connect(pickupTone);
        pickupTone.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + durSec * 1.3);
        break;
      }

      case 'classical': {
        // Classical nylon: soft mellow finger attack + warm round fundamental
        const osc = ctx.createOscillator();
        const warmFilter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, now);

        warmFilter.type = 'lowpass';
        warmFilter.frequency.setValueAtTime(1200, now);

        // Softer finger-flesh attack and round decay
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.55, now + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.18, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec);

        osc.connect(warmFilter);
        warmFilter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + durSec);
        break;
      }
    }
  }

  public playCelebrationChime(): void {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;
    // C5, E5, G5, C6 triumphant ascending arpeggio
    const chord = [523.25, 659.25, 783.99, 1046.5];

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.9);
    });
  }
}
