# Daily broadcast

Every morning (ET), a curated roundup of the most important aerospace news lands in your feed. That's the **Daily Broadcast**—your eyes and ears on the space industry, from missions and launches to commercial deals and international efforts.

## What you get

**5–10 stories**, carefully selected from thousands of daily news items, all stitched together into one coherent narrative. The stories range from breaking news (a rocket just launched, a satellite just imaged something cool) to analysis pieces (what does this commercial agreement mean for the industry?).

Each story includes:

- A headline and short description
- Context (what's the background? why does this matter?)
- A link to the original source
- Relevant images or data

The tone is second-person, conversational, and slightly nerdy—we assume you know what a rocket is, but we don't assume you follow every agency announcement.

## Publishing schedule

- **Time:** Mornings (usually 8–10 AM ET)
- **Frequency:** Daily (7 days a week)
- **Cadence:** Published immediately after the Wednesday curation and editor review

## Data sources

The Daily Broadcast draws from:

- **SpaceFlightNews API (SNAPI)** — professional aerospace journalism, often first to publish on industry news
- **Launch Library 2 (LL2)** — launch schedules, mission updates, orbital data
- **Crawl4AI scrapers** — targeted web scraping for niche outlets (space blogs, commercial operators, small agencies)
- **Curated RSS feeds** — industry blogs, government agencies, trade publications

Robo Chris deduplicates and ranks all stories by newsworthiness and relevance. The top 5–10 make the cut.

!!! info "Why so many sources?"
    No single source has everything. SpaceFlightNews focuses on commercial and scientific missions. Launch Library excels at schedule data. Some agencies publish only to RSS. The scrapers catch specialist blogs that other aggregators miss. By combining all four, we catch stories no single source would surface alone.

## The voice

The Daily Broadcast is **conversational and inclusive**. You don't need a PhD in astrodynamics to understand it. But we're not condescending. We give you the facts, the context, and the "so what?"—why this story matters to the bigger picture.

!!! example "Sample opening"
    **"Starship's test flight today marked the first time SpaceX landed the booster while catching it with the mechanical arms—a milestone that sounds small but actually represents years of engineering and billions in risk. Here's why that matters for the timeline to Mars."**

    Then we'd go into the technical what-happened, the historical context, the commercial implications, and the next milestones to watch.

## What gets included?

Stories make the cut if they:

- **Involve a launch, landing, or mission event** — active operations dominate the Daily Broadcast
- **Break new industry news** — contracts, partnerships, funding, regulatory changes
- **Advance the scientific mission** — discoveries, observations, data releases
- **Affect spaceflight operations** — weather, launch schedules, changes to existing plans
- **Have a Canada angle** — Canadian companies, missions, or personnel get a boost in the ranking

Stories that *don't* make the Daily Broadcast (but might appear in monthly deep dives):

- Historical anniversaries (unless it's a major milestone)
- Speculative opinion pieces (unless they're from authoritative sources)
- Duplicates (same news, second source—we pick one)
- Marketing posts (unless there's genuine news underneath)

## How it fits in the pipeline

The Daily Broadcast follows the standard editorial pipeline (see [The Editorial Pipeline →](../how-it-works/pipeline.md)):

1. Robo Chris ingests all sources continuously
2. Stories are deduplicated and ranked for the day's broadcast
3. The LLM author drafts a narrative that ties the stories together
4. The editor polishes the prose and fact-checks every claim
5. Chris reviews and approves (or asks for revisions)
6. WordPress publishes; social posts fire automatically

From curation to publication: typically **under 60 minutes**.

---

*Next: [Weekly Spotlights →](weekly-spotlights.md)*
