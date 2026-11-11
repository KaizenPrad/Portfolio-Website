import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, AlertTriangle, CheckCircle2, Lightbulb, Layers, Wrench } from 'lucide-react'
import { getProject } from '../data/projects'
import { caseStudyPicks } from '../data/services'
import { srcSetFor } from '../utils/images'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const blocks = [
  { key: 'problem', label: 'The problem', icon: AlertTriangle, tone: 'text-flame-500' },
  { key: 'solution', label: 'The solution', icon: Lightbulb, tone: 'text-flame-500' },
  { key: 'architecture', label: 'Architecture', icon: Layers, tone: 'text-flame-500' },
  { key: 'challenges', label: 'Challenges', icon: Wrench, tone: 'text-flame-500' },
  { key: 'howISolved', label: 'How I solved them', icon: CheckCircle2, tone: 'text-flame-500' },
  { key: 'outcome', label: 'Outcome', icon: CheckCircle2, tone: 'text-flame-500' },
]

export default function CaseStudies() {
  const [active, setActive] = useState(caseStudyPicks[0])
  const reduce = useReducedMotion()
  const project = getProject(active)
  const study = project?.caseStudy

  if (!project || !study) return null

  return (
    <section id="case-studies" className="section scroll-mt-24 border-y border-white/[0.06] bg-ink-900/40">
      <div className="shell">
        <SectionHeading
          eyebrow="Technical case studies"
          title="The Engineering"
          accent="Behind The Work."
          subtitle="Not just what was built — the decisions, the trade-offs and the problems that had to be solved."
        />

        {/* picker */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-2">
            {caseStudyPicks.map((slug) => {
              const p = getProject(slug)
              const isActive = slug === active
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setActive(slug)}
                  aria-pressed={isActive}
                  className={`relative isolate rounded-full border px-5 py-2.5 text-[0.85rem] font-medium transition-colors duration-300 ${
                    isActive
                      ? 'border-flame-500/60 text-ink-950'
                      : 'border-white/10 text-mist-300 hover:border-flame-500/40 hover:text-mist-100'
                  }`}
                >
                  {isActive && (
                    <m.span
                      layoutId="case-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-flame-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{p?.name}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* preview */}
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-950/60">
              <div className="relative aspect-[16/10] overflow-hidden">
                <AnimatePresence mode="wait">
                  <m.img
                    key={project.cover}
                    src={project.cover}
                    srcSet={srcSetFor(project.cover)}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    alt={`${project.name} interface screenshot`}
                    loading="lazy"
                    decoding="async"
                    width={1600}
                    height={1000}
                    initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="label text-flame-500">{project.category}</span>
                  <h3 className="mt-2 font-display text-[1.5rem] font-semibold text-mist-100">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-[0.85rem] text-mist-400">{project.subtitle}</p>
                </div>
              </div>

              <div className="p-6">
                <span className="label text-mist-500">Key technical decisions</span>
                <ul className="mt-4 space-y-3">
                  {study.decisions.map((decision) => (
                    <li key={decision} className="flex gap-3 text-[0.88rem] leading-relaxed text-mist-300">
                      <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-flame-500/70" />
                      {decision}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 font-mono text-[0.66rem] text-mist-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-flame-500 transition-colors hover:text-flame-600"
                >
                  Read the full case study
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* breakdown */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-3">
              {blocks.map((block) => {
                const Icon = block.icon
                const content = study[block.key]
                const isList = Array.isArray(content)
                return (
                  <div
                    key={block.key}
                    className="group rounded-2xl border border-white/[0.07] bg-ink-950/50 p-6 transition-colors duration-500 hover:border-flame-500/25"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={15} strokeWidth={1.9} className={block.tone} />
                      <span className="label text-mist-300">{block.label}</span>
                    </div>
                    {isList ? (
                      <ul className="mt-4 space-y-2">
                        {content.map((item) => (
                          <li key={item} className="flex gap-3 text-[0.89rem] leading-relaxed text-mist-400">
                            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-flame-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-[0.89rem] leading-relaxed text-mist-400">{content}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}


