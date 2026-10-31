import { Braces, ClipboardList, ScanLine, Sigma } from "lucide-react";
import { ExampleLabel } from "@/components/ExampleLabel";
import { hexagon } from "@/components/Honeycomb";
import { SectionHeading } from "@/components/SectionHeading";
import { ValueTag } from "@/components/ValueTag";
import { evidenceChain } from "@/content/site";

// One icon per node, in order: the photo, the value read from it, the
// calculation that uses it, and the finding.
const icons = [ScanLine, Braces, Sigma, ClipboardList];

// A cell's outline: a pointy-top hexagon, corner to corner 1000 units tall,
// stretched over the cell, which has the same proportions (comb-cell).
const CELL_RADIUS = 500;
const cellWidth = Math.sqrt(3) * CELL_RADIUS;
const cellOutline = hexagon(cellWidth / 2, CELL_RADIUS, CELL_RADIUS);

// Where each cell sits in the comb (app/globals.css). Below 640px the cells
// stack. From 640px they go down the page, alternating left and right, each
// nesting into the one above. From 1024px they run left to right, alternating
// between an upper and a lower row.
const cellPlacement = [
  "sm:col-start-1 sm:row-start-1 lg:col-start-1",
  "sm:col-start-2 sm:row-start-2 sm:comb-nest lg:col-start-2 lg:comb-drop",
  "sm:col-start-1 sm:row-start-3 sm:comb-nest lg:col-start-3 lg:mt-0",
  "sm:col-start-2 sm:row-start-4 sm:comb-nest lg:col-start-4 lg:comb-drop",
];

// Where the connector to the next cell leaves each cell: the middle of the
// wall the two cells share, pointing straight across the gap. While the cells
// stack, it leaves from the bottom corner, pointing down.
const connectorPlacement = [
  "sm:left-3/4 sm:top-[87.5%] sm:rotate-60",
  "sm:left-1/4 sm:top-[87.5%] sm:rotate-[120deg] lg:left-3/4 lg:top-[12.5%] lg:-rotate-60",
  "sm:left-3/4 sm:top-[87.5%] sm:rotate-60",
];

/**
 * The dotted connector from one cell to the next: a port on each wall, and dots
 * across the gap between them. It draws once, from the earlier step to the
 * later, after the cells have faded in.
 */
function Connector({ id, className }: { id: string; className: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-reveal="draw"
      className={`reveal-behind absolute top-full left-1/2 z-10 -mt-1 -ml-[3px] h-2 w-[calc(var(--comb-gap)+6px)] origin-[3px_50%] rotate-90 overflow-visible ${className}`}
    >
      <mask id={id}>
        <line x1="0" x2="100%" y1="4" y2="4" strokeWidth={8} pathLength={1} className="draw-stroke stroke-text" />
      </mask>
      <g mask={`url(#${id})`}>
        <line
          x1="3"
          x2="100%"
          y1="4"
          y2="4"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="0 5"
          className="stroke-brand/80"
        />
        <circle cx="3" cy="4" r="3" className="fill-brand" />
        <circle cx="100%" cy="4" r="3" transform="translate(-3 0)" className="fill-brand" />
      </g>
    </svg>
  );
}

/**
 * Home, section 4: how a finding traces back to a site photo, as four cells of
 * a comb joined by dotted connectors. Static for now; milestone 3 makes each
 * cell a button that highlights its sources.
 */
export function EvidenceChain() {
  const { nodes } = evidenceChain;

  return (
    <section aria-labelledby="evidence-heading" className="section-x section-y border-y border-divider/70 bg-bg-alt">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div data-reveal="up" className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-3">
            <SectionHeading id="evidence-heading" eyebrow={evidenceChain.eyebrow} heading={evidenceChain.heading} />
            <p className="type-lead text-text-secondary">{evidenceChain.lead}</p>
          </div>
          <ExampleLabel className="self-start sm:self-auto">{evidenceChain.label}</ExampleLabel>
        </div>

        <ol className="flex w-full flex-col gap-(--comb-gap) sm:comb-column sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-x-(--comb-gap) sm:gap-y-0 lg:comb-row lg:grid-cols-5">
          {nodes.map((node, index) => {
            const Icon = icons[index];
            return (
              // Only the hexagon takes the pointer, not the corners of the cell's
              // box, which reach into its neighbours.
              <li
                key={node.title}
                data-reveal="up"
                className={`group comb-cell pointer-events-none relative mx-auto flex w-full max-w-(--comb-cell) flex-col items-center justify-center px-6 py-12 text-center sm:col-span-2 sm:mx-0 sm:max-w-none sm:self-start lg:row-start-1 ${cellPlacement[index]}`}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox={`0 0 ${cellWidth} ${2 * CELL_RADIUS}`}
                  preserveAspectRatio="none"
                  className="absolute inset-0 size-full overflow-visible"
                >
                  <path
                    d={cellOutline}
                    vectorEffect="non-scaling-stroke"
                    className="pointer-events-auto fill-card stroke-edge transition-colors duration-200 group-hover:stroke-brand/50"
                  />
                </svg>

                {/* Centred and at most 280px wide, so the wide lines stay in the cell's
                    middle, and only the short ones reach into its narrowing corners. */}
                <div className="relative flex max-w-70 flex-col items-center gap-3">
                  <span className="flex items-center gap-2 type-label font-medium text-text-secondary">
                    <Icon size={20} aria-hidden className="shrink-0 transition-colors group-hover:text-brand" />
                    {node.step}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="type-title text-text">{node.title}</h3>
                    <p className="type-body text-balance text-text-secondary">{node.text}</p>
                  </div>
                  <ul className="flex flex-col items-center gap-2">
                    {node.meta.map((meta) => (
                      <li key={meta.tag + (meta.text ?? "")} className="flex flex-col items-center gap-1">
                        {meta.text && <span className="type-label text-balance text-text-secondary">{meta.text}</span>}
                        <ValueTag kind={meta.tag} />
                      </li>
                    ))}
                  </ul>
                </div>

                {index < nodes.length - 1 && (
                  <Connector id={`evidence-connector-${index + 1}`} className={connectorPlacement[index]} />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
