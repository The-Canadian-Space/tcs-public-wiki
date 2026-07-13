# Meet Robo Chris

There's a system running 24/7 at The Canadian Space that scans the internet for aerospace news, ranks stories by relevance, and proposes what you should read. It's not human. But it's not fully automated either. Meet **Robo Chris**—the curator persona that powers the discovery half of your daily briefing.

Robo Chris isn't a chatbot that talks to you. It's a backend system (really, a collection of n8n workflows and API calls) that does one job exceptionally well: **find the signal in the noise**. Every day, it ingests thousands of stories from SpaceFlightNews, Launch Library 2, Crawl4AI scrapers, and RSS feeds. It deduplicates, filters for relevance, weights by topic and newsworthiness, and ranks the top candidates. Then it hands the list to Chris (the human)—who reviews, reorders, and approves before anything gets written.

The name "Robo Chris" is partly tongue-in-cheek. It's AI doing the work a human curator *would* do—but it's not replacing the human. It's augmenting them. Chris still makes the final call on what matters.

!!! quote "The Robo Chris philosophy"
    AI is great at scale and pattern-matching. Humans are great at judgment and taste. The best journalism combines both.

## The curator system at work

**Robo Chris does:**
- Ingests feeds continuously (SNAPI, LL2, RSS, Crawl4AI)
- Deduplicates identical stories across sources
- Filters out noise using relevance heuristics
- Weights stories by topic (Canada angle? Commercial space? Scientific breakthrough?)
- Applies schedule gates (which stories fit today vs. this week vs. this month?)
- Ranks by fit and importance

**Chris (human) does:**
- Reviews the ranking each morning
- Reorders if something important got weighted wrong
- Adds manually-found stories if something was missed
- Approves the final list before drafting begins
- Catches bias or editorial missteps before they make it to print

## A transparent partnership

You can read more about Robo Chris's personality, philosophy, and quirks on the main blog. The mascot profile lives at:

[**Meet Robo Chris on thecanadian.space** :material-open-in-new:](https://thecanadian.space/meet-robo-chris/){: .md-button .md-button--primary }

That page dives deeper into the character, the thinking behind the system, and why we chose to be transparent about having AI in the editorial loop.

---

*Next: [Quality Assurance →](quality-assurance.md)*
