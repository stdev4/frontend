import BigButton from '@/components/ui/big-button'

export function QuizPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">과학 퀴즈</h1>

      <div className="flex flex-col gap-4">
        <BigButton
          title="랜덤 퀴즈"
          description="랜덤으로 퀴즈가 제공됩니다. "
          to="/quiz/random"
        />
        <BigButton
          title="관심 분야"
          description="관심 분야에 맞는 퀴즈가 제공됩니다. "
          to="/quiz/interest"
        />
      </div>
    </div>
  )
}
