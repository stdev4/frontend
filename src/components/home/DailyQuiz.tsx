'use client'

import { useState, useEffect } from 'react'
import { useQuizApi } from '@/hooks/api/useQuizApi'
import type { Quiz, QuizResponse } from '@/types/quiz'
import QuizCard from '../composites/QuizCard'

export default function DailyQuiz() {
  const [isLoading, setIsLoading] = useState(false)
  const { getDailyQuiz } = useQuizApi()
  const [currentQuestion, setCurrentQuestion] = useState<Quiz | null>(null)

  useEffect(() => {
    const fetchDailyQuiz = async () => {
      try {
        setIsLoading(true)
        const response = await getDailyQuiz()
        setCurrentQuestion(response.data)
      } catch (error) {
        console.error('Failed to fetch daily quiz:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDailyQuiz()
  }, [getDailyQuiz])

  const handleSubmit = async (): Promise<QuizResponse> => {
    try {
      setIsLoading(true)
      // TODO: submitQuiz API 구현 필요
      return null as unknown as QuizResponse
    } catch (error) {
      console.error('Failed to submit answer:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  if (!currentQuestion) {
    return <div>Loading...</div>
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
