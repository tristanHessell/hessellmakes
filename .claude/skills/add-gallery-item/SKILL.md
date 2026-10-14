---
name: add-gallery-item
description: Add a new product item to the Portfolio page, from a title, an image, and a description. Use this skill when the user asks to add a new gallery item, a new ball, or a new product.
---

# Add a gallery item

This skill adds one new item to the Portfolio page. The Portfolio page reads its
items from a single data file, so this skill needs no change to any
component.

## Inputs

Get the first 5 values before you start.
Ask the user for a required value that is missing.
The Instagram URL is optional.

1. **Title** - the product name, for example "Heritage Red".
2. **Image** - a path to an image file. Ask the user to add the file to the
   project if it does not exist yet.
3. **Description** - 1 or 2 sentences about the product, in the site's
   existing voice. Read `src/data/soccerBalls.ts` for examples of this voice.
4. **Completion date** - the month and year, for example "July 2025".
5. **Construction** - the number of pieces, material, and colours.
6. **Instagram URL** - the public reel URL for the ball, if available.
   Omit it when the user requests a description-only dialog.

## Steps

1. Turn the title into an id, in kebab-case - for example, "Heritage Red"
   becomes `heritage-red`. Check `src/data/soccerBalls.ts` for a clash with
   an existing id.
2. Copy the image file into `src/assets/gallery/`. Give the copy a file name
   that matches the id, for example `heritage-red.jpeg`. Keep the original
   file extension.
3. Open `src/data/soccerBalls.ts`. Add an import for the new image, at the
   top of the file, next to the existing imports from
   `src/assets/gallery/`.
4. Look at the image. Write a 1-sentence, literal description of what it
   shows - the colours and the pattern on the ball. Do not just repeat the
   title. A screen reader reads this text in place of the image, in the
   dialog view, so it must carry real information.
5. Add a new object to the `soccerBalls` array, with this exact shape:

   ```ts
   {
     id: "heritage-red",
     category: "custom",
     name: "Heritage Red",
     imageSrc: heritageRed,
     imageAlt: "The 1-sentence description from step 4.",
     description: "The 1 or 2 sentence description from the user.",
     completed: "July 2025",
     construction: "The construction details from the user.",
     instagramUrl: "https://www.instagram.com/reel/REEL_ID",
   },
   ```

   Use `custom` for Custom Balls or `commission` for Commissions + Collaborations.
   Keep the array in the same order as the displayed sections.

6. Run `npx prettier --write src/data/soccerBalls.ts`, to match the project's
   formatting rules.
7. Run `npm run validate`. This command checks formatting, lint rules,
   spelling, and the tests, together. `Portfolio.test.tsx` reads its test
   cases from the `soccerBalls` array to check each item's details.
   Update its expected gallery order when adding an item.
8. If `npm run validate` reports an unknown word, from the new title or
   description, and the word is correct, add the word to the `words` list in
   `cspell.json`. Do not turn off the spelling check.

## Notes

- The type `SoccerBallProduct`, in `src/data/soccerBalls.ts`, requires
  these 7 fields: `id`, `name`, `imageSrc`, `imageAlt`, `description`,
  `completed`, and `construction`.
  Add `instagramUrl` only when a reel is available.
- Do not change `src/pages/Portfolio.tsx` or `Portfolio.module.css` for this
  task. The grid, the dialog, and the Previous/Next buttons all read from the
  `soccerBalls` array already, so a new array entry appears everywhere with
  no other change.
- Each grid thumbnail uses `alt=""` because visible text names the ball.
  If the entry has an Instagram URL, the dialog shows its reel and direct link.
  Otherwise, the dialog shows the details without a reel, link, or replacement image.
  Keep `imageAlt` descriptive for other views that use the photograph.
- Follow the ASD-STE100 style rule and the Conventional Commits rule in
  `CLAUDE.md`, for example `feat(gallery): add heritage red ball`, for any
  commit message about this change.
