import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'
import { personal } from '../data/personal'

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 atmosphere" />
      <div className="text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-flame-500/25 bg-flame-500/[0.08]">
          <Compass size={22} className="text-flame-500" strokeWidth={1.7} />
        </span>

        <p className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-mist-500">
          Error 404
        </p>
        <h1 className="display mt-4 text-[clamp(3rem,12vw,7rem)] text-mist-100">Lost?</h1>
        <p className="mx-auto mt-5 max-w-md text-[0.95rem] leading-relaxed text-mist-400">
          This page does not exist — but there is plenty worth seeing. Head back to the portfolio and pick up
          where you left off.
        </p>

        <Link
          to="/"
          className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-flame-500 px-6 text-sm font-semibold text-ink-950 transition-colors duration-300 hover:bg-flame-600"
        >
          <ArrowLeft size={17} strokeWidth={2.2} />
          Back to homepage
        </Link>

        <p className="mt-10 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mist-500">
          {personal.name} — {personal.title}
        </p>
      </div>
    </main>
  )
}
