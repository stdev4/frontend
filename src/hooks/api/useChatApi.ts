import { useState, useCallback } from 'react'

const CHAT_API_URL =
  'https://bpuc04hvy9.execute-api.ap-northeast-2.amazonaws.com/dev/chat'

export function useChatApi() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const sendMessage = useCallback(async (question: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'))
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    sendMessage,
    isLoading,
    error,
  }
}
