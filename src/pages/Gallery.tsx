import {
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { useSeo } from "../hooks/useSeo";
import { useJsonLd } from "../hooks/useJsonLd";
import { soccerBalls } from "../data/soccerBalls";
import styles from "./Gallery.module.css";

// A swipe shorter than this, in pixels, is a tap or a scroll, not a swipe.
const SWIPE_THRESHOLD = 50;

export function Gallery() {
  useSeo({
    title: "Gallery",
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
        <h1>Gallery</h1>
        <p>
          Every ball is hand-stitched to order in our Perth, WA workshop. Select
          a ball to see more about its finish and story.
        </p>
      </div>

      <ul className={styles.grid}>
        {soccerBalls.map((ball, index) => (
          <li key={ball.id}>
            <button
              type="button"
              className={styles.card}
              onClick={() => openBall(index)}
            >
              <img className={styles.cardImage} src={ball.imageSrc} alt="" />
              <span className={styles.cardName}>{ball.name}</span>
            </button>
          </li>
        ))}
      </ul>

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

            <img
              className={styles.dialogImage}
              src={selectedBall.imageSrc}
              alt={selectedBall.imageAlt}
            />
            <h2 id="ball-dialog-title">{selectedBall.name}</h2>
            <p>{selectedBall.description}</p>
          </div>
        )}
      </dialog>
    </div>
  );
}
