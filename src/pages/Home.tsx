import { Link } from "react-router-dom";
import { brandColors } from "../theme/colors";
import styles from "./Home.module.css";

const features = [
  {
    title: "Craftsmanship",
    description:
      "Every piece is made by hand, with an eye for detail that mass production leaves behind.",
  },
  {
    title: "Heritage",
    description:
      "Techniques and materials chosen for how well they age, not just how they look on day one.",
  },
  {
    title: "Quality",
    description:
      "Built to be used, not just displayed — durable materials matched to durable design.",
  },
];

const palette: { name: string; hex: string }[] = [
  { name: "Aussie Blue", hex: brandColors.aussieBlue },
  { name: "English Red", hex: brandColors.englishRed },
  { name: "Cream", hex: brandColors.cream },
  { name: "Black", hex: brandColors.black },
  { name: "White", hex: brandColors.white },
];

export function Home() {
  return (
    <>
      <section className={styles.hero}>
        <h1>Handmade, built to last.</h1>
        <p>
          HessellMakes is a small workshop turning raw materials into
          considered, everyday pieces — designed with care and finished by hand.
        </p>
        <div className={styles.ctaGroup}>
          <Link className={`${styles.cta} ${styles.ctaPrimary}`} to="/gallery">
            Explore the work
          </Link>
          <Link
            className={`${styles.cta} ${styles.ctaSecondary}`}
            to="/contact"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        {features.map((feature) => (
          <article className={styles.featureCard} key={feature.title}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>

      <section className={styles.palette} aria-label="Brand colour palette">
        <h2>Our palette</h2>
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
    </>
  );
}
