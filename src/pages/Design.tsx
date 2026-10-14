import { useSeo } from "../hooks/useSeo";
import { siteRoutes } from "../siteRoutes";
import { brandColors } from "../theme/colors";
import styles from "./Design.module.css";

const palette: { name: string; hex: string }[] = [
  { name: "Aussie Blue", hex: brandColors.aussieBlue },
  { name: "English Red", hex: brandColors.englishRed },
  { name: "Cream", hex: brandColors.cream },
  { name: "Black", hex: brandColors.black },
  { name: "White", hex: brandColors.white },
];

// Not linked from the nav - reachable only by visiting /design directly.
export function Design() {
  useSeo({
    noindex: !siteRoutes.design.indexable,
    title: "Design",
    description: "The HessellMakes brand colour palette.",
    // Not linked from anywhere in the UI, by design, so a search engine
    // should not index or recommend this page either.
  });

  return (
    <section className={styles.palette} aria-label="Brand colour palette">
      <h1>Our palette</h1>
      <ul className={styles.swatches}>
        {palette.map((color) => (
          <li className={styles.swatch} key={color.name}>
            <span
              className={styles.swatchChip}
              style={{ backgroundColor: color.hex }}
              aria-hidden="true"
            />
            <span className={styles.swatchName}>{color.name}</span>
            <span className={styles.swatchHex}>{color.hex}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
