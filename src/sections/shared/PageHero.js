import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../../components/ui/Container';
import { Themed } from '../../theme/Themed';
const ease = [0.22, 1, 0.36, 1];
/** Abertura das páginas internas: eyebrow, título grande, linha de luz. */
export function PageHero({ theme, eyebrow, title, lead, children }) {
    const reduce = useReducedMotion();
    const enter = (d) => (reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease } });
    return (_jsx(Themed, { theme: theme, className: "relative pb-16 pt-36 sm:pt-44 lg:pb-24", "aria-labelledby": "page-title", children: _jsxs(Container, { children: [_jsx(motion.p, { className: "eyebrow mb-6", ...enter(0.05), children: eyebrow }), _jsx(motion.h1, { id: "page-title", className: "max-w-5xl font-display text-[clamp(2.5rem,7.5vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]", ...enter(0.12), children: title }), lead && (_jsx(motion.div, { className: "mt-7 max-w-2xl text-[clamp(1.02rem,1.6vw,1.2rem)] leading-relaxed text-muted", ...enter(0.22), children: lead })), _jsx(motion.span, { "aria-hidden": "true", className: "mt-10 block h-0.5 w-40 origin-left rounded-full", style: { background: 'linear-gradient(90deg, var(--accent-a), transparent)', boxShadow: '0 0 14px var(--accent-a)' }, initial: reduce ? false : { scaleX: 0 }, animate: { scaleX: 1 }, transition: { duration: 0.9, delay: 0.35, ease } }), children] }) }));
}
