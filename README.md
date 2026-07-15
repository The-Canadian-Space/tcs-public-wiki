<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&height=200&color=0:0B1021,45:14B8A6,100:0EA5E9&text=%20TCS%20Public%20Wiki%20&fontColor=ffffff&fontAlignY=42&fontSize=30&textBg=true&desc=Source%20for%20wiki.thecanadian.space&descAlignY=68&descSize=17" />
</p>

<p align="center">
  <a href="https://wiki.thecanadian.space"><img src="https://img.shields.io/badge/wiki.thecanadian.space-live-14B8A6?style=for-the-badge&logo=readthedocs&logoColor=white" alt="Live wiki" /></a>
  <a href="https://thecanadian.space"><img src="https://img.shields.io/badge/The%20Canadian%20Space-space%20blog-0EA5E9?style=for-the-badge&logo=rocket&logoColor=white" alt="TCS" /></a>
  <a href="https://github.com/The-Canadian-Space/tcs-public-wiki/issues/new"><img src="https://img.shields.io/badge/Report%20a%20bug-red?style=for-the-badge&logo=github&logoColor=white" alt="Report a bug" /></a>
  <img src="https://img.shields.io/badge/MkDocs%20Material-526CFE?style=for-the-badge&logo=materialformkdocs&logoColor=white" alt="MkDocs Material" />
</p>

> **"Aerospace docs for people who like docs, and for the LLMs helping them."**

Source repo for the **public-facing wiki** of [The Canadian Space](https://thecanadian.space). Built with **MkDocs Material** and published live at **[wiki.thecanadian.space](https://wiki.thecanadian.space)**.

## 🚀 Quick Start

**Just want to read the docs?** → [wiki.thecanadian.space](https://wiki.thecanadian.space) — you don't need this repo.

**Want to run the wiki locally** (for editing or previewing changes)?

```bash
# Install MkDocs Material
pip install -r requirements.txt

# Serve locally
mkdocs serve
```

Opens at `http://localhost:8000` with hot reload on file changes.

## 🚢 CI + deploy

```
push to main → GitHub Actions builds the site → rsync to VPS → Caddy serves at wiki.thecanadian.space
```

Ships to production on every merge to `main`.

## 📝 Editing the wiki

- Markdown files live under `docs/`
- Navigation structure is defined in `mkdocs.yml`
- Assets (images, diagrams) go under `docs/assets/`
- MkDocs Material extensions used: admonitions, code copy, mermaid diagrams, tabs

## 🎫 Work in this repo

Tickets live on the [**TCS Timeline Project**](https://github.com/orgs/The-Canadian-Space/projects/1). Open one before starting work; closing it auto-generates an engineering-log entry.

For LLM/agent context, see [`AGENTS.md`](AGENTS.md).

## 🐛 Found a bug in the docs?

- **[Open an issue](https://github.com/The-Canadian-Space/tcs-public-wiki/issues/new)** — for typos, broken links, unclear explanations, or missing topics
- Mention the URL path (`/some/page/`) so we can find it quickly

## 🔗 Related

- **Live wiki:** [wiki.thecanadian.space](https://wiki.thecanadian.space)
- **Main site:** [thecanadian.space](https://thecanadian.space)
- **[`tcs-tools`](https://github.com/The-Canadian-Space/tcs-tools)** — Python utilities
- **[`tcs-scripts`](https://github.com/The-Canadian-Space/tcs-scripts)** — n8n code nodes

## 🧡 Support

TCS is a personal project + portfolio piece. **Patreon** is where the running project log lives.

[![Support on Patreon](https://raw.githubusercontent.com/Godimas101/personal-projects/main/patreon/images/buttons/patreon-medium.png)](https://patreon.com/Godimas101)

---

*Part of [The Canadian Space](https://thecanadian.space) — automated aerospace news for Canada.*
