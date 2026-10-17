import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';
import { siteRoutes } from '../siteRoutes';
import landing from '../assets/landing.webp';
import styles from './Home.module.css';

const features = [
  {
    title: 'Craftsmanship',
    description:
      'Every piece is made by hand, with an eye for detail that mass production leaves behind.',
  },
  {
    title: 'Heritage',
    description:
      'Techniques and materials chosen for how well they age, not just how they look on day one.',
  },
  {
    title: 'Quality',
    description:
      'Built to be used, not just displayed - durable materials matched to durable design.',
  },
];

export function Home() {
  useSeo({
    noindex: !siteRoutes.home.indexable,
    title: 'Handmade Custom Soccer Balls in Perth, WA',
    description:
      'Handmade custom soccer balls, hand-stitched to order in our Perth, Western Australia workshop. Considered design, durable leather, built to last.',
  });

  return (
    <>
      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src={landing}
          alt="A collection of hand-stitched leather soccer balls with colourful panels and detailed patterns."
          width={6000}
          height={3376}
          fetchPriority="high"
        />
        <div className={styles.heroContent}>
          <h1>Handmade soccer balls, built to last.</h1>
          <p>
            HessellMakes is a small Perth, Western Australia workshop,
            hand-stitching custom soccer balls from raw leather into considered,
            one-of-a-kind pieces.
          </p>
          <div className={styles.ctaGroup}>
            <Link
              className={clsx(styles.cta, styles.ctaPrimary)}
              to="portfolio"
            >
              Explore the work
            </Link>
            <Link className={clsx(styles.cta, styles.ctaSecondary)} to="shop">
              Visit the shop
            </Link>
          </div>
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
