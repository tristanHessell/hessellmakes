import { describe, expect, it } from "vitest";
import { createSitemap } from "./sitemap";
import { siteOrigin, siteRoutes } from "./siteRoutes";

function parseSitemap(xml: string) {
  const document = new DOMParser().parseFromString(xml, "application/xml");
  expect(document.querySelector("parsererror")).toBeNull();
  expect(document.documentElement.namespaceURI).toBe(
    "http://www.sitemaps.org/schemas/sitemap/0.9",
  );
  return Array.from(
    document.querySelectorAll("loc"),
    (node) => node.textContent,
  );
}

describe("sitemap", () => {
  it("includes only the current indexable pages", () => {
    expect(parseSitemap(createSitemap())).toEqual([
      `${siteOrigin}/`,
      `${siteOrigin}/gallery`,
      `${siteOrigin}/about`,
    ]);
  });

  it("includes a new indexable route without a sitemap edit", () => {
    const routes = {
      ...siteRoutes,
      news: { path: "news", indexable: true },
    };
    expect(parseSitemap(createSitemap(routes))).toContain(`${siteOrigin}/news`);
  });

  it("includes the shop when its indexing setting changes", () => {
    const routes = {
      ...siteRoutes,
      shop: { ...siteRoutes.shop, indexable: true },
    };
    expect(parseSitemap(createSitemap(routes))).toContain(`${siteOrigin}/shop`);
  });

  it("escapes XML characters in URLs", () => {
    const routes = {
      example: { path: "example?one=1&two=2", indexable: true },
    };
    const xml = createSitemap(routes);
    expect(xml).toContain("&amp;");
    expect(parseSitemap(xml)).toEqual([`${siteOrigin}/example?one=1&two=2`]);
  });

  it("omits modification dates without an accurate content date", () => {
    expect(createSitemap()).not.toContain("<lastmod>");
  });
});
