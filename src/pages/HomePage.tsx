import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import DailyQuiz from '@/components/home/DailyQuiz'
import DailyVoca from '@/components/home/DailyVoca'

export default function HomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (!userInfo) {
      navigate({ to: '/signin' })
    }
  }, [navigate])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">안녕하세요, 홍길동님!</h1>
      <DailyQuiz />
      <DailyVoca />
    </div>
  )
}
