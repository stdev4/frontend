import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { RootLayout } from './layouts/RootLayout'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'
import { VocaPage } from './pages/VocaPage'
import { MyPage } from './pages/MyPage'
import { RandomQuizPage } from './pages/RandomQuizPage'
import { ChatPage } from './pages/ChatPage'
import { InterestQuizPage } from './pages/InterestQuizPage'
import VocaDetailPage from './pages/VocaDetailPage'
import { ChatWithScientistPage } from './pages/ChatWithScientistPage'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz',
  component: QuizPage,
})

const randomQuizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz/random',
  component: RandomQuizPage,
})

const interestQuizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz/interest',
  component: InterestQuizPage,
})

const vocaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/voca',
  component: VocaPage,
})

const vocaDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/voca/$termId',
  component: VocaDetailPage,
})

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: ChatPage,
})

const chatWithScientistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat/$scientist',
  component: ChatWithScientistPage,
})

const myPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mypage',
  component: MyPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  quizRoute,
  vocaRoute,
  vocaDetailRoute,
  chatRoute,
  myPageRoute,
  randomQuizRoute,
  interestQuizRoute,
  chatWithScientistRoute
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
