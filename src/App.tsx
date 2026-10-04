import { motion, useReducedMotion } from 'motion/react'
import { BrowserRouter, HashRouter, MemoryRouter, Outlet, Route, Routes, useLocation } from 'react-router'
import { Background } from './components/layout/Background'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { RouteEffects } from './components/layout/RouteEffects'
import { SectionIndicator } from './components/layout/SectionIndicator'
import Contato from './pages/Contato'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Projetos from './pages/Projetos'
import Sobre from './pages/Sobre'
import Solucoes from './pages/Solucoes'
import { ThemeProvider } from './theme/ThemeProvider'

// Publicado na Hostinger → URLs limpas (/projetos) com o .htaccess de public/.
// Versão estática / preview com duplo clique ou Live Server → HashRouter (#/projetos).
// Preview embutido sem endereço real (about:srcdoc, iframes) → MemoryRouter.
function pickRouter() {
  if (import.meta.env.MODE !== 'preview' && import.meta.env.MODE !== 'static') return BrowserRouter
  try {
    new URL('/', window.location.href)
    return window.location.protocol === 'about:' ? MemoryRouter : HashRouter
  } catch {
    return MemoryRouter
  }
}
const Router = pickRouter()

function Layout() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  return (
    <ThemeProvider>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <RouteEffects />
      <Background />
      <Header />
      <SectionIndicator />
      <motion.main
        key={pathname}
        id="conteudo"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="solucoes" element={<Solucoes />} />
          <Route path="projetos" element={<Projetos />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="contato" element={<Contato />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}
