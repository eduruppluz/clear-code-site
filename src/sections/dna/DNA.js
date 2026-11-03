import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { LogoMark } from '../../components/brand/LogoMark';
import { Container } from '../../components/ui/Container';
import { Reveal } from '../../components/ui/Reveal';
import { dnaFlow, dnaName } from '../../config/content';
import { themes } from '../../config/themes';
import { Themed } from '../../theme/Themed';
import { useIsDesktop } from '../../hooks/useMediaQuery';
const ease = [0.22, 1, 0.36, 1];
// pontos (0..1) em que cada etapa acende; a lâmpada acende no meio
const AT = [0.08, 0.3, 0.7, 0.92];
const LAMP_AT = 0.5;
function FlowItem({ item, lit, i }) {
    return (_jsxs(motion.div, { className: "glow-card relative p-5", "data-on": lit, style: { ['--c']: item.color }, animate: { opacity: lit ? 1 : 0.35, y: lit ? 0 : 10 }, transition: { duration: 0.5, ease }, children: [_jsxs("span", { className: "text-[0.65rem] font-semibold tabular-nums text-white/35", children: ["0", i + 1] }), _jsx("h3", { className: "mt-1 font-display text-lg font-extrabold uppercase tracking-[0.06em]", style: { color: `color-mix(in oklab, ${item.color} 80%, white)` }, children: item.title }), _jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted", children: item.text })] }));
}
/**
 * Nosso DNA — o fluxo IDEIA → ESTRATÉGIA → [lâmpada] → TECNOLOGIA → RESULTADO.
 * Uma linha de luz é desenhada pelo scroll e literalmente atravessa a lâmpada:
 * quando chega nela, a lâmpada acende e o </> aparece.
 */
export function DNA() {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const [p, setP] = useState(reduce ? 1 : 0);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
    useMotionValueEvent(scrollYProgress, 'change', (v) => !reduce && setP(Math.round(v * 100) / 100));
    const lampOn = p >= LAMP_AT;
    const line = reduce ? 1 : p;
    const desktop = useIsDesktop();
    return (_jsxs("section", { id: "dna", "data-label": "DNA", className: "relative py-[var(--section-y)]", "aria-labelledby": "dna-title", children: [_jsx(Themed, { as: "div", theme: themes.dna1, children: _jsx(Container, { children: _jsxs(Reveal, { children: [_jsx("p", { className: "eyebrow mb-5", children: "Nosso DNA" }), _jsxs("h2", { id: "dna-title", className: "font-display text-[clamp(2.2rem,6vw,4.25rem)] font-extrabold leading-[1.02]", children: ["Uma ideia clara.", _jsx("br", {}), "Uma solu\u00E7\u00E3o ", _jsx("span", { className: "text-gradient", children: "bem constru\u00EDda" }), "."] })] }) }) }), _jsx(Themed, { as: "div", theme: themes.dna2, children: _jsx(Container, { children: _jsxs("div", { ref: ref, className: "relative mt-16 grid items-center gap-4 lg:mt-24 lg:grid-cols-[1fr_1fr_1.1fr_1fr_1fr] lg:gap-5", children: [_jsx("span", { "aria-hidden": "true", className: "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.07] lg:left-0 lg:top-1/2 lg:h-px lg:w-full lg:translate-x-0" }), _jsx("span", { "aria-hidden": "true", className: "absolute left-1/2 top-0 h-full w-[2px] origin-top -translate-x-1/2 lg:left-0 lg:top-1/2 lg:h-[2px] lg:w-full lg:origin-left lg:translate-x-0", style: {
                                    background: `linear-gradient(${desktop ? 'to right' : 'to bottom'}, ${dnaFlow.map((d) => d.color).join(', ')})`,
                                    transform: desktop ? `scaleX(${line})` : `scaleY(${line})`,
                                    boxShadow: '0 0 14px var(--accent-a)',
                                } }), _jsx("div", { className: "relative z-10", children: _jsx(FlowItem, { item: dnaFlow[0], i: 0, lit: p >= AT[0] }) }), _jsx("div", { className: "relative z-10", children: _jsx(FlowItem, { item: dnaFlow[1], i: 1, lit: p >= AT[1] }) }), _jsxs("div", { className: "relative z-10 flex justify-center py-6 lg:py-0", children: [_jsx("div", { "aria-hidden": "true", className: "absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-700", style: { background: 'color-mix(in oklab, var(--accent-a) 45%, transparent)', opacity: lampOn ? 1 : 0.15 } }), _jsx(motion.div, { className: "relative w-36 sm:w-44", animate: { opacity: lampOn ? 1 : 0.3, scale: lampOn ? 1 : 0.92 }, transition: { duration: 0.6, ease }, children: _jsx(LogoMark, { weight: 0.8, className: "w-full", title: "L\u00E2mpada da Clear Code: a ideia virando c\u00F3digo" }) })] }), _jsx("div", { className: "relative z-10", children: _jsx(FlowItem, { item: dnaFlow[2], i: 2, lit: p >= AT[2] }) }), _jsx("div", { className: "relative z-10", children: _jsx(FlowItem, { item: dnaFlow[3], i: 3, lit: p >= AT[3] }) })] }) }) }), _jsx(Themed, { as: "div", theme: themes.dna3, children: _jsxs(Container, { className: "mt-16 lg:mt-24", children: [_jsx(Reveal, { className: "glow-card grid overflow-hidden md:grid-cols-3", "data-on": "true", children: dnaName.map((n, i) => (_jsxs("div", { className: `flex items-center gap-5 p-7 sm:p-8 ${i > 0 ? 'border-t border-white/[0.07] md:border-l md:border-t-0' : ''}`, children: [_jsx("span", { className: "font-display text-3xl font-extrabold sm:text-4xl", style: { color: `color-mix(in oklab, ${n.color} 85%, white)` }, children: n.word }), _jsx("p", { className: "text-sm leading-relaxed text-muted", children: n.text })] }, n.word))) }), _jsxs("p", { className: "mt-8 text-center text-sm tracking-[0.2em] text-dim", children: ["Da ideia ao ", _jsx("span", { style: { color: 'var(--accent-a)' }, children: "c\u00F3digo." })] })] }) })] }));
}
