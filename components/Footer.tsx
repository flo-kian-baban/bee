import { createLucideIcon, Mail } from "lucide-react";
import { AppLink } from "@/components/AppLink";
import { Logo } from "@/components/Logo";
import { business, flags, footer, ui } from "@/content/site";

// lucide-react 1.x dropped brand icons; this is lucide's former linkedin icon (ISC licence).
const LinkedInIcon = createLucideIcon("linkedin", [
  ["path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z", key: "linkedin-1" }],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "linkedin-2" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "linkedin-3" }],
]);

const linkClass = "inline-flex min-h-11 items-center type-small text-text-secondary transition-colors hover:text-text";

export function Footer() {
  const linkedInUrl = flags.showLinkedIn ? business.linkedInUrl : undefined;
  const hasContact = Boolean(business.contactEmail || linkedInUrl);

  return (
    <footer className="border-t border-divider/70 bg-bg-alt">
      <div className="page-container flex flex-col gap-12 py-16">
        <div className="grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm type-body text-text-secondary">{footer.descriptor}</p>
          </div>

          <nav aria-label={ui.footerNav} className="md:col-span-4">
            <ul>
              {footer.links.map((link) => (
                <li key={link.href}>
                  <AppLink href={link.href} className={linkClass}>
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          {hasContact && (
            <div className="flex flex-col items-start gap-1 md:col-span-3">
              {business.contactEmail && (
                <AppLink href={`mailto:${business.contactEmail}`} className={`${linkClass} gap-2 hover:text-brand`}>
                  <Mail size={16} aria-hidden />
                  {business.contactEmail}
                </AppLink>
              )}
              {linkedInUrl && (
                <AppLink
                  href={linkedInUrl}
                  aria-label={ui.linkedIn}
                  className="flex size-11 items-center justify-center rounded-tile border border-divider bg-card text-text-secondary transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <LinkedInIcon size={18} aria-hidden />
                </AppLink>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center border-t border-divider/60 pt-8 sm:items-start">
          <div className="flex flex-wrap items-center justify-center gap-x-6 type-label text-text-secondary">
            <AppLink href={footer.privacy.href} className="inline-flex min-h-11 items-center transition-colors hover:text-text">
              {footer.privacy.label}
            </AppLink>
            <p className="tabular-nums">{footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
