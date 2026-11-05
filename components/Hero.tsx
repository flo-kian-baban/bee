import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { HeroLight } from "@/components/HeroLight";
import { Honeycomb } from "@/components/Honeycomb";
import { hero } from "@/content/site";

export function Hero() {
  const [firstLine, secondLine] = hero.headlineLines;
  const [before, after] = secondLine.split(hero.headlineHighlight);

  // From 768px the hero fills most of the screen below the nav and centres its
  // content (the hero-height utility); on phones it keeps its natural height.
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-height relative isolate flex flex-col justify-center overflow-hidden"
    >
      <Honeycomb className="absolute inset-0 -z-10 size-full" />
      <HeroLight />

      <div className="section-x flex flex-col items-center py-24 text-center sm:max-md:py-32">
        <Badge>{hero.badge}</Badge>

        {/* The space between the lines stays in the text, so the heading reads
            as one sentence pair; from 1024px the second line is a block. */}
        <h1 id="hero-heading" className="relative mt-8 max-w-4xl text-balance type-display text-text">
          <span
            aria-hidden
            className="hero-glow absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
          />
          {firstLine}{" "}
          <span className="lg:block">
            {before}
            {after !== undefined && <span className="text-brand drop-shadow-glow">{hero.headlineHighlight}</span>}
            {after}
          </span>
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
