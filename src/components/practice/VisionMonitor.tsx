/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { InstrumentType, PostureFeedback } from '../../types/vibex';
import { Camera, CameraOff, AlertCircle, CheckCircle2, Sliders, Shield } from 'lucide-react';

interface VisionMonitorProps {
  instrument: InstrumentType;
  isActive: boolean;
  onFeedbackUpdate?: (feedback: PostureFeedback) => void;
}

export const VisionMonitor: React.FC<VisionMonitorProps> = ({
  instrument,
  isActive,
  onFeedbackUpdate,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [calibrationChecks, setCalibrationChecks] = useState({
    guitarVisible: true,
    neckVisible: true,
    frettingHandVisible: true,
    pickingHandVisible: false,
  });

  // Initialize camera stream
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setCameraError('Camera API is not supported in this browser.');
          setHasCamera(false);
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
        console.warn('Camera access unavailable:', err);
        setCameraError('Camera feedback unavailable — grant camera permissions in your browser.');
        setHasCamera(false);
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
  }, [isActive]);

  const toggleCheck = (key: keyof typeof calibrationChecks) => {
    setCalibrationChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative w-full h-full bg-[#151725] rounded-2xl border border-[#303348] overflow-hidden flex flex-col shadow-xl">
      {/* Viewport Area */}
      <div className="relative flex-1 w-full min-h-[240px] bg-[#0D0E17] flex items-center justify-center overflow-hidden">
        {hasCamera ? (
          <>
            <video
              ref={videoRef}
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            {/* Guide overlay box */}
            <div className="absolute inset-6 border-2 border-dashed border-[#8067FF]/60 rounded-xl pointer-events-none flex items-center justify-center">
              <span className="text-[10px] font-mono text-[#8067FF] bg-[#0D0E17]/80 px-2 py-0.5 rounded">
                Guitar Alignment Zone
              </span>
            </div>
          </>
        ) : (
          <div className="p-6 text-center flex flex-col items-center gap-3 max-w-sm">
            <div className="w-12 h-12 rounded-xl bg-[#1D2032] border border-[#303348] flex items-center justify-center text-[#A9A8BA]">
              <CameraOff className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F6F4FF]">Camera Feedback Unavailable</h4>
              <p className="text-xs text-[#A9A8BA] mt-1 leading-relaxed">
                {cameraError || 'Connect your webcam to enable live posture guidance and instrument framing.'}
              </p>
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-2.5 py-1 bg-[#151725]/90 backdrop-blur-md rounded-md border border-[#303348] text-xs">
          <span
            className={`w-2 h-2 rounded-full ${
              hasCamera ? 'bg-[#45D483] animate-pulse' : 'bg-[#A9A8BA]'
            }`}
          />
          <span className="font-mono text-[#F6F4FF] text-[10px]">
            {hasCamera ? 'LIVE CAMERA CONNECTED' : 'CAMERA DISCONNECTED'}
          </span>
        </div>

        {/* Honest Analysis Note */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-[#151725]/90 backdrop-blur-md rounded-md border border-[#303348] text-[10px] font-mono text-[#A9A8BA]">
          <Shield className="w-3 h-3 text-[#54D6C3]" />
          <span>Preview — analysis engine not connected</span>
        </div>
      </div>

      {/* Camera Setup & Calibration Checklist (Section 27) */}
      <div className="p-4 bg-[#1D2032] border-t border-[#303348] flex flex-col gap-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#F6F4FF] uppercase tracking-wider text-[10px] font-mono">
            Camera Calibration Setup
          </span>
          <span className="text-[10px] text-[#A9A8BA]">
            Adjust position until visible
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <button
            onClick={() => toggleCheck('guitarVisible')}
            className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-colors ${
              calibrationChecks.guitarVisible
                ? 'bg-[#151725] border-[#45D483] text-[#45D483]'
                : 'bg-[#151725] border-[#303348] text-[#A9A8BA]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Guitar body in frame</span>
          </button>

          <button
            onClick={() => toggleCheck('neckVisible')}
            className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-colors ${
              calibrationChecks.neckVisible
                ? 'bg-[#151725] border-[#45D483] text-[#45D483]'
                : 'bg-[#151725] border-[#303348] text-[#A9A8BA]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Neck tilted 30°</span>
          </button>

          <button
            onClick={() => toggleCheck('frettingHandVisible')}
            className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-colors ${
              calibrationChecks.frettingHandVisible
                ? 'bg-[#151725] border-[#45D483] text-[#45D483]'
                : 'bg-[#151725] border-[#303348] text-[#A9A8BA]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Fretting hand clear</span>
          </button>

          <button
            onClick={() => toggleCheck('pickingHandVisible')}
            className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-colors ${
              calibrationChecks.pickingHandVisible
                ? 'bg-[#151725] border-[#45D483] text-[#45D483]'
                : 'bg-[#151725] border-[#303348] text-[#A9A8BA]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Picking hand aligned</span>
          </button>
        </div>
      </div>
    </div>
  );
};
