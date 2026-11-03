/**
 * Paleta de acentos e "temas" de cor — Identidade 2.0.
 *
 * Toda a paleta é derivada da logo nova (lâmpada azul com órbitas):
 * do azul-gelo do topo do bulbo ao azul-royal da base, mais o azul-aço
 * da paleta de apoio. A cor continua mudando por seção/etapa, mas sempre
 * dentro da família do azul — mais sóbrio e mais "Clear".
 *
 * Um tema = { a, b, glow }. O motor (src/theme) interpola entre os temas
 * dos blocos marcados com <Themed> conforme o scroll e ao trocar de página.
 */
export type Theme = { a: string; b: string; glow: number }

export const palette = {
  gelo: '#BFE6FF',     // topo do bulbo — destaques claros
  ceu: '#6CC0FF',      // órbitas
  nevoa: '#7DA0CA',    // apoio, textos secundários
  azul: '#4AA3FF',     // azul vivo
  royal: '#2563EB',    // base do bulbo — botões e destaques fortes
  profundo: '#3B4FD8', // azul-índigo, para variar sem sair da família
  aco: '#5483B3',      // azul-aço (paleta de apoio)
} as const

const t = (a: string, b: string, glow = 1): Theme => ({ a, b, glow })
const p = palette

export const themes = {
  // Início
  hero: t(p.ceu, p.royal, 1.15),
  pillars: t(p.azul, p.royal, 0.85),
  servicesTeaser: t(p.gelo, p.azul, 0.95),
  projectTeaser: t(p.ceu, p.profundo, 0.95),
  cta: t(p.gelo, p.royal, 1.1),

  // Processo — uma cor por etapa
  step1: t(p.gelo, p.gelo, 1.05),
  step2: t(p.ceu, p.ceu, 1.05),
  step3: t(p.azul, p.azul, 1.1),
  step4: t(p.royal, p.royal, 1.1),
  step5: t(p.profundo, p.profundo, 1.1),

  // Páginas
  solucoes: t(p.gelo, p.azul, 1),
  principios: t(p.nevoa, p.profundo, 0.95),
  projetos: t(p.ceu, p.royal, 1.05),
  sobre: t(p.azul, p.profundo, 1.05),
  dna1: t(p.nevoa, p.profundo, 1.15),
  dna2: t(p.azul, p.royal, 1.2),
  dna3: t(p.gelo, p.azul, 1.2),
  contato: t(p.ceu, p.royal, 1.1),
} satisfies Record<string, Theme>

export const encodeTheme = (th: Theme) => `${th.a},${th.b},${th.glow}`
export function decodeTheme(s: string): Theme {
  const [a, b, g] = s.split(',')
  return { a, b, glow: Number(g) }
}
