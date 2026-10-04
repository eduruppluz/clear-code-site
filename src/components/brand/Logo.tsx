import { LogoMark } from './LogoMark'

/** Logo horizontal: lâmpada viva + wordmark CLEAR CODE / ERL */
export function Logo({ className = '', intro = false }: { className?: string; intro?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-auto shrink-0" intro={intro} />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-display text-[0.95rem] tracking-[0.06em] text-white sm:text-[1.05rem]">
          <span className="font-light">CLEAR</span> <span className="font-extrabold">CODE</span>
        </span>
        <span className="mt-1 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-px flex-1" style={{ background: 'var(--grad-accent)' }} />
          <span
            className="font-display text-[0.6rem] font-bold tracking-[0.5em] pl-[0.5em]"
            style={{ color: 'color-mix(in oklab, var(--accent-a) 70%, var(--accent-b))' }}
          >
            ERL
          </span>
          <span className="h-px flex-1" style={{ background: 'var(--grad-accent)' }} />
        </span>
      </span>
    </span>
  )
}
