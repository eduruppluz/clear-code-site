import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'motion/react';
import { services } from '../../config/content';
import { palette } from '../../config/themes';
import { site } from '../../config/site';
const ease = [0.22, 1, 0.36, 1];
const channels = [
    { name: 'WhatsApp', detail: site.contact.whatsappDisplay, href: site.contact.whatsappUrl, color: palette.aqua, note: 'Canal mais rápido para conversar' },
    { name: 'Instagram', detail: site.contact.instagramHandle, href: site.contact.instagramUrl, color: palette.magenta, note: 'Acompanhe e mande uma mensagem' },
    { name: 'E-mail', detail: site.contact.email, href: `mailto:${site.contact.email}`, color: palette.azul, note: 'Para propostas e detalhes do projeto' },
];
function ChannelIcon({ name }) {
    const c = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
    return (_jsxs("svg", { viewBox: "0 0 24 24", className: "size-5", "aria-hidden": "true", ...c, children: [name === 'WhatsApp' && _jsxs(_Fragment, { children: [_jsx("path", { d: "M4 20l1.3-3.9A8 8 0 1 1 8 18.8L4 20Z" }), _jsx("path", { d: "M9 9.5c.3 2 2.5 4.2 4.5 4.5l1-1 2 1c-.3 1-1.2 1.7-2.3 1.5-3-.5-5.5-3-6-6-.2-1 .5-2 1.5-2.3l1 2-1 1" })] }), name === 'Instagram' && _jsxs(_Fragment, { children: [_jsx("rect", { x: "3.5", y: "3.5", width: "17", height: "17", rx: "5" }), _jsx("circle", { cx: "12", cy: "12", r: "4" }), _jsx("circle", { cx: "17.2", cy: "6.8", r: "0.6", fill: "currentColor" })] }), name === 'E-mail' && _jsxs(_Fragment, { children: [_jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2.5" }), _jsx("path", { d: "m4 7 8 6 8-6" })] })] }));
}
export function ContactChannels() {
    return (_jsx("ul", { className: "grid gap-4", children: channels.map((ch, i) => (_jsx(motion.li, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: i * 0.08, ease }, children: _jsxs("a", { href: ch.href, target: "_blank", rel: "noopener", className: "glow-card is-interactive group flex items-center gap-5 p-5 sm:p-6", style: { ['--c']: ch.color }, children: [_jsx("span", { className: "grid size-12 shrink-0 place-items-center rounded-xl border bg-white/[0.03] transition-colors duration-300 group-hover:bg-[color:var(--c)] group-hover:text-[#021024]", style: { borderColor: `${ch.color}66`, color: ch.color }, children: _jsx(ChannelIcon, { name: ch.name }) }), _jsxs("span", { className: "min-w-0 flex-1", children: [_jsx("span", { className: "block font-display text-lg font-bold", children: ch.name }), _jsx("span", { className: "block truncate text-sm text-white/85", children: ch.detail }), _jsx("span", { className: "block text-xs text-dim", children: ch.note })] }), _jsx("svg", { viewBox: "0 0 20 20", className: "size-5 text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-white", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": "true", children: _jsx("path", { d: "M4 10h12M11 5l5 5-5 5" }) })] }) }, ch.name))) }));
}
/** Formulário sem servidor: monta a mensagem e abre o WhatsApp já preenchido. */
export function ContactForm() {
    const [error, setError] = useState('');
    const submit = (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const name = String(f.get('name') ?? '').trim();
        const message = String(f.get('message') ?? '').trim();
        if (!name || !message) {
            setError('Preencha seu nome e conte um pouco sobre o projeto.');
            return;
        }
        setError('');
        const lines = [
            `Olá, Clear Code! Meu nome é ${name}.`,
            f.get('company') ? `Empresa: ${f.get('company')}` : '',
            f.get('service') ? `Interesse: ${f.get('service')}` : '',
            '',
            message,
        ].filter((l, i, arr) => l !== '' || (i > 0 && arr[i - 1] !== ''));
        const number = site.contact.whatsappUrl.match(/wa\.me\/(\d+)/)?.[1];
        window.open(`https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    };
    const field = 'mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white placeholder:text-dim transition-[border-color,box-shadow] duration-300 focus:border-[color:var(--accent-a)] focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-a)_25%,transparent)] focus:outline-none';
    return (_jsxs("form", { onSubmit: submit, noValidate: true, className: "glow-card p-6 sm:p-8", "data-on": "true", "aria-labelledby": "form-title", children: [_jsx("h2", { id: "form-title", className: "font-display text-2xl font-bold", children: "Conte sobre o seu projeto" }), _jsx("p", { className: "mt-2 text-sm text-muted", children: "Ao enviar, abrimos o WhatsApp com a sua mensagem pronta." }), _jsxs("div", { className: "mt-7 grid gap-5 sm:grid-cols-2", children: [_jsxs("label", { className: "block text-sm font-medium", children: ["Nome ", _jsx("span", { "aria-hidden": "true", style: { color: 'var(--accent-a)' }, children: "*" }), _jsx("input", { name: "name", required: true, autoComplete: "name", className: field, placeholder: "Seu nome" })] }), _jsxs("label", { className: "block text-sm font-medium", children: ["Empresa ", _jsx("span", { className: "text-dim", children: "(opcional)" }), _jsx("input", { name: "company", autoComplete: "organization", className: field, placeholder: "Nome da empresa" })] }), _jsxs("label", { className: "block text-sm font-medium sm:col-span-2", children: ["O que voc\u00EA precisa?", _jsxs("select", { name: "service", className: `${field} appearance-none`, defaultValue: "", children: [_jsx("option", { value: "", className: "bg-[#0b1b2a]", children: "Selecione uma op\u00E7\u00E3o" }), services.map((s) => _jsx("option", { className: "bg-[#0b1b2a]", children: s.title }, s.id)), _jsx("option", { className: "bg-[#0b1b2a]", children: "Ainda n\u00E3o sei \u2014 quero conversar" })] })] }), _jsxs("label", { className: "block text-sm font-medium sm:col-span-2", children: ["Mensagem ", _jsx("span", { "aria-hidden": "true", style: { color: 'var(--accent-a)' }, children: "*" }), _jsx("textarea", { name: "message", required: true, rows: 5, className: `${field} resize-y`, placeholder: "Qual \u00E9 a sua ideia, necessidade ou desafio?" })] })] }), _jsx("p", { role: "alert", "aria-live": "polite", className: "mt-4 min-h-5 text-sm", style: { color: '#FF9A9A' }, children: error }), _jsxs("button", { type: "submit", className: "mt-2 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full font-semibold text-white shadow-[0_10px_36px_-10px_var(--accent-a)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]", style: { background: 'linear-gradient(100deg, color-mix(in oklab, var(--accent-b) 72%, #0a1640), color-mix(in oklab, var(--accent-a) 58%, #0a1640))' }, children: ["Enviar pelo WhatsApp", _jsx("svg", { viewBox: "0 0 20 20", className: "size-4", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": "true", children: _jsx("path", { d: "M4 10h12M11 5l5 5-5 5" }) })] })] }));
}
