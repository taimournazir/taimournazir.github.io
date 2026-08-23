# Editing Taimour's portfolio

This site is designed for editing entirely on GitHub.com. You do not need a local build or command line.

## The three places you edit

1. `_investigations/` contains one Markdown file per investigation.
2. `_notes/` contains one Markdown file per short post or reference.
3. `_data/content.yml` contains projects, certifications, the current-work list, timeline, and toolkit. Identity and links live in `_config.yml`.

GitHub Pages generates the HTML, lists, feed, sitemap, navigation, and styling. Do not edit generated output.

## Add an investigation

In GitHub, open `_investigations/_template.md`, choose **Copy raw file**, then create `_investigations/YYYY-MM-DD-short-name.md` and paste. The fields are:

- `title` (required): page and listing title.
- `description` (required): one-sentence takeaway and search description.
- `date` (required): exactly `YYYY-MM-DD`.
- `kind` (required): `lab`, `case study`, or `detection`.
- `chain` (optional): one evidence line; omit it for pure lab build-out posts.
- `tags`, `attack`, `tools` (optional): bracketed lists of quoted values.
- `simulated` (required): `true` for lab or constructed work; `false` only for genuinely non-simulated work that is safe to publish.
- `published` (required): only `published: true` makes it appear publicly.
- `hero` (optional): image path. If used, `hero_alt` is required; `hero_caption` is optional.

Anything whose `published` value is not exactly `true` is explicitly removed from the home/list pages, RSS feed, and sitemap.

## Add a note

Copy `_notes/_template.md` to `_notes/YYYY-MM-DD-short-name.md`. Use `title`, `description`, `date`, `kind` (`post` or `reference`), optional `tags`, optional `hero`, required `hero_alt` when there is a hero, and `published`. Change `published: false` to `published: true` only when ready.

## Write a good chain line

Use real arrow characters (`→`) between steps. End on a MITRE ATT&CK technique ID. Every figure must be traceable to the article body. The line should be readable in two seconds.

Good examples:

```yaml
chain: "repeated failures → accounts targeted across one interval → common source → T1110.003"
chain: "script-block event → encoded command decoded → child process correlated → T1059.001"
```

Counter-example:

```yaml
chain: "Lots of suspicious traffic -> probably an attacker"
```

The counter-example uses the wrong arrow, offers no evidence path, and does not end in a technique ID. Pure lab build-out posts should omit `chain` entirely.

## Update the standing content

Open `_data/content.yml`.

- Project: copy one complete block under `projects:` beginning with `- title:` and edit `title`, `status`, `tools`, and `text`.
- Certification: copy one line under either `certifications: earned:` or `certifications: in_progress:`. Do not add dates.
- Current work: copy one complete block under `currently:` beginning with `- title:` and edit `title` and `text`.

Keep indentation exactly as shown. Use spaces, not tabs.

## Add an image

Upload images into `assets/img/`. In a post body, use:

```markdown
![Meaningful description of what the image shows](/assets/img/your-file.png)
```

For a wide lead image, use these front-matter fields:

```yaml
hero: /assets/img/your-file.png
hero_alt: "Meaningful description of what the image shows."
hero_caption: "Optional context or provenance."
```

Alt text is required. The worked example at `_investigations/example-format.md` uses `assets/img/example-topology.svg` and proves this path end to end.

## Edit bio, links, and identity

Open `_config.yml`. This is the single identity/config file. Verify `linkedin` and `credly` before launch. The `github`, title, description, and site URL are there too. GitHub Pages may require a new build after config changes.

## Turn on public email later

Change this one line in `_config.yml`:

```yaml
email: "you@example.com"
```

When `email` is empty, every contact link falls back to LinkedIn. When it has a value, contact links become email links. Also update `contact_label` if you want the visible wording to say “Email me.”

## Preview safely in the browser

Create a branch in GitHub before editing. Commit changes to that branch, then open a pull request. In the pull request, open **Checks** and look for the Pages/Jekyll build. A green check means the build succeeded. A red X means it failed; open that check and expand the failed step to see the filename and line near the error. A successful check validates the build but does not publish the branch. Merge only after reviewing the changed files and check result.

## Troubleshooting

| Problem | Check |
|---|---|
| Post not appearing | Confirm the file is in the correct collection, has a valid date, and says exactly `published: true`. |
| Wrong date format | Use `YYYY-MM-DD`, for example `2026-08-20`. |
| Broken front matter | The file must begin and end its front matter with a line containing only `---`; preserve spaces and quotes. |
| Image not loading | Confirm the file is in `assets/img/`, capitalization matches, and the path starts `/assets/img/`. |
| Build failed | Open the failed Pages check, find the first error, and inspect the named file and line. YAML indentation and unmatched quotes are common causes. |
| Styling missing | Confirm `_config.yml` has `baseurl: ""` and `assets/css/main.css` still exists. |

## Keep it honest

Publish no employer-internal information. Naming the employer and describing the role generically is enough. Mark lab and constructed work with `simulated: true`. Never invent figures, identifiers, logs, hostnames, or metrics. Every detection must explain what it misses and its false positives. Do not add claims you could not defend in an interview.

## Five-operation cheat sheet

1. Publish an investigation: copy `_investigations/_template.md`, write it, set `published: true`.
2. Publish a note: copy `_notes/_template.md`, write it, set `published: true`.
3. Update current work: edit `currently:` in `_data/content.yml`.
4. Add an image: upload to `assets/img/`, then use `/assets/img/filename` plus meaningful alt text.
5. Change identity or contact: edit `_config.yml`; leave `email` empty for LinkedIn fallback.
