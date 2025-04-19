import { useState } from 'react'
import type {
  ApiResponse,
  Badge,
  CustomQuizRequest,
  Quiz,
  QuizResponse,
  QuizSubmitRequest,
  Term,
  User,
  UserOnboardingRequest,
} from '../types/api'

const API_BASE_URL = '/api'

interface UseApiOptions {
  method?: 'GET' | 'POST' | 'PUT'
  headers?: Record<string, string>
}

export function useApi() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async <T>(
    endpoint: string,
    options: UseApiOptions = {},
    body?: unknown
  ): Promise<T> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<T> = await response.json()
      return result.data
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    fetchData,
  }
}

// 퀴즈 관련 훅
export function useQuizApi() {
  const { fetchData, ...rest } = useApi()

  return {
    ...rest,
    getDailyQuiz: () => fetchData<Quiz[]>('/quiz/daily'),
    getInterestQuiz: (userId: number) =>
      fetchData<Quiz[]>(`/quiz/interest?user_id=${userId}`),
    getRandomQuiz: (userId: number) =>
      fetchData<Quiz[]>(`/quiz/random?user_id=${userId}`),
    submitQuiz: (body: QuizSubmitRequest) =>
      fetchData<QuizResponse>('/quiz/submit', { method: 'POST' }, body),
    createCustomQuiz: (body: CustomQuizRequest) =>
      fetchData('/quiz/custom/new', { method: 'POST' }, body),
  }
}

// 사용자 관련 훅
export function useUserApi() {
  const { fetchData, ...rest } = useApi()

  return {
    ...rest,
    saveUserInfo: (body: UserOnboardingRequest) =>
      fetchData<User>('/user/onboarding/save', { method: 'POST' }, body),
    updateUserInfo: (userId: number, body: UserOnboardingRequest) =>
      fetchData<User>(`/user/${userId}/update`, { method: 'PUT' }, body),
    checkNicknameExists: (nickname: string) =>
      fetchData<boolean>(`/user/onboarding/nickname/${nickname}/exists`),
    checkUsernameExists: (username: string) =>
      fetchData<boolean>(`/user/onboarding/username/${username}/exists`),
  }
}

// 용어장 관련 훅
export function useTermApi() {
  const { fetchData, ...rest } = useApi()

  return {
    ...rest,
    getTermList: () => fetchData<{ terms: Term[] }>('/term/list'),
  }
}

// 뱃지 관련 훅
export function useBadgeApi() {
  const { fetchData, ...rest } = useApi()

  return {
    ...rest,
    getUserBadges: (userId: number) =>
      fetchData<{ badges: Badge[] }>(`/user/${userId}/badge`),
    addNewBadge: (userId: number, badgeName: string) =>
      fetchData(`/user/${userId}/badge/new?kind=${badgeName}`, {
        method: 'POST',
      }),
  }
}
