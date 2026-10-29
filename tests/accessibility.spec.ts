import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { ui } from "../content/site";
import { home, pages, widths } from "./pages";

// WCAG 2.2 A and AA, plus axe's best practices.
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

async function axeViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();
  return violations.map(({ id, nodes }) => `${id}: ${nodes.map((node) => node.target.join(" ")).join(", ")}`);
}

for (const { name, path } of pages) {
  for (const width of widths) {
    test(`${name} at ${width}px has no axe violations`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      expect(await axeViolations(page)).toEqual([]);
    });
  }
}

test("the open mobile menu has no axe violations", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(home.path);
  await page.getByRole("button", { name: ui.menu }).click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  expect(await axeViolations(page)).toEqual([]);
});
