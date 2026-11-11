import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { personal } from './data/personal'

const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        window.requestAnimationFrame(() =>
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }),
        )
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default function App() {
  useEffect(() => {
    document.title = `${personal.name} — ${personal.title}`
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="relative min-h-screen bg-ink-800">
        <ScrollManager />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-flame-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main">
          <Suspense
            fallback={
              <div className="grid min-h-[70vh] place-items-center">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-flame-500" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </LazyMotion>
  )
}
