import { m, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin, Sparkles } from 'lucide-react'
import { Github, Linkedin } from './ui/BrandIcons'
import { personal, socials } from '../data/personal'

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  const reduce = useReducedMotion()
  const github = socials.find((s) => s.icon === 'github')
  const linkedin = socials.find((s) => s.icon === 'linkedin')

  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  })

  return (
    <section id="home" className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32">
      {/* atmospheric burnt-orange field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 atmosphere" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-flame-600/20 blur-[140px]"
      />

      <div className="shell">
        <div className="grain relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-ink-950 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85)] sm:rounded-[36px]">
          {/* inner glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-28 -top-24 h-[420px] w-[420px] rounded-full bg-flame-500/25 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 right-0 h-[380px] w-[380px] rounded-full bg-flame-600/20 blur-[120px]"
          />

          <div className="relative grid grid-cols-1 items-center gap-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            {/* ---------- portrait ---------- */}
            <div className="relative order-1 flex justify-center px-5 pt-8 sm:px-10 sm:pt-10 lg:order-none lg:px-14 lg:py-16">
              {/* The portrait animates with transform-only CSS so the image paints
                  immediately — animating opacity would delay the LCP element. */}
              <div className="hero-portrait relative w-full max-w-[250px] sm:max-w-[310px] lg:max-w-none">
                {/* halo */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-10 -z-10 rounded-full bg-flame-500/20 blur-[70px]"
                />
                <img
                  src={personal.profileImage}
                  srcSet="/images/profile-480.webp 480w, /images/profile.webp 776w"
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 310px, 250px"
                  alt={`${personal.name}, ${personal.title} from ${personal.location}`}
                  width={776}
                  height={920}
                  fetchPriority="high"
                  decoding="async"
                  className="hero-float w-full select-none object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.6)]"
                />
                {/* bottom blend into the panel */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent"
                />

                {/* floating badge */}
                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-ink-900/90 px-4 py-2 backdrop-blur-md">
                  <MapPin size={13} className="text-flame-500" strokeWidth={2} />
                  <span className="label text-mist-300">{personal.location}</span>
                </div>
              </div>
            </div>

            {/* ---------- copy ---------- */}
            <div className="relative order-2 px-5 pb-12 pt-8 sm:px-10 lg:order-none lg:px-14 lg:pb-16 lg:pt-16">
              {/* availability */}
              <m.div {...fade(0.12)} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-flame-500/25 bg-flame-500/[0.08] px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <m.span
                    className="absolute inline-flex h-full w-full rounded-full bg-flame-500"
                    animate={reduce ? undefined : { opacity: [1, 0.15, 1], scale: [1, 1.9, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-flame-500" />
                </span>
                <span className="label text-flame-500">{personal.availability}</span>
              </m.div>

              <m.h1
                {...fade(0.2)}
                className="display text-[clamp(1.85rem,8.4vw,4.6rem)] break-words text-mist-100"
              >
                Hi, I&apos;m
                <br />
                <span className="italic text-flame-500">{personal.name}</span>
              </m.h1>

              <m.div {...fade(0.26)} className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-display text-lg text-mist-100 sm:text-xl">{personal.title}</span>
                <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-flame-500 sm:block" />
                <span className="label text-[0.6rem] text-mist-500 sm:text-[0.7rem]">{personal.tagline}</span>
              </m.div>

              <m.p {...fade(0.32)} className="mt-7 max-w-xl text-[1rem] leading-relaxed text-mist-400">
                I build modern web applications and digital products, combining thoughtful frontend experiences
                with robust backend engineering — from the first pixel to the deployed API.
              </m.p>

              {/* CTAs */}
              <m.div {...fade(0.38)} className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById('projects')
                    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: reduce ? 'auto' : 'smooth' })
                  }}
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-flame-500 px-6 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-flame-600 hover:shadow-[0_16px_40px_-14px_rgba(255,106,0,0.85)]"
                >
                  Explore My Work
                  <ArrowRight size={17} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById('contact')
                    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: reduce ? 'auto' : 'smooth' })
                  }}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-mist-100 transition-all duration-300 hover:border-flame-500/60 hover:bg-flame-500/10 hover:text-flame-500"
                >
                  <Sparkles size={16} strokeWidth={1.9} />
                  Contact Me
                </a>

                {personal.resumeUrl && (
                  <a
                    href={personal.resumeUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-12 items-center rounded-full px-4 text-sm font-medium text-mist-400 transition-colors hover:text-flame-500"
                  >
                    Download Résumé
                  </a>
                )}
              </m.div>

              {/* socials */}
              <m.div {...fade(0.44)} className="mt-9 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-7">
                <span className="label text-mist-500">Find me</span>
                <span aria-hidden="true" className="h-px w-6 bg-white/15" />
                <a
                  href={github.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mist-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-flame-500/50 hover:text-flame-500"
                >
                  <Github size={17} strokeWidth={1.8} />
                </a>
                <a
                  href={linkedin.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mist-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-flame-500/50 hover:text-flame-500"
                >
                  <Linkedin size={17} strokeWidth={1.8} />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="ml-1 font-mono text-[0.72rem] text-mist-500 transition-colors hover:text-flame-500 sm:text-[0.78rem] sm:break-all"
                >
                  {personal.email}
                </a>
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



