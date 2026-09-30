import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './index.css';

// Opt in to the scroll reveal only when it can actually run.
if ('IntersectionObserver' in window) document.documentElement.classList.add('js-reveal');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
