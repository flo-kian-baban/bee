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
export const sectionIds = { howItWorks: "how-it-works", buildings: "buildings", team: "team" };

const sectionLinks: SiteLink[] = [
  { label: "How it works", href: `/#${sectionIds.howItWorks}` },
  { label: "Buildings", href: `/#${sectionIds.buildings}` },
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
  description: `${BRAND} connects building inspections, data processing and engineering analysis into traceable energy intelligence. In development, with a pilot program open.`,
};

/** Home, section 1. */
export const hero = {
  badge: "In development · Pilot program open",
  headline: "Every Building. Better Energy Intelligence.",
  /** The words of the headline shown in brand yellow. */
  headlineHighlight: "Energy Intelligence",
  subtext: `${BRAND} connects physical building inspections, intelligent data processing and engineering-based analysis to turn fragmented building information into transparent, actionable energy intelligence.`,
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

/** Home, section 2. */
export const problem = {
  eyebrow: "Today",
  heading: "Building energy data is scattered.",
  panels: [
    {
      source: "photos",
      title: "Site photos",
      tag: "observed",
      description: "Equipment, conditions and nameplates, photographed during inspections.",
    },
    {
      source: "bills",
      title: "Utility bills",
      tag: "observed",
      description: "Electricity, gas and water statements, often spread across several accounts.",
    },
    {
      source: "records",
      title: "Equipment records",
      tag: "observed",
      description: "Nameplates, cut sheets and service logs, often on paper.",
    },
    {
      source: "spreadsheets",
      title: "Spreadsheets and reports",
      tag: "calculated",
      description: "Calculations and past studies kept in separate files.",
    },
  ],
  closing: "Kept in different places and re-entered by hand.",
} as const;

/** Home, section 3. */
export const howItWorks = {
  eyebrow: "How it works",
  heading: "Capture. Analyze. Optimize.",
  capture: {
    number: "01",
    title: "Capture",
    text: "Site photographs, thermal images, equipment nameplates, utility bills and operating records, collected in one structured workflow.",
    label: "INPUTS",
    inputs: ["Photos", "Thermal images", "Nameplates", "Utility bills", "Operating records"],
  },
  analyze: {
    number: "02",
    title: "Analyze",
    text: "Utility benchmarking, engineering calculations and energy conservation measures, with every assumption visible.",
    label: "METHOD",
    rows: ["Method", "Assumptions", "Units"],
  },
  optimize: {
    number: "03",
    title: "Optimize",
    text: "Energy, cost and greenhouse gas scenarios for retrofit decisions, prepared for qualified engineering review.",
    label: "SCENARIOS",
    scenarios: ["Scenario A", "Scenario B"],
    columns: ["Energy", "Cost", "GHG"],
    empty: "—",
  },
};

type EvidenceNode = { step: string; title: string; text: string; meta: { text?: string; tag: ValueTagKind }[] };

/** Home, section 4. Its values are illustrative, as its label says. */
export const evidenceChain: {
  eyebrow: string;
  heading: string;
  lead: string;
  label: string;
  nodes: EvidenceNode[];
} = {
  eyebrow: "Traceability",
  heading: "Every number has a source.",
  lead: "Select any step to see where it came from.",
  label: "Illustrative example · not real project data",
  nodes: [
    {
      step: "STEP 01",
      title: "Nameplate photo",
      text: "Photographed on site during the inspection.",
      meta: [{ text: "Source: site photo 014", tag: "observed" }],
    },
    {
      step: "STEP 02",
      title: "Extracted value",
      text: "Rated input: 2,000 MBH",
      meta: [{ text: "Extracted from site photo 014", tag: "observed" }],
    },
    {
      step: "STEP 03",
      title: "Calculation",
      text: "Annual heating energy, weather-normalized against heating degree days.",
      meta: [
        { text: "Seasonal efficiency: engineer input", tag: "assumed" },
        { text: "Annual heating energy", tag: "calculated" },
      ],
    },
    {
      step: "STEP 04",
      title: "Finding",
      text: "Draft measure: boiler replacement option.",
      meta: [{ tag: "awaitingReview" }],
    },
  ],
};

type Principle = { title: string; tags: ValueTagKind[]; text: string };

/** Home, section 5. */
export const principles: { heading: string; lead: string; items: Principle[] } = {
  heading: "AI assists engineers. It doesn't replace them.",
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
  ],
};

/** Home, section 6. */
export const buildings = {
  eyebrow: "Building types",
  heading: "Designed for every building type.",
  types: [
    "Condominiums",
    "Rental apartments",
    "Offices and retail",
    "Government buildings",
    "Schools and institutions",
    "Hotels",
    "Industrial and warehouses",
    "Arenas, pools and community centres",
  ],
};

/** Home, section 7, shown only when flags.showTeam is true. The titles are approved. */
export const team = {
  eyebrow: "Founders", // [D]
  heading: "Team",
  // TODO(copy): the founders' names, pending their consent (CONTENT.md, Pending).
  members: [
    { name: "", title: "Co-Founder, Engineering & Building Energy Intelligence" },
    { name: "", title: "Co-Founder, AI & Technology Development" },
  ],
};

/** Home, section 8. */
export const pilotBand = {
  heading: `Help shape ${BRAND} on real buildings.`,
  text: "We are looking for building owners, property managers and engineering firms to join our pilot program.",
  cta: { label: "Apply for the pilot", href: "/pilot" },
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
