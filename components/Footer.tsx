import { createLucideIcon } from "lucide-react";
import { AppLink } from "@/components/AppLink";
import { Logo } from "@/components/Logo";
import { business, flags, footer, ui } from "@/content/site";

// lucide-react 1.x dropped brand icons; this is lucide's former linkedin icon (ISC licence).
const LinkedInIcon = createLucideIcon("linkedin", [
  ["path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z", key: "linkedin-1" }],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "linkedin-2" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "linkedin-3" }],
]);

const linkClass = "inline-flex min-h-11 items-center text-text-secondary transition-colors hover:text-text";

export function Footer() {
  const linkedInUrl = flags.showLinkedIn ? business.linkedInUrl : undefined;
  const hasContact = Boolean(business.contactEmail || linkedInUrl);

  return (
    <footer className="border-t border-divider bg-bg-alt">
      <div className="page-container">
        <div className="grid gap-12 py-12 md:grid-cols-12 md:gap-6 md:py-18">
          <div className="md:col-span-6">
            <Logo />
            <p className="mt-4 text-text-secondary">{footer.descriptor}</p>
          </div>

          <nav aria-label={ui.footerNav} className="md:col-span-3">
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
            <div className="flex flex-col items-start md:col-span-3">
              {business.contactEmail && (
                <AppLink href={`mailto:${business.contactEmail}`} className={linkClass}>
                  {business.contactEmail}
                </AppLink>
              )}
              {linkedInUrl && (
                <AppLink
                  href={linkedInUrl}
                  aria-label={ui.linkedIn}
                  className={`${linkClass} min-w-11 justify-center`}
                >
                  <LinkedInIcon size={24} aria-hidden />
                </AppLink>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-start border-t border-divider py-6 md:flex-row md:items-center md:justify-between">
          <AppLink href={footer.privacy.href} className={linkClass}>
            {footer.privacy.label}
          </AppLink>
          <p className="flex min-h-11 items-center text-text-secondary">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
