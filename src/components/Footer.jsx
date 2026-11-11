import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, Mail } from 'lucide-react'
import { Github, Linkedin } from './ui/BrandIcons'
import { AnimatePresence, m } from 'framer-motion'
import { navLinks, personal, socials } from '../data/personal'

export default function Footer() {
  const [show, setShow] = useState(false)
  const [year] = useState(() => new Date().getFullYear())
  const github = socials.find((s) => s.icon === 'github')
  const linkedin = socials.find((s) => s.icon === 'linkedin')

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const jump = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.07] bg-ink-950/70">
      <div className="shell py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,0.7fr)]">
          {/* brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-flame-500 font-display text-[0.85rem] font-bold text-ink-950">
                {personal.initials}
              </span>
              <span className="font-display text-[1.05rem] font-semibold tracking-tight text-mist-100">
                {personal.name}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-mist-400">
              {personal.tagline}. I build modern web applications and digital products — from the first pixel to
              the deployed API.
            </p>

            <div className="mt-7 flex items-center gap-2.5">
              <a
                href={github.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mist-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-flame-500/50 hover:text-flame-500"
              >
                <Github size={17} strokeWidth={1.8} />
              </a>
              <a
                href={linkedin.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mist-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-flame-500/50 hover:text-flame-500"
              >
                <Linkedin size={17} strokeWidth={1.8} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mist-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-flame-500/50 hover:text-flame-500"
              >
                <Mail size={17} strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* nav */}
          <nav aria-label="Footer">
            <span className="label text-mist-500">Navigate</span>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => jump(link.id)}
                    className="text-[0.9rem] text-mist-400 transition-colors duration-300 hover:text-flame-500"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <span className="label text-mist-500">Get in touch</span>
            <ul className="mt-5 space-y-3 text-[0.9rem] text-mist-400">
              <li>
                <a
                  href={`mailto:${personal.email}`}
                  className="break-all transition-colors duration-300 hover:text-flame-500"
                >
                  {personal.email}
                </a>
              </li>
              <li>{personal.location}</li>
              <li>{personal.availabilityLong}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-7 sm:flex-row">
          <p className="text-[0.78rem] text-mist-500">
            © {year} {personal.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mist-500">
            Built with React · Tailwind · Motion
          </p>
        </div>
      </div>

      {/* back to top */}
      <AnimatePresence>
        {show && (
          <m.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-ink-950/85 text-mist-200 backdrop-blur-md transition-colors duration-300 hover:border-flame-500/60 hover:text-flame-500 sm:bottom-8 sm:right-8"
          >
            <ArrowUp size={17} strokeWidth={2} />
          </m.button>
        )}
      </AnimatePresence>
    </footer>
  )
}


