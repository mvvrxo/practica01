import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components/App.jsx'
import "@material/web/all.js"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
