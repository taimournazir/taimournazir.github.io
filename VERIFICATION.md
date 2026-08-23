# Site Verification Report

**Date:** 2026-08-15  
**Verifier:** SiteVerifier (sub-agent)  
**Build tool:** Astro 7.2.x via `bun run build`

## Results

| # | Check | Result | Detail |
|---|-------|--------|--------|
| 1 | Build exits 0, 8 pages | ✅ PASS | `8 page(s) built in 1.96s` — zero warnings, zero errors |
| 2 | All file references resolve | ✅ PASS | All `.astro`/`.ts`/`.js` imports exist; `public/og.png`, `public/favicon.svg`, `public/robots.txt` present; glob base `./src/content/writeups` contains 3 `.md` files |
| 3 | Identity URLs only in profile.ts | ✅ PASS | No `linkedin.com`, `github.com`, `credly.com` URL or email address appears outside `src/data/profile.ts`. Note: the *name* "Taimour Nazir" is used inline in 6 other files (Base.astro title suffix, RSS link title, SiteHeader brand, SiteFooter copyright, page descriptions) — acceptable for static metadata strings that import the module for URLs/email but inline the name in templates |
| 4 | Writeup frontmatter matches zod schema | ✅ PASS | All 3 files supply `title`, `dek`, `date`, valid `kind` enum (`lab` / `case study` / `detection`), `tags` and `attack` as arrays, `tools` as array, `simulated: true` |
| 5a | Each page: 1xh1, title, meta desc, og:image, canonical | ✅ PASS | Confirmed on all 8 built HTML files |
| 5b | `dist/rss.xml` valid XML, 3 items | ✅ PASS | Well-formed RSS 2.0 with 3 `<item>` elements (slow-password-spray, quarter-close, home-soc-lab) |
| 5c | `dist/sitemap-index.xml` exists | ✅ PASS | Present, references `sitemap-0.xml` |
| 6a | No `<a>` with empty text | ✅ PASS | None found |
| 6b | No `<img>` without `alt` | ✅ PASS | No `<img>` elements in the build at all (text-only site) |
| 6c | No unlabelled form controls | ✅ PASS | No `<input>`, `<select>`, or `<textarea>` in output |
| 6d | Skip link is first focusable element | ✅ PASS | `<a class="skip" href="#main">Skip to content</a>` immediately after `<body>` on all pages |
| 7 | OPSEC — no Amazon internal identifiers | ✅ PASS | Searched `src/`, `public/`, `docs/`, `README.md`, `DEPLOY.md` for: LGA9, ORF3, TimeHub, Cadence, EILO, Oculus, ntaimou, @amazon.com, and known LDAPs. Zero matches. |

## Defects found

**None.**

The site builds cleanly, all schema contracts are satisfied, accessibility basics are covered, SEO metadata is complete on every page, and no internal Amazon identifiers leak into any source or output file.

## Observations (not defects — no action taken)

1. **`profile.ts` TODO comment (line 5-7):** "CONFIRM: use the address you actually want public" on email, LinkedIn, GitHub, Credly. These are placeholder-looking values that may or may not be real — owner should verify before deploy.
2. **Name not fully centralized:** "Taimour Nazir" appears as a literal string in 6 files beyond `profile.ts`. This is cosmetic (they could reference `identity.name`) but not a defect — it is common in Astro sites for static title/description props.
3. **`fmtDate` off-by-one display:** Rendered dates show one day earlier than frontmatter (e.g. `date: 2026-08-11` renders as "Aug 10, 2026"). This is a UTC-vs-local formatting nuance in `coerce.date()` — not a build failure, but worth knowing before publish.
## Post-verification fix (2026-08-15)

Observation 3 was treated as a real defect, not a nuance, and fixed. Both
`Intl.DateTimeFormat` instances in `src/lib/format.ts` are now pinned to
`timeZone: 'UTC'`, so authored frontmatter dates render exactly as written
regardless of the build machine's timezone.

Re-verified after a clean rebuild:

| Authored | Rendered (index + article) | RSS `pubDate` |
|---|---|---|
| `2026-07-28` | Jul 28, 2026 | Tue, 28 Jul 2026 00:00:00 GMT |
| `2026-08-04` | Aug 4, 2026 | Tue, 04 Aug 2026 00:00:00 GMT |
| `2026-08-11` | Aug 11, 2026 | Tue, 11 Aug 2026 00:00:00 GMT |

Build after the fix: 8 pages, exit 0, no warnings.

Observations 1 and 2 stand. Observation 1 is owner action (see `DEPLOY.md`);
observation 2 is intentional — the name is a static template string, not a
fact that changes.
