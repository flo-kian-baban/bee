import {
  Award,
  Building,
  Building2,
  CalendarRange,
  HandCoins,
  Hotel,
  Landmark,
  School,
  Store,
  Target,
  Volleyball,
  Warehouse,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { buildings, sectionIds } from "@/content/site";

// One icon per item, in CONTENT.md's order.
const primaryIcons = [Building2, Building];
const reasonIcons = [Award, HandCoins, Target, CalendarRange];
const plannedIcons = [Landmark, School, Hotel, Store, Warehouse, Volleyball];

/**
 * Home, section 6: who B.E.E. is built for. The two building types it serves
 * first, as large tiles; why owners start an audit; and, smaller and quieter,
 * the building types planned next.
 */
export function Buildings() {
  const { primary, reasons, planned } = buildings;

  return (
    <section
      id={sectionIds.buildings}
      aria-labelledby="buildings-heading"
      className="section-x section-y border-y border-divider/70 bg-bg-alt"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div data-reveal="up">
          <SectionHeading id="buildings-heading" eyebrow={buildings.eyebrow} heading={buildings.heading} />
        </div>

        <div className="flex flex-col gap-5">
          <ul className="grid gap-5 md:grid-cols-2">
            {primary.map((type, index) => {
              const Icon = primaryIcons[index];
              return (
                <li
                  key={type.title}
                  data-reveal="up"
                  className="flex flex-col gap-8 rounded-container border border-divider bg-card p-8 transition-[border-color,translate] duration-200 hover:-translate-y-1 hover:border-brand/40"
                >
                  <span className="flex size-12 items-center justify-center rounded-tile border border-divider bg-card-low text-brand shadow-sm">
                    <Icon size={24} aria-hidden />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="type-h3 text-text">{type.title}</h3>
                    <p className="type-body text-text-secondary">{type.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div data-reveal="up" className="rounded-container border border-divider bg-card-low p-6 shadow-md">
            <h3 className="type-title text-text">{reasons.title}</h3>
            <ul className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.items.map((item, index) => {
                const Icon = reasonIcons[index];
                return (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-tile border border-divider bg-bg-alt text-brand">
                      <Icon size={20} aria-hidden />
                    </span>
                    {/* Its first line centred on the icon. */}
                    <span className="pt-1.25 type-body text-text-body">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div data-reveal="up" className="flex flex-col gap-4">
          <h3 className="type-label text-text-secondary">{planned.title}</h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {planned.types.map((type, index) => {
              const Icon = plannedIcons[index];
              return (
                <li
                  key={type}
                  className="group flex items-center gap-3 rounded-container border border-divider bg-card-low px-4 py-3 transition-colors duration-200 hover:border-brand/40"
                >
                  <Icon
                    size={18}
                    aria-hidden
                    className="shrink-0 text-text-secondary transition-colors group-hover:text-brand"
                  />
                  <span className="text-text-secondary">{type}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
