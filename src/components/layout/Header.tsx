import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, useLocation } from 'react-router'
import { nav, type NavItem } from '../../config/routes'
import { useSections } from '../../theme/ThemeProvider'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'

function useIsActive() {
  const { pathname } = useLocation()
  const { labels, active } = useSections()
  const sectionId = labels[active]?.id
  return (item: NavItem) => {
    if (item.to !== pathname) return false
    if (pathname === '/') return item.hash ? sectionId === item.hash : sectionId !== 'processo'
    return true
  }
}

const linkTo = (item: NavItem) => ({ pathname: item.to })
const linkState = (item: NavItem) => (item.hash ? { scrollTo: item.hash } : undefined)

export function Header() {
  const isActive = useIsActive()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`relative z-10 mx-auto flex h-[var(--header-h)] max-w-[calc(var(--container)+2rem)] items-center justify-between gap-4 rounded-2xl px-4 transition-[background-color,border-color,box-shadow,height] duration-500 ease-[var(--ease-out)] sm:px-6 ${
          scrolled || open
            ? '!h-16 border border-white/[0.07] bg-[#020B16]/75 shadow-[0_12px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl'
            : 'border border-transparent'
        }`}
      >
        <Link to="/" aria-label="Clear Code ERL — página inicial" className="relative z-10 rounded-lg">
          <Logo intro />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const on = isActive(item)
              return (
                <li key={item.label}>
                  <Link
                    to={linkTo(item)}
                    state={linkState(item)}
                    aria-current={on ? 'page' : undefined}
                    className="relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
                    style={{ color: on ? 'color-mix(in oklab, var(--accent-a) 80%, white)' : undefined }}
                  >
                    <span className={on ? '' : 'text-muted transition-colors hover:text-white'}>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-center rounded-full transition-transform duration-500 ease-[var(--ease-out)]"
                      style={{ background: 'var(--accent-a)', transform: `scaleX(${on ? 1 : 0})`, boxShadow: '0 0 12px var(--accent-a)' }}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Button to="/contato" size="sm">Vamos conversar</Button>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="relative z-10 grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-px w-5 bg-white transition-transform duration-300 ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`absolute bottom-0 left-0 h-px w-5 bg-white transition-transform duration-300 ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-0 flex flex-col bg-[#020B16]/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Menu móvel" className="flex-1">
              <ul className="flex flex-col gap-1">
                {[...nav, { label: 'Contato', to: '/contato' }].map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={linkTo(item)}
                      state={linkState(item)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-white/[0.06] py-4 font-display text-3xl font-semibold"
                    >
                      <span className="font-sans text-xs tabular-nums text-dim">0{i + 1}</span>
                      <span className={isActive(item) ? 'text-gradient' : ''}>{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <Button to="/contato" arrow onClick={() => setOpen(false)}>Vamos conversar</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
