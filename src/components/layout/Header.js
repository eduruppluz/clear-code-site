import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useLocation } from 'react-router';
import { nav } from '../../config/routes';
import { useSections } from '../../theme/ThemeProvider';
import { Logo } from '../brand/Logo';
import { Button } from '../ui/Button';
function useIsActive() {
    const { pathname } = useLocation();
    const { labels, active } = useSections();
    const sectionId = labels[active]?.id;
    return (item) => {
        if (item.to !== pathname)
            return false;
        if (pathname === '/')
            return item.hash ? sectionId === item.hash : sectionId !== 'processo';
        return true;
    };
}
const linkTo = (item) => ({ pathname: item.to });
const linkState = (item) => (item.hash ? { scrollTo: item.hash } : undefined);
export function Header() {
    const isActive = useIsActive();
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const on = () => setScrolled(window.scrollY > 24);
        on();
        window.addEventListener('scroll', on, { passive: true });
        return () => window.removeEventListener('scroll', on);
    }, []);
    useEffect(() => setOpen(false), [pathname]);
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        if (!open)
            return;
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);
    return (_jsxs("header", { className: "fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5", children: [_jsxs("div", { className: `relative z-10 mx-auto flex h-[var(--header-h)] max-w-[calc(var(--container)+2rem)] items-center justify-between gap-4 rounded-2xl px-4 transition-[background-color,border-color,box-shadow,height] duration-500 ease-[var(--ease-out)] sm:px-6 ${scrolled || open
                    ? '!h-16 border border-white/[0.07] bg-[#021024]/75 shadow-[0_12px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl'
                    : 'border border-transparent'}`, children: [_jsx(Link, { to: "/", "aria-label": "Clear Code ERL \u2014 p\u00E1gina inicial", className: "relative z-10 rounded-lg", children: _jsx(Logo, { intro: true }) }), _jsx("nav", { "aria-label": "Principal", className: "hidden lg:block", children: _jsx("ul", { className: "flex items-center gap-1", children: nav.map((item) => {
                                const on = isActive(item);
                                return (_jsx("li", { children: _jsxs(Link, { to: linkTo(item), state: linkState(item), "aria-current": on ? 'page' : undefined, className: "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300", style: { color: on ? 'color-mix(in oklab, var(--accent-a) 80%, white)' : undefined }, children: [_jsx("span", { className: on ? '' : 'text-muted transition-colors hover:text-white', children: item.label }), _jsx("span", { "aria-hidden": "true", className: "absolute inset-x-4 -bottom-0.5 h-0.5 origin-center rounded-full transition-transform duration-500 ease-[var(--ease-out)]", style: { background: 'var(--accent-a)', transform: `scaleX(${on ? 1 : 0})`, boxShadow: '0 0 12px var(--accent-a)' } })] }) }, item.label));
                            }) }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "hidden sm:block", children: _jsx(Button, { to: "/contato", size: "sm", children: "Vamos conversar" }) }), _jsx("button", { type: "button", onClick: () => setOpen((v) => !v), "aria-expanded": open, "aria-controls": "mobile-menu", "aria-label": open ? 'Fechar menu' : 'Abrir menu', className: "relative z-10 grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] lg:hidden", children: _jsxs("span", { className: "relative block h-3 w-5", children: [_jsx("span", { className: `absolute left-0 top-0 h-px w-5 bg-white transition-transform duration-300 ${open ? 'translate-y-1.5 rotate-45' : ''}` }), _jsx("span", { className: `absolute bottom-0 left-0 h-px w-5 bg-white transition-transform duration-300 ${open ? '-translate-y-1.5 -rotate-45' : ''}` })] }) })] })] }), _jsx(AnimatePresence, { children: open && (_jsxs(motion.div, { id: "mobile-menu", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25 }, className: "fixed inset-0 z-0 flex flex-col bg-[#021024]/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden", children: [_jsx("nav", { "aria-label": "Menu m\u00F3vel", className: "flex-1", children: _jsx("ul", { className: "flex flex-col gap-1", children: [...nav, { label: 'Contato', to: '/contato' }].map((item, i) => (_jsx(motion.li, { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }, children: _jsxs(Link, { to: linkTo(item), state: linkState(item), onClick: () => setOpen(false), className: "flex items-baseline gap-4 border-b border-white/[0.06] py-4 font-display text-3xl font-semibold", children: [_jsxs("span", { className: "font-sans text-xs tabular-nums text-dim", children: ["0", i + 1] }), _jsx("span", { className: isActive(item) ? 'text-gradient' : '', children: item.label })] }) }, item.label))) }) }), _jsx(Button, { to: "/contato", arrow: true, onClick: () => setOpen(false), children: "Vamos conversar" })] })) })] }));
}
