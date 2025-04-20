'use client'

import QuizCardWithCharacter from '@/components/composites/QuizCardWithCharacter'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import quizData from '@/mocks/quiz.json'
import { useState } from 'react'

export function RandomQuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<
    Array<{
      answer: boolean
      explanationTitle: string
      explanationBody: string
      correctRate: number
    }>
  >([])
  const [isCompleted, setIsCompleted] = useState(false)

  const quizzes = quizData.randomQuiz.data

  const handleSubmit = async (answer: boolean) => {
    setIsLoading(true)
    const currentQuiz = quizzes[currentIndex]
    // API 통신 대신 mock 데이터 사용
    const response = {
      answer,
      explanationTitle: currentQuiz.explanationTitle,
      explanationBody: currentQuiz.explanationBody,
      correctRate: Math.floor(Math.random() * 100),
    }

    setResults(prev => [...prev, response])
    setIsLoading(false)
    return response
  }

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setResults([])
    setIsCompleted(false)
  }

  if (!quizzes.length) {
    return <div>퀴즈가 없습니다</div>
  }

  if (isCompleted) {
    const correctCount = results.filter(result => result.answer).length
    const totalCount = results.length
    const correctRate = Math.round((correctCount / totalCount) * 100)

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">퀴즈 결과</h1>
        <Card className="max-w-2xl">
          <CardHeader>
            <div className="text-2xl font-bold">
              총 {totalCount}문제 중 {correctCount}문제 정답!
            </div>
            <div className="text-sm text-gray-500">정답률: {correctRate}%</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-4 ${
                    result.answer
                      ? 'bg-green-50 dark:bg-green-950'
                      : 'bg-red-50 dark:bg-red-950'
                  }`}
                >
                  <div className="font-semibold">문제 {index + 1}</div>
                  <div className="text-sm text-gray-600">
                    {quizzes[index].question}
                  </div>
                  <div className="mt-2 text-sm">
                    {result.answer ? '정답!' : '오답'}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button onClick={handleRestart}>다시 풀기</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
        result={results[currentIndex]}
      />
    </div>
  )
}
