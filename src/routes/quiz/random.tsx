import { createFileRoute } from '@tanstack/react-router'
import { RandomQuizPage } from '../../pages/RandomQuizPage'

export const Route = createFileRoute('/quiz/random')({
  component: RandomQuizPage,
})
