import { useCallback } from 'react'
import { useBaseApi } from './useBaseApi'
import type {
  Quiz,
  QuizSubmitRequest,
  CustomQuizRequest,
  QuizResponse,
} from '../../types/api'

export function useQuizApi() {
  const { fetchData: fetchQuizList, ...rest } = useBaseApi<Quiz[]>()
  const { fetchData: fetchQuizResponse } = useBaseApi<QuizResponse>()

  const getDailyQuiz = useCallback(
    () => fetchQuizList('/quiz/daily'),
    [fetchQuizList]
  )
  const getInterestQuiz = useCallback(
    (userId: number) => fetchQuizList(`/quiz/interest?user_id=${userId}`),
    [fetchQuizList]
  )
  const getRandomQuiz = useCallback(
    (userId: number) => fetchQuizList(`/quiz/random?user_id=${userId}`),
    [fetchQuizList]
  )
  const submitQuiz = useCallback(
    (body: QuizSubmitRequest) =>
      fetchQuizResponse('/quiz/submit', {
        method: 'POST',
        body: body as unknown as Record<string, unknown>,
      }),
    [fetchQuizResponse]
  )
  const createCustomQuiz = useCallback(
    (body: CustomQuizRequest) =>
      fetchQuizResponse('/quiz/custom/new', {
        method: 'POST',
        body: body as unknown as Record<string, unknown>,
      }),
    [fetchQuizResponse]
  )

  return {
    ...rest,
    getDailyQuiz,
    getInterestQuiz,
    getRandomQuiz,
    submitQuiz,
    createCustomQuiz,
  }
}
