import { useEffect } from "react";

/** Sets the document title for the current route, e.g. "Gallery — HessellMakes". */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — HessellMakes`;
  }, [title]);
}
