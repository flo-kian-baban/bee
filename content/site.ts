/**
 * Every visible word on the site, plus the feature flags. Source: CONTENT.md,
 * moved here unchanged. Items CONTENT.md tags [D] are drafts awaiting Kian's
 * approval and are marked the same way here.
 *
 * Milestone 1 holds the global copy (nav, footer, 404, metadata). Each page
 * section's copy arrives with the milestone that builds it.
 */

/** How the name is written in running text is still Kian's ruling: change it here only. */
export const BRAND = "B.E.E.";

/** All false until Kian approves the pending content. */
export const flags: Record<"showTeam" | "showFaq" | "showLinkedIn", boolean> = {
  showTeam: false,
  showFaq: false,
  showLinkedIn: false,
};

const fromEnv = (value: string | undefined) => value?.trim() || undefined;

/** Business details come only from the environment. A missing value hides its element. */
export const business = {
  legalName: fromEnv(process.env.NEXT_PUBLIC_LEGAL_NAME),
  contactEmail: fromEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  linkedInUrl: fromEnv(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  siteUrl: fromEnv(process.env.NEXT_PUBLIC_SITE_URL),
};

export type SiteLink = { label: string; href: string };

/** The Home sections the nav links to. */
export const sectionIds = {
  problem: "why-bee",
  howItWorks: "how-it-works",
  evidenceChain: "traceability",
  buildings: "buildings",
  team: "team",
};

/** In page order. The nav and the footer share them. */
const sectionLinks: SiteLink[] = [
  { label: `Why ${BRAND}`, href: `/#${sectionIds.problem}` }, // [D]
  { label: "How it works", href: `/#${sectionIds.howItWorks}` },
  { label: "Traceability", href: `/#${sectionIds.evidenceChain}` }, // [D]
  { label: "Who it's for", href: `/#${sectionIds.buildings}` }, // [D]
  ...(flags.showTeam ? [{ label: "Team", href: `/#${sectionIds.team}` }] : []),
];

const pilotLink: SiteLink = { label: "Join the pilot", href: "/pilot" };

export const nav = {
  links: sectionLinks,
  cta: pilotLink,
};

export const footer = {
  descriptor: "From building data to engineering decisions.",
  links: [...sectionLinks, pilotLink],
  privacy: { label: "Privacy policy", href: "/privacy" },
  copyright: `© 2026 ${business.legalName ?? BRAND}`,
};

export const notFoundPage = {
  heading: "Page not found.",
  text: "The page you are looking for does not exist or has moved.",
  cta: { label: "Back to home", href: "/" },
};

export const meta = {
  title: `${BRAND} · Building Energy Intelligence`,
  // The hero subtext, shortened, plus where the product stands.
  description: `${BRAND} connects on-site inspections, utility data and detailed engineering calculations into clear, traceable energy decisions. In development, with a pilot program open.`,
};

/** The hero headline's two sentences. */
const heroHeadline = ["Every Building.", "Better Energy Intelligence."] as const;

/** Home, section 1. */
export const hero = {
  badge: "In development · Pilot program open",
  headline: heroHeadline.join(" "),
  /** From 1024px each sentence is a line of its own; on smaller screens the headline wraps by itself. */
  headlineLines: heroHeadline,
  /** The words of the headline shown in brand yellow. */
  headlineHighlight: "Energy Intelligence",
  subtext: `${BRAND} connects on-site inspections, utility data and detailed engineering calculations to turn scattered building information into clear, traceable energy decisions.`, // [D]
  primaryCta: { label: "Join the pilot program", href: "/pilot" },
  secondaryCta: { label: "See how it works", href: `#${sectionIds.howItWorks}` },
};

/** The product's words for where a value comes from (DESIGN.md, Value tag). */
export const valueTags = {
  observed: "Observed",
  assumed: "Assumed",
  calculated: "Calculated",
  awaitingReview: "Awaiting review",
};
export type ValueTagKind = keyof typeof valueTags;

/**
 * The label every section with example panels shows (CLAUDE.md, rule 2):
 * Problem, How it works and Evidence chain.
 */
export const exampleLabel = "Illustrative example";

/** Home, section 2. The panels hold generic example data, as its label says. */
export const problem = {
  eyebrow: "Today",
  heading: "Building energy data is scattered.",
  label: exampleLabel,
  panels: [
    {
      source: "photos",
      title: "Site photos",
      tag: "observed",
      sourceTag: "SRC 01",
      format: "JPEG",
      description: "Equipment, conditions and nameplates, photographed during inspections.",
      footer: ["Not linked to equipment", "Re-typed by hand"],
    },
    {
      source: "bills",
      title: "Utility bills",
      tag: "observed",
      sourceTag: "SRC 02",
      format: "PDF",
      description: "Electricity, gas and water statements, often spread across several accounts.",
      footer: ["Separate accounts", "Different billing periods"],
    },
    {
      source: "records",
      title: "Equipment records",
      tag: "observed",
      sourceTag: "SRC 03",
      format: "Paper",
      description: "Nameplates, cut sheets and service logs, often on paper.",
      footer: ["Paper cut sheets", "Not digitized"],
    },
    {
      source: "spreadsheets",
      title: "Spreadsheets and reports",
      tag: "calculated",
      sourceTag: "SRC 04",
      format: "XLSX · PDF",
      description: "Calculations and past studies kept in separate files.",
      footer: ["Separate files", "Re-entered by hand"],
    },
  ],
  /** The example in each panel, by source. */
  examples: {
    photos: { equipment: "Boiler B-1 · Nameplate", photo: "Photo 014 · Mechanical room" },
    bills: { account: "Account ••••4521 · Natural gas", gap: "Missing statement" },
    records: {
      title: "Submittal: hot water boiler",
      // A rating shows its nameplate value, then the same value in SI units
      // in brackets [D]. A no-break space keeps each number with its unit.
      fields: [
        { label: "Rated input", value: "2,000 MBH", si: "586 kW" },
        { label: "Supply", value: "180°F", si: "82°C" },
        { label: "Installed", value: "1998" },
        { label: "Service log", value: "Paper only", severity: "warning" },
      ],
    },
    spreadsheets: {
      rows: [
        { metric: "Baseline gas use", formula: "=SUM(B2:B13)", status: "Manual", severity: "warning" },
        { metric: "Weather adjustment", formula: "=VLOOKUP(…)", status: "#REF!", severity: "error" },
        { metric: "Emission factor", formula: "Pasted from a 2019 report", status: "Outdated", severity: "warning" },
      ],
    },
  },
  closing: "Kept in different places and re-entered by hand.",
  closingChip: "4 sources · 0 links",
} as const;

/**
 * Home, section 3: the product's three parts, each a card with its number,
 * title and action word. The panels hold example data, as its label says.
 */
export const howItWorks = {
  eyebrow: "How it works",
  heading: "Collect. Calculate. Deliver.", // [D]
  label: exampleLabel,
  // [D] The three cards: title, action word (shown in the uppercase label
  // style), text and panel rows. Approved: the INPUTS, ANALYSIS and REPORT
  // labels, the "Captured" status and the "—".
  collect: {
    number: "01",
    title: "Field app",
    action: "Collect",
    text: "A checklist-driven app for site visits: photos, nameplates, the superintendent interview and building automation data, captured in one place.",
    label: "INPUTS",
    inputs: ["Photos", "Nameplates", "Interview", "Automation data", "Utility bills"],
    /** The status each input ticks to, one by one, as the card comes into view. */
    captured: "Captured",
  },
  calculate: {
    number: "02",
    title: "Engineering analysis",
    action: "Calculate",
    text: "Utility analysis, benchmarking, energy conservation measures and decarbonization pathways, with every assumption labelled and every decision made by the engineer.",
    label: "ANALYSIS",
    /** Each row shows a placeholder line, never a figure. */
    rows: ["Utility analysis", "Benchmark", "Measures", "Pathways"],
  },
  deliver: {
    number: "03",
    title: "Client results",
    action: "Deliver",
    text: "Your report's key results (summary, benchmark, measures and pathways) in one place, designed for 'what if' questions.",
    label: "REPORT",
    rows: ["Executive summary", "Benchmark", "Measures", "Pathways"],
    /** What each row shows in place of a result. */
    empty: "—",
  },
};

export type StepNumber = "01" | "02" | "03" | "04" | "05" | "06" | "07";

type EvidenceStep = {
  number: StepNumber;
  /** Shown after the number, in the label style. */
  action: string;
  title: string;
  tag: ValueTagKind;
  /** What the step says under its title. */
  text: string;
  /** The steps it is worked out from directly. */
  from: StepNumber[];
};

/** Home, section 4. Its values are illustrative, as its label says. */
export const evidenceChain: {
  eyebrow: string;
  heading: string;
  lead: string;
  label: string;
  steps: EvidenceStep[];
  /** Read out before the steps a step is worked out from; screen readers only. */
  basedOn: string;
  /** The flow's pause button, while the flow runs and while it is paused. */
  pause: string;
  play: string;
} = {
  eyebrow: "Traceability",
  heading: "Every number has a source.",
  lead: "Seven steps from a site photo to a draft finding. Select any step to trace where it came from.", // [D]
  label: `${exampleLabel} · not real project data`,
  // [D] 01 → 04; 02 → 05; 03, 04 and 05 → 06; then 06 → 07.
  steps: [
    {
      number: "01",
      action: "Capture",
      title: "Nameplate photo",
      tag: "observed",
      text: "Site photo 014, taken during the inspection of Boiler B-1.",
      from: [],
    },
    {
      number: "02",
      action: "Collect",
      title: "Gas statements",
      tag: "observed",
      text: "Account ••••4521, natural gas, monthly statements; one flagged as missing.",
      from: [],
    },
    {
      number: "03",
      action: "Assume",
      title: "Seasonal efficiency",
      tag: "assumed",
      text: "Entered by the engineer and labelled as an assumption wherever it is used.",
      from: [],
    },
    {
      number: "04",
      action: "Extract",
      // [D] With the SI value. No-break spaces hold "2,000 MBH (586 kW)" together,
      // so the title breaks after "Rated input:": in the comb always, in the list
      // when it wraps.
      title: "Rated input: 2,000 MBH (586 kW)",
      tag: "observed",
      text: "Read from the nameplate in site photo 014.",
      from: ["01"],
    },
    {
      number: "05",
      action: "Normalize",
      title: "Weather-normalized baseline",
      tag: "calculated",
      text: "Gas use compared against heating degree days.",
      from: ["02"],
    },
    {
      number: "06",
      action: "Model",
      title: "Boiler replacement scenario",
      tag: "calculated",
      text: "Energy, cost and GHG compared against the baseline. No values shown in this example.",
      from: ["03", "04", "05"],
    },
    {
      number: "07",
      action: "Review",
      title: "Draft finding",
      tag: "awaitingReview",
      text: "Boiler replacement option, prepared for review by a qualified professional.",
      from: ["06"],
    },
  ],
  basedOn: "Based on", // [D]
  pause: "Pause animation", // [D]
  play: "Play animation", // [D]
};

type Principle = { title: string; tags: ValueTagKind[]; text: string };

/** Home, section 5. A principle may have no value tag. */
export const principles: { heading: string; lead: string; items: Principle[] } = {
  heading: `Engineers decide. ${BRAND} does the groundwork.`, // [D]
  lead: `${BRAND} is designed so that:`,
  items: [
    {
      title: "Every value is labelled",
      tags: ["observed", "assumed", "calculated"],
      text: "Observed, assumed and calculated values are labelled separately.",
    },
    {
      title: "Methods travel with results",
      tags: ["calculated"],
      text: "Methods, units and assumptions travel with every result.",
    },
    {
      title: "Qualified people review findings",
      tags: ["awaitingReview"],
      text: "Findings are prepared for review by qualified professionals.",
    },
    {
      title: "Decisions are recorded", // [D]
      tags: [],
      text: "Each engineering decision is saved with its reason, so every result can be traced and revisited.", // [D]
    },
  ],
};

/** Home, section 6: who B.E.E. is built for first, why owners start an audit, and what follows. */
export const buildings = {
  eyebrow: "Who it's for", // [D]
  heading: "Built first for offices and multi-unit residential buildings.", // [D]
  // [D] The two building types it is built for first.
  primary: [
    { title: "Offices", text: "For portfolio and property managers." },
    { title: "Multi-unit residential", text: "Condos and rental apartments, for boards and property managers." },
  ],
  // [D]
  reasons: {
    title: "Owners usually start an audit for:",
    items: [
      "Certifications such as LEED and BOMA BEST",
      "Incentive and funding applications",
      "Emissions reduction targets",
      "Capital planning and budgets",
    ],
  },
  planned: {
    title: "Planned next", // [D]
    // Approved building types, except "Retail" [D].
    types: [
      "Government buildings",
      "Schools and institutions",
      "Hotels",
      "Retail",
      "Industrial and warehouses",
      "Arenas, pools and community centres",
    ],
  },
};

/** Home, section 7, shown only when flags.showTeam is true. The titles are approved. */
export const team = {
  eyebrow: "Founders", // [D]
  heading: "Team",
  // TODO(copy): the founders' names, pending their consent (CONTENT.md, Pending).
  members: [
    { name: "", title: "Co-Founder, Engineering & Building Energy Intelligence" },
    { name: "", title: "Co-Founder, Technology & Platform Development" }, // [D]
  ],
};

/** The buildings the pilot starts with: the pilot band and the Pilot page. Never mention a free audit. */
const pilotFocus = "We're starting with mid- and high-rise residential buildings."; // [D]

/** Home, section 8. */
export const pilotBand = {
  heading: `Help shape ${BRAND} on real buildings.`,
  text: "We are looking for building owners, property managers and engineering firms to join our pilot program.",
  /** Follows the text, in the same paragraph. */
  focus: pilotFocus,
  cta: { label: "Apply for the pilot", href: "/pilot" },
};

/**
 * The Pilot page (CONTENT.md, Pilot page) until its form arrives in
 * milestone 4: the headline, a placeholder line and "What happens next".
 */
export const pilotPage = {
  headline: `Join the ${BRAND} pilot program.`,
  /** Under the headline. */
  focus: pilotFocus,
  // TODO(copy): stands in for the subtext and form until milestone 4.
  placeholder: "The application form is coming soon.", // [D]
  nextHeading: "What happens next",
  nextSteps: ["We review your request", "We schedule a short call", "We agree on scope and data use in writing"],
};

/** The Privacy page: its heading, and the placeholder CONTENT.md sets until the approved text arrives. */
export const privacyPage = {
  heading: "Privacy policy",
  placeholder: "This policy is being finalized.",
};

/**
 * TODO(copy): interface labels CONTENT.md does not cover. Screen readers need
 * them (skip link, landmark names, icon-only buttons), so these are proposals
 * for Kian to approve or replace.
 */
export const ui = {
  skipToContent: "Skip to content",
  menu: "Menu",
  mainNav: "Main",
  footerNav: "Footer",
  linkedIn: "LinkedIn",
};
