import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register PWA service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Relative path works better with Vite base URL configurations
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('SW registered successfully'))
      .catch((err) => console.log('SW registration failed:', err));
  });
}
