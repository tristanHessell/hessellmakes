import { afterEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { useSeo } from "./useSeo";

function getMetaContent(attribute: "name" | "property", key: string) {
  return document
    .querySelector(`meta[${attribute}="${key}"]`)
    ?.getAttribute("content");
}

function SeoProbe({
  title,
  description,
  noindex,
}: {
  title: string;
  description: string;
  noindex?: boolean;
}) {
  useSeo({ title, description, noindex });
  return null;
}

describe("useSeo", () => {
  afterEach(() => {
    document.title = "";
    for (const meta of document.querySelectorAll(
      'meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"]',
    )) {
      meta.remove();
    }
    document.querySelector('link[rel="canonical"]')?.remove();
  });

  it("sets the document title, with the site name appended", () => {
    render(<SeoProbe title="Gallery" description="Browse the gallery." />);

    expect(document.title).toBe("Gallery — HessellMakes");
  });

  it("sets the meta description", () => {
    render(<SeoProbe title="Gallery" description="Browse the gallery." />);

    expect(getMetaContent("name", "description")).toBe("Browse the gallery.");
  });

  it("sets the canonical link to the current URL", () => {
    render(<SeoProbe title="Gallery" description="Browse the gallery." />);

    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    ).toBe(`${window.location.origin}${window.location.pathname}`);
  });

  it("sets the Open Graph and Twitter preview tags", () => {
    render(<SeoProbe title="Gallery" description="Browse the gallery." />);

    expect(getMetaContent("property", "og:title")).toBe(
      "Gallery — HessellMakes",
    );
    expect(getMetaContent("property", "og:description")).toBe(
      "Browse the gallery.",
    );
    expect(getMetaContent("name", "twitter:title")).toBe(
      "Gallery — HessellMakes",
    );
    expect(getMetaContent("name", "twitter:description")).toBe(
      "Browse the gallery.",
    );
  });

  it("allows indexing by default", () => {
    render(<SeoProbe title="Gallery" description="Browse the gallery." />);

    expect(getMetaContent("name", "robots")).toBe("index, follow");
  });

  it("blocks indexing when noindex is set", () => {
    render(
      <SeoProbe title="Contact" description="Get in touch." noindex={true} />,
    );

    expect(getMetaContent("name", "robots")).toBe("noindex, nofollow");
  });
});
