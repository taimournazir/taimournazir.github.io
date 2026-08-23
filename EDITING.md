# Editing this site

A plain-language guide to changing anything on **taimournazir.github.io**. You do
not need to know Astro. Almost everything is either a Markdown file you copy, or
one object you edit in a single data file.

Read the section you need and ignore the rest. The [cheat sheet](#cheat-sheet)
at the bottom is the 30-second version.

---

## 0. The mental model (read once)

There are only **three** places you ever edit:

| I want to... | Edit | Format |
|---|---|---|
| Add an investigation (lab / case study / detection) | a new file in `src/content/investigations/` | Markdown |
| Add a note (blog post / reference) | a new file in `src/content/notes/` | Markdown |
| Change who you are, projects, certs, "currently", toolkit, timeline | `src/data/profile.ts` | one edit |

Everything else — the layout, the section numbering, the styling, the nav — is
generated. You never touch it. If you add a third investigation the listing page
updates itself; if you add a cert it appears on the home page and the About page
automatically.

**The single source of truth for who you are is `src/data/profile.ts`.** No page
hardcodes your name, role, links, or any list. Change it once, it changes
everywhere.

---

## 1. Preview it locally before you publish

Open a terminal in the `portfolio-site` folder and run one of:

```
npx astro dev
```

This is the one to use while writing. It hot-reloads: save a file, the browser
updates instantly. Open **http://localhost:4321**. Stop it with `Ctrl+C`.

```
npx astro build
npx astro preview
```

`build` produces the final files in `dist/` (the exact files you upload).
`preview` serves that built copy at **http://localhost:4321** so you can check
the real thing before publishing.

> First time on a new machine: run `npm install` once inside `portfolio-site`
> first. If `npx` is not found, install Node.js (LTS) from nodejs.org.

---

## 2. Add an investigation

Investigations are the heart of the site — labs, case studies, and detections.

1. **Copy the template.** Duplicate `src/content/investigations/_TEMPLATE.md` and
   rename it. The filename becomes the URL, so use lowercase words joined by
   hyphens: `dcsync-detection.md` → `/investigations/dcsync-detection/`.
   (Leave `_TEMPLATE.md` alone — it never publishes because it is marked a draft.)

2. **Fill in the frontmatter** — the block between the two `---` lines at the top:

   ```yaml
   ---
   title: "Detecting DCSync with directory replication events"
   dek: "One sentence a reader takes away — shown under the title in the listing."
   date: 2026-08-20            # YYYY-MM-DD, always quoted-free in this format
   kind: detection            # lab | case study | detection  (pick exactly one)
   chain: "4662 replication grant → non-DC source → DRSUAPI pull → T1003.006"
   tags: ["detection engineering", "Active Directory"]
   attack: ["T1003.006"]      # ATT&CK technique IDs
   tools: ["Splunk", "Windows Security logs"]
   simulated: true            # true = lab/constructed;  false = real production work
   draft: true                # << MUST become false to publish. See step 4.
   ---
   ```

3. **Write the body** in normal Markdown below the closing `---`. Headings with
   `##`, bold with `**...**`, code blocks with triple backticks, lists with `-`.

4. **Publish it: change `draft: true` to `draft: false`.** While it says `true`
   the investigation is invisible on the live site (handy for work-in-progress).

### The `chain` field — the site's signature feature

`chain` is the one-line evidence path shown in monospace under the title. It is
what makes a detection scannable in two seconds. Rules:

- Use the real arrow character **`→`** between steps (copy it from here, or from
  any existing investigation). Not `->`.
- Every number or fact in the chain must appear in the body below. **Never put a
  figure in the chain you cannot point to in the write-up.**
- **End on the ATT&CK technique ID** (`T1003.006`, `T1558.003`, ...).
- **Omit `chain` entirely for a pure lab build-out** — a "here's my lab" post has
  no single evidence thread, so no chain. (See `home-soc-lab.md`: no chain.)

Good: `600 failed auth/hr → 200 targeted accounts → single source IP → T1110.003`

### `kind` decides the label

- `detection` — you built/tuned a rule.
- `case study` — you worked an incident end to end.
- `lab` — you built or documented environment/tooling.

### Fields you can skip

`chain`, `tags`, `attack`, `tools`, `hero`, and `updated` are all optional. The
required ones are `title`, `dek`, `date`, `kind`, and (to go live) `draft: false`.

---

## 3. Add a note (blog post or reference)

Notes are lighter than investigations — a blog post, a how-to, a reference sheet.

1. Copy `src/content/notes/_TEMPLATE.md`, rename it (`why-i-log-cold.md`).
2. Frontmatter:

   ```yaml
   ---
   title: "Why I hunt cold before looking up the answer"
   dek: "One sentence standfirst."
   date: 2026-08-20
   kind: post                 # post | reference
   tags: ["method"]
   draft: true                # << set false to publish
   ---
   ```
3. Write Markdown below. Set `draft: false` to publish.

> The **Notes** section only appears on the home page once at least one note is
> published. Until then it stays hidden on purpose — no empty section.

---

## 4. Add or edit a project

Projects live in the `projects` array in **`src/data/profile.ts`**. Copy an
existing block, paste it, and edit. Order in the file = order on the page.

```ts
{
  slug: 'dcsync-detection-suite',        // internal id, lowercase-hyphens, unique
  name: 'DCSync detection suite',
  stack: 'Splunk · Sysmon · Active Directory',   // shown as a subtitle
  state: 'Running',                       // free text: Running / Growing / In production use / etc.
  dek: 'One-line description of the project.',
  body: [
    'First paragraph. Each string in this array is its own paragraph.',
    'Second paragraph — add or remove strings to add or remove paragraphs.',
  ],
  link: '/investigations/dcsync-detection/', // internal path, external URL, or null
  linkLabel: 'Read the write-up',            // the link text, or null if link is null
},
```

To add a project with **no link**, set both `link: null` and `linkLabel: null`
(see the `ops-analytics` project for a live example).

---

## 5. Add a certification

`certs` array in `src/data/profile.ts`. One line each:

```ts
{ name: 'GIAC Certified Forensic Analyst', short: 'GCFA', issuer: 'GIAC / SANS', state: 'Earned' },
```

- `name` — full name.
- `short` — the badge label (kept tight: `GCIH`, `AWS Security`).
- `issuer` — who grants it.
- `state` — **exactly** `'Earned'` or `'In progress'` (drives the colour/dot).

Deliberately **no dates** — a viewer verifies on Credly instead. Keep it that way.

---

## 6. Update "currently working on"

`now` array in `src/data/profile.ts`. This is the "Currently" block on the home
page — keep it current, it's the freshness signal.

```ts
{
  label: 'AWS Security Specialty',
  detail: 'What you are actually doing on it, one or two sentences.',
  state: 'In progress',        // free text: In progress / Building / Ongoing / ...
},
```

---

## 7. Add an image

Put image files in **`src/assets/`**. Two ways to use one:

**A — inline in a write-up body** (auto-optimized, recommended for diagrams):

```markdown
![Describe the image for a screen reader — this is required](../../assets/dcsync-flow.svg)
```

The path `../../assets/...` is relative to the Markdown file in
`src/content/investigations/` or `src/content/notes/`. SVG, PNG, JPG all work.

**B — a wide lead image at the top of a write-up** — add `hero` to the frontmatter:

```yaml
hero: ../../assets/dcsync-flow.png
```

It renders full-width just under the title. Same folder, same relative path.

Rules:
- **Alt text is required** on inline images — the text in the `![...]` brackets.
  Describe what the image shows; don't write "image".
- Do **not** put images in `public/` for write-ups — that folder is pass-through
  and skips optimization. `src/assets/` is the right home.

---

## 8. Edit your identity / bio

The `identity` object at the top of `src/data/profile.ts`:

```ts
export const identity = {
  name: 'Taimour Nazir',
  role: 'Security analyst · blue team',
  location: 'New Jersey · NYC metro',
  linkedin: 'https://www.linkedin.com/in/taimournazir',   // CONFIRM this is your real URL
  github: 'https://github.com/taimournazir',
  credly: 'https://www.credly.com/users/taimour-nazir',   // CONFIRM this resolves
  headline: 'Every shift is triage.',
  lede: '...the paragraph under your name on the home page...',
  seo: '...the description search engines and link previews show...',
};
```

`status`, `toolkit`, and `timeline` (the About-page résumé blocks) are edited the
same way — find the array, copy a row, edit it.

> **Two links to confirm before you launch:** `linkedin` and `credly`. They look
> real but were never machine-verified (LinkedIn blocks bots). Open both in a
> browser and make sure they land on your profile. LinkedIn matters most — with
> public email off, it is currently your only contact path.

---

## 9. Turn on a public email address

Email is deliberately **off** right now, so every contact link points to
LinkedIn. To switch it on, change **one line** in `src/data/profile.ts`:

```ts
const publicEmail: string | null = null;
```

Set it to a real address you own:

```ts
const publicEmail: string | null = 'you@yourdomain.com';
```

Rebuild. All five contact links across the site switch from LinkedIn to a
`mailto:` automatically — nothing else to edit. (Don't invent a domain you don't
own; that's the bug this design fixed.)

---

## 10. Publish to GitHub Pages

The live site is served from the repo **`taimournazir/taimournazir.github.io`**.
`git` is not installed on this machine, so you upload through the GitHub web UI.
The click-by-click walkthrough is in **`../github/GITHUB_SETUP.md`** — the short
version:

1. **Build:** `npx astro build`. The upload-ready files are in `dist/`.
2. **First time only — delete the old site:** in the repo, remove the old Jekyll
   files `_config.yml`, `index.md`, and the old `README.md`. If you leave them,
   they fight the new site.
3. **Upload the _contents_ of `dist/`** (the files inside it), not the `dist`
   folder itself, to the root of the repo.
4. **`.nojekyll` is mandatory and easy to lose.** It is a hidden file at the top
   of `dist/`. Without it, GitHub runs Jekyll, deletes the `_astro/` folder, and
   **every bit of styling disappears.** Windows Explorer hides dotfiles, so if
   you drag the folder it gets silently skipped — confirm `.nojekyll` is in the
   repo after uploading. (`dist/.nojekyll` is created for you on every build.)
5. Give Pages a minute, then load **https://taimournazir.github.io**.

Tip: `scripts/package.ps1` builds the site and zips `dist/` for you in one step,
so you have a clean archive to drag from.

---

## 11. When something goes wrong

| Symptom | Cause | Fix |
|---|---|---|
| New post doesn't appear | still a draft | set `draft: false` |
| Build fails: "Expected type ... date" | wrong date format | use `YYYY-MM-DD`, e.g. `2026-08-20` |
| Build fails: "Invalid enum value" | typo in `kind` | investigations: `lab`/`case study`/`detection`; notes: `post`/`reference` |
| Build fails mentioning your file | broken frontmatter | check the two `---` fences are present and each `field:` has a value |
| Image doesn't show | wrong path | it's `../../assets/name.ext` from a content file; file really in `src/assets/`? |
| Styling gone on live site | `.nojekyll` missing in repo | re-upload `.nojekyll` to repo root (step 10.4) |
| Contact link goes to LinkedIn | email is off by design | set `publicEmail` (section 9) if you want mailto |
| Notes section missing on home | no published note yet | publish one note; it appears automatically |
| A cert shows wrong colour | wrong `state` string | must be exactly `'Earned'` or `'In progress'` |

If a build fails, read the **last few lines** of the error — Astro names the file
and the field. Fix that one thing and rebuild.

---

## 12. Keep it honest (the rules that make this site work)

This site's edge is credibility. Protect it:

- **Never invent a number.** Every figure in a `chain` must be traceable to the
  write-up body. Mark constructed/lab work `simulated: true` — the "simulated"
  banner is a feature, not a weakness.
- **Name your blind spots.** Every detection write-up should say what it *misses*
  and its false positives. That honesty is the differentiator.
- **Zero employer data. Ever.** No real site names, dashboards, internal tool
  names, ticket systems, dollar figures, headcounts, or coworker names. "Amazon"
  as a past employer in the timeline is fine; anything operational is not.
- **No badge walls or hacker clichés.** No shields.io badges, skill-icon grids,
  GitHub-stats cards, trophy widgets, neon-cyan/matrix/hooded-figure imagery, or
  emoji. The look is a quiet analyst's notebook — keep it that way. (The full
  design rationale is in `docs/DESIGN.md`; you don't need to edit anything there.)

---

## Cheat sheet

```
Preview while writing:   npx astro dev        → http://localhost:4321
Build for upload:        npx astro build      → files land in dist/

New investigation:  copy src/content/investigations/_TEMPLATE.md, edit, draft:false
New note/blog:      copy src/content/notes/_TEMPLATE.md, edit, draft:false
Project/cert/bio:   edit src/data/profile.ts (one file, everything about you)
Image:              drop in src/assets/, use ![alt](../../assets/file.svg)
Turn email on:      set publicEmail in src/data/profile.ts
Publish:            upload contents of dist/ (incl. .nojekyll) to the repo
```
