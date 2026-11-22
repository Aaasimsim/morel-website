# Demo build log (canvas/build side session)

## 2026-11-21
- Codex CLI 0.171.0 installed in WSL (npm -g, under nvm). User signed in with an API key (`codex login status`: API key configured).
- WSL setup re-run: `DEINS_TEAM_CODEX_MODELS=gpt-6-luna node scripts/setup.mjs --force --no-install --cheap --no-shortcut --no-examples`, with `/mnt/*` removed from PATH so the Windows Claude Code is NOT picked up as a route. Routes now: codex (gpt-6-luna, cheap limit haiku/luna/flash/chat at effort low), deepseek (host row, needs sign-in). Service up on 47360.
  - Discovery of Codex model ids reads ~/.codex/models_cache.json, which exists only after a first Codex run; hence the explicit DEINS_TEAM_CODEX_MODELS.
- ONE Codex turn (CLI, same tree MCP config as the profile row, read tool only): `codex exec -m gpt-6-luna -c model_reasoning_effort=low -s read-only`. Called knowledge-tree/search once, answered "Deins README". 13 s, 15,529 tokens (Codex's own count). Exit 0. Not yet a turn through the Deins chat UI.
- Approval plugin: C:\Users\Asim\Claude\deins-demo\approval-moment (outside both repos). host.mjs + index.js + client.js + page/. 7/7 unit tests pass (node --test host.test.mjs).
  - Live check against the real WSL tree, no model: agent "approval-demo-test" save_text → proposal (19 s incl. engine start); plugin review listed it (1.7 s); plugin decide reject (98 ms); gone from open list. No note added.
- Profile row `approval-moment` added by hand to the WSL profile patch (backup cordis.patch.yml.bak-approval-moment); dsh --dump-config composes (warns until installed).
- Add plugin via the UI failed ("unknown error"): in WSL, `pnpm` is the WINDOWS pnpm (/mnt/c/.../npm/pnpm); the service has no Linux pnpm. Linked by hand with `pnpm add link:/mnt/c/Users/Asim/Claude/deins-demo/approval-moment` in the profile folder, restarted, switched on in Plugins. /apps/approvals/ serves; api/proposals 200, "0 open".
- Open: the sidebar button "Approvals" registers but the Deins shell rail does not show it (only its fixed icons); page reachable at /apps/approvals/. Persona "Architect" still points at claude-code/default (no Claude route now). Ollama not installed (hash fallback).
- Ollama 0.40.16 installed for the WSL user (no sudo) in ~/.local/ollama (2.4 GB), systemd user unit `ollama.service` on 127.0.0.1:11434; bge-m3 pulled (1.2 GB, ~/.ollama). All on the WSL disk (D:). kt doctor: "embedder: bge-m3 via Ollama (local)", dim 1024.
- Full re-index after stopping the old engine (pid held the lock): 239 notes, 1272 chunks in 321 s. Service back on 47360.
- (old) Next: profile row `approval-moment` {kt, tree, brainPlugin} + link the plugin via Plugins → Add plugin → From a folder. Note: a later `setup.mjs --force` rewrites the profile and may drop that row.
