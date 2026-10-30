import { SectionHeading } from "@/components/SectionHeading";
import { flags, sectionIds, team } from "@/content/site";

/** The first letters of a name's first two words. */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

/**
 * Home, section 7: the founders. Shown only when flags.showTeam is true. No
 * photos until the founders consent, so each card shows their initials.
 */
export function Team() {
  if (!flags.showTeam) return null;

  return (
    <section id={sectionIds.team} aria-labelledby="team-heading" className="section-x section-y">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div data-reveal="up">
          <SectionHeading id="team-heading" eyebrow={team.eyebrow} heading={team.heading} />
        </div>

        <ul className="grid gap-8 md:grid-cols-2">
          {team.members.map((member) => (
            <li
              key={member.title}
              data-reveal="up"
              className="group flex flex-col items-start gap-6 rounded-card border border-divider bg-card p-8 transition-colors duration-200 hover:border-brand/40 sm:flex-row sm:items-center"
            >
              <span
                aria-hidden
                className="dot-grid flex size-20 shrink-0 items-center justify-center rounded-container border border-divider type-h3 text-text-secondary transition-colors group-hover:text-brand"
              >
                {initials(member.name)}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="type-h3 text-text">{member.name}</h3>
                <p className="type-body text-text-secondary">{member.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
