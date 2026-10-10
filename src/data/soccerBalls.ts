import ball1 from "../assets/gallery/ball1.jpeg";
import ball2 from "../assets/gallery/ball2.jpeg";
import ball3 from "../assets/gallery/ball3.jpeg";

export interface SoccerBallProduct {
  id: string;
  name: string;
  imageSrc: string;
  /** Describes what's visible in the photo, since the image itself is the content. */
  imageAlt: string;
  description: string;
}

export const soccerBalls: SoccerBallProduct[] = [
  {
    id: "wave-weave",
    name: "Wave Weave",
    imageSrc: ball1,
    imageAlt:
      "A hand-stitched ball with swirling teal and maroon panels on white leather.",
    description:
      "A swirling wave pattern, hand-stitched panel by panel in teal and maroon leather.",
  },
  {
    id: "patchwork",
    name: "Patchwork",
    imageSrc: ball2,
    imageAlt:
      "A hand-stitched ball made of mismatched leather offcuts in browns, blues, and gold, with a whimsical cat face on one panel.",
    description:
      "Made from offcuts of leather left over from other pieces, with a playful surprise stitched into one panel.",
  },
  {
    id: "match-day",
    name: "Match Day",
    imageSrc: ball3,
    imageAlt:
      "A blue and white hand-stitched ball with a club crest and fixture dates embroidered on its panels.",
    description:
      "A commemorative design, with a season's fixtures and a club crest hand-stitched onto its panels.",
  },
];
