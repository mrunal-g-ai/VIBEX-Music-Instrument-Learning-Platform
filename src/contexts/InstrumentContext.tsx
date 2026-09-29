import React, { createContext, useContext, useState, useEffect } from 'react';
import { InstrumentType } from '../types/vibex';

interface InstrumentContextType {
  activeInstrument: InstrumentType;
  setActiveInstrument: (instrument: InstrumentType) => void;
}

const InstrumentContext = createContext<InstrumentContextType | undefined>(undefined);

export const InstrumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeInstrument, setActiveInstrumentState] = useState<InstrumentType>(() => {
    try {
      const saved = localStorage.getItem('vibex_active_instrument');
      if (saved && ['guitar', 'keyboard', 'violin', 'bansuri'].includes(saved)) {
        return saved as InstrumentType;
      }
    } catch (e) {
      console.error('Failed to load instrument from local storage', e);
    }
    return 'guitar';
  });

  const setActiveInstrument = (instrument: InstrumentType) => {
    setActiveInstrumentState(instrument);
    try {
      localStorage.setItem('vibex_active_instrument', instrument);
    } catch (e) {
      console.error('Failed to save instrument to local storage', e);
    }
  };

  return (
    <InstrumentContext.Provider value={{ activeInstrument, setActiveInstrument }}>
      {children}
    </InstrumentContext.Provider>
  );
};

export const useInstrument = () => {
  const context = useContext(InstrumentContext);
  if (!context) {
    throw new Error('useInstrument must be used within an InstrumentProvider');
  }
  return context;
};
