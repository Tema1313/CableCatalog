import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { ThemeProvider } from './app/providers/theme-provider'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <div></div>
    </ThemeProvider>
  </React.StrictMode>,
)
