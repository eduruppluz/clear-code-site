import { LogoMark } from '../../components/brand/LogoMark'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Reveal } from '../../components/ui/Reveal'
import { site } from '../../config/site'
import { themes } from '../../config/themes'
import { Themed } from '../../theme/Themed'

/** CTA final — repetido no fim de cada página */
export function FinalCTA({ withContactLink = true }: { withContactLink?: boolean }) {
  return (
    <Themed theme={themes.cta} id="cta" data-label="Contato" className="relative py-[var(--section-y)]" aria-labelledby="cta-title">
      <Container>
        <Reveal className="glow-card relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20" data-on="true">
          <div aria-hidden="true" className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-a), transparent)' }} />
          <div aria-hidden="true" className="absolute -top-32 left-1/2 size-80 -translate-x-1/2 rounded-full blur-3xl" style={{ background: 'color-mix(in oklab, var(--accent-a) 30%, transparent)' }} />
          <LogoMark className="relative mx-auto h-16 w-auto" />
          <h2 id="cta-title" className="relative mx-auto mt-8 max-w-3xl font-display text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold leading-[1.05]">
            Tecnologia para transformar o <span className="text-gradient">seu negócio</span>.
          </h2>
          <p className="relative mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Tem uma ideia, uma necessidade ou um projeto em mente? Conte para a Clear Code ERL. Vamos entender o seu desafio e construir a solução ideal para o seu negócio.
          </p>
          <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={site.contact.whatsappUrl} target="_blank" rel="noopener" arrow>Vamos conversar</Button>
            {withContactLink && <Button to="/contato" variant="ghost">Outros canais</Button>}
          </div>
        </Reveal>
      </Container>
    </Themed>
  )
}
