import { createFileRoute } from '@tanstack/react-router'
import { InterestQuizPage } from '../../pages/InterestQuizPage'

export const Route = createFileRoute('/quiz/interest')({
  component: InterestQuizPage,
})
