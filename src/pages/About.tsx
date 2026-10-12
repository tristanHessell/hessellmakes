import { useSeo } from "../hooks/useSeo";
import { FounderPortrait } from "../components/FounderPortrait";
import styles from "./About.module.css";

export function About() {
  useSeo({
    title: "About",
    description:
      "Meet Ava Hessell, the Perth, WA maker behind HessellMakes, hand-stitching custom leather soccer balls since 2015.",
  });

  return (
    <div className={styles.page}>
      <h1>About</h1>

      <section className={styles.founder}>
        <FounderPortrait size={160} className={styles.portrait} />
        <div>
          <h2>Ava Hessell</h2>
          <p>
            Ava founded HessellMakes in 2015, teaching herself to hand-stitch
            custom soccer balls in a spare room in Perth, Western Australia,
            after a decade restoring old furniture. What started as a way to
            make a few considered things for friends grew, piece by piece, into
            a small workshop.
          </p>
          <p>
            She still cuts, stitches, and finishes every ball herself — choosing
            materials and techniques for how well they'll age, not just how they
            look on day one.
          </p>
        </div>
      </section>
    </div>
  );
}
