import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'

interface VocaCardProps {
  term: {
    termId: number
    name: string
    description: string
    field: string[]
  }
}

export default function VocaCard({ term }: VocaCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="relative h-[200px] w-full max-w-2xl">
      <div
        className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* 앞면 - 용어 */}
        <Card
          className="absolute flex h-full w-full flex-col [backface-visibility:hidden]"
          onClick={handleFlip}
        >
          <CardHeader>
            <div className="text-sm text-gray-500">#{term.field}</div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <CardTitle className="text-xl">{term.name}</CardTitle>
          </CardContent>
        </Card>

        {/* 뒷면 - 설명 */}
        <Card
          className="absolute flex h-full w-full [transform:rotateY(180deg)] flex-col [backface-visibility:hidden]"
          onClick={handleFlip}
        >
          <CardHeader>
            <CardTitle className="text-xl">{term.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between">
            <div className="text-gray-600">{term.description}</div>
            <div className="flex justify-end">
              <Link to="/voca/$termId" params={{ termId: String(term.termId) }}>
                <Button variant="outline">뜻 보기</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
