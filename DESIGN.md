---
name: B.E.E. Design System (website v1)
source: reference/stitch/code.html
colors:
  bg: '#111112'
  bg-alt: '#0B0B0C'
  card-low: '#161618'
  card: '#1C1C1F'
  divider: '#2E2E33'
  edge: 'rgba(255,255,255,0.1)'
  chip: '#27272A'
  chip-border: '#3F3F46'
  control-border: '#6B6B70'
  text: '#FFFFFF'
  text-body: '#E4E4E7'
  text-soft: '#D4D4D8'
  text-secondary: '#A1A1AA'
  brand: '#F0EA0E'
  brand-hover: '#D9D30A'
  on-brand: '#161500'
  success: '#4ADE80'
  warning: '#FB923C'
  error: '#F87171'
fonts:
  display: Space Grotesk
  body: Inter
  mono: JetBrains Mono
radius:
  tag: 4px
  chip: 6px
  tile: 8px
  container: 12px
  card: 16px
spacing-base: 4px
---

# B.E.E. Design System (website v1)

## Source

The Stitch export, `reference/stitch/code.html`, is the visual and motion source of truth for Home. The values below come from it: its Tailwind config, its classes (read as the Tailwind v3 defaults it loads) and its hero script. Each section's layout also comes from the export; this file holds the tokens, the components and the motion.

Where a Stitch value would break a rule in CLAUDE.md or CONTENT.md, the rule wins, and this file says what is used instead. Those rules cover contrast, text size, tap targets, claims, looping animation, canvas and particles, icon fonts and invented content. Never copy the export's markup or its text.

## What the brand is

B.E.E. turns site inspections, photos, equipment records and utility bills into traceable engineering assessments that qualified people review.
The visual metaphor is **a field instrument with an audit trail**: precise, calm, evidence-first.

B.E.E. is **not** a real-time monitoring or building-automation product. Do not use telemetry, control-room, live-data or sensor-stream imagery or language.

## Colours

Ratios are measured (WCAG 2.x).

| Token | Value | Use | On bg | On bg-alt | On card-low | On card |
|---|---|---|---|---|---|---|
| bg | #111112 | Page background: hero, How it works, Principles, Team | n/a | n/a | n/a | n/a |
| bg-alt | #0B0B0C | Problem, Evidence chain, Buildings and Pilot sections; footer; panels inside cards | n/a | n/a | n/a | n/a |
| card-low | #161618 | Problem and How it works cards; icon tiles; status chips | n/a | n/a | n/a | n/a |
| card | #1C1C1F | Evidence nodes, principles, building tiles, Team and pilot cards; badge; secondary button | n/a | n/a | n/a | n/a |
| divider | #2E2E33 | Borders of cards, sections and the nav; secondary button border | 1.40 | 1.46 | 1.34 | 1.26 |
| edge | white at 10% | Borders of How it works cards, evidence nodes and the pilot card | 1.30 | 1.25 | 1.31 | 1.35 |
| chip | #27272A | Chip fill | n/a | n/a | n/a | n/a |
| chip-border | #3F3F46 | Chip border; Evidence chain connectors off the trail | 1.81 | 1.88 | 1.73 | 1.63 |
| control-border | #6B6B70 | Input, checkbox and select borders, which need 3:1. Not in Stitch, which has no form. | 3.56 | 3.71 | 3.41 | 3.21 |
| text | #FFFFFF | Headings, card titles, button labels | 18.87 | 19.67 | 18.07 | 17.00 |
| text-body | #E4E4E7 | Default text colour | 14.87 | 15.50 | 14.24 | 13.40 |
| text-soft | #D4D4D8 | Badge, values inside panels, chip text (10.08 on chip) | 12.77 | 13.31 | 12.23 | 11.50 |
| text-secondary | #A1A1AA | Descriptions, supporting text, eyebrows, nav and footer links (5.81 on chip) | 7.36 | 7.68 | 7.05 | 6.63 |
| brand | #F0EA0E | Primary buttons, highlighted words, active and selected states, focus ring, honeycomb | 14.81 | 15.44 | 14.18 | 13.34 |
| brand-hover | #D9D30A | Primary button hover | n/a | n/a | n/a | n/a |
| on-brand | #161500 | Text on brand fills: 14.44 on brand, 11.63 on brand-hover | n/a | n/a | n/a | n/a |
| success | #4ADE80 | Form success state; the "Captured" status in How it works. Not in Stitch. | 10.83 | 11.29 | 10.37 | 9.76 |
| warning | #FB923C | Warning statuses in example panels, always with an icon or a dashed mark, and text; never brand yellow. Not in Stitch. | 8.34 | 8.69 | 7.98 | 7.51 |
| error | #F87171 | Form errors; error statuses in example panels, always with an icon and text. Not in Stitch. | 6.82 | 7.11 | 6.53 | 6.15 |

Opacity steps Stitch uses:
- divider at 70% (borders of sections, the nav and card headers) and 60% (the footer's bottom row, rows inside panels);
- brand at 50% (card borders on hover), 40% (borders on hover for principles, building tiles, Team and pilot cards), 20% (text selection, with brand text) and 5% (glows);
- bg at 80% (nav), card at 90% (badge) and 80% (secondary button), card-low at 90% (Problem cards).

Not used from Stitch:
- Its dimmest grey text, #71717A: 3.52 to 4.07:1, below the 4.5:1 that AA requires. That text uses text-secondary.
- The red and amber of the statuses in its Problem panels. Example panels use the error and warning tokens instead, always with an icon or a dashed mark, and text.
- The colours its config defines but its page never uses.

Rules:
- Yellow is the brand colour, not a status colour.
- On any light background, yellow is allowed only as a fill behind on-brand text. Yellow text or lines on white measure 1.27:1.
- Never convey meaning with colour alone. Every status shows a text label or an icon too.
- No colours outside this table.

## Typography

Fonts: Space Grotesk for display, headings, card titles and buttons; Inter for text, links and the badge; JetBrains Mono for labels. Stitch sets its mono text in the system stack (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`). This site keeps JetBrains Mono, from the CLAUDE.md stack, so labels look the same on every platform.

Sizes are px, as size/line height. Where a style changes with width, the later columns apply from that width up.

| Style | Font | Base | From 640px | From 1024px | Weight | Tracking | Use |
|---|---|---|---|---|---|---|---|
| display | Space Grotesk | 36/40.32 | 60/60 | 68/68 | 600 | −0.025em | Hero headline |
| h2-lg | Space Grotesk | 30/36 | 48/48 | | 500 | −0.025em | Problem and How it works headings |
| h2 | Space Grotesk | 30/36 | 36/40 | | 500 | −0.025em | Other section headings |
| h3 | Space Grotesk | 24/32 | | | 500 | 0 | How it works and Team card titles |
| numeral | Space Grotesk | 36/40 | | | 700 | −0.025em | How it works step numbers |
| title | Space Grotesk | 18/28 | | | 500 | 0 | Principles; Evidence chain step titles in the list below 1024px |
| cell | Space Grotesk | 16/22 | | | 500 | 0 | Evidence chain step titles in the comb, one line |
| tile | Space Grotesk | 16/24 | 18/28 | | 500 | 0 | Building tiles |
| body-lg | Inter | 16/26 | 18/28 | | 400 | 0 | Hero subtext |
| lead | Inter | 18/28 | | | 400 | 0 | Section leads |
| body | Inter | 16/26 | | | 400 | 0 | Every paragraph |
| base | Inter | 16/24 | | | 400 | 0 | Default for text with no style |
| small | Inter | 14/20 | | | 400; 500 when active | 0 | Nav and footer links |
| badge | Inter | 14/20 | | | 400 | 0.025em | Hero badge (Stitch: 12/16) |
| button | Space Grotesk | 14/20 | | | 600 primary, 400 secondary | 0 | Buttons (Stitch: the nav button at 12/16 below 640px) |
| label | JetBrains Mono | 12/16 | | | 400; 500 for the How it works eyebrow, Problem card titles and step numbers | 0.1em, uppercase | Eyebrows, card and panel labels, chips, value tags, the footer's bottom row |

- Paragraphs are 16px or larger (CLAUDE.md quality bar). Stitch sets card text at 14/22.75, and at 12px in the evidence nodes; here every paragraph is body, 16/26.
- One exception: the Evidence chain's comb scales whole with its column, text included, so between 1024 and 1247px its type is smaller than these sizes, down to 0.81 of them at 1024px, where body text renders at about 13px (Components, Evidence chain).
- 12px is for uppercase mono labels only. Other text, such as links, buttons and the badge, is 14px or larger. Stitch's panel details at 9–11px become labels at 12/16 where they are uppercase, and small type at 14/20 otherwise.
- Use `font-variant-numeric: tabular-nums` on numeric text only (values, counts, dates), never on running text: in Inter it also widens the hyphen.

## Layout and spacing

- Spacing: a 4px base. Stitch uses 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112 and 128.
- Breakpoints: 640px, 768px and 1024px.
- Content widths: 1280px (Problem; How it works; the nav and footer, whose logo and button line up with this column), 1152px (Evidence chain, Buildings, Team, Pilot), 896px (Principles; the hero headline), 768px (the hero subtext), 672px (the Pilot text).
- Side padding: 24px, and 48px from 1024px, on sections, the nav and the footer alike.
- Section padding, top and bottom, at every width: hero 96px (128px from 640 to 767px); Problem 96px; How it works, Evidence chain, Principles, Buildings and Team 112px; Pilot 80px; footer 64px.
- Nav height: 80px.
- Hero height: on phones, its content's. From 768px, at least 90% of the screen below the nav (`svh` units), never under 560px or over 880px, with its content centred vertically, so the top of the Problem section shows below it. Its 96px padding is then the least space above and below the content.
- Hero headline: from 1024px it breaks after "Every Building.", so the second line reads "Better Energy Intelligence."; below that it wraps by itself, balanced.
- From a section header to its content: 48px (Problem, Evidence chain, Buildings, Team), 56px (How it works), 40px (Principles).
- Grid gaps: 24px (Problem; from 1024px, 120px between the columns and 88px between the rows, around the hub; Components, Problem card), 32px (How it works, Team), 16px (Principles), 20px (Buildings). The Evidence chain's cells are 272px wide and 80px apart at full size (Components, Evidence chain).
- Card padding: 24px, 28px from 1024px (Problem); 28px (How it works); 24px (principles, building tiles); 32px (Team); 40px, 56px from 768px (pilot card). Panels inside cards: 16px; 20px in the Site photos viewfinder, as in Stitch.
- From 1024 to 1279px, where its three cards are narrowest, How it works takes 20px at the sides of its cards and 12px at the sides of their panels, so the Optimize table fits. From 1280px it is back to 28px and 16px.
- Tap targets: 44px or larger (CLAUDE.md), so the nav button is 44px tall where Stitch has 36–40px.

## Shape and depth

| Radius | Value | Stitch | Use |
|---|---|---|---|
| tag | 4px | `rounded` | Chips, value tags, rows inside panels |
| chip | 6px | `rounded-md` | The "Illustrative example" label |
| tile | 8px | `rounded-lg` | Icon tiles, the nav button, status chips |
| container | 12px | `rounded-xl` | Buttons, panels inside cards, principles, building tiles, form fields |
| card | 16px | `rounded-2xl` | Problem, How it works, Team and pilot cards |
| full | | `rounded-full` | Badge, dots |

Borders are 1px: divider (often at 70%), or edge on How it works cards, Evidence chain cells and the pilot card.

| Shadow | Value | Use |
|---|---|---|
| shadow-sm | 0 1px 2px 0 rgb(0 0 0 / 0.05) | Badge, secondary button, icon tiles |
| shadow-md | 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) | Problem closing banner |
| shadow-lg | 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) | Problem cards |
| shadow-xl | 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) | How it works cards |
| shadow-2xl | 0 25px 50px -12px rgb(0 0 0 / 0.25) | Pilot card |
| shadow-card-hover | 0 8px 30px rgb(0 0 0 / 0.6) | Problem cards on hover |
| shadow-card-hover-soft | 0 8px 30px rgb(0 0 0 / 0.5) | How it works cards on hover |
| shadow-glow-sm | 0 0 20px rgb(240 234 14 / 0.18); hover 0 0 25px rgb(240 234 14 / 0.32) | Nav button |
| shadow-glow | 0 0 24px rgb(240 234 14 / 0.22); hover 0 0 32px rgb(240 234 14 / 0.38) | Hero primary button |
| shadow-glow-lg | 0 0 24px rgb(240 234 14 / 0.2); hover 0 0 36px rgb(240 234 14 / 0.4) | Pilot button |

Glows:
- Hero: a 700 × 360px ellipse of brand at 5%, blurred 120px, centred on the headline, so it stays behind it at any hero height.
- Highlighted headline words: a drop shadow, 0 0 28px rgb(240 234 14 / 0.3).
- Pilot card: a 288px circle of brand at 5%, blurred 90px, 40px in from the top right; and along the top edge a 2px line, `linear-gradient(90deg, transparent, rgb(240 234 14 / 0.3), transparent)` at 90% opacity.
- Hero light: see Motion.
- Evidence chain flow: each dot glows 8px, brand at 60%. An outline the flow lights is 2px of brand with the hero light's glow, 0 0 12px brand at 40%.

Backdrop blur: 24px behind the nav; 12px behind the badge and the secondary button.

## Motion

- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-standard) on every transition and on draw. Reveal and tick use `cubic-bezier(0, 0, 0.2, 1)` (ease-out), its decelerating half.
- Only colour, background, border colour, box-shadow, opacity, transform and stroke-dashoffset change.

| Token | Timing | What changes | When |
|---|---|---|---|
| hover | 150ms for links, icons and the nav button; 200ms for buttons, cards and tiles | Colour, border colour, box-shadow; building tiles also rise 4px | While hovered |
| reveal | 400ms, ease-out; 60ms stagger | Opacity 0 → 1 and translateY 12px → 0 | Once, as an element enters the viewport |
| draw | 800ms, ease-standard | stroke-dashoffset to 0 | Once, as a line enters the viewport |
| tick | 200ms, ease-out; the first 400ms after its list enters, then 300ms apart | A dashed circle gives way to a check and "Captured" | Once, as the Capture list enters the viewport |
| hub flow | Each connector's leg takes 800ms, linear, card by card 400ms apart; the hexagon lights as the last dots reach it, over 250ms, holds 350ms and settles over 700ms to 40%, ease-standard. Below 1024px, a rail stretch takes 1.2s, and the stub into the hexagon 500ms after it. About 3.1s in all | A train of three dots crosses each connector into the hub; the hexagon's outline lights, then keeps a soft glow | Once, as the hub enters the viewport; below 1024px, as each stretch of the rail does. Hovering over a card replays its own connector |
| flow | A 4.5s cycle. Each connector's leg takes 1s, linear, and legs start 1.15s apart; a step lights over 250ms, holds 350ms and fades over 700ms, ease-standard | A train of three dots crosses each connector; 06 and 07 light as the dots reach them | In a loop, only while the Evidence chain is in view and not paused |

- **Hover:** card borders turn brand at 50% (40% on principles, building tiles, Team and pilot cards, as in Stitch); icons not already in brand turn brand; Problem and How it works cards deepen their shadow; building tiles rise 4px.
- **Reveal:** section headers and cards in Home sections 2 to 8. Elements that enter together follow one another 60ms apart, in page order. The hero is not revealed: it is in view on arrival.
- **Draw:** the How it works line joining 01, 02 and 03, from 1024px. A line behind cards waits until the cards entering with it have faded in (the reveal plus four staggers), so it never shows through them.
- **Tick:** the five inputs in the Capture panel, one by one.
- **Flow:** the Evidence chain only, and the one exception to the rule against loops, which Kian approved. The dotted connectors stay as the base. Over them, a train of three brand dots, 6, 5 and 4px with the lead brightest, each glowing, crosses each connector. Each cycle: 01→04, 02→05 and 03→06 together; then 04→06 and 05→06, and 06's outline lights; then 06→07, and 07's outline lights; then a rest. Below 1024px the list runs the same cycle down its rail: the segments below 01, 02 and 03, then below 04 and 05, then below 06. The dots move by transform (translate) keyframes alone, at a linear pace, with no script per frame; each train is clipped to the gap between the walls it joins, so it enters one cell's wall and leaves into the next. The dots run only while the section is in view. The "Pause animation" button in the section header stops them where they are, and "Play animation" starts them again.
- **Hub flow:** the Problem section. The same dots, trains and transform keyframes as the flow, but they cross once: from each card's corner into the hexagon, card by card in reading order, then the hexagon's outline lights (2px brand, glowing, as the flow's) and settles at 40%, which it keeps, and the lines stay still. Where the flow will not run (the hub in view on arrival, reduced motion, no script), the outline shows that soft glow from the start; it is dark only while its flow waits. A trigger level with the lower cards' anchors starts it, so all four connectors are in view. Below 1024px, each card's stretch of the rail runs once its foot is in view, and the last card's runs on into the hexagon, which then lights. Hovering over a card with a mouse or pen, or moving focus into it, replays its own connector once, and the hexagon lights fully again and settles back to 40%; a connector still moving is left alone, and touch does not replay, so scrolling the stack does not set it off.
- **How it runs:** one IntersectionObserver for the page (`components/Reveal.tsx`); each element starts once it is 10% of the viewport's height inside it, then is no longer watched. The Evidence chain's flow stays watched: the observer marks it in view while it is, and CSS sets its animation-play-state from that. Elements in view or above it when the page loads keep their final state, and so does everything when script does not run. CSS runs the motion; no animation library.
- **Press:** primary buttons scale to 0.98.
- In-page links scroll smoothly.
- No infinite animations, and nothing moves for more than 5 seconds, with one exception: the Evidence chain's flow, which loops only while its section is in view and which its pause button stops (WCAG 2.2.2). Stitch has five looping animations. The flow takes the place of one, the dashes flowing along its Evidence chain lines; the others are not used: the badge dot's ping, pulsing dots, the dashes along the How it works line, the honeycomb's breathing, and the bee particles.
- With `prefers-reduced-motion: reduce`, every element shows its final state, and every transition, animation, smooth scrolling and the hero light are off. The Evidence chain and the Problem hub keep their dotted connectors, with no dots moving and nothing lighting, and the Evidence chain hides its pause button.

### Hero light

Moving a mouse over the hero lights up the honeycomb cells around the pointer, as in Stitch.

- **What moves:** a light trails the pointer, and every cell whose centre lies within 175px of it brightens. Each cell takes one brightness from its centre's distance d to the light, g = (1 − d/175)², across the whole cell: its fill rises to brand at 14% × g, its outline to brand at 12% + 65% × g, and the outline glows (12px blur, brand at 40%, in proportion to g). The honeycomb itself, the text and the buttons stay where they are.
- **Easing:** each 60Hz frame, the light covers 15% of the remaining way to the pointer (a time constant of about 100ms; within 5% after about 300ms), and each cell 10% of the remaining way to its brightness (about 160ms; settled after about 500ms). At other frame rates the steps scale, so the timing stays the same.
- **Duration:** cells light up as the light reaches them and fade as it moves on; when the pointer leaves the hero, every cell fades out. Frames are requested only while the pointer moves and the cells settle.
- **Bounds:** a 175px radius at every screen size, and only the cells within it; the hero section only. The pointer lights cells anywhere in the hero, including under the text and buttons. The cells are drawn behind the content, clipped to the hero, and never take pointer events.
- **Touch screens and other devices without hover:** no light; the honeycomb stays at rest. Static was chosen over auto-drift, which would be a looping animation.
- **Reduced motion:** no light.
- **Implementation:** one element per lit cell, copied from a template and reused, and made only where the light shows: at most 8 in a frame, nearest first, so the first hover never blocks a frame. Each is placed once when it lights up; after that only its opacity changes, and its layers are composited on their own, so a change of brightness repaints nothing. No React state per pointer event, no canvas.

Differences from Stitch's canvas version:
- Stitch's hexagons are flat-topped. Here they keep the logo's pointy-topped shape (CLAUDE.md), at Stitch's size: 38px from centre to corner.
- Stitch switches a cell's 12% outline on once its brightness passes 0.02; here the outline fades in up to that point. As in Stitch, a fading cell goes dark once its brightness falls below 0.02. Stitch's glow widens with brightness; here it keeps its 12px blur and strengthens instead.
- Stitch parks the light off-screen between visits, so it sweeps in from the left edge on entry. Here a dark light starts at the pointer.
- Not ported, because CLAUDE.md rules out particles and looping animation in the hero: Stitch's 42 bee particles, which wander without stopping, gather within 262px of the pointer and are joined by lines when closer than 92px; and its breathing honeycomb, whose strokes cycle between 6% and 10% every 4.2 seconds.

## Components

**Buttons.** Every variant has a 1px border, transparent where none shows, so buttons side by side share one height.

| Size | Height | Side padding | Radius | Type | Primary glow | Use |
|---|---|---|---|---|---|---|
| sm | 44px | 16px; 20px from 640px | tile | button | shadow-glow-sm | Nav |
| md | 48px | 28px | container | button | shadow-glow | Hero, not-found page |
| lg | 52px | 32px | container | button | shadow-glow-lg | Pilot band |

- Primary: brand fill, on-brand text at 600, its glow at rest; on hover, brand-hover and the stronger glow; pressed, scale 0.98.
- Secondary: card at 80% with a 12px backdrop blur, 1px divider border, white text at 400, shadow-sm; on hover, border brand at 50%, text brand, fill card.
- Ghost: no fill, text-secondary; on hover, white. Not in Stitch.
- Focus, on every interactive element: 2px brand outline, 2px offset. Not in Stitch.

**Badge** (hero status): card at 90% with a 12px backdrop blur, 1px divider border, full radius, 6px 14px padding, shadow-sm; badge type in text-soft; an 8px brand dot, 10px before the text. The dot is static (Stitch's pings).

**Panel** (product-style detail inside a card): bg-alt fill, 1px divider border, container radius, 16px padding. The header row has a label on the left and a value or chip on the right.

**Chip**: chip fill, 1px chip-border, tag radius, 2px 6px padding, label type in text-soft. The format chips in the Problem card headers.

**Status chip** (in example panels): card-low fill, 1px divider border, tile radius, 2px 8px padding, label type. An icon and its text, both in the warning token (triangle) or the error token (circle). Never colour alone.

**"Illustrative example" label**: card fill, 1px divider border, chip radius, 6px 14px padding, label type in text-secondary, after a 6px brand dot. Beside the heading of every section with example panels: Problem, How it works and Evidence chain (CLAUDE.md, rule 2).

**Problem card**:
- Header, on a divider at 70%: the icon in brand, the title in label type at 500, and its value tag; on the right, the source tag (SRC 01 to SRC 04) in text-secondary and a format chip. On one line while the header is 512px wide or more; from 340 to 511px (on screens from 1024 to about 1350px wide) the two groups stack, title over value tag on the left and source tag over format chip on the right, so no header wraps; narrower, on phones, it wraps.
- The example panel, which grows so the cards in a row share their height: Site photos, a viewfinder with 2px brand corner reticles at 70%, the photo's tag, a line drawing of a boiler and a dashed equipment tag; Utility bills, a 12-month line in text-secondary at 70% with brand dots and no axis numbers, the missing month dashed in warning, with a dashed tick and its label under it; Equipment records, a two-column list of ratings in a bg box; Spreadsheets and reports, rows of metric, status chip and formula.
- The description, then two labels on a divider at 70%: the first after a 6px dot, in text-secondary; the second in text-soft.
- The hub: the cards connect to a regular pointy-top hexagon, 112px wide, styled like the Evidence chain's 06: card fill and a 1px brand outline at 60%, with the logo, 28px tall, in its centre. It is an image named "B.E.E."; its connectors are hidden from screen readers.
- From 1024px, the cards keep their 2 × 2 grid, 120px apart between the columns and 88px between the rows, with the hexagon where the gaps cross; its top and bottom points reach about 21px into the column gap, clear of the cards. Each card has an anchor, a 6px port, on its edge facing the hub (the bottom edge of the upper cards, the top edge of the lower ones), 96px in from its inner corner. A dotted connector in the Evidence chain's dots runs from it through the gap between the rows to the middle of the hexagon's side wall on its side, 109px; the two on each side meet there. (The slanted walls' middles lie level with the cards' facing edges or beyond them, so a line to one would run along a card.)
- The hub's dotted lines, rail and anchors rest in brand at 50%; the moving dots are full brand.
- Below 1024px, the cards stack 24px apart in one column, after a 32px gutter. A rail of the same dots, in brand at 50%, runs down the gutter, 12px from the left, with a port beside each card's header; after the last card it turns right, at the middle of the hexagon, into its left wall. The hexagon sits after the stack, centred under the cards.
- The closing banner: on its right, a hexagon icon in brand and the hub line in text. It is one row from 1024px, and stacked and centred below.

**Capture list** (How it works): one row per input, the input's icon in brand and its name on the left; on the right a dashed circle in text-secondary that ticks over to a check and "Captured" in success (Motion, tick).

**Evidence chain** (not from Stitch, which has a row of four cards): seven steps that converge on a model and its review (CONTENT.md, section 4), as cells of a comb, the honeycomb of the logo and the hero.
- From 1024px, the comb: seven regular pointy-top hexagon cells, the logo's shape, on a true honeycomb, in three rows: 01 and 04 on top; 03, 06 and 07 in the middle; 02 and 05 below. The top and bottom rows sit half a cell left of the middle one, so every connector points right, from a lower number to a higher one: 01→04, 02→05, 03→06, 04→06, 05→06 and 06→07.
- At full size the cells are 272px wide and 80px apart all round (`--comb-cell`, `--comb-gap`), and the comb is 1152 × 924px, the width of its column. In a narrower column, from 1024 to 1247px, the whole comb scales down with it, text included: to 0.81 at 1024px.
- Each cell holds, on one grid: its number in brand and its action word (label type, at 500), its title (cell type, one line), its text (body, balanced, four lines at most) and its value tag. The rows are 16, 22, 104 and 22px tall and 8, 6 and 12px apart, centred in the cell, with the title and text in a 236px column, so the lines in each row of cells align. Nothing comes within 12px of a wall.
- Cells: card fill and a 1px edge outline, with the action word in text-secondary; 06, the hub, has a brand outline at 60%. Hovering, focusing or tapping a cell lights it and every cell and connector upstream of it, without motion: their outlines turn brand at 60% and their action words brand, and the cell itself takes a 2px brand outline over brand at 6% on card. Focus: a 2px brand hexagon 2px outside the cell. Only the hexagon takes the pointer, not the corners of the cell's box. For screen readers, each cell names the steps it is based on.
- Connectors join the middles of facing walls: 2px dots 6px apart, between 6px ports on the two walls; chip-border, and on a lit trail brand at 80% with brand ports. The flow's dots cross them (Motion).
- Below 1024px, a list in number order: each step a row with a 32px hexagon badge holding its number, then its action word and value tag, its title (title type) and its text (body). The badges sit on a dotted rail in the connectors' dots, and the flow runs down it.
- The pause button: a small ghost button in the section header, beside the "Illustrative example" label, with a pause or play icon and "Pause animation" or "Play animation". It is hidden with reduced motion.

**Value tag** (product vocabulary from CONTENT.md): in the evidence chain, beside the Problem card titles and the principle titles, and in the Optimize panel's label row, where Stitch had status chips. Tags use Stitch's chip metrics: tag radius, 2px 8px padding, label type. Each tag differs by text and border style, not colour alone:

| Tag | Style |
|---|---|
| Observed | Solid 1px white border, white text |
| Assumed | Dashed 1px text-secondary border, text-secondary text |
| Calculated | Solid 1px brand border, brand text |
| Awaiting review | Card fill, text-secondary text, clock icon |

**Form fields** (not in Stitch):
- Label above every field (body size, white); never use the placeholder as the label.
- Input: card fill, 1px control-border, container radius, padding 12px 16px; focus border brand plus the focus ring.
- Error: error-coloured border, plus the message under the field with an icon.
- Checkbox: 20px, 1.5px control-border; when checked, brand fill with an on-brand check mark.

**Section header**: a label eyebrow in text-secondary, then the h2. The Problem eyebrow follows an 8px brand dot; the How it works eyebrow is brand at 500, after the same dot. The Problem header stands on a divider at 60%, the How it works header on one at 70%. Where Stitch puts a status chip beside them, the "Illustrative example" label sits instead; Stitch's chip text is not used.

**Nav**:
- Sticky, 80px tall, bg at 80% with a 24px backdrop blur, divider at 70% along the bottom.
- Logo on the left; links in the centre, 32px apart (small type, text-secondary; on hover white; the active section brand at 500); the sm primary button on the right.
- Below 768px, a menu button opens a full-screen sheet, and the primary button stays visible. Stitch has no mobile menu.
- Not used from Stitch: the logo in a bordered tile with "B.E.E." beside it (see Logo), the "What we analyze" link (not in CONTENT.md) and the account icon (the site has no login).

**Footer**:
- bg-alt, with a divider at 70% along the top; 64px padding top and bottom.
- From 768px, three columns across 5, 4 and 3 of 12: identity (logo and descriptor), links, contact.
- Bottom row, 32px below a divider at 60%: privacy link and copyright in label type, text-secondary.
- Not used from Stitch: its column headings and descriptor (text not in CONTENT.md), its invented email address and legal name, and its status line.

## Logo

- Use the "bee" wordmark on dark backgrounds only, at 28px tall in the nav (minimum 24px).
- Clear space is half the logo's height on every side.
- Never put it in a box, recolour it, add effects, or set "B.E.E." text beside it. Stitch shows the mark in a bordered tile with "B.E.E." and "Energy Intelligence" beside it, which these rules rule out.
- The "b" hexagon on its own is the favicon and the social avatar.
- A one-colour black version is required for light backgrounds. Its file is pending.

## Icons and imagery

- Lucide icons, 1.5px stroke, at Stitch's sizes (14–24px), in Stitch's colours: brand in the Problem cards, the Problem closing line and the principles; text-soft or text-secondary elsewhere, turning brand on hover. A status icon takes its status's token (warning, error or success) and always sits beside its text. Stitch uses the Material Symbols icon font, which CLAUDE.md rules out; each of its icons maps to the closest Lucide icon.
- Illustrations are flat SVG line drawings using these tokens.
- The Problem cards keep the structure of Stitch's mock screens, but hold only the generic example data in CONTENT.md (CLAUDE.md, rule 2): none of Stitch's statistics, percentages, coordinates or compliance terms. The Site photos viewfinder shows a line drawing of a boiler, never a photo.
- No stock photos of people.
- No photos from employers' or clients' projects.
- Thermal images only if licensed or captured by B.E.E. itself.
- The hero honeycomb: the logo's pointy-topped hexagons, 38px from centre to corner (Stitch's size), with 1px strokes in brand at 6%. Stitch's honeycomb breathes between 6% and 10%; here it holds at 6%, the top of the 4–6% range in CLAUDE.md.
