import { createFileRoute, Outlet, useMatches } from '@tanstack/react-router'
import { ChatPage } from '../pages/ChatPage'

export const Route = createFileRoute('/chat')({
  component: () => {
    const matches = useMatches()
    const isChildRoute = matches.length > 2 // root와 chat을 제외한 추가 라우트가 있는지 확인

    if (isChildRoute) {
      return <Outlet />
    }

    return <ChatPage />
  },
})
