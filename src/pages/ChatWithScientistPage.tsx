import { useParams } from '@tanstack/react-router'

export function ChatWithScientistPage() {
  const { scientist } = useParams({ from: '/chat/$scientist' })
  return (
    <>
      <h1>ChatWithScientistPage</h1>
      <h2>{scientist}</h2>
    </>
  )
}