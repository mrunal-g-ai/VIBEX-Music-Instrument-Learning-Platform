import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { InstrumentProvider } from './contexts/InstrumentContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InstrumentProvider>
      <App />
    </InstrumentProvider>
  </StrictMode>,
);
