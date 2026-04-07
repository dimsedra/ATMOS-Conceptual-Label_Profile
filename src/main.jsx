import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AtmosProvider } from './context/AtmosContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AtmosProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AtmosProvider>
  </StrictMode>,
)
