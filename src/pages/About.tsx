import { usePageTitle } from "../hooks/usePageTitle";
import { FounderPortrait } from "../components/FounderPortrait";
import styles from "./About.module.css";

export function About() {
  usePageTitle("About");

  return (
    <div className={styles.page}>
      <h1>About</h1>

      <section className={styles.founder}>
        <FounderPortrait size={160} className={styles.portrait} />
        <div>
          <h2>Ava Hessell</h2>
          <p>
            Ava founded HessellMakes in 2015, teaching herself to hand-stitch
            leather in a spare room after a decade restoring old furniture. What
            started as a way to make a few considered things for friends grew,
            piece by piece, into a small workshop.
          </p>
          <p>
            She still cuts, stitches, and finishes every piece herself —
            choosing materials and techniques for how well they'll age, not just
            how they look on day one.
          </p>
        </div>
      </section>
    </div>
  );
}
