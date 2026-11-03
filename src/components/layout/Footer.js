import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router';
import { site } from '../../config/site';
import { Logo } from '../brand/Logo';
import { Container } from '../ui/Container';
const links = [
    { to: '/sobre', label: 'Sobre' },
    { to: '/solucoes', label: 'Soluções' },
    { to: '/projetos', label: 'Projetos' },
    { to: '/contato', label: 'Contato' },
];
export function Footer() {
    const year = new Date().getFullYear();
    const social = [
        { href: site.contact.instagramUrl, label: `Instagram ${site.contact.instagramHandle}`, short: 'Instagram', detail: site.contact.instagramHandle },
        { href: site.contact.whatsappUrl, label: `WhatsApp ${site.contact.whatsappDisplay}`, short: 'WhatsApp', detail: site.contact.whatsappDisplay },
        { href: `mailto:${site.contact.email}`, label: `E-mail ${site.contact.email}`, short: 'E-mail', detail: site.contact.email },
    ];
    return (_jsxs("footer", { className: "relative border-t border-white/[0.06] py-14", children: [_jsx("div", { "aria-hidden": "true", className: "absolute inset-x-0 top-0 h-px", style: { background: 'linear-gradient(90deg, transparent, var(--accent-a), transparent)', opacity: 0.6 } }), _jsxs(Container, { className: "grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]", children: [_jsxs("div", { children: [_jsx(Logo, {}), _jsx("p", { className: "mt-4 text-sm text-muted", children: site.description })] }), _jsxs("nav", { "aria-label": "Rodap\u00E9", children: [_jsx("h2", { className: "mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dim", children: "Navega\u00E7\u00E3o" }), _jsx("ul", { className: "grid gap-2.5 text-sm", children: links.map((l) => (_jsx("li", { children: _jsx(Link, { to: l.to, className: "text-muted transition-colors hover:text-white", children: l.label }) }, l.to))) })] }), _jsxs("div", { children: [_jsx("h2", { className: "mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dim", children: "Contato" }), _jsx("ul", { className: "grid gap-2.5 text-sm", children: social.map((s) => (_jsx("li", { children: _jsxs("a", { href: s.href, target: "_blank", rel: "noopener", "aria-label": s.label, className: "group flex gap-2 text-muted transition-colors hover:text-white", children: [_jsx("span", { className: "w-20 text-dim group-hover:text-muted", children: s.short }), _jsx("span", { className: "truncate", children: s.detail })] }) }, s.short))) })] })] }), _jsxs(Container, { className: "mt-12 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-xs text-dim sm:flex-row sm:justify-between", children: [_jsxs("p", { children: ["\u00A9 ", year, " ", site.name, ". Todos os direitos reservados."] }), _jsx("p", { children: site.signature })] })] }));
}
