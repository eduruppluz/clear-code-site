/**
 * Paleta de acentos e "temas" de cor.
 *
 * As cores-base vêm do manual (#176BFF, #08BFE8, #4B2CFF). Para que a troca
 * de cor entre páginas/etapas seja perceptível (como na referência), usamos
 * também tons DERIVADOS dessas três — aqua (ciano → verde), lilás (violeta
 * mais claro, legível no escuro) e magenta (violeta → rosa).
 *
 * Um tema = { a, b, glow }. O motor (src/theme) interpola entre os temas
 * dos blocos marcados com <Themed> conforme o scroll e ao trocar de página.
 */
export type Theme = { a: string; b: string; glow: number }

export const palette = {
  aqua: '#12D6C1',
  cyan: '#08BFE8',
  sky: '#3FA2FF',
  blue: '#176BFF',
  lilac: '#7B5CFF',
  violet: '#4B2CFF',
  magenta: '#B04DFF',
} as const

const t = (a: string, b: string, glow = 1): Theme => ({ a, b, glow })
const p = palette

export const themes = {
  // Início
  hero: t(p.cyan, p.blue, 1.2),
  pillars: t(p.sky, p.blue, 0.9),
  servicesTeaser: t(p.lilac, p.violet, 1),
  projectTeaser: t(p.aqua, p.cyan, 1),
  cta: t(p.cyan, p.lilac, 1.15),

  // Processo — uma cor por etapa
  step1: t(p.aqua, p.aqua, 1.1),
  step2: t(p.cyan, p.cyan, 1.1),
  step3: t(p.blue, p.blue, 1.1),
  step4: t(p.lilac, p.lilac, 1.15),
  step5: t(p.magenta, p.magenta, 1.15),

  // Páginas
  solucoes: t(p.lilac, p.violet, 1.1),
  principios: t(p.magenta, p.lilac, 1),
  projetos: t(p.aqua, p.cyan, 1.1),
  sobre: t(p.sky, p.blue, 1.1),
  dna1: t(p.lilac, p.violet, 1.25),
  dna2: t(p.blue, p.lilac, 1.25),
  dna3: t(p.cyan, p.blue, 1.25),
  contato: t(p.magenta, p.blue, 1.15),
} satisfies Record<string, Theme>

export const encodeTheme = (th: Theme) => `${th.a},${th.b},${th.glow}`
export function decodeTheme(s: string): Theme {
  const [a, b, g] = s.split(',')
  return { a, b, glow: Number(g) }
}
