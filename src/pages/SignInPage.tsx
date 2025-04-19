import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function SignInPage() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-8 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Q-SCIEN</h1>
        <p className="mt-2 text-gray-500">과학 퀴즈로 배우는 즐거움</p>
      </div>

      <Button size="lg" onClick={() => navigate({ to: '/onboarding' })}>
        시작하기
      </Button>
    </div>
  )
}
