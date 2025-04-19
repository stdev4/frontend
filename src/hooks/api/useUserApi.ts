import { useCallback } from 'react'
import { useBaseApi } from './useBaseApi'
import type { User, UserOnboardingRequest } from '../../types/api'

export function useUserApi() {
  const { fetchData, ...rest } = useBaseApi<User>()

  const saveUserInfo = useCallback(
    (body: UserOnboardingRequest) =>
      fetchData('/user/onboarding/save', {
        method: 'POST',
        body: body as unknown as Record<string, unknown>,
      }),
    [fetchData]
  )

  const updateUserInfo = useCallback(
    (userId: number, body: UserOnboardingRequest) =>
      fetchData(`/user/${userId}/update`, {
        method: 'PUT',
        body: body as unknown as Record<string, unknown>,
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
