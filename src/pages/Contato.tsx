import { Container } from '../components/ui/Container'
import { themes } from '../config/themes'
import { ContactChannels, ContactForm } from '../sections/contact/Contact'
import { PageHero } from '../sections/shared/PageHero'
import { Themed } from '../theme/Themed'

export default function Contato() {
  return (
    <>
      <PageHero
        theme={themes.contato}
        eyebrow="Contato"
        title={<>Vamos <span className="text-gradient">conversar</span>?</>}
        lead="Tem uma ideia, uma necessidade ou um projeto em mente? Conte para a Clear Code ERL. Vamos entender o seu desafio e construir a solução ideal para o seu negócio."
      />
      <Themed theme={themes.contato} id="canais" className="relative pb-[var(--section-y)]" aria-label="Canais de contato">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div>
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-dim">Fale direto com a gente</h2>
            <ContactChannels />
          </div>
          <ContactForm />
        </Container>
      </Themed>
    </>
  )
}
