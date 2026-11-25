import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import valcar from '../../assets/projects/valcar/screen.webp'
import mister from '../../assets/projects/mister-chapeu/screen.webp'
import kit from '../../assets/projects/kit-odonto/home-desktop.webp'

/**
 * MacBook em 3D que abre, mostra um projeto, fecha girando e reabre com o
 * próximo. O three.js só é carregado depois que o resto da página aparece.
 */
const slides = [
  { src: valcar, name: 'Valcar Consórcio' },
  { src: mister, name: 'Mister Chapéu' },
  { src: kit, name: 'Kit de Resumos de Odontologia' },
]

export function HeroLaptop() {
  const reduce = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [index, setIndex] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let handle: { destroy: () => void } | undefined
    let cancelled = false
    // espera a entrada do título terminar antes de ligar o 3D
    const start = () =>
      import('./laptopScene').then(({ createLaptopScene }) => {
      if (cancelled || !canvasRef.current) return
      try {
        handle = createLaptopScene(
          canvasRef.current,
          slides.map((s) => s.src),
          { reduced: !!reduce, onSlide: setIndex },
        )
        setReady(true)
      } catch {
        /* sem WebGL: fica só o brilho */
      }
    })
    const timer = window.setTimeout(start, 1400)
    return () => {
      window.clearTimeout(timer)
      cancelled = true
      handle?.destroy()
    }
  }, [reduce])

  return (
    <div className="relative mx-auto w-full max-w-[860px]">
      <div className="relative aspect-[5/4] w-full sm:aspect-[16/11]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 size-full transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
          role="img"
          aria-label={`Notebook mostrando o site ${slides[index].name}, um dos projetos da Clear Code`}
        />
      </div>

      {/* luz no "chão", como no vídeo de referência */}
      <div aria-hidden="true" className="pointer-events-none relative -mt-6 h-24">
        <div
          className="absolute left-1/2 top-1/2 h-full w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-2xl"
          style={{ background: 'radial-gradient(closest-side, rgba(37,99,235,.85), rgba(8,191,232,.35) 55%, transparent)' }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-px w-[60%] -translate-x-1/2"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(193,232,255,.9), transparent)' }}
        />
      </div>

      <p className="relative mt-2 text-center text-xs uppercase tracking-[0.28em] text-dim" aria-live="polite">
        Projeto no ar · <span className="text-white/80">{slides[index].name}</span>
      </p>
    </div>
  )
}
