// A temporary landing page, shown at "/" while the rest of the site sits
// behind the "/site" prefix. See the comment next to its route in App.tsx
// for how to remove this page and restore the normal routing.
import { useSeo } from "../hooks/useSeo";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import styles from "./ComingSoon.module.css";

export function ComingSoon() {
  useSeo({
    title: "Coming soon",
    description:
      "Handmade custom soccer balls, hand-stitched to order in Perth, Western Australia. Our online shop is coming soon.",
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.brand}>
          <Logo size={64} decorative className={styles.logo} />
          <h1 className={styles.wordmark}>
            <strong>HESSELL</strong>MAKES
          </h1>
        </div>
        <p className={styles.message}>Coming soon!</p>
      </main>

      <Footer />
    </div>
  );
}
