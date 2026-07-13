# tcs-public-wiki · The Canadian Space

Public-facing wiki for TCS, built with MkDocs Material and published to [wiki.thecanadian.space](https://wiki.thecanadian.space/). This repo builds the site.

## Learn more

For architecture, design decisions, and how this repo fits into TCS as a whole, see the wiki:

- **[wiki.thecanadian.space](https://wiki.thecanadian.space)**

## Work in this repo

Tickets live on the [TCS Timeline Project](https://github.com/orgs/The-Canadian-Space/projects/1). Open one before starting work; closing it auto-generates an engineering-log entry.

For LLM/agent context, see [AGENTS.md](AGENTS.md).

## Local dev

```bash
mkdocs serve
```

Opens at `http://localhost:8000`.

## CI / deploy

Push to `main` → GitHub Actions builds site → rsync to VPS → Caddy serves.

---

*Part of [The Canadian Space](https://thecanadian.space) — automated aerospace news for Canada.*
