import { motion } from 'motion/react'
import { pillars } from '../../config/content'

const ease = [0.22, 1, 0.36, 1] as const

/** Os três pilares: Clareza · Tecnologia · Resultado — cada um com sua cor */
export function Pillars() {
  return (
    <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
      {pillars.map((p, i) => (
        <motion.li
          key={p.title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 0.6, delay: i * 0.1, ease }}
          className="glow-card is-interactive group p-7"
          style={{ ['--c' as string]: p.color }}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-bold tabular-nums text-white/30">0{i + 1}</span>
            <span className="size-2 rounded-full transition-shadow duration-500 group-hover:shadow-[0_0_16px_4px_var(--c)]" style={{ background: p.color }} />
          </div>
          <h3 className="mt-10 font-display text-xl font-extrabold uppercase tracking-[0.08em]" style={{ color: `color-mix(in oklab, ${p.color} 80%, white)` }}>
            {p.title}
          </h3>
          <motion.span
            aria-hidden="true"
            className="mt-4 block h-px origin-left"
            style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25 + i * 0.1, ease }}
          />
          <p className="mt-4 leading-relaxed text-muted">{p.text}</p>
        </motion.li>
      ))}
    </ul>
  )
}
