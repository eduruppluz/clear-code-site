import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { LogoMark } from '../../components/brand/LogoMark'
import { Container } from '../../components/ui/Container'
import { Reveal } from '../../components/ui/Reveal'
import { dnaFlow, dnaName } from '../../config/content'
import { themes } from '../../config/themes'
import { Themed } from '../../theme/Themed'
import { useIsDesktop } from '../../hooks/useMediaQuery'

const ease = [0.22, 1, 0.36, 1] as const
// pontos (0..1) em que cada etapa acende; a lâmpada acende no meio
const AT = [0.08, 0.3, 0.7, 0.92]
const LAMP_AT = 0.5

function FlowItem({ item, lit, i }: { item: (typeof dnaFlow)[number]; lit: boolean; i: number }) {
  return (
    <motion.div
      className="glow-card relative p-5"
      data-on={lit}
      style={{ ['--c' as string]: item.color }}
      animate={{ opacity: lit ? 1 : 0.35, y: lit ? 0 : 10 }}
      transition={{ duration: 0.5, ease }}
    >
      <span className="text-[0.65rem] font-semibold tabular-nums text-white/35">0{i + 1}</span>
      <h3 className="mt-1 font-display text-lg font-extrabold uppercase tracking-[0.06em]" style={{ color: `color-mix(in oklab, ${item.color} 80%, white)` }}>
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
    </motion.div>
  )
}

/**
 * Nosso DNA — o fluxo IDEIA → ESTRATÉGIA → [lâmpada] → TECNOLOGIA → RESULTADO.
 * Uma linha de luz é desenhada pelo scroll e literalmente atravessa a lâmpada:
 * quando chega nela, a lâmpada acende e o </> aparece.
 */
export function DNA() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [p, setP] = useState(reduce ? 1 : 0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => !reduce && setP(Math.round(v * 100) / 100))
  const lampOn = p >= LAMP_AT
  const line = reduce ? 1 : p
  const desktop = useIsDesktop()

  return (
    <section id="dna" data-label="DNA" className="relative py-[var(--section-y)]" aria-labelledby="dna-title">
      <Themed as="div" theme={themes.dna1}>
        <Container>
          <Reveal>
            <p className="eyebrow mb-5">Nosso DNA</p>
            <h2 id="dna-title" className="font-display text-[clamp(2.2rem,6vw,4.25rem)] font-extrabold leading-[1.02]">
              Uma ideia clara.<br />Uma solução <span className="text-gradient">bem construída</span>.
            </h2>
          </Reveal>
        </Container>
      </Themed>

      <Themed as="div" theme={themes.dna2}>
        <Container>
          <div ref={ref} className="relative mt-16 grid items-center gap-4 lg:mt-24 lg:grid-cols-[1fr_1fr_1.1fr_1fr_1fr] lg:gap-5">
            {/* linha horizontal (desktop) / vertical (mobile) que atravessa tudo */}
            <span aria-hidden="true" className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.07] lg:left-0 lg:top-1/2 lg:h-px lg:w-full lg:translate-x-0" />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-0 h-full w-[2px] origin-top -translate-x-1/2 lg:left-0 lg:top-1/2 lg:h-[2px] lg:w-full lg:origin-left lg:translate-x-0"
              style={{
                background: `linear-gradient(${desktop ? 'to right' : 'to bottom'}, ${dnaFlow.map((d) => d.color).join(', ')})`,
                transform: desktop ? `scaleX(${line})` : `scaleY(${line})`,
                boxShadow: '0 0 14px var(--accent-a)',
              }}
            />

            <div className="relative z-10"><FlowItem item={dnaFlow[0]} i={0} lit={p >= AT[0]} /></div>
            <div className="relative z-10"><FlowItem item={dnaFlow[1]} i={1} lit={p >= AT[1]} /></div>

            <div className="relative z-10 flex justify-center py-6 lg:py-0">
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-700" style={{ background: 'color-mix(in oklab, var(--accent-a) 45%, transparent)', opacity: lampOn ? 1 : 0.15 }} />
              <motion.div
                className="relative w-36 sm:w-44"
                animate={{ opacity: lampOn ? 1 : 0.3, scale: lampOn ? 1 : 0.92 }}
                transition={{ duration: 0.6, ease }}
              >
                <LogoMark weight={0.8} className="w-full" title="Lâmpada da Clear Code: a ideia virando código" />
              </motion.div>
            </div>

            <div className="relative z-10"><FlowItem item={dnaFlow[2]} i={2} lit={p >= AT[2]} /></div>
            <div className="relative z-10"><FlowItem item={dnaFlow[3]} i={3} lit={p >= AT[3]} /></div>
          </div>
        </Container>
      </Themed>

      <Themed as="div" theme={themes.dna3}>
        <Container className="mt-16 lg:mt-24">
          <Reveal className="glow-card grid overflow-hidden md:grid-cols-3" data-on="true">
            {dnaName.map((n, i) => (
              <div key={n.word} className={`flex items-center gap-5 p-7 sm:p-8 ${i > 0 ? 'border-t border-white/[0.07] md:border-l md:border-t-0' : ''}`}>
                <span className="font-display text-3xl font-extrabold sm:text-4xl" style={{ color: `color-mix(in oklab, ${n.color} 85%, white)` }}>{n.word}</span>
                <p className="text-sm leading-relaxed text-muted">{n.text}</p>
              </div>
            ))}
          </Reveal>
          <p className="mt-8 text-center text-sm tracking-[0.2em] text-dim">
            Da ideia ao <span style={{ color: 'var(--accent-a)' }}>código.</span>
          </p>
        </Container>
      </Themed>
    </section>
  )
}
