import { timeline, education } from '../data/experience'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="section scroll-mt-24 border-y border-white/[0.06] bg-ink-900/40">
      <div className="shell">
        <SectionHeading
          eyebrow="Experience & education"
          title="My Development"
          accent="Journey."
          subtitle="Freelance work, teaching and the degree that keeps me learning."
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-16">
          {/* timeline */}
          <ol className="relative">
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-flame-500/60 via-white/12 to-transparent"
            />
            {timeline.map((entry, i) => (
              <Reveal
                as="li"
                key={entry.id}
                delay={i * 0.08}
                className="relative pl-9 pb-11 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-flame-500/60 bg-ink-900"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-flame-500" />
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="label rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-mist-300">
                    {entry.period}
                  </span>
                  <span className="label text-mist-500">{entry.type}</span>
                </div>

                <h3 className="mt-4 font-display text-[1.3rem] font-semibold text-mist-100">
                  {entry.role}
                </h3>
                <p className="mt-1 text-[0.88rem] text-flame-500/90">{entry.org}</p>
                <p className="mt-3 max-w-2xl text-[0.93rem] leading-relaxed text-mist-400">{entry.summary}</p>

                {entry.stack && (
                  <p className="mt-3 font-mono text-[0.72rem] text-flame-500/80">{entry.stack}</p>
                )}

                {entry.points.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {entry.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[0.9rem] leading-relaxed text-mist-400">
                        <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-flame-500/70" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </ol>

          {/* education card */}
          <Reveal delay={0.15}>
            <aside className="sticky top-28 rounded-3xl border border-white/[0.08] bg-ink-950/60 p-7">
              <span className="label text-flame-500">Education</span>
              <h3 className="mt-4 font-display text-[1.2rem] font-semibold leading-snug text-mist-100">
                {education.degree}
              </h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-mist-400">{education.college}</p>
              <p className="mt-1 text-[0.85rem] text-mist-500">{education.university}</p>

              <dl className="mt-7 space-y-3 border-t border-white/[0.07] pt-6">
                {[
                  ['Graduation year', education.graduationYear],
                  ['CGPA', education.cgpa],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between">
                    <dt className="text-[0.85rem] text-mist-500">{k}</dt>
                    <dd className="font-mono text-[0.82rem] text-mist-100">{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
