import type { ReactNode } from "react";

/**
 * The "Illustrative example" label (DESIGN.md, Components) that every section
 * with example panels shows beside its heading (CLAUDE.md, rule 2).
 */
export function ExampleLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={[
        "flex items-center gap-2 rounded-chip border border-divider bg-card px-3.5 py-1.5 type-label text-text-secondary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand" />
      {children}
    </p>
  );
}
