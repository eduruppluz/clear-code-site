import type { ServiceId } from '../../config/content'

/**
 * Mini-interfaces de cada serviço. Puro HTML/CSS/SVG, cor via --c.
 * Reagem a hover (desktop) ou a data-on="true" (card em foco no mobile)
 * através das variantes `group-hover` / `group-data-[on=true]`.
 */
const on = 'group-hover:[--k:1] group-data-[on=true]:[--k:1]'
const tone = (pct: number) => `color-mix(in oklab, var(--c) ${pct}%, transparent)`

function Frame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#030c17] shadow-[0_20px_40px_-20px_rgb(0_0_0/0.9)] ${className}`}>{children}</div>
  )
}

function Sites() {
  return (
    <Frame className="h-full w-full">
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-3 py-2">
        {[0, 1, 2].map((i) => <span key={i} className="size-1.5 rounded-full bg-white/20" />)}
        <span className="ml-2 h-3 flex-1 rounded-full bg-white/[0.06] px-2 text-[0.5rem] leading-3 text-white/40">suaempresa.com.br</span>
      </div>
      <div className="grid grid-cols-[1.2fr_1fr] gap-3 p-3">
        <div className="space-y-1.5">
          <div className="h-2 w-4/5 rounded-full bg-white/70" />
          <div className="h-2 w-3/5 rounded-full" style={{ background: 'var(--c)' }} />
          <div className="h-1.5 w-full rounded-full bg-white/15" />
          <div className="h-1.5 w-5/6 rounded-full bg-white/15" />
          <div className="mt-2 h-3.5 w-14 rounded-full transition-transform duration-500 [transform:translateX(calc(var(--k,0)*6px))]" style={{ background: 'var(--c)', boxShadow: `0 0 14px ${tone(70)}` }} />
        </div>
        <div className="relative rounded-lg transition-transform duration-700 ease-[var(--ease-out)] [transform:scale(calc(1+var(--k,0)*0.06))]" style={{ background: `linear-gradient(140deg, ${tone(45)}, transparent)`, border: `1px solid ${tone(35)}` }}>
          <svg viewBox="0 0 60 40" className="absolute inset-x-1 bottom-1"><path d="M0 34 L14 22 L24 28 L38 12 L52 20 L60 14 L60 40 L0 40Z" fill={tone(35)} /></svg>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 rounded-md border border-white/[0.07] bg-white/[0.03] transition-transform duration-500 [transform:translateY(calc(var(--k,0)*-3px))]" style={{ transitionDelay: `${i * 60}ms` }} />
          ))}
        </div>
      </div>
    </Frame>
  )
}

function Landing() {
  return (
    <Frame className="h-full w-full p-4">
      <div className="absolute -right-6 -top-10 size-32 rounded-full blur-2xl" style={{ background: tone(45) }} />
      <p className="relative max-w-[70%] font-display text-[0.8rem] font-bold leading-tight text-white">
        Impulsione sua marca.<br /><span style={{ color: 'var(--c)' }}>Gere resultados.</span>
      </p>
      <div className="relative mt-2 h-1.5 w-1/2 rounded-full bg-white/15" />
      <div className="relative mt-1.5 h-1.5 w-2/5 rounded-full bg-white/15" />
      <div className="relative mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.6rem] font-semibold text-white transition-[box-shadow,transform] duration-500 [transform:scale(calc(1+var(--k,0)*0.08))]" style={{ background: 'var(--c)', boxShadow: `0 0 calc(10px + var(--k,0)*18px) ${tone(80)}` }}>
        Quero saber mais
        <span className="transition-transform duration-500 [transform:translateX(calc(var(--k,0)*3px))]">→</span>
      </div>
      <svg viewBox="0 0 80 40" className="absolute bottom-3 right-3 w-20 overflow-visible">
        <path d="M2 36 C20 34 28 20 40 22 C52 24 60 8 78 4" fill="none" stroke="var(--c)" strokeWidth="2" strokeLinecap="round" pathLength="1" strokeDasharray="1" className="transition-[stroke-dashoffset] duration-700 [stroke-dashoffset:calc(0.35-var(--k,0)*0.35)]" />
      </svg>
    </Frame>
  )
}

function Leads() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Frame className="h-full w-[62%] rounded-[1.25rem] px-4 pt-5">
        <div className="mx-auto grid size-12 place-items-center rounded-full border-2 transition-transform duration-500 [transform:scale(calc(1+var(--k,0)*0.1))]" style={{ borderColor: 'var(--c)', boxShadow: `0 0 18px ${tone(60)}` }}>
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="var(--c)" strokeWidth="1.8"><circle cx="12" cy="9" r="3.5" /><path d="M5 19c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" strokeLinecap="round" /></svg>
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="h-2.5 rounded-md border border-white/10 bg-white/[0.04]" />
          <div className="h-2.5 rounded-md border border-white/10 bg-white/[0.04]" />
          <div className="h-3 rounded-md transition-opacity duration-500" style={{ background: 'var(--c)', opacity: 'calc(0.55 + var(--k,0)*0.45)' }} />
        </div>
      </Frame>
      {/* novo lead entrando */}
      <div className="absolute right-[4%] top-[14%] flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0b1b2a] px-2.5 py-1 text-[0.6rem] text-white/80 transition-[transform,opacity] duration-700 ease-[var(--ease-out)] [opacity:calc(0.35+var(--k,0)*0.65)] [transform:translate(calc((1-var(--k,0))*14px),calc((1-var(--k,0))*-6px))]">
        <span className="grid size-3.5 place-items-center rounded-full text-[0.5rem] text-[#021024]" style={{ background: 'var(--c)' }}>✓</span>
        Novo contato
      </div>
    </div>
  )
}

function Trafego() {
  return (
    <Frame className="h-full w-full p-3">
      <div className="flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="size-1.5 rounded-full bg-white/20" />)}</div>
      <svg viewBox="0 0 160 70" className="mt-2 w-full overflow-visible">
        <defs>
          <linearGradient id="traf-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--c)" stopOpacity="0.35" /><stop offset="1" stopColor="var(--c)" stopOpacity="0" /></linearGradient>
        </defs>
        {[15, 35, 55].map((y) => <line key={y} x1="0" x2="160" y1={y} y2={y} stroke="white" strokeOpacity="0.06" />)}
        <path d="M0 58 L25 50 L50 54 L75 36 L100 40 L125 20 L160 8 L160 70 L0 70Z" fill="url(#traf-fill)" />
        <path d="M0 58 L25 50 L50 54 L75 36 L100 40 L125 20 L160 8" fill="none" stroke="var(--c)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" pathLength="1" strokeDasharray="1" className="transition-[stroke-dashoffset] duration-1000 ease-[var(--ease-out)] [stroke-dashoffset:calc(0.3-var(--k,0)*0.3)]" />
        <circle cx="160" cy="8" r="3" fill="var(--c)" className="transition-opacity duration-500 [opacity:var(--k,0)]" />
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {['Alcance', 'Cliques', 'Conversões'].map((l) => (
          <div key={l} className="rounded-md border border-white/[0.07] bg-white/[0.03] px-1.5 py-1">
            <div className="text-[0.45rem] uppercase tracking-wider text-white/40">{l}</div>
            <div className="mt-1 h-1.5 rounded-full transition-[width] duration-700" style={{ background: tone(80), width: `calc(40% + var(--k,0) * 45%)` }} />
          </div>
        ))}
      </div>
    </Frame>
  )
}

function Crm() {
  const cols = [
    { t: 'Novo', n: 3 },
    { t: 'Em conversa', n: 2 },
    { t: 'Fechado', n: 1 },
  ]
  return (
    <Frame className="h-full w-full p-3">
      <div className="flex items-center justify-between">
        <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-white/50">Funil de vendas</span>
        <span className="rounded-full px-1.5 text-[0.5rem] font-bold text-[#021024]" style={{ background: 'var(--c)' }}>CRM</span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {cols.map((c, ci) => (
          <div key={c.t} className="rounded-md border border-white/[0.07] bg-white/[0.03] p-1.5">
            <div className="mb-1.5 text-[0.48rem] text-white/45">{c.t}</div>
            <div className="space-y-1">
              {Array.from({ length: c.n }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 rounded border border-white/10 bg-white/[0.05] px-1 transition-[transform,background-color] duration-700 ease-[var(--ease-out)]"
                  style={
                    ci === 0 && i === 0
                      ? { transform: 'translateX(calc(var(--k,0) * 200%))', background: tone(40), borderColor: tone(70) }
                      : undefined
                  }
                >
                  <div className="mt-1 h-1 w-3/4 rounded-full bg-white/30" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  )
}

function Automacoes() {
  const nodes = [
    { x: 14, label: 'Formulário' },
    { x: 50, label: 'CRM' },
    { x: 86, label: 'WhatsApp' },
  ]
  return (
    <Frame className="h-full w-full p-3">
      <svg viewBox="0 0 100 60" className="h-[70%] w-full overflow-visible">
        <path d="M14 26 H86" stroke="white" strokeOpacity="0.1" strokeWidth="1.5" strokeDasharray="2 2" />
        <path d="M14 26 H86" stroke="var(--c)" strokeWidth="1.8" strokeLinecap="round" pathLength="1" strokeDasharray="1" className="transition-[stroke-dashoffset] duration-1000 ease-[var(--ease-out)] [stroke-dashoffset:calc(0.55-var(--k,0)*0.55)]" />
        {nodes.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy="26" r="8" fill="#0b1b2a" stroke="var(--c)" strokeWidth="1.5" />
            <circle cx={n.x} cy="26" r="2.4" fill="var(--c)" />
            <text x={n.x} y="46" textAnchor="middle" fontSize="5.5" fill="white" fillOpacity="0.65">{n.label}</text>
          </g>
        ))}
      </svg>
      <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5 text-[0.55rem] text-white/80 transition-opacity duration-700 [opacity:calc(0.4+var(--k,0)*0.6)]">
        <span className="grid size-3.5 place-items-center rounded-full text-[0.5rem] text-[#021024]" style={{ background: 'var(--c)' }}>✓</span>
        Mensagem enviada automaticamente
      </div>
    </Frame>
  )
}

const map: Record<ServiceId, () => React.ReactElement> = { sites: Sites, landing: Landing, leads: Leads, trafego: Trafego, crm: Crm, automacoes: Automacoes }

export function ServiceVisual({ id }: { id: ServiceId }) {
  const V = map[id]
  return (
    <div aria-hidden="true" className={`h-40 sm:h-44 ${on}`}>
      <V />
    </div>
  )
}
