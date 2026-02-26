import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)

// Use StrictMode only in development to avoid double-rendering in production
if (import.meta.env.DEV) {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  root.render(<App />)
}

// Enable service worker for better caching in production
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, app will still work
    })
  })
}
