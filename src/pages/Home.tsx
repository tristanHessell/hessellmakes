import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
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

export function Home() {
  usePageTitle("Home");

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
    </>
  );
}
