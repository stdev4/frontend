'use client'

import quizData from '@/mocks/quiz.json'
import type { QuizResponse } from '@/types/quiz'
import { useState } from 'react'
import QuizCard from '../composites/QuizCard'

export default function DailyQuiz() {
  const [isLoading, setIsLoading] = useState(false)
  const currentQuestion = quizData.dailyQuiz.data[0]

  const handleSubmit = async (): Promise<QuizResponse> => {
    try {
      setIsLoading(true)
      // 임시로 mock 응답을 사용
      await new Promise(resolve => setTimeout(resolve, 1000)) // 로딩 효과를 위한 딜레이
      return quizData.submitResponse.data
    } catch (error) {
      console.error('Failed to submit answer:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold">오늘의 퀴즈</h2>
      <QuizCard
        question={currentQuestion}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  )
}
