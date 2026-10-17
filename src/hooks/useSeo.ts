import { useEffect } from 'react';

const SITE_NAME = 'HessellMakes';

interface SeoOptions {
  /** A short page name, for example "Portfolio". Combined with the site name
   * to make the document title, for example "Portfolio - HessellMakes". */
  title: string;
  /** A 1 or 2 sentence summary of the page, shown in a search result and in
   * a social media preview card. */
  description: string;
  /** Set for a page that is intentionally unlinked, for example Contact or
   * Design, so a search engine does not index it. */
  noindex?: boolean;
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonicalLink(href: string) {
  let element = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Sets the document title, the meta description, the canonical link, the
 * robots directive, and the Open Graph / Twitter preview tags, for the
 * current page. `index.html` sets a default value for each of these tags,
 * for a crawler that does not run JavaScript; this hook then overrides them
 * with page-specific values, for a crawler or a browser that does.
 */
export function useSeo({ title, description, noindex = false }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} - ${SITE_NAME}`;
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setCanonicalLink(canonicalUrl);
  }, [title, description, noindex]);
}
