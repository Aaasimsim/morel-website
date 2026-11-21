# Changelog

## 2026-11-21 (later)
- Canvas: added design D (product story, Linear-style) and design E (D plus C's tree plate). A–C unchanged.
- Site: `/` is now design E. The C build moved to `/c/` with its asset paths adjusted.
  - E: hero with a product window (Inbox / Approval / Knowledge Tree tabs, arrow keys), the six-chapter request story, a floating chapter rail, C's annotated tree plate with lines that draw in, crew table, trust grid, and a two-step early-access form (email, then details) ending in the done clip.
  - Dark and light from the design system's tokens; follows the system setting, toggle remembers the choice.
  - Added `assets/tree-dark.webp` (tree recut with a stricter alpha so no halos on dark).
- Fixed in E during checks: new-leaf card covered the Strand line; window dots overlapped agent heads on phones; sidebar border when stacked.

## 2026-11-21
- Canvas "Morel Website" (Claude Design): design A (forest illustration), design B (built from the running app's real screens), design C (field guide, editorial).
- Captured the running Deins app (WSL, port 47360) at 1440 px: Home, Knowledge Tree (whole, branch selected, note), Approvals, Agents, Community, a chat turn. Stored in `research/app-captures/`.
- Built design C as a static site: `index.html`, `styles.css`, `main.js`, self-hosted Inter and JetBrains Mono, mushroom stills and state clips, tree cut from a real screenshot.
  - Motion: hero words and glyphs settle in; plate leader lines draw; case strip pins and scrolls sideways on wide screens and swipes on phones; clips play only when visible; crew cards swap idle for working/done on hover or focus; the rule's words light up on scroll; rotating seal; engine marquee. All of it stops under reduced motion.
  - Early-access form validates in the browser and shows the done moment. No backend yet.
- Fixed: form stayed visible after submit (`[hidden]` lost to `display:flex`); Strand label overlapped the leaves; footer arrow too small; first case card flush to the phone edge.
- Added `deins-website` (port 4310) to `C:\Users\Asim\Claude\.claude\launch.json`.
