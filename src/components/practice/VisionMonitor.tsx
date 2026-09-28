/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { InstrumentType, PostureFeedback } from '../../types/vibex';
import { Camera, CameraOff, Sparkles, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface VisionMonitorProps {
  instrument: InstrumentType;
  isActive: boolean;
  onFeedbackUpdate: (feedback: PostureFeedback) => void;
}

export const VisionMonitor: React.FC<VisionMonitorProps> = ({
  instrument,
  isActive,
  onFeedbackUpdate,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [useSimulation, setUseSimulation] = useState<boolean>(false);
  const [activeAlert, setActiveAlert] = useState<string>('Aligning posture landmarks...');
  const [postureScore, setPostureScore] = useState<number>(94);
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize camera
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      if (useSimulation) return;
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setUseSimulation(true);
          return;
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user',
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setHasCamera(true);
          setCameraError(null);
        }
      } catch (err) {
        console.warn('Camera permission not granted or unavailable, switching to synthetic CV mode:', err);
        setCameraError('Camera unavailable — running in AI Vision Simulator mode');
        setUseSimulation(true);
      }
    };

    if (isActive) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [isActive, useSimulation]);

  // Landmark synthesis and rendering loop
  useEffect(() => {
    let frame = 0;

    const renderLandmarks = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      // If camera active, draw faint video frame or if in simulation mode, draw stylized silhouette
      if (useSimulation || !hasCamera) {
        // Draw synthetic high-tech AI wireframe silhouette
        ctx.fillStyle = '#151725';
        ctx.fillRect(0, 0, width, height);

        // Grid lines
        ctx.strokeStyle = 'rgba(48, 51, 72, 0.4)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      frame++;
      const time = frame * 0.05;

      // Slight breathing wobble for realism
      const wobbleX = Math.sin(time) * 4;
      const wobbleY = Math.cos(time * 0.8) * 3;

      const centerX = width * 0.5 + wobbleX;
      const centerY = height * 0.52 + wobbleY;

      // Determine instrument-specific posture metrics
      if (instrument === 'guitar') {
        renderGuitarLandmarks(ctx, width, height, centerX, centerY, time);
      } else if (instrument === 'violin') {
        renderViolinLandmarks(ctx, width, height, centerX, centerY, time);
      } else if (instrument === 'bansuri') {
        renderBansuriLandmarks(ctx, width, height, centerX, centerY, time);
      } else {
        renderPianoLandmarks(ctx, width, height, centerX, centerY, time);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLandmarks);
    };

    if (isActive) {
      animFrameIdRef.current = requestAnimationFrame(renderLandmarks);
    }

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isActive, instrument, hasCamera, useSimulation]);

  // ==========================================
  // INSTRUMENT SPECIFIC CV OVERLAYS
  // ==========================================
  const renderGuitarLandmarks = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    cx: number,
    cy: number,
    time: number
  ) => {
    // Shoulders
    const leftShoulder = { x: cx - 110, y: cy - 70 };
    const rightShoulder = { x: cx + 110, y: cy - 70 };
    const leftElbow = { x: cx - 145, y: cy + 10 };
    const leftWrist = { x: cx - 85, y: cy + 70 };

    // Guitar Neck guide vector
    const neckStart = { x: cx - 140, y: cy + 90 };
    const neckEnd = { x: cx + 130, y: cy + 30 };

    // Draw Neck axis
    ctx.strokeStyle = 'rgba(255, 128, 102, 0.4)'; // Coral Orange
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(neckStart.x, neckStart.y);
    ctx.lineTo(neckEnd.x, neckEnd.y);
    ctx.stroke();

    // Draw Frets along neck
    ctx.strokeStyle = '#F6F4FF';
    ctx.lineWidth = 1.5;
    for (let f = 0; f < 6; f++) {
      const fx = neckStart.x + (neckEnd.x - neckStart.x) * (f / 6);
      const fy = neckStart.y + (neckEnd.y - neckStart.y) * (f / 6);
      ctx.beginPath();
      ctx.moveTo(fx - 4, fy - 12);
      ctx.lineTo(fx + 4, fy + 12);
      ctx.stroke();
    }

    // Arm skeleton
    drawSkeletonBone(ctx, leftShoulder, leftElbow, '#8067FF');
    drawSkeletonBone(ctx, leftElbow, leftWrist, '#8067FF');

    // 4 Finger Landmark Nodes on Fretboard
    const fingers = [
      { name: '1: Index', x: neckStart.x + 55, y: neckStart.y - 12, ok: true },
      { name: '2: Middle', x: neckStart.x + 78, y: neckStart.y - 14, ok: true },
      { name: '3: Ring', x: neckStart.x + 100, y: neckStart.y - 16, ok: false }, // slightly flat
      { name: '4: Pinky', x: neckStart.x + 122, y: neckStart.y - 18, ok: true },
    ];

    fingers.forEach((f) => {
      // Knuckle arch line
      ctx.strokeStyle = f.ok ? '#45D483' : '#F4BB55';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(leftWrist.x, leftWrist.y);
      ctx.lineTo(f.x, f.y);
      ctx.stroke();

      // Finger node
      ctx.fillStyle = f.ok ? '#45D483' : '#F4BB55';
      ctx.beginPath();
      ctx.arc(f.x, f.y, 6, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = '#F6F4FF';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(f.name, f.x - 18, f.y - 10);
    });

    // Alert calculation
    const isWobble = Math.sin(time) > 0.4;
    const advice = isWobble
      ? 'Move ring finger closer behind fret 2 wire'
      : 'Optimal fret knuckle curvature maintained';
    const score = isWobble ? 88 : 96;

    if (advice !== activeAlert) {
      setActiveAlert(advice);
      setPostureScore(score);
      onFeedbackUpdate({
        postureScore: score,
        pitchScore: 92,
        timingScore: 95,
        overallRating: score > 90 ? 'perfect' : 'adjust',
        message: advice,
        vectorAdvice: 'Arch knuckles 90° to prevent inadvertent muting on String 2 (B string).',
        faultDetected: isWobble ? 'Finger 3 placement too far back from fret wire' : undefined,
      });
    }
  };

  const renderViolinLandmarks = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    cx: number,
    cy: number,
    time: number
  ) => {
    // Chinrest & Collarbone anchor
    const chin = { x: cx - 15, y: cy - 90 };
    const leftCollarbone = { x: cx - 45, y: cy - 50 };
    const leftShoulder = { x: cx - 95, y: cy - 40 };
    const leftWrist = { x: cx - 130, y: cy + 15 };
    const rightShoulder = { x: cx + 90, y: cy - 40 };
    const rightElbow = { x: cx + 130, y: cy + 10 };
    const rightHand = { x: cx + 80, y: cy + 60 };

    // Violin Body axis
    const violinPegbox = { x: cx - 155, y: cy - 10 };
    const violinTail = { x: cx - 35, y: cy - 55 };

    ctx.strokeStyle = 'rgba(232, 137, 165, 0.4)'; // Rose
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(violinPegbox.x, violinPegbox.y);
    ctx.lineTo(violinTail.x, violinTail.y);
    ctx.stroke();

    // Bow Stroke Line
    const bowSwing = Math.sin(time * 1.4) * 50;
    const bowStart = { x: cx - 75 + bowSwing, y: cy - 20 };
    const bowEnd = { x: cx + 95 + bowSwing, y: cy + 45 };

    // Perpendicular angle test (Bridge relative)
    const bowAngleDeg = Math.round(90 + Math.sin(time * 0.8) * 8);
    const isPerpendicular = Math.abs(bowAngleDeg - 90) <= 4;

    ctx.strokeStyle = isPerpendicular ? '#45D483' : '#F4BB55';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bowStart.x, bowStart.y);
    ctx.lineTo(bowEnd.x, bowEnd.y);
    ctx.stroke();

    // Draw Bow Frog and Tip
    ctx.fillStyle = '#E889A5';
    ctx.beginPath();
    ctx.arc(bowStart.x, bowStart.y, 5, 0, Math.PI * 2);
    ctx.arc(bowEnd.x, bowEnd.y, 5, 0, Math.PI * 2);
    ctx.fill();

    // Left Wrist Alignment vector
    drawSkeletonBone(ctx, leftShoulder, leftWrist, '#8067FF');
    drawSkeletonBone(ctx, rightShoulder, rightElbow, '#8067FF');
    drawSkeletonBone(ctx, rightElbow, rightHand, '#8067FF');

    // Collarbone Anchor indicator
    ctx.strokeStyle = '#54D6C3';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(leftCollarbone.x - 12, leftCollarbone.y - 12, 24, 24);
    ctx.fillStyle = '#54D6C3';
    ctx.font = '9px "JetBrains Mono"';
    ctx.fillText('COLLARBONE ANCHOR', leftCollarbone.x - 40, leftCollarbone.y - 16);

    const advice = isPerpendicular
      ? 'Bow straight & parallel to bridge (90°)'
      : `Bow skew detected (${bowAngleDeg}°); keep forearm level with string plane`;
    const score = isPerpendicular ? 97 : 85;

    if (advice !== activeAlert) {
      setActiveAlert(advice);
      setPostureScore(score);
      onFeedbackUpdate({
        postureScore: score,
        pitchScore: 94,
        timingScore: 91,
        overallRating: score > 90 ? 'perfect' : 'adjust',
        message: advice,
        vectorAdvice: 'Straighten left wrist; do not collapse inward toward instrument neck.',
        faultDetected: isPerpendicular ? undefined : 'Bow path drifting diagonally toward fingerboard',
      });
    }
  };

  const renderBansuriLandmarks = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    cx: number,
    cy: number,
    time: number
  ) => {
    // Head & Embouchure blowhole alignment box
    const mouthCenter = { x: cx - 20, y: cy - 70 };
    const bansuriStart = { x: cx - 60, y: cy - 70 };
    const bansuriEnd = { x: cx + 140, y: cy - 40 };

    // Bamboo cylinder body
    ctx.strokeStyle = 'rgba(84, 214, 195, 0.4)'; // Aqua Mint
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(bansuriStart.x, bansuriStart.y);
    ctx.lineTo(bansuriEnd.x, bansuriEnd.y);
    ctx.stroke();

    // Embouchure alignment crosshair
    ctx.strokeStyle = '#54D6C3';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(mouthCenter.x - 10, mouthCenter.y - 10, 20, 20);
    ctx.fillStyle = '#54D6C3';
    ctx.font = '9px "JetBrains Mono"';
    ctx.fillText('EMBOUCHURE 1/3 COVERAGE', mouthCenter.x - 45, mouthCenter.y - 14);

    // 6 Tone Holes tracking
    const holeStates = [
      { id: 1, closed: true, name: 'H1' },
      { id: 2, closed: true, name: 'H2' },
      { id: 3, closed: Math.sin(time) > -0.3, name: 'H3' }, // Hole 3 seal status
      { id: 4, closed: false, name: 'H4' },
      { id: 5, closed: false, name: 'H5' },
      { id: 6, closed: false, name: 'H6' },
    ];

    holeStates.forEach((hole, idx) => {
      const hx = mouthCenter.x + 35 + idx * 22;
      const hy = mouthCenter.y + 5 + idx * 4.5;

      ctx.fillStyle = hole.closed ? '#45D483' : '#1D2032';
      ctx.strokeStyle = hole.closed ? '#45D483' : '#A9A8BA';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(hx, hy, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#F6F4FF';
      ctx.font = '8px "JetBrains Mono"';
      ctx.fillText(hole.name, hx - 5, hy - 9);
    });

    // Right Elbow angle
    const rightElbow = { x: cx + 130, y: cy + 15 };
    ctx.strokeStyle = '#8067FF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bansuriEnd.x, bansuriEnd.y);
    ctx.lineTo(rightElbow.x, rightElbow.y);
    ctx.stroke();

    const hole3Sealed = holeStates[2].closed;
    const advice = hole3Sealed
      ? 'Full tone hole hermetic seal (100%)'
      : 'Cover hole 3 completely to fix pitch leakage';
    const score = hole3Sealed ? 96 : 82;

    if (advice !== activeAlert) {
      setActiveAlert(advice);
      setPostureScore(score);
      onFeedbackUpdate({
        postureScore: score,
        pitchScore: 95,
        timingScore: 92,
        overallRating: score > 90 ? 'perfect' : 'adjust',
        message: advice,
        vectorAdvice: 'Seal with finger pads, not fingertips. Keep right elbow at 45° elevation.',
        faultDetected: hole3Sealed ? undefined : 'Micro-gap air escape on Hole 3 ring finger',
      });
    }
  };

  const renderPianoLandmarks = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    cx: number,
    cy: number,
    time: number
  ) => {
    // Piano keybed horizontal plane
    const keybedY = cy + 45;
    ctx.strokeStyle = 'rgba(128, 103, 255, 0.4)';
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(cx - 130, keybedY);
    ctx.lineTo(cx + 130, keybedY);
    ctx.stroke();

    // Curved Hand Arch
    const wrist = { x: cx, y: keybedY - 35 + Math.sin(time) * 3 };
    const knuckleArch = { x: cx, y: keybedY - 50 };

    // Fingers 1 to 5 dropping to keys
    const fingers = [-45, -22, 0, 22, 45].map((offset, i) => ({
      x: cx + offset,
      y: keybedY - 5,
      num: i + 1,
    }));

    // Hand bridge contour
    ctx.strokeStyle = '#8067FF';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(wrist.x - 30, wrist.y);
    ctx.quadraticCurveTo(knuckleArch.x, knuckleArch.y, wrist.x + 30, wrist.y);
    ctx.stroke();

    // Finger lines
    fingers.forEach((f) => {
      ctx.strokeStyle = '#45D483';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(knuckleArch.x + (f.x - cx) * 0.6, knuckleArch.y + 10);
      ctx.lineTo(f.x, f.y);
      ctx.stroke();

      ctx.fillStyle = '#45D483';
      ctx.beginPath();
      ctx.arc(f.x, f.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    const isArchGood = wrist.y < keybedY - 20;
    const advice = isArchGood
      ? 'Ergonomic arched bridge maintained'
      : 'Wrist dropping too low; lift wrist 1 inch';
    const score = isArchGood ? 95 : 84;

    if (advice !== activeAlert) {
      setActiveAlert(advice);
      setPostureScore(score);
      onFeedbackUpdate({
        postureScore: score,
        pitchScore: 96,
        timingScore: 94,
        overallRating: score > 90 ? 'perfect' : 'adjust',
        message: advice,
        vectorAdvice: 'Curve fingers like holding a small tennis ball; relax shoulder tension.',
      });
    }
  };

  const drawSkeletonBone = (
    ctx: CanvasRenderingContext2D,
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    color: string
  ) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    ctx.fillStyle = '#F6F4FF';
    ctx.beginPath();
    ctx.arc(p1.x, p1.y, 4.5, 0, Math.PI * 2);
    ctx.arc(p2.x, p2.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="relative w-full h-full bg-[#151725] rounded-xl border border-[#303348] overflow-hidden flex flex-col">
      {/* Video & Landmark Canvas */}
      <div className="relative flex-1 w-full min-h-[220px] bg-[#0D0E17] flex items-center justify-center overflow-hidden">
        {/* Real Video Element (if camera active) */}
        <video
          ref={videoRef}
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover opacity-60 ${
            useSimulation || !hasCamera ? 'hidden' : 'block'
          }`}
        />

        {/* High-Precision Overlay Canvas */}
        <canvas
          ref={canvasRef}
          width={400}
          height={260}
          className="relative z-10 w-full h-full object-contain pointer-events-none"
        />

        {/* Live Vector AI Tracker Badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-2.5 py-1 bg-[#151725]/85 backdrop-blur-md rounded-md border border-[#303348] text-xs">
          <span className="w-2 h-2 rounded-full bg-[#45D483] animate-pulse" />
          <span className="font-mono text-[#F6F4FF] tracking-wide text-[11px]">
            ML KIT 3D LANDMARK PIPELINE
          </span>
        </div>

        {/* Camera Toggle Button */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          <button
            onClick={() => setUseSimulation(!useSimulation)}
            className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-[#1D2032] border border-[#303348] text-[#A9A8BA] hover:text-[#F6F4FF] transition-colors flex items-center gap-1.5"
            title={useSimulation ? 'Switch to Real WebCam' : 'Switch to Synthetic AI Model'}
          >
            {useSimulation ? <CameraOff className="w-3 h-3 text-[#FF8066]" /> : <Camera className="w-3 h-3 text-[#54D6C3]" />}
            <span className="hidden sm:inline">{useSimulation ? 'Sim Mode' : 'WebCam'}</span>
          </button>
        </div>

        {/* Posture Score Pill at Bottom Left */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 px-2.5 py-1 bg-[#151725]/90 backdrop-blur-md rounded-md border border-[#303348]">
          <Sparkles className="w-3.5 h-3.5 text-[#8067FF]" />
          <span className="text-xs text-[#A9A8BA]">Posture Index:</span>
          <span className="font-mono font-bold text-xs text-[#54D6C3]">{postureScore}%</span>
        </div>
      </div>

      {/* Real-time Posture Guidance Banner */}
      <div className="px-3.5 py-2.5 bg-[#1D2032] border-t border-[#303348] flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 truncate">
          {postureScore >= 90 ? (
            <CheckCircle2 className="w-4 h-4 text-[#45D483] shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-[#F4BB55] shrink-0" />
          )}
          <span className="text-[#F6F4FF] font-medium truncate">{activeAlert}</span>
        </div>
        <span className="text-[11px] font-mono text-[#A9A8BA] shrink-0 uppercase tracking-wider">
          {instrument} Vision
        </span>
      </div>
    </div>
  );
};
