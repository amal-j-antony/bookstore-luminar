import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import SearchContext from './contextShare/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='640333813094-1aa410l63mokaslp5ri5h6tsbtvollkq.apps.googleusercontent.com' >
        <SearchContext>
          <App />
        </SearchContext>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
