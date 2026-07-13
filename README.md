# The Canadian Space — Public Wiki

This is the **public marketing-forward wiki** for The Canadian Space (TCS), published to [wiki.thecanadian.space](https://wiki.thecanadian.space/). 

It's built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) and explains our mission, editorial model, technology stack, and the 7 AI-assisted workflows that power daily aerospace news delivery.

## Contrast with internal docs

The internal documentation repo ([tcs-docs](https://github.com/The-Canadian-Space/tcs-docs), behind Cloudflare Access) contains operational procedures, cost tracking, and technical deep-dives. This wiki is public, visually expressive, and tells the story of TCS to potential collaborators, journalists, and aerospace enthusiasts.

## Local development

```bash
pip install -r requirements.txt
mkdocs serve
```

Visit `http://localhost:8000/`.

## Build

```bash
mkdocs build --strict
```

The `site/` directory contains the static HTML ready for deployment.

## Deploy

Push to `main` and GitHub Actions handles the rest:
- Builds the site on `ubuntu-latest`
- Installs MkDocs Material + Cairo/Pango deps (for OG card generation)
- Uploads site artifact
- Deploys via rsync to the VPS

## Documentation for LLM agents

See [AGENTS.md](./AGENTS.md) — the canonical entry point for any LLM working on this repo. It documents voice, working principles, what to never leak, and how to update the tech stack section.
