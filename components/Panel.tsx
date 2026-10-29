import type { ReactNode } from "react";

type PanelProps = {
  /** The label row: a label on the left, and optionally a tag on the right. */
  label?: string;
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** Product-style detail inside a card (DESIGN.md, Panel). */
export function Panel({ label, aside, className, children }: PanelProps) {
  return (
    <div className={["rounded-container border border-divider bg-bg-alt p-4", className].filter(Boolean).join(" ")}>
      {label && (
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <span className="type-label text-text-secondary">{label}</span>
          {aside}
        </div>
      )}
      {children}
    </div>
  );
}
