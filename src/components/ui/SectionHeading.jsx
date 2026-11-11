import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = 'left',
  className = '',
}) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start'

  return (
    <Reveal className={`flex flex-col ${alignment} max-w-2xl ${className}`}>
      {eyebrow && (
        <div className="mb-5 inline-flex items-center gap-2.5">
          <span className="h-px w-8 bg-flame-500" />
          <span className="label text-flame-500">{eyebrow}</span>
        </div>
      )}

      <h2 className="display text-[clamp(2.1rem,5.2vw,3.9rem)] text-mist-100">
        {title}
        {accent && <span className="italic text-flame-500"> {accent}</span>}
      </h2>

      {subtitle && <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-mist-400">{subtitle}</p>}
    </Reveal>
  )
}
