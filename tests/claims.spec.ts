import { expect, test } from "@playwright/test";
import { pages, widths } from "./pages";

/** The banned terms in CLAUDE.md, hard rule 2. */
const bannedTerms = [
  "compliant",
  "certified",
  "ASHRAE Guideline 14",
  "P.Eng",
  "sealed",
  "sealable",
  "stamp",
  "autonomous",
  "revolutionary",
  "guaranteed",
  "real-time",
  "telemetry",
  "live",
];

const escape = (term: string) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const bannedTerm = new RegExp(`\\b(?:${bannedTerms.map(escape).join("|")})\\b`, "gi");
const percentage = /\d+\s?%/g;

/** Banned terms (whole words, any case) and percentages in `text`. */
function findClaims(text: string) {
  return [...(text.match(bannedTerm) ?? []), ...(text.match(percentage) ?? [])];
}

test("the matcher finds every banned term and percentage, and only whole words", () => {
  for (const term of bannedTerms) {
    expect(findClaims(`Our ${term.toUpperCase()} service`)).toEqual([term.toUpperCase()]);
  }
  expect(findClaims("Up to 30% less, or 30 % more")).toEqual(["30%", "30 %"]);
  expect(findClaims("Delivered alive, with timestamps and a sealing plan")).toEqual([]);
});

for (const { name, path } of pages) {
  for (const width of widths) {
    test(`${name} at ${width}px shows no banned claims`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      expect(findClaims(await page.locator("body").innerText())).toEqual([]);
    });
  }
}
