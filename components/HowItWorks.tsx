import {
  Camera,
  ChartColumn,
  Check,
  CircleDashed,
  Cpu,
  type LucideIcon,
  MessagesSquare,
  Receipt,
  ScanLine,
  SlidersHorizontal,
  Tag,
} from "lucide-react";
import type { ReactNode } from "react";
import { ExampleLabel } from "@/components/ExampleLabel";
import { Panel } from "@/components/Panel";
import { SectionHeading } from "@/components/SectionHeading";
import { ValueTag } from "@/components/ValueTag";
import { howItWorks, sectionIds } from "@/content/site";

// One icon per input, in CONTENT.md's order.
const inputIcons = [Camera, Tag, MessagesSquare, Cpu, Receipt];
// Each input's place in the order its "Captured" status ticks in (app/globals.css).
const tickIndex = ["[--tick-index:0]", "[--tick-index:1]", "[--tick-index:2]", "[--tick-index:3]", "[--tick-index:4]"];
// The placeholder lines of the analysis panel: short, and of different lengths.
const placeholderWidths = ["w-3/5", "w-4/5", "w-2/5", "w-1/2"];
// A row in the analysis and report panels.
const row = "rounded-tag border border-chip bg-bg p-2.5";
// From 1024 to 1279px the three cards are at their narrowest, so the cards and
// their panels take less padding at the sides.
const narrowPanel = "lg:max-[1280px]:px-3";

type StepProps = {
  number: string;
  /** The part's name, then what it is, under it. */
  name: string;
  kind: string;
  text: string;
  icon: LucideIcon;
  /** Stitch shows the first step's number in brand; the others turn brand on hover. */
  first?: boolean;
  children: ReactNode;
};

function Step({ number, name, kind, text, icon: Icon, first = false, children }: StepProps) {
  return (
    <li
      data-reveal="up"
      className="group flex flex-col gap-6 rounded-card border border-edge bg-card-low p-7 shadow-xl lg:max-[1280px]:px-5 transition-[border-color,box-shadow] duration-200 hover:border-brand/50 hover:shadow-card-hover-soft"
    >
      <div className="flex items-center justify-between border-b border-divider pb-4">
        <span
          className={`type-numeral tabular-nums ${first ? "text-brand" : "text-text transition-colors group-hover:text-brand"}`}
        >
          {number}
        </span>
        <span className="flex size-11 items-center justify-center rounded-container border border-divider bg-bg text-text-soft transition-colors group-hover:text-brand">
          <Icon size={24} aria-hidden />
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {/* The space keeps the name and what it is apart as words for screen readers. */}
        <h3 className="flex flex-col gap-1">
          <span className="type-h3 text-text transition-colors group-hover:text-brand">{name}</span>{" "}
          <span className="type-label font-medium text-text-secondary">{kind}</span>
        </h3>
        <p className="type-body text-text-secondary">{text}</p>
      </div>
      <div className="mt-auto">{children}</div>
    </li>
  );
}

/** Home, section 3: the product's three parts, each with a panel of what it handles. */
export function HowItWorks() {
  const { collect, calculate, deliver } = howItWorks;

  return (
    <section id={sectionIds.howItWorks} aria-labelledby="how-it-works-heading" className="section-x section-y">
      <div className="mx-auto flex max-w-7xl flex-col gap-14">
        <div
          data-reveal="up"
          className="flex flex-col justify-between gap-4 border-b border-divider/70 pb-6 md:flex-row md:items-end"
        >
          <SectionHeading
            id="how-it-works-heading"
            eyebrow={howItWorks.eyebrow}
            heading={howItWorks.heading}
            large
            accent="brand"
          />
          <ExampleLabel className="shrink-0 self-start md:self-auto">{howItWorks.label}</ExampleLabel>
        </div>

        <div className="relative">
          {/* The line that joins 01, 02 and 03, seen between the cards from 1024px. It draws once, as it
              comes into view, after the cards have faded in. */}
          <div aria-hidden className="absolute top-12 right-16 left-16 hidden h-0.5 lg:block">
            <svg data-reveal="draw" focusable="false" className="reveal-behind block size-full overflow-visible">
              <line x1="0" x2="100%" y1="1" y2="1" strokeWidth={2} pathLength={1} className="draw-stroke stroke-divider" />
              <line x1="0" x2="100%" y1="1" y2="1" strokeWidth={2} pathLength={1} className="draw-stroke stroke-brand/60" />
            </svg>
          </div>

          <ol className="relative grid gap-8 lg:grid-cols-3">
            <Step
              number={collect.number}
              name={collect.name}
              kind={collect.kind}
              text={collect.text}
              icon={ScanLine}
              first
            >
              <Panel label={collect.label} className={narrowPanel}>
                {/* As the list comes into view, each input ticks from a dashed circle to "Captured", one by one. */}
                <ul data-reveal="tick" className="flex flex-col gap-2">
                  {collect.inputs.map((input, index) => {
                    const Icon = inputIcons[index];
                    return (
                      <li
                        key={input}
                        className={`${tickIndex[index]} flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-tag border border-chip bg-bg p-2 type-label`}
                      >
                        <span className="flex items-center gap-1.5 text-text-soft">
                          <Icon size={14} aria-hidden className="shrink-0 text-brand" />
                          {input}
                        </span>
                        <span className="ml-auto grid">
                          <CircleDashed
                            size={14}
                            aria-hidden
                            className="tick-todo col-start-1 row-start-1 self-center justify-self-end text-text-secondary"
                          />
                          <span className="tick-done col-start-1 row-start-1 flex items-center gap-1.5 text-success">
                            <Check size={14} aria-hidden className="shrink-0" />
                            {collect.captured}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Panel>
            </Step>

            <Step
              number={calculate.number}
              name={calculate.name}
              kind={calculate.kind}
              text={calculate.text}
              icon={ChartColumn}
            >
              <Panel label={calculate.label} className={narrowPanel}>
                {/* The rows share one label column, as wide as the longest label, so their lines start together. */}
                <ul className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-3 gap-y-2.5">
                  {calculate.rows.map((label, index) => (
                    <li key={label} className={`col-span-2 grid grid-cols-subgrid items-center ${row}`}>
                      <span className="type-label text-text-secondary">{label}</span>
                      <span aria-hidden>
                        <span className={`block h-1.5 rounded-full bg-divider ${placeholderWidths[index]}`} />
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </Step>

            <Step
              number={deliver.number}
              name={deliver.name}
              kind={deliver.kind}
              text={deliver.text}
              icon={SlidersHorizontal}
            >
              <Panel label={deliver.label} aside={<ValueTag kind="awaitingReview" />} className={narrowPanel}>
                <ul className="flex flex-col gap-2.5">
                  {deliver.rows.map((label) => (
                    <li key={label} className={`flex items-center justify-between gap-3 type-label ${row}`}>
                      <span className="text-text-soft">{label}</span>
                      <span aria-hidden className="text-text-secondary">
                        {deliver.empty}
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </Step>
          </ol>
        </div>
      </div>
    </section>
  );
}
