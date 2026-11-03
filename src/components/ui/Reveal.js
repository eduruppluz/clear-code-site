import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'motion/react';
export const ease = [0.22, 1, 0.36, 1];
/** Aparece ao entrar na tela (uma vez). Só transform/opacity. */
export function Reveal({ children, delay = 0, y = 24, className, ...rest }) {
    return (_jsx(motion.div, { initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px -12% 0px' }, transition: { duration: 0.6, delay, ease }, className: className, ...rest, children: children }));
}
/** Eyebrow + título + texto de apoio, padrão de todas as seções */
export function SectionHeading({ eyebrow, title, lead, id, align = 'left', as: H = 'h2', className = '', }) {
    const center = align === 'center';
    return (_jsxs(Reveal, { className: `${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`, children: [eyebrow && _jsx("p", { className: `eyebrow mb-5 ${center ? 'justify-center' : ''}`, children: eyebrow }), _jsx(H, { id: id, className: `font-display font-extrabold leading-[1.04] ${H === 'h1' ? 'text-[clamp(2.4rem,7vw,4.5rem)]' : 'text-[clamp(2rem,5vw,3.4rem)]'}`, children: title }), lead && _jsx("div", { className: `mt-6 max-w-2xl text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-muted ${center ? 'mx-auto' : ''}`, children: lead })] }));
}
