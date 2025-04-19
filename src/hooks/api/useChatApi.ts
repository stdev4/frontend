import { useState, useCallback } from 'react'
import { ScientistId } from '@/constants/scientists'

const CHAT_API_URLS: Record<ScientistId, string> = {
  curie: 'https://bpuc04hvy9.execute-api.ap-northeast-2.amazonaws.com/dev/chat',
  newton:
    'https://145ma4t1yk.execute-api.ap-northeast-2.amazonaws.com/dev/chat',
  einstein:
    'https://4lik3d8wb1.execute-api.ap-northeast-2.amazonaws.com/dev/chat',
}

export function useChatApi(scientistId: ScientistId) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const sendMessage = useCallback(
    async (question: string) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(CHAT_API_URLS[scientistId], {
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
    },
    [scientistId]
  )

  return {
    sendMessage,
    isLoading,
    error,
  }
}
