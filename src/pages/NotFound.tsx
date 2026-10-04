import { Button } from '../components/ui/Button'
import { themes } from '../config/themes'
import { PageHero } from '../sections/shared/PageHero'

export default function NotFound() {
  return (
    <PageHero theme={themes.contato} eyebrow="Erro 404" title={<>Esta página <span className="text-gradient">não existe</span>.</>} lead="O endereço pode ter mudado. Volte para o início e continue navegando.">
      <div className="mt-10">
        <Button to="/" arrow>Voltar ao início</Button>
      </div>
    </PageHero>
  )
}
