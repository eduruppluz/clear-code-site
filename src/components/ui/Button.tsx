import { useRef, type AnchorHTMLAttributes, type PointerEvent, type ReactNode } from 'react'
import { Link } from 'react-router'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** rota interna (usa o roteador); se ausente, usa href normal */
  to?: string
  variant?: 'primary' | 'ghost'
  size?: 'md' | 'sm'
  arrow?: boolean
  children: ReactNode
}

/**
 * Botão-link. A cor vem do acento da seção/página ativa e o brilho
 * segue o cursor (só com mouse).
 */
export function Button({ to, variant = 'primary', size = 'md', arrow = false, className = '', children, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const sizes = size === 'sm' ? 'h-10 px-5 text-sm' : 'h-12 px-6 text-[0.95rem] sm:h-14 sm:px-7'
  const base =
    'group relative isolate inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold transition-[transform,box-shadow,background-color,border-color] duration-300 ease-[var(--ease-out)] active:scale-[0.98]'
  const variants = {
    primary:
      'text-white shadow-[0_0_0_1px_rgb(255_255_255/0.14)_inset,0_10px_36px_-10px_color-mix(in_oklab,var(--accent-a)_80%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgb(255_255_255/0.24)_inset,0_16px_48px_-10px_var(--accent-a)]',
    ghost: 'border border-white/12 bg-white/[0.03] text-white backdrop-blur-sm hover:border-white/25 hover:bg-white/[0.06]',
  }

  const inner = (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{ background: 'linear-gradient(100deg, color-mix(in oklab, var(--accent-b) 85%, black), color-mix(in oklab, var(--accent-a) 80%, black))' }}
        />
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgb(255 255 255 / 0.28), transparent 70%)' }}
      />
      <span>{children}</span>
      {arrow && (
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10h12M11 5l5 5-5 5" />
        </svg>
      )}
    </>
  )

  const cls = `${base} ${sizes} ${variants[variant]} ${className}`
  return to ? (
    <Link ref={ref} to={to} onPointerMove={onMove} className={cls} {...rest}>
      {inner}
    </Link>
  ) : (
    <a ref={ref} onPointerMove={onMove} className={cls} {...rest}>
      {inner}
    </a>
  )
}
