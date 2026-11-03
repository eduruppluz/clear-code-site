import { palette } from './themes';
/** Conteúdo institucional (fonte: apresentação institucional Clear Code ERL) */
export const pillars = [
    { title: 'Clareza', text: 'Soluções simples e processos transparentes.', color: palette.lilas },
    { title: 'Tecnologia', text: 'Estruturas modernas que funcionam de verdade.', color: palette.azul },
    { title: 'Resultado', text: 'Cada projeto com propósito para o negócio.', color: palette.aqua },
];
/** As 3 etapas do caminho do cliente: atrair, captar e organizar */
export const stages = [
    { name: 'Atrair', text: 'Sites, landing pages e Meta Ads para que potenciais clientes encontrem o negócio.', color: palette.aqua },
    { name: 'Captar', text: 'Formulários, WhatsApp e páginas de conversão para transformar o interesse em contatos.', color: palette.azul },
    { name: 'Organizar', text: 'CRM e automações para registrar, organizar e acompanhar os contatos até a oportunidade de venda.', color: palette.lilas },
];
export const services = [
    {
        id: 'sites',
        stage: 'Atrair',
        title: 'Sites',
        short: 'Presença digital profissional',
        text: 'Sites institucionais rápidos, responsivos e bem estruturados para apresentar sua empresa com a credibilidade que ela merece.',
        color: palette.aqua,
    },
    {
        id: 'landing',
        stage: 'Atrair',
        title: 'Landing Pages',
        short: 'Campanhas e conversão',
        text: 'Páginas focadas em um único objetivo, pensadas para transformar visitantes em contatos, vendas ou inscrições.',
        color: palette.ciano,
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
        color: palette.lilas,
    },
    {
        id: 'crm',
        stage: 'Organizar',
        title: 'CRM',
        short: 'Seus contatos em um só lugar',
        text: 'Implantação e configuração de CRM para acompanhar cada contato desde a primeira mensagem, sem planilha perdida.',
        color: palette.violeta,
    },
    {
        id: 'automacoes',
        stage: 'Organizar',
        title: 'Automações',
        short: 'Respostas e follow-up no automático',
        text: 'O contato chega, cai no CRM e recebe uma mensagem na hora. Você só entra para fazer o follow-up e fechar.',
        color: palette.magenta,
    },
];
export const steps = [
    {
        n: '01', title: 'Entendemos', kicker: 'Imersão',
        text: 'Conhecemos o negócio, objetivos, público e desafio. Mergulhamos no que realmente importa antes de propor qualquer solução.',
        icon: 'search', themeKey: 'step1', color: palette.aqua,
    },
    {
        n: '02', title: 'Planejamos', kicker: 'Estratégia',
        text: 'Definimos estratégia, prioridades e estrutura — o melhor caminho para gerar resultados reais.',
        icon: 'map', themeKey: 'step2', color: palette.ciano,
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
        icon: 'chart', themeKey: 'step5', color: palette.magenta,
    },
];
export const principles = [
    { title: 'Comunicação clara', text: 'Tecnologia sem tecniquês desnecessário. Transparência e entendimento em cada etapa.', color: palette.ciano },
    { title: 'Visão de negócio', text: 'Foco no objetivo por trás da tecnologia.', color: palette.azul },
    { title: 'Soluções sob medida', text: 'Projetos personalizados para a realidade de cada negócio.', color: palette.royal },
    { title: 'Evolução', text: 'Pensar no presente e no futuro do negócio.', color: palette.magenta },
];
export const dnaFlow = [
    { title: 'Ideia', text: 'Entendemos o desafio com clareza.', color: palette.royal },
    { title: 'Estratégia', text: 'Planejamos o caminho mais inteligente.', color: palette.azul },
    { title: 'Tecnologia', text: 'Construímos com código, dados e excelência.', color: palette.ciano },
    { title: 'Resultado', text: 'Entregamos soluções que geram valor de verdade.', color: palette.aqua },
];
export const dnaName = [
    { word: 'CLEAR', text: 'Clareza para compreender e simplificar processos.', color: palette.royal },
    { word: 'CODE', text: 'Tecnologia e execução para transformar ideias em soluções.', color: palette.azul },
    { word: 'ERL', text: 'Assinatura do fundador, Eduardo Rupp da Luz.', color: palette.ciano },
];
