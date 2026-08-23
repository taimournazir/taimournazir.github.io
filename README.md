# taimournazir.com — personal site

Static site built with [Astro](https://astro.build). No database, no server, no CMS.
Write-ups are Markdown files; everything else is a small set of `.astro` pages.

## Run it

```bash
bun install       # once
bun run dev       # http://localhost:4321 with live reload
bun run build     # production build into dist/
bun run preview   # serve the built dist/ locally
```

## Add a write-up

Create `src/content/writeups/my-slug.md`. The filename becomes the URL:
`/writeups/my-slug/`. Frontmatter:

```yaml
---
title: "Detecting X when Y looks normal"
dek: "One sentence that makes someone want to read it. Shows on the index and in link previews."
date: 2026-08-20
kind: detection          # lab | case study | detection | note
tags: ["detection engineering", "authentication"]
tools: ["Splunk", "Sysmon"]
attack: ["T1110.003"]    # MITRE technique IDs, rendered as chips
simulated: true          # true = shows the Provenance banner. Keep it honest.
draft: false             # true = excluded from the site and the RSS feed
---
```

Then write Markdown. Fenced code blocks get syntax highlighting — use the language
tag (` ```spl `, ` ```kusto `, ` ```powershell `).

`simulated: true` renders a provenance note derived from `kind` (see `src/lib/format.ts`).
Leave it on for anything from a lab or a constructed scenario. That honesty is a
feature: hiring managers notice when a portfolio distinguishes lab work from
production work, and they *really* notice when it doesn't.

## Change facts about yourself

Everything — status, current focus, certifications, projects, toolkit, timeline,
contact links — lives in **`src/data/profile.ts`**. Pages read from it. Edit there
and every page updates.

## Regenerate the social share card

`public/og.png` (1200x630) is what LinkedIn and Slack show when the link is shared.
It was rendered from an HTML card so it uses the real site fonts. To change it, edit
the card markup in `docs/og-card.html`, serve it, and screenshot at exactly 1200x630.

## Structure

```
src/
  content/writeups/*.md    the write-ups (the part you'll touch weekly)
  data/profile.ts          all facts about you, in one file
  pages/                   routes: /, /about, /projects, /writeups, /rss.xml, 404
  layouts/Base.astro       <head>, fonts, SEO/OG tags, header + footer
  components/              header, footer, section frame, write-up row
  styles/global.css        the whole design system (colours, type, spacing)
  lib/format.ts            date formatting + provenance text
public/                    favicon, og.png, robots.txt — copied verbatim
```

## Design notes

Light "ink on warm paper" editorial direction, one signal accent (`--signal`, a burnt
orange) used only for section markers, kinds, and hover states. Hairline rules instead
of cards. Dark mode is automatic via `prefers-color-scheme`. Fonts: Fraunces (display),
Instrument Sans (body), JetBrains Mono (labels and code).

If you change one thing, change `--signal` in `src/styles/global.css` — it recolours the
whole site's accent in one line.
