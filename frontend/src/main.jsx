import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router basename="/Skill-Bridge">
      <App />
    </Router>
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
