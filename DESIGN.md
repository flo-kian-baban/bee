---
name: B.E.E. Design System (website v1)
colors:
  bg: '#111112'
  bg-alt: '#0B0B0C'
  card: '#1C1C1F'
  divider: '#2E2E33'
  control-border: '#6B6B70'
  text: '#FFFFFF'
  text-secondary: '#A3A3A8'
  brand: '#F0EA0E'
  brand-hover: '#DCD70B'
  on-brand: '#111112'
  success: '#4ADE80'
  warning: '#FB923C'
  error: '#F87171'
fonts:
  display: Space Grotesk
  body: Inter
  mono: JetBrains Mono
radius:
  container: 12px
  chip: 6px
spacing-base: 8px
---

# B.E.E. Design System (website v1)

## What the brand is

B.E.E. turns site inspections, photos, equipment records and utility bills into traceable engineering assessments that qualified people review.
The visual metaphor is **a field instrument with an audit trail**: precise, calm, evidence-first.

B.E.E. is **not** a real-time monitoring or building-automation product. Do not use telemetry, control-room, live-data or sensor-stream imagery or language.

## Colours

All ratios below were measured. "Bg", "Alt" and "Card" are the three surfaces.

| Token | Hex | Use | On bg | On alt | On card |
|---|---|---|---|---|---|
| bg | #111112 | Default page background | n/a | n/a | n/a |
| bg-alt | #0B0B0C | Alternate section background | n/a | n/a | n/a |
| card | #1C1C1F | Cards, panels, form fields | n/a | n/a | n/a |
| divider | #2E2E33 | Decorative lines only, never a control's edge | 1.40 | n/a | n/a |
| control-border | #6B6B70 | Input, checkbox and select borders | 3.56 | 3.71 | 3.21 |
| text | #FFFFFF | Headings, body | 18.87 | 19.67 | 17.00 |
| text-secondary | #A3A3A8 | Supporting text, labels | 7.51 | 7.83 | 6.77 |
| brand | #F0EA0E | Primary buttons, highlighted words, active and selected states, focus ring | 14.81 | 15.44 | 13.34 |
| on-brand | #111112 | Text on brand-yellow fills | 14.81 on brand | | |
| success | #4ADE80 | Form success state | 10.83 | 11.29 | 9.76 |
| warning | #FB923C | Warnings. Never use brand yellow for warnings. | 8.34 | 8.69 | 7.51 |
| error | #F87171 | Form errors | 6.82 | 7.11 | 6.15 |

Rules:
- Yellow is the brand colour, not a status colour.
- On any light background, yellow is allowed only as a fill behind #111112 text. Yellow text or lines on white measure 1.27:1.
- Never convey meaning with colour alone. Every status shows a text label or an icon too.
- No other colours. In particular, no cyan, purple or red accents.

## Typography

| Style | Font | Desktop | Mobile | Weight | Notes |
|---|---|---|---|---|---|
| display | Space Grotesk | 64/72 | 36/44 | 600 | Hero headline only; tracking -0.02em |
| h2 | Space Grotesk | 40/48 | 30/38 | 500 | Section headings |
| h3 | Space Grotesk | 24/32 | 20/28 | 500 | Card titles |
| body-lg | Inter | 18/28 | 18/28 | 400 | Hero subtext, section leads |
| body | Inter | 16/24 | 16/24 | 400 | Minimum size for any paragraph |
| label | JetBrains Mono | 13/18 | 13/18 | 500 | Uppercase, tracking 0.06em; eyebrows and panel labels only; never smaller than 13px |
| button | Space Grotesk | 16/20 | 16/20 | 500 | |

Use `font-variant-numeric: tabular-nums` on all numbers.

## Layout and spacing

- Content max width 1200px. Side padding 24px on mobile, 48px on desktop.
- 12-column grid on desktop, 4 columns on mobile. Gutters 24px.
- Section vertical padding: 128px desktop, 72px mobile. Alternate sections between bg and bg-alt.
- Spacing scale (8px base): 4, 8, 12, 16, 24, 32, 48, 72, 96, 128.

## Shape and depth

- Radius 12px on cards, panels, buttons and inputs; 6px on chips; full on dots.
- Flat surfaces: depth comes from tone (card on bg) and a 1px divider border. No drop shadows on cards.
- Hover on interactive cards: the border changes from divider to brand at 50% opacity, over 150ms. No lift or scale.
- Glow is allowed in two places only:
  - the hero radial glow behind the headline (max 8% brand opacity);
  - primary button hover (`0 0 16px rgba(240,234,14,0.2)`).

## Motion

- Durations 150–250ms, `ease-out`. Only colour, opacity, border and transform change.
- No looping animations: no pulsing dots, pings or flowing lines.
- With `prefers-reduced-motion: reduce`, every transition and animation is turned off.

## Components

**Buttons** (minimum height 44px, padding 12px 24px):
- Primary: brand fill, on-brand text; hover brand-hover plus the glow.
- Secondary: card fill, 1px control-border, white text; hover border brand.
- Ghost: no fill, text-secondary; hover white.
- Focus (every interactive element): 2px brand outline, 2px offset.

**Badge** (hero status): card fill, 1px divider border, full radius, label style. The dot is static brand yellow.

**Panel** (a card that shows product-style detail): card fill, 1px divider border, 12px radius, 24px padding. The header row has a mono label on the left and a chip on the right, separated from the body by a divider.

**Value tag** (product vocabulary, used in panels and the evidence chain). Each tag differs by text and border style, not colour alone:

| Tag | Style |
|---|---|
| Observed | Solid 1px white border, white text |
| Assumed | Dashed 1px text-secondary border, text-secondary text |
| Calculated | Solid 1px brand border, brand text |
| Awaiting review | Card fill, text-secondary text, clock icon |

**Form fields**:
- Label above every field (body size, white); never use the placeholder as the label.
- Input: card fill, 1px control-border, 12px radius, padding 12px 16px; focus border brand plus the focus ring.
- Error: error-coloured border, plus the message under the field with an icon.
- Checkbox: 20px, 1.5px control-border; when checked, brand fill with an #111112 check mark.

**Section header**: label-style eyebrow in text-secondary, then the h2.

**Nav**:
- Sticky, bg at 85% opacity with a backdrop blur, 1px divider on the bottom, height 72px.
- Logo on the left, links in the centre (body size, text-secondary; hover white; the active section in white), primary button on the right.
- Below 768px: a menu button opens a full-screen sheet; the primary button stays visible.

**Footer**:
- bg-alt with a divider on top.
- Columns: identity (logo and descriptor), links, contact.
- Bottom row: privacy link and copyright.

## Logo

- Use the "bee" wordmark on dark backgrounds only, at 28px tall in the nav (minimum 24px).
- Clear space is half the logo's height on every side.
- Never put it in a box, recolour it, add effects, or set "B.E.E." text beside it.
- The "b" hexagon on its own is the favicon and the social avatar.
- A one-colour black version is required for light backgrounds. Its file is pending.

## Icons and imagery

- Lucide icons, 1.5px stroke, 20px or 24px; text-secondary by default, brand when active.
- Illustrations are flat SVG line drawings using these tokens.
- No stock photos of people.
- No photos from employers' or clients' projects.
- Thermal images only if licensed or captured by B.E.E. itself.
- The hero honeycomb uses the logo's own hexagon proportions.
