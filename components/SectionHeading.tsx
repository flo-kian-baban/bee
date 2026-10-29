type SectionHeadingProps = {
  /** The h2's id, which the section takes as its name. */
  id: string;
  heading: string;
  eyebrow?: string;
  /** The larger h2 of the Problem and How it works sections. */
  large?: boolean;
  /** A brand dot before the eyebrow; "brand" also sets the eyebrow in brand at 500. */
  accent?: "dot" | "brand";
};

/** A section's eyebrow and h2 (DESIGN.md, Section header). */
export function SectionHeading({ id, heading, eyebrow, large = false, accent }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      {eyebrow && (
        <p
          className={`flex items-center gap-2 type-label ${accent === "brand" ? "font-medium text-brand" : "text-text-secondary"}`}
        >
          {accent && <span aria-hidden className="size-2 shrink-0 rounded-full bg-brand" />}
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={`${large ? "type-h2-lg" : "type-h2"} text-text`}>
        {heading}
      </h2>
    </div>
  );
}
