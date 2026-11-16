# B.E.E. Website Content (v1)

Every visible word on the site comes from this file. Move it into `content/site.ts` unchanged.

**Tags:**
- **[A]**: approved. Source is the brand book business answers v1, the approved Stitch brief or a later ruling by Kian.
- **[D]**: draft. Build with it, but list it in the milestone report for Kian to approve.

**Brand name constant:** `BRAND = "B.E.E."`. Every mention of the name in this file uses this constant. How the name is written in running text is still Kian's ruling (B.E.E. or BEE), so changing it must be a one-line edit.

## Global

**Nav**
- Links, in page order: "Why {BRAND}" → `#why-bee` [D] · "How it works" → `#how-it-works` [A] · "Traceability" → `#traceability` [D] · "Who it's for" → `#buildings` [D] · "Team" → `#team` (hidden while `showTeam` is false) [A]
- Button: "Join the pilot" → `/pilot` [A]

**Footer**
- Descriptor: "From building data to engineering decisions." [A, in sentence case]
- Link column: the nav links, then "Join the pilot": Why {BRAND} [D], How it works, Traceability [D], Who it's for [D], Team (if shown), Join the pilot [A]
- Contact: `NEXT_PUBLIC_CONTACT_EMAIL`; LinkedIn icon if `showLinkedIn` is true [A]
- Bottom row: "Privacy policy" → `/privacy` · "© 2026 {LEGAL_NAME or BRAND}" [A]

**Feature flags (all false until approved):** `showTeam`, `showFaq`, `showLinkedIn`

## Home

### 1. Hero
- Badge: "In development · Pilot program open" [A]
- Headline: "Every Building. Better Energy Intelligence." The words "Energy Intelligence" are in brand yellow. [A]
- Subtext: "{BRAND} connects on-site inspections, utility data and detailed engineering calculations to turn scattered building information into clear, traceable energy decisions." [D]
- Primary button: "Join the pilot program" → `/pilot` [A]
- Secondary button: "See how it works" → `#how-it-works` [A]

### 2. Problem (id `why-bee`, bg-alt)
- Eyebrow: "Today" [A]
- Heading: "Building energy data is scattered." [A]
- Label: "Illustrative example" [A]
- Four panels (title and description [A]):
  - "Site photos": "Equipment, conditions and nameplates, photographed during inspections."
  - "Utility bills": "Electricity, gas and water statements, often spread across several accounts."
  - "Equipment records": "Nameplates, cut sheets and service logs, often on paper."
  - "Spreadsheets and reports": "Calculations and past studies kept in separate files."
- Value tags beside the panel titles: Observed on "Site photos", "Utility bills" and "Equipment records"; Calculated on "Spreadsheets and reports" [A]
- Source tags in the panel headers: "SRC 01" to "SRC 04", in panel order [A]
- Format chips in the panel headers [A]: "JPEG" (Site photos) · "PDF" (Utility bills) · "Paper" (Equipment records) · "XLSX · PDF" (Spreadsheets and reports)
- Each panel holds an example of its source. The values are generic example data only (CLAUDE.md, rule 2):
  - "Site photos" [A]: a viewfinder frame with corner reticles around a line drawing of a boiler; tags "Boiler B-1 · Nameplate" and "Photo 014 · Mechanical room".
  - "Utility bills" [A]: "Account ••••4521 · Natural gas"; a 12-month line with no axis numbers, and one dashed gap labelled "Missing statement".
  - "Equipment records" [A]: "Submittal: hot water boiler", with "Rated input" "2,000 MBH (586 kW)", "Supply" "180°F (82°C)", "Installed" "1998" and "Service log" "Paper only". The SI values in brackets are [D].
  - "Spreadsheets and reports" [A]: three rows of metric, formula and status: "Baseline gas use" · "=SUM(B2:B13)" · "Manual"; "Weather adjustment" · "=VLOOKUP(…)" · "#REF!"; "Emission factor" · "Pasted from a 2019 report" · "Outdated". Each status shows an icon and its text.
- Two labels at the foot of each panel:
  - "Site photos": "Not linked to equipment" · "Re-typed by hand" [A]
  - "Utility bills": "Separate accounts" · "Different billing periods" [A]
  - "Equipment records": "Paper cut sheets" · "Not digitized" [A]
  - "Spreadsheets and reports": "Separate files" · "Re-entered by hand" [A]
- Closing line: "Kept in different places and re-entered by hand." [A], with a keyboard icon and the chip "4 sources · 0 links" [A]

### 3. How it works (id `how-it-works`)
- Eyebrow: "How it works" [A]
- Heading: "Collect. Calculate. Deliver." [D]
- Label: "Illustrative example" [A]
- Each card shows its number, its title, then its action word in the uppercase label style, then its text [D]. The product's internal names (Bee, Colony, Honey) never appear on the site (CLAUDE.md, rule 2).
- Card 01, "Field app" · "Collect": "A checklist-driven app for site visits: photos, nameplates, the superintendent interview and building automation data, captured in one place." [D]
  - Panel: a list of inputs (Photos, Nameplates, Interview, Automation data, Utility bills) [D], each marked "Captured" in turn as the card comes into view [A]
- Card 02, "Engineering analysis" · "Calculate": "Utility analysis, benchmarking, energy conservation measures and decarbonization pathways, with every assumption labelled and every decision made by the engineer." [D]
  - Panel: four labelled rows: "Utility analysis", "Benchmark", "Measures", "Pathways", each with a short placeholder line and no figures [D]
- Card 03, "Client results" · "Deliver": "Your report's key results (summary, benchmark, measures and pathways) in one place, designed for 'what if' questions." [D]
  - Panel: four rows: "Executive summary", "Benchmark", "Measures", "Pathways" [D], each with a "—" value [A], and an "Awaiting review" tag [A]
- Panel labels: "INPUTS" (Card 01), "ANALYSIS" (Card 02) and "REPORT" (Card 03, with the "Awaiting review" tag beside it) [A]

### 4. Evidence chain (id `traceability`, bg-alt)
- Eyebrow: "Traceability" [A]
- Heading: "Every number has a source." [A]
- Lead: "Seven steps from a site photo to a draft finding. Select any step to trace where it came from." [D]
- Label: "Illustrative example · not real project data" [A, expanded]
- Seven steps, each with its number and action word (shown in the uppercase label style), title, value tag and text [D]:
  - 01 Capture · "Nameplate photo" · Observed · "Site photo 014, taken during the inspection of Boiler B-1."
  - 02 Collect · "Gas statements" · Observed · "Account ••••4521, natural gas, monthly statements; one flagged as missing."
  - 03 Assume · "Seasonal efficiency" · Assumed · "Entered by the engineer and labelled as an assumption wherever it is used."
  - 04 Extract · "Rated input: 2,000 MBH (586 kW)" · Observed · "Read from the nameplate in site photo 014." The title is two lines, "Rated input:" then "2,000 MBH (586 kW)": always in the comb, and in the list when it wraps.
  - 05 Normalize · "Weather-normalized baseline" · Calculated · "Gas use compared against heating degree days."
  - 06 Model · "Boiler replacement scenario" · Calculated · "Energy, cost and GHG compared against the baseline. No values shown in this example."
  - 07 Review · "Draft finding" · Awaiting review · "Boiler replacement option, prepared for review by a qualified professional."
- How the steps connect: 01 → 04; 02 → 05; 03, 04 and 05 → 06; then 06 → 07.
- For screen readers, each step names the steps it is based on: "Based on" [D], then their numbers and action words.
- Button: "Pause animation", and "Play animation" while paused [D]

### 5. Principles
- Heading: "Engineers decide. {BRAND} does the groundwork." [D]
- Lead: "{BRAND} is designed so that:" [A]
- "Every value is labelled" [A]: "Observed, assumed and calculated values are labelled separately." [A]
- "Methods travel with results" [A]: "Methods, units and assumptions travel with every result." [A]
- "Qualified people review findings" [A]: "Findings are prepared for review by qualified professionals." [A]
- "Decisions are recorded" [D]: "Each engineering decision is saved with its reason, so every result can be traced and revisited." [D]
- Value tags beside the titles: Observed, Assumed and Calculated; Calculated; Awaiting review [A]; none beside "Decisions are recorded" [D]

### 6. Who it's for (id `buildings`, bg-alt)
- Eyebrow: "Who it's for" [D]
- Heading: "Built first for offices and multi-unit residential buildings." [D]
- Two large primary tiles, each a title and a line [D]:
  - "Offices": "For portfolio and property managers."
  - "Multi-unit residential": "Condos and rental apartments, for boards and property managers."
- A row titled "Owners usually start an audit for:" with four items [D]: "Certifications such as LEED and BOMA BEST" · "Incentive and funding applications" · "Emissions reduction targets" · "Capital planning and budgets"
- A smaller, secondary row titled "Planned next" [D]: Government buildings · Schools and institutions · Hotels · Retail [D] · Industrial and warehouses · Arenas, pools and community centres [A, except "Retail"]

### 7. Team (id `team`, only when `showTeam` is true)
- Eyebrow: "Founders" [D]
- Heading: "Team" [A]
- Card 1: "{NAME_1}" · "Co-Founder, Engineering & Building Energy Intelligence" [A title; name pending]
- Card 2: "{NAME_2}" · "Co-Founder, Technology & Platform Development" [D title; name pending]
- No other people. No photos until consent is given; use the initials on a card background meanwhile.

### 8. Pilot band
- Heading: "Help shape {BRAND} on real buildings." [A]
- Text: "We are looking for building owners, property managers and engineering firms to join our pilot program." [A], then, in the same paragraph, "We're starting with mid- and high-rise residential buildings." [D]
- Button: "Apply for the pilot" → `/pilot` [A]
- Never mention a free audit, here or on the Pilot page.

## Pilot page (`/pilot`)

- Until the form ships (milestone 4), the page is a placeholder: the headline, the focus line, then "The application form is coming soon." [D] in place of the subtext and form, then "What happens next". No form.
- Headline: "Join the {BRAND} pilot program." [A]
- Focus line, under the headline: "We're starting with mid- and high-rise residential buildings." [D]
- Subtext: "Tell us about your building or portfolio. We will contact you to discuss whether it is a fit for the pilot." [A]
- Form fields (labels [A]):
  - Full name* (text)
  - Work email* (email)
  - Organization* (text)
  - Role (select): Building owner · Property or facility manager · Engineering or energy firm · Other
  - Building type (select): the eight building types from Home section 6: the two primary types, then the six planned next
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
- Description: "{BRAND} connects on-site inspections, utility data and detailed engineering calculations into clear, traceable energy decisions. In development, with a pilot program open." [A]
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
