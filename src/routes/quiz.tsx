import { createFileRoute, Outlet, useMatches } from '@tanstack/react-router'
import { QuizPage } from '../pages/QuizPage'

export const Route = createFileRoute('/quiz')({
  component: () => {
    const matches = useMatches()
    const isChildRoute = matches.length > 2 // root와 quiz를 제외한 추가 라우트가 있는지 확인

    if (isChildRoute) {
      return <Outlet />
    }

    return <QuizPage />
  },
})
