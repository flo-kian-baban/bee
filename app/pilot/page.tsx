import type { Metadata } from "next";
import { pilotPage } from "@/content/site";

// A placeholder until the form arrives in milestone 4. Kept out of search
// engines on its own account, whatever the site does at launch.
export const metadata: Metadata = {
  title: pilotPage.headline,
  robots: { index: false, follow: false },
};

export default function PilotPage() {
  return (
    <div className="section-x section-y">
      <div className="mx-auto flex max-w-2xl flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="type-h2-lg text-text">{pilotPage.headline}</h1>
          <p className="type-body-lg text-text-secondary">{pilotPage.placeholder}</p>
        </div>

        <section
          aria-labelledby="next-heading"
          className="rounded-card border border-edge bg-card p-8 shadow-2xl md:p-10"
        >
          <h2 id="next-heading" className="type-h3 text-text">
            {pilotPage.nextHeading}
          </h2>
          <ol className="mt-6 flex flex-col">
            {pilotPage.nextSteps.map((step, index) => (
              <li
                key={step}
                className="flex items-baseline gap-4 border-t border-divider/70 py-4 first:border-t-0 first:pt-0 last:pb-0"
              >
                <span aria-hidden className="type-label font-medium text-brand tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="type-title text-text">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
