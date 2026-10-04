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
  description: 'Tecnologia e soluções digitais.',
  url: 'https://ctbadigital.com',
  founder: 'Eduardo Rupp da Luz',
  contact: {
    whatsappDisplay: '(41) 98473-1156',
    whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    instagramHandle: '@edu.rupp',
    instagramUrl: 'https://www.instagram.com/edu.rupp/',
    email: 'edurupp.luz@gmail.com',
  },
} as const
