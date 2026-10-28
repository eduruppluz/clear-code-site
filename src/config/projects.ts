import valcarRepresentante from '../assets/projects/valcar/representante-desktop.webp'
import misterChapeuDesktop from '../assets/projects/mister-chapeu/home-desktop.webp'
import misterChapeuMobile from '../assets/projects/mister-chapeu/home-mobile.webp'

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
  {
    slug: 'mister-chapeu',
    name: 'Mister Chapéu',
    url: 'https://misterchapeu.com.br/',
    type: 'Site Institucional',
    tags: ['Website', 'UX/UI', 'Desenvolvimento'],
    summary:
      'Site para a Mister Chapéu, marca de molhos artesanais premium de Curitiba. A proposta: dar à marca uma presença digital à altura do rótulo, apresentar os sabores e kits de forma apetitosa e levar o visitante direto para o pedido no WhatsApp, seja consumidor ou comerciante.',
    delivered: [
      'Site institucional responsivo',
      'Catálogo interativo de sabores',
      'Seção de kits com brindes',
      'Área para comerciantes e revendedores',
      'Depoimentos reais de clientes',
      'Pedidos integrados ao WhatsApp',
      'Domínio próprio configurado',
    ],
    images: {
      desktop: misterChapeuDesktop,
      desktopAlt: 'Página inicial do site da Mister Chapéu, com garrafa de molho, batatas e carne',
      mobile: misterChapeuMobile,
      mobileAlt: 'Site da Mister Chapéu no celular',
    },
  },
  // Próximos (estrutura pronta, adicionar quando houver material):
  // { slug: 'fala-uma-serie', name: 'Fala Uma Série', ... }
  // { slug: 'resumos-odontologicos', name: 'Resumos Odontológicos', ... }
]
