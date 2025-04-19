import { useCallback } from 'react'
import { useBaseApi } from './useBaseApi'
import type { Badge } from '../../types/api'

export function useBadgeApi() {
  const { fetchData, ...rest } = useBaseApi<{ badges: Badge[] }>()

  const getUserBadges = useCallback(
    (userId: number) => fetchData(`/user/${userId}/badge`),
    [fetchData]
  )

  const addNewBadge = useCallback(
    (userId: number, badgeName: string) =>
      fetchData(`/user/${userId}/badge/new?kind=${badgeName}`, {
        method: 'POST',
      }),
    [fetchData]
  )

  return {
    ...rest,
    getUserBadges,
    addNewBadge,
  }
}
