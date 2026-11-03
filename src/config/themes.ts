/**
 * Paleta de acentos e "temas" de cor — Identidade 2.0.
 *
 * O fundo é o marinho da marca (#021024) e a logo é azul. Por cima disso,
 * cada seção/etapa ganha uma cor de destaque bem marcante — aqua, ciano,
 * azul, lilás, violeta e magenta — e a logo gira o tom junto com ela.
 *
 * Um tema = { a, b, glow }. O motor (src/theme) interpola entre os temas
 * dos blocos marcados com <Themed> conforme o scroll e ao trocar de página.
 */
export type Theme = { a: string; b: string; glow: number }

export const palette = {
  aqua: '#12D6C1',
  ciano: '#08BFE8',
  azul: '#3FA2FF',
  royal: '#2563EB',
  lilas: '#7B5CFF',
  violeta: '#4B2CFF',
  magenta: '#B04DFF',
} as const

const t = (a: string, b: string, glow = 1): Theme => ({ a, b, glow })
const p = palette

export const themes = {
  // Início
  hero: t(p.ciano, p.royal, 1.2),
  pillars: t(p.azul, p.royal, 0.9),
  servicesTeaser: t(p.lilas, p.violeta, 1),
  projectTeaser: t(p.aqua, p.ciano, 1),
  cta: t(p.ciano, p.lilas, 1.15),

  // Processo — uma cor por etapa
  step1: t(p.aqua, p.aqua, 1.1),
  step2: t(p.ciano, p.ciano, 1.1),
  step3: t(p.azul, p.azul, 1.1),
  step4: t(p.lilas, p.lilas, 1.15),
  step5: t(p.magenta, p.magenta, 1.15),

  // Páginas
  solucoes: t(p.lilas, p.violeta, 1.1),
  principios: t(p.magenta, p.lilas, 1),
  projetos: t(p.aqua, p.ciano, 1.1),
  sobre: t(p.azul, p.royal, 1.1),
  dna1: t(p.lilas, p.violeta, 1.25),
  dna2: t(p.azul, p.lilas, 1.25),
  dna3: t(p.ciano, p.azul, 1.25),
  contato: t(p.magenta, p.royal, 1.15),
} satisfies Record<string, Theme>

export const encodeTheme = (th: Theme) => `${th.a},${th.b},${th.glow}`
export function decodeTheme(s: string): Theme {
  const [a, b, g] = s.split(',')
  return { a, b, glow: Number(g) }
}
