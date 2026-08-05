# Infrastructure

The Canadian Space runs on a self-hosted setup. We own the hardware contract, manage the deployments, and see exactly what's happening at every layer. Here's why that matters, and how it's built.

## The layout

At the core is a **single OVH Cloud VPS** (VPS2 tier — 6 vCores, 12GB RAM, 100GB NVMe, Frankfurt) running Docker Compose. Inside: n8n (workflow orchestration), Redis (job queue), Caddy (reverse proxy + TLS), and a handful of Python scripts we invoke over SSH. Around it: WordPress on Bluehost, GitHub for code and image hosting, OpenRouter for LLM routing, and a handful of aerospace data sources feeding stories in.

```mermaid
graph TB
    Data["📡 <b>Data sources</b><br/>Spaceflight News API · Launch Library 2 · RSS<br/>X (via Rettiwt-API) · News sites (via Crawl4AI)"]

    subgraph OVH["🖥️ OVH Cloud VPS — self-hosted core"]
        Core["⚙️ <b>n8n</b> workflow engine<br/><small>every pipeline runs here</small><br/><br/>🔒 Caddy &nbsp;·&nbsp; 📦 Redis &nbsp;·&nbsp; 🐍 Python scripts"]
    end

    LLM["🤖 <b>LLMs via OpenRouter</b><br/>Qwen 3.7 Plus (author) · Claude Haiku 4.5 (fallback)<br/>GPT-5-mini (editor) · Grok (social copy)"]

    WP["📡 <b>WordPress on Bluehost</b><br/>thecanadian.space"]
    Social["📱 <b>Facebook + Instagram</b>"]
    GH["💾 <b>GitHub</b><br/>tcs-images · workflow backups · repos"]

    Data -->|feeds| Core
    Core <-->|LLM calls| LLM
    Core -->|publishes| WP
    Core -->|distributes| Social
    Core -->|persists| GH

    classDef input fill:#0A1428,color:#fff,stroke:#0A1428
    classDef ai fill:#FF9D3D,color:#000,stroke:#FF9D3D
    classDef out fill:#22C55E,color:#fff,stroke:#22C55E
    classDef store fill:#334155,color:#fff,stroke:#334155
    class Data input
    class LLM ai
    class WP,Social out
    class GH store
```

<small><b>Legend:</b> dark blue = data in · orange = AI · green = published out · slate = storage · orange-bordered box = self-hosted OVH core</small>

## Why self-hosted?

We made a deliberate choice to self-host instead of using a fully managed platform (Zapier, Make, etc.). Here's why:

**Control.** We see exactly what we're running and control our own destiny. No surprise pricing tiers, no "your feature request is on the roadmap," no waiting for a third party to approve a new data source.

**Learning.** Running our own infrastructure keeps us sharp. We understand caching, queueing, error handling, and production operations — not just the happy path.

**Openness.** Open-source at the core (n8n, Docker, Caddy) means anyone can audit what we're doing, contribute improvements, or fork and build their own version.

## Disaster recovery & redundancy

Our n8n workflows are version-controlled on GitHub (auto-backup hourly). WordPress backups are automated by the host. If the VPS goes down, we can spin up a new OVH instance and restore from the backups in under an hour.

For critical workflows (Daily Broadcast, editorial routing), we've built fallback routes: if Qwen errors mid-response, Claude Haiku 4.5 steps in. If one data source is down, the others keep pulling. The pipeline degrades gracefully rather than failing outright.

---

!!! tip "Want more?"
    See the full component-by-component breakdown on [Tech Stack](tech-stack.md).
