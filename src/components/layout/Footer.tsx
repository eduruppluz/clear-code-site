import { Link } from 'react-router'
import { site } from '../../config/site'
import { Logo } from '../brand/Logo'
import { Container } from '../ui/Container'

const links = [
  { to: '/sobre', label: 'Sobre' },
  { to: '/solucoes', label: 'Soluções' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/contato', label: 'Contato' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const social = [
    { href: site.contact.instagramUrl, label: `Instagram ${site.contact.instagramHandle}`, short: 'Instagram', detail: site.contact.instagramHandle },
    { href: site.contact.whatsappUrl, label: `WhatsApp ${site.contact.whatsappDisplay}`, short: 'WhatsApp', detail: site.contact.whatsappDisplay },
    { href: `mailto:${site.contact.email}`, label: `E-mail ${site.contact.email}`, short: 'E-mail', detail: site.contact.email },
  ]
  return (
    <footer className="relative border-t border-white/[0.06] py-14">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-a), transparent)', opacity: 0.6 }} />
      <Container className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted">{site.description}</p>
        </div>
        <nav aria-label="Rodapé">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dim">Navegação</h2>
          <ul className="grid gap-2.5 text-sm">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted transition-colors hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dim">Contato</h2>
          <ul className="grid gap-2.5 text-sm">
            {social.map((s) => (
              <li key={s.short}>
                <a href={s.href} target="_blank" rel="noopener" aria-label={s.label} className="group flex gap-2 text-muted transition-colors hover:text-white">
                  <span className="w-20 text-dim group-hover:text-muted">{s.short}</span>
                  <span className="truncate">{s.detail}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="mt-12 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-xs text-dim sm:flex-row sm:justify-between">
        <p>© {year} {site.name}. Todos os direitos reservados.</p>
        <p>{site.signature}</p>
      </Container>
    </footer>
  )
}
