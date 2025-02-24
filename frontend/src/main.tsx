import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './output.css'
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='976543938815-j2pl1npm86hb9ogioj3cmmbd36cv1ffl.apps.googleusercontent.com'>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </GoogleOAuthProvider>
)
