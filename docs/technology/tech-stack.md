# The tech stack

Here's what actually powers TCS — not a marketing wish list, but the exact platforms, models, and APIs the site runs on today.

## Hosting & infrastructure

<div class="grid cards" markdown>

- :material-wordpress: **Bluehost**

    ---

    Web hosting for [thecanadian.space](https://thecanadian.space) (WordPress). The foundation for the blog: easy WordPress installation and reliable uptime.

- :fontawesome-solid-cloud: **OVH Cloud**

    ---

    VPS host (VPS2 tier — 6 vCores, 12GB RAM, 100GB NVMe) running our n8n instance, Caddy reverse proxy, and internal image-prep service. Frankfurt data centre. Powers all automation 24/7 with predictable annual billing and full control.

- :material-github: **GitHub**

    ---

    Code + image hosting. Header graphics, diagrams, and static assets live in a public repo. Keeps everything versioned and accessible.

- :material-shield-lock: **Caddy**

    ---

    Modern reverse proxy and TLS terminator. Handles HTTPS, rate limiting, and routing for the n8n instance and internal services.

</div>

## Workflow orchestration

<div class="grid cards" markdown>

- :material-graph-outline: **n8n**

    ---

    The backbone of TCS. Open-source workflow engine that pulls data, drafts articles, posts to WordPress + Facebook + Instagram, and handles scheduling. Self-hosted on OVH Cloud.

- :material-docker: **Docker Compose**

    ---

    Containerizes n8n, Redis, and supporting services. Makes local dev and production identical — no "works on my machine" surprises.

- :material-database: **Redis**

    ---

    In-memory data store for n8n's queue and job management. Keeps workflows responsive under load.

- :material-github: **GitHub Actions**

    ---

    CI/CD for this wiki and other repos. Builds and deploys on push.

</div>

## AI models

<div class="grid cards" markdown>

- :material-router-network: **OpenRouter**

    ---

    Unified API for routing requests to the LLMs below. One interface, one billing line, easy to swap models when better ones show up.

- :material-brain: **Qwen 3.7 Plus**

    ---

    Our primary author — drafts every daily broadcast and weekly / monthly report. Cost-effective and produces clean, structured HTML that plays well with the downstream editor.

- :material-alpha-c-circle: **Claude Haiku 4.5 (Anthropic)**

    ---

    Author fallback that kicks in when Qwen errors or stalls mid-response. Also the model behind the workflow-assembly assistant Chris uses to build and debug n8n nodes.

- :fontawesome-solid-check-double: **OpenAI GPT-5-mini**

    ---

    Runs a fact-check + editor pass on every draft: verifies claims against the source articles, tightens SEO, and generates the patches the publisher applies before the post goes live.

- :fontawesome-solid-rocket: **xAI Grok**

    ---

    Writes the Facebook and Instagram excerpts that go out with each published post. Handles the shorter, punchier social copy.

</div>

## Data sources

<div class="grid cards" markdown>

- :fontawesome-solid-rocket: **[Spaceflight News API](https://spaceflightnewsapi.net/){target="_blank" rel="noopener"}**

    ---

    Real-time aerospace news aggregation. Pulls articles, blogs, and reports from across the industry — structured and curated.

- :material-satellite: **[Launch Library 2 API](https://ll.thespacedevs.com/){target="_blank" rel="noopener"}**

    ---

    Launch schedules, vehicle information, and agency data. Maintained by The Space Devs — a volunteer community. Powers our launch tracking.

- :fontawesome-brands-x-twitter: **[Rettiwt-API](https://github.com/Rishikant181/Rettiwt-API){target="_blank" rel="noopener"}**

    ---

    The open-source Node.js library we wrap in a small VPS-side script to pull the latest posts from tracked official accounts (Rocket Lab, Blue Origin, CSA, NASA Administrator, and more) into daily tweet roundups. Cookie-authed via a burner X account, fully self-managed — no third-party API tier to graduate off of.

- :material-spider-web: **[Crawl4AI](https://github.com/unclecode/crawl4ai){target="_blank" rel="noopener"}**

    ---

    Open-source Python library for LLM-ready web scraping — a Playwright-backed headless browser with LLM-friendly markdown output. Every V3 blog workflow calls our `article_scraper.py` (a wrapper around Crawl4AI, run over SSH on the VPS) to fetch article content, metadata, and images. Handles JS-heavy sites, anti-bot blocks, and per-domain extraction rules cleanly.

- :material-cube-outline: **[CRW / fastCRW](https://github.com/us/crw){target="_blank" rel="noopener"}**

    ---

    Self-hosted Rust scraper with a Firecrawl-compatible REST API and automatic stealth-JavaScript injection (patches `navigator.webdriver`, mocks the Chrome runtime, populates plugin arrays). Deployed on the OVH VPS at `127.0.0.1:3010` alongside Chrome + LightPanda renderers. Handles cookie-wall Cloudflare and modern SPAs cleanly. Being rolled out to replace paid managed browsers on sources CRW can handle — the honest ceiling is Cloudflare Turnstile / Vercel Security Checkpoint, which no free tool bypasses in 2026.

- :material-monitor: **[Browserless.io](https://www.browserless.io/){target="_blank" rel="noopener"}**

    ---

    Managed headless-browser service. Historically used by the SpaceX Report V3 workflow for the `spacex.com/updates` and `starlink.com/updates` listing pages, and by the Space Daily article-body fetcher. Being migrated to self-hosted CRW where feasible (all three sources validated on CRW as of 2026-08-08), which drops paid-tier usage to near zero without sacrificing coverage.

- :material-earth-arrow-down: **[ScraperAPI](https://www.scraperapi.com/){target="_blank" rel="noopener"}**

    ---

    Managed scraping API with rotating residential proxies. Used by the Bright Blue Origin V3 workflow for `blueorigin.com/news` — the site is fronted by Vercel Security Checkpoint, which no self-hosted tool bypasses reliably. Two nodes hit `api.scraperapi.com` (one for the news-index listing, one for per-article scrapes). Kept deliberately; self-hosting isn't viable for this class of anti-bot.

- :material-book-open: **Wikipedia**

    ---

    Entity lookups, historical context, and fact verification. Always cited when we use it.

- :material-rss: **RSS feeds**

    ---

    SpaceQ and other aerospace outlets that publish an RSS feed. Simple, reliable, catches regional coverage other aggregators miss.

</div>

## Home-brew tools

<div class="grid cards" markdown>

- :material-github: **tcs-tools**

    ---

    Python package for article scraping, parsing, and deduplication. Lives in our GitHub org and handles data cleaning before it hits n8n.

- :material-script: **tcs-scripts**

    ---

    Per-workflow Python helpers: cost calculation, metadata generation, fact-checker prompts, and more.

- :material-image-multiple: **tcs-images**

    ---

    Image library for blog posts. Curated space photography, diagrams, and graphics — plus header graphics courtesy of Brian Carpenter and the [Retired For Life](https://www.youtube.com/@RetiredForLife) YouTube channel.

</div>

---

## How we handle sources

Every article on [thecanadian.space](https://thecanadian.space) links back to its original source. If we quote someone, we quote accurately. If we use data from an API, we credit it.

We don't republish entire articles — we summarize. Robo Chris reads the sources, n8n routes them to an LLM, and the LLM authors a summary that ties related stories together and adds a bit of context. You're always one click away from the original.

## Ethical scraping practices

When we scrape, we do it right:

- **Respect robots.txt** — if a site says "don't scrape," we don't.
- **Back off on 429s** — rate limits exist for a reason. We respect them.
- **Cache aggressively** — once we've scraped something, we cache it. Reduces load on source servers and speeds up our processing.
- **No PII** — we never scrape or store personal information.
- **Transparent user-agent** — our scraper identifies itself clearly so site operators know what's pulling their content.

!!! quote "Our philosophy on data"
    We're not here to commoditize information or circumvent publishers' wishes. We're here to synthesize signal from noise, give credit where it's due, and help aerospace enthusiasts stay informed. That means playing by the rules.

---

!!! info "Stack evolution"
    This list reflects our current setup. We've switched hosts, rotated LLMs, and added data sources over time. For notes on what changed and when, check the [History](../evolution/timeline.md).
