import { useEffect, useRef } from 'react'

/**
 * Partículas discretas que convergem para a lâmpada ("ideias virando código").
 * Canvas 2D leve: ~60 partículas no desktop, ~28 no mobile.
 * Pausa fora da tela / aba oculta. Lê a cor do acento ativo a cada ~½s.
 * Com movimento reduzido, desenha apenas um campo estático.
 */
type P = { angle: number; r: number; speed: number; size: number; drift: number }

export function ParticleField({ className = '', reduced = false }: { className?: string; reduced?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, cx = 0, cy = 0, maxR = 0
    let raf = 0
    let visible = true
    let tick = 0
    let color = '8 191 232'
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const count = mobile ? 28 : 60

    const spawn = (p?: P): P => {
      const q = p ?? ({} as P)
      q.angle = Math.random() * Math.PI * 2
      q.r = maxR * (0.75 + Math.random() * 0.35)
      q.speed = 0.25 + Math.random() * 0.55
      q.size = 0.6 + Math.random() * 1.3
      q.drift = (Math.random() - 0.5) * 0.004
      return q
    }

    const readColor = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue('--accent-a').trim()
      const n = parseInt(hex.replace('#', ''), 16)
      if (!Number.isNaN(n)) color = `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = w / 2
      cy = h * 0.44
      maxR = Math.hypot(w, h) * 0.5
    }

    resize()
    readColor()
    const parts: P[] = Array.from({ length: count }, () => {
      const p = spawn()
      p.r = maxR * (0.15 + Math.random() * 0.9) // começa espalhado, não tudo na borda
      return p
    })

    const draw = (static_ = false) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        if (!static_) {
          p.r -= p.speed * (1 + (1 - p.r / maxR) * 1.4) // acelera perto da lâmpada
          p.angle += p.drift
          if (p.r < maxR * 0.11) spawn(p)
        }
        const x = cx + Math.cos(p.angle) * p.r
        const y = cy + Math.sin(p.angle) * p.r * 0.92
        const near = p.r / maxR
        const alpha = Math.min(1, near * 2.2) * Math.min(1, (1 - near) * 3) * 0.75
        ctx.beginPath()
        ctx.fillStyle = `rgb(${color} / ${alpha})`
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      raf = 0
      if (!visible) return
      if (++tick % 30 === 0) readColor()
      draw()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop)
    }

    if (reduced) {
      draw(true)
      return
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
    })
    io.observe(canvas)
    const onVis = () => (document.hidden ? (cancelAnimationFrame(raf), (raf = 0)) : start())
    document.addEventListener('visibilitychange', onVis)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    start()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduced])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
