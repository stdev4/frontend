import { useCallback } from 'react'
import { useBaseApi } from './useBaseApi'
import type { Term } from '../../types/api'

export function useTermApi() {
  const { fetchData, ...rest } = useBaseApi<{ terms: Term[] }>()

  const getTermList = useCallback(() => fetchData('/term/list'), [fetchData])

  return {
    ...rest,
    getTermList,
  }
}
