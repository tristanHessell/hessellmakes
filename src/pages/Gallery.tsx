import { brandColors } from "../theme/colors";
import styles from "./Gallery.module.css";

const swatchRotation = [
  brandColors.aussieBlue,
  brandColors.cream,
  brandColors.englishRed,
];

const pieces = [
  { title: "Piece 01", description: "Hand-finished, solid construction." },
  { title: "Piece 02", description: "Small batch, made to order." },
  { title: "Piece 03", description: "Reclaimed materials, new purpose." },
  { title: "Piece 04", description: "Detailed joinery, built by hand." },
  { title: "Piece 05", description: "Simple lines, durable finish." },
  { title: "Piece 06", description: "Designed to be used every day." },
];

export function Gallery() {
  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <h1>Gallery</h1>
        <p>
          A look at recent work from the workshop. Photos of finished pieces
          will go here — for now, each placeholder is coloured with a shade from
          the HessellMakes palette.
        </p>
      </div>

      <ul className={styles.grid}>
        {pieces.map((piece, index) => (
          <li className={styles.item} key={piece.title}>
            <span
              className={styles.swatch}
              style={{
                backgroundColor: swatchRotation[index % swatchRotation.length],
              }}
              aria-hidden="true"
            />
            <div className={styles.caption}>
              <h2>{piece.title}</h2>
              <p>{piece.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
