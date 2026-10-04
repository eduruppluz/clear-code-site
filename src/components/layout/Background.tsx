/**
 * Camada de fundo fixa: focos de luz na cor da seção + grid fino.
 * Tudo lê --accent-a/-b/--glow — reage à seção/página sem JS próprio.
 */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--cc-ink)]">
      {/* foco principal — canto superior direito */}
      <div
        className="absolute -right-[22vmax] -top-[28vmax] size-[72vmax] rounded-full blur-[70px] motion-safe:animate-[float-a_22s_ease-in-out_infinite_alternate]"
        style={{
          background: 'radial-gradient(closest-side, color-mix(in oklab, var(--accent-a) 55%, transparent), transparent)',
          opacity: 'calc(0.25 + var(--glow) * 0.4)',
        }}
      />
      {/* contraluz — canto inferior esquerdo */}
      <div
        className="absolute -bottom-[34vmax] -left-[24vmax] size-[70vmax] rounded-full blur-[70px] motion-safe:animate-[float-b_26s_ease-in-out_infinite_alternate]"
        style={{
          background: 'radial-gradient(closest-side, color-mix(in oklab, var(--accent-b) 50%, transparent), transparent)',
          opacity: 'calc(0.2 + var(--glow) * 0.3)',
        }}
      />
      {/* grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(255 255 255 / 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.035) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent)',
        }}
      />
      <style>{`
        @keyframes float-a { to { transform: translate3d(-6vmax, 6vmax, 0) scale(1.08); } }
        @keyframes float-b { to { transform: translate3d(6vmax, -6vmax, 0) scale(1.05); } }
      `}</style>
    </div>
  )
}
