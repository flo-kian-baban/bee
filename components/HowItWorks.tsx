import {
  Camera,
  ChartColumn,
  Check,
  CircleDashed,
  ClipboardList,
  type LucideIcon,
  Receipt,
  ScanLine,
  SlidersHorizontal,
  Tag,
  Thermometer,
} from "lucide-react";
import type { ReactNode } from "react";
import { ExampleLabel } from "@/components/ExampleLabel";
import { Panel } from "@/components/Panel";
import { SectionHeading } from "@/components/SectionHeading";
import { ValueTag } from "@/components/ValueTag";
import { howItWorks, sectionIds } from "@/content/site";

// One icon per input type, in CONTENT.md's order.
const inputIcons = [Camera, Thermometer, Tag, Receipt, ClipboardList];
// Each input's place in the order its "Captured" status ticks in (app/globals.css).
const tickIndex = ["[--tick-index:0]", "[--tick-index:1]", "[--tick-index:2]", "[--tick-index:3]", "[--tick-index:4]"];
// The placeholder lines of the Analyze panel: short, and of different lengths.
const placeholderWidths = ["w-3/5", "w-4/5", "w-2/5"];

type StepProps = {
  number: string;
  title: string;
  titleId: string;
  text: string;
  icon: LucideIcon;
  /** Stitch shows the first step's number in brand; the others turn brand on hover. */
  first?: boolean;
  children: ReactNode;
};

function Step({ number, title, titleId, text, icon: Icon, first = false, children }: StepProps) {
  return (
    <li
      data-reveal="up"
      className="group flex flex-col gap-6 rounded-card border border-edge bg-card-low p-7 shadow-xl transition-[border-color,box-shadow] duration-200 hover:border-brand/50 hover:shadow-card-hover-soft"
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
        <h3 id={titleId} className="type-h3 text-text transition-colors group-hover:text-brand">
          {title}
        </h3>
        <p className="type-body text-text-secondary">{text}</p>
      </div>
      <div className="mt-auto">{children}</div>
    </li>
  );
}

/** Home, section 3: the three steps, each with a panel of what it handles. */
export function HowItWorks() {
  const { capture, analyze, optimize } = howItWorks;

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
            <Step number={capture.number} title={capture.title} titleId="step-capture" text={capture.text} icon={ScanLine} first>
              <Panel label={capture.label}>
                {/* As the list comes into view, each input ticks from a dashed circle to "Captured", one by one. */}
                <ul data-reveal="tick" className="flex flex-col gap-2">
                  {capture.inputs.map((input, index) => {
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
                            {capture.captured}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Panel>
            </Step>

            <Step number={analyze.number} title={analyze.title} titleId="step-analyze" text={analyze.text} icon={ChartColumn}>
              <Panel label={analyze.label}>
                <ul className="flex flex-col gap-2.5">
                  {analyze.rows.map((row, index) => (
                    <li key={row} className="flex items-center gap-3 rounded-tag border border-chip bg-bg p-2.5">
                      <span className="w-28 shrink-0 type-label text-text-secondary">{row}</span>
                      <span aria-hidden className="flex-1">
                        <span className={`block h-1.5 rounded-full bg-divider ${placeholderWidths[index]}`} />
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </Step>

            <Step
              number={optimize.number}
              title={optimize.title}
              titleId="step-optimize"
              text={optimize.text}
              icon={SlidersHorizontal}
            >
              <Panel label={optimize.label} aside={<ValueTag kind="awaitingReview" />}>
                <table aria-labelledby="step-optimize" className="w-full border-separate border-spacing-y-1.5 type-label">
                  <thead>
                    <tr className="text-text-secondary">
                      <td />
                      {optimize.columns.map((column) => (
                        <th key={column} scope="col" className="px-1 text-right font-normal">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {optimize.scenarios.map((scenario) => (
                      <tr key={scenario}>
                        <th
                          scope="row"
                          className="rounded-l-tag border-y border-l border-chip bg-bg py-2 pr-1 pl-2 text-left font-normal text-text-soft"
                        >
                          {scenario}
                        </th>
                        {optimize.columns.map((column, index) => (
                          <td
                            key={column}
                            className={`border-y border-chip bg-bg px-1 py-2 text-right text-text-secondary ${index === optimize.columns.length - 1 ? "rounded-r-tag border-r" : ""}`}
                          >
                            {optimize.empty}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Panel>
            </Step>
          </ol>
        </div>
      </div>
    </section>
  );
}
