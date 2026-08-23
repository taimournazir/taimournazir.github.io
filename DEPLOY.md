# Deploying

**Superseded.** This site is hosted on GitHub Pages as a user site at
<https://taimournazir.github.io>, uploaded through the GitHub website with no git
install required.

The current, click-by-click instructions live one level up:

**[`../github/GITHUB_SETUP.md`](../github/GITHUB_SETUP.md)**

That file covers both repos (`taimournazir` for the profile README,
`taimournazir.github.io` for the site), the `.nojekyll` gotcha that silently strips
all styling if missed, Pages settings, a post-deploy verification checklist, and how
to push updates later.

## What changed and why

The original plan was Cloudflare Pages on a custom domain (`taimournazir.com`). That
was dropped in favour of GitHub, which is the better fit for a security portfolio:
the write-ups and the code that produced them sit in the same place a hiring manager
is already looking, and there is no domain to buy or renew.

Two consequences worth knowing:

- `astro.config.mjs` now sets `site: 'https://taimournazir.github.io'`. Because the
  repo is named `<user>.github.io`, the site serves from the domain root and needs no
  `base` path. Moving to a project repo later would require adding one.
- `robots.txt` used to be a static file in `public/` with the old domain hardcoded,
  which silently survived the switch. It is now generated at
  `src/pages/robots.txt.ts` and derives the sitemap URL from `site`, so it cannot
  drift again.

## The automated path, for later

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. It is
correct and ready but unused, because git is not installed on this machine. After
`winget install --id Git.Git -e` you can push source instead of built output and the
manual upload loop goes away.
