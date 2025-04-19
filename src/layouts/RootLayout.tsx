import { Outlet } from '@tanstack/react-router'
import { Navbar } from '../components/layout/Navbar'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="relative mx-auto h-full min-h-dvh max-w-md bg-white pb-16 shadow-xl">
        <div className="mx-auto max-w-3xl p-4">
          <Outlet />
        </div>
      </main>
      <Navbar />
    </div>
  )
}
