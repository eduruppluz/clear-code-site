import valcarRepresentante from '../assets/projects/valcar/representante-desktop.webp'

/**
 * Portfólio. Para adicionar um projeto, acrescente um objeto aqui.
 * Só entram informações comprovadas — nada de métricas inventadas.
 * `images.mobile` é opcional: o mockup de celular só aparece se existir.
 */
export type Project = {
  slug: string
  name: string
  url: string
  type: string
  tags: string[]
  summary: string
  delivered: string[]
  images: { desktop: string; desktopAlt: string; mobile?: string; mobileAlt?: string }
}

export const projects: Project[] = [
  {
    slug: 'valcar',
    name: 'Valcar Consórcio',
    url: 'https://valcarconsorcio.com.br/',
    type: 'Site Institucional',
    tags: ['Website', 'UX/UI', 'Desenvolvimento'],
    summary:
      'Site institucional para a Valcar Consórcio, representante autorizada das maiores marcas de consórcio do Brasil. A proposta: apresentar a empresa com credibilidade e levar o visitante, com clareza, até o atendimento.',
    delivered: [
      'Site institucional responsivo',
      'Página “Seja Representante” com ficha de cadastro',
      'Página da campanha Pontualidade Premiada e regulamento',
      'Formulário de atendimento ao cliente',
      'Atendimento integrado ao WhatsApp',
      'Política de privacidade',
    ],
    images: {
      desktop: valcarRepresentante,
      desktopAlt: 'Página “Seja nosso Representante” do site da Valcar Consórcio',
    },
  },
  // Próximos (estrutura pronta, adicionar quando houver material):
  // { slug: 'fala-uma-serie', name: 'Fala Uma Série', ... }
  // { slug: 'resumos-odontologicos', name: 'Resumos Odontológicos', ... }
]
