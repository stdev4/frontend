import { createFileRoute } from '@tanstack/react-router'
import { ChatWithScientistPage } from '../../pages/ChatWithScientistPage'
import { SCIENTISTS } from '../../constants/scientists'
import type { ScientistId } from '../../constants/scientists'

export const Route = createFileRoute('/chat/$scientist')({
  component: ChatWithScientistPage,
  parseParams: (params): { scientist: ScientistId } => {
    const scientistId = params.scientist as ScientistId
    if (!SCIENTISTS.find(s => s.id === scientistId)) {
      throw new Error(`Invalid scientist ID: ${scientistId}`)
    }
    return { scientist: scientistId }
  },
})
