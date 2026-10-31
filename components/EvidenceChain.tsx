import { EvidenceTrace } from "@/components/EvidenceTrace";
import { ExampleLabel } from "@/components/ExampleLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { evidenceChain } from "@/content/site";

/**
 * Home, section 4: how a draft finding traces back to its sources. Seven steps
 * in three streams converge on a model; selecting a step traces its trail and
 * shows it in the detail panel (components/EvidenceTrace.tsx).
 */
export function EvidenceChain() {
  return (
    <section aria-labelledby="evidence-heading" className="section-x section-y border-y border-divider/70 bg-bg-alt">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div data-reveal="up" className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex max-w-2xl flex-col gap-3">
            <SectionHeading id="evidence-heading" eyebrow={evidenceChain.eyebrow} heading={evidenceChain.heading} />
            <p className="type-lead text-text-secondary">{evidenceChain.lead}</p>
          </div>
          <ExampleLabel className="self-start sm:self-auto">{evidenceChain.label}</ExampleLabel>
        </div>

        <EvidenceTrace />
      </div>
    </section>
  );
}
