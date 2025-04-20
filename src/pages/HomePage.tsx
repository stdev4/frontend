import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import DailyQuiz from '@/components/home/DailyQuiz'
import DailyVoca from '@/components/home/DailyVoca'
import type { UserInfo } from '@/types/api'

export default function HomePage() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState<string>('')

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (!userInfo) {
      navigate({ to: '/signin' })
      return
    }

    try {
      const parsedUserInfo = JSON.parse(userInfo) as UserInfo
      setNickname(parsedUserInfo.nickname)
    } catch (error) {
      console.error('Failed to parse userInfo:', error)
      navigate({ to: '/signin' })
    }
  }, [navigate])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">안녕하세요, {nickname}님!</h1>
      <DailyQuiz />
      <DailyVoca />
    </div>
  )
}
