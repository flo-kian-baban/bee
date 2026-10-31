import { expect, test, type Page } from "@playwright/test";
import { evidenceChain } from "../content/site";
import { home } from "./pages";

// The Evidence chain (CLAUDE.md, Key behaviours; DESIGN.md, Evidence chain):
// seven steps in three streams that converge; from 768px, hexagon cells on a
// honeycomb, and below it a list on a rail; a detail panel; and a trace that
// lights the trail up to the selected step.

const { steps } = evidenceChain;
type Step = (typeof steps)[number];
const last = steps[steps.length - 1];
/** One connector per input, named "from-to". */
const connectors = steps.flatMap((step) => step.from.map((from) => ({ from, to: step.number, name: `${from}-${step.number}` })));

/** The least distance a line of text, a tag or an icon may come to its cell's walls. */
const CLEARANCE = 12;

const section = (page: Page) =>
  page.locator("section").filter({ has: page.getByRole("heading", { level: 2, name: evidenceChain.heading }) });
const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** A step's button, named, among other things, by its title. */
const stepButton = (page: Page, step: Step) => section(page).getByRole("button", { name: new RegExp(escape(step.title)) });
/** The detail panel's title: the only heading the panel shows. */
const panelTitle = (page: Page) => section(page).getByRole("heading", { level: 3 });
/** The steps the panel lists under "Based on". */
const panelTrail = (page: Page) => section(page).locator("[aria-live]").getByRole("listitem");

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
const distance = ([x1, y1]: [number, number], [x2, y2]: [number, number]) => Math.hypot(x2 - x1, y2 - y1);

for (const width of [768, 1024, 1440]) {
  test(`at ${width}px, the steps are hexagon cells on a honeycomb, 06 at its centre, each holding its content`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.goto(home.path);
    await page.evaluate(() => document.fonts.ready);

    const { cell, gap } = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        cell: parseFloat(style.getPropertyValue("--comb-cell")),
        gap: parseFloat(style.getPropertyValue("--comb-gap")),
      };
    });
    const cells = await Promise.all(
      steps.map((step) =>
        stepButton(page, step).evaluate((button) => {
          const box = ({ left, top, right, bottom }: DOMRect) => ({ left, top, right, bottom });
          // What the cell shows: its lines of text, its tag (which has a border) and its icons.
          const shown: Box[] = [];
          const walker = document.createTreeWalker(button, NodeFilter.SHOW_TEXT);
          for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            if (!node.textContent?.trim()) continue;
            const range = document.createRange();
            range.selectNodeContents(node);
            shown.push(...[...range.getClientRects()].map(box));
          }
          for (const element of button.querySelectorAll("[data-part] *")) {
            if (element instanceof SVGSVGElement || parseFloat(getComputedStyle(element).borderTopWidth) > 0) {
              shown.push(box(element.getBoundingClientRect()));
            }
          }
          const { top } = button.getBoundingClientRect();
          const rows = Object.fromEntries(
            [...button.querySelectorAll<HTMLElement>("[data-part]")].map((part) => [
              part.dataset.part,
              part.getBoundingClientRect().top - top,
            ]),
          );
          return { box: box(button.getBoundingClientRect()), shown, rows };
        }),
      ),
    );

    for (const [index, { box, shown, rows }] of cells.entries()) {
      const name = steps[index].title;
      // A regular hexagon, corner to corner 2/√3 of its width.
      expect(box.right - box.left, name).toBeCloseTo(cell, 0);
      expect(box.bottom - box.top, name).toBeCloseTo((cell * 2) / Math.sqrt(3), 0);
      const tooClose = shown.flatMap(corners).filter((corner) => depth(box, corner) < CLEARANCE);
      expect(tooClose, `${name}: content within ${CLEARANCE}px of a wall`).toEqual([]);
      // Every cell's rows line up with the first cell's.
      for (const [part, offset] of Object.entries(rows)) expect(offset, `${name}: ${part}`).toBeCloseTo(cells[0].rows[part], 0);
    }

    // 06 sits at the centre of the cluster.
    const centres = cells.map(({ box }) => centre(box));
    const middle: [number, number] = [
      centres.reduce((sum, [x]) => sum + x, 0) / centres.length,
      centres.reduce((sum, [, y]) => sum + y, 0) / centres.length,
    ];
    expect(distance(centres[steps.findIndex((step) => step.number === "06")], middle)).toBeLessThan(1);

    // Each connector joins neighbours on the honeycomb, from the middle of one
    // wall, across the gap, to the middle of the facing wall.
    const boxOf = (number: string) => cells[steps.findIndex((step) => step.number === number)].box;
    for (const { from, to, name } of connectors) {
      expect(distance(centre(boxOf(from)), centre(boxOf(to))), `${name}: neighbours`).toBeCloseTo(cell + gap, 0);
      const ends = await section(page)
        .locator(`svg[data-connectors="comb"] [data-connector="${name}"] path`)
        .first()
        .evaluate((path) => {
          const line = path as SVGGeometryElement;
          const matrix = line.getScreenCTM() ?? undefined;
          const at = (length: number): [number, number] => {
            const point = line.getPointAtLength(length).matrixTransform(matrix);
            return [point.x, point.y];
          };
          return [at(0), at(line.getTotalLength())];
        });
      const [start, end] = ends;
      const midWall = (own: Box, other: Box): [number, number] => {
        const [x, y] = centre(own);
        const [ox, oy] = centre(other);
        const scale = cell / 2 / distance([x, y], [ox, oy]);
        return [x + (ox - x) * scale, y + (oy - y) * scale];
      };
      expect(distance(start, midWall(boxOf(from), boxOf(to))), `${name}: starts mid-wall`).toBeLessThan(1);
      expect(distance(end, midWall(boxOf(to), boxOf(from))), `${name}: ends mid-wall`).toBeLessThan(1);
    }
  });
}

test("below 768px, the steps are a list on a rail, grouped by stream", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(home.path);

  for (const group of Object.values(evidenceChain.groups)) {
    await expect(section(page).getByText(group, { exact: true })).toBeVisible();
  }
  const lefts = await Promise.all(steps.map(async (step) => (await stepButton(page, step).boundingBox())?.x));
  expect(new Set(lefts).size, "every step starts at the same place").toBe(1);
  await expect(section(page).locator('svg[data-connectors="list"] [data-connector]')).toHaveCount(connectors.length);
  await expect(section(page).locator('svg[data-connectors="comb"]')).toBeHidden();
});

test("after the trace, the panel shows 07 and every step it is based on", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home.path);
  await stepButton(page, last).scrollIntoViewIfNeeded();

  await expect(panelTitle(page)).toHaveText(last.title);
  await expect(panelTrail(page)).toHaveCount(steps.length - 1);
  for (const step of steps) await expect(stepButton(page, step)).toHaveAttribute("data-lit", "");
});

test("hovering a cell lights its trail and shows it in the panel, and with reduced motion nothing moves", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home.path);

  const normalize = steps[3];
  await stepButton(page, normalize).hover();
  await expect(panelTitle(page)).toHaveText(normalize.title);
  await expect(stepButton(page, normalize)).toHaveAttribute("aria-current", "step");
  for (const step of steps) {
    const button = stepButton(page, step);
    if (["03", "04"].includes(step.number)) await expect(button).toHaveAttribute("data-lit", "");
    else await expect(button).not.toHaveAttribute("data-lit");
  }
  await expect(panelTrail(page)).toHaveCount(1);
  await expect(panelTrail(page)).toContainText(steps[2].title);
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
});

test("arrow keys move between the cells in step order, and the panel follows", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home.path);

  await stepButton(page, steps[0]).focus();
  await expect(panelTitle(page)).toHaveText(steps[0].title);
  const keys = [
    ["ArrowRight", 1],
    ["ArrowDown", 2],
    ["ArrowLeft", 1],
    ["ArrowUp", 0],
    ["End", steps.length - 1],
    ["Home", 0],
  ] as const;
  for (const [key, index] of keys) {
    await page.keyboard.press(key);
    await expect(stepButton(page, steps[index]), key).toBeFocused();
    await expect(panelTitle(page)).toHaveText(steps[index].title);
  }
});

test("Replay runs the whole trace again and ends on 07", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home.path);

  await stepButton(page, steps[1]).click();
  await expect(panelTitle(page)).toHaveText(steps[1].title);
  await section(page).getByRole("button", { name: evidenceChain.replay }).click();
  await expect(panelTitle(page)).toHaveText(last.title);
  await expect
    .poll(() =>
      page.evaluate(() =>
        document.getAnimations().some((animation) => (animation as CSSAnimation).animationName === "trace-travel"),
      ),
    )
    .toBe(true);
  for (const step of steps) await expect(stepButton(page, step)).toHaveAttribute("data-lit", "");
});

test.describe("on a touch screen", () => {
  test.use({ hasTouch: true, isMobile: true, viewport: { width: 375, height: 812 } });

  test("tapping a step selects it", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(home.path);
    const assume = steps[4];
    await stepButton(page, assume).tap();
    await expect(panelTitle(page)).toHaveText(assume.title);
    await expect(stepButton(page, assume)).toHaveAttribute("aria-current", "step");
  });
});
