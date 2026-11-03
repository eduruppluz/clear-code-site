import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { palette } from '../../config/themes'
import { hexHue } from '../../theme/color'
import simbolo from '../../assets/brand/simbolo-colorido.webp'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { ParticleField } from './ParticleField'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * "Ignição" — a cena principal do Hero.
 *
 * 1. A lâmpada aparece apagada e PISCA até acender (filtro de brilho).
 * 2. No instante em que acende: flash, onda de choque e raios de luz girando atrás.
 * 3. Três órbitas 3D com cometas: a metade de trás passa ATRÁS da lâmpada e a
 *    metade da frente passa NA FRENTE (duas camadas sincronizadas).
 * 4. Reflexo no chão quadriculado e partículas convergindo.
 * 5. Com mouse, a cena inteira inclina e as camadas se movem em profundidades
 *    diferentes (parallax).
 * Tudo usa --accent-a/-b e --logo-hue, então muda de cor junto com o site.
 * 6. Interativa: arrastar (mouse ou dedo) gira a lâmpada em 360° com inércia,
 *    o scroll também gira, e cada clique/toque troca a cor da cena.
 * Com "reduzir movimento", mostra a cena já acesa e parada.
 */

// ciclo de cores do clique: [destaque, secundária]
const CLICK_COLORS: [string, string][] = [
  [palette.lilas, palette.violeta],
  [palette.magenta, palette.lilas],
  [palette.aqua, palette.ciano],
  [palette.azul, palette.royal],
  [palette.ciano, palette.royal],
]
const LOGO_HUE = 191

const IGNITE = 1.15 // segundo em que a lâmpada acende de vez

// centro da cabeça da lâmpada no sistema do SVG (viewBox 600x600)
const CX = 300
const CY = 202
const orbits = [
  { rx: 262, ry: 62, rot: -16, dur: 7, width: 2.2, op: 1 },
  { rx: 224, ry: 50, rot: 21, dur: 9.5, width: 1.6, op: 0.85, reverse: true },
  { rx: 292, ry: 92, rot: -2, dur: 13, width: 1, op: 0.5 },
]
const ellipse = (rx: number, ry: number) =>
  `M${CX - rx} ${CY} a${rx} ${ry} 0 1 0 ${2 * rx} 0 a${rx} ${ry} 0 1 0 ${-2 * rx} 0`
const ellipseRev = (rx: number, ry: number) =>
  `M${CX - rx} ${CY} a${rx} ${ry} 0 1 1 ${2 * rx} 0 a${rx} ${ry} 0 1 1 ${-2 * rx} 0`

const chips = [
  { label: 'Atrair', pos: 'left-[2%] top-[16%]', delay: IGNITE + 0.35, float: 'float-1' },
  { label: 'Captar', pos: 'right-[1%] top-[38%]', delay: IGNITE + 0.45, float: 'float-2' },
  { label: 'Organizar', pos: 'left-[5%] bottom-[22%]', delay: IGNITE + 0.55, float: 'float-3' },
]

function Orbits({ layer, animate }: { layer: 'back' | 'front'; animate: boolean }) {
  return (
    <svg viewBox="0 0 600 600" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
      <defs>
        <filter id={`comet-${layer}`} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id={`orb-${layer}`} gradientUnits="userSpaceOnUse" x1="20" y1="0" x2="580" y2="0">
          <stop offset="0" style={{ stopColor: 'var(--accent-b)' }} />
          <stop offset=".5" style={{ stopColor: 'var(--accent-a)' }} />
          <stop offset="1" style={{ stopColor: 'var(--accent-b)' }} />
        </linearGradient>
      </defs>
      {orbits.map((o, i) => {
        const d = o.reverse ? ellipseRev(o.rx, o.ry) : ellipse(o.rx, o.ry)
        const clipId = `half-${layer}-${i}`
        return (
          <g key={i} transform={`rotate(${o.rot} ${CX} ${CY})`} opacity={o.op}>
            {layer === 'front' && (
              <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                <rect x={CX - o.rx - 30} y={CY} width={2 * o.rx + 60} height={o.ry + 40} />
              </clipPath>
            )}
            <g clipPath={layer === 'front' ? `url(#${clipId})` : undefined}>
              <path
                d={d}
                fill="none"
                stroke={`url(#orb-${layer})`}
                strokeWidth={layer === 'front' ? o.width : o.width * 0.7}
                strokeOpacity={layer === 'front' ? 0.9 : 0.35}
                strokeLinecap="round"
              />
              {animate && (
                <g filter={`url(#comet-${layer})`}>
                  <circle r={i === 0 ? 5 : 3.6} fill="white">
                    <animateMotion dur={`${o.dur}s`} repeatCount="indefinite" path={d} begin={`${IGNITE + i * 0.4}s`} />
                  </circle>
                  <circle r={i === 0 ? 9 : 7} style={{ fill: 'var(--accent-a)' }} opacity=".55">
                    <animateMotion dur={`${o.dur}s`} repeatCount="indefinite" path={d} begin={`${IGNITE + i * 0.4}s`} />
                  </circle>
                </g>
              )}
            </g>
          </g>
        )
      })}
    </svg>
  )
}

export function HeroVisual() {
  const reduce = useReducedMotion() ?? false
  const fine = useFinePointer()

  // parallax / inclinação com o mouse
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const rotY = useTransform(sx, [-0.5, 0.5], [-9, 9])
  const rotX = useTransform(sy, [-0.5, 0.5], [7, -7])
  const raysX = useTransform(sx, [-0.5, 0.5], [18, -18])
  const raysY = useTransform(sy, [-0.5, 0.5], [14, -14])
  const lampX = useTransform(sx, [-0.5, 0.5], [-14, 14])
  const lampY = useTransform(sy, [-0.5, 0.5], [-10, 10])

  useEffect(() => {
    if (!fine || reduce) return
    const on = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', on, { passive: true })
    return () => window.removeEventListener('pointermove', on)
  }, [fine, reduce, mx, my])

  // ── interação: girar (arrasto + scroll) e trocar cor (clique) ──
  const spin = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollSpin = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 360])
  const lampRotate = useTransform(() => spin.get() + scrollSpin.get())
  const drag = useRef<{ x: number; t: number; v: number; moved: number } | null>(null)
  const [colorIdx, setColorIdx] = useState(-1)
  const [bursts, setBursts] = useState<number[]>([])
  const [touched, setTouched] = useState(false)

  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, t: performance.now(), v: 0, moved: 0 }
    spin.stop()
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d) return
    const now = performance.now()
    const dx = e.clientX - d.x
    spin.set(spin.get() + dx * 0.8)
    d.v = (dx * 0.8) / Math.max(1, now - d.t) * 1000
    d.moved += Math.abs(dx)
    d.x = e.clientX
    d.t = now
  }
  const onUp = () => {
    const d = drag.current
    drag.current = null
    if (!d) return
    setTouched(true)
    if (d.moved < 6) {
      // clique / toque → próxima cor + onda de luz
      setColorIdx((i) => (i + 1) % CLICK_COLORS.length)
      setBursts((b) => [...b.slice(-3), Date.now()])
      if (!reduce) animate(spin, spin.get() + 360, { duration: 0.9, ease })
    } else if (!reduce) {
      animate(spin, spin.get(), { type: 'inertia', velocity: d.v, power: 0.35, timeConstant: 420 })
    }
  }

  // cor escolhida no clique sobrescreve a cor da seção só dentro da cena
  const sceneVars: CSSProperties | undefined =
    colorIdx < 0
      ? undefined
      : (() => {
          const [a, b] = CLICK_COLORS[colorIdx]
          let h = hexHue(a) - LOGO_HUE
          if (h > 180) h -= 360
          if (h < -180) h += 360
          return { ['--accent-a' as string]: a, ['--accent-b' as string]: b, ['--logo-hue' as string]: `${h}deg` }
        })()

  const after = (d = 0) => (reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.9, delay: IGNITE + d, ease } })

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[40rem] [perspective:1200px] lg:max-w-none lg:w-[110%]"
      aria-hidden="true"
      style={sceneVars}
    >
      <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ rotateX: rotX, rotateY: rotY }}>
        {/* chão quadriculado em perspectiva + luz no chão */}
        <div className="absolute inset-x-[-20%] bottom-[2%] h-[42%] [perspective:520px]">
          <div
            className="absolute inset-0 origin-top [transform:rotateX(64deg)]"
            style={{
              backgroundImage:
                'linear-gradient(to right, color-mix(in oklab, var(--accent-a) 32%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--accent-a) 32%, transparent) 1px, transparent 1px)',
              backgroundSize: '46px 46px',
              maskImage: 'radial-gradient(ellipse 55% 80% at 50% 0%, black 15%, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(ellipse 55% 80% at 50% 0%, black 15%, transparent 72%)',
            }}
          />
          <motion.div
            className="absolute left-1/2 top-0 h-[55%] w-[60%] -translate-x-1/2 rounded-[50%] blur-2xl"
            style={{ background: 'radial-gradient(closest-side, color-mix(in oklab, var(--accent-a) 55%, transparent), transparent)' }}
            {...after(0)}
          />
        </div>

        {/* raios de luz girando atrás da lâmpada */}
        <motion.div className="absolute inset-[-12%]" style={{ x: raysX, y: raysY }} {...after(0.05)}>
          <div
            className="size-full motion-safe:animate-[spin_60s_linear_infinite]"
            style={{
              background:
                'repeating-conic-gradient(from 0deg at 50% 37%, color-mix(in oklab, var(--accent-a) 26%, transparent) 0deg 2.5deg, transparent 2.5deg 15deg)',
              maskImage: 'radial-gradient(circle at 50% 37%, black 6%, transparent 52%)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 37%, black 6%, transparent 52%)',
            }}
          />
        </motion.div>

        {/* halo pulsando */}
        <motion.div className="absolute left-1/2 top-[34%] size-[62%] -translate-x-1/2 -translate-y-1/2" {...after(0)}>
          <div
            className="size-full rounded-full blur-3xl motion-safe:animate-[halo_4.5s_ease-in-out_infinite]"
            style={{ background: 'radial-gradient(closest-side, color-mix(in oklab, var(--accent-a) 55%, transparent), color-mix(in oklab, var(--accent-b) 20%, transparent) 60%, transparent)' }}
          />
        </motion.div>

        {/* partículas convergindo */}
        <div className="absolute inset-[-8%]">
          <ParticleField reduced={reduce} className="size-full" />
        </div>

        {/* órbitas — metade de trás */}
        <motion.div className="absolute inset-0" {...(reduce ? {} : { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.2, delay: 0.3, ease } })}>
          <Orbits layer="back" animate={!reduce} />
        </motion.div>

        {/* a lâmpada */}
        <motion.div
          className="absolute left-1/2 top-[13%] z-10 w-[50%] -translate-x-1/2 cursor-grab touch-pan-y select-none active:cursor-grabbing"
          style={{ x: lampX, y: lampY }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={() => (drag.current = null)}
        >
          <div className="motion-safe:animate-[bob_6s_ease-in-out_infinite]">
            <motion.div
              {...(reduce
                ? {}
                : {
                    initial: { opacity: 0, scale: 0.9, filter: 'brightness(0.25) saturate(0.2)' },
                    animate: {
                      opacity: 1,
                      scale: 1,
                      filter: [
                        'brightness(0.25) saturate(0.2)',
                        'brightness(0.3) saturate(0.25)',
                        'brightness(1.5) saturate(1.2)',
                        'brightness(0.35) saturate(0.3)',
                        'brightness(1.8) saturate(1.3)',
                        'brightness(1) saturate(1)',
                      ],
                    },
                    transition: {
                      opacity: { duration: 0.5, delay: 0.1 },
                      scale: { duration: 1.2, delay: 0.1, ease },
                      filter: { duration: IGNITE + 0.35, times: [0, 0.45, 0.6, 0.72, 0.85, 1], ease: 'linear' },
                    },
                  })}
            >
              <div className="[perspective:900px]">
                <motion.div className="relative [transform-style:preserve-3d]" style={{ rotateY: lampRotate }}>
                  {/* frente */}
                  <img
                    src={simbolo}
                    alt=""
                    draggable={false}
                    width={760}
                    height={854}
                    className="block h-auto w-full [backface-visibility:hidden]"
                    style={{ filter: 'hue-rotate(var(--logo-hue, 0deg)) drop-shadow(0 0 calc(var(--glow) * 22px) color-mix(in oklab, var(--accent-a) 55%, transparent))', transition: 'filter .5s' }}
                  />
                  {/* verso (espelhado para o </> continuar legível) */}
                  <img
                    src={simbolo}
                    alt=""
                    draggable={false}
                    width={760}
                    height={854}
                    className="absolute inset-0 block h-auto w-full [backface-visibility:hidden] [transform:rotateY(180deg)_scaleX(-1)]"
                    style={{ filter: 'hue-rotate(var(--logo-hue, 0deg)) drop-shadow(0 0 calc(var(--glow) * 22px) color-mix(in oklab, var(--accent-a) 55%, transparent))', transition: 'filter .5s' }}
                  />
                </motion.div>
              </div>
            </motion.div>
            {/* reflexo no chão */}
            <motion.img
              style={{
                rotateY: lampRotate,
                filter: 'hue-rotate(var(--logo-hue, 0deg))',
                maskImage: 'linear-gradient(to top, black, transparent 38%)',
                WebkitMaskImage: 'linear-gradient(to top, black, transparent 38%)',
              }}
              src={simbolo}
              alt=""
              draggable={false}
              width={760}
              height={854}
              className="pointer-events-none mx-auto -mt-[6%] block h-auto w-[86%] -scale-y-100 opacity-[0.14] blur-[3px]"
            />
          </div>
        </motion.div>

        {/* órbitas — metade da frente (passa por cima da lâmpada) */}
        <motion.div className="pointer-events-none absolute inset-0" {...(reduce ? {} : { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.2, delay: 0.3, ease } })}>
          <Orbits layer="front" animate={!reduce} />
        </motion.div>

        {/* flash + onda de choque no momento em que acende */}
        {!reduce && (
          <>
            <motion.div
              className="pointer-events-none absolute left-1/2 top-[34%] size-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgb(255 255 255 / 0.9), color-mix(in oklab, var(--accent-a) 50%, transparent) 45%, transparent)' }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.1, 1.5] }}
              transition={{ duration: 0.9, delay: IGNITE - 0.05, times: [0, 0.25, 1], ease: 'easeOut' }}
            />
            {[0, 0.18].map((d) => (
              <motion.div
                key={d}
                className="pointer-events-none absolute left-1/2 top-[34%] size-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                style={{ borderColor: 'var(--accent-a)', boxShadow: '0 0 30px var(--accent-a), inset 0 0 30px var(--accent-a)' }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.3, 1.6, 2.6] }}
                transition={{ duration: 1.3, delay: IGNITE + d, times: [0, 0.15, 1], ease: 'easeOut' }}
              />
            ))}
          </>
        )}

        {/* onda de luz a cada clique */}
        {bursts.map((id) => (
          <motion.div
            key={id}
            className="pointer-events-none absolute left-1/2 top-[34%] size-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{ borderColor: 'var(--accent-a)', boxShadow: '0 0 30px var(--accent-a), inset 0 0 30px var(--accent-a)' }}
            initial={{ opacity: 0.9, scale: 0.4 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            onAnimationComplete={() => setBursts((b) => b.filter((x) => x !== id))}
          />
        ))}

        {/* dica de interação (some depois do primeiro toque) */}
        <motion.div
          className="pointer-events-none absolute bottom-[9%] left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: touched ? 0 : 1, y: 0 }}
          transition={{ duration: 0.6, delay: touched ? 0 : IGNITE + 1.1 }}
        >
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0b1b2a]/70 px-3.5 py-1.5 text-xs text-white/75 backdrop-blur-md">
            <svg viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 6.5A6.5 6.5 0 1 0 16.5 12" /><path d="M16 3v4h-4" /></svg>
            {fine ? 'Arraste para girar · clique para mudar a cor' : 'Gire com o dedo · toque para mudar a cor'}
          </span>
        </motion.div>

        {/* chips */}
        {chips.map((c) => (
          <motion.div
            key={c.label}
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: c.delay, ease }}
            className={`absolute ${c.pos} [transform:translateZ(60px)]`}
          >
            <div
              style={{ animation: reduce ? undefined : `${c.float} 7s ease-in-out infinite` }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0b1b2a]/70 px-4 py-2 text-sm text-white/90 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.8)] backdrop-blur-md"
            >
              <span className="size-2 rounded-full" style={{ background: 'var(--accent-a)', boxShadow: '0 0 10px var(--accent-a)' }} />
              <span>{c.label}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        @keyframes bob { 0%,100% { translate: 0 0 } 50% { translate: 0 -10px } }
        @keyframes halo { 0%,100% { opacity: .7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.07); } }
        @keyframes float-1 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        @keyframes float-2 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(7px) } }
        @keyframes float-3 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
      `}</style>
    </div>
  )
}
