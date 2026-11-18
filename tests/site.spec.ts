import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("home page", () => {
  test("renders hero, sections and contact", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Growth that");
    await expect(page.locator("#services .card")).toHaveCount(4);
    await expect(page.locator(".pills li")).toHaveCount(8);
    await expect(page.locator(".faq-list .qa")).toHaveCount(4);
    await expect(page.locator(".proof-card")).toHaveCount(4);
    await expect(page.locator("#contact .btn-cream")).toHaveAttribute("href", /mailto:basia@justbasiadigital\.com/);
  });

  test("header nav links resolve", async ({ page }) => {
    await page.goto("/");
    const menuBtn = page.locator(".menu-btn");
    if (await menuBtn.isVisible()) await menuBtn.click();
    const nav = page.locator("#nav");
    await expect(nav.getByRole("link", { name: "Approach" })).toHaveAttribute("href", /\/approach\/?$/);
    await expect(nav.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", /\/#faq$/);
  });

  test("passes WCAG 2.2 AA", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("approach page", () => {
  test("renders framework steps and truths", async ({ page }) => {
    await page.goto("/approach/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Connect");
    await expect(page.locator(".steps .step")).toHaveCount(4);
    await expect(page.locator(".truths .truth")).toHaveCount(3);
  });

  test("passes WCAG 2.2 AA", async ({ page }) => {
    await page.goto("/approach/");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("privacy and 404", () => {
  test("privacy page renders all sections", async ({ page }) => {
    await page.goto("/privacy/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Privacy");
    await expect(page.getByRole("heading", { name: "What we collect" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Cookies" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your choices" })).toBeVisible();
  });

  test("unknown URL shows custom 404", async ({ page }) => {
    const response = await page.goto("/no-such-page/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Lost a dot");
  });
});

test.describe("machine-readable endpoints", () => {
  test("llms.txt is served as text", async ({ request }) => {
    const res = await request.get("/llms.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/plain");
    const body = await res.text();
    expect(body).toContain("# Just Basia Digital");
    expect(body).toContain("basia@justbasiadigital.com");
  });

  test("robots.txt and sitemap.xml resolve", async ({ request }) => {
    expect((await request.get("/robots.txt")).status()).toBe(200);
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("/approach/");
  });

  test("structured data is present on home", async ({ page }) => {
    await page.goto("/");
    const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(jsonLd).toContain('"ProfessionalService"');
    expect(jsonLd).toContain('"FAQPage"');
  });
});
