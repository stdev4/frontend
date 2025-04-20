import { useCallback } from 'react'
import { useBaseApi } from './useBaseApi'
import type {
  Quiz,
  QuizSubmitRequest,
  CustomQuizRequest,
  QuizResponse,
  ApiResponse,
} from '../../types/api'

export function useQuizApi() {
  const { fetchData: fetchQuizList, ...rest } = useBaseApi<ApiResponse<Quiz>>()
  const { fetchData: fetchQuizResponse } = useBaseApi<QuizResponse>()

  const getDailyQuiz = useCallback(
    (userId: number) => fetchQuizList(`/quiz/daily?userId=${userId}`),
    [fetchQuizList]
  )
  const getInterestQuiz = useCallback(
    (userId: number) => fetchQuizList(`/quiz/interest?userId=${userId}`),
    [fetchQuizList]
  )
  const getRandomQuiz = useCallback(
    (userId: number) => fetchQuizList(`/quiz/random?userId=${userId}`),
    [fetchQuizList]
  )
  const submitQuiz = useCallback(
    (body: QuizSubmitRequest) =>
      fetchQuizResponse('/quiz/submit', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    [fetchQuizResponse]
  )
  const createCustomQuiz = useCallback(
    (body: CustomQuizRequest) =>
      fetchQuizResponse('/quiz/custom/new', {
        method: 'POST',
        body: JSON.stringify(body),
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
