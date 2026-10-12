import { useEffect } from "react";

/**
 * Adds a `<script type="application/ld+json">` with the given structured
 * data to the document head, and removes it again when the data changes, or
 * the component unmounts. Pass `null` while there is nothing to describe,
 * for example while a dialog is closed.
 */
export function useJsonLd(data: object | null) {
  useEffect(() => {
    if (!data) {
      return;
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
}
