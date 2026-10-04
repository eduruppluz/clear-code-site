import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { decodeTheme, type Theme } from '../config/themes'
import { hexToOklab, oklabToHex, smooth, type Lab } from './color'

/**
 * Motor de cor.
 *
 * 1. Lê todos os blocos com [data-theme] da página (criados por <Themed>).
 * 2. A cada scroll calcula a cor-ALVO: interpola entre os temas dos blocos
 *    vizinhos ao centro da viewport.
 * 3. A cor EXIBIDA persegue o alvo suavemente (amortecimento por frame) —
 *    é isso que faz a troca de página e a troca de etapa parecerem um
 *    "fade" de luz em vez de uma virada de tema.
 * 4. Escreve --accent-a, --accent-b e --glow no :root. Todo o resto só lê.
 *
 * Também mantém a lista de seções rotuladas ([data-label]) para o
 * indicador lateral e qual delas está ativa.
 */
type Anchor = { y: number; th: Theme }
type Ctx = { labels: { id: string; label: string }[]; active: number }

const ThemeContext = createContext<Ctx>({ labels: [], active: 0 })
export const useSections = () => useContext(ThemeContext)

const lerp = (a: Lab, b: Lab, t: number): Lab => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
const dist = (a: Lab, b: Lab) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [labels, setLabels] = useState<Ctx['labels']>([])
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const api = useRef<{ remeasure: () => void } | null>(null)

  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let anchors: Anchor[] = []
    let sections: { id: string; label: string; top: number; bottom: number }[] = []
    let raf = 0
    let lastT = 0

    // estado exibido (OKLab) e alvo
    const init = hexToOklab('#08BFE8')
    const cur = { a: init, b: hexToOklab('#176BFF'), g: 1.2 }
    const tgt = { a: cur.a, b: cur.b, g: cur.g }
    let written = { a: '', b: '', g: '' }

    const measure = () => {
      const sy = window.scrollY
      anchors = []
      document.querySelectorAll<HTMLElement>('[data-theme]').forEach((el) => {
        const r = el.getBoundingClientRect()
        const top = r.top + sy
        const th = decodeTheme(el.dataset.theme!)
        // o bloco "segura" sua cor no miolo e mistura nas bordas
        anchors.push({ y: top + r.height * 0.3, th }, { y: top + r.height * 0.7, th })
      })
      anchors.sort((x, y) => x.y - y.y)

      sections = []
      document.querySelectorAll<HTMLElement>('[data-label]').forEach((el) => {
        const r = el.getBoundingClientRect()
        sections.push({ id: el.id, label: el.dataset.label!, top: r.top + sy, bottom: r.bottom + sy })
      })
      setLabels((prev) => {
        const next = sections.map(({ id, label }) => ({ id, label }))
        return prev.length === next.length && prev.every((p, i) => p.id === next[i].id) ? prev : next
      })
    }

    const computeTarget = () => {
      if (!anchors.length) return
      const probe = window.scrollY + window.innerHeight * 0.5
      const first = anchors[0]
      const last = anchors[anchors.length - 1]
      let a: Lab, b: Lab, g: number
      if (probe <= first.y) {
        a = hexToOklab(first.th.a); b = hexToOklab(first.th.b); g = first.th.glow
      } else if (probe >= last.y) {
        a = hexToOklab(last.th.a); b = hexToOklab(last.th.b); g = last.th.glow
      } else {
        let k = 0
        while (k < anchors.length - 2 && anchors[k + 1].y <= probe) k++
        const f = anchors[k], n = anchors[k + 1]
        const t = smooth((probe - f.y) / (n.y - f.y || 1))
        a = lerp(hexToOklab(f.th.a), hexToOklab(n.th.a), t)
        b = lerp(hexToOklab(f.th.b), hexToOklab(n.th.b), t)
        g = f.th.glow + (n.th.glow - f.th.glow) * t
      }
      tgt.a = a; tgt.b = b; tgt.g = g

      let idx = sections.findIndex((s) => probe >= s.top && probe < s.bottom)
      if (idx === -1) idx = sections.length && probe >= sections[sections.length - 1].bottom ? sections.length - 1 : 0
      if (idx !== activeRef.current) {
        activeRef.current = idx
        setActive(idx)
      }
    }

    const write = () => {
      const a = oklabToHex(cur.a), b = oklabToHex(cur.b), g = cur.g.toFixed(2)
      if (a !== written.a) root.style.setProperty('--accent-a', a)
      if (b !== written.b) root.style.setProperty('--accent-b', b)
      if (g !== written.g) root.style.setProperty('--glow', g)
      written = { a, b, g }
    }

    const frame = (now: number) => {
      raf = 0
      const dt = lastT ? Math.min(64, now - lastT) : 16
      lastT = now
      const k = reduce ? 1 : 1 - Math.exp(-dt / 140) // ~0.45s para assentar
      cur.a = lerp(cur.a, tgt.a, k)
      cur.b = lerp(cur.b, tgt.b, k)
      cur.g += (tgt.g - cur.g) * k
      write()
      const settled = dist(cur.a, tgt.a) + dist(cur.b, tgt.b) < 0.002 && Math.abs(cur.g - tgt.g) < 0.01
      if (settled) {
        cur.a = tgt.a; cur.b = tgt.b; cur.g = tgt.g
        write()
        lastT = 0
      } else raf = requestAnimationFrame(frame)
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onScroll = () => {
      computeTarget()
      kick()
    }
    const remeasure = () => {
      measure()
      onScroll()
    }
    api.current = { remeasure }

    remeasure()
    const ro = new ResizeObserver(remeasure)
    ro.observe(document.body)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // nova página: mede de novo assim que ela montar (e após as fontes/imagens assentarem)
  useEffect(() => {
    const ids = [requestAnimationFrame(() => api.current?.remeasure())]
    const t1 = setTimeout(() => api.current?.remeasure(), 120)
    const t2 = setTimeout(() => api.current?.remeasure(), 600)
    return () => {
      ids.forEach(cancelAnimationFrame)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname])

  return <ThemeContext.Provider value={{ labels, active }}>{children}</ThemeContext.Provider>
}
