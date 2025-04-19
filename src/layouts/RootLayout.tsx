import { Outlet, useLocation } from '@tanstack/react-router'
import { Navbar } from '../components/layout/Navbar'
import { cn } from '../lib/utils'

export function RootLayout() {
  const location = useLocation()
  const isChatPage = location.pathname.startsWith('/chat/')

  return (
    <div className="min-h-screen bg-gray-50">
      <main
        className={cn(
          'relative mx-auto h-full min-h-dvh max-w-md bg-white shadow-xl'
        )}
      >
        <div className={cn('mx-auto max-w-3xl', isChatPage ? '' : 'p-4 pb-18')}>
          <Outlet />
        </div>
      </main>
      {!isChatPage && <Navbar />}
    </div>
  )
}
