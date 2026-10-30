import { expect, test } from "@playwright/test";
import { notInFinalState, revealAll } from "./motion";
import { home } from "./pages";

// Scroll motion (DESIGN.md, Motion): reveal, draw and tick run once, as an
// element enters the viewport. No animation is infinite, nothing moves for
// more than 5 seconds, and with reduced motion every element shows its final
// state and nothing moves.

declare global {
  interface Window {
    started?: { name: string; iterations: number; endTime: number }[];
  }
}

/** The longest any motion may run, delays included. */
const MAX_MS = 5000;

test.beforeEach(async ({ page }) => {
  // Record every animation and transition that starts, with its timing.
  await page.addInitScript(() => {
    window.started = [];
    const record = (event: AnimationEvent | TransitionEvent) => {
      for (const animation of (event.target as Element).getAnimations()) {
        const name =
          animation instanceof CSSAnimation
            ? animation.animationName
            : animation instanceof CSSTransition
              ? `transition of ${animation.transitionProperty}`
              : "script animation";
        const { iterations, endTime } = animation.effect?.getComputedTiming() ?? {};
        window.started?.push({ name, iterations: Number(iterations), endTime: Number(endTime) });
      }
    };
    document.addEventListener("animationstart", record, true);
    document.addEventListener("transitionrun", record, true);
  });
});

test("no stylesheet sets an infinite animation", async ({ page }) => {
  await page.goto(home.path);
  const infinite = await page.evaluate(() => {
    const found: string[] = [];
    const walk = (rules: CSSRuleList) => {
      for (const rule of rules) {
        if (rule instanceof CSSStyleRule && /\binfinite\b/.test(rule.style.cssText)) found.push(rule.selectorText);
        if ("cssRules" in rule) walk(rule.cssRules as CSSRuleList);
      }
    };
    for (const sheet of document.styleSheets) walk(sheet.cssRules);
    return found;
  });
  expect(infinite).toEqual([]);
});

test("every motion runs once, and ends within 5 seconds", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home.path);
  // Scroll only once the page has hydrated and the elements below the viewport wait.
  await expect(page.locator("[data-pending]").first()).toBeAttached();
  await revealAll(page);

  const started = await page.evaluate(() => window.started ?? []);
  // The reveal, the line's draw and the Capture ticks all ran. (Transitions,
  // such as the nav's as each section passes, are recorded too.)
  const animations = started.filter((animation) => !animation.name.startsWith("transition"));
  expect(new Set(animations.map((animation) => animation.name))).toEqual(
    new Set(["reveal-up", "draw", "fade-in", "fade-out"]),
  );
  for (const animation of started) {
    expect(animation.iterations, animation.name).toBe(1);
    expect(animation.endTime, animation.name).toBeLessThanOrEqual(MAX_MS);
  }
});

for (const width of [375, 1440]) {
  test(`at ${width}px, elements below the viewport wait for it, and every element ends in its final state`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(home.path);

    // Once the page has hydrated, elements below the viewport wait; nothing in view is hidden.
    const pending = page.locator("[data-pending]");
    await expect(pending.first()).toBeAttached();
    const pendingTops = await pending.evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().top),
    );
    for (const top of pendingTops) expect(top).toBeGreaterThanOrEqual(900);

    await revealAll(page);
    expect(await notInFinalState(page)).toEqual([]);
  });
}

test("with reduced motion, every element shows its final state and nothing moves", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(home.path);
  expect(await notInFinalState(page)).toEqual([]);

  await revealAll(page);
  expect(await notInFinalState(page)).toEqual([]);
  expect(await page.evaluate(() => window.started)).toEqual([]);
});
