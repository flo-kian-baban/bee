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

const sectionLinks: SiteLink[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Buildings", href: "/#buildings" },
  ...(flags.showTeam ? [{ label: "Team", href: "/#team" }] : []),
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

// [D]
export const notFoundPage = {
  heading: "Page not found.",
  text: "The page you are looking for does not exist or has moved.",
  cta: { label: "Back to home", href: "/" },
};

// [D]
export const meta = {
  title: `${BRAND} · Building Energy Intelligence`,
  description: `${BRAND} connects building inspections, data processing and engineering analysis into traceable energy intelligence. In development, with a pilot program open.`,
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
