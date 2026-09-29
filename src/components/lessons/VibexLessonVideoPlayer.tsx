import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, AlertTriangle, Loader2 } from 'lucide-react';

interface VibexLessonVideoPlayerProps {
  src: string;
  poster?: string;
  onEnded?: () => void;
  className?: string;
}

export const VibexLessonVideoPlayer: React.FC<VibexLessonVideoPlayerProps> = ({
  src,
  poster,
  onEnded,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states if src changes
    setIsLoading(true);
    setHasError(false);
    setIsPlaying(false);
    setIsEnded(false);
  }, [src]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      if (isEnded) {
        videoRef.current.currentTime = 0;
        setIsEnded(false);
      }
      videoRef.current.play().catch((err) => {
        console.error('Video playback failed:', err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
    setIsEnded(false);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    if (onEnded) onEnded();
  };

  if (hasError) {
    return (
      <div className={`w-full aspect-video bg-[#0D0E17] rounded-2xl border border-[#303348] flex flex-col items-center justify-center p-6 text-center ${className}`}>
        <AlertTriangle className="w-10 h-10 text-[#FF8066] mb-3 opacity-80" />
        <h3 className="text-[#F6F4FF] font-bold text-sm">Demonstration video unavailable.</h3>
        <p className="text-[#A9A8BA] text-xs mt-1">Please continue with the interactive lesson below.</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-video bg-[#0D0E17] rounded-2xl overflow-hidden border border-[#303348] group ${className}`}>
      
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#151725] z-10">
          <Loader2 className="w-8 h-8 text-[#8067FF] animate-spin" />
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        className="w-full h-full object-cover"
        onCanPlay={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        onEnded={handleEnded}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Overlay Controls */}
      <div className={`absolute inset-0 bg-black/40 flex flex-col justify-between p-4 transition-opacity duration-300 ${isPlaying && !isEnded ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        
        {/* Top Controls: Mute */}
        <div className="flex justify-end w-full">
          <button 
            onClick={handleMuteToggle}
            className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md border border-white/10 hover:bg-black/70 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Center Controls: Big Play/Replay */}
        <div className="flex-1 flex items-center justify-center">
          {!isLoading && (
            <button
              onClick={isEnded ? handleReplay : handlePlayPause}
              className="w-16 h-16 rounded-full bg-[#8067FF]/90 text-white flex items-center justify-center backdrop-blur-md shadow-lg shadow-[#8067FF]/30 hover:scale-110 hover:bg-[#8067FF] transition-all"
            >
              {isEnded ? (
                <RotateCcw className="w-7 h-7" />
              ) : isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7 ml-1" />
              )}
            </button>
          )}
        </div>

        {/* Bottom (for future seek bar, if needed) */}
        <div className="w-full h-2"></div>
      </div>
    </div>
  );
};
