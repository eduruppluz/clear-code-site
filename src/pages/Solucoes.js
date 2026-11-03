import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { themes } from '../config/themes';
import { Principles } from '../sections/principles/Principles';
import { ServicesGrid, StageStrip } from '../sections/services/ServicesGrid';
import { FinalCTA } from '../sections/shared/FinalCTA';
import { PageHero } from '../sections/shared/PageHero';
import { Themed } from '../theme/Themed';
export default function Solucoes() {
    return (_jsxs(_Fragment, { children: [_jsx(PageHero, { theme: themes.solucoes, eyebrow: "Solu\u00E7\u00F5es", title: _jsxs(_Fragment, { children: ["Seu cliente chega. Sua empresa est\u00E1 ", _jsx("span", { className: "text-gradient", children: "pronta para atender" }), "."] }), lead: "A Clear Code cuida do caminho completo do potencial cliente: atrair, captar e organizar. Voc\u00EA escolhe por onde come\u00E7ar.", children: _jsx("div", { className: "mt-14", children: _jsx(StageStrip, {}) }) }), _jsx(Themed, { theme: themes.solucoes, id: "servicos", label: "Servi\u00E7os", className: "relative pb-[var(--section-y)]", "aria-label": "Nossos servi\u00E7os", children: _jsxs(Container, { children: [_jsx(ServicesGrid, { detailed: true }), _jsxs(Reveal, { className: "glow-card relative mt-8 overflow-hidden px-6 py-8 text-center sm:py-10", "data-on": "true", children: [_jsx("div", { "aria-hidden": "true", className: "absolute inset-x-0 bottom-0 h-px", style: { background: 'linear-gradient(90deg, transparent, var(--accent-a), transparent)' } }), _jsxs("p", { className: "font-display text-xl font-semibold sm:text-2xl", children: [_jsx("span", { className: "text-gradient", children: "Atrair" }), " + ", _jsx("span", { className: "text-gradient", children: "captar" }), " + ", _jsx("span", { className: "text-gradient", children: "organizar" }), ", tudo num s\u00F3 lugar."] })] })] }) }), _jsx(Principles, {}), _jsx(FinalCTA, {})] }));
}
