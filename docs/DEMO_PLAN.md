# Deins demo plan (from the discovery session)

Full report: https://claude.ai/artifact/V9Ytp6JXcZUyqank68ecGA (Deins Hackathon Readiness, Claude Docs).

## User's answers (as relayed to the canvas session; none were posted in the report doc)
- Keep it local. No repo changes (neither `deins-team` nor `deins-team-hackathon`).
- Has a Codex API key; DeepSeek maybe later. Keep test credits very limited.
- Skip design work. Build the app.
- Still open (unanswered): demo machine/OS. Assumption in the report: the WSL install on this PC.

## Where things run
- WSL hackathon install: `~/deins-team` in Ubuntu (disk on D:), service `node scripts/start.mjs --service`, http://127.0.0.1:47360/ (HTTP 401 = sign-in needed; sign-in URL file: `~/.local/share/deins-team/deins-team-*/home/sign-in-address`). Verified started 21 Nov.
- Windows `main` copy: `C:\Users\Asim\Claude\deins-team`, `npm start`, port 47341, URL in `%TEMP%\deins-dev.log`. Has 12 uncommitted Windows-fix files from earlier; leave them.
- Never print the sign-in tokens.

## The demo story (recommended)
"Agents from any vendor, one memory you approve, work that compounds."
1. A Council or agent run finishes and proposes a lesson to the Knowledge Tree inbox (`plugins/tree-keep`, tool `save_text`, tier propose).
2. The owner approves it on stage (only a person can; agents never approve).
3. The next agent answer finds and cites that note.

## Build order
0. **P0, verify before building (cheap):** one real Codex turn on the WSL install.
   - The Codex route runs the signed-in Codex CLI (`plugins/harness/plugin.mjs`, `plugins/model-codex`). With an API key: `codex login --with-api-key` inside WSL (key typed by the user, never by Claude). Use the smallest model and a one-line prompt; one turn only.
   - Known gap: Codex turns with Knowledge Tree tools are not proven (`docs/known-gaps.md`). Test that in the same single turn: ask it to `search` the tree once.
1. **P0:** install Ollama + `bge-m3` (about 1.2 GB) on the demo machine, or search uses the weak hash fallback (`engine/packages/engine/src/cli.ts` ~line 156).
2. **P1 first feature — the approval moment.** Smallest version: a page/panel listing pending tree proposals with Approve, then a "re-ask" that shows the agent citing the approved note.
   - Data: the engine's kt-read/kt-write socket API (`core/plugins/intelligence/brain/bundle/host/read-adapter.mjs`: `connectRead`, `connectWrite`; approve needs the human key file, which works in WSL, not native Windows).
   - "No repo changes": build it as a NEW plugin folder outside both repos (e.g. `C:\Users\Asim\Claude\deins-demo\approval-moment` or `~/deins-demo` in WSL), shaped like the team plugins (`package.json` with `dsh.bundle.patch`, `cordis.patch.yml`, `index.js` apply(ctx, config), optional `client.js`; see `deins-team-hackathon/plugins/README.md` "How a plugin adds to Deins"), and add it through Plugins → Add plugin → From a folder (linked, not copied).
   - Reuse: `plugins/tree-keep` (how a proposal is made), Brain page adapter for reads.
3. **P1 second:** live run timeline for a Council (state words Ready, Thinking, Working, Needs you, Done, Failed). Read-only view over existing run data; files to study: `plugins/community/page/app.js` (near the 800-line limit — do not edit it; build beside it), `plugins/community-council`.
4. **P2 if time:** citation chip on answers opening the tree note.

## Credit discipline
- One Codex turn to verify; then build the UI against recorded/sample run data and the real tree (reads cost nothing).
- Only spend model turns for the final rehearsal (aim 3 full runs logged) and the demo.

## Don't
- Don't edit `core/` or `engine/` (hackathon AGENTS.md hard rule; engine has no licence).
- Don't commit or push anything without the user asking.
- Don't spoof the key-file permission check on Windows.
