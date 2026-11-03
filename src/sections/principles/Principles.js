import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Container } from '../../components/ui/Container';
import { Reveal } from '../../components/ui/Reveal';
import { principles } from '../../config/content';
import { themes } from '../../config/themes';
import { Themed } from '../../theme/Themed';
const ease = [0.22, 1, 0.36, 1];
/**
 * Tecnologia sem complicação — composição em "circuito":
 * um tronco vertical é desenhado pelo scroll e cada princípio
 * se conecta a ele por um ramo que acende ao entrar na tela.
 */
export function Principles() {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
    const trunk = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return (_jsx(Themed, { theme: themes.principios, id: "principios", "data-label": "Princ\u00EDpios", className: "relative py-[var(--section-y)]", "aria-labelledby": "principios-title", children: _jsxs(Container, { className: "grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20", children: [_jsxs(Reveal, { className: "lg:sticky lg:top-32 lg:self-start", children: [_jsx("p", { className: "eyebrow mb-5", children: "Nossos princ\u00EDpios" }), _jsxs("h2", { id: "principios-title", className: "font-display text-[clamp(2.2rem,6vw,4rem)] font-extrabold leading-[1]", children: ["Tecnologia", _jsx("br", {}), "sem ", _jsx("span", { className: "text-gradient", children: "complica\u00E7\u00E3o" }), "."] }), _jsx("p", { className: "mt-7 max-w-md text-lg leading-relaxed text-muted", children: "Acreditamos que tecnologia, estrat\u00E9gia e comunica\u00E7\u00E3o caminham juntas. Integramos esses pilares para criar solu\u00E7\u00F5es simples, eficientes e alinhadas aos objetivos do seu neg\u00F3cio." })] }), _jsxs("ul", { ref: ref, className: "relative grid gap-5 pl-10 sm:pl-14", children: [_jsx("span", { "aria-hidden": "true", className: "absolute bottom-8 left-3 top-8 w-px bg-white/[0.08] sm:left-5" }), _jsx(motion.span, { "aria-hidden": "true", className: "absolute bottom-8 left-3 top-8 w-[2px] origin-top -translate-x-[0.5px] sm:left-5", style: { scaleY: reduce ? 1 : trunk, background: `linear-gradient(to bottom, ${principles.map((p) => p.color).join(', ')})` } }), principles.map((p, i) => (_jsxs(motion.li, { initial: reduce ? false : 'off', whileInView: "on", viewport: { once: true, margin: '0px 0px -25% 0px' }, className: "relative", children: [_jsx(motion.span, { "aria-hidden": "true", className: "absolute -left-7 top-1/2 h-px w-7 origin-left sm:-left-9 sm:w-9", style: { background: p.color }, variants: { off: { scaleX: 0 }, on: { scaleX: 1, transition: { duration: 0.45, ease } } } }), _jsx(motion.span, { "aria-hidden": "true", className: "absolute -left-[1.95rem] top-1/2 size-2.5 -translate-y-1/2 rounded-full sm:-left-[2.45rem]", style: { background: p.color, boxShadow: `0 0 12px 2px ${p.color}` }, variants: { off: { scale: 0 }, on: { scale: 1, transition: { duration: 0.3, ease } } } }), _jsxs(motion.div, { className: "glow-card is-interactive group p-6 sm:p-7", style: { ['--c']: p.color }, "data-on": "true", variants: { off: { opacity: 0, x: 24 }, on: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.15, ease } } }, children: [_jsxs("div", { className: "flex items-baseline justify-between gap-4", children: [_jsx("h3", { className: "font-display text-xl font-bold sm:text-2xl", children: p.title }), _jsxs("span", { className: "font-display text-sm font-bold tabular-nums", style: { color: p.color }, children: ["0", i + 1] })] }), _jsx("p", { className: "mt-2 leading-relaxed text-muted", children: p.text })] })] }, p.title)))] })] }) }));
}
