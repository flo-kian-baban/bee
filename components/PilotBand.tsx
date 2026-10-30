import { Button } from "@/components/Button";
import { flags, pilotBand } from "@/content/site";

/** Home, section 8: the call to apply for the pilot. */
export function PilotBand() {
  return (
    // Without the Team section, Buildings sits directly above, and its border already divides the two.
    <section
      aria-labelledby="pilot-heading"
      className={`section-x bg-bg-alt py-20 ${flags.showTeam ? "border-t border-divider/70" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <div
          data-reveal="up"
          className="relative overflow-hidden rounded-card border border-edge bg-card p-10 shadow-2xl transition-colors duration-200 hover:border-brand/40 md:p-14"
        >
          <div aria-hidden className="pilot-edge absolute inset-x-0 top-0" />
          <div aria-hidden className="pilot-glow absolute top-0 right-10" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="flex max-w-2xl flex-col gap-3">
              <h2 id="pilot-heading" className="type-h2 text-text">
                {pilotBand.heading}
              </h2>
              <p className="type-body text-text-secondary">{pilotBand.text}</p>
            </div>
            <Button href={pilotBand.cta.href} size="lg" className="shrink-0">
              {pilotBand.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
