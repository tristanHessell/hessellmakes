import { useSeo } from "../hooks/useSeo";
import { siteRoutes } from "../siteRoutes";
import emily from "../assets/emily.webp";
import styles from "./About.module.css";

export function About() {
  useSeo({
    noindex: !siteRoutes.about.indexable,
    title: "About",
    description:
      "Meet Emily, the maker behind HessellMakes. Every ball is designed, hand stitched and finished in Perth, Western Australia.",
  });

  return (
    <div className={styles.page}>
      <h1>About</h1>

      <section className={styles.founder}>
        <img
          src={emily}
          alt="Emily holding two handmade leather soccer balls in front of a display of balls."
          width="240"
          height="360"
          className={styles.portrait}
        />
        <div>
          <p>My name’s Emily and I love making balls.</p>
          <p>
            It all started from a TikTok in 2023. 1 long weekend and a ball
            later, I saw a rapid turnaround to five balls, which turned into
            twenty and suddenly there were far too many balls around the house
            for 2 people and a dog.
          </p>
          <p>
            Whether it's a one-off custom designed ball, a new pattern sparked
            from a random idea or a ball to commemorate a special occasion,
            every ball is designed, hand stitched and finished in Perth, Western
            Australia.
          </p>
          <p>Every stitch tells a story.</p>
        </div>
      </section>
    </div>
  );
}
