import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Lightbulb,
  Wrench,
  AlertTriangle,
} from 'lucide-react'
import { getProject, projects } from '../data/projects'
import { personal } from '../data/personal'
import { Github } from '../components/ui/BrandIcons'
import { srcSetFor } from '../utils/images'
import NotFound from './NotFound'

const blocks = [
  { key: 'problem', label: 'The problem', icon: AlertTriangle },
  { key: 'solution', label: 'The solution', icon: Lightbulb },
  { key: 'architecture', label: 'System architecture', icon: Layers },
  { key: 'challenges', label: 'Challenges', icon: Wrench },
  { key: 'howISolved', label: 'How I solved them', icon: CheckCircle2 },
  { key: 'outcome', label: 'Final outcome', icon: CheckCircle2 },
]

export default function ProjectDetails() {
  const { slug } = useParams()
  const project = getProject(slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  useEffect(() => {
    if (!project) return
    document.title = `${project.name} — ${project.subtitle} | ${personal.name}`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', project.shortDescription)
    return () => {
      document.title = `${personal.name} — ${personal.title}`
    }
  }, [project])

  if (!project) return <NotFound />

  const study = project.caseStudy
  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <main className="pt-28 sm:pt-32">
      {/* hero */}
      <section className="shell">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-[0.85rem] text-mist-400 transition-colors hover:text-flame-500"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Back to all work
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <div>
            <span className="label text-flame-500">{project.category}</span>
            <h1 className="display mt-4 text-[clamp(2.2rem,5.6vw,3.9rem)] text-mist-100">{project.name}</h1>
            <p className="mt-3 text-[1.05rem] text-flame-500/90">{project.subtitle}</p>
            <p className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-mist-400">
              {project.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-flame-500 px-5 text-[0.85rem] font-semibold text-ink-950 transition-colors duration-300 hover:bg-flame-600"
                >
                  <ExternalLink size={15} strokeWidth={2.1} />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-[0.85rem] font-medium text-mist-200 transition-colors duration-300 hover:border-flame-500/50 hover:text-flame-500"
                >
                  <Github size={15} strokeWidth={1.9} />
                  View Source
                </a>
              )}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-3">
            {[
              ['Category', project.category],
              ['Year', project.year],
              ['Repository', project.repo],
              ['Stack size', `${project.tech.length} technologies`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-white/[0.07] bg-ink-950/60 px-5 py-4">
                <dt className="label text-mist-500">{k}</dt>
                <dd className="mt-1.5 truncate font-mono text-[0.78rem] text-mist-100">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* gallery */}
      <section className="shell mt-14">
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-950/60">
          <img
            src={project.cover}
            srcSet={srcSetFor(project.cover)}
            sizes="(min-width: 1024px) 92vw, 100vw"
            alt={`${project.name} — ${project.subtitle}`}
            className="w-full object-cover object-top"
            width={1600}
            height={900}
          />
        </div>

        {project.gallery.length > 1 && (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.gallery.slice(1).map((img, i) => (
              <figure
                key={img}
                className="overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-950/60"
              >
                <img
                  src={img}
                  srcSet={srcSetFor(img)}
                  sizes="(min-width: 640px) 46vw, 100vw"
                  alt={`${project.name} interface view ${i + 2}`}
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={900}
                  className="w-full object-cover object-top transition-transform duration-1000 hover:scale-[1.03]"
                />
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* overview */}
      <section className="section">
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
            <div>
              <span className="label text-flame-500">Overview</span>
              <h2 className="display mt-4 text-[clamp(1.7rem,3.4vw,2.6rem)] text-mist-100">
                What I built
              </h2>
              <p className="mt-6 text-[0.97rem] leading-[1.9] text-mist-400">{project.detailedDescription}</p>

              <h3 className="mt-12 font-display text-[1.3rem] font-semibold text-mist-100">
                Key features
              </h3>
              <ul className="mt-5 space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[0.93rem] leading-relaxed text-mist-400">
                    <CheckCircle2 size={16} strokeWidth={1.9} className="mt-1 shrink-0 text-flame-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <h3 className="mt-12 font-display text-[1.3rem] font-semibold text-mist-100">
                My contribution
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.85] text-mist-400">{project.contribution}</p>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-white/[0.08] bg-ink-950/60 p-7">
                <span className="label text-flame-500">Technologies used</span>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 font-mono text-[0.7rem] text-mist-300"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* case study */}
      {study && (
        <section className="section border-y border-white/[0.06] bg-ink-900/40">
          <div className="shell">
            <span className="label text-flame-500">Case study</span>
            <h2 className="display mt-4 text-[clamp(1.7rem,3.4vw,2.6rem)] text-mist-100">
              The engineering behind it
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              {blocks.map((block) => {
                const Icon = block.icon
                const content = study[block.key]
                const isList = Array.isArray(content)
                return (
                  <div
                    key={block.key}
                    className="rounded-2xl border border-white/[0.07] bg-ink-950/50 p-7 transition-colors duration-500 hover:border-flame-500/25"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} strokeWidth={1.9} className="text-flame-500" />
                      <span className="label text-mist-300">{block.label}</span>
                    </div>
                    {isList ? (
                      <ul className="mt-4 space-y-2.5">
                        {content.map((item) => (
                          <li key={item} className="flex gap-3 text-[0.9rem] leading-relaxed text-mist-400">
                            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-flame-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-[0.9rem] leading-[1.85] text-mist-400">{content}</p>
                    )}
                  </div>
                )
              })}

              <div className="rounded-2xl border border-white/[0.07] bg-ink-950/50 p-7 md:col-span-2">
                <span className="label text-mist-300">Important technical decisions</span>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {study.decisions.map((decision) => (
                    <li key={decision} className="flex gap-3 text-[0.89rem] leading-relaxed text-mist-400">
                      <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-flame-500/70" />
                      {decision}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* next project */}
      <section className="shell py-16">
        <Link
          to={`/projects/${next.slug}`}
          className="group flex flex-col gap-6 rounded-3xl border border-white/[0.08] bg-ink-950/50 p-7 transition-colors duration-500 hover:border-flame-500/35 sm:flex-row sm:items-center sm:justify-between sm:p-9"
        >
          <div>
            <span className="label text-mist-500">Next project</span>
            <h3 className="mt-2.5 font-display text-[1.5rem] font-semibold text-mist-100 transition-colors duration-300 group-hover:text-flame-500">
              {next.name}
            </h3>
            <p className="mt-1 text-[0.88rem] text-mist-400">{next.subtitle}</p>
          </div>
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/12 text-mist-100 transition-all duration-300 group-hover:border-flame-500/60 group-hover:bg-flame-500 group-hover:text-ink-950">
            <ArrowRight size={18} strokeWidth={2} />
          </span>
        </Link>
      </section>
    </main>
  )
}
