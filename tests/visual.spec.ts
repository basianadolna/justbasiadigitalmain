import { test } from "@playwright/test";

const widths = [320, 375, 390, 430, 768, 1440, 1920];
const pages = [
  { path: "/", name: "home" },
  { path: "/approach/", name: "approach" },
  { path: "/privacy/", name: "privacy" },
];

test.describe("visual snapshots across viewports", () => {
  for (const p of pages) {
    for (const width of widths) {
      test(`${p.name} at ${width}px`, async ({ page, isMobile }) => {
        test.skip(isMobile === true, "viewport sweep runs in the desktop project");
        await page.setViewportSize({ width, height: 900 });
        await page.goto(p.path);
        await page.waitForLoadState("networkidle");
        await page.screenshot({ path: `test-results/visual/${p.name}-${width}.png`, fullPage: true });
      });
    }
  }
});
