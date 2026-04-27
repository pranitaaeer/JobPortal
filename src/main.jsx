import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'
 import { dark, shadcn } from '@clerk/ui/themes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider appearance={{
     theme: dark,
   }}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)