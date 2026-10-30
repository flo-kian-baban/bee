import { expect, test, type Page } from "@playwright/test";
import { cellCentre } from "../components/Honeycomb";
import { home } from "./pages";

// The hero light (DESIGN.md, Motion) brightens the honeycomb cells within its
// radius of a mouse pointer, and stays off on touch screens and with reduced
// motion.

declare global {
  interface Window {
    cspViolations?: string[];
    longTasks?: number[];
  }
}

const hero = (page: Page) => page.locator("section[aria-labelledby='hero-heading']");
const light = (page: Page) => page.locator(".hero-light");
/** Cells the light has placed. The template cell has no position. */
const placedCells = (page: Page) => page.locator(".hero-light [data-x]");

async function heroBox(page: Page) {
  const box = await hero(page).boundingBox();
  if (!box) throw new Error("The hero is not on the page");
  return box;
}

/** Waits until the light stops requesting frames. */
async function settle(page: Page) {
  await expect(light(page)).not.toHaveAttribute("data-active");
}

/** Every lit cell: its centre, in hero coordinates, and its brightness. */
function litCells(page: Page) {
  return placedCells(page).evaluateAll((cells) =>
    cells
      .map((cell) => ({
        x: Number((cell as HTMLElement).dataset.x),
        y: Number((cell as HTMLElement).dataset.y),
        brightness: Number(getComputedStyle(cell.lastElementChild as Element).opacity),
      }))
      .filter((cell) => cell.brightness > 0),
  );
}

test("the hero light brightens the cells within its radius of a mouse, and fades when it leaves", async ({
  page,
}) => {
  // The light sets opacities and transforms from script, which the CSP allows;
  // it must never set a style attribute, which the CSP blocks.
  const problems: string[] = [];
  page.on("pageerror", (error) => problems.push(error.message));
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      (window.cspViolations ??= []).push(`CSP blocked ${event.violatedDirective}`);
    });
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home.path);
  const box = await heroBox(page);
  const radius = await light(page).evaluate((element) =>
    parseFloat(getComputedStyle(element).getPropertyValue("--hero-light-radius")),
  );

  const pointer = { x: 500, y: 320 };
  await page.mouse.move(box.x + pointer.x - 40, box.y + pointer.y - 20);
  await page.mouse.move(box.x + pointer.x, box.y + pointer.y, { steps: 5 });
  await settle(page);

  // Exactly the cells whose centres lie within the radius are lit, each at
  // (1 - d/r)² for its centre's distance d.
  const within: string[] = [];
  for (let row = -5; row <= 20; row++) {
    for (let column = -5; column <= 30; column++) {
      const centre = cellCentre(column, row);
      if (Math.hypot(centre.x - pointer.x, centre.y - pointer.y) < radius) within.push(`${centre.x},${centre.y}`);
    }
  }
  const cells = await litCells(page);
  expect(cells.map((cell) => `${cell.x},${cell.y}`).sort()).toEqual(within.sort());
  for (const cell of cells) {
    const distance = Math.hypot(cell.x - pointer.x, cell.y - pointer.y);
    expect(cell.brightness).toBeCloseTo((1 - distance / radius) ** 2, 2);
  }

  await page.mouse.move(box.x + pointer.x, box.y + box.height + 40);
  await settle(page);
  expect(await litCells(page)).toEqual([]);

  problems.push(...(await page.evaluate(() => window.cspViolations ?? [])));
  expect(problems).toEqual([]);
});

// TODO(M5): with the CPU 4x slower, the first hover sometimes takes one frame
// of about 50ms (1 run in 6 at milestone 2, accepted for now). Recheck it.
// Tagged @performance, so it runs alone after the other checks
// (playwright.config.ts): with ten pages loading the CPU at once, that first
// frame takes 60 to 260ms, before and after the milestone 2 detail pass alike.
test("hovering the hero causes no long tasks", { tag: "@performance" }, async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home.path);
  const box = await heroBox(page);

  // Record tasks over 50ms from here on, so loading the page does not count.
  await page.evaluate(() => {
    window.longTasks = [];
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.longTasks?.push(Math.round(entry.duration));
    }).observe({ type: "longtask" });
  });

  // Sweep across the hero and back in a wave, let the pointer rest, then leave.
  const along = (t: number) => ({
    x: box.x + 60 + t * (box.width - 120),
    y: box.y + box.height / 2 + Math.sin(t * 4 * Math.PI) * (box.height / 3),
  });
  for (let step = 0; step <= 120; step++) {
    const { x, y } = along(step <= 60 ? step / 60 : (120 - step) / 60);
    await page.mouse.move(x, y);
  }
  await settle(page);
  expect((await litCells(page)).length).toBeGreaterThan(0);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height + 40);
  await settle(page);

  expect(await page.evaluate(() => window.longTasks)).toEqual([]);
});

test("the hero light stays off with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(home.path);
  const box = await heroBox(page);
  await page.mouse.move(box.x + 500, box.y + 320, { steps: 5 });
  await expect(light(page)).toHaveCSS("display", "none");
  await expect(placedCells(page)).toHaveCount(0);
});

test.describe("on a touch screen", () => {
  test.use({ hasTouch: true, isMobile: true, viewport: { width: 375, height: 812 } });

  test("the hero light stays off", async ({ page }) => {
    await page.goto(home.path);
    const box = await heroBox(page);
    await page.touchscreen.tap(box.x + 12, box.y + 12);
    await expect(light(page)).toHaveCSS("display", "none");
    await expect(placedCells(page)).toHaveCount(0);
  });
});
