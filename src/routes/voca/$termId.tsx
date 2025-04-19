import { createFileRoute } from '@tanstack/react-router'
import VocaDetailPage from '../../pages/VocaDetailPage'

export const Route = createFileRoute('/voca/$termId')({
  component: VocaDetailPage,
  parseParams: params => {
    const termId = Number(params.termId)
    if (isNaN(termId)) {
      throw new Error(`Invalid term ID: ${params.termId}`)
    }
    return { termId }
  },
})
