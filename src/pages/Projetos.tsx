import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { LogoMark } from '../components/brand/LogoMark'
import { projects } from '../config/projects'
import { themes } from '../config/themes'
import { ProjectCase } from '../sections/projects/ProjectCase'
import { PageHero } from '../sections/shared/PageHero'
import { Themed } from '../theme/Themed'

export default function Projetos() {
  return (
    <>
      <PageHero
        theme={themes.projetos}
        eyebrow="Projetos"
        title={<>Projetos que transformam ideias em <span className="text-gradient">experiências digitais</span>.</>}
        lead="Cada projeto começa entendendo o negócio. Aqui você vê o que construímos e como cada solução foi pensada para o objetivo do cliente."
      />

      <Themed theme={themes.projetos} id="cases" className="relative pb-[var(--section-y)]" aria-label="Projetos realizados">
        <Container className="grid gap-24 lg:gap-32">
          {projects.map((p, i) => (
            <ProjectCase key={p.slug} project={p} index={i} />
          ))}

          {/* convite no lugar de cards "em breve" vazios */}
          <Reveal>
            <div className="glow-card is-interactive group relative flex flex-col items-start gap-8 overflow-hidden p-8 sm:flex-row sm:items-center sm:p-12" data-on="true">
              <div aria-hidden="true" className="absolute -right-16 -top-16 size-64 rounded-full blur-3xl" style={{ background: 'color-mix(in oklab, var(--accent-a) 25%, transparent)' }} />
              <LogoMark className="relative h-20 w-auto shrink-0" />
              <div className="relative flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dim">{String(projects.length + 1).padStart(2, '0')} — Próximo projeto</p>
                <h2 className="mt-3 font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold leading-tight">
                  Seu projeto pode ser o <span className="text-gradient">próximo</span>.
                </h2>
                <p className="mt-3 max-w-xl text-muted">Conte sua ideia e vamos entender juntos o melhor caminho para colocá-la no ar.</p>
              </div>
              <Button to="/contato" arrow className="relative">Vamos conversar</Button>
            </div>
          </Reveal>
        </Container>
      </Themed>
    </>
  )
}
