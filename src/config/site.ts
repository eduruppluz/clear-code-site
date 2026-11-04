/**
 * Dados da empresa. Tudo que é contato/SEO fica aqui.
 * Contatos atuais são provisórios (dados pessoais do fundador) —
 * troque aqui quando a Clear Code tiver canais próprios.
 */
const whatsappNumber = '5541984731156'
const whatsappMessage = 'Olá, Clear Code! Tenho um projeto em mente e gostaria de conversar.'

export const site = {
  name: 'Clear Code ERL',
  tagline: 'Tecnologia para transformar o seu negócio.',
  signature: 'Da ideia ao código.',
  description: 'Ideias que conectam. Tecnologia que transforma.',
  /** texto de apoio da página inicial e da descrição para o Google */
  pitch: 'Sites, anúncios e automações para conectar seu negócio aos clientes e organizar oportunidades comerciais.',
  url: 'https://clearcodeerl.com.br',
  founder: 'Eduardo Rupp da Luz',
  /** recebe os leads do formulário na planilha do CRM; o endereço é público, sem token */
  crmUrl: 'https://script.google.com/macros/s/AKfycbySjIOjJoYL5OcnvhKc-GiNecCRSNfEgpR1Dk94gfAcxK4fKiRjY792ac-P0o_qGrst/exec',
  contact: {
    whatsappDisplay: '(41) 98473-1156',
    whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    instagramHandle: '@clearcode.erl',
    instagramUrl: 'https://www.instagram.com/clearcode.erl/',
    email: 'edurupp.dev@gmail.com',
  },
} as const
