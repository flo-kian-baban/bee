import { Clock } from "lucide-react";
import { type ValueTagKind, valueTags } from "@/content/site";

// Each kind differs by its text and border style, not by colour alone (DESIGN.md, Value tag).
const styles: Record<ValueTagKind, string> = {
  observed: "border-text text-text",
  assumed: "border-dashed border-text-secondary text-text-secondary",
  calculated: "border-brand text-brand",
  awaitingReview: "border-transparent bg-card text-text-secondary",
};

/** Where a value comes from: observed, assumed, calculated, or awaiting review. */
export function ValueTag({ kind }: { kind: ValueTagKind }) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-tag border px-2 py-0.5 type-label ${styles[kind]}`}
    >
      {kind === "awaitingReview" && <Clock size={14} aria-hidden className="shrink-0" />}
      {valueTags[kind]}
    </span>
  );
}
