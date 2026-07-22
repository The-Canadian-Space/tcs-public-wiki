# The tech stack

Here's what actually powers TCS — not a marketing wish list, but the exact platforms, models, and APIs the site runs on today.

## Hosting & infrastructure

<div class="grid cards" markdown>

- :material-wordpress: **Bluehost**

    ---

    Web hosting for [thecanadian.space](https://thecanadian.space) (WordPress). The foundation for the blog: easy WordPress installation and reliable uptime.

- :fontawesome-solid-cloud: **Digital Ocean**

    ---

    VPS host running our n8n instance. Powers all automation 24/7 with predictable costs and full control.

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

    The backbone of TCS. Open-source workflow engine that pulls data, drafts articles, posts to WordPress + Facebook + Instagram, and handles scheduling. Self-hosted on Digital Ocean.

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

- :material-brain: **Qwen**

    ---

    Primary article author for daily broadcasts and monthly roundups. Produces clean, structured HTML output.

- :fontawesome-solid-wand-magic-sparkles: **DeepSeek**

    ---

    Backup author when Qwen is unavailable. Reliable, high-quality text generation.

- :fontawesome-solid-rocket: **xAI Grok**

    ---

    Social media caption writer for Facebook and Instagram excerpts. Adds a bit of personality to the shorter posts.

- :material-wrench: **Claude (Anthropic)**

    ---

    Primary workflow-assembly assistant. Helps write n8n node configs, debug expressions, and think through architecture. Not used for article authoring.

</div>

## Data sources

<div class="grid cards" markdown>

- :fontawesome-solid-rocket: **Spaceflight News API**

    ---

    Real-time aerospace news aggregation. Pulls articles, blogs, and reports from across the industry — structured and curated.

- :material-satellite: **Launch Library 2 API**

    ---

    Launch schedules, vehicle information, and agency data. Maintained by The Space Devs — a volunteer community. Powers our launch tracking.

- :fontawesome-brands-x-twitter: **Self-hosted X scraper**

    ---

    Custom Node.js scraper running on the VPS. Pulls the latest posts from tracked official accounts (Rocket Lab, Blue Origin, CSA, NASA Administrator, and more) into daily tweet roundups. Fully self-managed — no third-party API tier to graduate off of.

- :material-spider-web: **ScraperAPI**

    ---

    Clean HTML scraping when a source doesn't expose an RSS or API. Returns readable HTML for our parsers.

- :material-monitor: **Browserless**

    ---

    Headless browser service for scraping JavaScript-heavy pages — like interactive launch schedules that don't work with plain HTTP fetches.

- :material-image-outline: **ScrapingBee**

    ---

    Handy for grabbing images used in downstream image-manipulation workflows.

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
