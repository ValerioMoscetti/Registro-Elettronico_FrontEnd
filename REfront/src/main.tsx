import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserPovider } from './context/UserContext.tsx'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserPovider>
        <App />
      </UserPovider>
    </BrowserRouter>
  </StrictMode>,
)
