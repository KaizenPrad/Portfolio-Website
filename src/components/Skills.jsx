import {
  Braces,
  LayoutTemplate,
  Server,
  Database,
  Layers,
  Wrench,
  BookOpen,
  Compass,
  Sparkles,
} from 'lucide-react'
import { skillGroups } from '../data/skills'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const icons = { Braces, LayoutTemplate, Server, Database, Layers, Wrench, BookOpen, Compass }

export default function Skills() {
  return (
    <section id="skills" className="section scroll-mt-24 border-y border-white/[0.06] bg-ink-900/40">
      <div className="shell">
        <SectionHeading
          eyebrow="Technical stack"
          title="The Tools I"
          accent="Reach For."
          subtitle="A stack I actually use in production — split between what I ship with today and what I am actively learning."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const Icon = icons[group.icon] ?? Braces
            const isLearning = group.id === 'exploring'

            return (
              <Reveal key={group.id} delay={gi * 0.07}>
                <article
                  className={`group relative h-full overflow-hidden rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-1 ${
                    isLearning
                      ? 'border-dashed border-flame-500/30 bg-flame-500/[0.04] hover:border-flame-500/60'
                      : 'border-white/[0.08] bg-ink-950/55 hover:border-flame-500/35'
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-flame-500/0 blur-2xl transition-all duration-700 group-hover:bg-flame-500/15"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-xl border transition-colors duration-500 ${
                          isLearning
                            ? 'border-flame-500/30 bg-flame-500/10 text-flame-500'
                            : 'border-white/10 bg-white/[0.04] text-mist-300 group-hover:border-flame-500/30 group-hover:text-flame-500'
                        }`}
                      >
                        <Icon size={19} strokeWidth={1.7} />
                      </span>
                      <h3 className="mt-5 font-display text-[1.12rem] font-semibold text-mist-100">
                        {group.title}
                      </h3>
                      <p className="mt-1 text-[0.82rem] text-mist-500">{group.caption}</p>
                    </div>

                    {isLearning && (
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-flame-500/30 bg-flame-500/10 px-2.5 py-1">
                        <Sparkles size={11} className="text-flame-500" strokeWidth={2} />
                        <span className="label text-flame-500">Learning</span>
                      </span>
                    )}
                  </div>

                  <ul className="relative mt-6 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className={`rounded-full border px-3.5 py-1.5 font-mono text-[0.72rem] transition-all duration-300 ${
                          item.level === 'learning'
                            ? 'border-flame-500/25 bg-flame-500/[0.06] text-flame-500/90 hover:border-flame-500/60'
                            : 'border-white/10 bg-white/[0.03] text-mist-300 hover:border-flame-500/40 hover:text-mist-100'
                        }`}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
