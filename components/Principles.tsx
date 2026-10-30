import { Route, Tag, UserCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ValueTag } from "@/components/ValueTag";
import { principles } from "@/content/site";

// One icon per principle: labelled values, methods that travel, people who review.
const icons = [Tag, Route, UserCheck];

/** Home, section 5: how B.E.E. keeps engineers in charge. */
export function Principles() {
  return (
    <section aria-labelledby="principles-heading" className="section-x section-y">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <div data-reveal="up" className="flex flex-col gap-3">
          <SectionHeading id="principles-heading" heading={principles.heading} />
          <p className="type-lead text-text-secondary">{principles.lead}</p>
        </div>

        <ul className="flex flex-col gap-4">
          {principles.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <li
                key={item.title}
                data-reveal="up"
                className="flex items-start gap-5 rounded-container border border-divider bg-card p-6 transition-colors duration-200 hover:border-brand/40"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-tile border border-divider bg-card-low text-brand shadow-sm">
                  <Icon size={20} aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h3 className="type-title text-text">{item.title}</h3>
                    <span className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <ValueTag key={tag} kind={tag} />
                      ))}
                    </span>
                  </div>
                  <p className="type-body text-text-secondary">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
