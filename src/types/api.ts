export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

export interface User {
  userId: number
  nickname: string
  interest: string[]
}

export interface Quiz {
  quizId: number
  question: string
  field: string[]
  createdAt: string
  answer?: boolean
  explanationBody?: string
}

export interface Term {
  termId: number
  name: string
  description: string
  field: string[]
}

export interface Scientist {
  name: string
  description: string
  persona: string
}

export interface Badge {
  badgeId?: number
  badgeName: string
  earnedDate?: string
  earnedAt?: string
}

export interface QuizSubmitRequest {
  userId: number
  quizId: number
  answer: boolean
}

export interface QuizResponse {
  answer: boolean
  explanationTitle: string
  explanationBody: string
  correctRate: number
}

export interface CustomQuizRequest {
  userId: number
  question: string
  answer: boolean
  explanationBody: string
  field: string[]
}

export interface UserOnboardingRequest {
  nickname: string
  age: number
  username: string
  password: string
  interest: string[]
}

export interface QuizResponse {
  isCorrect: boolean
  explanation: string
  correctRate: number
  statistics: {
    correctPercentage: number
  }
}

export interface ChatResponse {
  answer: string
  timestamp: string
}
