import { EvidenceFlow } from "@/components/EvidenceFlow";
import { SectionHeading } from "@/components/SectionHeading";
import { evidenceChain, sectionIds } from "@/content/site";

/**
 * Home, section 4: how a draft finding traces back to its sources. Seven
 * steps converge on a model and its review, and dots flow along the
 * connectors between them (components/EvidenceFlow.tsx).
 */
export function EvidenceChain() {
  return (
    <section
      id={sectionIds.evidenceChain}
      aria-labelledby="evidence-heading"
      className="section-x section-y border-y border-divider/70 bg-bg-alt"
    >
      <EvidenceFlow>
        <div className="flex max-w-2xl flex-col gap-3">
          <SectionHeading id="evidence-heading" eyebrow={evidenceChain.eyebrow} heading={evidenceChain.heading} />
          <p className="type-lead text-text-secondary">{evidenceChain.lead}</p>
        </div>
      </EvidenceFlow>
    </section>
  );
}
