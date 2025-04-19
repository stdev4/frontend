import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Quiz, QuizResponse } from '@/types/quiz'
import { Circle, X } from 'lucide-react'
import { useState } from 'react'
import character from '@/assets/character.png'

interface QuizCardProps {
  question: Quiz
  onSubmit: () => Promise<QuizResponse>
  isLoading: boolean
  onNext: () => void
  isLast: boolean
}

export default function QuizCardWithCharacter({
  question,
  onSubmit,
  isLoading,
  onNext,
  isLast,
}: QuizCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [, setUserAnswer] = useState<boolean | null>(null)
  const [result, setResult] = useState<QuizResponse | null>(null)

  const handleAnswer = async (answer: boolean) => {
    try {
      setUserAnswer(answer)
      const response = await onSubmit()
      setResult(response)
      setIsFlipped(true)
    } catch (error) {
      console.error('Failed to submit answer:', error)
    }
  }

  const handleNext = () => {
    onNext()
    setIsFlipped(false)
    setUserAnswer(null)
    setResult(null)
  }

  return (
    <div className="relative h-[400px] w-full max-w-2xl">
      <div className="flex h-[100px] w-full gap-4">
        <div className="h-full w-1/2 overflow-hidden">
          <img src={character} className="object-cover" alt="character" />
        </div>
        <div className="h-full w-full rounded-tl-full rounded-r-full border" />
      </div>
      <div
        className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* 앞면 - 질문과 O/X 선택 */}
        <Card className="absolute flex h-full w-full flex-col [backface-visibility:hidden] ">
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
            result?.answer
              ? 'bg-green-50 dark:bg-green-950'
              : 'bg-red-50 dark:bg-red-950'
          }`}
        >
          <CardHeader>
            <div className="text-sm text-gray-500">{question.field}</div>
            <div className="flex items-center justify-center">
              {result?.answer ? (
                <Circle className="h-12 w-12 text-green-600" />
              ) : (
                <X className="h-12 w-12 text-red-600" />
              )}
            </div>
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
