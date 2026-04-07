import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AtmosProvider } from './context/AtmosContext'
import { SupabaseProvider } from './context/SupabaseContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SupabaseProvider>
      <AtmosProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AtmosProvider>
    </SupabaseProvider>
  </StrictMode>,
)
