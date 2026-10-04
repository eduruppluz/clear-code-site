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
      'Sites, landing pages, geração de leads, tráfego pago e criativos. Soluções digitais pensadas para fortalecer sua presença, gerar oportunidades e ajudar sua empresa a crescer.',
  },
  '/solucoes': {
    title: 'Soluções — Clear Code ERL',
    description: 'Sites, landing pages, geração de leads, tráfego pago e criativos: soluções digitais para diferentes momentos do seu negócio.',
  },
  '/projetos': {
    title: 'Projetos — Clear Code ERL',
    description: 'Projetos que transformam ideias em experiências digitais. Conheça o trabalho da Clear Code ERL.',
  },
  '/sobre': {
    title: 'Sobre — Clear Code ERL',
    description: 'Na Clear Code ERL, entendemos o seu negócio antes de escrever qualquer linha de código.',
  },
  '/contato': {
    title: 'Contato — Clear Code ERL',
    description: 'Tem uma ideia, uma necessidade ou um projeto em mente? Conte para a Clear Code ERL.',
  },
}
