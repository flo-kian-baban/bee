import { expect, test } from "@playwright/test";
import { evidenceChain } from "../content/site";
import { home, widths } from "./pages";

// The Evidence chain's comb (DESIGN.md, Evidence chain): each node is a
// regular pointy-top hexagon that holds its text, tags and icon clear of its
// walls, and a dotted connector joins each node to the next, from a port on
// one's wall, across the gap, to a port on the other's.

/** The least distance a line of text, a tag or an icon may come to its cell's walls. */
const CLEARANCE = 12;

type Box = { left: number; top: number; right: number; bottom: number };

/**
 * How far a point lies inside the regular pointy-top hexagon that fills `cell`
 * (negative outside): its distance to the nearest of the six walls, each of
 * which lies half the cell's width from its centre.
 */
function depth(cell: Box, [x, y]: [number, number]) {
  const cx = (cell.left + cell.right) / 2;
  const cy = (cell.top + cell.bottom) / 2;
  const apothem = (cell.right - cell.left) / 2;
  return Math.min(
    ...[0, 60, 120, 180, 240, 300].map((angle) => {
      const radians = (angle * Math.PI) / 180;
      return apothem - ((x - cx) * Math.cos(radians) + (y - cy) * Math.sin(radians));
    }),
  );
}

const corners = ({ left, top, right, bottom }: Box): [number, number][] => [
  [left, top],
  [right, top],
  [left, bottom],
  [right, bottom],
];
const centre = ({ left, top, right, bottom }: Box): [number, number] => [(left + right) / 2, (top + bottom) / 2];

for (const width of widths) {
  test(`at ${width}px, each evidence node is a hexagon that holds its content, joined to the next across the gap`, async ({
    page,
  }) => {
    // The final layout, with no reveal under way.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.goto(home.path);
    await page.evaluate(() => document.fonts.ready);

    const gap = await page.evaluate(() =>
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--comb-gap")),
    );
    const section = page
      .locator("section")
      .filter({ has: page.getByRole("heading", { level: 2, name: evidenceChain.heading }) });
    const cells = await section.locator("ol > li").evaluateAll((items) =>
      items.map((item) => {
        const box = ({ left, top, right, bottom }: DOMRect) => ({ left, top, right, bottom });
        // What the cell shows: its lines of text, its tags (each has a border) and its icons.
        const shown: Box[] = [];
        const walker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (!node.textContent?.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(node);
          shown.push(...[...range.getClientRects()].map(box));
        }
        for (const element of item.querySelectorAll(":scope > div *")) {
          if (element instanceof SVGSVGElement || parseFloat(getComputedStyle(element).borderTopWidth) > 0) {
            shown.push(box(element.getBoundingClientRect()));
          }
        }
        return {
          box: box(item.getBoundingClientRect()),
          shown,
          // The connector's ports: the first on this cell's wall, the second on the next cell's.
          ports: [...item.querySelectorAll(":scope > svg[data-reveal] circle")].map((port) =>
            box(port.getBoundingClientRect()),
          ),
        };
      }),
    );

    expect(cells).toHaveLength(evidenceChain.nodes.length);
    for (const [index, cell] of cells.entries()) {
      const name = evidenceChain.nodes[index].title;
      // Regular: corner to corner, 2/√3 of its width across.
      expect(cell.box.bottom - cell.box.top, name).toBeCloseTo(((cell.box.right - cell.box.left) * 2) / Math.sqrt(3), 0);
      const tooClose = cell.shown.flatMap(corners).filter((corner) => depth(cell.box, corner) < CLEARANCE);
      expect(tooClose, `${name}: content within ${CLEARANCE}px of a wall`).toEqual([]);

      const next = cells[index + 1];
      if (!next) {
        expect(cell.ports, `${name} is the last node`).toEqual([]);
        continue;
      }
      const [from, to] = cell.ports.map(centre);
      expect(Math.abs(depth(cell.box, from)), `${name}: its connector starts on its wall`).toBeLessThan(1);
      expect(Math.abs(depth(next.box, to)), `${name}: its connector ends on the next node's wall`).toBeLessThan(1);
      expect(Math.hypot(to[0] - from[0], to[1] - from[1]), `${name}: its connector spans the gap`).toBeCloseTo(gap, 0);
    }
  });
}
