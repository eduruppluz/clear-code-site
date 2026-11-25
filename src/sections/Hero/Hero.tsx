import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { HeroLaptop } from './HeroLaptop'
import { ParticleField } from './ParticleField'
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

/** Arco de luz no topo, como o horizonte de um planeta, nas cores da Clear Code */
function HorizonGlow() {
  const reduce = useReducedMotion()
  return (
    <>
      {/* brilho suave nos cantos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(40% 50% at 0% 0%, rgba(37,99,235,.22), transparent 70%), radial-gradient(40% 50% at 100% 0%, rgba(8,191,232,.16), transparent 70%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 w-[min(1100px,104vw)] -translate-x-1/2"
        style={{ top: 'var(--hz-top)', height: 'min(520px, 60vw)' }}
        initial={reduce ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease }}
      >
        {/* brilho do arco, mais forte no centro e sumindo nas laterais */}
        <div
          className="absolute inset-x-0 bottom-0 -top-[140px]"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 52% 75% at 50% 25%, #000 35%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 52% 75% at 50% 25%, #000 35%, transparent 100%)',
          }}
        >
          <div className="absolute inset-x-0 bottom-0 top-[140px]">
            <div
              className="absolute inset-0 rounded-[50%] motion-safe:animate-[horizon_6s_ease-in-out_infinite]"
              style={{ borderTop: '90px solid rgba(37,99,235,.95)', filter: 'blur(50px)' }}
            />
            <div className="absolute inset-0 rounded-[50%]" style={{ borderTop: '34px solid rgba(8,191,232,.9)', filter: 'blur(20px)' }} />
            <div className="absolute inset-0 rounded-[50%]" style={{ borderTop: '12px solid rgba(108,192,255,1)', filter: 'blur(7px)' }} />
            {/* o "planeta": escuro por dentro, sumindo para baixo */}
            <div
              className="absolute inset-0 rounded-[50%]"
              style={{
                background: 'radial-gradient(ellipse 60% 40% at 50% 0%, #0a2350, var(--cc-ink) 70%)',
                WebkitMaskImage: 'linear-gradient(180deg, #000 40%, transparent 72%)',
                maskImage: 'linear-gradient(180deg, #000 40%, transparent 72%)',
              }}
            />
            <div className="absolute inset-0 rounded-[50%]" style={{ borderTop: '4px solid rgba(160,215,255,.9)', filter: 'blur(2px)' }} />
            <div className="absolute inset-0 rounded-[50%]" style={{ borderTop: '2px solid rgba(230,246,255,1)' }} />
          </div>
        </div>
        <style>{`@keyframes horizon { 0%,100% { opacity: .8 } 50% { opacity: 1 } }`}</style>
      </motion.div>
    </>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const [sweep, setSweep] = useState(false)

  return (
    <Themed
      theme={themes.hero}
      id="inicio"
      data-label="Início"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-16 [--hz-top:clamp(110px,12vw,150px)]"
    >
      <HorizonGlow />

      {/* partículas discretas no fundo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60">
        <ParticleField reduced={reduce ?? false} className="size-full" />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.p
          className="eyebrow mb-6 mt-[calc(var(--hz-top)+clamp(3.5rem,6vw,5.5rem))] justify-center"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
        >
          Tecnologia e soluções digitais
        </motion.p>

        <h1
          id="hero-title"
          className="max-w-[16ch] font-display text-[clamp(2.3rem,6.6vw,4.6rem)] font-medium leading-[1.06] tracking-[-0.03em]"
        >
          <Line delay={0.45}>Tecnologia para</Line>
          <Line delay={0.55}>
            <span className={`text-gradient ${sweep ? 'is-sweeping' : ''}`}>transformar</span> o seu
          </Line>
          <Line delay={0.65}>
            <span className={`text-gradient ${sweep ? 'is-sweeping' : ''}`}>negócio.</span>
          </Line>
        </h1>

        <motion.p
          className="mt-7 max-w-xl text-[clamp(1.02rem,1.6vw,1.2rem)] leading-relaxed text-muted"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease }}
          onAnimationComplete={() => setSweep(true)}
        >
          Sites, anúncios e automações para conectar seu negócio aos clientes e organizar oportunidades comerciais.
        </motion.p>

        <motion.div
          className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease }}
        >
          <Button to="/solucoes" arrow>
            Conheça nossas soluções
          </Button>
          <Button to="/projetos" variant="ghost">
            Ver projetos
          </Button>
        </motion.div>

        <motion.p
          className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-dim"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <span className="h-px w-8" style={{ background: 'var(--grad-accent)' }} />
          Da ideia ao código.
          <span className="h-px w-8" style={{ background: 'var(--grad-accent)' }} />
        </motion.p>

        <motion.div
          className="mt-14 w-full sm:mt-16"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease }}
        >
          <HeroLaptop />
        </motion.div>
      </Container>
    </Themed>
  )
}
