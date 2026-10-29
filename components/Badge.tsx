import type { ReactNode } from "react";

/** Status badge: card fill, divider border, full radius, label type and a static brand dot. */
export function Badge({ children }: { children: ReactNode }) {
  // The dot sits inline, so when the text wraps on a narrow screen it stays
  // beside the first line instead of at the badge's left edge.
  return (
    <p className="rounded-full border border-divider bg-card px-3 py-1 text-center text-balance type-label text-text">
      <span aria-hidden className="mr-2 inline-block size-2 rounded-full bg-brand align-middle" />
      {children}
    </p>
  );
}
