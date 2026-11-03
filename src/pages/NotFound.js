import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../components/ui/Button';
import { themes } from '../config/themes';
import { PageHero } from '../sections/shared/PageHero';
export default function NotFound() {
    return (_jsx(PageHero, { theme: themes.contato, eyebrow: "Erro 404", title: _jsxs(_Fragment, { children: ["Esta p\u00E1gina ", _jsx("span", { className: "text-gradient", children: "n\u00E3o existe" }), "."] }), lead: "O endere\u00E7o pode ter mudado. Volte para o in\u00EDcio e continue navegando.", children: _jsx("div", { className: "mt-10", children: _jsx(Button, { to: "/", arrow: true, children: "Voltar ao in\u00EDcio" }) }) }));
}
