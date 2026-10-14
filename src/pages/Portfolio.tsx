import {
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { useSeo } from "../hooks/useSeo";
import { siteRoutes } from "../siteRoutes";
import { useJsonLd } from "../hooks/useJsonLd";
import { InstagramReel } from "../components/InstagramReel";
import { soccerBalls } from "../data/soccerBalls";
import styles from "./Portfolio.module.css";

// A swipe shorter than this, in pixels, is a tap or a scroll, not a swipe.
const SWIPE_THRESHOLD = 50;

const collections = [
  { category: "custom", title: "Custom Balls" },
  { category: "commission", title: "Commissions + Collaborations" },
] as const;

export function Portfolio() {
  useSeo({
    noindex: !siteRoutes.portfolio.indexable,
    title: "Portfolio",
    description:
      "Browse our hand-stitched custom soccer balls, each one made to order in our Perth, WA workshop.",
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const selectedBall =
    selectedIndex === null ? null : soccerBalls[selectedIndex];

  const selectedBallJsonLd = useMemo(() => {
    if (!selectedBall) {
      return null;
    }

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: selectedBall.name,
      description: selectedBall.description,
      image: `${window.location.origin}${selectedBall.imageSrc}`,
      brand: { "@type": "Brand", name: "HessellMakes" },
    };
  }, [selectedBall]);
  useJsonLd(selectedBallJsonLd);

  function openBall(index: number) {
    setSelectedIndex(index);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function showPrevious() {
    setSelectedIndex(
      (index) => ((index ?? 0) - 1 + soccerBalls.length) % soccerBalls.length,
    );
  }

  function showNext() {
    setSelectedIndex((index) => ((index ?? 0) + 1) % soccerBalls.length);
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    // A click that lands on the <dialog> element itself (rather than any of
    // its content) means the user clicked the backdrop, so close it.
    if (event.target === dialogRef.current) {
      closeDialog();
    }
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLDialogElement>) {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: TouchEvent<HTMLDialogElement>) {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    // A swipe must move more in the X direction than in the Y direction,
    // so a vertical scroll does not also change the ball.
    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) {
      showNext();
    } else {
      showPrevious();
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <h1>Portfolio</h1>
        <p>
          Every ball is hand-stitched to order in Perth, Western Australia.
          Select a ball to see more about its finish and story.
        </p>
      </div>

      {collections.map(({ category, title }) => (
        <section
          key={category}
          className={styles.collection}
          aria-labelledby={`collection-${category}`}
        >
          <h2 id={`collection-${category}`}>{title}</h2>
          <ul className={styles.grid}>
            {soccerBalls.map((ball, index) =>
              ball.category === category ? (
                <li key={ball.id}>
                  <button
                    type="button"
                    className={styles.card}
                    aria-label={ball.name}
                    onClick={() => openBall(index)}
                  >
                    <img
                      className={styles.cardImage}
                      src={ball.imageSrc}
                      alt=""
                    />
                  </button>
                </li>
              ) : null,
            )}
          </ul>
        </section>
      ))}

      <section className={styles.collection} aria-labelledby="can-it-ball">
        <h2 id="can-it-ball">Can it Ball?</h2>
        <p>A series testing out unique materials. Coming Soon!</p>
      </section>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="ball-dialog-title"
        onClose={() => setSelectedIndex(null)}
        onClick={handleBackdropClick}
        onKeyDown={handleDialogKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {selectedBall && (
          <div className={styles.dialogContent}>
            <button
              type="button"
              className={styles.dialogClose}
              onClick={closeDialog}
              aria-label="Close"
            >
              &times;
            </button>

            <button
              type="button"
              className={`${styles.dialogNav} ${styles.dialogPrev}`}
              onClick={showPrevious}
              aria-label="Previous ball"
            >
              &lsaquo;
            </button>
            <button
              type="button"
              className={`${styles.dialogNav} ${styles.dialogNext}`}
              onClick={showNext}
              aria-label="Next ball"
            >
              &rsaquo;
            </button>

            <h2 id="ball-dialog-title">{selectedBall.name}</h2>
            <p className={styles.completed}>
              Completed - {selectedBall.completed}
            </p>
            <p>{selectedBall.construction}</p>
            <p>{selectedBall.description}</p>
            {selectedBall.instagramUrl && (
              <>
                <a
                  className={styles.instagramLink}
                  href={selectedBall.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch on Instagram (opens in a new tab)
                </a>
                <InstagramReel
                  key={selectedBall.id}
                  className={styles.instagramVideo}
                  url={selectedBall.instagramUrl}
                  name={selectedBall.name}
                />
              </>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
