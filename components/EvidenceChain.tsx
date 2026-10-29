import { Braces, ClipboardList, ScanLine, Sigma } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ValueTag } from "@/components/ValueTag";
import { evidenceChain } from "@/content/site";

// One icon per node, in order: the photo, the value read from it, the
// calculation that uses it, and the finding.
const icons = [ScanLine, Braces, Sigma, ClipboardList];

/**
 * Home, section 4: how a finding traces back to a site photo. Static for now;
 * milestone 3 makes each node a button that highlights its sources.
 */
export function EvidenceChain() {
  const { nodes } = evidenceChain;

  return (
    <section aria-labelledby="evidence-heading" className="section-x section-y border-y border-divider/70 bg-bg-alt">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-3">
            <SectionHeading id="evidence-heading" eyebrow={evidenceChain.eyebrow} heading={evidenceChain.heading} />
            <p className="type-lead text-text-secondary">{evidenceChain.lead}</p>
          </div>
          <p className="flex items-center gap-2 self-start rounded-chip border border-divider bg-card px-3.5 py-1.5 type-label text-text-secondary sm:self-auto">
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand" />
            {evidenceChain.label}
          </p>
        </div>

        <div className="relative">
          {/* From 1024px, a dashed line joins the nodes behind the cards. */}
          <svg aria-hidden="true" focusable="false" className="absolute inset-x-12 top-1/2 hidden h-0.5 w-[calc(100%-6rem)] -translate-y-1/2 lg:block">
            <line x1="0" x2="100%" y1="1" y2="1" strokeWidth={2} className="stroke-divider" />
            <line x1="0" x2="100%" y1="1" y2="1" strokeWidth={2} strokeDasharray="6 6" className="stroke-brand/80" />
          </svg>

          <ol className="relative grid gap-4 lg:grid-cols-4">
            {nodes.map((node, index) => {
              const Icon = icons[index];
              return (
                <li
                  key={node.title}
                  className="group relative flex flex-col gap-5 rounded-container border border-edge bg-card p-6 shadow-lg transition-colors hover:border-brand/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="type-label font-medium text-text-secondary">{node.step}</span>
                    <Icon size={20} aria-hidden className="text-text-secondary transition-colors group-hover:text-brand" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="type-title text-text">{node.title}</h3>
                    <p className="type-body text-text-secondary">{node.text}</p>
                  </div>
                  <ul className="mt-auto flex flex-col gap-2 border-t border-divider/70 pt-3">
                    {node.meta.map((meta) => (
                      <li key={meta.tag + (meta.text ?? "")} className="flex flex-wrap items-center justify-between gap-2">
                        {meta.text && <span className="type-label text-text-secondary">{meta.text}</span>}
                        <ValueTag kind={meta.tag} />
                      </li>
                    ))}
                  </ul>
                  {index < nodes.length - 1 && (
                    // Below 1024px the nodes stack, joined by a short dashed line.
                    <span
                      aria-hidden
                      className="absolute top-full left-1/2 h-4 -translate-x-1/2 border-l-2 border-dashed border-brand/80 lg:hidden"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
