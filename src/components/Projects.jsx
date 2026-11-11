import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const spans = [
  'lg:col-span-4',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-4',
  'lg:col-span-3',
  'lg:col-span-3',
  'lg:col-span-6',
]

export default function Projects() {
  return (
    <section id="projects" className="section scroll-mt-24">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured work"
            title="Selected"
            accent="Works."
            subtitle="Some things I've designed, developed and brought to life."
          />
          <Reveal delay={0.12}>
            <p className="max-w-xs font-mono text-[0.72rem] uppercase tracking-[0.2em] text-mist-500">
              {projects.length} projects · full-stack · shipped & live
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} span={spans[i] ?? 'lg:col-span-3'} />
          ))}
        </div>
      </div>
    </section>
  )
}
