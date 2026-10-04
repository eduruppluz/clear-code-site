import { motion, useReducedMotion } from 'motion/react'
import { LogoMark } from '../../components/brand/LogoMark'
import { ParticleField } from './ParticleField'

const ease = [0.22, 1, 0.36, 1] as const

/** Chips que flutuam ao redor da lâmpada — a sequência ideia → estratégia → código */
const chips = [
  { label: 'Ideia', pos: 'left-[2%] top-[22%] sm:left-[4%]', delay: 0.95, float: 'float-1' },
  { label: 'Estratégia', pos: 'right-[0%] top-[38%] sm:right-[2%]', delay: 1.05, float: 'float-2' },
  { label: '</> Código', pos: 'left-[10%] bottom-[18%] sm:left-[12%]', delay: 1.15, float: 'float-3', mono: true },
]

export function HeroVisual() {
  const reduce = useReducedMotion() ?? false

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]" aria-hidden="true">
      {/* 1. piso em perspectiva */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="absolute inset-x-[-25%] bottom-[-6%] h-[48%] [perspective:500px]"
      >
        <div
          className="absolute inset-0 origin-top [transform:rotateX(62deg)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, color-mix(in oklab, var(--accent-a) 30%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--accent-a) 30%, transparent) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 55% 75% at 50% 0%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 55% 75% at 50% 0%, black 20%, transparent 75%)',
          }}
        />
      </motion.div>

      {/* 2. partículas convergindo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="absolute inset-[-10%]"
      >
        <ParticleField reduced={reduce} className="size-full" />
      </motion.div>

      {/* 3. anéis finos */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id="ring-g" gradientUnits="userSpaceOnUse" x1="50" y1="20" x2="350" y2="330">
            <stop offset="0" style={{ stopColor: 'var(--accent-b)' }} />
            <stop offset="1" style={{ stopColor: 'var(--accent-a)' }} />
          </linearGradient>
        </defs>
        <motion.circle
          cx="200" cy="176" r="150" fill="none" stroke="url(#ring-g)" strokeWidth="0.75" strokeOpacity="0.35"
          initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.15, ease }}
        />
        <g className="motion-safe:animate-[spin_60s_linear_infinite]" style={{ transformOrigin: '200px 176px' }}>
          <circle cx="200" cy="176" r="182" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="0.75" strokeDasharray="2 10" />
          <circle cx="200" cy="-6" r="3" style={{ fill: 'var(--accent-a)' }} />
        </g>
        <circle cx="200" cy="176" r="112" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="0.75" />
      </svg>

      {/* 4. halo pulsando atrás da lâmpada */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease }}
        className="absolute left-1/2 top-[44%] size-[58%] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="size-full rounded-full blur-2xl motion-safe:animate-[halo_5s_ease-in-out_infinite]"
          style={{ background: 'radial-gradient(closest-side, color-mix(in oklab, var(--accent-a) 45%, transparent), transparent)' }}
        />
      </motion.div>

      {/* 5. a lâmpada (vetor oficial, traço fino) */}
      <div className="absolute left-1/2 top-[44%] w-[46%] -translate-x-1/2 -translate-y-1/2">
        <LogoMark intro delay={0.2} weight={0.7} className="w-full" />
      </div>

      {/* 6. chips */}
      {chips.map((c) => (
        <motion.div
          key={c.label}
          initial={reduce ? false : { opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: c.delay, ease }}
          className={`absolute ${c.pos}`}
        >
          <div
            style={{ animation: reduce ? undefined : `${c.float} 7s ease-in-out infinite` }}
            className={`flex items-center gap-2 rounded-full border border-white/10 bg-[#06121f]/70 px-3.5 py-2 text-xs text-white/85 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.8)] backdrop-blur-md sm:text-[0.8rem]`}>
            <span className="size-1.5 rounded-full" style={{ background: 'var(--accent-a)', boxShadow: '0 0 8px var(--accent-a)' }} />
            <span className={c.mono ? 'font-mono tracking-tight' : ''}>{c.label}</span>
          </div>
        </motion.div>
      ))}

      <style>{`
        @keyframes halo { 0%,100% { opacity: .75; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }
        @keyframes float-1 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        @keyframes float-2 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(7px) } }
        @keyframes float-3 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
      `}</style>
    </div>
  )
}
