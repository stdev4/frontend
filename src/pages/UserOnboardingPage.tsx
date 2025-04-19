import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserApi, type UserOnboardingRequest } from '@/hooks/api/useUserApi'
import { INTEREST_LIST, InterestKey } from '@/constants/interests'

interface UserInfo {
  username: string
  nickname: string
  interest: InterestKey
  password: string
  age: number
}

interface UserInfoErrors {
  username?: string
  nickname?: string
  interest?: string
  password?: string
  age?: string
}

export default function UserOnboardingPage() {
  const navigate = useNavigate()
  const { saveUserInfo, checkNicknameExists } = useUserApi()
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '',
    nickname: '',
    interest: 'OTHERS',
    password: '',
    age: 0,
  })
  const [errors, setErrors] = useState<UserInfoErrors>({})
  const [isNicknameChecking, setIsNicknameChecking] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 유효성 검사
    const newErrors: UserInfoErrors = {}
    if (!userInfo.username) newErrors.username = '아이디를 입력해주세요'
    if (!userInfo.nickname) newErrors.nickname = '닉네임을 입력해주세요'
    if (!userInfo.password) newErrors.password = '비밀번호를 입력해주세요'
    if (userInfo.age < 1) newErrors.age = '나이를 입력해주세요'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      // API 호출
      const request: UserOnboardingRequest = {
        username: userInfo.username,
        nickname: userInfo.nickname,
        age: Number(userInfo.age),
        password: userInfo.password,
        interest: userInfo.interest,
      }
      await saveUserInfo(request)

      // 로컬 스토리지에 저장
      localStorage.setItem('userInfo', JSON.stringify(userInfo))

      // 홈 페이지로 이동
      navigate({ to: '/' })
    } catch (error) {
      console.error('Error saving user info:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleCheckNickname = async () => {
    if (!userInfo.nickname) {
      setErrors(prev => ({ ...prev, nickname: '닉네임을 입력해주세요' }))
      return
    }

    setIsNicknameChecking(true)
    try {
      const exists = await checkNicknameExists(userInfo.nickname)
      if (exists) {
        setErrors(prev => ({
          ...prev,
          nickname: '이미 사용 중인 닉네임입니다',
        }))
      } else {
        setErrors(prev => ({ ...prev, nickname: undefined }))
      }
    } catch (error) {
      console.error('Error checking nickname:', error)
      setErrors(prev => ({
        ...prev,
        nickname: '닉네임 확인 중 오류가 발생했습니다',
      }))
    } finally {
      setIsNicknameChecking(false)
    }
  }

  const handleInterestChange = (interest: InterestKey) => {
    setUserInfo(prev => ({
      ...prev,
      interest,
    }))
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <h1 className="text-2xl font-bold">프로필 설정</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">아이디</Label>
          <Input
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
            placeholder="아이디를 입력하세요"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nickname">닉네임</Label>
          <div className="flex gap-2">
            <Input
              id="nickname"
              name="nickname"
              value={userInfo.nickname}
              onChange={handleInputChange}
              placeholder="닉네임을 입력하세요"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleCheckNickname}
              disabled={isNicknameChecking}
            >
              {isNicknameChecking ? '확인 중...' : '중복 확인'}
            </Button>
          </div>
          {errors.nickname && (
            <p className="text-sm text-red-500">{errors.nickname}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={userInfo.password}
            onChange={handleInputChange}
            placeholder="비밀번호를 입력하세요"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">나이</Label>
          <Input
            id="age"
            name="age"
            type="number"
            min="1"
            max="99"
            value={userInfo.age}
            onChange={handleInputChange}
            placeholder="나이를 입력하세요"
          />
          {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
        </div>

        <div className="space-y-2">
          <Label>관심사</Label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_LIST.map(({ key, value }) => (
              <Button
                key={key}
                type="button"
                variant={userInfo.interest === key ? 'default' : 'outline'}
                onClick={() => handleInterestChange(key)}
              >
                {value}
              </Button>
            ))}
          </div>
          {errors.interest && (
            <p className="text-sm text-red-500">{errors.interest}</p>
          )}
        </div>

        <Button type="submit" className="mt-20 w-full">
          저장하기
        </Button>
      </form>
    </div>
  )
}
