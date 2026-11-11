import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { m, useReducedMotion } from 'framer-motion'
import { Github } from './ui/BrandIcons'
import { srcSetFor } from '../utils/images'

function Actions({ project }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 border-t border-white/[0.07] pt-6">
      <Link
        to={`/projects/${project.slug}`}
        className="inline-flex h-10 items-center gap-1.5 rounded-full bg-flame-500 px-4 text-[0.8rem] font-semibold text-ink-950 transition-colors duration-300 hover:bg-flame-600"
      >
        View Case Study
        <ArrowUpRight size={15} strokeWidth={2.2} />
      </Link>

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/15 px-4 text-[0.8rem] font-medium text-mist-300 transition-colors duration-300 hover:border-flame-500/50 hover:text-flame-500"
        >
          <ExternalLink size={14} strokeWidth={2} />
          Live Demo
        </a>
      )}

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/15 px-4 text-[0.8rem] font-medium text-mist-300 transition-colors duration-300 hover:border-flame-500/50 hover:text-flame-500"
        >
          <Github size={14} strokeWidth={1.9} />
          GitHub
        </a>
      )}
    </div>
  )
}

function TechTags({ project, max = 5 }) {
  const extra = project.tech.length - max
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {project.tech.slice(0, max).map((t) => (
        <li
          key={t}
          className="rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 font-mono text-[0.66rem] text-mist-400"
        >
          {t}
        </li>
      ))}
      {extra > 0 && (
        <li className="rounded-full border border-white/[0.09] px-2.5 py-1 font-mono text-[0.66rem] text-mist-500">
          +{extra}
        </li>
      )}
    </ul>
  )
}

function Preview({ project, className = '' }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`relative block overflow-hidden bg-ink-950 ${className}`}
      aria-label={`View case study for ${project.name}`}
    >
      <div className="relative h-full w-full overflow-hidden">
        <img
          src={project.cover}
          srcSet={srcSetFor(project.cover)}
          sizes="(min-width: 1024px) 46vw, (min-width: 640px) 90vw, 100vw"
          alt={`${project.name} — ${project.subtitle} screenshot`}
          loading="lazy"
          decoding="async"
          width={1600}
          height={900}
          className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
        <div className="absolute inset-0 bg-flame-500/[0.07] opacity-0 transition-colors duration-700 group-hover:opacity-100" />

        <span className="absolute left-5 top-5 rounded-full border border-white/12 bg-ink-950/75 px-3 py-1.5 backdrop-blur-md">
          <span className="label text-mist-300">{project.category}</span>
        </span>

        <span className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-flame-500 text-ink-950 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} strokeWidth={2.3} />
        </span>
      </div>
    </Link>
  )
}

export default function ProjectCard({ project, span = 'lg:col-span-3', index = 0 }) {
  const reduce = useReducedMotion()
  const wide = span.includes('col-span-6')
  const large = span.includes('col-span-4')

  const motionProps = {
    initial: reduce ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.75, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] },
  }

  /* ---------- wide feature card ---------- */
  if (wide) {
    return (
      <m.article
        {...motionProps}
        className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-950/70 lg:flex-row ${span}`}
      >
        <Preview project={project} className="min-h-[240px] lg:w-[56%] lg:min-h-[380px]" />

        <div className="flex min-w-0 flex-1 flex-col justify-center p-6 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="label text-flame-500">{project.category}</span>
              <h3 className="mt-2.5 font-display text-[1.6rem] font-semibold leading-tight text-mist-100 transition-colors duration-300 group-hover:text-flame-500">
                <Link to={`/projects/${project.slug}`}>{project.name}</Link>
              </h3>
              <p className="mt-1.5 text-[0.88rem] text-mist-500">{project.subtitle}</p>
            </div>
            <span className="label shrink-0 text-mist-500">{project.year}</span>
          </div>

          <p className="mt-5 max-w-xl text-[0.94rem] leading-relaxed text-mist-400">
            {project.shortDescription}
          </p>

          <TechTags project={project} max={7} />
          <div className="mt-7">
            <Actions project={project} />
          </div>
        </div>
      </m.article>
    )
  }

  /* ---------- standard card ---------- */
  return (
    <m.article
      {...motionProps}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-950/70 ${span}`}
    >
      <Preview project={project} className="aspect-[16/10] lg:aspect-[16/9]" />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-mist-100 transition-colors duration-300 group-hover:text-flame-500">
              <Link to={`/projects/${project.slug}`}>{project.name}</Link>
            </h3>
            <p className="mt-1.5 text-[0.85rem] text-mist-500">{project.subtitle}</p>
          </div>
          <span className="label shrink-0 text-mist-500">{project.year}</span>
        </div>

        <p className={`mt-5 text-[0.92rem] leading-relaxed text-mist-400 ${large ? 'max-w-2xl' : ''}`}>
          {project.shortDescription}
        </p>

        <TechTags project={project} max={large ? 7 : 5} />

        <div className="mt-auto pt-7">
          <Actions project={project} />
        </div>
      </div>
    </m.article>
  )
}


