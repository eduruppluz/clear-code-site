import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { pageMeta } from '../../config/routes'

/**
 * - Ao trocar de página: volta ao topo (ou rola até a seção pedida em state.scrollTo).
 * - Atualiza <title> e meta description de cada página.
 */
export function RouteEffects() {
  const location = useLocation()

  useEffect(() => {
    const meta = pageMeta[location.pathname] ?? pageMeta['/']
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [location.pathname])

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (!target) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    // a página pode ainda estar entrando: tenta por alguns frames
    let tries = 0
    let raf = 0
    const seek = () => {
      const el = document.getElementById(target)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else if (tries++ < 40) raf = requestAnimationFrame(seek)
    }
    const t = setTimeout(seek, 60)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
    }
  }, [location.key])

  return null
}
