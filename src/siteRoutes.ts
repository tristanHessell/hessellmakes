export const siteOrigin = 'https://www.hessellmakes.com';

export const siteRoutes = {
  home: { path: '', indexable: true },
  portfolio: { path: 'portfolio', indexable: true },
  shop: { path: 'shop', indexable: false },
  about: { path: 'about', indexable: true },
  contact: { path: 'contact', indexable: false },
  design: { path: 'design', indexable: false },
} as const;

export type SitePage = keyof typeof siteRoutes;
