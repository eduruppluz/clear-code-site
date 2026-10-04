import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { HeroVisual } from './HeroVisual'
import { themes } from '../../config/themes'
import { Themed } from '../../theme/Themed'

const ease = [0.22, 1, 0.36, 1] as const

/** Linha do título que "sobe" de dentro de uma máscara */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion()
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.75, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [sweep, setSweep] = useState(false)

  // saída suave ao rolar (só transform/opacity)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '10%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // sequência: elementos (0) → lâmpada acende (0.2) → título (0.35) → gradiente (≈1.0) → CTAs (1.0)
  return (
    <Themed
      theme={themes.hero}
      id="inicio"
      data-label="Início"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:pb-12 lg:pt-24"
    >
      <Container className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-6">
        <motion.div style={{ y: contentY, opacity: fade }} className="relative z-10">
          <motion.p
            className="eyebrow mb-6"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            Tecnologia e soluções digitais
          </motion.p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(2.5rem,10vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.035em]"
          >
            <Line delay={0.35}>Tecnologia para</Line>
            <Line delay={0.45}>
              <span className={`text-gradient ${sweep ? 'is-sweeping' : ''}`}>transformar</span>
            </Line>
            <Line delay={0.55}>o seu negócio.</Line>
          </h1>

          {/* linha que é desenhada sob o título, puxando o gradiente */}
          <motion.span
            aria-hidden="true"
            className="mt-7 block h-px w-full max-w-md origin-left"
            style={{ background: 'linear-gradient(90deg, var(--cc-violet), var(--accent-b), var(--accent-a), transparent)' }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
            onAnimationStart={() => setSweep(true)}
          />

          <motion.p
            className="mt-7 max-w-xl text-[clamp(1.02rem,1.6vw,1.2rem)] leading-relaxed text-muted"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease }}
          >
            Soluções digitais pensadas para fortalecer sua presença, gerar oportunidades e ajudar sua empresa a crescer.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease }}
          >
            <Button to="/solucoes" arrow>
              Conheça nossas soluções
            </Button>
            <Button to="/projetos" variant="ghost">
              Ver projetos
            </Button>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: visualY, opacity: fade }} className="relative -mx-4 sm:mx-0">
          <HeroVisual />
        </motion.div>
      </Container>

      {/* indicação de scroll */}
      <motion.a
        href="#sobre-resumo"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-dim md:flex"
        style={{ opacity: fade }}
      >
        Role para explorar
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span
            className="absolute inset-x-0 top-0 h-1/2 motion-safe:animate-[scrollcue_1.8s_ease-in-out_infinite]"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--accent-a))' }}
          />
        </span>
        <style>{`@keyframes scrollcue { from { transform: translateY(-100%) } to { transform: translateY(200%) } }`}</style>
      </motion.a>
    </Themed>
  )
}
