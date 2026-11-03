# Clear Code ERL

**Ideias que conectam. Tecnologia que transforma.**

Site institucional da Clear Code ERL, empresa de tecnologia e soluções digitais.

🔗 **Site no ar:** [eduruppluz.github.io/clear-code-site](https://eduruppluz.github.io/clear-code-site/)

![Preview do site](preview.png)

## Sobre o projeto

Site para apresentar a Clear Code e seus serviços, organizados em três etapas do caminho do cliente:

- **Atrair** — sites, landing pages e Meta Ads
- **Captar** — formulários, WhatsApp e páginas de conversão
- **Organizar** — CRM e automações

Identidade visual 2.0: logo da lâmpada com órbitas, fundo marinho e cores de destaque que mudam a cada seção.

## Destaques

- Tela inicial "Ignição": a lâmpada acende com flash e ondas de luz, raios, órbitas 3D com cometas e reflexo
- Clique na lâmpada: ela dá uma volta e troca entre 12 cores
- Cor do site e da logo mudam a cada seção durante o scroll
- Serviços com mini-animações (sites, landing pages, Meta Ads, captação, CRM e automações)
- Processo de trabalho com linha do tempo animada
- Portfólio: Mister Chapéu e Kit de Resumos de Odontologia
- Formulário de contato que abre o WhatsApp com a mensagem pronta
- Layout responsivo e suporte a "reduzir movimento"

## Tecnologias

React • TypeScript • Vite • Tailwind CSS • Motion (Framer Motion)

## Como rodar

```bash
npm install
npm run dev
```

Outros comandos: `npm run build` (publicação com URLs limpas), `npm run build:static` (versão que abre com duplo clique ou Live Server — é a usada no GitHub Pages) e `npm run build:preview` (arquivo HTML único).

## Onde mexer

| O quê | Arquivo |
|---|---|
| Contatos e textos institucionais | `src/config/site.ts` |
| Serviços, etapas e processo | `src/config/content.ts` |
| Projetos do portfólio | `src/config/projects.ts` (+ imagem em `src/assets/projects/`) |
| Cores de cada seção | `src/config/themes.ts` |
| Logo | `src/assets/brand/` (arquivos da marca em `brand-source/identidade-2.0/`) |

---

*Da ideia ao código.*
