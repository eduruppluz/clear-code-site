import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { services } from '../../config/content'
import { palette } from '../../config/themes'
import { site } from '../../config/site'

const ease = [0.22, 1, 0.36, 1] as const

const channels = [
  { name: 'WhatsApp', detail: site.contact.whatsappDisplay, href: site.contact.whatsappUrl, color: palette.aqua, note: 'Canal mais rápido para conversar' },
  { name: 'Instagram', detail: site.contact.instagramHandle, href: site.contact.instagramUrl, color: palette.magenta, note: 'Acompanhe e mande uma mensagem' },
  { name: 'E-mail', detail: site.contact.email, href: `mailto:${site.contact.email}`, color: palette.azul, note: 'Para propostas e detalhes do projeto' },
]

function ChannelIcon({ name }: { name: string }) {
  const c = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" {...c}>
      {name === 'WhatsApp' && <><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8L4 20Z" /><path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1-1 2 1c-.3 1-1.2 1.7-2.3 1.5-3-.5-5.5-3-6-6-.2-1 .5-2 1.5-2.3l1 2-1 1" /></>}
      {name === 'Instagram' && <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></>}
      {name === 'E-mail' && <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></>}
    </svg>
  )
}

export function ContactChannels() {
  return (
    <ul className="grid gap-4">
      {channels.map((ch, i) => (
        <motion.li key={ch.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease }}>
          <a href={ch.href} target="_blank" rel="noopener" className="glow-card is-interactive group flex items-center gap-5 p-5 sm:p-6" style={{ ['--c' as string]: ch.color }}>
            <span className="grid size-12 shrink-0 place-items-center rounded-xl border bg-white/[0.03] transition-colors duration-300 group-hover:bg-[color:var(--c)] group-hover:text-[#021024]" style={{ borderColor: `${ch.color}66`, color: ch.color }}>
              <ChannelIcon name={ch.name} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-bold">{ch.name}</span>
              <span className="block truncate text-sm text-white/85">{ch.detail}</span>
              <span className="block text-xs text-dim">{ch.note}</span>
            </span>
            <svg viewBox="0 0 20 20" className="size-5 text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
          </a>
        </motion.li>
      ))}
    </ul>
  )
}

const origins: Record<string, string> = {
  facebook: 'Meta Ads',
  fb: 'Meta Ads',
  meta: 'Meta Ads',
  instagram: 'Instagram',
  ig: 'Instagram',
  google: 'Google',
}

function formatPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

/** Grava o lead e informa se o CRM confirmou o registro. */
async function saveLead(lead: Record<string, string | boolean>): Promise<{ ok: boolean; erro?: string }> {
  const response = await fetch(site.crmUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(lead),
  })
  return response.json()
}

/** Registra o lead no CRM, confirma na tela e oferece o WhatsApp com a mensagem pronta. */
export function ContactForm() {
  const [error, setError] = useState('')
  const [phone, setPhone] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ saved: boolean; whatsapp: string } | null>(null)

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('website')) return
    const name = String(f.get('name') ?? '').trim()
    const message = String(f.get('message') ?? '').trim()
    const company = String(f.get('company') ?? '').trim()
    const service = String(f.get('service') ?? '').trim()
    if (!name || !message) {
      setError('Preencha seu nome e conte um pouco sobre o projeto.')
      return
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Informe seu WhatsApp com DDD.')
      return
    }
    if (!f.get('consent')) {
      setError('Marque a autorização para continuar.')
      return
    }
    setError('')

    const lines = [
      `Olá, Clear Code! Meu nome é ${name}.`,
      company ? `Empresa: ${company}` : '',
      service ? `Interesse: ${service}` : '',
      '',
      message,
    ].filter((l, i, arr) => l !== '' || (i > 0 && arr[i - 1] !== ''))
    const number = site.contact.whatsappUrl.match(/wa\.me\/(\d+)/)?.[1]
    const whatsapp = `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`

    const params = new URLSearchParams(window.location.search)
    const source = params.get('utm_source')?.trim() ?? ''
    setSending(true)
    try {
      const saved = await saveLead({
        nome: name,
        whatsapp: phone,
        interesse: [service, company && `Empresa: ${company}`, message].filter(Boolean).join(' | '),
        origem: origins[source.toLowerCase()] ?? (source || 'Site'),
        utm_campaign: params.get('utm_campaign') ?? '',
        consentimento: true,
      })
      if (saved.ok) {
        setResult({ saved: true, whatsapp })
      } else {
        setError(saved.erro === 'WhatsApp invalido' ? 'Confira o número do seu WhatsApp, com DDD.' : 'Não foi possível enviar. Confira os dados e tente de novo.')
      }
    } catch {
      setResult({ saved: false, whatsapp })
    } finally {
      setSending(false)
    }
  }

  const field =
    'mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white placeholder:text-dim transition-[border-color,box-shadow] duration-300 focus:border-[color:var(--accent-a)] focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-a)_25%,transparent)] focus:outline-none'

  if (result) {
    return (
      <div role="status" className="glow-card p-6 sm:p-8" data-on="true">
        <h2 className="font-display text-2xl font-bold">{result.saved ? 'Recebemos seu pedido!' : 'Falta só um passo'}</h2>
        <p className="mt-3 text-muted">
          {result.saved
            ? 'Vamos falar com você pelo WhatsApp que você informou. Se preferir, pode nos chamar agora.'
            : 'Não conseguimos confirmar o registro do seu pedido. Para garantir, envie sua mensagem pelo WhatsApp.'}
        </p>
        <a
          href={result.whatsapp}
          target="_blank"
          rel="noopener"
          className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full font-semibold text-white shadow-[0_10px_36px_-10px_var(--accent-a)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
          style={{ background: 'linear-gradient(100deg, color-mix(in oklab, var(--accent-b) 72%, #0a1640), color-mix(in oklab, var(--accent-a) 58%, #0a1640))' }}
        >
          Falar agora no WhatsApp
          <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="glow-card p-6 sm:p-8" data-on="true" aria-labelledby="form-title">
      <h2 id="form-title" className="font-display text-2xl font-bold">Conte sobre o seu projeto</h2>
      <p className="mt-2 text-sm text-muted">Ao enviar, registramos seu pedido e você pode falar com a gente pelo WhatsApp, se quiser.</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Nome <span aria-hidden="true" style={{ color: 'var(--accent-a)' }}>*</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Seu nome" />
        </label>
        <label className="block text-sm font-medium">
          Empresa <span className="text-dim">(opcional)</span>
          <input name="company" autoComplete="organization" className={field} placeholder="Nome da empresa" />
        </label>
        <label className="block text-sm font-medium sm:col-span-2">
          WhatsApp <span aria-hidden="true" style={{ color: 'var(--accent-a)' }}>*</span>
          <input name="whatsapp" type="tel" inputMode="tel" required autoComplete="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} className={field} placeholder="(41) 99999-0000" />
        </label>
        <label className="block text-sm font-medium sm:col-span-2">
          O que você precisa?
          <select name="service" className={`${field} appearance-none`} defaultValue="">
            <option value="" className="bg-[#0b1b2a]">Selecione uma opção</option>
            {services.map((s) => <option key={s.id} className="bg-[#0b1b2a]">{s.title}</option>)}
            <option className="bg-[#0b1b2a]">Ainda não sei — quero conversar</option>
          </select>
        </label>
        <label className="block text-sm font-medium sm:col-span-2">
          Mensagem <span aria-hidden="true" style={{ color: 'var(--accent-a)' }}>*</span>
          <textarea name="message" required rows={5} className={`${field} resize-y`} placeholder="Qual é a sua ideia, necessidade ou desafio?" />
        </label>
      </div>
      <label className="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
        Não preencha
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input name="consent" type="checkbox" required className="mt-0.5 size-5 shrink-0" style={{ accentColor: 'var(--accent-a)' }} />
        <span>Autorizo a Clear Code a guardar meus dados e entrar em contato sobre este pedido.</span>
      </label>
      <p role="alert" aria-live="polite" className="mt-4 min-h-5 text-sm" style={{ color: '#FF9A9A' }}>{error}</p>
      <button
        type="submit"
        disabled={sending}
        className="mt-2 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full font-semibold text-white shadow-[0_10px_36px_-10px_var(--accent-a)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
        style={{ background: 'linear-gradient(100deg, color-mix(in oklab, var(--accent-b) 72%, #0a1640), color-mix(in oklab, var(--accent-a) 58%, #0a1640))' }}
      >
        {sending ? 'Enviando...' : 'Enviar pedido'}
        <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
      </button>
    </form>
  )
}
