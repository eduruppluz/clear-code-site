import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSections } from '../../theme/ThemeProvider';
/** Indicador lateral 01, 02, 03… (só desktop largo, só em páginas com 3+ seções). */
export function SectionIndicator() {
    const { labels, active } = useSections();
    if (labels.length < 3)
        return null;
    const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return (_jsx("nav", { "aria-label": "Se\u00E7\u00F5es desta p\u00E1gina", className: "fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block", children: _jsx("ol", { className: "flex flex-col gap-3", children: labels.map((s, i) => {
                const on = i === active;
                return (_jsx("li", { children: _jsxs("button", { type: "button", onClick: () => go(s.id), "aria-label": `${String(i + 1).padStart(2, '0')} — ${s.label}`, "aria-current": on ? 'location' : undefined, className: "group flex w-full items-center justify-end gap-3 py-0.5", children: [_jsx("span", { className: `text-[0.68rem] tracking-wider transition-all duration-500 ${on ? 'text-white' : 'translate-x-1 text-dim opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`, children: s.label }), _jsx("span", { className: "text-[0.68rem] tabular-nums transition-colors duration-500", style: { color: on ? 'var(--accent-a)' : 'var(--text-dim)' }, children: String(i + 1).padStart(2, '0') }), _jsx("span", { "aria-hidden": "true", className: "h-0.5 rounded-full transition-all duration-500 ease-[var(--ease-out)]", style: { width: on ? 28 : 10, background: on ? 'var(--accent-a)' : 'rgb(255 255 255 / 0.2)', boxShadow: on ? '0 0 10px var(--accent-a)' : 'none' } })] }) }, s.id));
            }) }) }));
}
