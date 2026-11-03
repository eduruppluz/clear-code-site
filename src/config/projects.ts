import valcarDesktop from '../assets/projects/valcar/home-desktop.webp'
import valcarMobile from '../assets/projects/valcar/home-mobile.webp'
import misterChapeuDesktop from '../assets/projects/mister-chapeu/home-desktop.webp'
import misterChapeuMobile from '../assets/projects/mister-chapeu/home-mobile.webp'
import kitOdontoDesktop from '../assets/projects/kit-odonto/home-desktop.webp'

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
    url: 'https://consorciovalcar.com.br/',
    type: 'Site Institucional',
    tags: ['Website', 'UX/UI', 'Desenvolvimento'],
    summary:
      'Site novo da Valcar Consórcio, com unidades em Manaus e Curitiba, Chevrolet Consórcio e Consórcio União. A proposta: apresentar a empresa com credibilidade, mostrar os modelos e levar o visitante a uma simulação pronta no WhatsApp.',
    delivered: [
      'Site institucional responsivo',
      'Simulador que envia a simulação pronta para o WhatsApp',
      'Carrossel deslizante com os modelos Chevrolet',
      'Seção do Consórcio União (carros, motos, imóveis e serviços)',
      'Unidades de Manaus e Curitiba com mapa',
      'Depoimentos reais em vídeo e texto',
      'Página “Seja Representante” com ficha de cadastro',
      'Domínio próprio configurado',
    ],
    images: {
      desktop: valcarDesktop,
      desktopAlt: 'Página inicial do site da Valcar Consórcio, com o título “Lugar de realizar.” e o simulador',
      mobile: valcarMobile,
      mobileAlt: 'Site da Valcar Consórcio no celular',
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
  {
    slug: 'kit-resumos-odontologia',
    name: 'Kit de Resumos de Odontologia',
    url: 'https://www.lcbdigital.com.br/',
    type: 'Landing Page de vendas',
    tags: ['Landing Page', 'UX/UI', 'Desenvolvimento'],
    summary:
      'Landing page de vendas para o Kit de Resumos de Odontologia da @laribelloni.odonto, um material digital para estudantes. A proposta: falar direto com a dor de quem está com a matéria acumulada, mostrar o material por dentro e levar o visitante, sem distração, até a compra.',
    delivered: [
      'Landing page de vendas responsiva',
      'Galeria com prévia das páginas do material',
      'Seções de benefícios, público e conteúdo do kit',
      'Oferta com checkout integrado à Hotmart',
      'Garantias e perguntas frequentes',
      'Publicada em domínio próprio',
    ],
    images: {
      desktop: kitOdontoDesktop,
      desktopAlt: 'Primeira tela da landing page do Kit de Resumos de Odontologia, com as capas dos resumos',
    },
  },
  // Próximo (estrutura pronta, adicionar quando houver material):
  // { slug: 'fala-uma-serie', name: 'Fala Uma Série', ... }
]
