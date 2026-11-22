# Improvements plan

Ordered by what unblocks a public launch first.

## Before going public (must)
1. **Early-access form backend.** The form validates and shows the done moment but stores nothing. Connect a Supabase table (or a form service) with a GDPR consent field and a double opt-in mail.
2. **Imprint and privacy policy.** `imprint.html` and `privacy.html` are placeholders; an Impressum is legally required in Germany.
3. **Artwork rights.** Confirm with Han and Luc that the mushroom artwork and design system may be used under the Morel name (PRD appendix).
4. **Name and domain.** Trademark check on "Morel"; pick a domain (morel.team / getmorel.com / morel.app).
5. **Screenshots from a clean workspace.** The tree images come from the Deins dev workspace (its own notes, German labels such as "Geändert"). Recapture from a Morel demo workspace with fictional broker data.

## Website (should)
6. **German copy.** The EN/DE switch is a label only. Brokers will want German ("Ihr KI-Team, unter Ihrem Dach").
7. **Vocabulary.** Decide branch vs leaf. Designs C–E use *branch = topic, leaf = one approved answer* (matches the app); the PRD uses *branch* for an approved answer.
8. **Hero headline test.** E uses "Prepared by agents. Signed by you."; the PRD's primary is "Your office's AI team, under your roof." Test with 3–5 brokers.
9. **Hero motion.** Optionally add a short silent loop behind the hero once a promo film exists.
10. **Performance pass.** Lighthouse mobile ≥ 90 / accessibility ≥ 95 not yet measured. Add `width`/`height` to every image (mostly done), lazy-load clips (done), consider AVIF for the tree.
11. **Analytics.** `main.js` already calls `window.plausible(...)` for early-access submits, "Follow one request" and scroll depth into the story; add a privacy-friendly analytics script.
12. **Keyboard shortcuts shown in the product preview** (⌘↵, B) and the Jarvis routing view are proposals; build them in the app or remove them from the site.

## Product (seen while researching)
13. Restyle the Approvals page and the Community page in the Deins Look.
14. Fix `MODEL_UNVERIFIED` on the Codex route so a live demo turn works.
15. Make the dark toggle repaint the Knowledge page iframe.
16. Fix the three 404s (conversation-sessions hidden/titles, agent-pictures).
