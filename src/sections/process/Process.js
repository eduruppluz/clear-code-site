import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/Reveal';
import { steps } from '../../config/content';
import { themes } from '../../config/themes';
import { Themed } from '../../theme/Themed';
import { StepIcon } from './StepIcon';
const ease = [0.22, 1, 0.36, 1];
const lineGradient = `linear-gradient(to bottom, ${steps.map((s, i) => `${s.color} ${(i / (steps.length - 1)) * 100}%`).join(', ')})`;
/**
 * Como trabalhamos — a jornada.
 *
 * Uma linha central é DESENHADA pelo scroll (scaleY ligado ao progresso).
 * A ponta da linha fica fixa a ~55% da altura da tela; quando ela alcança
 * um nó, aquela etapa acende (nó cresce, card acende na cor da etapa) e a
 * anterior perde intensidade. Cada etapa é um bloco <Themed>, então a cor
 * do site inteiro — incluindo a lâmpada da logo — muda junto.
 *
 * Desktop: cards alternam esquerda/direita. Mobile: linha à esquerda.
 */
export function Process() {
    const reduce = useReducedMotion();
    const listRef = useRef(null);
    const nodeRefs = useRef([]);
    const marks = useRef([]);
    const [current, setCurrent] = useState(reduce ? steps.length - 1 : -1);
    const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 55%', 'end 55%'] });
    const tipTop = useTransform(scrollYProgress, (v) => `${v * 100}%`);
    // posição (0..1) de cada nó ao longo da lista
    useLayoutEffect(() => {
        const measure = () => {
            const list = listRef.current;
            if (!list)
                return;
            const h = list.offsetHeight || 1;
            const top = list.getBoundingClientRect().top;
            marks.current = nodeRefs.current.map((n) => {
                if (!n)
                    return 1;
                const r = n.getBoundingClientRect();
                return (r.top + r.height / 2 - top) / h;
            });
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (listRef.current)
            ro.observe(listRef.current);
        return () => ro.disconnect();
    }, []);
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (reduce)
            return;
        let c = -1;
        marks.current.forEach((m, i) => v >= m - 0.005 && (c = i));
        setCurrent((prev) => (prev === c ? prev : c));
    });
    return (_jsxs("section", { id: "processo", "data-label": "Processo", "aria-labelledby": "processo-title", className: "relative py-[var(--section-y)]", children: [_jsx(Themed, { as: "div", theme: themes.step1, children: _jsxs(Container, { className: "grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end", children: [_jsx(SectionHeading, { id: "processo-title", eyebrow: "Como trabalhamos", title: _jsxs(_Fragment, { children: ["Da necessidade", _jsx("br", {}), "\u00E0 ", _jsx("span", { className: "text-gradient", children: "solu\u00E7\u00E3o" }), "."] }) }), _jsxs("p", { className: "max-w-sm border-l pl-5 text-lg leading-relaxed text-muted lg:mb-2", style: { borderColor: 'color-mix(in oklab, var(--accent-a) 60%, transparent)' }, children: ["Antes de criar, ", _jsx("span", { className: "text-white", children: "entendemos" }), ".", _jsx("br", {}), "Antes de executar, ", _jsx("span", { className: "text-white", children: "planejamos" }), "."] })] }) }), _jsx(Container, { className: "mt-16 lg:mt-24", children: _jsxs("ol", { ref: listRef, className: "relative", children: [_jsx("span", { "aria-hidden": "true", className: "absolute bottom-0 left-[1.4rem] top-0 w-px -translate-x-1/2 bg-white/[0.08] lg:left-1/2" }), _jsx(motion.span, { "aria-hidden": "true", className: "absolute bottom-0 left-[1.4rem] top-0 w-[2px] origin-top -translate-x-1/2 lg:left-1/2", style: { scaleY: reduce ? 1 : scrollYProgress, background: lineGradient, boxShadow: '0 0 14px var(--accent-a)' } }), !reduce && (_jsx(motion.span, { "aria-hidden": "true", className: "absolute left-[1.4rem] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white lg:left-1/2", style: { top: tipTop, boxShadow: '0 0 0 4px color-mix(in oklab, var(--accent-a) 35%, transparent), 0 0 24px 4px var(--accent-a)' } })), steps.map((s, i) => {
                            const state = i < current ? 'past' : i === current ? 'current' : 'future';
                            const right = i % 2 === 1;
                            return (_jsxs(Themed, { as: "li", theme: themes[s.themeKey], className: "relative grid grid-cols-[2.8rem_1fr] items-center gap-x-4 py-6 lg:min-h-[44vh] lg:grid-cols-[1fr_6rem_1fr] lg:gap-x-0 lg:py-0", children: [_jsx("span", { className: "relative z-10 col-start-1 row-start-1 flex justify-center lg:col-start-2", children: _jsx(motion.span, { ref: (el) => { nodeRefs.current[i] = el; }, className: "grid size-11 place-items-center rounded-full border font-display text-sm font-bold tabular-nums lg:size-14 lg:text-base", animate: {
                                                scale: state === 'current' ? 1.12 : 1,
                                                backgroundColor: state === 'future' ? 'rgba(6,18,31,1)' : s.color,
                                                borderColor: state === 'future' ? 'rgba(255,255,255,0.14)' : s.color,
                                                color: state === 'future' ? 'rgba(167,179,196,1)' : 'rgba(2,11,22,1)',
                                                boxShadow: state === 'current' ? `0 0 0 6px ${s.color}33, 0 0 36px 6px ${s.color}AA` : state === 'past' ? `0 0 16px 0 ${s.color}55` : '0 0 0 0 rgba(0,0,0,0)',
                                            }, transition: { duration: 0.45, ease }, children: s.n }) }), _jsx(motion.span, { "aria-hidden": "true", className: `absolute top-1/2 hidden h-px w-5 lg:block ${right ? 'left-[calc(50%+1.75rem)] origin-left' : 'right-[calc(50%+1.75rem)] origin-right'}`, style: { background: s.color }, animate: { scaleX: state === 'future' ? 0 : 1, opacity: state === 'future' ? 0 : 1 }, transition: { duration: 0.4, ease } }), _jsxs(motion.article, { className: `glow-card col-start-2 row-start-1 overflow-hidden p-6 sm:p-7 lg:max-w-[30rem] ${right ? 'lg:col-start-3 lg:ml-0' : 'lg:col-start-1 lg:ml-auto'}`, "data-on": state === 'current', style: { ['--c']: s.color }, animate: {
                                            opacity: state === 'future' ? 0.32 : state === 'past' ? 0.72 : 1,
                                            y: state === 'future' ? 18 : 0,
                                            x: state === 'future' ? (right ? 16 : -16) : 0,
                                        }, transition: { duration: 0.55, ease }, children: [_jsx("span", { "aria-hidden": "true", className: "pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-extrabold leading-none text-white/[0.035]", children: s.n }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "grid size-12 shrink-0 place-items-center rounded-xl border bg-white/[0.03]", style: { borderColor: `${s.color}55`, color: s.color }, children: _jsx(StepIcon, { name: s.icon, on: state === 'current' }) }), _jsxs("div", { children: [_jsx("p", { className: "text-[0.7rem] font-semibold uppercase tracking-[0.22em]", style: { color: s.color }, children: s.kicker }), _jsx("h3", { className: "font-display text-2xl font-bold", children: s.title })] })] }), _jsx("p", { className: "mt-5 leading-relaxed text-muted", children: s.text })] })] }, s.n));
                        })] }) })] }));
}
