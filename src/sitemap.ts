import { siteOrigin, siteRoutes } from './siteRoutes.ts';

function escapeXml(value: string) {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  };
  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

export function createSitemap(
  routes: Record<string, { path: string; indexable: boolean }> = siteRoutes,
  origin = siteOrigin,
) {
  const entries = Object.values(routes)
    .filter((route) => route.indexable)
    .map(({ path }) => {
      const url = new URL(`/${path}`, origin).href;
      return `  <url><loc>${escapeXml(url)}</loc></url>`;
    });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}
