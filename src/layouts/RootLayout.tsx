import { useLocation } from '@tanstack/react-router'
import { Navbar } from '../components/layout/Navbar'
import { cn } from '../lib/utils'
import { type PropsWithChildren } from 'react'

export function RootLayout({ children }: PropsWithChildren) {
  const location = useLocation()
  const isChatPage = location.pathname.startsWith('/chat/')

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="relative mx-auto h-full min-h-dvh max-w-md bg-white shadow-xl">
        <div className={cn('mx-auto max-w-3xl', isChatPage ? '' : 'p-4 pb-18')}>
          {children}
        </div>
      </main>
      {!isChatPage && <Navbar />}
    </div>
  )
}
