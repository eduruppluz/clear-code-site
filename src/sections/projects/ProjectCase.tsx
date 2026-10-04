import { Button } from '../../components/ui/Button'
import { Reveal } from '../../components/ui/Reveal'
import type { Project } from '../../config/projects'
import { ProjectMockup } from './ProjectMockup'

/** Case completo (página Projetos) ou resumido (destaque na Início) */
export function ProjectCase({ project, index = 0, compact = false }: { project: Project; index?: number; compact?: boolean }) {
  return (
    <article className="grid items-center gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16" aria-labelledby={`proj-${project.slug}`}>
      <Reveal className="lg:order-1">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
          <span className="tabular-nums" style={{ color: 'var(--accent-a)' }}>{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-8 bg-white/20" />
          <span className="text-dim">{project.type}</span>
        </div>
        <h3 id={`proj-${project.slug}`} className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.02]">
          {project.name}
        </h3>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Categorias">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full border px-3 py-1 text-xs font-medium text-white/85" style={{ borderColor: 'color-mix(in oklab, var(--accent-a) 45%, transparent)', background: 'color-mix(in oklab, var(--accent-a) 8%, transparent)' }}>
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-6 leading-relaxed text-muted">{project.summary}</p>

        {!compact && (
          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-dim">O que entregamos</h4>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {project.delivered.map((d) => (
                <li key={d} className="flex gap-3 text-sm text-white/85">
                  <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0" fill="none" stroke="var(--accent-a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 10.5 3 3 7-7" /></svg>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href={project.url} target="_blank" rel="noopener" arrow aria-label={`Ver projeto ${project.name} (abre em nova guia)`}>
            Ver projeto
          </Button>
          {compact && <Button to="/projetos" variant="ghost">Ver todos os projetos</Button>}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="lg:order-2">
        <ProjectMockup project={project} />
      </Reveal>
    </article>
  )
}
