import { useRef, useState, type PointerEvent } from 'react'
import { motion, useInView } from 'motion/react'
import { Link } from 'react-router'
import { services, stages } from '../../config/content'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { ServiceVisual } from './ServiceVisual'

const ease = [0.22, 1, 0.36, 1] as const
type Service = (typeof services)[number]

/** Card de serviço: mini-interface + título. Tilt leve com mouse; no toque, acende ao passar pelo centro da tela. */
function ServiceCard({ s, i, detailed }: { s: Service; i: number; detailed: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const fine = useFinePointer()
  const centered = useInView(ref, { margin: '-40% 0px -40% 0px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e: PointerEvent) => {
    if (!fine || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -4, y: ((e.clientX - r.left) / r.width - 0.5) * 5 })
  }

  const body = (
    <>
      <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em]" style={{ color: 'color-mix(in oklab, var(--c) 85%, white)' }}>
        <span className="size-1.5 rounded-full" style={{ background: 'var(--c)' }} />
        {s.stage}
      </span>
      <ServiceVisual id={s.id} />
      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold sm:text-2xl">{s.title}</h3>
          <p className="mt-1 text-sm font-medium" style={{ color: 'color-mix(in oklab, var(--c) 80%, white)' }}>{s.short}</p>
        </div>
        {!detailed && (
          <span aria-hidden="true" className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-[color:var(--c)] group-hover:bg-[color:var(--c)] group-hover:text-[#021024]">
            <svg viewBox="0 0 20 20" className="size-4 transition-transform duration-300 group-hover:-rotate-45" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
          </span>
        )}
      </div>
      {detailed && <p className="mt-4 leading-relaxed text-muted">{s.text}</p>}
    </>
  )


  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
      
    >
      <div
        onPointerMove={onMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        data-on={!fine && centered}
        className="glow-card is-interactive group relative h-full p-5 sm:p-6"
        style={{ ['--c' as string]: s.color, transform: fine && (tilt.x || tilt.y) ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)` : undefined }}
      >
        {detailed ? (
          body
        ) : (
          <Link to="/solucoes" className="block rounded-xl after:absolute after:inset-0" aria-label={`${s.title} — ${s.short}. Ver soluções`}>
            {body}
          </Link>
        )}
      </div>
    </motion.article>
  )
}

export function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {services.map((s, i) => (
        <ServiceCard key={s.id} s={s} i={i} detailed={detailed} />
      ))}
    </div>
  )
}

/** As 3 etapas: Atrair → Captar → Organizar, ligadas por uma linha */
export function StageStrip() {
  return (
    <ol className="relative grid gap-3 md:grid-cols-3 md:gap-5">
      <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-[1.35rem] hidden h-px md:block" style={{ background: `linear-gradient(90deg, ${stages.map((st) => st.color).join(', ')})`, opacity: 0.6 }} />
      {stages.map((st, i) => (
        <motion.li
          key={st.name}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.55, delay: i * 0.1, ease }}
          className="relative flex gap-4 md:flex-col md:items-center md:text-center"
        >
          <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-2 bg-[#021024] font-display text-sm font-bold" style={{ borderColor: st.color, color: st.color, boxShadow: `0 0 22px -4px ${st.color}` }}>
            0{i + 1}
          </span>
          <div>
            <h3 className="font-display text-xl font-extrabold">{st.name}</h3>
            <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted">{st.text}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
