import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { HeroLight } from "@/components/HeroLight";
import { Honeycomb } from "@/components/Honeycomb";
import { hero } from "@/content/site";

export function Hero() {
  const [before, after] = hero.headline.split(hero.headlineHighlight);

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <Honeycomb className="absolute inset-0 -z-10 size-full" />
      <HeroLight />
      <div aria-hidden className="hero-glow absolute top-(--hero-glow-top) left-1/2 -z-10 -translate-x-1/2" />

      <div className="section-x flex flex-col items-center py-24 text-center sm:py-32">
        <Badge>{hero.badge}</Badge>

        <h1 id="hero-heading" className="mt-8 max-w-4xl text-balance type-display text-text">
          {before}
          {after !== undefined && <span className="text-brand drop-shadow-glow">{hero.headlineHighlight}</span>}
          {after}
        </h1>

        <p className="mt-7 max-w-3xl text-pretty type-body-lg text-text-secondary">{hero.subtext}</p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
          <Button href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
