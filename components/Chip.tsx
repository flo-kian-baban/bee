import { CircleAlert, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

/** A chip (DESIGN.md, Components): chip fill and border, tag radius, a label in text-soft. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-tag border border-chip-border bg-chip px-1.5 py-0.5 type-label whitespace-nowrap text-text-soft">
      {children}
    </span>
  );
}

export type Severity = "warning" | "error";

// Each severity has its own icon, so the colour is never the only signal.
const severities = {
  warning: { icon: TriangleAlert, className: "text-warning" },
  error: { icon: CircleAlert, className: "text-error" },
};

/** A status chip in an example panel (DESIGN.md, Components): an icon and its text, in the warning or error token. */
export function StatusChip({ severity, children }: { severity: Severity; children: ReactNode }) {
  const { icon: Icon, className } = severities[severity];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-tile border border-divider bg-card-low px-2 py-0.5 type-label whitespace-nowrap ${className}`}
    >
      <Icon size={14} aria-hidden className="shrink-0" />
      {children}
    </span>
  );
}
