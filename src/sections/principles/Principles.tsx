import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Container } from '../../components/ui/Container'
import { Reveal } from '../../components/ui/Reveal'
import { principles } from '../../config/content'
import { themes } from '../../config/themes'
import { Themed } from '../../theme/Themed'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Tecnologia sem complicação — composição em "circuito":
 * um tronco vertical é desenhado pelo scroll e cada princípio
 * se conecta a ele por um ramo que acende ao entrar na tela.
 */
export function Principles() {
  const ref = useRef<HTMLUListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const trunk = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Themed theme={themes.principios} id="principios" data-label="Princípios" className="relative py-[var(--section-y)]" aria-labelledby="principios-title">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-5">Nossos princípios</p>
          <h2 id="principios-title" className="font-display text-[clamp(2.2rem,6vw,4rem)] font-extrabold leading-[1]">
            Tecnologia<br />sem <span className="text-gradient">complicação</span>.
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
            Acreditamos que tecnologia, estratégia e comunicação caminham juntas. Integramos esses pilares para criar soluções simples, eficientes e alinhadas aos objetivos do seu negócio.
          </p>
        </Reveal>

        <ul ref={ref} className="relative grid gap-5 pl-10 sm:pl-14">
          <span aria-hidden="true" className="absolute bottom-8 left-3 top-8 w-px bg-white/[0.08] sm:left-5" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-8 left-3 top-8 w-[2px] origin-top -translate-x-[0.5px] sm:left-5"
            style={{ scaleY: reduce ? 1 : trunk, background: `linear-gradient(to bottom, ${principles.map((p) => p.color).join(', ')})` }}
          />
          {principles.map((p, i) => (
            <motion.li
              key={p.title}
              initial={reduce ? false : 'off'}
              whileInView="on"
              viewport={{ once: true, margin: '0px 0px -25% 0px' }}
              className="relative"
            >
              {/* ramo */}
              <motion.span
                aria-hidden="true"
                className="absolute -left-7 top-1/2 h-px w-7 origin-left sm:-left-9 sm:w-9"
                style={{ background: p.color }}
                variants={{ off: { scaleX: 0 }, on: { scaleX: 1, transition: { duration: 0.45, ease } } }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute -left-[1.95rem] top-1/2 size-2.5 -translate-y-1/2 rounded-full sm:-left-[2.45rem]"
                style={{ background: p.color, boxShadow: `0 0 12px 2px ${p.color}` }}
                variants={{ off: { scale: 0 }, on: { scale: 1, transition: { duration: 0.3, ease } } }}
              />
              <motion.div
                className="glow-card is-interactive group p-6 sm:p-7"
                style={{ ['--c' as string]: p.color }}
                data-on="true"
                variants={{ off: { opacity: 0, x: 24 }, on: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.15, ease } } }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-bold sm:text-2xl">{p.title}</h3>
                  <span className="font-display text-sm font-bold tabular-nums" style={{ color: p.color }}>0{i + 1}</span>
                </div>
                <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </Themed>
  )
}
