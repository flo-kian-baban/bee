import { Building, Building2, Hotel, Landmark, School, Store, Volleyball, Warehouse } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { buildings, sectionIds } from "@/content/site";

// One icon per building type, in CONTENT.md's order.
const icons = [Building2, Building, Store, Landmark, School, Hotel, Warehouse, Volleyball];

/** Home, section 6: the building types B.E.E. is designed for. */
export function Buildings() {
  return (
    <section
      id={sectionIds.buildings}
      aria-labelledby="buildings-heading"
      className="section-x section-y border-y border-divider/70 bg-bg-alt"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <SectionHeading id="buildings-heading" eyebrow={buildings.eyebrow} heading={buildings.heading} />

        <ul className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {buildings.types.map((type, index) => {
            const Icon = icons[index];
            return (
              <li
                key={type}
                className="group flex flex-col justify-between gap-8 rounded-container border border-divider bg-card p-6 transition-[border-color,translate] duration-200 hover:-translate-y-1 hover:border-brand/40"
              >
                <span className="flex size-10 items-center justify-center rounded-tile border border-divider bg-card-low text-text-secondary transition-colors group-hover:text-brand">
                  <Icon size={22} aria-hidden />
                </span>
                <span className="type-tile text-text">{type}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
