# Morel website

New here? Read [README-HANS.md](README-HANS.md) first. Research: [docs/RESEARCH_NOTES.md](docs/RESEARCH_NOTES.md) · Plan: [docs/IMPROVEMENTS.md](docs/IMPROVEMENTS.md)

Static site, no build step, no dependencies, no third-party requests (fonts are self-hosted from the Deins Harness design system).

- `/` — **Design E**: D's product story (one request, six chapters) with C's annotated Knowledge Tree plate. Dark and light follow the visitor's system setting; the moon/sun button switches and remembers it.
- `/c/` — **Design C** ("Field guide"), kept for comparison.

The design canvas with all versions (A–E): https://claude.ai/artifact/GjdqivGekt3yQeZt4QGv9s

## Run
Root launch config entry `deins-website` (port 4310), or:

    python -m http.server 4310 --directory C:\Users\Asim\Claude\deins-website

## Where things live
- `index.html` – all copy for E, in page order (hero with product tabs, flow, chapters 1.0–6.0, crew, trust, early access, footer)
- `styles.css` – dark and light tokens at the top, then one block per section
- `main.js` – theme toggle, product tabs (arrow keys work), scroll reveals, plate lines, chapter rail, clips, two-step form
- `c/` – the C version (its own index, styles, script; shares `assets/`)
- `assets/agents/<species>/` – mushroom stills and state clips (WebM with alpha), copied from deins-team
- `assets/tree.webp`, `assets/tree-dark.webp` – the Knowledge Tree cut from a real app screenshot, for light and dark
- `research/` – app screenshots (21 Nov 2026) and verification screenshots of C and E
- `privacy.html`, `imprint.html` – placeholders; content still TODO

## Open
- Form has no backend (stores nothing). Connect Supabase or a form service.
- German copy not written (EN / DE is a label only).
- Analytics: calls `window.plausible` if present; nothing is loaded yet.
- Keyboard shortcuts shown in the product preview (⌘↵, B) and the Jarvis routing are proposals, not in the app yet.
- Deploy: any static host (e.g. Vercel) serving this folder.
