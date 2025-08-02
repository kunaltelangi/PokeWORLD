import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: 1,
      staleTime: 1000 * 60 * 5,   // 5 minutes
      cacheTime: 1000 * 60 * 30   // 30 minutes
    }
  }
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
)
