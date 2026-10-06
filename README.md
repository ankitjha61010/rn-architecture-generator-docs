# rn-architecture-generator – documentation website

Next.js (App Router) site, exported as static HTML (`out/`) and hosted on Netlify.

```bash
cd website
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Content

| What | Where |
| --- | --- |
| Sidebar, top navigation, page titles & search keywords | `lib/site.ts` |
| Page bodies | `content/*.tsx` (mapped by slug in `content/index.ts`) |
| Folder trees on the architecture pages | `content/trees.json` (rendered by the generator) |
| Home page | `app/page.tsx` |
| Styles (light / dark tokens) | `app/globals.css` |

Add a page: add an entry to `sections` in `lib/site.ts`, write its component in `content/`, register it in `content/index.ts`.

Inline formatting in content strings: `` `code` ``, `**bold**`, `*italic*`, `[label](slug)` / `[label](https://…)`.

## Deploy on Netlify

`netlify.toml` in the repository root already sets everything (base `website`, command `npm run build`, publish `out`, Node 22):

1. Netlify → **Add new site → Import an existing project** → pick the GitHub repository.
2. Keep the detected settings and **Deploy**.
3. *Site configuration → Change site name* → `rnag` – the docs are linked from the main README as https://rnag.netlify.app/.

Without Git: `npm run build` and drag the `out/` folder onto https://app.netlify.com/drop.
