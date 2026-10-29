import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Honeycomb } from "@/components/Honeycomb";
import { hero } from "@/content/site";

export function Hero() {
  const [before, after] = hero.headline.split(hero.headlineHighlight);

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <Honeycomb className="absolute inset-0 -z-10 size-full" />

      <div className="page-container section-y flex flex-col items-center text-center">
        <Badge>{hero.badge}</Badge>

        <div className="relative mt-8">
          <div
            aria-hidden
            className="hero-glow absolute top-1/2 left-1/2 -z-10 h-[250%] w-[130%] -translate-x-1/2 -translate-y-1/2"
          />
          <h1 id="hero-heading" className="max-w-4xl text-balance type-display">
            {before}
            {after !== undefined && <span className="text-brand">{hero.headlineHighlight}</span>}
            {after}
          </h1>
        </div>

        <p className="mt-6 max-w-2xl text-pretty type-body-lg text-text-secondary">{hero.subtext}</p>

        <div className="mt-12 flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
          <Button href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
