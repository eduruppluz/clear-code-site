import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'

export const ease = [0.22, 1, 0.36, 1] as const

/** Aparece ao entrar na tela (uma vez). Só transform/opacity. */
export function Reveal({ children, delay = 0, y = 24, className, ...rest }: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Eyebrow + título + texto de apoio, padrão de todas as seções */
export function SectionHeading({
  eyebrow, title, lead, id, align = 'left', as: H = 'h2', className = '',
}: { eyebrow?: string; title: ReactNode; lead?: ReactNode; id?: string; align?: 'left' | 'center'; as?: 'h1' | 'h2'; className?: string }) {
  const center = align === 'center'
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow mb-5 ${center ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <H id={id} className={`font-display font-extrabold leading-[1.04] ${H === 'h1' ? 'text-[clamp(2.4rem,7vw,4.5rem)]' : 'text-[clamp(2rem,5vw,3.4rem)]'}`}>
        {title}
      </H>
      {lead && <div className={`mt-6 max-w-2xl text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-muted ${center ? 'mx-auto' : ''}`}>{lead}</div>}
    </Reveal>
  )
}
