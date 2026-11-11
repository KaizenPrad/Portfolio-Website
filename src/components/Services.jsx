import { Check } from 'lucide-react'
import { services } from '../data/services'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Services() {
  return (
    <section id="services" className="section scroll-mt-24">
      <div className="shell">
        <SectionHeading
          eyebrow="What I can build"
          title="From First Draft to"
          accent="Production."
          subtitle="I work across the stack, so you get one developer for the interface, the API and everything in between."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <Reveal key={service.id} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-950/55 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-flame-500/35">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-flame-500/0 blur-3xl transition-all duration-700 group-hover:bg-flame-500/15"
                  />

                  <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-flame-500 transition-transform duration-500 group-hover:scale-105">
                    <Icon size={21} strokeWidth={1.7} />
                  </span>

                  <h3 className="relative mt-6 font-display text-[1.3rem] font-semibold text-mist-100">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 text-[0.92rem] leading-relaxed text-mist-400">
                    {service.description}
                  </p>

                  <ul className="relative mt-7 space-y-2.5 border-t border-white/[0.07] pt-6">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-[0.89rem] text-mist-300">
                        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-flame-500/15">
                          <Check size={10} strokeWidth={3} className="text-flame-500" />
                        </span>
                        {point}
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
