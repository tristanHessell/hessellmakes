import { useRef, useState, type MouseEvent } from "react";
import { soccerBalls, type SoccerBallProduct } from "../data/soccerBalls";
import { useSeo } from "../hooks/useSeo";
import { siteRoutes } from "../siteRoutes";
import { ExternalLink } from "../components/ExternalLink";
import styles from "./Shop.module.css";

export function Shop() {
  const [selectedBall, setSelectedBall] = useState<SoccerBallProduct | null>(
    null,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  useSeo({
    noindex: !siteRoutes.shop.indexable,
    title: "Shop",
    description:
      "Browse the pre-made leather soccer ball collection from HessellMakes, hand-stitched in Perth, Western Australia. Online ordering is coming soon.",
  });

  function openBall(ball: SoccerBallProduct) {
    setSelectedBall(ball);
    dialogRef.current?.showModal();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1>Shop</h1>
        <p className={styles.lead}>
          Made by hand. Chosen by you. Explore our pre-made leather soccer
          balls, each with its own colours, character and story.
        </p>
      </header>

      <div className={styles.availability}>
        <strong>Online ordering is coming soon.</strong>
        <span>Shop current stock on Etsy.</span>
        <ExternalLink
          href="https://www.etsy.com/au/shop/Hessellmakes"
          label="Visit Etsy"
        />
      </div>

      {/* Remove hidden when the collection is ready to show. */}
      <section aria-labelledby="collection-heading" hidden>
        <div className={styles.sectionHeading}>
          <h2 id="collection-heading">The pre-made collection</h2>
          <p>
            A preview of the collection. Prices and availability will be
            confirmed when online ordering opens.
          </p>
        </div>
        <ul className={styles.grid}>
          {soccerBalls.map((ball) => (
            <li key={ball.id} className={styles.product}>
              <img
                src={ball.imageSrc}
                alt={ball.imageAlt}
                width="480"
                height="480"
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <p className={styles.eyebrow}>Hand-stitched leather</p>
                <h3>{ball.name}</h3>
                <p className={styles.description}>{ball.description}</p>
                <p className={styles.priceNote}>Price available at launch</p>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => openBall(ball)}
                >
                  View {ball.name}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="shop-ball-title"
        onClose={() => setSelectedBall(null)}
        onClick={handleBackdropClick}
      >
        {selectedBall && (
          <div className={styles.dialogContent}>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close"
              onClick={() => dialogRef.current?.close()}
            >
              &times;
            </button>
            <img
              src={selectedBall.imageSrc}
              alt={selectedBall.imageAlt}
              width="480"
              height="480"
              className={styles.productImage}
            />
            <div>
              <p className={styles.eyebrow}>Hand-stitched leather</p>
              <h2 id="shop-ball-title">{selectedBall.name}</h2>
              <p className={styles.description}>{selectedBall.description}</p>
              <p className={styles.priceNote}>Price available at launch</p>
              <button
                type="button"
                className={styles.purchaseButton}
                disabled
                aria-describedby="checkout-notice"
              >
                Buy online
              </button>
              <p id="checkout-notice" className={styles.checkoutNotice}>
                Online ordering is not open yet. Availability for this ball has
                not been confirmed.
              </p>
              <ExternalLink
                href="https://www.etsy.com/au/shop/Hessellmakes"
                label="Shop current stock on Etsy"
              />
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
