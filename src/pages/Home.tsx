import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Reveal, SectionHeading } from '../components/ui/Reveal'
import { projects } from '../config/projects'
import { themes } from '../config/themes'
import { Hero } from '../sections/Hero/Hero'
import { Process } from '../sections/process/Process'
import { ProjectCase } from '../sections/projects/ProjectCase'
import { ServicesGrid } from '../sections/services/ServicesGrid'
import { FinalCTA } from '../sections/shared/FinalCTA'
import { Pillars } from '../sections/shared/Pillars'
import { Themed } from '../theme/Themed'

export default function Home() {
  return (
    <>
      <Hero />

      <Themed theme={themes.pillars} id="sobre-resumo" label="Sobre" className="relative py-[var(--section-y)]" aria-labelledby="sobre-title">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <SectionHeading
              id="sobre-title"
              eyebrow="O que é a Clear Code"
              title={<>Tecnologia que faz sentido para o <span className="text-gradient">seu negócio</span>.</>}
            />
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-muted">
                Na Clear Code ERL, entendemos o seu negócio antes de escrever qualquer linha de código. Transformamos desafios reais em soluções digitais que geram valor de forma clara e eficiente.
              </p>
            </Reveal>
          </div>
          <div className="mt-14">
            <Pillars />
          </div>
          <Reveal className="mt-10">
            <Button to="/sobre" variant="ghost" arrow>Conheça a Clear Code</Button>
          </Reveal>
        </Container>
      </Themed>

      <Themed theme={themes.servicesTeaser} id="solucoes" label="Soluções" className="relative py-[var(--section-y)]" aria-labelledby="solucoes-title">
        <Container>
          <SectionHeading
            id="solucoes-title"
            eyebrow="Soluções"
            title={<>Soluções digitais para diferentes momentos do <span className="text-gradient">seu negócio</span>.</>}
            lead="Oferecemos um portfólio completo de soluções para impulsionar presença, atrair clientes e gerar resultados."
          />
          <div className="mt-14">
            <ServicesGrid />
          </div>
          <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center">
            <p className="font-display text-lg font-semibold sm:text-xl">
              <span className="text-gradient">Estratégia</span> + <span className="text-gradient">tecnologia</span> + <span className="text-gradient">execução</span> trabalhando juntas.
            </p>
            <Button to="/solucoes" arrow>Ver todas as soluções</Button>
          </Reveal>
        </Container>
      </Themed>

      <Process />

      <Themed theme={themes.projectTeaser} id="projetos" label="Projetos" className="relative py-[var(--section-y)]" aria-labelledby="projetos-title">
        <Container>
          <SectionHeading
            id="projetos-title"
            eyebrow="Projetos"
            title={<>Projetos que transformam ideias em <span className="text-gradient">experiências digitais</span>.</>}
          />
          <div className="mt-14 lg:mt-20">
            <ProjectCase project={projects[0]} compact />
          </div>
        </Container>
      </Themed>

      <FinalCTA />
    </>
  )
}
