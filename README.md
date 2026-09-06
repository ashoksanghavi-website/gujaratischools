# Consortium of Gujarati Schools

The website of the [Consortium of Gujarati Schools](https://www.gujaratischools.org),
a UK educational charity supporting the teaching and learning of Gujarati for
children aged 5 to 16.

## For committee members

**To add a news post or a document, you do not need a developer.**
Read [`content/README.md`](content/README.md) — it explains, in plain English,
how to publish by adding one file to a folder.

## What is here

| | |
|---|---|
| **378** resources | Past papers, exam specifications, training packs, teaching material, newsletters and forms |
| **365** documents | Served locally from `public/documents/`, each with its real file size shown before download |
| **10** news posts and training events | `content/posts/` |
| **95** legacy redirects | Every URL from the old WordPress site still works |

## Running it locally

```bash
npm install
npm run dev
```

Then open <http://localhost:5188>.

| Command | What it does |
|---|---|
| `npm run dev` | Development server on port 5188 |
| `npm run build` | Generates the sitemap, type-checks, then builds to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Type-check only |

## How it is built

- **Vite + React + TypeScript**, Tailwind for styling, Framer Motion for
  interaction, Lenis for smooth scroll, Fuse.js for fuzzy search.
- **Content is markdown.** `content/posts/*.md` and `content/resources/*.md` are
  read at build time with `import.meta.glob` — there is no CMS and no database.
- **Design tokens** live in `src/styles/tokens.css`. No component hardcodes a
  colour, radius, shadow or duration.

## Documentation

| File | What it covers |
|---|---|
| [`content/README.md`](content/README.md) | **Publishing guide for the committee** |
| [`MISSING_ASSETS.md`](MISSING_ASSETS.md) | What was migrated, what was not, and two decisions for the charity |
| [`docs/01-user-research.md`](docs/01-user-research.md) | Who the site is for and how the IA was ranked |
| [`docs/02-design-plan.md`](docs/02-design-plan.md) | The "Exercise Book" design direction |
| [`docs/04-design-critique.md`](docs/04-design-critique.md) | Self-critique and what it changed |
| [`docs/05-accessibility-audit.md`](docs/05-accessibility-audit.md) | WCAG 2.1 AA audit and fixes |
| [`docs/06-design-system.md`](docs/06-design-system.md) | Tokens and component reference |

## Deployment

Configured for Vercel (`vercel.json`), with fallbacks for Netlify/Cloudflare
Pages (`public/_redirects`) and Apache (`public/.htaccess`). It is a static
single-page app; the only requirement is that unknown paths rewrite to
`index.html` so deep links survive a refresh.
