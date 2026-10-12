import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { useJsonLd } from "./useJsonLd";

function getJsonLdScripts() {
  return document.querySelectorAll('script[type="application/ld+json"]');
}

function JsonLdProbe({ data }: { data: object | null }) {
  useJsonLd(data);
  return null;
}

describe("useJsonLd", () => {
  it("adds a JSON-LD script with the given data", () => {
    const data = { "@type": "Product", name: "Wave Weave" };
    render(<JsonLdProbe data={data} />);

    const scripts = getJsonLdScripts();
    expect(scripts).toHaveLength(1);
    expect(JSON.parse(scripts[0].textContent ?? "")).toEqual(data);
  });

  it("adds no script when data is null", () => {
    render(<JsonLdProbe data={null} />);

    expect(getJsonLdScripts()).toHaveLength(0);
  });

  it("removes its script when the component unmounts", () => {
    const { unmount } = render(
      <JsonLdProbe data={{ "@type": "Product", name: "Wave Weave" }} />,
    );
    expect(getJsonLdScripts()).toHaveLength(1);

    unmount();

    expect(getJsonLdScripts()).toHaveLength(0);
  });

  it("replaces its script when the data changes", () => {
    const { rerender } = render(
      <JsonLdProbe data={{ "@type": "Product", name: "Wave Weave" }} />,
    );

    rerender(<JsonLdProbe data={{ "@type": "Product", name: "Patchwork" }} />);

    const scripts = getJsonLdScripts();
    expect(scripts).toHaveLength(1);
    expect(JSON.parse(scripts[0].textContent ?? "")).toEqual({
      "@type": "Product",
      name: "Patchwork",
    });
  });
});
