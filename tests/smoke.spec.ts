import { expect, test } from "@playwright/test";
import { hero, nav, notFoundPage } from "../content/site";
import { home, notFound, pages, widths } from "./pages";

// Apart from the site itself, the content security policy may name only
// Vercel Analytics and Cloudflare Turnstile.
const allowedHosts = ["https://va.vercel-scripts.com", "https://challenges.cloudflare.com"];

for (const { name, path, status } of pages) {
  test.describe(name, () => {
    test("renders the shared layout", async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(status);
      await expect(page.getByRole("banner").getByRole("link", { name: nav.cta.label })).toBeVisible();
      await expect(page.getByRole("main")).toBeAttached();
      await expect(page.getByRole("contentinfo")).toBeVisible();
    });

    for (const width of widths) {
      test(`has no horizontal scroll at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      });
    }

    test("sends the security and noindex headers", async ({ request }) => {
      const headers = (await request.get(path)).headers();
      const policy = new Map(
        (headers["content-security-policy"] ?? "")
          .split(";")
          .map((directive) => directive.trim().split(/\s+/))
          .map(([directive, ...sources]): [string, string[]] => [directive, sources]),
      );
      expect(policy.get("default-src")).toEqual(["'self'"]);
      expect(policy.get("frame-ancestors")).toEqual(["'none'"]);
      const hosts = [...policy.values()].flat().filter((source) => !source.startsWith("'"));
      expect(hosts.filter((host) => !allowedHosts.includes(host))).toEqual([]);
      expect(headers["strict-transport-security"]).toContain("max-age=63072000");
      expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
      expect(headers["x-content-type-options"]).toBe("nosniff");
      expect(headers["permissions-policy"]).toBe("camera=(), microphone=(), geolocation=()");
      expect(headers["x-robots-tag"]).toContain("noindex");
    });

    for (const width of widths) {
      test(`logs no errors or warnings at ${width}px`, async ({ page, baseURL }) => {
        await page.setViewportSize({ width, height: 900 });
        const problems: string[] = [];
        await page.addInitScript(() => {
          document.addEventListener("securitypolicyviolation", (event) => {
            console.error(`CSP blocked ${event.blockedURI} (${event.violatedDirective})`);
          });
        });
        page.on("pageerror", (error) => problems.push(error.message));
        page.on("console", (message) => {
          if (message.type() !== "error" && message.type() !== "warning") return;
          if (message.text().startsWith("Failed to load resource")) {
            const source = new URL(message.location().url, baseURL).pathname;
            // The not-found page's own response is a 404.
            if (status === 404 && source === path) return;
            // TODO(M4): remove once /pilot and /privacy exist. Next.js prefetches
            // their links, and the browser logs the 404 responses until then.
            if (source === "/pilot" || source === "/privacy") return;
          }
          problems.push(`${message.type()}: ${message.text()}`);
        });
        await page.goto(path);
        // Give hydration and link prefetching a moment to report problems. The
        // network never goes idle while the prefetches above get 404s: Next.js
        // leaves those responses unread, so the browser keeps them open.
        await page.waitForTimeout(1000);
        expect(problems).toEqual([]);
      });
    }
  });
}

test("home opens with the hero heading", async ({ page }) => {
  await page.goto(home.path);
  await expect(page.getByRole("heading", { level: 1, name: hero.headline })).toBeVisible();
});

test("unknown routes show the not-found page", async ({ page }) => {
  await page.goto(notFound.path);
  await expect(page.getByRole("heading", { level: 1, name: notFoundPage.heading })).toBeVisible();
});
