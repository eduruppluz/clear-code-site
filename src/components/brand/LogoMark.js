import { jsx as _jsx } from "react/jsx-runtime";
import { motion, useReducedMotion } from 'motion/react';
import simbolo from '../../assets/brand/simbolo-colorido.webp';
export function LogoMark({ className, intro = false, delay = 0, glow = true, title }) {
    const reduce = useReducedMotion();
    const animate = intro && !reduce;
    return (_jsx(motion.img, { src: simbolo, alt: title ?? '', "aria-hidden": title ? undefined : true, draggable: false, className: className, width: 760, height: 854, style: {
            filter: glow
                ? 'hue-rotate(var(--logo-hue, 0deg)) drop-shadow(0 0 calc(var(--glow) * 10px) color-mix(in oklab, var(--accent-a) 45%, transparent))'
                : 'hue-rotate(var(--logo-hue, 0deg))',
        }, ...(animate
            ? {
                initial: { opacity: 0, scale: 0.85, y: 8 },
                animate: { opacity: 1, scale: 1, y: 0 },
                transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
            }
            : {}) }));
}
