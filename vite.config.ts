import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run dev`            → servidor local com recarregamento automático (desenvolvimento)
// `npm run build`          → dist/          multi-arquivo para publicar na Hostinger (URLs limpas)
// `npm run build:static`   → site-estatico/ multi-arquivo que abre com duplo clique ou Live Server
// `npm run build:preview`  → dist-preview/index.html  arquivo único (tudo embutido)
export default defineConfig(({ mode }) => {
  const single = mode === 'preview'
  const local = mode === 'preview' || mode === 'static'
  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(single ? [viteSingleFile()] : []),
      // no file:// o navegador bloqueia <script type="module">; a versão estática usa script comum
      ...(mode === 'static'
        ? [{
            name: 'classic-script',
            enforce: 'post' as const,
            transformIndexHtml: (html: string) =>
              html
                .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, '')
                .replace(/ crossorigin/g, '')
                .replace('</body>', '  <script src="./assets/script.js"></script>\n  </body>'),
          }]
        : []),
    ],
    base: local ? './' : '/',
    server: { open: true },
    // versão estática: caminhos de imagem relativos simples (sem import.meta, que não existe em script comum)
    experimental:
      mode === 'static'
        ? {
            renderBuiltUrl: (file: string, { hostType }: { hostType: string }) =>
              hostType === 'css' ? './' + file.replace(/^assets\//, '') : './' + file,
          }
        : undefined,
    build: {
      outDir: single ? 'dist-preview' : mode === 'static' ? 'site-estatico' : 'dist',
      emptyOutDir: true,
      assetsInlineLimit: single ? 100_000_000 : 4096,
      cssCodeSplit: !single && mode !== 'static',
      // versão estática: script clássico (abre até com duplo clique) e nomes simples
      rollupOptions: mode === 'static'
        ? { output: { format: 'iife', entryFileNames: 'assets/script.js', assetFileNames: (a) => (a.names?.[0]?.endsWith('.css') ? 'assets/style.css' : 'assets/[name][extname]') } }
        : undefined,
    },
  }
})
