import { useNavigate, useParams } from '@tanstack/react-router'
import termData from '@/mocks/term.json'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function VocaDetailPage() {
  const navigate = useNavigate()
  const { termId } = useParams({ from: '/voca/$termId' })
  const term = termData.data.terms.find(t => t.termId === Number(termId))

  if (!term) return <div>단어를 찾을 수 없습니다.</div>

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between border-b">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => navigate({ to: '/voca' })}
        >
          <ChevronLeft />
        </Button>
      </header>
      <div className="text-sm text-gray-500">#{term.field}</div>
      <h1 className="text-2xl font-bold">{term.name}</h1>
      <div className="text-gray-600">{term.description}</div>
      {/* chatbot ui */}
    </div>
  )
}
