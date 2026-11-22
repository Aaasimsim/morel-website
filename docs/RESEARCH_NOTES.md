# Research notes

What we learned while designing the Morel website (21–22 Nov 2026). Screenshots live in `research/`.

## Sources
- **PRD and agent brief:** Morel marketing website PRD (v1, 21 Nov 2026) and the promo-video brief. Not in this repo; ask Asim.
- **Design system:** Deins Harness (tokens, components, mushroom artwork): https://claude.ai/artifact/KbMZ8xRXkFvEs9AD724aS5 and `deins-team/docs/design/deins-harness-design-system`.
- **Readiness report** (what is verified in the product): https://claude.ai/artifact/V9Ytp6JXcZUyqank68ecGA
- **Design canvas with all five website directions (A–E):** https://claude.ai/artifact/GjdqivGekt3yQeZt4QGv9s
  (private to Asim; ask for access)

## What the running app taught us (`research/app-captures/`)
Captured from the Deins app (WSL install, port 47360) at 1440 px.
1. **The Knowledge Tree is the signature visual.** A fibrous trunk with origami-like leaves, one colour per branch. Selecting a branch lights its strand from root to leaves while the rest fades (`02-knowledge.png`, `03-knowledge-branch.png`). Opening a note shows a clean sheet with status chips (`04-knowledge-note.png`). This became the hero of designs B, C and E.
2. **Mushrooms are painted with cap colours and sit in tinted orbs**; agent cards get a soft cap-colour wash from the corner (`06-agents.png`).
3. **Neutrals are cool white and grey (hue 262)**, not the warm tones the PRD suggested. Design A warmed them; B–E follow the app.
4. **Agent states are real UI words:** Ready, Thinking, Working, Needs you, Done, Failed. The agent filter is "All / Working / Needs you". The Approvals page says "Agents propose. Only you decide what goes into the Knowledge Tree."
5. **Off-system today:** the Community page (blue accents, a left-border card, `07-community.png`) and the Approvals page (unstyled browser controls, `05-approvals.png`).
6. **Demo turn failed:** Architect on the Codex route (gpt-6-luna, Low) stopped with `MODEL_UNVERIFIED` ("the app did not say which model answered", `09-chat-answer.png`).
7. **Dark toggle:** flipping "Dark appearance" changed the setting, but the Knowledge page stayed light.
8. Console 404s: `/apps/conversation-sessions/hidden.json`, `titles.json`, `/apps/agent-pictures.json`.

## Readiness report: what the site may claim
- **Verified (in WSL):** install, Deins Look and Shell UI, plugin install, Knowledge Tree engine; approvals fail closed and an audit chain exists.
- **Implemented but unverified:** Claude Code and Codex routes, Councils, workflows, improvement loop, the Community page.
- **Not verified / blocked:** any live model turn, hosting (so the site says "designed to run in the EU", never "hosted in the EU"), GitHub sign-in.
- The engine has no licence yet, so don't call it open source.
→ The site sells the vision with "designed to" wording. No logos, testimonials, numbers or certifications (PRD §9).

## Design directions on the canvas
| | Idea | Status |
|---|---|---|
| A | Forest illustration, warm palette | first draft |
| B | Product-true: the app's real screens as the page | |
| C | Field guide: oversized type, tree as an annotated specimen plate | built, at `/c/` |
| D | Product story (Linear-style): one request, six chapters | |
| E | D + C's tree plate | **built, at `/`** |

## Verification screenshots
- `research/site-c/`: C at 1440 px and 390 px (hero, plate, pinned case strip, rule, crew, form done state).
- `research/site-e/`: E in light and dark, chapters, phone.
