import { Code2, Layers, PlugZap } from 'lucide-react'

export const services = [
  {
    id: 'web',
    icon: Code2,
    title: 'Web Development',
    description:
      'Fast, responsive marketing sites and storefronts built with modern tooling — designed to look sharp on every screen and load quickly on a phone.',
    points: [
      'Business websites',
      'Landing pages',
      'E-commerce websites',
      'Responsive interfaces',
    ],
  },
  {
    id: 'fullstack',
    icon: Layers,
    title: 'Full-Stack Development',
    description:
      'Complete applications where the interface, the API and the database are designed together — so the product works, not just the mockup.',
    points: [
      'Full-stack applications',
      'Admin dashboards',
      'Authentication systems',
      'REST APIs',
      'Database-driven applications',
    ],
  },
  {
    id: 'backend',
    icon: PlugZap,
    title: 'Backend & Integration',
    description:
      'The plumbing behind the product — architecture, schema design, third-party integrations and a deployment you can actually maintain.',
    points: [
      'Backend architecture',
      'Database design',
      'Third-party API integration',
      'Payment integration',
      'Deployment',
    ],
  },
]

export const caseStudyPicks = ['cyber-sentinel', 'awaara-store', 'luxe-haven']
