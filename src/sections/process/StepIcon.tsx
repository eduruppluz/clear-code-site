import { motion } from 'motion/react'

/** Ícones de linha fina das etapas. Animam quando a etapa fica ativa. */
type Name = 'search' | 'map' | 'code' | 'rocket' | 'chart'

export function StepIcon({ name, on }: { name: Name; on: boolean }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const spring = { type: 'spring' as const, stiffness: 260, damping: 18 }
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      {name === 'search' && (
        <motion.g {...common} animate={on ? { rotate: [0, -12, 0], scale: [1, 1.12, 1] } : { rotate: 0, scale: 1 }} transition={{ duration: 0.7 }} style={{ transformOrigin: '11px 11px' }}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4 4" />
        </motion.g>
      )}
      {name === 'map' && (
        <g {...common}>
          <path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Z" />
          <motion.path d="M9 4v14M15 6v14" initial={false} animate={{ pathLength: on ? [0, 1] : 1 }} transition={{ duration: 0.8 }} />
        </g>
      )}
      {name === 'code' && (
        <g {...common}>
          <motion.path d="M8.5 7 4 12l4.5 5" animate={{ x: on ? [0, -2, 0] : 0 }} transition={{ duration: 0.6 }} />
          <motion.path d="M15.5 7 20 12l-4.5 5" animate={{ x: on ? [0, 2, 0] : 0 }} transition={{ duration: 0.6 }} />
          <path d="M13.5 5 10.5 19" />
        </g>
      )}
      {name === 'rocket' && (
        <motion.g {...common} animate={on ? { y: [0, -3, 0], x: [0, 2, 0] } : { y: 0, x: 0 }} transition={spring}>
          <path d="M14 4c3.5 0 6 2.5 6 6-1.5 3-4.5 6-8 7.5L6.5 12C8 8.5 11 5.5 14 4Z" />
          <circle cx="15" cy="9" r="1.6" />
          <path d="M6.5 12 4 13l1.5 3.5M12 17.5 11 20l-3.5-1.5M5 19l2.5-2.5" />
        </motion.g>
      )}
      {name === 'chart' && (
        <g {...common}>
          <path d="M4 20h16" />
          <motion.path d="M5 16l4.5-4.5 3.5 3L19 8" initial={false} animate={{ pathLength: on ? [0, 1] : 1 }} transition={{ duration: 0.8 }} />
          <path d="M15 8h4v4" />
        </g>
      )}
    </svg>
  )
}
