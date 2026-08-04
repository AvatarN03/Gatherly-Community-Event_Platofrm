import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/react'
import { dark } from "@clerk/themes";

import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient();
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <ClerkProvider publishableKey={clerkPubKey}
      afterSignOutUrl="/"
      appearance={{
        theme: dark,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>

    </ClerkProvider>

  </StrictMode>,
)
