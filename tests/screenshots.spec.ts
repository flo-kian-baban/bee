import { test } from "@playwright/test";
import { pages, widths } from "./pages";

// Screenshots for a milestone report: `MILESTONE=2 npm run screenshots`
// saves every page at every width under reports/m2/.
const milestone = process.env.MILESTONE;

test.skip(!milestone, "Set MILESTONE, for example MILESTONE=2 npm run screenshots");

for (const { name, path } of pages) {
  for (const width of widths) {
    test(`${name} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `reports/m${milestone}/${name}-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
    });
  }
}
