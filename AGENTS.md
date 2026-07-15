# AGENTS.md — LLM Agent Instructions

This repo is the **public marketing-forward wiki** for The Canadian Space. It is published to [wiki.thecanadian.space](https://wiki.thecanadian.space/) and serves as the public entry point to understanding TCS: our mission, editorial model, technology, workflows, and team.

## Working principles

1. **NEVER assume** — verify against current state before writing anything. Check n8n workflows, GitHub repos, and the blog.
2. **ALWAYS fact-check** — especially the Tech Stack and Infrastructure sections. LLMs and tools change frequently.
3. **ALWAYS verify your work** — read back what you've written; link check; test locally if possible.
4. **ALWAYS update docs** after any change. This repo is public and visible to journalists, partners, and collaborators.
5. **Create new docs when needed** and add them to the nav in `mkdocs.yml`.

## Voice & tone

- Second person ("you"); warm and slightly nerdy
- Show enthusiasm without being cutesy
- Aerospace metaphors OK but don't overuse
- **Transparent about AI-in-the-loop model** — celebrate it, don't hide it. E.g., "Robo Chris sources articles from feeds and APIs, an LLM drafts the blog post, and Chris reviews and publishes."
- Include specific numbers and stats where you can (7 workflows, 14 tagged n8n workflows, cost tracking, etc.)
- Aim for clarity over formality

## What to NEVER leak

- Execution IDs or run logs from n8n
- VPS IPs (except 51.195.43.156 in documentation and CI secrets — that's public infrastructure)
- Cost figures per token or per LLM call
- API keys, secrets, or credentials
- References to internal ADRs (Architecture Decision Records)
- Links to internal docs (e.g., tcs-docs) — note them as "behind Cloudflare Access" if relevant

## How to update the Tech Stack section

Before changing `docs/technology/tech-stack.md`:

1. Open the live n8n instance at [n8n.thecanadian.space](https://n8n.thecanadian.space/) (ask Chris for access if needed)
2. Check the **Daily Broadcast**, **Weekly Spotlights**, and **Monthly Deep Dives** workflows
3. Look at each workflow's LLM nodes (Code nodes, HTTP calls to OpenRouter, etc.)
4. Verify the current primary LLM, fallback LLMs, and any data transformations
5. Update the markdown with the **current** stack:
   - Primary author LLM (e.g., Google Gemini 2.5 Flash)
   - Fallback LLMs (e.g., Claude Haiku, Grok)
   - Orchestration layer (n8n)
   - Reverse proxy (Caddy)
   - Blog platform (WordPress on Newfold)
   - LLM routing (OpenRouter)
   - Data sources (SpaceFlightNews, Launch Library 2, Crawl4AI, etc.)

**Never copy-paste from old sources** — Qwen, DeepSeek, and other early iterations are now replaced.

## Deploy pipeline summary

```
Push to main
  ↓
GitHub Actions: build-deploy.yml
  ├─ build: mkdocs build --strict
  ├─ Upload site/ artifact
  └─ deploy-vps: rsync to ubuntu@51.195.43.156:/var/www/tcs-wiki/site
  ↓
Caddy reverse proxy serves site at wiki.thecanadian.space
```

For pull requests, the build runs but deploy does not.

## Internal ops reference

For questions about cost tracking, LLM token spend, n8n execution logs, disaster recovery, or other operational details, refer to the internal docs at [tcs-docs](https://github.com/The-Canadian-Space/tcs-docs) (private repo, behind Cloudflare Access). This wiki **never** includes that level of detail.

## Structure

- `docs/index.md` — homepage, hero section, CTAs
- `docs/what-is-tcs/` — mission, content categories, editorial philosophy
- `docs/how-it-works/` — editorial pipeline, Robo Chris persona, QA process
- `docs/technology/` — tech stack, infrastructure, data sources
- `docs/workflows/` — daily broadcast, weekly spotlights, monthly deep dives (each with Mermaid diagrams)
- `docs/evolution/` — timeline of TCS development (Mermaid timeline + blog-plugin release archive)
- `docs/community/` — get involved, credits, contact
- `docs/stylesheets/deep-space.css` — custom palette and animations
- `docs/javascripts/animations.js` — scroll reveals, transitions, hero starfield
- `blog/` — WordPress post archive synced via GitHub Actions (if integrated)

## Markdown conventions

- Use `:material-*:` and `:fontawesome-solid-*:` icons freely
- Use grid cards: `<div class="grid cards" markdown>` for listing items
- Use admonitions: `!!! info`, `!!! tip`, `!!! quote` for callouts
- Use content tabs: `=== "Tab name"` for multi-view sections
- Use custom classes: `.tcs-hero`, `.tcs-cta`, `.tcs-status`, `.tcs-stat`
- All internal links relative from `docs/`, e.g. `[Mission](what-is-tcs/mission.md)`
- External links to thecanadian.space use full URLs, e.g. `https://thecanadian.space/meet-robo-chris/`

## Questions?

Ask Chris directly. This repo is fresh and working principles may evolve.

## How to verify (before flagging In QA or closing)

- **`mkdocs serve` locally.** Open [http://localhost:8000](http://localhost:8000) and click through every page you touched. Broken links = broken ticket.
- **Check on real browsers.** MkDocs Material renders differently on mobile — verify at least Chrome desktop + a mobile viewport for any layout change.
- **Search still works.** MkDocs Material's search indexes on build — if you renamed a page or heading, test a search query for the old text and confirm the redirect (or add one).
- **Link integrity.** For internal `[label](path.md)` links — mkdocs will warn on broken ones at build time. Warnings = bugs.

