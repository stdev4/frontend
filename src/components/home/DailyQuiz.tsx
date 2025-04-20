'use client'

import { useState, useEffect } from 'react'
import { useQuizApi } from '@/hooks/api/useQuizApi'
import type { Quiz, QuizResponse, UserInfo } from '@/types/api'
import QuizCard from '../composites/QuizCard'

export default function DailyQuiz() {
  const [isLoading, setIsLoading] = useState(false)
  const { getDailyQuiz, submitQuiz } = useQuizApi()
  const [currentQuestion, setCurrentQuestion] = useState<Quiz | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo) as UserInfo
        setUserInfo(parsedUserInfo)
      } catch (error) {
        console.error('Failed to parse userInfo:', error)
      }
    }
  }, [])

  useEffect(() => {
    const fetchDailyQuiz = async () => {
      if (!userInfo?.userId) return

      try {
        setIsLoading(true)
        const response = await getDailyQuiz(userInfo.userId)
        setCurrentQuestion(response.data)
      } catch (error) {
        console.error('Failed to fetch daily quiz:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDailyQuiz()
  }, [getDailyQuiz, userInfo])

  const handleSubmit = async (answer: boolean): Promise<QuizResponse> => {
    if (!currentQuestion || !userInfo?.userId) {
      throw new Error('Question or User ID is missing')
    }

    try {
      setIsLoading(true)
      const response = await submitQuiz({
        userId: userInfo.userId,
        quizId: currentQuestion.quizId,
        answer,
      })
      return response.data
    } catch (error) {
      console.error('Failed to submit answer:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  if (!userInfo) {
    return <div>사용자 정보가 없습니다. 로그인이 필요합니다.</div>
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
