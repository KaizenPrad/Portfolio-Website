import { about } from '../data/about'
import { personal } from '../data/personal'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function About() {
  return (
    <section id="about" className="section scroll-mt-24">
      <div className="shell">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="About me"
              title="More Than Just"
              accent="Writing Code."
              subtitle={about.lead}
            />

            <div className="mt-9 space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-[0.97rem] leading-[1.85] text-mist-400">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:pt-4">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/[0.08] bg-ink-950/60 p-7 sm:p-9">
                <span className="label text-flame-500">How I work</span>
                <div className="mt-7 space-y-7">
                  {about.principles.map((principle, i) => (
                    <div key={principle.title} className="flex gap-5">
                      <span className="mt-0.5 font-mono text-[0.72rem] text-flame-500">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.05rem] font-semibold text-mist-100">
                          {principle.title}
                        </h3>
                        <p className="mt-2 text-[0.9rem] leading-relaxed text-mist-400">
                          {principle.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { k: 'Experience', v: personal.experienceNote },
                  { k: 'Education', v: personal.education },
                  { k: 'Graduation', v: personal.graduationYear },
                  { k: 'Based in', v: personal.location },
                ].map((item) => (
                  <div
                    key={item.k}
                    className="rounded-2xl border border-white/[0.07] bg-ink-900/50 px-5 py-4 transition-colors duration-500 hover:border-flame-500/30"
                  >
                    <dt className="label text-mist-500">{item.k}</dt>
                    <dd className="mt-2 text-[0.88rem] leading-snug text-mist-100">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
