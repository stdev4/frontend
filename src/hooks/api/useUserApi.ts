import { useCallback } from 'react'
import { useBaseApi } from './useBaseApi'
import type { InterestKey } from '@/constants/interests'

export interface UserOnboardingRequest {
  username: string
  nickname: string
  age: number
  password: string
  interest: InterestKey
}

export function useUserApi() {
  const { fetchData, ...rest } = useBaseApi<UserOnboardingRequest>()

  const saveUserInfo = useCallback(
    (body: UserOnboardingRequest) =>
      fetchData('/user/onboarding/save', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    [fetchData]
  )

  const updateUserInfo = useCallback(
    (userId: number, body: UserOnboardingRequest) =>
      fetchData(`/user/${userId}/update`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    [fetchData]
  )

  const checkNicknameExists = useCallback(
    (nickname: string) =>
      fetchData(`/user/onboarding/nickname/${nickname}/exists`),
    [fetchData]
  )

  const checkUsernameExists = useCallback(
    (username: string) =>
      fetchData(`/user/onboarding/username/${username}/exists`),
    [fetchData]
  )

  return {
    ...rest,
    saveUserInfo,
    updateUserInfo,
    checkNicknameExists,
    checkUsernameExists,
  }
}
