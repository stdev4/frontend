import { createFileRoute } from '@tanstack/react-router'
import UserOnboardingPage from '../pages/UserOnboardingPage'

export const Route = createFileRoute('/onboarding')({
  component: UserOnboardingPage,
})
