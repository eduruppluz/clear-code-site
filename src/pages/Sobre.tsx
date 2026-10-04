import { Container } from '../components/ui/Container'
import { Reveal, SectionHeading } from '../components/ui/Reveal'
import { themes } from '../config/themes'
import { DNA } from '../sections/dna/DNA'
import { FinalCTA } from '../sections/shared/FinalCTA'
import { PageHero } from '../sections/shared/PageHero'
import { Pillars } from '../sections/shared/Pillars'
import { Themed } from '../theme/Themed'

export default function Sobre() {
  return (
    <>
      <PageHero
        theme={themes.sobre}
        eyebrow="Sobre a Clear Code ERL"
        title={<>Tecnologia que faz sentido para o <span className="text-gradient">seu negócio</span>.</>}
        lead="Na Clear Code ERL, entendemos o seu negócio antes de escrever qualquer linha de código. Transformamos desafios reais em soluções digitais que geram valor de forma clara e eficiente."
      />

      <Themed theme={themes.sobre} id="proposito" label="Propósito" className="relative pb-[var(--section-y)]" aria-labelledby="proposito-title">
        <Container>
          <Reveal>
            <blockquote className="relative border-l-2 py-2 pl-6 sm:pl-10" style={{ borderColor: 'var(--accent-a)' }}>
              <p id="proposito-title" className="max-w-4xl font-display text-[clamp(1.5rem,3.6vw,2.6rem)] font-bold leading-snug">
                Transformar necessidades de negócio em <span className="text-gradient">soluções digitais claras, funcionais e eficientes.</span>
              </p>
              <footer className="mt-4 text-sm uppercase tracking-[0.2em] text-dim">Nosso propósito</footer>
            </blockquote>
          </Reveal>
          <div className="mt-20">
            <SectionHeading eyebrow="Nossos pilares" title={<>Três palavras guiam <span className="text-gradient">cada projeto</span>.</>} />
            <div className="mt-12">
              <Pillars />
            </div>
          </div>
        </Container>
      </Themed>

      <DNA />
      <FinalCTA />
    </>
  )
}
