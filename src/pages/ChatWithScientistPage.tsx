import { useState, useMemo } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ChatBubble from '@/components/composites/ChatBubble'
import { ChevronLeft } from 'lucide-react'
import { useChatApi } from '@/hooks/api'
import { SCIENTISTS } from '@/constants/scientists'

interface Message {
  id: number
  content: string
  isUser: boolean
  timestamp: string
  avatarUrl?: string
  avatarFallback?: string
}

export function ChatWithScientistPage() {
  const { scientist: scientistId } = useParams({ from: '/chat/$scientist' })
  const navigate = useNavigate()
  const { sendMessage, isLoading } = useChatApi(scientistId)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: '안녕하세요! 과학에 대해 궁금한 점이 있으신가요?',
      isUser: false,
      timestamp: '10:00',
      avatarUrl: SCIENTISTS.find(s => s.id === scientistId)?.image,
      avatarFallback: 'AI',
    },
  ])
  const [input, setInput] = useState('')

  const scientist = useMemo(
    () => SCIENTISTS.find(s => s.id === scientistId),
    [scientistId]
  )

  if (!scientist) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-red-500">
          존재하지 않는 과학자입니다.
        </h2>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => navigate({ to: '/chat' })}
        >
          돌아가기
        </Button>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      content: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setMessages([...messages, newMessage])
    setInput('')

    try {
      const response = await sendMessage(input)
      const aiMessage: Message = {
        id: messages.length + 2,
        content: response.answer,
        isUser: false,
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        avatarUrl: '/avatars/einstein.jpg',
        avatarFallback: 'AI',
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('메시지 전송 실패:', error)
      const errorMessage: Message = {
        id: messages.length + 2,
        content: '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        avatarUrl: '/avatars/einstein.jpg',
        avatarFallback: 'AI',
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center justify-between border-b p-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => navigate({ to: '/chat' })}
        >
          <ChevronLeft />
        </Button>
        <h2 className="text-center text-2xl font-bold">{scientist.name}</h2>
        <span className="w-[32px]"></span>
      </header>

      <div className="mb-auto space-y-4 overflow-y-auto p-4">
        {messages.map(message => (
          <ChatBubble
            key={message.id}
            message={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
            avatarUrl={message.avatarUrl}
            avatarFallback={message.avatarFallback}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '전송 중...' : '전송'}
          </Button>
        </div>
      </form>
    </div>
  )
}
