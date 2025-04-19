import DailyQuiz from '@/components/home/DailyQuiz'
import DailyVoca from '@/components/home/DailyVoca'

export function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">안녕하세요, 홍길동님!</h1>
      <DailyQuiz />
      <DailyVoca />
    </div>
  )
}
