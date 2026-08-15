import { createHashRouter } from 'react-router-dom'
import { RootLayout } from '@/shell/RootLayout'
import { HomePage } from '@/pages/home/HomePage'
import { ProjectPage } from '@/pages/project/ProjectPage'
import { AboutPage } from '@/pages/about/AboutPage'
import { CvPage } from '@/pages/cv/CvPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { RouteError } from './RouteError'

/**
 * SPA data router. Top-level pages are imported eagerly (they're tiny); the
 * heavy per-project demos are what's code-split, inside ProjectPage.
 */
// Hash routing keeps deep links working on GitHub Pages project sites without
// a 404.html fallback — the path lives in the URL fragment, so every route is
// served by the same index.html.
export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects/:slug', element: <ProjectPage /> },
      // Renders the vendored jcdbautista/cv export (public/cv/) inside the shell.
      { path: 'cv', element: <CvPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
