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

const vocaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/voca',
  component: VocaPage,
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
  myPageRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
