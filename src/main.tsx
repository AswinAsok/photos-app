import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import App from './pages/App.tsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position='bottom-center'
      toastOptions={{
        duration: 3000,
        style: {
          background: '#ffffff',
          color: '#000000',
          borderRadius: '8px',
        },
      }}
    />
    <App />
  </StrictMode>,
);
