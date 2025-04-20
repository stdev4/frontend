import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Quiz } from '@/types/quiz'
import { Circle, HelpCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import character from '@/assets/character.png'

interface QuizCardProps {
  question: Quiz
  onSubmit: (answer: boolean) => Promise<{
    answer: boolean
    explanationTitle: string
    explanationBody: string
    correctRate: number
  }>
  isLoading: boolean
  onNext: () => void
  isLast: boolean
  result?: {
    answer: boolean
    explanationTitle: string
    explanationBody: string
    correctRate: number
  }
}

export default function QuizCardWithCharacter({
  question,
  onSubmit,
  isLoading,
  onNext,
  isLast,
  result,
}: QuizCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (isFlipped) {
      const timer = setTimeout(() => {
        setShowResult(true)
      }, 500) // 카드가 완전히 뒤집히는 시간과 동일하게 설정
      return () => clearTimeout(timer)
    } else {
      setShowResult(false)
    }
  }, [isFlipped])

  const handleAnswer = async (answer: boolean) => {
    try {
      await onSubmit(answer)
      setIsFlipped(true)
    } catch (error) {
      console.error('Failed to submit answer:', error)
    }
  }

  const handleNext = () => {
    onNext()
    setIsFlipped(false)
  }

  return (
    <div className="relative h-[400px] w-full max-w-2xl">
      <div className="flex h-[100px] w-full gap-4">
        <div className="h-full w-1/2 overflow-hidden">
          <img src={character} className="object-cover" alt="character" />
        </div>
        <div className="flex h-full w-full items-center justify-center rounded-tl-full rounded-r-full border">
          {isFlipped && result ? (
            result.answer ? (
              <div className="flex flex-col items-center justify-center text-green-600">
                <Circle className="h-12 w-12" />
                <p>정답입니다!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-red-600">
                <X className="h-12 w-12" />
                <p>오답입니다!</p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <HelpCircle className="h-12 w-12" />
              <p>정답은?</p>
            </div>
          )}
        </div>
      </div>
      <div
        className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* 앞면 - 질문과 O/X 선택 */}
        <Card className="absolute flex h-full w-full flex-col [backface-visibility:hidden]">
          <CardHeader>
            <div className="text-sm text-gray-500">{question.field}</div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col items-center justify-center gap-8">
            <h2 className="text-xl font-bold">{question.question}</h2>
            {!isFlipped && (
              <div className="flex w-full gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => handleAnswer(true)}
                  disabled={isLoading}
                >
                  O
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => handleAnswer(false)}
                  disabled={isLoading}
                >
                  X
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 뒷면 - 결과, 해설, 통계 */}
        <Card
          className={`absolute flex h-full w-full [transform:rotateY(180deg)] flex-col [backface-visibility:hidden] ${
            showResult && result?.answer
              ? 'bg-green-50 dark:bg-green-950'
              : showResult && !result?.answer
                ? 'bg-red-50 dark:bg-red-950'
                : ''
          }`}
        >
          <CardHeader>
            <div className="text-sm text-gray-500">{question.field}</div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between">
            <div className="space-y-4">
              <div className="text-lg font-semibold">
                {result?.explanationTitle}
              </div>
              <div className="text-gray-600">{result?.explanationBody}</div>
              <div className="text-sm text-gray-500">
                사용자의 {result?.correctRate}%가 정답을 맞췄어요.
              </div>
              <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{
                    width: `${result?.correctRate}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" onClick={handleNext}>
                {isLast ? '완료' : '다음 문제'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
