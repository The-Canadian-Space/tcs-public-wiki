# Where the news comes from

Your daily aerospace briefing starts as data: structured API responses, web articles, launch schedules, and Wikipedia entries. We pull from multiple sources, deduplicate ruthlessly, and attribute everything. Here's the full picture.

## Primary sources

<div class="grid cards" markdown>

- :fontawesome-solid-rocket: **SpaceFlightNews API (SNAPI)**
  
  Real-time aggregated news curated by aerospace industry experts. Covers commercial, government, and international space activity. Structured, reliable, and our bread and butter.

- :material-satellite: **Launch Library 2 API (LL2)**
  
  Comprehensive launch schedule and mission database maintained by The Space Devs, a volunteer community. Powers your launch countdowns and mission timelines.

- :material-book-open: **Wikipedia**
  
  Historical context, technical specifications, and fact-checking. When we mention a rocket's performance or a historical mission, Wikipedia is often where we verify it.

- :material-rss: **RSS feeds**
  
  Curated feeds from SpaceQ and other aerospace news outlets. Catches niche stories and regional coverage that broader aggregators miss.

</div>

## Custom scraping

<div class="grid cards" markdown>

- :material-spider-web: **Crawl4AI**
  
  Custom web scraper for sources without public APIs. Designed to be respectful: respects robots.txt, backs off on rate-limit responses, caches aggressively to avoid hammering servers.

</div>

## How we handle attribution

Every article published on *The Canadian Space* links back to its source. If we quote someone, we quote accurately. If we use data from an API, we credit it.

We don't republish entire articles—we synthesize. Robo Chris (our curator persona) reads the sources, n8n routes them to an LLM, and the LLM authors something new that connects the dots and provides analysis you won't find by reading the sources in isolation.

You're always one click away from the original.

## Ethical scraping practices

When we scrape, we do it right:

- **Respect robots.txt**: If a site says "don't scrape," we don't.
- **Back off on 429s**: Rate limits exist for a reason. We respect them.
- **Cache aggressively**: Once we've scraped something, we cache it. Reduces load on source servers and speeds up our processing.
- **No PII**: We never scrape or store personal information.
- **Transparent user-agent**: Our scraper identifies itself clearly so site operators know what's pulling their content.

!!! quote "Our philosophy on data"
    We're not here to commoditize information or circumvent publishers' wishes. We're here to synthesize signal from noise, give credit where it's due, and help aerospace enthusiasts stay informed. That means playing by the rules.

---

!!! info "Data pipeline"
    All data flows through n8n, where it's deduplicated, normalized, and routed to the right workflows. See [Infrastructure](infrastructure.md) for the full picture of how data moves through the system.
