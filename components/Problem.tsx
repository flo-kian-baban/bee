import { Camera, Keyboard, Receipt, Sheet, Unlink, Wrench } from "lucide-react";
import { Chip } from "@/components/Chip";
import { ExampleLabel } from "@/components/ExampleLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { SourcePanel } from "@/components/SourcePanel";
import { ValueTag } from "@/components/ValueTag";
import { problem } from "@/content/site";

const icons = { photos: Camera, bills: Receipt, records: Wrench, spreadsheets: Sheet };

/** Home, section 2: where building energy data lives today. */
export function Problem() {
  return (
    <section aria-labelledby="problem-heading" className="section-x border-y border-divider/70 bg-bg-alt py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div
          data-reveal="up"
          className="flex flex-col justify-between gap-4 border-b border-divider/60 pb-2 md:flex-row md:items-end"
        >
          <SectionHeading id="problem-heading" eyebrow={problem.eyebrow} heading={problem.heading} large accent="dot" />
          <ExampleLabel className="mb-2 shrink-0 self-start md:self-auto">{problem.label}</ExampleLabel>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {problem.panels.map((panel) => {
            const Icon = icons[panel.source];
            return (
              <li
                key={panel.source}
                data-reveal="up"
                className="flex flex-col gap-6 rounded-card border border-divider bg-card-low/90 p-6 shadow-lg transition-[border-color,box-shadow] duration-200 hover:border-brand/50 hover:shadow-card-hover lg:p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-divider/70 pb-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="flex items-center gap-2 type-label font-medium text-text">
                      <Icon size={18} aria-hidden className="shrink-0 text-brand" />
                      {panel.title}
                    </h3>
                    <ValueTag kind={panel.tag} />
                  </div>
                  <p className="flex items-center gap-2 type-label text-text-secondary">
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
              </li>
            );
          })}
        </ul>

        <div
          data-reveal="up"
          className="flex flex-col items-center justify-between gap-4 rounded-container border border-divider bg-card-low p-5 shadow-md sm:flex-row"
        >
          <div className="flex flex-col items-center gap-3.5 sm:flex-row">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-tile border border-divider bg-bg-alt text-brand">
              <Keyboard size={20} aria-hidden />
            </span>
            <p className="text-center type-body text-text-soft sm:text-left">{problem.closing}</p>
          </div>
          <p className="flex shrink-0 items-center gap-2 rounded-tile border border-divider bg-bg-alt px-3.5 py-2 type-label text-text-secondary">
            <Unlink size={14} aria-hidden className="shrink-0 text-warning" />
            {problem.closingChip}
          </p>
        </div>
      </div>
    </section>
  );
}
