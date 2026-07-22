# Infrastructure

The Canadian Space runs on a self-hosted setup. We own the hardware contract, manage the deployments, and see exactly what's happening at every layer. Here's why that matters, and how it's built.

## The layout

At the core is a **single Digital Ocean droplet** running Docker Compose. Inside: n8n (workflow orchestration), Redis (job queue), and Caddy (reverse proxy). Outside: WordPress on Bluehost, GitHub for code and image hosting, OpenRouter for LLM routing, and a handful of aerospace APIs feeding data in.

```mermaid
graph TB
    subgraph DO["Digital Ocean droplet (self-hosted)"]
        N8N["n8n<br/>workflow engine"]
        R["Redis<br/>queue"]
        C["Caddy<br/>reverse proxy"]
        N8N <-->|"queues"| R
        C <-->|"proxies"| N8N
    end

    subgraph External["External Services"]
        WP["WordPress<br/>Bluehost"]
        GH["GitHub<br/>code + images"]
        OR["OpenRouter<br/>LLM API"]
        SNAPI["Spaceflight News<br/>API"]
        LL2["Launch Library 2"]
        X["X / Twitter<br/>self-hosted scraper"]
    end

    N8N -->|"publish"| WP
    N8N -->|"route requests"| OR
    N8N -->|"pull data"| SNAPI
    N8N -->|"pull data"| LL2
    N8N -->|"pull posts"| X
    N8N -->|"push assets"| GH

    style DO fill:#0A1428,color:#fff,stroke:#FF9D3D
    style External fill:#f5f5f5,color:#000
    style N8N fill:#FF9D3D,color:#000
```

## Why self-hosted?

We made a deliberate choice to self-host instead of using a fully managed platform (Zapier, Make, etc.). Here's why:

**Control.** We see exactly what we're running and control our own destiny. No surprise pricing tiers, no "your feature request is on the roadmap," no waiting for a third party to approve a new data source.

**Learning.** Running our own infrastructure keeps us sharp. We understand caching, queueing, error handling, and production operations — not just the happy path.

**Openness.** Open-source at the core (n8n, Docker, Caddy) means anyone can audit what we're doing, contribute improvements, or fork and build their own version.

## Disaster recovery & redundancy

Our n8n workflows are version-controlled on GitHub. WordPress backups are automated. If the droplet goes down, we can spin up a new one and restore from our images in under an hour.

For critical workflows (Daily Broadcast, editorial routing), we've built fallback routes: if Qwen is unavailable, DeepSeek steps in. If one data source is down, the others keep pulling. The pipeline degrades gracefully rather than failing outright.

---

!!! tip "Want more?"
    See the full component-by-component breakdown on [Tech Stack](tech-stack.md).
