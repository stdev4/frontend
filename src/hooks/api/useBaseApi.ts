import { useState, useCallback } from 'react'
import type { ApiResponse } from '../../types/api'

const API_BASE_URL = '/api'

interface UseApiOptions {
  method?: 'GET' | 'POST' | 'PUT'
  headers?: Record<string, string>
  body?: Record<string, unknown>
}

export function useBaseApi<T>() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const fetchData = useCallback(
    async (endpoint: string, options: UseApiOptions = {}) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          ...(options.body && { body: JSON.stringify(options.body) }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result: ApiResponse<T> = await response.json()
        setData(result.data)
        return result.data
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('An error occurred')
        setError(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return {
    isLoading,
    error,
    data,
    fetchData,
  }
}
