import type { ReactNode } from "react";

/** Hero status badge (DESIGN.md, Components): translucent card, divider border, full radius, a static brand dot. */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-divider bg-card/90 px-3.5 py-1.5 type-badge text-text-soft shadow-sm backdrop-blur-md">
      <span aria-hidden className="size-2 shrink-0 rounded-full bg-brand" />
      {children}
    </p>
  );
}
