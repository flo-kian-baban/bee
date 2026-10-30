import { expect, type Page } from "@playwright/test";

/**
 * Scrolls through the whole page, so every element marked data-reveal enters
 * the viewport and runs its motion (DESIGN.md, Motion), waits until all of it
 * has ended, and scrolls back to the top. Tests that read or photograph the
 * page call this first: a pending element is hidden, and axe skips hidden
 * elements.
 */
export async function revealAll(page: Page) {
  await page.evaluate(async () => {
    const pause = () => new Promise((resolve) => setTimeout(resolve, 50));
    const { scrollHeight } = document.documentElement;
    for (let top = 0; top <= scrollHeight; top += window.innerHeight / 2) {
      window.scrollTo({ top, behavior: "instant" });
      await pause();
    }
  });
  await expect(page.locator("[data-pending]")).toHaveCount(0);
  await page.waitForFunction(() => document.getAnimations().length === 0);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
}

/**
 * Every element with scroll motion that is not in its final state: nothing
 * pending or still moving, revealed elements fully opaque, drawn lines whole,
 * and every Capture input ticked to "Captured".
 */
export function notInFinalState(page: Page) {
  return page.evaluate(() => {
    const problems: string[] = [];
    const name = (element: Element) =>
      `${element.tagName.toLowerCase()} "${(element.textContent ?? "").trim().slice(0, 40)}"`;
    const check = (selector: string, property: string, expected: string) => {
      for (const element of document.querySelectorAll(selector)) {
        const value = getComputedStyle(element).getPropertyValue(property);
        if (value !== expected) problems.push(`${name(element)}: ${property} is ${value}, not ${expected}`);
      }
    };
    for (const element of document.querySelectorAll("[data-pending]")) problems.push(`${name(element)} is pending`);
    for (const animation of document.getAnimations()) {
      problems.push(`${animation instanceof CSSAnimation ? animation.animationName : "a transition"} is running`);
    }
    check('[data-reveal="up"]', "opacity", "1");
    check(".draw-stroke", "stroke-dashoffset", "0px");
    check(".tick-done", "opacity", "1");
    check(".tick-todo", "opacity", "0");
    return problems;
  });
}
