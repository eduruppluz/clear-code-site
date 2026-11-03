/** Navegação principal. `hash` leva a uma seção dentro da página. */
export type NavItem = { label: string; to: string; hash?: string }

export const nav: NavItem[] = [
  { label: 'Início', to: '/' },
  { label: 'Soluções', to: '/solucoes' },
  { label: 'Como trabalhamos', to: '/', hash: 'processo' },
  { label: 'Projetos', to: '/projetos' },
  { label: 'Sobre', to: '/sobre' },
]

/** Metadados de SEO por página */
export const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Clear Code ERL — Tecnologia para transformar o seu negócio',
    description:
      'Ideias que conectam. Tecnologia que transforma. Sites, anúncios e automações para conectar seu negócio aos clientes e organizar oportunidades comerciais.',
  },
  '/solucoes': {
    title: 'Soluções — Clear Code ERL',
    description: 'Atrair, captar e organizar: sites, landing pages, Meta Ads, formulários, WhatsApp, CRM e automações para o seu negócio.',
  },
  '/projetos': {
    title: 'Projetos — Clear Code ERL',
    description: 'Projetos que transformam ideias em experiências digitais. Conheça o trabalho da Clear Code ERL.',
  },
  '/sobre': {
    title: 'Sobre — Clear Code ERL',
    description: 'Ideias que conectam. Tecnologia que transforma. Na Clear Code ERL, entendemos o seu negócio antes de escrever qualquer linha de código.',
  },
  '/contato': {
    title: 'Contato — Clear Code ERL',
    description: 'Tem uma ideia, uma necessidade ou um projeto em mente? Conte para a Clear Code ERL.',
  },
}
