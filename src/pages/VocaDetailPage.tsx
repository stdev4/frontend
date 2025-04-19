import { useParams } from '@tanstack/react-router'
import termData from '@/mocks/term.json'

export default function VocaDetailPage() {
  const { termId } = useParams({ from: '/voca/$termId' })
  const term = termData.data.terms.find(t => t.termId === Number(termId))

  if (!term) return <div>단어를 찾을 수 없습니다.</div>

  return (
    <div className="space-y-4 p-4">
      <div className="text-sm text-gray-500">#{term.field}</div>
      <h1 className="text-2xl font-bold">{term.name}</h1>
      <div className="text-gray-600">{term.description}</div>
      {/* chatbot ui */}
    </div>
  )
}
