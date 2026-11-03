import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router';
import { services, stages } from '../../config/content';
import { useFinePointer } from '../../hooks/useMediaQuery';
import { ServiceVisual } from './ServiceVisual';
const ease = [0.22, 1, 0.36, 1];
/** Card de serviço: mini-interface + título. Tilt leve com mouse; no toque, acende ao passar pelo centro da tela. */
function ServiceCard({ s, i, detailed }) {
    const ref = useRef(null);
    const fine = useFinePointer();
    const centered = useInView(ref, { margin: '-40% 0px -40% 0px' });
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const onMove = (e) => {
        if (!fine || !ref.current)
            return;
        const r = ref.current.getBoundingClientRect();
        setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -4, y: ((e.clientX - r.left) / r.width - 0.5) * 5 });
    };
    const body = (_jsxs(_Fragment, { children: [_jsxs("span", { className: "mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em]", style: { color: 'color-mix(in oklab, var(--c) 85%, white)' }, children: [_jsx("span", { className: "size-1.5 rounded-full", style: { background: 'var(--c)' } }), s.stage] }), _jsx(ServiceVisual, { id: s.id }), _jsxs("div", { className: "mt-6 flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-display text-xl font-bold sm:text-2xl", children: s.title }), _jsx("p", { className: "mt-1 text-sm font-medium", style: { color: 'color-mix(in oklab, var(--c) 80%, white)' }, children: s.short })] }), !detailed && (_jsx("span", { "aria-hidden": "true", className: "mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-[color:var(--c)] group-hover:bg-[color:var(--c)] group-hover:text-[#021024]", children: _jsx("svg", { viewBox: "0 0 20 20", className: "size-4 transition-transform duration-300 group-hover:-rotate-45", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: _jsx("path", { d: "M4 10h12M11 5l5 5-5 5" }) }) }))] }), detailed && _jsx("p", { className: "mt-4 leading-relaxed text-muted", children: s.text })] }));
    return (_jsx(motion.article, { ref: ref, initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px -10% 0px' }, transition: { duration: 0.6, delay: (i % 3) * 0.08, ease }, children: _jsx("div", { onPointerMove: onMove, onPointerLeave: () => setTilt({ x: 0, y: 0 }), "data-on": !fine && centered, className: "glow-card is-interactive group relative h-full p-5 sm:p-6", style: { ['--c']: s.color, transform: fine && (tilt.x || tilt.y) ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)` : undefined }, children: detailed ? (body) : (_jsx(Link, { to: "/solucoes", className: "block rounded-xl after:absolute after:inset-0", "aria-label": `${s.title} — ${s.short}. Ver soluções`, children: body })) }) }));
}
export function ServicesGrid({ detailed = false }) {
    return (_jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5", children: services.map((s, i) => (_jsx(ServiceCard, { s: s, i: i, detailed: detailed }, s.id))) }));
}
/** As 3 etapas: Atrair → Captar → Organizar, ligadas por uma linha */
export function StageStrip() {
    return (_jsxs("ol", { className: "relative grid gap-3 md:grid-cols-3 md:gap-5", children: [_jsx("span", { "aria-hidden": "true", className: "absolute left-[16%] right-[16%] top-[1.35rem] hidden h-px md:block", style: { background: `linear-gradient(90deg, ${stages.map((st) => st.color).join(', ')})`, opacity: 0.6 } }), stages.map((st, i) => (_jsxs(motion.li, { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px -10% 0px' }, transition: { duration: 0.55, delay: i * 0.1, ease }, className: "relative flex gap-4 md:flex-col md:items-center md:text-center", children: [_jsxs("span", { className: "relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-2 bg-[#021024] font-display text-sm font-bold", style: { borderColor: st.color, color: st.color, boxShadow: `0 0 22px -4px ${st.color}` }, children: ["0", i + 1] }), _jsxs("div", { children: [_jsx("h3", { className: "font-display text-xl font-extrabold", children: st.name }), _jsx("p", { className: "mt-1 max-w-xs text-sm leading-relaxed text-muted", children: st.text })] })] }, st.name)))] }));
}
