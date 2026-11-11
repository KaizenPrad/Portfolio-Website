/**
 * Centralised personal information.
 * Edit values here — every component reads from this file.
 */

export const personal = {
  name: 'Pradyumn Dwivedi',
  firstName: 'Pradyumn',
  initials: 'PD',
  title: 'Full-Stack Developer',
  tagline: 'Turning Ideas Into Powerful Digital Experiences',
  location: 'Kanpur, India',
  email: 'pradyumn.dwivedi2407@gmail.com',
  phone: '+91 87658 19221',
  phoneRaw: '+918765819221',
  whatsapp: '+91 87658 19221',
  whatsappRaw: '918765819221',
  availability: 'Available for Opportunities',
  availabilityLong: 'Available for Opportunities / Freelance Projects / Full-Time Roles',
  yearsExperience: '2',
  yearsExperienceLabel: 'Years of Experience',
  experienceNote: '2 years freelancing and teaching development',
  education: 'BCA — Jagran College (CSJMU)',
  graduationYear: '2027',
  cgpa: '8.0 / 10',
  profileImage: '/images/profile.webp',
  resumeUrl: '/Full_Stack_Developer_Resume.pdf',
  metaDescription:
    'Pradyumn Dwivedi is a full-stack developer from Kanpur, India, building production-ready web applications with the MERN and PERN stacks using React.js, Node.js, Express.js, MongoDB and PostgreSQL.',
  siteUrl: 'https://pradyumndwivedi.dev/',
}

export const summary =
  'Third-year BCA student and Full Stack Developer with hands-on experience building and deploying production-ready web applications using the MERN and PERN stacks. Skilled in React.js, Node.js, Express.js, REST APIs, MongoDB, PostgreSQL, authentication, payment integration and cloud-based media management.'

export const socials = [
  {
    name: 'GitHub',
    handle: '@KaizenPrad',
    url: 'https://github.com/KaizenPrad',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    handle: 'pradyumn-dwivedi',
    url: 'https://www.linkedin.com/in/pradyumn-dwivedi-a6717834b/',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    handle: personal.email,
    url: `mailto:${personal.email}`,
    icon: 'mail',
  },
  {
    name: 'WhatsApp',
    handle: personal.whatsapp,
    url: `https://wa.me/${personal.whatsappRaw}`,
    icon: 'whatsapp',
  },
]

export const navLinks = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export const certifications = [
  {
    name: 'Kestra Fundamentals Certificate',
    issuer: 'Kestra Academy',
    note: 'Foundational training in workflow orchestration, automation pipelines and modern data workflow concepts.',
  },
]

/**
 * Contact form delivery.
 *
 * Priority order:
 *  1. `endpoint` — a hosted form service (Formspree / Basin / Web3Forms)
 *     that POSTs the message straight to your inbox. Paste a *public*
 *     endpoint URL here; never an API secret.
 *  2. No endpoint → the visitor's message is formatted and handed to
 *     WhatsApp (deep link with the full text pre-filled) or Gmail
 *     (compose link), so nothing is ever stored on this site.
 */
export const contactForm = {
  endpoint: '',
  recipient: personal.email,
  whatsapp: personal.whatsappRaw,
  siteName: 'Pradyumn Dwivedi — Portfolio',
}
