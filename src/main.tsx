import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material'


const headerStyles = {
  fontWeight: 600,
  color: 'var(--primary)'
}

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway',
    h3: headerStyles,
    h4: headerStyles,
    h5: headerStyles,
    h6: headerStyles,
    body2: {
      fontStyle: 'italic',
      color: 'var(--primary)'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
