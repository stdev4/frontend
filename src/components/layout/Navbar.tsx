import { Link, useLocation } from '@tanstack/react-router'

export function Navbar() {
  const location = useLocation()
  const currentPath = location.pathname

  const navItems = [
    { path: '/', label: '홈' },
    { path: '/quiz', label: '퀴즈' },
    { path: '/voca', label: '단어장' },
    { path: '/mypage', label: '마이페이지' },
  ]

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 mx-auto flex h-16 max-w-md items-center justify-around border-t bg-white px-2">
      <div className="flex">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex w-[6rem] items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${
              currentPath === item.path
                ? 'bg-secondary text-secondary-foreground'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
