import { useRef, useState, type MouseEvent } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { soccerBalls } from "../data/soccerBalls";
import styles from "./Gallery.module.css";

export function Gallery() {
  usePageTitle("Gallery");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedBall =
    selectedIndex === null ? null : soccerBalls[selectedIndex];

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

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <h1>Gallery</h1>
        <p>
          Every ball is hand-stitched to order. Select a ball to see more about
          its finish and story.
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
