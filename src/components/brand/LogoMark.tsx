import { motion, useReducedMotion } from 'motion/react'
import simbolo from '../../assets/brand/simbolo-colorido.webp'

/**
 * Símbolo oficial da Clear Code (lâmpada com órbitas e </>), versão colorida.
 * Arquivo: src/assets/brand/simbolo-colorido.webp (fundo transparente).
 * Vetores (marinho/branco/degradê) ficam em brand-source/ para uso em impressão.
 *
 * O brilho em volta usa --accent-a, então ele acompanha a cor da seção ativa.
 */
type Props = {
  className?: string
  /** entra com fade + leve zoom ao montar */
  intro?: boolean
  /** atraso da entrada (s) */
  delay?: number
  /** brilho em volta, proporcional a --glow */
  glow?: boolean
  title?: string
  /** mantido por compatibilidade com a versão antiga (sem efeito) */
  weight?: number
}

export function LogoMark({ className, intro = false, delay = 0, glow = true, title }: Props) {
  const reduce = useReducedMotion()
  const animate = intro && !reduce
  return (
    <motion.img
      src={simbolo}
      alt={title ?? ''}
      aria-hidden={title ? undefined : true}
      draggable={false}
      className={className}
      width={760}
      height={854}
      style={{
        filter: glow ? 'drop-shadow(0 0 calc(var(--glow) * 10px) color-mix(in oklab, var(--accent-a) 45%, transparent))' : undefined,
      }}
      {...(animate
        ? {
            initial: { opacity: 0, scale: 0.85, y: 8 },
            animate: { opacity: 1, scale: 1, y: 0 },
            transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
          }
        : {})}
    />
  )
}
