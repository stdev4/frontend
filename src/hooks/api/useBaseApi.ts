import { useState, useCallback } from 'react'

const API_BASE_URL = import.meta.env.PROD
  ? 'https://stdev4.o-r.kr'
  : 'http://localhost:5173'

export function useBaseApi<T>() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const fetchData = useCallback(
    async (endpoint: string, options: RequestInit = {}) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setData(data)
        return data
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return {
    fetchData,
    isLoading,
    error,
    data,
  }
}
