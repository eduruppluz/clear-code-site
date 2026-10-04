import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { themes } from '../config/themes'
import { Principles } from '../sections/principles/Principles'
import { ServicesGrid } from '../sections/services/ServicesGrid'
import { FinalCTA } from '../sections/shared/FinalCTA'
import { PageHero } from '../sections/shared/PageHero'
import { Themed } from '../theme/Themed'

export default function Solucoes() {
  return (
    <>
      <PageHero
        theme={themes.solucoes}
        eyebrow="Soluções"
        title={<>Soluções digitais para diferentes momentos do <span className="text-gradient">seu negócio</span>.</>}
        lead="Oferecemos um portfólio completo de soluções para impulsionar presença, atrair clientes e gerar resultados."
      />

      <Themed theme={themes.solucoes} id="servicos" label="Serviços" className="relative pb-[var(--section-y)]" aria-label="Nossos serviços">
        <Container>
          <ServicesGrid detailed />
          <Reveal className="glow-card relative mt-8 overflow-hidden px-6 py-8 text-center sm:py-10" data-on="true">
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-a), transparent)' }} />
            <p className="font-display text-xl font-semibold sm:text-2xl">
              <span className="text-gradient">Estratégia</span> + <span className="text-gradient">tecnologia</span> + <span className="text-gradient">execução</span> trabalhando juntas.
            </p>
          </Reveal>
        </Container>
      </Themed>

      <Principles />
      <FinalCTA />
    </>
  )
}
