---
date:
  created: 2026-07-12
categories:
  - Milestones
  - Infrastructure
tags:
  - launch
  - wiki
  - documentation
authors:
  - chris
---

# Public wiki, launched

For two years, we've been building *The Canadian Space* in the open. We publish our costs, share our architecture decisions, and tell you exactly which models are writing your daily briefing.

Today, we're making that transparency official with a public wiki.

## What's in here

This wiki is your behind-the-scenes tour of TCS: how we source news (SNAPI, Launch Library 2, custom scrapers), how we route it through n8n on a self-hosted VPS, which LLM models author your briefings, and why we made the choices we did.

You'll find:

- **[Technology](../../technology/index.md)** — Our full tech stack, infrastructure design, and data sources
- **[Evolution](../../evolution/timeline.md)** — A timeline from the first Daily Broadcast workflow to today
- **[Community](../../community/get-involved.md)** — How to get involved, contribute, or report issues

This is *not* a marketing site. It's a technical blog for people who want to understand how a transparent, AI-powered news operation actually works.

## What stayed on thecanadian.space

The blog itself—your daily aerospace briefing—stays at [thecanadian.space](https://thecanadian.space/). That's where Robo Chris and I publish news. This wiki is separate: it's the story of *how* we publish it.

## How updates land here

When we ship something big—a new data source, a workflow redesign, a cost optimization—we announce it here first. The archive grows chronologically, so you can follow the whole evolution as it happens.

## A note on human & AI collaboration

Every article on the blog starts with Robo Chris (our curator) pulling sources from APIs, then routes to an LLM (usually Gemini 2.5 Flash) for authorship, then lands on my desk for editorial review and publication. This wiki was written the same way: partly drafted by Claude, then reviewed and edited by me.

We believe AI is a force multiplier, not a replacement. And we're transparent about where the AI starts and stops.

---

Thanks for reading. Strap in—it's a good time to follow space.

**Chris Carpenter**  
Founder, *The Canadian Space*

P.S. — Have thoughts on what should be in this wiki, or spotted an error? Open an issue on [GitHub](https://github.com/The-Canadian-Space/tcs-public-wiki) or email [rustygear@hotmail.com](mailto:rustygear@hotmail.com).
