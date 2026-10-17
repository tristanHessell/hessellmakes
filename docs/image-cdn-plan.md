# Netlify Image CDN and Web Image Plan

## Goal and Recommendation

Serve smaller photographs without a custom backend.
Keep the current Portfolio layout, crops, hover effects, and accessible labels.
Use Netlify Image CDN with source files in `public/images/` for the first release.
Keep source photographs in Git history for recovery.
Do not convert every source to AVIF before the migration.

This is a plan, not an implemented CDN migration.
The inventory records the repository on 17 October 2026.
Recheck service documentation and account pricing before implementation.

## Current Delivery

Vite emits imported photographs as separate files in `dist/assets/`.
The photographs are not embedded in the JavaScript bundle.
The JavaScript contains their generated URLs.
The current image elements request full source files, including for small Portfolio tiles.

Moving files to `public/` removes them from Vite's asset-processing pipeline.
Vite still copies these files into the deployment.
This change alone does not reduce image downloads or remove images from Git.
The CDN transformations and responsive image requests provide the delivery improvement.

## Source Inventory

Sizes below use decimal kB and MB, rounded from file bytes.
Dimensions describe the source files, not their displayed size.

| Photograph                  | Format | Dimensions in pixels | Size in kB |
| --------------------------- | ------ | -------------------- | ---------- |
| Triple Truchet Tile         | WebP   | 1536 x 2048          | 230.0      |
| Tudor Rose                  | WebP   | 2048 x 3639          | 254.2      |
| Cat Ball                    | WebP   | 1536 x 2048          | 92.1       |
| Blanket Stitch Truchet Tile | WebP   | 2048 x 3639          | 376.9      |
| Stitch-less                 | WebP   | 2048 x 3639          | 437.5      |
| SK100                       | WebP   | 1536 x 2048          | 129.1      |
| Calcio Italiano             | WebP   | 2048 x 3639          | 316.8      |
| AFC Womens Asian Cup        | WebP   | 2048 x 3639          | 287.8      |
| Pritchards Pencil           | WebP   | 3392 x 3935          | 506.2      |
| Studio Honeymoone           | WebP   | 2048 x 3639          | 428.5      |
| Indivisa                    | WebP   | 2048 x 2731          | 224.0      |
| Emily portrait              | WebP   | 2848 x 4272          | 351.1      |
| Home hero                   | WebP   | 6000 x 3376          | 1712.4     |
| Social preview              | WebP   | 900 x 1200           | 104.1      |

These 14 files total approximately 5.45 MB.
The 11 Portfolio photographs total approximately 3.28 MB.
The nine new WebP files use quality 82.
Their source files used 13.69 MB. Their WebP outputs use 3.99 MB.
These file-size changes are not measured page transfers.
Browser caching and page content affect actual transfers.

Pritchards Pencil accounts for about 41% of the Portfolio source bytes.
Prioritise this photograph, Stitch-less, Studio Honeymoone, and the Emily portrait during comparison tests.
Do not change the approved composition of the replacement Pritchards Pencil photograph.

## CDN Architecture

Request transformed images through `/.netlify/images`.
Use `url` for the source path and `w` and `h` for output dimensions.
Use `fit=cover` for square Portfolio thumbnails.
Omit `fm` initially to use format negotiation.
Netlify caches transformed results and refreshes changed local sources with new deployments.
Relative sources require no remote allowlist.
External sources require allowed URL patterns in `netlify.toml`.
See the [Netlify Image CDN documentation](https://docs.netlify.com/build/image-cdn/overview/).

Example proposed thumbnail request:

```text
/.netlify/images?url=/images/portfolio/tudor-rose.webp&w=400&h=400&fit=cover&q=75
```

Use a small shared URL helper with `URLSearchParams`.
Keep source paths separate from transformed URLs in product data.
Use stable source URLs for Product structured data.
Retain the existing social preview image unless a separate change is approved.
Keep SVG logos and favicons outside this migration.

The CDN is a transformation service, not a separate source archive.
To exclude originals from deployments entirely, use external public storage.
That option adds storage costs, permissions, and another publishing workflow.
Defer it until repository size or publishing needs justify the extra service.
Do not use temporary Notion image URLs as permanent sources.

## Web Format Analysis

There is no single best format for every image.
Compare output bytes at acceptable visual quality, not at equal quality-slider values.

| Format | Suitability for this site                                                   | Proposed role                                               |
| ------ | --------------------------------------------------------------------------- | ----------------------------------------------------------- |
| JPEG   | Suitable for photographic source exports and broad compatibility            | Keep existing sources and provide a fallback when necessary |
| WebP   | Supports lossy and lossless compression; suitable for photographs           | Main comparison format and CDN-negotiated output            |
| AVIF   | Can compress photographs efficiently; results depend on content and encoder | Compare against WebP before forcing AVIF delivery           |
| PNG    | Lossless; useful for raster artwork or transparency                         | Do not use as the default for ball photographs              |
| SVG    | Suitable for scalable vector artwork                                        | Keep existing logos, icons, and favicons                    |

WebP and AVIF generally compress photographs more efficiently than JPEG or PNG.
Lossy encoding can reduce detail.
Sharp artwork and lettering need careful visual checks.
See [MDN's image format guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types).

### Source Preparation

1. Keep source photographs in Git history and deploy the WebP files from active asset folders.
2. Apply camera orientation before removing metadata.
3. Convert the web source to sRGB for consistent colour handling.
4. Remove GPS data and unnecessary EXIF metadata from public source files.
5. Preserve the current composition and aspect ratio.
6. Avoid repeated lossy re-encoding.
7. Retain existing WebP sources when better originals are unavailable.
8. Do not upscale a source to create a larger candidate.

Start with current files as sources.
Consider source downscaling only after the largest required display size is confirmed.
A 1600-pixel-wide source is a candidate for current page photography, not a universal limit.
Do not downscale the active WebP files to meet that target.
The source photographs remain available in Git history.

### Responsive Delivery

Resizing matters as much as the file format.
Use `srcSet` and `sizes` so the browser can select a suitable resource.
Reserve image space with dimensions or an aspect ratio.
Lazy-load below-the-fold photographs, but do not delay the largest image in the first viewport.
See [web.dev's image performance guidance](https://web.dev/learn/performance/image-performance).

Use these proposed starting points:

| Use                     | Candidate widths in pixels | Shape                       | Initial transfer target                        |
| ----------------------- | -------------------------- | --------------------------- | ---------------------------------------------- |
| Portfolio tile          | 200, 400, 640, 960         | Square, current centre crop | At most 80 kB for the common 400-pixel variant |
| About portrait          | 400, 800, 1200, 1600       | Original proportions        | At most 250 kB for the 1200-pixel variant      |
| Retained Shop thumbnail | 320, 640, 960              | Square                      | At most 150 kB for the 640-pixel variant       |
| Retained Shop dialog    | 640, 960, 1280             | Current presentation        | At most 250 kB for the 1280-pixel variant      |

These are engineering targets, not measured results or guaranteed savings.
Derive `sizes` from the actual grid width, page padding, and column count.
Check phone screens and high-density displays before removing any candidate.
Do not generate a separate width for every viewport size.

### Quality Comparison

1. Compare JPEG, WebP, and AVIF for the largest sources and one existing WebP source.
2. Resize each comparison to the same final dimensions and crop.
3. Test several quality values, such as 65, 75, and 85.
4. Record the encoder or CDN parameters, content type, dimensions, and byte count.
5. Inspect at normal display size and on a high-density screen.
6. Check leather grain, stitches, engraved text, illustration lines, and saturated colours.
7. Check dark panels for banding and bright panel edges for compression artefacts.
8. Select the smallest acceptable result, even when it exceeds the initial byte target.

Netlify's default quality is 75.
Its format negotiation can serve WebP, AVIF, or the original format.
Do not assume negotiation always selects AVIF.
See [Netlify's format and quality parameters](https://docs.netlify.com/build/image-cdn/overview/#format).

Do not claim a percentage saving until this comparison records actual outputs.
Do not add prebuilt variants for every format when the CDN already supplies them.

## Implementation Sequence

1. Start an implementation branch from the latest `origin/main`.
2. Move approved sources to `public/images/portfolio/` and `public/images/about/`.
3. Replace photograph imports in `soccerBalls.ts`, About, and related tests with stable public paths.
4. Add a URL helper and a small responsive image component.
5. Update Portfolio, About, and the retained Shop image elements.
6. Preserve all current alt text, accessible labels, hover effects, and dialog behaviour.
7. Keep plain `npm run dev` working with direct source URLs.
8. Add an explicit Netlify Dev command for local transformation tests.
9. Select CDN mode explicitly for Netlify production, branch deploys, and Deploy Previews.
10. Keep direct-source mode for non-Netlify builds and normal browser tests.
11. Check that the SPA fallback does not intercept image transformation requests.
12. Update README, CLAUDE.md, and the item-adding skill with the new image workflow.

Netlify Dev supports local transformation testing.
See [Netlify's local development guidance](https://developers.netlify.com/guides/how-to-serve-optimized-images-using-netlify-image-cdn/).
Do not introduce a custom transformation server.

## Costs and Cache Policy

Current credit-based pricing charges 20 credits per GB and 2 credits per 10,000 web requests.
Image delivery counts towards these meters.
Confirm the team's actual plan before estimating charges.
Legacy plans can differ.
See [Netlify's credit documentation](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/).

Illustration only: assume one visit downloads eleven 50 kB thumbnails.
That equals 550 kB for the Portfolio photographs.
At 10,000 such visits, this equals approximately 5.5 GB and 110,000 image requests.
Those image requests would consume approximately 132 credits.
This excludes HTML, scripts, styles, other pages, deployments, and browser-cache effects.
It is not a forecast or an account quote.

Use fixed transformation presets to keep variant counts predictable.
Do not set year-long immutable caching on source names that can change.
Version replacement filenames before adopting immutable browser caching.
Keep source refresh checks in the deployment verification.

## Verification and Rollback

- Test URL encoding, supported dimensions, responsive candidates, and direct-source mode.
- Test source existence so missing files fail validation instead of appearing as HTML responses.
- Run accessibility tests for each page and each open dialog.
- Run `npm run validate`.
- Check real CDN responses in a Deploy Preview, including MIME types and dimensions.
- Compare transferred bytes against a cold-cache baseline with the same viewport.
- Check phone and desktop layouts for shifts, crop changes, and missing photographs.
- Confirm the next deployment shows a replacement source image correctly.
- Retain direct-source mode as a rollback path.

## Acceptance Criteria

- Visitors no longer download full source files for small Portfolio tiles in CDN mode.
- Image variants retain acceptable stitching, illustration, and colour detail.
- The layout, approved crops, hover effects, and accessible names remain unchanged.
- Plain Vite development and browser tests work without a Netlify account.
- Deploy Previews verify the real CDN path before production release.
- Originals remain recoverable outside the public source files.
- The comparison records measured results before stating savings.
