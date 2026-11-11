import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { projects } from '../data/projects'
import { personal } from '../data/personal'
import Reveal from './ui/Reveal'

const techCount = new Set(projects.flatMap((p) => p.tech)).size
const clientCount = projects.filter((p) => p.category === 'Client Project').length

const items = [
  { value: projects.length, suffix: '', label: 'Projects Completed', note: 'shipped & live' },
  { value: clientCount, suffix: '', label: 'Client Projects', note: 'production store' },
  { value: techCount, suffix: '+', label: 'Technologies Used', note: 'across the stack' },
  { value: Number(personal.yearsExperience), suffix: '', label: 'Years of Experience', note: 'freelancing & teaching' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(() => (reduce ? value : 0))

  useEffect(() => {
    if (!inView || reduce) return
    let raf
    const duration = 1100
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {reduce ? value : display}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section aria-label="Key statistics" className="shell pt-16 sm:pt-20">
      <Reveal>
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-950/60 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`group relative px-6 py-8 sm:px-8 sm:py-10 ${
                i % 2 === 0 ? 'border-r border-white/[0.07]' : ''
              } ${i < 2 ? 'border-b border-white/[0.07] lg:border-b-0' : ''} ${
                i === 1 ? 'lg:border-r' : ''
              } ${i === 2 ? 'lg:border-r' : ''}`}
            >
              <div className="font-display text-[clamp(2.1rem,4.4vw,3.1rem)] font-semibold leading-none text-mist-100 transition-colors duration-500 group-hover:text-flame-500">
                <Counter value={item.value} suffix={item.suffix} />
              </div>
              <div className="mt-3 text-[0.85rem] font-medium text-mist-300">{item.label}</div>
              <div className="label mt-1.5 text-mist-500">{item.note}</div>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-flame-500 transition-transform duration-700 group-hover:scale-x-100"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
