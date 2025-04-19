export interface Quiz {
  quizId: number
  question: string
  field: string[]
  createdAt: string
}

export interface QuizResponse {
  answer: boolean
  explanationTitle: string
  explanationBody: string
  correctRate: number
}
