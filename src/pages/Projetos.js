import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Reveal } from '../components/ui/Reveal';
import { LogoMark } from '../components/brand/LogoMark';
import { projects } from '../config/projects';
import { themes } from '../config/themes';
import { ProjectCase } from '../sections/projects/ProjectCase';
import { PageHero } from '../sections/shared/PageHero';
import { Themed } from '../theme/Themed';
export default function Projetos() {
    return (_jsxs(_Fragment, { children: [_jsx(PageHero, { theme: themes.projetos, eyebrow: "Projetos", title: _jsxs(_Fragment, { children: ["Projetos que transformam ideias em ", _jsx("span", { className: "text-gradient", children: "experi\u00EAncias digitais" }), "."] }), lead: "Cada projeto come\u00E7a entendendo o neg\u00F3cio. Aqui voc\u00EA v\u00EA o que constru\u00EDmos e como cada solu\u00E7\u00E3o foi pensada para o objetivo do cliente." }), _jsx(Themed, { theme: themes.projetos, id: "cases", className: "relative pb-[var(--section-y)]", "aria-label": "Projetos realizados", children: _jsxs(Container, { className: "grid gap-24 lg:gap-32", children: [projects.map((p, i) => (_jsx(ProjectCase, { project: p, index: i }, p.slug))), _jsx(Reveal, { children: _jsxs("div", { className: "glow-card is-interactive group relative flex flex-col items-start gap-8 overflow-hidden p-8 sm:flex-row sm:items-center sm:p-12", "data-on": "true", children: [_jsx("div", { "aria-hidden": "true", className: "absolute -right-16 -top-16 size-64 rounded-full blur-3xl", style: { background: 'color-mix(in oklab, var(--accent-a) 25%, transparent)' } }), _jsx(LogoMark, { className: "relative h-20 w-auto shrink-0" }), _jsxs("div", { className: "relative flex-1", children: [_jsxs("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-dim", children: [String(projects.length + 1).padStart(2, '0'), " \u2014 Pr\u00F3ximo projeto"] }), _jsxs("h2", { className: "mt-3 font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold leading-tight", children: ["Seu projeto pode ser o ", _jsx("span", { className: "text-gradient", children: "pr\u00F3ximo" }), "."] }), _jsx("p", { className: "mt-3 max-w-xl text-muted", children: "Conte sua ideia e vamos entender juntos o melhor caminho para coloc\u00E1-la no ar." })] }), _jsx(Button, { to: "/contato", arrow: true, className: "relative", children: "Vamos conversar" })] }) })] }) })] }));
}
