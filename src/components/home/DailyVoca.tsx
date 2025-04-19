import VocaCard from '../composites/VocaCard'
import termData from '@/mocks/term.json'

export default function DailyVoca() {
  const currentVoca = termData.data.terms[0]

  return (
    <>
      <h2 className="text-2xl font-bold">오늘의 과학 단어</h2>
      <VocaCard term={currentVoca} />
    </>
  )
}
