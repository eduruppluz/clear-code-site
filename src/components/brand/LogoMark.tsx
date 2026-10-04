import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/**
 * Lâmpada oficial da Clear Code em SVG vivo.
 * Paths extraídos do arquivo vetorial oficial (clear-code-simbolo-animavel.svg).
 *
 * O gradiente lê --accent-a / --accent-b, então a lâmpada muda de cor
 * junto com a seção visível sem trocar imagem nenhuma.
 */
type Props = {
  className?: string
  /** multiplica a espessura dos traços (Hero usa traço fino) */
  weight?: number
  /** desenha a lâmpada ao montar: raios acendem, contorno se fecha, código "compila" */
  intro?: boolean
  /** atraso da introdução (s) */
  delay?: number
  /** brilho em volta, proporcional a --glow */
  glow?: boolean
  title?: string
}

const RAYS = ['M150 18V48', 'M62 54L84 76', 'M238 54L216 76', 'M28 142H62', 'M272 142H238']
const OUTLINE =
  'M150 60C95 60 62 96 62 144C62 176 79 196 103 216C113 224 118 236 118 249V264H182V249C182 236 187 224 197 216C221 196 238 176 238 144C238 96 205 60 150 60Z'
const BASE = ['M120 282H180', 'M131 298H169', 'M141 313H159']
const CODE = ['M127 126L105 146L127 166', 'M173 126L195 146L173 166', 'M158 112L142 180']
// ordem em que os raios acendem: centro → diagonais → laterais
const RAY_ORDER = [0, 1, 1, 2, 2]

export function LogoMark({ className, weight = 1, intro = false, delay = 0, glow = true, title }: Props) {
  const gid = useId().replace(/:/g, '')
  const reduce = useReducedMotion()
  const animate = intro && !reduce
  const stroke = `url(#cc-grad-${gid})`

  const draw = (d: number) =>
    animate
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { duration: 0.55, delay: delay + d, ease: [0.22, 1, 0.36, 1] as const }, opacity: { duration: 0.1, delay: delay + d } },
        }
      : {}

  return (
    <svg
      viewBox="0 0 300 330"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={
        glow
          ? { filter: 'drop-shadow(0 0 calc(var(--glow) * 7px) color-mix(in oklab, var(--accent-a) 65%, transparent))', overflow: 'visible' }
          : { overflow: 'visible' }
      }
    >
      <defs>
        <linearGradient id={`cc-grad-${gid}`} gradientUnits="userSpaceOnUse" x1="40" y1="20" x2="260" y2="320">
          <stop offset="0%" style={{ stopColor: 'var(--accent-b)' }} />
          <stop offset="52%" style={{ stopColor: 'color-mix(in oklab, var(--accent-a) 50%, var(--accent-b))' }} />
          <stop offset="100%" style={{ stopColor: 'var(--accent-a)' }} />
        </linearGradient>
      </defs>
      <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
        <g strokeWidth={8 * weight}>
          {RAYS.map((d, i) => (
            <motion.path key={d} d={d} {...draw(0.35 + RAY_ORDER[i] * 0.08)} />
          ))}
        </g>
        <motion.path d={OUTLINE} strokeWidth={9 * weight} {...draw(0)} />
        <g strokeWidth={8 * weight}>
          {BASE.map((d, i) => (
            <motion.path key={d} d={d} {...draw(0.25 + i * 0.06)} />
          ))}
        </g>
        <motion.g
          strokeWidth={10 * weight}
          style={{ transformOrigin: '150px 146px' }}
          {...(animate
            ? {
                initial: { opacity: 0, scale: 0.6 },
                animate: { opacity: 1, scale: 1 },
                transition: { delay: delay + 0.5, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
              }
            : {})}
        >
          {CODE.map((d) => (
            <path key={d} d={d} />
          ))}
        </motion.g>
      </g>
    </svg>
  )
}
