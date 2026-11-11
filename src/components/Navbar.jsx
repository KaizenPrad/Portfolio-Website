import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { Menu, X, Download, ArrowUpRight } from 'lucide-react'
import { Github, Linkedin } from './ui/BrandIcons'
import { navLinks, personal, socials } from '../data/personal'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const github = socials.find((s) => s.icon === 'github')
  const linkedin = socials.find((s) => s.icon === 'linkedin')

  const handleNav = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-16 max-w-[84rem] items-center justify-between rounded-full border px-3 pl-5 transition-all duration-500 sm:px-4 sm:pl-6 ${
            scrolled
              ? 'border-white/10 bg-ink-950/85 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl'
              : 'border-white/[0.07] bg-ink-950/55 backdrop-blur-md'
          }`}
        >
          {/* logo */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="group flex items-center gap-2.5"
          >
            <span
              aria-hidden="true"
              className="relative grid h-9 w-9 place-items-center rounded-full bg-flame-500 font-display text-[0.8rem] font-bold text-ink-950 transition-transform duration-500 group-hover:rotate-[18deg]"
            >
              {personal.initials}
            </span>
            <span className="sr-only font-display text-[0.95rem] font-semibold tracking-tight text-mist-100 sm:not-sr-only">
              {personal.firstName}
            </span>
          </button>

          {/* desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => handleNav(link.id)}
                  className={`relative rounded-full px-4 py-2 text-[0.85rem] font-medium transition-colors duration-300 ${
                    active === link.id ? 'text-mist-100' : 'text-mist-400 hover:text-mist-100'
                  }`}
                  aria-current={active === link.id ? 'page' : undefined}
                >
                  {active === link.id && (
                    <m.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* right actions */}
          <div className="flex items-center gap-2">
            <a
              href={github.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="hidden h-9 w-9 place-items-center rounded-full text-mist-400 transition-colors duration-300 hover:bg-white/5 hover:text-flame-500 sm:grid"
            >
              <Github size={17} strokeWidth={1.8} />
            </a>
            <a
              href={linkedin.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="hidden h-9 w-9 place-items-center rounded-full text-mist-400 transition-colors duration-300 hover:bg-white/5 hover:text-flame-500 sm:grid"
            >
              <Linkedin size={17} strokeWidth={1.8} />
            </a>

            {personal.resumeUrl ? (
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="hidden h-9 items-center gap-2 rounded-full border border-white/15 px-4 text-[0.8rem] font-medium text-mist-300 transition-colors duration-300 hover:border-flame-500/50 hover:text-flame-500 md:flex"
              >
                <Download size={14} strokeWidth={1.9} />
                Résumé
              </a>
            ) : null}

            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="hidden h-9 items-center gap-1.5 rounded-full bg-flame-500 px-4 text-[0.8rem] font-semibold text-ink-950 transition-colors duration-300 hover:bg-flame-600 sm:flex"
            >
              Let&apos;s Talk
              <ArrowUpRight size={15} strokeWidth={2.2} />
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mist-100 transition-colors hover:bg-white/5 lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink-950/70 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <m.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="mx-3 mt-24 overflow-hidden rounded-3xl border border-white/10 bg-ink-900/95 p-5 shadow-2xl"
            >
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => handleNav(link.id)}
                      className="flex w-full items-center justify-between border-b border-white/[0.07] py-4 text-left font-display text-lg text-mist-100 transition-colors hover:text-flame-500"
                    >
                      {link.label}
                      <span className="label text-mist-500">0{i + 1}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    handleNav('contact')
                  }}
                  className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-flame-500 text-sm font-semibold text-ink-950"
                >
                  Let&apos;s Talk
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </button>
                <a
                  href={github.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-mist-300"
                >
                  <Github size={17} strokeWidth={1.8} />
                </a>
                <a
                  href={linkedin.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-mist-300"
                >
                  <Linkedin size={17} strokeWidth={1.8} />
                </a>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}


