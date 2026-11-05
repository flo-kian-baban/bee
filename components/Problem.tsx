import { Camera, Hexagon, Keyboard, Receipt, Sheet, Wrench } from "lucide-react";
import { Chip } from "@/components/Chip";
import { ExampleLabel } from "@/components/ExampleLabel";
import { FlowTrack, HEX_WIDTH, hexOutline } from "@/components/Flow";
import { HubBoard } from "@/components/HubBoard";
import { Logo } from "@/components/Logo";
import { SectionHeading } from "@/components/SectionHeading";
import { SourcePanel } from "@/components/SourcePanel";
import { ValueTag } from "@/components/ValueTag";
import { BRAND, problem, sectionIds } from "@/content/site";

const icons = { photos: Camera, bills: Receipt, records: Wrench, spreadsheets: Sheet };

/**
 * From 1024px, each card's corner around the hub, in card order: its place
 * on the grid, and its connector's turn toward it and place in the flow's
 * order (app/globals.css, hub-link).
 */
const corners = [
  { place: "lg:col-start-1 lg:row-start-1", link: "[--hub-turn:-45deg] [--hub-track-order:0]" },
  { place: "lg:col-start-3 lg:row-start-1", link: "[--hub-turn:45deg] [--hub-track-order:1]" },
  { place: "lg:col-start-1 lg:row-start-3", link: "[--hub-turn:-135deg] [--hub-track-order:2]" },
  { place: "lg:col-start-3 lg:row-start-3", link: "[--hub-turn:135deg] [--hub-track-order:3]" },
];

/**
 * A card header's two groups stack, title over value tag and source over
 * format, while the header is too narrow for one line and wide enough for
 * two (DESIGN.md, Problem card). Narrower still, on phones, they wrap.
 */
const stacked = "@min-[21.25rem]:@max-[32rem]:flex-col";

/**
 * Below 1024px, a card's stretch of the rail down the left of the stack, and
 * from the last card, the stub into the hub. Its trigger sits at the foot of
 * the stretch, so the whole stretch is in view when the dots set off.
 */
function Rail({ index, last }: { index: number; last: boolean }) {
  return (
    <span
      aria-hidden="true"
      data-hub-flow=""
      data-hub-link={index}
      data-hub-into={last ? "" : undefined}
      className="pointer-events-none absolute inset-0 lg:hidden"
    >
      <span className={`hub-rail ${last ? "hub-rail-last" : ""}`}>
        <FlowTrack ports={["start"]} />
        <span data-reveal="hub" className="absolute bottom-0 left-1/2 size-px" />
      </span>
      {last && (
        <span className="hub-stub">
          <FlowTrack />
        </span>
      )}
    </span>
  );
}

/**
 * The hub: the B.E.E. hexagon the cards connect to. From 1024px it sits
 * where the cards' central gaps cross, with a dotted connector from each
 * card's inner corner, and the connectors' trigger just below the lower
 * cards' corners; below, it sits after the stack.
 */
function Hub() {
  return (
    <div
      data-reveal="up"
      className="relative ml-(--hub-rail-gutter) h-(--hub-height) lg:col-start-2 lg:row-start-2 lg:ml-0 lg:h-auto"
    >
      <span
        aria-hidden="true"
        data-hub-flow=""
        data-hub-into=""
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {corners.map((corner, index) => (
          <span key={corner.place} data-hub-link={index} className={`hub-link ${corner.link}`}>
            <FlowTrack ports={["start"]} />
          </span>
        ))}
        <span data-reveal="hub" className="absolute top-full left-1/2 size-px" />
      </span>

      <div
        role="img"
        aria-label={BRAND}
        className="absolute top-1/2 left-1/2 flex h-(--hub-height) w-(--hub-width) -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox={`0 0 ${HEX_WIDTH} 1000`}
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible"
        >
          <path d={hexOutline} vectorEffect="non-scaling-stroke" className="fill-card stroke-brand/60" />
        </svg>
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox={`0 0 ${HEX_WIDTH} 1000`}
          preserveAspectRatio="none"
          className="hub-light absolute inset-0 size-full overflow-visible drop-shadow-light"
        >
          <path d={hexOutline} vectorEffect="non-scaling-stroke" strokeWidth={2} className="fill-none stroke-brand" />
        </svg>
        <span className="relative flex">
          <Logo />
        </span>
      </div>
    </div>
  );
}

/** Home, section 2: where building energy data lives today, and the hub that connects it. */
export function Problem() {
  return (
    <section
      id={sectionIds.problem}
      aria-labelledby="problem-heading"
      className="section-x border-y border-divider/70 bg-bg-alt py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div
          data-reveal="up"
          className="flex flex-col justify-between gap-4 border-b border-divider/60 pb-2 md:flex-row md:items-end"
        >
          <SectionHeading id="problem-heading" eyebrow={problem.eyebrow} heading={problem.heading} large accent="dot" />
          <ExampleLabel className="mb-2 shrink-0 self-start md:self-auto">{problem.label}</ExampleLabel>
        </div>

        {/* From 1024px, the cards on a 2 × 2 grid around the hub's cell; below, a
            stack with the rail in a gutter on its left, and the hub after it. */}
        <HubBoard className="@container flex flex-col gap-(--hub-stack-gap) lg:grid lg:grid-cols-[1fr_var(--hub-gap)_1fr] lg:grid-rows-[auto_var(--hub-gap)_auto] lg:gap-0">
          <ul className="grid gap-(--hub-stack-gap) pl-(--hub-rail-gutter) lg:col-span-full lg:row-span-full lg:grid-cols-subgrid lg:grid-rows-subgrid lg:gap-0 lg:pl-0">
            {problem.panels.map((panel, index) => {
              const Icon = icons[panel.source];
              return (
                <li
                  key={panel.source}
                  data-reveal="up"
                  data-hub-card={index}
                  className={`relative flex flex-col gap-6 rounded-card border border-divider bg-card-low/90 p-6 shadow-lg transition-[border-color,box-shadow] duration-200 hover:border-brand/50 hover:shadow-card-hover lg:p-7 ${corners[index].place}`}
                >
                  <div className="@container flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-divider/70 pb-3">
                    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${stacked} @min-[21.25rem]:@max-[32rem]:items-start`}>
                      <h3 className="flex items-center gap-2 type-label font-medium text-text">
                        <Icon size={18} aria-hidden className="shrink-0 text-brand" />
                        {panel.title}
                      </h3>
                      <ValueTag kind={panel.tag} />
                    </div>
                    <p className={`flex items-center gap-2 type-label text-text-secondary ${stacked} @min-[21.25rem]:@max-[32rem]:items-end`}>
                      {panel.sourceTag}
                      <Chip>{panel.format}</Chip>
                    </p>
                  </div>
                  <SourcePanel source={panel.source} />
                  <p className="type-body text-text-secondary">{panel.description}</p>
                  <ul className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-divider/70 pt-3 type-label">
                    <li className="flex items-center gap-1.5 text-text-secondary">
                      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-text-secondary" />
                      {panel.footer[0]}
                    </li>
                    <li className="text-text-soft">{panel.footer[1]}</li>
                  </ul>
                  <Rail index={index} last={index === problem.panels.length - 1} />
                </li>
              );
            })}
          </ul>
          <Hub />
        </HubBoard>

        <div
          data-reveal="up"
          className="flex flex-col items-center justify-between gap-4 rounded-container border border-divider bg-card-low p-5 shadow-md lg:flex-row"
        >
          <div className="flex flex-col items-center gap-3.5 sm:flex-row">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-tile border border-divider bg-bg-alt text-brand">
              <Keyboard size={20} aria-hidden />
            </span>
            <p className="text-center type-body text-text-soft sm:text-left">{problem.closing}</p>
          </div>
          <p className="flex items-center gap-2.5 text-center type-body text-text lg:text-left">
            <Hexagon size={16} aria-hidden className="shrink-0 text-brand" />
            {problem.closingHub}
          </p>
        </div>
      </div>
    </section>
  );
}
