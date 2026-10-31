import { expect, test, type Page } from "@playwright/test";
import { evidenceChain } from "../content/site";
import { home } from "./pages";

// The Evidence chain (CLAUDE.md, Key behaviours; DESIGN.md, Evidence chain):
// from 1024px, seven hexagon cells on a honeycomb that scales with its
// column, and below it a list in number order on a rail. Dots flow along the
// connectors while the section is in view, a button pauses them, and
// hovering, focusing or tapping a cell lights it and everything upstream.

const { steps } = evidenceChain;
type Step = (typeof steps)[number];
/** One connector per input, named "from-to". */
const connectors = steps.flatMap((step) => step.from.map((from) => ({ from, to: step.number, name: `${from}-${step.number}` })));
/** The comb's rows, left to right; the top and bottom rows sit half a cell left of the middle one. */
const rows = [
  ["01", "04"],
  ["03", "06", "07"],
  ["02", "05"],
];

/** The least distance a line of text or a tag may come to its cell's walls, at full size. */
const CLEARANCE = 12;

const section = (page: Page) =>
  page.locator("section").filter({ has: page.getByRole("heading", { level: 2, name: evidenceChain.heading }) });
const cell = (page: Page, number: string) => section(page).locator(`[data-step="${number}"]`);

type Point = [number, number];
type Box = { left: number; top: number; right: number; bottom: number };
/** A cell's box, what it shows, and where each of its rows starts, from its top. */
type Cell = { box: Box; shown: Box[]; parts: Record<string, number> };

const centre = ({ left, top, right, bottom }: Box): Point => [(left + right) / 2, (top + bottom) / 2];
const distance = ([x1, y1]: Point, [x2, y2]: Point) => Math.hypot(x2 - x1, y2 - y1);
const corners = ({ left, top, right, bottom }: Box): Point[] => [
  [left, top],
  [right, top],
  [left, bottom],
  [right, bottom],
];

/**
 * How far a point lies inside the regular pointy-top hexagon that fills `box`
 * (negative outside): its distance to the nearest of the six walls, each of
 * which lies half the box's width from its centre.
 */
function depth(box: Box, [x, y]: Point) {
  const [cx, cy] = centre(box);
  const apothem = (box.right - box.left) / 2;
  return Math.min(
    ...[0, 60, 120, 180, 240, 300].map((angle) => {
      const radians = (angle * Math.PI) / 180;
      return apothem - ((x - cx) * Math.cos(radians) + (y - cy) * Math.sin(radians));
    }),
  );
}

for (const width of [1024, 1280, 1440]) {
  test(`at ${width}px, the steps are hexagon cells on a honeycomb, in three rows, scaled to the column`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.goto(home.path);
    await page.evaluate(() => document.fonts.ready);

    const { size, gap } = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return { size: parseFloat(style.getPropertyValue("--comb-cell")), gap: parseFloat(style.getPropertyValue("--comb-gap")) };
    });
    const cells: Record<string, Cell> = Object.fromEntries(
      await Promise.all(
        steps.map(async (step): Promise<[string, Cell]> => [
          step.number,
          await cell(page, step.number).evaluate((button) => {
            const box = ({ left, top, right, bottom }: DOMRect) => ({ left, top, right, bottom });
            // What the cell shows: its lines of text (not the screen reader's) and its tag's border.
            const shown: Box[] = [];
            const walker = document.createTreeWalker(button, NodeFilter.SHOW_TEXT);
            for (let node = walker.nextNode(); node; node = walker.nextNode()) {
              if (!node.textContent?.trim() || node.parentElement?.closest(".sr-only")) continue;
              const range = document.createRange();
              range.selectNodeContents(node);
              shown.push(...[...range.getClientRects()].map(box));
            }
            const tag = button.querySelector('[data-part="tag"] > *');
            if (tag) shown.push(box(tag.getBoundingClientRect()));
            const { top } = button.getBoundingClientRect();
            const parts = Object.fromEntries(
              [...button.querySelectorAll<HTMLElement>("[data-part]")].map((part) => [
                part.dataset.part,
                part.getBoundingClientRect().top - top,
              ]),
            );
            return { box: box(button.getBoundingClientRect()), shown, parts };
          }),
        ]),
      ),
    );
    const column = await section(page).locator('[data-reveal="flow"]').boundingBox();
    if (!column) throw new Error("The Evidence chain has no column");

    // The comb fills its column, and scales with it: 1152px wide at full size.
    const scale = (cells["01"].box.right - cells["01"].box.left) / size;
    expect(scale).toBeCloseTo(Math.min(1, column.width / (3.5 * size + 2.5 * gap)), 3);
    expect(cells["01"].box.left).toBeCloseTo(column.x, 0);
    expect(cells["07"].box.right).toBeCloseTo(column.x + column.width, 0);

    const pitch = (size + gap) * scale;
    const at = (number: string) => centre(cells[number].box);
    for (const [number, { box, shown, parts }] of Object.entries(cells)) {
      // A regular hexagon, corner to corner 2/√3 of its width.
      expect(box.right - box.left, number).toBeCloseTo(size * scale, 0);
      expect(box.bottom - box.top, number).toBeCloseTo((size * scale * 2) / Math.sqrt(3), 0);
      const tooClose = shown.flatMap(corners).filter((corner) => depth(box, corner) < CLEARANCE * scale);
      expect(tooClose, `${number}: content within ${CLEARANCE}px of a wall`).toEqual([]);
      // Every cell's rows line up with 01's.
      for (const [part, offset] of Object.entries(parts)) expect(offset, `${number}: ${part}`).toBeCloseTo(cells["01"].parts[part], 0);
    }

    // Three rows a pitch × √3/2 apart, neighbours in a row a pitch apart, and
    // the top and bottom rows half a pitch left of the middle one.
    for (const [index, row] of rows.entries()) {
      for (const [place, number] of row.entries()) {
        expect(at(number)[1], `${number}: row`).toBeCloseTo(at("01")[1] + (index * pitch * Math.sqrt(3)) / 2, 0);
        expect(at(number)[0], `${number}: column`).toBeCloseTo(at(row[0])[0] + place * pitch, 0);
      }
    }
    expect(at("03")[0] - at("01")[0]).toBeCloseTo(pitch / 2, 0);
    expect(at("03")[0] - at("02")[0]).toBeCloseTo(pitch / 2, 0);

    // Each connector joins neighbours, from the middle of one wall, across the
    // gap, to the middle of the facing wall; it points right, from a lower
    // number to a higher one.
    const midWall = (own: string, other: string): Point => {
      const [x, y] = at(own);
      const [ox, oy] = at(other);
      const share = (size * scale) / 2 / distance([x, y], [ox, oy]);
      return [x + (ox - x) * share, y + (oy - y) * share];
    };
    for (const { from, to, name } of connectors) {
      expect(distance(at(from), at(to)), `${name}: neighbours`).toBeCloseTo(pitch, 0);
      const [start, end] = await section(page)
        .locator(`[data-connector="${name}"] [data-port]`)
        .evaluateAll((ports) =>
          ports.map((port): Point => {
            const { left, top, right, bottom } = port.getBoundingClientRect();
            return [(left + right) / 2, (top + bottom) / 2];
          }),
        );
      expect(distance(start, midWall(from, to)), `${name}: starts mid-wall`).toBeLessThan(1);
      expect(distance(end, midWall(to, from)), `${name}: ends mid-wall`).toBeLessThan(1);
      expect(end[0], `${name}: points right`).toBeGreaterThan(start[0]);
      expect(Number(to), `${name}: runs to a higher number`).toBeGreaterThan(Number(from));
    }
  });
}

for (const width of [375, 768]) {
  test(`at ${width}px, the steps are a list in number order, their badges on one rail`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.goto(home.path);

    const items = section(page).getByRole("listitem");
    await expect(items).toHaveCount(steps.length);
    const texts = await items.allInnerTexts();
    for (const [index, step] of steps.entries()) expect(texts[index], step.number).toContain(step.title);
    const lefts = await section(page)
      .locator("[data-badge]")
      .evaluateAll((badges) => badges.map((badge) => badge.getBoundingClientRect().left));
    expect(lefts).toHaveLength(steps.length);
    expect(new Set(lefts).size, "every badge sits on the rail").toBe(1);
    await expect(section(page).locator("[data-rail]")).toHaveCount(steps.length - 1);
    await expect(cell(page, "06")).toBeHidden();
  });
}

test("the dots flow in three stages, only while the section is in view, and the button pauses them", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home.path);
  const trains = section(page).locator("[data-connector] .flow-train");
  const playStates = () =>
    trains.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).animationPlayState));
  const all = (state: string) => Array<string>(connectors.length).fill(state);

  // Each connector's leg starts as many steps (1.15s) into the cycle as there
  // are connectors before it; 06 and 07 light as the last dots reach them.
  const delays = await section(page)
    .locator("[data-connector]")
    .evaluateAll((links) =>
      Object.fromEntries(
        links.map((link) => [
          link.getAttribute("data-connector"),
          getComputedStyle(link.querySelector(".flow-train") as Element).animationDelay,
        ]),
      ),
    );
  expect(delays).toEqual({ "01-04": "0s", "02-05": "0s", "03-06": "0s", "04-06": "1.15s", "05-06": "1.15s", "06-07": "2.3s" });
  const lights = await section(page)
    .locator("[data-step] .flow-light")
    .evaluateAll((elements) =>
      elements.map((element) => [element.closest("[data-step]")?.getAttribute("data-step"), getComputedStyle(element).animationDelay]),
    );
  expect(lights).toEqual([
    ["06", "1.85s"],
    ["07", "3s"],
  ]);

  // Out of view the dots wait; in view they run.
  await expect.poll(playStates).toEqual(all("paused"));
  await cell(page, "06").scrollIntoViewIfNeeded();
  await expect.poll(playStates).toEqual(all("running"));

  await section(page).getByRole("button", { name: evidenceChain.pause }).click();
  await expect.poll(playStates).toEqual(all("paused"));
  await section(page).getByRole("button", { name: evidenceChain.play }).click();
  await expect.poll(playStates).toEqual(all("running"));
});

/** Expects these steps, and the connectors into them, lit, and no others. */
async function expectLit(page: Page, numbers: string[]) {
  for (const step of steps) {
    const button = cell(page, step.number);
    if (numbers.includes(step.number)) await expect(button, step.number).toHaveAttribute("data-lit", "");
    else await expect(button, step.number).not.toHaveAttribute("data-lit");
  }
  for (const { to, name } of connectors) {
    const link = section(page).locator(`[data-connector="${name}"]`);
    if (numbers.includes(to)) await expect(link, name).toHaveAttribute("data-lit", "");
    else await expect(link, name).not.toHaveAttribute("data-lit");
  }
}

test("hovering or focusing a cell lights it and every cell and connector upstream of it", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home.path);

  await cell(page, "06").hover();
  await expectLit(page, ["01", "02", "03", "04", "05", "06"]);
  await page.mouse.move(0, 0);
  await expectLit(page, []);
  await cell(page, "04").focus();
  await expectLit(page, ["01", "04"]);
});

test("each cell is named by its number, action word and title, and tells screen readers what it is based on", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home.path);
  const name = (step: Step) => new RegExp(`^${step.number} ${step.action} ${step.title}$`, "i");
  for (const step of steps) await expect(section(page).getByRole("button", { name: name(step) })).toBeVisible();
  const model = steps.find((step) => step.number === "06");
  if (!model) throw new Error("No step 06");
  await expect(section(page).getByRole("button", { name: name(model) })).toHaveAccessibleDescription(
    new RegExp(`${evidenceChain.basedOn} 03 Assume, 04 Extract, 05 Normalize$`, "i"),
  );
});

test("with reduced motion, the connectors stay dotted lines, with no dots and no pause button", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home.path);
  await cell(page, "06").scrollIntoViewIfNeeded();

  for (const train of await section(page).locator(".flow-train").all()) await expect(train).toBeHidden();
  await expect(section(page).getByRole("button", { name: evidenceChain.pause })).toBeHidden();
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
});

test.describe("on a touch screen", () => {
  test.use({ hasTouch: true, viewport: { width: 1180, height: 820 } });

  test("tapping a cell lights it and every cell upstream of it", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(home.path);
    await cell(page, "05").tap();
    await expectLit(page, ["02", "05"]);
  });
});
