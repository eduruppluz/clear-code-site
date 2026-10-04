import { palette } from './themes'

/** Conteúdo institucional (fonte: apresentação institucional Clear Code ERL) */

export const pillars = [
  { title: 'Clareza', text: 'Soluções simples e processos transparentes.', color: palette.lilac },
  { title: 'Tecnologia', text: 'Estruturas modernas que funcionam de verdade.', color: palette.blue },
  { title: 'Resultado', text: 'Cada projeto com propósito para o negócio.', color: palette.aqua },
]

export type ServiceId = 'sites' | 'landing' | 'leads' | 'trafego' | 'criativos'
export const services: { id: ServiceId; title: string; short: string; text: string; color: string }[] = [
  {
    id: 'sites',
    title: 'Sites',
    short: 'Presença digital profissional',
    text: 'Sites institucionais rápidos, responsivos e bem estruturados para apresentar sua empresa com a credibilidade que ela merece.',
    color: palette.cyan,
  },
  {
    id: 'landing',
    title: 'Landing Pages',
    short: 'Campanhas e conversão',
    text: 'Páginas focadas em um único objetivo, pensadas para transformar visitantes em contatos, vendas ou inscrições.',
    color: palette.blue,
  },
  {
    id: 'leads',
    title: 'Geração de Leads',
    short: 'Aproximação de potenciais clientes',
    text: 'Estruturas que atraem e organizam pessoas interessadas no que você oferece, para que nenhuma oportunidade se perca.',
    color: palette.lilac,
  },
  {
    id: 'trafego',
    title: 'Tráfego Pago',
    short: 'Planejamento e gestão de campanhas',
    text: 'Campanhas planejadas para levar as pessoas certas até a sua solução, com acompanhamento e ajustes contínuos.',
    color: palette.magenta,
  },
  {
    id: 'criativos',
    title: 'Criativos',
    short: 'Anúncios claros e atrativos',
    text: 'Peças visuais para anúncios e redes que comunicam sua mensagem com clareza e chamam atenção no lugar certo.',
    color: palette.aqua,
  },
]

export const steps = [
  {
    n: '01', title: 'Entendemos', kicker: 'Imersão',
    text: 'Conhecemos o negócio, objetivos, público e desafio. Mergulhamos no que realmente importa antes de propor qualquer solução.',
    icon: 'search', themeKey: 'step1', color: palette.aqua,
  },
  {
    n: '02', title: 'Planejamos', kicker: 'Estratégia',
    text: 'Definimos estratégia, prioridades e estrutura — o melhor caminho para gerar resultados reais.',
    icon: 'map', themeKey: 'step2', color: palette.cyan,
  },
  {
    n: '03', title: 'Criamos', kicker: 'Construção',
    text: 'Transformamos o planejamento em uma solução funcional, sob medida, com foco em qualidade, performance e experiência.',
    icon: 'code', themeKey: 'step3', color: palette.blue,
  },
  {
    n: '04', title: 'Publicamos', kicker: 'Lançamento',
    text: 'Colocamos a solução no ar com segurança e precisão, e realizamos os ajustes para uma transição suave ao ambiente real.',
    icon: 'rocket', themeKey: 'step4', color: palette.lilac,
  },
  {
    n: '05', title: 'Acompanhamos', kicker: 'Evolução',
    text: 'Analisamos os resultados e identificamos oportunidades de evolução para manter sua solução sempre à frente.',
    icon: 'chart', themeKey: 'step5', color: palette.magenta,
  },
] as const

export const principles = [
  { title: 'Comunicação clara', text: 'Tecnologia sem tecniquês desnecessário. Transparência e entendimento em cada etapa.', color: palette.cyan },
  { title: 'Visão de negócio', text: 'Foco no objetivo por trás da tecnologia.', color: palette.blue },
  { title: 'Soluções sob medida', text: 'Projetos personalizados para a realidade de cada negócio.', color: palette.lilac },
  { title: 'Evolução', text: 'Pensar no presente e no futuro do negócio.', color: palette.magenta },
]

export const dnaFlow = [
  { title: 'Ideia', text: 'Entendemos o desafio com clareza.', color: palette.lilac },
  { title: 'Estratégia', text: 'Planejamos o caminho mais inteligente.', color: palette.blue },
  { title: 'Tecnologia', text: 'Construímos com código, dados e excelência.', color: palette.cyan },
  { title: 'Resultado', text: 'Entregamos soluções que geram valor de verdade.', color: palette.aqua },
]

export const dnaName = [
  { word: 'CLEAR', text: 'Clareza para compreender e simplificar processos.', color: palette.lilac },
  { word: 'CODE', text: 'Tecnologia e execução para transformar ideias em soluções.', color: palette.blue },
  { word: 'ERL', text: 'Assinatura do fundador, Eduardo Rupp da Luz.', color: palette.cyan },
]
