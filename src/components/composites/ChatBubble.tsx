import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface ChatBubbleProps {
  message: string | { response: string }
  isUser: boolean
  timestamp?: string
  avatarUrl?: string
  avatarFallback?: string
}

export default function ChatBubble({
  message,
  isUser,
  timestamp,
  avatarUrl,
  avatarFallback,
}: ChatBubbleProps) {
  const displayMessage =
    typeof message === 'string' ? message : message.response

  return (
    <div
      className={cn(
        'flex w-full gap-2',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}
      >
        <p className="text-sm">{displayMessage}</p>
        {timestamp && (
          <p
            className={cn(
              'mt-1 text-xs',
              isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
            )}
          >
            {timestamp}
          </p>
        )}
      </div>
    </div>
  )
}
