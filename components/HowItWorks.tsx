import {
  Camera,
  ChartColumn,
  ClipboardList,
  type LucideIcon,
  Receipt,
  ScanLine,
  SlidersHorizontal,
  Tag,
  Thermometer,
} from "lucide-react";
import type { ReactNode } from "react";
import { Panel } from "@/components/Panel";
import { SectionHeading } from "@/components/SectionHeading";
import { ValueTag } from "@/components/ValueTag";
import { howItWorks, sectionIds } from "@/content/site";

// One icon per input type, in CONTENT.md's order.
const inputIcons = [Camera, Thermometer, Tag, Receipt, ClipboardList];
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
    <li className="group flex flex-col gap-6 rounded-card border border-edge bg-card-low p-7 shadow-xl transition-[border-color,box-shadow] duration-300 hover:border-brand/50 hover:shadow-card-hover-soft">
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
        <div className="border-b border-divider/70 pb-6">
          <SectionHeading
            id="how-it-works-heading"
            eyebrow={howItWorks.eyebrow}
            heading={howItWorks.heading}
            large
            accent="brand"
          />
        </div>

        <div className="relative">
          {/* The line that joins the steps, seen between the cards from 1024px. */}
          <div aria-hidden className="absolute top-12 right-16 left-16 hidden h-0.5 bg-divider lg:block">
            <div className="size-full bg-brand/60" />
          </div>

          <ol className="relative grid gap-8 lg:grid-cols-3">
            <Step number={capture.number} title={capture.title} titleId="step-capture" text={capture.text} icon={ScanLine} first>
              <Panel label={capture.label}>
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(11.5rem,1fr))] gap-2">
                  {capture.inputs.map((input, index) => {
                    const Icon = inputIcons[index];
                    return (
                      <li
                        key={input}
                        className="flex items-center gap-1.5 rounded-tag border border-chip bg-bg p-2 type-label text-text-soft"
                      >
                        <Icon size={14} aria-hidden className="shrink-0 text-brand" />
                        {input}
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
                        <th key={column} scope="col" className="px-1 text-right font-normal sm:px-2">
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
                          className="rounded-l-tag border-y border-l border-chip bg-bg p-2 text-left font-normal text-text-soft"
                        >
                          {scenario}
                        </th>
                        {optimize.columns.map((column, index) => (
                          <td
                            key={column}
                            className={`border-y border-chip bg-bg px-1 py-2 text-right text-text-secondary sm:px-2 ${index === optimize.columns.length - 1 ? "rounded-r-tag border-r" : ""}`}
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
