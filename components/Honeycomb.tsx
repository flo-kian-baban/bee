// Pointy-top hexagons, the shape the logo is built from, 38px from centre to
// corner (Stitch's cell size). Rows are 1.5R apart, and every other row sits
// half a cell to the right. One pattern tile is √3·R wide and 3R tall: a whole
// cell plus the edge it shares with the two cells below, so the tiles repeat
// seamlessly.
export const CELL_RADIUS = 38;
const R = CELL_RADIUS;
const round = (value: number) => Math.round(value * 1000) / 1000;

export const CELL_WIDTH = round(Math.sqrt(3) * R);
export const ROW_HEIGHT = 1.5 * R;
const TILE_HEIGHT = 3 * R;

/** A pointy-top hexagon around (x, y), r from centre to corner. */
export function hexagon(x: number, y: number, r: number) {
  const w = (Math.sqrt(3) / 2) * r;
  const corners = [
    [x - w, y - r / 2],
    [x, y - r],
    [x + w, y - r / 2],
    [x + w, y + r / 2],
    [x, y + r],
    [x - w, y + r / 2],
  ];
  return `M${corners.map(([cx, cy]) => `${round(cx)} ${round(cy)}`).join("L")}Z`;
}

/** The centre of a cell, in the coordinates of the honeycomb's top-left corner. */
export function cellCentre(column: number, row: number) {
  const shift = row % 2 === 0 ? 0 : CELL_WIDTH / 2;
  return { x: CELL_WIDTH / 2 + column * CELL_WIDTH + shift, y: R + row * ROW_HEIGHT };
}

/** The lines of one tile: a cell, plus the edge down to the next row. */
const linesTile = `${hexagon(CELL_WIDTH / 2, R, R)}M${round(CELL_WIDTH / 2)} ${2 * R}V${3 * R}`;

/** The hero honeycomb at rest: 1px brand strokes at 6%. */
export function Honeycomb({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" className={className}>
      <defs>
        <pattern id="honeycomb" width={CELL_WIDTH} height={TILE_HEIGHT} patternUnits="userSpaceOnUse">
          <path d={linesTile} fill="none" strokeWidth={1} className="stroke-brand/6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#honeycomb)" />
    </svg>
  );
}
