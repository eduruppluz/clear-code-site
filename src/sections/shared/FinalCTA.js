import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LogoMark } from '../../components/brand/LogoMark';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/ui/Container';
import { Reveal } from '../../components/ui/Reveal';
import { site } from '../../config/site';
import { themes } from '../../config/themes';
import { Themed } from '../../theme/Themed';
/** CTA final — repetido no fim de cada página */
export function FinalCTA({ withContactLink = true }) {
    return (_jsx(Themed, { theme: themes.cta, id: "cta", "data-label": "Contato", className: "relative py-[var(--section-y)]", "aria-labelledby": "cta-title", children: _jsx(Container, { children: _jsxs(Reveal, { className: "glow-card relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20", "data-on": "true", children: [_jsx("div", { "aria-hidden": "true", className: "absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2", style: { background: 'linear-gradient(90deg, transparent, var(--accent-a), transparent)' } }), _jsx("div", { "aria-hidden": "true", className: "absolute -top-32 left-1/2 size-80 -translate-x-1/2 rounded-full blur-3xl", style: { background: 'color-mix(in oklab, var(--accent-a) 30%, transparent)' } }), _jsx(LogoMark, { className: "relative mx-auto h-16 w-auto" }), _jsxs("h2", { id: "cta-title", className: "relative mx-auto mt-8 max-w-3xl font-display text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold leading-[1.05]", children: ["Tecnologia para transformar o ", _jsx("span", { className: "text-gradient", children: "seu neg\u00F3cio" }), "."] }), _jsx("p", { className: "relative mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted", children: "Tem uma ideia, uma necessidade ou um projeto em mente? Conte para a Clear Code ERL. Vamos entender o seu desafio e construir a solu\u00E7\u00E3o ideal para o seu neg\u00F3cio." }), _jsxs("div", { className: "relative mt-10 flex flex-col justify-center gap-3 sm:flex-row", children: [_jsx(Button, { href: site.contact.whatsappUrl, target: "_blank", rel: "noopener", arrow: true, children: "Vamos conversar" }), withContactLink && _jsx(Button, { to: "/contato", variant: "ghost", children: "Outros canais" })] })] }) }) }));
}
