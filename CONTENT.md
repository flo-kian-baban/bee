# B.E.E. Website Content (v1)

Every visible word on the site comes from this file. Move it into `content/site.ts` unchanged.

**Tags:**
- **[A]**: approved. Source is the brand book business answers v1 or the approved Stitch brief.
- **[D]**: draft. Build with it, but list it in the milestone report for Kian to approve.

**Brand name constant:** `BRAND = "B.E.E."`. Every mention of the name in this file uses this constant. How the name is written in running text is still Kian's ruling (B.E.E. or BEE), so changing it must be a one-line edit.

## Global

**Nav**
- Links: "How it works" → `#how-it-works` · "Buildings" → `#buildings` · "Team" → `#team` (hidden while `showTeam` is false) [A]
- Button: "Join the pilot" → `/pilot` [A]

**Footer**
- Descriptor: "From building data to engineering decisions." [A, in sentence case]
- Link column: How it works, Buildings, Team (if shown), Join the pilot [A]
- Contact: `NEXT_PUBLIC_CONTACT_EMAIL`; LinkedIn icon if `showLinkedIn` is true [A]
- Bottom row: "Privacy policy" → `/privacy` · "© 2026 {LEGAL_NAME or BRAND}" [A]

**Feature flags (all false until approved):** `showTeam`, `showFaq`, `showLinkedIn`

## Home

### 1. Hero
- Badge: "In development · Pilot program open" [A]
- Headline: "Every Building. Better Energy Intelligence." The words "Energy Intelligence" are in brand yellow. [A]
- Subtext: "{BRAND} connects physical building inspections, intelligent data processing and engineering-based analysis to turn fragmented building information into transparent, actionable energy intelligence." [A]
- Primary button: "Join the pilot program" → `/pilot` [A]
- Secondary button: "See how it works" → `#how-it-works` [A]

### 2. Problem (bg-alt)
- Eyebrow: "Today" [A]
- Heading: "Building energy data is scattered." [A]
- Four panels (title and description [A]):
  - "Site photos": "Equipment, conditions and nameplates, photographed during inspections."
  - "Utility bills": "Electricity, gas and water statements, often spread across several accounts."
  - "Equipment records": "Nameplates, cut sheets and service logs, often on paper."
  - "Spreadsheets and reports": "Calculations and past studies kept in separate files."
- Value tags beside the panel titles: Observed on "Site photos", "Utility bills" and "Equipment records"; Calculated on "Spreadsheets and reports" [A]
- Each panel's visual is a simple line illustration of its source type. No numbers, error states or statistics.
- Closing line: "Kept in different places and re-entered by hand." [A]

### 3. How it works (id `how-it-works`)
- Eyebrow: "How it works" [A]
- Heading: "Capture. Analyze. Optimize." [A]
- Card 01, "Capture": "Site photographs, thermal images, equipment nameplates, utility bills and operating records, collected in one structured workflow." [A]
  - Panel: a list of input types (Photos, Thermal images, Nameplates, Utility bills, Operating records) [A]
- Card 02, "Analyze": "Utility benchmarking, engineering calculations and energy conservation measures, with every assumption visible." [A]
  - Panel: three labelled rows: "Method", "Assumptions", "Units", each with a short placeholder line and no figures [A]
- Card 03, "Optimize": "Energy, cost and greenhouse gas scenarios for retrofit decisions, prepared for qualified engineering review." [A]
  - Panel: two scenario rows ("Scenario A", "Scenario B"), columns "Energy", "Cost", "GHG" with "—" values, and an "Awaiting review" tag [A]
- Panel labels: "INPUTS" (Card 01), "METHOD" (Card 02) and "SCENARIOS" (Card 03, with the "Awaiting review" tag beside it) [A]

### 4. Evidence chain (bg-alt)
- Eyebrow: "Traceability" [A]
- Heading: "Every number has a source." [A]
- Lead: "Select any step to see where it came from." [A]
- Label: "Illustrative example · not real project data" [A, expanded]
- Node labels: "STEP 01" to "STEP 04" [A]
- Node 1, "Nameplate photo":
  - Text: "Photographed on site during the inspection." [A]
  - Meta: "Source: site photo 014" · tag: Observed [A]
- Node 2, "Extracted value":
  - Text: "Rated input: 2,000 MBH" [A]
  - Meta: "Extracted from site photo 014" · tag: Observed [A]
- Node 3, "Calculation":
  - Text: "Annual heating energy, weather-normalized against heating degree days." [A]
  - Meta: "Seasonal efficiency: engineer input" · tag: Assumed. "Annual heating energy" · tag: Calculated. [A]
- Node 4, "Finding":
  - Text: "Draft measure: boiler replacement option." [A]
  - Meta: tag "Awaiting review" [A]
- Live-region announcement when a node is selected: "{Node title}. {Node text}. Based on: {list of upstream nodes}." [D]

### 5. Principles
- Heading: "AI assists engineers. It doesn't replace them." [A]
- Lead: "{BRAND} is designed so that:" [A]
- "Every value is labelled" [A]: "Observed, assumed and calculated values are labelled separately." [A]
- "Methods travel with results" [A]: "Methods, units and assumptions travel with every result." [A]
- "Qualified people review findings" [A]: "Findings are prepared for review by qualified professionals." [A]
- Value tags beside the titles: Observed, Assumed and Calculated; Calculated; Awaiting review [A]

### 6. Buildings (id `buildings`, bg-alt)
- Eyebrow: "Building types" [A]
- Heading: "Designed for every building type." [A]
- Tiles: Condominiums · Rental apartments · Offices and retail · Government buildings · Schools and institutions · Hotels · Industrial and warehouses · Arenas, pools and community centres [A]

### 7. Team (id `team`, only when `showTeam` is true)
- Eyebrow: "Founders" [D]
- Heading: "Team" [A]
- Card 1: "{NAME_1}" · "Co-Founder, Engineering & Building Energy Intelligence" [A titles; names pending]
- Card 2: "{NAME_2}" · "Co-Founder, AI & Technology Development" [A titles; names pending]
- No other people. No photos until consent is given; use the initials on a card background meanwhile.

### 8. Pilot band
- Heading: "Help shape {BRAND} on real buildings." [A]
- Text: "We are looking for building owners, property managers and engineering firms to join our pilot program." [A]
- Button: "Apply for the pilot" → `/pilot` [A]

## Pilot page (`/pilot`)

- Headline: "Join the {BRAND} pilot program." [A]
- Subtext: "Tell us about your building or portfolio. We will contact you to discuss whether it is a fit for the pilot." [A]
- Form fields (labels [A]):
  - Full name* (text)
  - Work email* (email)
  - Organization* (text)
  - Role (select): Building owner · Property or facility manager · Engineering or energy firm · Other
  - Building type (select): the eight building types from Home section 6
  - Number of buildings (select): 1 · 2–5 · 6–20 · 20+
  - Message (textarea, optional, max 2,000 characters)
  - Hidden honeypot field, plus Turnstile
- Consent checkbox (required): "I agree to {BRAND} processing my information to respond to this request." with a "Privacy policy" link → `/privacy` [A]
- Submit button: "Submit application" [A]
- Validation messages [D]:
  - "Please enter your full name."
  - "Please enter a valid work email."
  - "Please enter your organization."
  - "Please confirm consent to continue."
- Success message [D]: "Thank you. We have received your application and will be in touch by email."
- Error message [D]: "Something went wrong and your application was not sent. Please try again." If a contact email is set, add: "or email us at {CONTACT_EMAIL}."
- "What happens next" [A]:
  1. "We review your request"
  2. "We schedule a short call"
  3. "We agree on scope and data use in writing"
- FAQ (only when `showFaq` is true). The questions are [D]; the answers are pending Kian's pilot terms:
  - "What does a pilot involve?"
  - "Is there a cost?"
  - "Who owns the data we share?"
  - "Who reviews the results?"
  - "How long does a pilot take?"

## Privacy page (`/privacy`)

- Heading: "Privacy policy" [A]
- Body: **pending legal review.** Until the approved text arrives, show "This policy is being finalized." and keep the site `noindex`. Do not launch without the approved text. The text must name every service provider that processes form data (hosting, email, spam protection, analytics) and the countries where they process it.

## 404 page

- Heading: "Page not found." [A]
- Text: "The page you are looking for does not exist or has moved." [A]
- Button: "Back to home" [A]

## Metadata

- Title: "{BRAND} · Building Energy Intelligence" [A]
- Description: "{BRAND} connects building inspections, data processing and engineering analysis into traceable energy intelligence. In development, with a pilot program open." [A]
- Open Graph image: the wordmark plus "Every Building. Better Energy Intelligence." on #111112 [D]
- Structured data: Organization with name {BRAND}, plus `url` and `logo` once the domain is set [D]

## Pending (owner: Kian)

| Item | Blocks |
|---|---|
| Name styling in text (B.E.E. or BEE) | Nothing; it's one constant |
| Logo SVGs: the wordmark, the "b" symbol, a black version | The final polish of milestone 1 (the PNG placeholder works until then) |
| GitHub repository and Vercel account | Milestone 1 |
| Resend account, the inbox addresses, Turnstile keys | Milestone 4 |
| Domain (after the trademark check) | Launch |
| Privacy policy text (legal) | Launch |
| Team names and consent | `showTeam` |
| Pilot terms (cost, data ownership, review, duration) | `showFaq` |
| LinkedIn company page URL | `showLinkedIn` |
| Legal name | The copyright line (the brand name is used until then) |
