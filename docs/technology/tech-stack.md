# The tech stack

Here's what we run on. These are the real tools powering TCS—not a marketing wish list, but the exact platforms and models we use every day.

## Hosting & infrastructure

<div class="grid cards" markdown>

- :fontawesome-solid-database: **OVH VPS**
  
  Self-hosted virtual server in OVH's data center. Gives us control, predictable costs, and full transparency. No vendor lock-in.

- :material-docker: **Docker Compose**
  
  Containerizes n8n, Redis, and supporting services. Makes local dev and production identical—no "works on my machine" surprises.

- :material-network-lock: **Caddy**
  
  Modern reverse proxy and TLS terminator. Handles HTTPS, rate limiting, and routing for both the VPS services and the wiki.

- :material-cloud-outline: **Cloudflare**
  
  DNS hosting and access control for our internal docs. Keeps things fast and adds an extra layer of security where needed.

</div>

## Workflow orchestration

<div class="grid cards" markdown>

- :material-graph-outline: **n8n**
  
  The heartbeat of TCS. Open-source workflow engine orchestrating all data ingestion, LLM routing, editorial handoff, and WordPress publishing. Runs self-hosted on the VPS.

- :material-github: **GitHub Actions**
  
  CI/CD automation: runs tests, deploys the wiki, and handles repository workflows for all our code.

- :material-redis: **Redis**
  
  In-memory data store for n8n's queue and job management. Keeps workflows responsive even under high throughput.

</div>

## AI models

<div class="grid cards" markdown>

- :fontawesome-solid-wand-magic-sparkles: **Google Gemini 2.5 Flash**
  
  Primary author of your daily broadcasts. Fast, reliable, cost-effective. This is the model drafting most of what you read.

- :material-brain: **Anthropic Claude Haiku 4.5**
  
  Editorial pass and fallback author. Brings a different perspective, catches what the primary model might miss, and helps us avoid model-specific quirks.

- :fontawesome-solid-rocket: **xAI Grok 3**
  
  Secondary fallback when needed. Adds redundancy and diversity to our LLM pool.

- :material-router-wireless: **OpenRouter**
  
  Unified API for routing requests to all three models. Simplifies authentication and gives us a single interface to manage costs and quotas.

</div>

## Content platform

<div class="grid cards" markdown>

- :material-wordpress: **WordPress**
  
  Hosted on Newfold. Powers thecanadian.space—the blog where your daily broadcasts land. Familiar, extensible, and battle-tested.

- :material-chart-line: **MonsterInsights**
  
  Google Analytics integration for WordPress. Tells us who's reading, what they're interested in, and how long they stay.

</div>

## Data sources

<div class="grid cards" markdown>

- :fontawesome-solid-rocket: **SpaceFlightNews API (SNAPI)**
  
  Real-time aerospace news aggregation. Provides structured article data curated by space industry experts.

- :material-satellite: **Launch Library 2 API (LL2)**
  
  Launch schedules, mission details, and real-time launch tracking. Maintained by The Space Devs—a volunteer organization.

- :material-spider-web: **Crawl4AI**
  
  Custom web scraper for sources that don't expose APIs. Respectful scraping with caching and backoff logic built in.

- :material-book-open: **Wikipedia**
  
  Entity lookups, historical context, and fact verification. Always cited when we use it.

- :material-rss: **RSS feeds**
  
  Curated feeds from SpaceQ and other aerospace news sources. Simple, reliable, and fills gaps where APIs don't.

</div>

## Home-brew tools

<div class="grid cards" markdown>

- :material-github: **tcs-tools**
  
  Python package for article scraping, parsing, and deduplication. Lives in our GitHub org and handles data cleaning before it hits n8n.

- :material-script: **tcs-scripts**
  
  Per-workflow Python helpers: cost calculation, metadata generation, fact-checker prompts, and more.

- :material-image-multiple: **tcs-images**
  
  Image library for blog posts. Curated space photography, diagrams, and graphics that make articles pop.

</div>

---

!!! info "Stack evolution"
    This list reflects our current setup as of July 2026. We've switched LLM providers, added new data sources, and optimized our infrastructure over time. For detailed release notes on what changed and when, check the [blog archive](../blog/index.md).
