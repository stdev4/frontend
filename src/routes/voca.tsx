import { createFileRoute, Outlet, useMatches } from '@tanstack/react-router'
import { VocaPage } from '../pages/VocaPage'

export const Route = createFileRoute('/voca')({
  component: () => {
    const matches = useMatches()
    const isChildRoute = matches.length > 2 // root와 voca를 제외한 추가 라우트가 있는지 확인

    if (isChildRoute) {
      return <Outlet />
    }

    return <VocaPage />
  },
})
