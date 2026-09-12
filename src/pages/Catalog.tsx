import { useRef, useState, type MouseEvent } from "react";
import { SoccerBall } from "../components/SoccerBall";
import { soccerBalls, type SoccerBallProduct } from "../data/soccerBalls";
import styles from "./Catalog.module.css";

export function Catalog() {
  const [selectedBall, setSelectedBall] = useState<SoccerBallProduct | null>(
    null,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openBall(ball: SoccerBallProduct) {
    setSelectedBall(ball);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
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
        <h1>Catalog</h1>
        <p>
          Every ball is hand-stitched to order. Select a ball to see more about
          its finish and story.
        </p>
      </div>

      <ul className={styles.grid}>
        {soccerBalls.map((ball) => (
          <li key={ball.id}>
            <button
              type="button"
              className={styles.card}
              onClick={() => openBall(ball)}
            >
              <SoccerBall accentColor={ball.accentColor} size={96} />
              <span className={styles.cardName}>{ball.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="ball-dialog-title"
        onClose={() => setSelectedBall(null)}
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
            <SoccerBall accentColor={selectedBall.accentColor} size={160} />
            <h2 id="ball-dialog-title">{selectedBall.name}</h2>
            <p>{selectedBall.description}</p>
          </div>
        )}
      </dialog>
    </div>
  );
}
