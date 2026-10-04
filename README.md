# Clear Code ERL — site institucional

React + TypeScript + Vite + Tailwind CSS v4 + Motion (Framer Motion).

## ⚠️ Não abra o `index.html` da raiz direto no navegador

Ele é só o molde. O site está em React/TypeScript e precisa do Vite para funcionar — abrir esse arquivo direto dá **tela preta**.

## Abrir no VS Code (Windows) — primeira vez

1. Instale o **Node.js LTS**: https://nodejs.org (próximo, próximo, concluir). Feche e abra o VS Code depois.
2. No VS Code: **File → Open Folder…** e escolha a pasta `clearcode` (a pasta, não o arquivo).
3. Abra o terminal: **Terminal → New Terminal** (ou `Ctrl + '`).
4. Rode uma vez: `npm install` → cria a pasta `node_modules` e some o erro do `tsconfig.json`.
5. Rode: `npm run dev` → o navegador abre em **http://localhost:5173** com o site funcionando.
   Toda alteração que você salvar aparece na hora. Para parar: `Ctrl + C` no terminal.

Atalho: dê **duplo clique em `INICIAR-SITE.bat`** — ele instala o que faltar e abre o site sozinho.

> Se o PowerShell disser que "a execução de scripts foi desabilitada", rode uma vez:
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` e confirme com `S`.
> Ou troque o terminal para **Command Prompt** (seta ao lado do `+` no terminal).

## Comandos

```bash
npm run dev            # desenvolvimento: http://localhost:5173 (recarrega ao salvar)
npm run build          # dist/          → pasta para publicar na Hostinger (URLs limpas: /projetos)
npm run build:static   # site-estatico/ → index.html + assets/style.css + assets/script.js
                       #                  abre com duplo clique ou "Go Live" (Live Server)
npm run build:preview  # dist-preview/index.html → arquivo único com tudo embutido
```

**Live Server ("Go Live")**: funciona com a pasta `site-estatico/` (já configurado em `.vscode/settings.json`).
Rode `npm run build:static` antes e clique em **Go Live**. Para editar o código, prefira `npm run dev`.

## Onde mexer

| O quê | Arquivo |
|---|---|
| Contatos, WhatsApp, domínio | `src/config/site.ts` |
| Páginas e menu | `src/App.tsx`, `src/config/routes.ts` |
| Cores de cada página/etapa | `src/config/themes.ts` |
| Textos (serviços, etapas, princípios, DNA) | `src/config/content.ts` |
| **Adicionar projeto ao portfólio** | `src/config/projects.ts` (+ imagem em `src/assets/projects/`) |
| Tokens (cores, espaçamentos, easings) | `src/styles/tokens.css` |
| Logo viva (lâmpada SVG) | `src/components/brand/LogoMark.tsx` |
| Motor de cor por scroll | `src/theme/ThemeProvider.tsx` |
| SEO / Open Graph / Schema.org | `index.html`, `public/robots.txt`, `public/sitemap.xml` |

Os vetores oficiais da marca ficam em `brand-source/`.

## Publicar na Hostinger (ctbadigital.com)

1. `npm run build`
2. No hPanel → Gerenciador de Arquivos → `public_html/`: apague o conteúdo antigo do site parado.
3. Envie **o conteúdo** da pasta `dist/` (não a pasta em si), incluindo o arquivo oculto `.htaccess` — é ele que faz `/projetos`, `/sobre` etc. funcionarem.

## Pendências

- `og-image.jpg` (1200×630) em `public/`
- Prints da Valcar (desktop + mobile) para o portfólio
- Contatos definitivos da empresa (hoje são os do fundador)
