# Hi Hans 👋 — how to use this repo

This is the **Morel marketing website** (Morel = the Deins agent platform, renamed for the hackathon), plus the research and plans behind it. Branch `research-and-plans` adds the research and planning docs on top of `main`.

## 1. Run the site (2 minutes)
No build step, no dependencies. Any static server works:

```bash
git clone https://github.com/Aaasimsim/morel-website.git
cd morel-website
git switch research-and-plans
python -m http.server 4310
```
Open http://localhost:4310

- `/` — **Design E** (the current pick): product story that follows one request through six chapters, plus the annotated Knowledge Tree plate. Light and dark follow your system; the moon/sun button switches.
- `/c/` — **Design C** ("Field guide"), kept for comparison.

## 2. What's where
| Path | What |
|---|---|
| `index.html`, `styles.css`, `main.js` | Design E: copy, styles, motion. All copy is plain HTML in page order. |
| `c/` | Design C |
| `assets/` | Mushroom stills + state clips (WebM with alpha), the Knowledge Tree cut-outs, self-hosted Inter / JetBrains Mono |
| `docs/RESEARCH_NOTES.md` | **Start here.** What the running app taught us, what the readiness report lets us claim, the five design directions |
| `docs/IMPROVEMENTS.md` | **The plan.** What's missing before launch, website improvements, product issues found |
| `docs/DEMO_PLAN.md` | The hackathon demo story and build order for the app ("agents from any vendor, one memory you approve, work that compounds") |
| `docs/BUILD_LOG.md` | What was set up on the WSL demo install (Codex route, Ollama + bge-m3, approval plugin) |
| `research/app-captures/` | Screenshots of the real app (Home, Knowledge Tree, branch selected, note, Agents, Approvals, Community, chat) |
| `research/site-c/`, `research/site-e/` | Verification screenshots of the two built designs at 1440 px and phone width |
| `CHANGELOG.md` | Every change, in order |

## 3. Editing
- **Copy:** edit `index.html` directly. Keep the honesty rules: no logos, testimonials, numbers or certifications; say "designed to" for anything not verified (see `docs/RESEARCH_NOTES.md`).
- **Colours:** `styles.css` top: dark and light tokens from the Deins Harness design system. Amber (`--att`) only where a person must act.
- **Motion:** `main.js` (tabs, reveals, tree-plate lines, chapter rail, clips, two-step form). Everything works without JS too, and respects reduced motion.

## 4. Open decisions (need you / the team)
1. Artwork rights: can the mushroom artwork and design system be used under the Morel name?
2. Name/domain check for "Morel".
3. Headline: "Prepared by agents. Signed by you." vs "Your office's AI team, under your roof."
4. Branch vs leaf wording.
5. Form backend (Supabase table?) and who answers early-access sign-ups.

## 5. Links
- Design canvas with all five directions (A–E): https://claude.ai/artifact/GjdqivGekt3yQeZt4QGv9s (private; ask Asim to share)
- Deins Harness design system: https://claude.ai/artifact/KbMZ8xRXkFvEs9AD724aS5
- Readiness report: https://claude.ai/artifact/V9Ytp6JXcZUyqank68ecGA

Questions → Asim.
