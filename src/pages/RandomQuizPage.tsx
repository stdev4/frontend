'use client'

import QuizCardWithCharacter from '@/components/composites/QuizCardWithCharacter'
import { useQuizApi } from '@/hooks/api/useQuizApi'
import quizData from '@/mocks/quiz.json'
import type { QuizResponse } from '@/types/quiz'
import { useState } from 'react'

export function RandomQuizPage() {
  const { submitQuiz } = useQuizApi()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading] = useState(false)
  const [, setResults] = useState<QuizResponse[]>([])

  const quizzes = quizData.randomQuiz.data

  const handleSubmit = async (): Promise<QuizResponse> => {
    const currentQuiz = quizzes[currentIndex]
    const response = (await submitQuiz({
      userId: 1,
      quizId: currentQuiz.quizId,
      answer: true, // 임시로 true로 설정
    })) as unknown as QuizResponse
    setResults(prev => [...prev, response])
    return response
  }

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  if (!quizzes.length) {
    return <div>No quizzes available</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">랜덤 퀴즈</h1>

      {/* 진행 상황 표시 */}
      <div className="flex justify-center gap-2">
        {quizzes.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-8 rounded-full ${
              index === currentIndex
                ? 'bg-primary'
                : index < currentIndex
                  ? 'bg-green-500'
                  : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* 현재 퀴즈 카드 */}
      <QuizCardWithCharacter
        question={quizzes[currentIndex]}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onNext={handleNext}
        isLast={currentIndex === quizzes.length - 1}
      />
    </div>
  )
}
