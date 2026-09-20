import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import UserProvider from './provider/UserProvider.tsx'
import SystemThemeClerkProvider from './provider/SystemThemeClerkProvider.tsx'
import './index.css'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <SystemThemeClerkProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <App />
        </UserProvider>
      </QueryClientProvider>
    </SystemThemeClerkProvider>

  </StrictMode>,
)
