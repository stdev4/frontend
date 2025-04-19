import termData from '@/mocks/term.json'
import VocaCard from '@/components/composites/VocaCard'
export function VocaPage() {
  const terms = termData.data.terms

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">단어장</h1>
      {terms.map((term) => (
        <VocaCard key={term.termId} term={term} />
      ))}
    </div>
  )
}
