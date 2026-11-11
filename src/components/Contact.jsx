import { useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react'
import { contactForm, personal, socials } from '../data/personal'
import { Github, Linkedin, WhatsApp } from './ui/BrandIcons'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const initial = { name: '', email: '', subject: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  else if (values.name.trim().length < 2) errors.name = 'Name looks too short.'

  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Enter a valid email address.'

  if (!values.subject.trim()) errors.subject = 'Please add a subject.'

  if (!values.message.trim()) errors.message = 'Please write a message.'
  else if (values.message.trim().length < 20)
    errors.message = 'A little more detail helps — 20 characters minimum.'

  return errors
}

/** One canonical format used for every delivery channel. */
function formatMessage(values) {
  return [
    `New portfolio enquiry — ${values.subject.trim()}`,
    '',
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Subject: ${values.subject.trim()}`,
    '',
    values.message.trim(),
    '',
    '— Sent from the portfolio contact form',
  ].join('\n')
}

export default function Contact() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | ready | error
  const [errorMessage, setErrorMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [copied, setCopied] = useState(false)
  const [payload, setPayload] = useState(null)

  const linkedin = socials.find((s) => s.icon === 'linkedin')
  const github = socials.find((s) => s.icon === 'github')
  const whatsapp = socials.find((s) => s.icon === 'whatsapp')

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
  }

  /* ---------------- delivery links ---------------- */
  const whatsappLink = (body) =>
    `https://wa.me/${contactForm.whatsapp}?text=${encodeURIComponent(body)}`

  const gmailLink = (body) =>
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      contactForm.recipient,
    )}&su=${encodeURIComponent(`Portfolio enquiry — ${values.subject.trim()}`)}&body=${encodeURIComponent(body)}`

  const mailtoLink = (body) =>
    `mailto:${contactForm.recipient}?subject=${encodeURIComponent(
      `Portfolio enquiry — ${values.subject.trim()}`,
    )}&body=${encodeURIComponent(body)}`

  const handleSubmit = async (e) => {
    e.preventDefault()

    // spam protection — hidden field (bots fill everything in)
    if (honeypot) {
      setStatus('ready')
      setPayload(null)
      return
    }

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('error')
      setErrorMessage('Please fix the highlighted fields and try again.')
      return
    }

    const body = formatMessage(values)
    setPayload(body)
    setStatus('sending')
    setErrorMessage('')

    /* 1. hosted endpoint (if one is configured) — delivers straight to the inbox */
    if (contactForm.endpoint) {
      try {
        const res = await fetch(contactForm.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, message: body, _subject: `Portfolio enquiry — ${values.subject}` }),
        })
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        setStatus('ready')
        setValues(initial)
        return
      } catch (err) {
        console.error(err)
        setStatus('ready')
        setErrorMessage(
          'The direct send failed, so your message is ready to deliver through WhatsApp or Gmail instead.',
        )
        return
      }
    }

    /* 2. no endpoint — hand the formatted message to WhatsApp */
    window.open(whatsappLink(body), '_blank', 'noopener,noreferrer')
    setStatus('ready')
    setValues(initial)
  }

  const copyMessage = async () => {
    if (!payload) return
    try {
      await navigator.clipboard.writeText(payload)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  const fieldClass = (field) =>
    `w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-[0.92rem] text-mist-100 outline-none transition-colors duration-300 placeholder:text-mist-500/70 focus:border-flame-500/70 ${
      errors[field] ? 'border-flame-600/80' : 'border-white/10 hover:border-white/20'
    }`

  const contactItems = [
    { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'pradyumn-dwivedi', href: linkedin.url },
    { icon: Github, label: 'GitHub', value: '@KaizenPrad', href: github.url },
    { icon: MapPin, label: 'Location', value: personal.location, href: null },
    { icon: WhatsApp, label: 'WhatsApp', value: personal.whatsapp, href: whatsapp.url },
  ]

  return (
    <section id="contact" className="section scroll-mt-24">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-ink-950/60 sm:rounded-[36px]">
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-flame-500/15 blur-[110px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-flame-600/12 blur-[120px]" />

          <div className="relative grid grid-cols-1 gap-12 p-7 sm:p-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:p-14">
            {/* left */}
            <div>
              <SectionHeading
                eyebrow="Contact"
                title="Have an Idea?"
                accent="Let's Build Something Great."
                subtitle="I'm always interested in discussing interesting projects, development opportunities and collaborations."
              />

              <ul className="mt-10 space-y-4">
                {contactItems.map((item, i) => {
                  const Icon = item.icon
                  const inner = (
                    <>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-flame-500 transition-colors duration-300 group-hover:border-flame-500/50">
                        <Icon size={16} strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0">
                        <span className="block label text-mist-500">{item.label}</span>
                        <span className="mt-1 block truncate text-[0.9rem] text-mist-100">{item.value}</span>
                      </span>
                    </>
                  )

                  return (
                    <Reveal as="li" key={item.label} delay={0.05 + i * 0.05}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer noopener"
                          className="group flex items-center gap-4"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="group flex items-center gap-4">{inner}</div>
                      )}
                    </Reveal>
                  )
                })}
              </ul>

              <Reveal delay={0.35}>
                <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <p className="text-[0.86rem] leading-relaxed text-mist-400">
                    Prefer instant messaging?{' '}
                    <a
                      href={whatsapp.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-medium text-flame-500 underline-offset-4 transition-colors hover:text-flame-600 hover:underline"
                    >
                      Chat on WhatsApp
                    </a>{' '}
                    — I usually reply the same day.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* form */}
            <Reveal delay={0.12}>
              <div className="rounded-3xl border border-white/[0.08] bg-ink-900/70 p-6 sm:p-8">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* honeypot */}
                  <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
                    <label htmlFor="company-website">Company website</label>
                    <input
                      id="company-website"
                      name="company-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="label mb-2.5 block text-mist-400">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={values.name}
                        onChange={update('name')}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={fieldClass('name')}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-2 text-[0.76rem] text-flame-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="label mb-2.5 block text-mist-400">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={values.email}
                        onChange={update('email')}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={fieldClass('email')}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-2 text-[0.76rem] text-flame-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="label mb-2.5 block text-mist-400">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What is this about?"
                      value={values.subject}
                      onChange={update('subject')}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      className={fieldClass('subject')}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="mt-2 text-[0.76rem] text-flame-500">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="label mb-2.5 block text-mist-400">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell me about your project, timeline and what you need built."
                      value={values.message}
                      onChange={update('message')}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`${fieldClass('message')} resize-y`}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-2 text-[0.76rem] text-flame-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-flame-500 px-6 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-flame-600 hover:shadow-[0_16px_40px_-14px_rgba(255,106,0,0.85)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={17} className="animate-spin" strokeWidth={2.2} />
                        Preparing…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} strokeWidth={2.1} />
                      </>
                    )}
                  </button>

                  <div aria-live="polite">
                    {status === 'error' && (
                      <p className="flex items-start gap-2.5 rounded-xl border border-flame-600/35 bg-flame-600/10 px-4 py-3 text-[0.85rem] text-flame-500">
                        <AlertCircle size={16} strokeWidth={2} className="mt-0.5 shrink-0" />
                        {errorMessage}
                      </p>
                    )}

                    {status === 'ready' && (
                      <div className="space-y-4 rounded-xl border border-flame-500/25 bg-flame-500/[0.08] px-4 py-4">
                        <p className="flex items-start gap-2.5 text-[0.86rem] leading-relaxed text-flame-500">
                          <CheckCircle2 size={16} strokeWidth={2} className="mt-0.5 shrink-0" />
                          <span>
                            Your message is formatted and ready. Press send in WhatsApp to deliver it straight to
                            my phone, or use Gmail instead — nothing is stored on this site.
                          </span>
                        </p>

                        {errorMessage && (
                          <p className="text-[0.8rem] text-mist-400">{errorMessage}</p>
                        )}

                        {payload && (
                          <div className="flex flex-wrap gap-2">
                            <a
                              href={whatsappLink(payload)}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex h-10 items-center gap-2 rounded-full bg-flame-500 px-4 text-[0.8rem] font-semibold text-ink-950 transition-colors duration-300 hover:bg-flame-600"
                            >
                              <MessageCircle size={15} strokeWidth={2} />
                              Send on WhatsApp
                            </a>
                            <a
                              href={gmailLink(payload)}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-[0.8rem] font-medium text-mist-200 transition-colors duration-300 hover:border-flame-500/50 hover:text-flame-500"
                            >
                              <Mail size={15} strokeWidth={1.9} />
                              Send via Gmail
                            </a>
                            <a
                              href={mailtoLink(payload)}
                              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-[0.8rem] font-medium text-mist-200 transition-colors duration-300 hover:border-flame-500/50 hover:text-flame-500"
                            >
                              <Mail size={15} strokeWidth={1.9} />
                              Email app
                            </a>
                            <button
                              type="button"
                              onClick={copyMessage}
                              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-[0.8rem] font-medium text-mist-200 transition-colors duration-300 hover:border-flame-500/50 hover:text-flame-500"
                            >
                              <Copy size={15} strokeWidth={1.9} />
                              {copied ? 'Copied' : 'Copy text'}
                            </button>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setStatus('idle')
                            setPayload(null)
                          }}
                          className="text-[0.8rem] font-medium text-mist-400 underline underline-offset-4 transition-colors hover:text-flame-500"
                        >
                          Write another message
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-center text-[0.72rem] leading-relaxed text-mist-500">
                    Your details are never stored on this site. Prefer email?{' '}
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-mist-300 underline underline-offset-4 transition-colors hover:text-flame-500"
                    >
                      {personal.email}
                    </a>
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
