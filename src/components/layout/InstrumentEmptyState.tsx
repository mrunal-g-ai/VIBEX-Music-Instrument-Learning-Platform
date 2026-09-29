import React from 'react';
import { useInstrument } from '../../contexts/InstrumentContext';
import { InstrumentType } from '../../types/vibex';

interface InstrumentEmptyStateProps {
  title?: string;
  message?: string;
}

const INSTRUMENT_INFO: Record<InstrumentType, { name: string; icon: string; accent: string }> = {
  guitar: { name: 'Guitar', icon: '🎸', accent: '#FF8066' },
  keyboard: { name: 'Keyboard', icon: '🎹', accent: '#8067FF' },
  violin: { name: 'Violin', icon: '🎻', accent: '#E889A5' },
  bansuri: { name: 'Bansuri', icon: '🎋', accent: '#54D6C3' },
};

export const InstrumentEmptyState: React.FC<InstrumentEmptyStateProps> = ({ title, message }) => {
  const { activeInstrument } = useInstrument();
  const info = INSTRUMENT_INFO[activeInstrument] || INSTRUMENT_INFO.guitar;

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-24 h-24 rounded-[32px] bg-[#151725] border border-[#303348] shadow-2xl flex items-center justify-center text-5xl mb-6 relative">
        <div 
          className="absolute inset-0 rounded-[32px] opacity-20 blur-xl transition-all duration-700"
          style={{ backgroundColor: info.accent }}
        />
        <span className="relative z-10 drop-shadow-xl">{info.icon}</span>
      </div>
      
      <h1 
        className="text-4xl font-black uppercase tracking-tight mb-3"
        style={{ color: info.accent }}
      >
        {title || info.name}
      </h1>
      
      <p className="text-lg text-[#A9A8BA] max-w-md mx-auto leading-relaxed">
        {message || `Your ${info.name} learning path is coming soon.`}
      </p>
    </div>
  );
};
