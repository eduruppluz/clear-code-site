import { palette } from './themes'

/** Conteúdo institucional (fonte: apresentação institucional Clear Code ERL) */

export const pillars = [
  { title: 'Clareza', text: 'Soluções simples e processos transparentes.', color: palette.royal },
  { title: 'Tecnologia', text: 'Estruturas modernas que funcionam de verdade.', color: palette.azul },
  { title: 'Resultado', text: 'Cada projeto com propósito para o negócio.', color: palette.gelo },
]

export type ServiceId = 'sites' | 'landing' | 'trafego' | 'leads' | 'crm' | 'automacoes'
export type Stage = 'Atrair' | 'Captar' | 'Organizar'

/** As 3 etapas do caminho do cliente — "do primeiro clique até a venda" */
export const stages: { name: Stage; text: string; color: string }[] = [
  { name: 'Atrair', text: 'Sites, landing pages e Meta Ads para o seu cliente te encontrar.', color: palette.gelo },
  { name: 'Captar', text: 'Formulários, WhatsApp e páginas de conversão para ele entrar em contato.', color: palette.azul },
  { name: 'Organizar', text: 'CRM e automações para nenhum contato se perder até virar venda.', color: palette.royal },
]

export const services: { id: ServiceId; stage: Stage; title: string; short: string; text: string; color: string }[] = [
  {
    id: 'sites',
    stage: 'Atrair',
    title: 'Sites',
    short: 'Presença digital profissional',
    text: 'Sites institucionais rápidos, responsivos e bem estruturados para apresentar sua empresa com a credibilidade que ela merece.',
    color: palette.gelo,
  },
  {
    id: 'landing',
    stage: 'Atrair',
    title: 'Landing Pages',
    short: 'Campanhas e conversão',
    text: 'Páginas focadas em um único objetivo, pensadas para transformar visitantes em contatos, vendas ou inscrições.',
    color: palette.ceu,
  },
  {
    id: 'trafego',
    stage: 'Atrair',
    title: 'Meta Ads',
    short: 'Anúncios no Instagram e Facebook',
    text: 'Campanhas e criativos planejados para levar as pessoas certas até o seu negócio, com acompanhamento e ajustes contínuos.',
    color: palette.azul,
  },
  {
    id: 'leads',
    stage: 'Captar',
    title: 'Captação de contatos',
    short: 'Formulários, WhatsApp e conversão',
    text: 'Formulários, botões de WhatsApp e páginas de conversão que transformam quem visita em quem chama você.',
    color: palette.ceu,
  },
  {
    id: 'crm',
    stage: 'Organizar',
    title: 'CRM',
    short: 'Seus contatos em um só lugar',
    text: 'Implantação e configuração de CRM para acompanhar cada contato, da primeira mensagem até a venda, sem planilha perdida.',
    color: palette.royal,
  },
  {
    id: 'automacoes',
    stage: 'Organizar',
    title: 'Automações',
    short: 'Respostas e follow-up no automático',
    text: 'O contato chega, cai no CRM e recebe uma mensagem na hora. Você só entra para fazer o follow-up e fechar.',
    color: palette.profundo,
  },
]

export const steps = [
  {
    n: '01', title: 'Entendemos', kicker: 'Imersão',
    text: 'Conhecemos o negócio, objetivos, público e desafio. Mergulhamos no que realmente importa antes de propor qualquer solução.',
    icon: 'search', themeKey: 'step1', color: palette.gelo,
  },
  {
    n: '02', title: 'Planejamos', kicker: 'Estratégia',
    text: 'Definimos estratégia, prioridades e estrutura — o melhor caminho para gerar resultados reais.',
    icon: 'map', themeKey: 'step2', color: palette.ceu,
  },
  {
    n: '03', title: 'Criamos', kicker: 'Construção',
    text: 'Transformamos o planejamento em uma solução funcional, sob medida, com foco em qualidade, performance e experiência.',
    icon: 'code', themeKey: 'step3', color: palette.azul,
  },
  {
    n: '04', title: 'Publicamos', kicker: 'Lançamento',
    text: 'Colocamos a solução no ar com segurança e precisão, e realizamos os ajustes para uma transição suave ao ambiente real.',
    icon: 'rocket', themeKey: 'step4', color: palette.royal,
  },
  {
    n: '05', title: 'Acompanhamos', kicker: 'Evolução',
    text: 'Analisamos os resultados e identificamos oportunidades de evolução para manter sua solução sempre à frente.',
    icon: 'chart', themeKey: 'step5', color: palette.profundo,
  },
] as const

export const principles = [
  { title: 'Comunicação clara', text: 'Tecnologia sem tecniquês desnecessário. Transparência e entendimento em cada etapa.', color: palette.ceu },
  { title: 'Visão de negócio', text: 'Foco no objetivo por trás da tecnologia.', color: palette.azul },
  { title: 'Soluções sob medida', text: 'Projetos personalizados para a realidade de cada negócio.', color: palette.royal },
  { title: 'Evolução', text: 'Pensar no presente e no futuro do negócio.', color: palette.aco },
]

export const dnaFlow = [
  { title: 'Ideia', text: 'Entendemos o desafio com clareza.', color: palette.royal },
  { title: 'Estratégia', text: 'Planejamos o caminho mais inteligente.', color: palette.azul },
  { title: 'Tecnologia', text: 'Construímos com código, dados e excelência.', color: palette.ceu },
  { title: 'Resultado', text: 'Entregamos soluções que geram valor de verdade.', color: palette.gelo },
]

export const dnaName = [
  { word: 'CLEAR', text: 'Clareza para compreender e simplificar processos.', color: palette.royal },
  { word: 'CODE', text: 'Tecnologia e execução para transformar ideias em soluções.', color: palette.azul },
  { word: 'ERL', text: 'Assinatura do fundador, Eduardo Rupp da Luz.', color: palette.ceu },
]
