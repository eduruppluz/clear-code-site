import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useReducedMotion } from 'motion/react';
import { BrowserRouter, HashRouter, MemoryRouter, Outlet, Route, Routes, useLocation } from 'react-router';
import { Background } from './components/layout/Background';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { RouteEffects } from './components/layout/RouteEffects';
import { SectionIndicator } from './components/layout/SectionIndicator';
import Contato from './pages/Contato';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Projetos from './pages/Projetos';
import Sobre from './pages/Sobre';
import Solucoes from './pages/Solucoes';
import { ThemeProvider } from './theme/ThemeProvider';
// Publicado na Hostinger → URLs limpas (/projetos) com o .htaccess de public/.
// Versão estática / preview com duplo clique ou Live Server → HashRouter (#/projetos).
// Preview embutido sem endereço real (about:srcdoc, iframes) → MemoryRouter.
function pickRouter() {
    if (import.meta.env.MODE !== 'preview' && import.meta.env.MODE !== 'static')
        return BrowserRouter;
    try {
        new URL('/', window.location.href);
        return window.location.protocol === 'about:' ? MemoryRouter : HashRouter;
    }
    catch {
        return MemoryRouter;
    }
}
const Router = pickRouter();
function Layout() {
    const { pathname } = useLocation();
    const reduce = useReducedMotion();
    return (_jsxs(ThemeProvider, { children: [_jsx("a", { href: "#conteudo", className: "skip-link", children: "Pular para o conte\u00FAdo" }), _jsx(RouteEffects, {}), _jsx(Background, {}), _jsx(Header, {}), _jsx(SectionIndicator, {}), _jsx(motion.main, { id: "conteudo", initial: reduce ? false : { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }, children: _jsx(Outlet, {}) }, pathname), _jsx(Footer, {})] }));
}
export default function App() {
    return (_jsx(Router, { children: _jsx(Routes, { children: _jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "solucoes", element: _jsx(Solucoes, {}) }), _jsx(Route, { path: "projetos", element: _jsx(Projetos, {}) }), _jsx(Route, { path: "sobre", element: _jsx(Sobre, {}) }), _jsx(Route, { path: "contato", element: _jsx(Contato, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }) }));
}
