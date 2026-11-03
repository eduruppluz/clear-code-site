import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/ui/Container';
import { HeroVisual } from './HeroVisual';
import { themes } from '../../config/themes';
import { Themed } from '../../theme/Themed';
import { useIsDesktop } from '../../hooks/useMediaQuery';
const ease = [0.22, 1, 0.36, 1];
/** Linha do título que "sobe" de dentro de uma máscara */
function Line({ children, delay }) {
    const reduce = useReducedMotion();
    return (_jsx("span", { className: "block overflow-hidden pb-[0.08em]", children: _jsx(motion.span, { className: "block", initial: reduce ? false : { y: '105%' }, animate: { y: 0 }, transition: { duration: 0.75, delay, ease }, children: children }) }));
}
export function Hero() {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const [sweep, setSweep] = useState(false);
    // saída suave ao rolar (só transform/opacity)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const visualY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '10%']);
    const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
    // No celular a lâmpada fica embaixo do texto: ela não pode apagar nem deslizar
    // enquanto a pessoa rola até ela. O efeito de saída fica só no computador.
    const desktop = useIsDesktop();
    // sequência: elementos (0) → lâmpada acende (0.2) → título (0.35) → gradiente (≈1.0) → CTAs (1.0)
    return (_jsxs(Themed, { theme: themes.hero, id: "inicio", "data-label": "In\u00EDcio", ref: ref, "aria-labelledby": "hero-title", className: "relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:pb-12 lg:pt-24", children: [_jsxs(Container, { className: "grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-6", children: [_jsxs(motion.div, { style: { y: contentY, opacity: fade }, className: "relative z-10", children: [_jsx(motion.p, { className: "eyebrow mb-6", initial: reduce ? false : { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1, ease }, children: "Tecnologia e solu\u00E7\u00F5es digitais" }), _jsxs("h1", { id: "hero-title", className: "font-display text-[clamp(2.5rem,10vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.035em]", children: [_jsx(Line, { delay: 0.35, children: "Tecnologia para" }), _jsx(Line, { delay: 0.45, children: _jsx("span", { className: `text-gradient ${sweep ? 'is-sweeping' : ''}`, children: "transformar" }) }), _jsx(Line, { delay: 0.55, children: "o seu neg\u00F3cio." })] }), _jsx(motion.span, { "aria-hidden": "true", className: "mt-7 block h-px w-full max-w-md origin-left", style: { background: 'linear-gradient(90deg, var(--cc-royal), var(--accent-b), var(--accent-a), transparent)' }, initial: reduce ? false : { scaleX: 0 }, animate: { scaleX: 1 }, transition: { duration: 0.9, delay: 0.85, ease }, onAnimationStart: () => setSweep(true) }), _jsx(motion.p, { className: "mt-7 max-w-xl text-[clamp(1.02rem,1.6vw,1.2rem)] leading-relaxed text-muted", initial: reduce ? false : { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.85, ease }, children: "Sites, an\u00FAncios e automa\u00E7\u00F5es para conectar seu neg\u00F3cio aos clientes e organizar oportunidades comerciais." }), _jsxs(motion.div, { className: "mt-9 flex flex-col gap-3 sm:flex-row sm:items-center", initial: reduce ? false : { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 1.0, ease }, children: [_jsx(Button, { to: "/solucoes", arrow: true, children: "Conhe\u00E7a nossas solu\u00E7\u00F5es" }), _jsx(Button, { to: "/projetos", variant: "ghost", children: "Ver projetos" })] }), _jsxs(motion.p, { className: "mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-dim", initial: reduce ? false : { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8, delay: 1.5 }, children: [_jsx("span", { className: "h-px w-8", style: { background: 'var(--grad-accent)' } }), "Da ideia ao c\u00F3digo."] })] }), _jsx(motion.div, { style: desktop ? { y: visualY, opacity: fade } : undefined, className: "relative -mx-4 sm:mx-0", children: _jsx(HeroVisual, {}) })] }), _jsxs(motion.a, { href: "#sobre-resumo", "aria-label": "Rolar para a pr\u00F3xima se\u00E7\u00E3o", className: "absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-dim md:flex", style: { opacity: fade }, children: ["Role para explorar", _jsx("span", { className: "relative h-10 w-px overflow-hidden bg-white/10", children: _jsx("span", { className: "absolute inset-x-0 top-0 h-1/2 motion-safe:animate-[scrollcue_1.8s_ease-in-out_infinite]", style: { background: 'linear-gradient(to bottom, transparent, var(--accent-a))' } }) }), _jsx("style", { children: `@keyframes scrollcue { from { transform: translateY(-100%) } to { transform: translateY(200%) } }` })] })] }));
}
