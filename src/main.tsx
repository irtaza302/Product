import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import * as serviceWorkerRegistration from './utils/serviceWorkerRegistration'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Register service worker
if (process.env.NODE_ENV === 'production') {
  serviceWorkerRegistration.register()
} else {
  serviceWorkerRegistration.unregister()
}
