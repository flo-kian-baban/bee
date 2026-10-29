import { Camera, Keyboard, Receipt, Sheet, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SourceIllustration } from "@/components/SourceIllustration";
import { ValueTag } from "@/components/ValueTag";
import { problem } from "@/content/site";

const icons = { photos: Camera, bills: Receipt, records: Wrench, spreadsheets: Sheet };

/** Home, section 2: where building energy data lives today. */
export function Problem() {
  return (
    <section aria-labelledby="problem-heading" className="section-x border-y border-divider/70 bg-bg-alt py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="border-b border-divider/60 pb-2">
          <SectionHeading id="problem-heading" eyebrow={problem.eyebrow} heading={problem.heading} large accent="dot" />
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {problem.panels.map((panel) => {
            const Icon = icons[panel.source];
            return (
              <li
                key={panel.source}
                className="flex flex-col gap-6 rounded-card border border-divider bg-card-low/90 p-6 shadow-lg transition-[border-color,box-shadow] duration-300 hover:border-brand/50 hover:shadow-card-hover lg:p-7"
              >
                <div className="flex items-center justify-between gap-3 border-b border-divider/70 pb-3">
                  <h3 className="flex items-center gap-2 type-label font-medium text-text">
                    <Icon size={18} aria-hidden className="shrink-0 text-brand" />
                    {panel.title}
                  </h3>
                  <ValueTag kind={panel.tag} />
                </div>
                <SourceIllustration source={panel.source} />
                <p className="type-body text-text-secondary">{panel.description}</p>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col items-center gap-3.5 rounded-container border border-divider bg-card-low p-5 shadow-md sm:flex-row">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-tile border border-divider bg-bg-alt text-brand">
            <Keyboard size={20} aria-hidden />
          </span>
          <p className="text-center type-body text-text-soft sm:text-left">{problem.closing}</p>
        </div>
      </div>
    </section>
  );
}
