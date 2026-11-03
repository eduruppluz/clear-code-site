import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from '../components/ui/Container';
import { themes } from '../config/themes';
import { ContactChannels, ContactForm } from '../sections/contact/Contact';
import { PageHero } from '../sections/shared/PageHero';
import { Themed } from '../theme/Themed';
export default function Contato() {
    return (_jsxs(_Fragment, { children: [_jsx(PageHero, { theme: themes.contato, eyebrow: "Contato", title: _jsxs(_Fragment, { children: ["Vamos ", _jsx("span", { className: "text-gradient", children: "conversar" }), "?"] }), lead: "Tem uma ideia, uma necessidade ou um projeto em mente? Conte para a Clear Code ERL. Vamos entender o seu desafio e construir a solu\u00E7\u00E3o ideal para o seu neg\u00F3cio." }), _jsx(Themed, { theme: themes.contato, id: "canais", className: "relative pb-[var(--section-y)]", "aria-label": "Canais de contato", children: _jsxs(Container, { className: "grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12", children: [_jsxs("div", { children: [_jsx("h2", { className: "mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-dim", children: "Fale direto com a gente" }), _jsx(ContactChannels, {})] }), _jsx(ContactForm, {})] }) })] }));
}
