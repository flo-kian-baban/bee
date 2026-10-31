# B.E.E. Website: Instructions for Claude Code

## Security boundary

This project may access exactly one GitHub repository, `flo-kian-baban/bee`, and exactly one local folder, this project folder. Nothing else, for any reason.

- Never list, read, clone, search or query any other repository, organization or local folder.
- If a task seems to need something outside this boundary, stop and ask Kian.
- gstack skills (such as `/browse`) are not allowed in this project. For browser checks, use Playwright from this project.

`.claude/settings.json` enforces part of this. Claude Code's file tools (Read, Grep, Glob) cannot read outside this folder. Shell commands run in a sandbox: they cannot read `~/Development` (except this folder), `~/Desktop`, `~/Downloads`, `~/Documents` or `~/.claude/projects`, and they can write only here, to npm's cache and to Playwright's browser folder. Auto memory is off.

## Decision authority

Act without asking on anything inside this project folder and the `flo-kian-baban/bee` repository that is reversible and consistent with CLAUDE.md, DESIGN.md and CONTENT.md. That includes: editing files, running npm, npx, node and git, tests, builds, local commits, pushing milestone branches, opening pull requests, fixing failing checks, and unspecified design details such as spacing, timing and small layout calls. List those design decisions in the milestone report so Kian can veto them afterwards.

Ask first only for:
- anything outside this folder or the bee repository;
- secrets, credentials, accounts or payments;
- merging into `main`, force-pushing, rewriting history or deleting branches;
- adding a new dependency;
- changing security settings (`.claude/settings.json`, CSP, headers);
- anything irreversible.

Copy not in CONTENT.md: draft it, mark it [D], keep going, and list it in the report. Claim rules are never negotiable.

Stop only at the end of a milestone for Kian's review. Never stop mid-milestone for confirmation.

## What this is

The public marketing website for B.E.E. (Building Energy Engine), a building energy assessment platform that is still in development.
The site has two jobs: build credibility, and collect pilot program applications.
It is not the product. There is no login, dashboard, database or user account.

Read these before writing any code:
1. `DESIGN.md`: tokens, typography, components, motion. The single source of truth for visuals.
2. `CONTENT.md`: every word on the site, plus feature flags and pending items. The single source of truth for copy.
3. `reference/stitch-home-desktop.png`: layout reference only. Do not copy any text from it.

`AGENTS.md` holds Next.js's own guidance for AI coding agents; `next dev` writes it. If AGENTS.md and CLAUDE.md conflict, CLAUDE.md wins.

## Hard rules

1. **Copy comes from CONTENT.md.** All copy comes from `CONTENT.md`, moved into `content/site.ts`. If something needs copy that isn't there, draft it, mark it [D] in `CONTENT.md` and `TODO(copy)` in `content/site.ts`, and list it in your milestone report (see Decision authority).
2. **Claim rules.** Visible text must never contain:
   - accuracy, savings, cost or emissions-reduction figures;
   - compliance, certification or standard-conformance claims ("compliant", "certified", "ASHRAE Guideline 14", and similar);
   - "P.Eng", "sealed", "sealable" or "stamp" (P.Eng is a protected title in Ontario, and B.E.E. does not offer sealed engineering services);
   - "autonomous", "revolutionary", "guaranteed", "real-time", "telemetry" or "live";
   - invented client names, logos, testimonials, statistics, legal names, domains, addresses or phone numbers.

   Illustrative example panels may appear only in the Problem, How it works and Evidence chain sections, and each of those sections shows a small "Illustrative example" label. Their values may only be generic example data: equipment ratings, units, dates, masked account numbers, file names and formula errors. Never accuracy, savings, cost, emissions-reduction, compliance or statistical figures; no percentages; no real names, addresses or coordinates.
3. **No invented business details.** The legal name, contact email, LinkedIn URL and domain come from environment variables or `CONTENT.md`. If one is missing, hide that element; never fill it with a made-up value.
4. **Minimal dependencies.** Only the packages listed below. Ask before adding anything else.
5. **Do not reuse the Stitch `code.html`.** It contains claims that break rule 2, and prototype-only code: Tailwind loaded from a CDN, images hosted on Google, an icon font.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js, latest stable, App Router, TypeScript (strict mode). TypeScript stays on 6.x until typescript-eslint, which ESLint uses to read TypeScript, supports 7. |
| Node | 24, set in `.nvmrc`; `engines` in package.json sets it for Vercel |
| Styling | Tailwind CSS, latest stable, compiled at build time. Tokens are defined once as CSS variables in `styles/tokens.css`, taken from DESIGN.md. |
| Fonts | `next/font/google` (self-hosted at build time): Space Grotesk, Inter, JetBrains Mono |
| Icons | `lucide-react`, 1.5px stroke |
| Form | A Next.js route handler at `app/api/pilot/route.ts`. Input validated with `zod`. Spam protection: a honeypot field plus Cloudflare Turnstile. Email sent through Resend to `PILOT_INBOX`. |
| Analytics | Vercel Web Analytics (no cookies) |
| Hosting | Vercel, connected to the GitHub repo. `main` is production; every branch gets a preview deployment. Production stays `noindex` until launch is approved. |
| Tests | Playwright, `@axe-core/playwright`, Lighthouse CI |
| Lint | ESLint 9 with `eslint-config-next`, which does not support ESLint 10 yet |
| CI | GitHub Actions on every pull request (see Workflow) |
| Dependency updates | Dependabot, weekly, with minor and patch updates grouped |

Not allowed without approval: UI kits, CSS-in-JS, animation libraries (use CSS only), a CMS, databases, cookie-based trackers, external image hosts.

## Environment variables

| Variable | Purpose | Status |
|---|---|---|
| `RESEND_API_KEY` | Sends pilot applications by email | Pending (Kian) |
| `PILOT_INBOX` | Comma-separated addresses that receive applications | Pending (Kian) |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Spam protection | Pending (Kian) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email in the footer; hidden if empty | Pending (domain) |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn icon in the footer; hidden if empty | Pending |
| `NEXT_PUBLIC_LEGAL_NAME` | Copyright line; if empty, the brand name is used | Pending (incorporation) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph images | Pending (domain) |

## Structure

```
app/
  layout.tsx            fonts, metadata, Nav, Footer, analytics
  page.tsx              Home
  pilot/page.tsx        Pilot application
  privacy/page.tsx      Privacy policy (content pending legal review)
  not-found.tsx
  api/pilot/route.ts    form handler
  sitemap.ts, robots.ts, opengraph-image.tsx
components/             one component per section, plus primitives (Button, Badge, Panel, ValueTag, Field)
content/site.ts         all copy and feature flags, typed
styles/tokens.css       design tokens as CSS variables
public/brand/           logo files (SVG when supplied; the PNG placeholder until then)
tests/                  smoke, accessibility, claims, form; screenshots.spec.ts when Kian asks for screenshots
reports/m<N>/           screenshots Kian asked for, at 375, 768 and 1440px
.github/                CI workflow and Dependabot configuration
next.config.ts          security headers and the noindex header
```

## Key behaviours

- **Evidence chain (Home).** Seven steps that converge: 01 → 04; 02 → 05; 03, 04 and 05 → 06; then 06 → 07 (CONTENT.md, section 4).
  - From 1024px: seven pointy-top hexagon cells on a true honeycomb in three rows: 01 and 04 on top; 03, 06 and 07 in the middle; 02 and 05 below, with the top and bottom rows half a cell left of the middle one. Every connector points right, from a lower number to a higher one. 06 keeps a yellow hub outline. Cells are 272px wide and 80px apart at full size; from 1024 to 1440px the whole comb, text included, scales in proportion with its column.
  - Each cell holds its number and action word, title, text and value tag on one fixed grid, so the lines in each row of cells align. No separate detail panel.
  - Below 1024px: a vertical list in number order, its hexagon number badges on a dotted rail.
  - Flow (DESIGN.md, Motion), the site's only loop: the faint dotted connectors stay as the base, and a short train of glowing yellow dots crosses each one, moved by CSS transform keyframes only, at a linear pace, with no JavaScript per frame. Each 4.5-second cycle: 01→04, 02→05 and 03→06 together; then 04→06 and 05→06, and 06's outline brightens; then 06→07, and 07's outline brightens; then a rest. The list runs the same cycle down its rail.
  - The flow runs only while the section is on screen, and a "Pause animation" / "Play animation" button in the section header stops and restarts it.
  - Hovering, focusing or tapping a cell lights the cells and connectors upstream of it, without motion. Cells are buttons, in step order.
  - With reduced motion: no moving dots, static lines only, and no pause button.
- **Scroll motion.** Reveal, draw and tick (DESIGN.md, Motion) run once, as an element enters the viewport, driven by one shared IntersectionObserver in `components/Reveal.tsx`, which also runs the Evidence chain's flow only while it is in view. CSS only otherwise; no animation library. No infinite animations, and nothing moves for more than 5 seconds, except the Evidence chain's flow, which has a pause button. With reduced motion, every element shows its final state and nothing moves.
- **Hero.** A honeycomb built from the logo's hexagon geometry (inline SVG, yellow strokes at 4–6% opacity), with one soft radial yellow glow behind the headline. On desktop, a pointer-driven light brightens the cells around the pointer (DESIGN.md, Motion); on touch screens and with reduced motion, the honeycomb is static. No canvas, no particles, no looping animation.
- **Pilot form.** Validate on both the client and the server.
  - States: idle, submitting (button disabled), success (the form is replaced by the success message from CONTENT.md), error (the message from CONTENT.md, form data kept).
  - Never log form contents. Rate-limit by IP.
- **Feature flags** live in `content/site.ts`: `showTeam`, `showFaq`, `showLinkedIn`. All are `false` until Kian approves the pending content.

## Security headers

Set for every route in `next.config.ts`:
- `Content-Security-Policy` allowing only self, Vercel Analytics and Cloudflare Turnstile, with `frame-ancestors 'none'`;
- `Strict-Transport-Security`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `X-Content-Type-Options: nosniff`;
- `Permissions-Policy` disabling camera, microphone and geolocation.

Ask Kian before adding any other source to the policy. The smoke test fails if a header is missing or the policy names a host that is not allowed.

The policy allows inline scripts (`'unsafe-inline'`), because Next.js inlines the scripts that start each page and a nonce would make every page render per request. Kian approved this for this marketing site only. The future platform must use a strict nonce-based CSP.

## Workflow

- **Development:** run `npm run dev` and iterate with Kian on localhost. Merging still goes through a pull request.
- **Branches:** `main` is production. Work on one branch per milestone (`m1b-infra`, `m2-home`, `m3-evidence-chain`, ...), open a pull request, and let Vercel build its preview. Never push directly to `main`.
- **Merge gate:** a pull request's CI result and Vercel preview. Merge only when CI passes, the preview builds, and Kian approves.
- **CI:** GitHub Actions runs on every pull request: type check, ESLint, production build, and the Playwright smoke, axe and claims tests (`npm test`). From milestone 2, Lighthouse CI also runs against the pull request's Vercel preview URL, with the thresholds in the quality bar.
- **Dependabot:** weekly, with minor and patch updates grouped. Its pull requests also wait for Kian's approval.
- **Testing:**
  - While iterating on design, run nothing: Kian reviews on localhost.
  - Before each commit, run the type check, ESLint and the claims test only: `npm run typecheck`, `npm run lint` and `npx playwright test tests/claims.spec.ts --project=checks`, with `BASE_URL` set to the running dev server.
  - The full suite runs in CI on the pull request. Run it locally only to fix a CI failure.
  - No screenshots and no repeated proving runs unless Kian asks. Quarantine a flaky test with `test.fixme` and a `TODO(M<n>)` (below) instead of proving it. When Kian asks for screenshots, `MILESTONE=<N> npm run screenshots` saves them under `reports/m<N>/`.
- **Temporary test exceptions:** mark each with `TODO(M<n>)`, where `<n>` is the milestone that removes it. `tests/exceptions.spec.ts` fails on that milestone's branch while the exception remains, and from milestone 5 on it fails if any remain.

## Milestones

Each milestone ends with a pull request, its preview URL and a short report: what was built, `TODO(copy)` items and open issues. Stop and wait for Kian's review before starting the next one.

| # | Scope | Done when |
|---|---|---|
| 1 | Scaffold, tokens, fonts, Nav, Footer, 404 page, Vercel preview | The preview deploys; tokens match DESIGN.md exactly |
| 1b | Infrastructure: branch workflow, CI, security headers, Dependabot, report screenshots | CI passes on the pull request; Vercel builds its preview |
| 2 | All Home sections, static | Matches CONTENT.md word for word; responsive from 375px to 1440px |
| 3 | Evidence chain redesign: seven-cell honeycomb and its flow | Keyboard, touch and reduced-motion behaviour as specified |
| 4 | Pilot page and form handler, Privacy page shell | A test submission reaches `PILOT_INBOX`; spam protection works |
| 5 | QA: tests, Lighthouse, accessibility, SEO metadata, Open Graph image, sitemap | Every check in the quality bar passes, and no temporary test exception remains |

## Quality bar

| Check | Threshold |
|---|---|
| Lighthouse, mobile profile, on Home and Pilot | 95 or higher for Performance, Accessibility, Best Practices and SEO |
| Accessibility | WCAG 2.2 AA; zero axe violations |
| Core Web Vitals (lab) | LCP under 2.5s, CLS under 0.1, INP under 200ms |
| Keyboard | Every interactive element reachable, with a visible focus ring |
| Reduced motion | No animation runs while `prefers-reduced-motion: reduce` is set |
| Claims test | Playwright reads the visible text (`innerText`) of Home and Pilot. The test fails on any banned term in rule 2 (whole words, case-insensitive) or on the pattern `\d+\s?%` |
| Console | No errors or warnings in production builds |
| Layout | At 375, 768, 1024, 1280 and 1440px: no horizontal scroll, and no content outside its card or panel. Body text 16px or larger; tap targets 44px or larger |

## Do not launch until

These items are tracked in CONTENT.md under "Pending":
- domain chosen;
- privacy policy text approved by legal;
- the email inbox set;
- team consent obtained, or the team section kept hidden;
- final logo SVGs supplied.
