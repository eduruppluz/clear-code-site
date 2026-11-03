import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from '../components/ui/Container';
import { Reveal, SectionHeading } from '../components/ui/Reveal';
import { themes } from '../config/themes';
import { DNA } from '../sections/dna/DNA';
import { FinalCTA } from '../sections/shared/FinalCTA';
import { PageHero } from '../sections/shared/PageHero';
import { Pillars } from '../sections/shared/Pillars';
import { Themed } from '../theme/Themed';
export default function Sobre() {
    return (_jsxs(_Fragment, { children: [_jsx(PageHero, { theme: themes.sobre, eyebrow: "Sobre a Clear Code ERL", title: _jsxs(_Fragment, { children: ["Ideias que conectam.", _jsx("br", {}), _jsx("span", { className: "text-gradient", children: "Tecnologia que transforma." })] }), lead: "Na Clear Code ERL, entendemos o seu neg\u00F3cio antes de escrever qualquer linha de c\u00F3digo. Transformamos desafios reais em solu\u00E7\u00F5es digitais que geram valor de forma clara e eficiente." }), _jsx(Themed, { theme: themes.sobre, id: "proposito", label: "Prop\u00F3sito", className: "relative pb-[var(--section-y)]", "aria-labelledby": "proposito-title", children: _jsxs(Container, { children: [_jsx(Reveal, { children: _jsxs("blockquote", { className: "relative border-l-2 py-2 pl-6 sm:pl-10", style: { borderColor: 'var(--accent-a)' }, children: [_jsxs("p", { id: "proposito-title", className: "max-w-4xl font-display text-[clamp(1.5rem,3.6vw,2.6rem)] font-bold leading-snug", children: ["Transformar necessidades de neg\u00F3cio em ", _jsx("span", { className: "text-gradient", children: "solu\u00E7\u00F5es digitais claras, funcionais e eficientes." })] }), _jsx("footer", { className: "mt-4 text-sm uppercase tracking-[0.2em] text-dim", children: "Nosso prop\u00F3sito" })] }) }), _jsxs("div", { className: "mt-20", children: [_jsx(SectionHeading, { eyebrow: "Nossos pilares", title: _jsxs(_Fragment, { children: ["Tr\u00EAs palavras guiam ", _jsx("span", { className: "text-gradient", children: "cada projeto" }), "."] }) }), _jsx("div", { className: "mt-12", children: _jsx(Pillars, {}) })] })] }) }), _jsx(DNA, {}), _jsx(FinalCTA, {})] }));
}
