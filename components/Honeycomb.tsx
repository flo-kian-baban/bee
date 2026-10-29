// Pointy-top hexagons, the shape the logo is built from, with circumradius R.
// One pattern tile is √3·R wide and 3R tall: a whole cell plus the edge it
// shares with the two cells below, so the tiles repeat seamlessly.
const R = 40;
const W = Math.round(Math.sqrt(3) * R * 1000) / 1000;
const tile = `M0 ${R / 2}L${W / 2} 0L${W} ${R / 2}V${1.5 * R}L${W / 2} ${2 * R}L0 ${1.5 * R}ZM${W / 2} ${2 * R}V${3 * R}`;

/** The hero's static honeycomb: 1px brand-yellow strokes at 5% opacity. */
export function Honeycomb({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" className={className}>
      <defs>
        <pattern id="honeycomb" width={W} height={3 * R} patternUnits="userSpaceOnUse">
          <path d={tile} fill="none" strokeWidth={1} className="stroke-brand/5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#honeycomb)" />
    </svg>
  );
}
