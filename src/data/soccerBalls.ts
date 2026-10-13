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
  completed: string;
  construction: string;
  instagramUrl: string;
}

export const soccerBalls: SoccerBallProduct[] = [
  {
    id: "triple-truchet-tile",
    name: "Triple Truchet Tile",
    imageSrc: ball1,
    imageAlt:
      "A hand-stitched ball with red, blue and white leather panels in a swirling tile pattern.",
    completed: "July 2025",
    construction: "Made from 406 pieces of Kangaroo leather.",
    description:
      "Red, blue and white was chosen in support of England during the Women's Euros in Switzerland. This ball was stitched on planes, trains and in hotels during the tournament.",
    instagramUrl: "https://www.instagram.com/reel/DMYesrHNMyL",
  },
  {
    id: "the-cat",
    name: "The Cat",
    imageSrc: ball2,
    imageAlt:
      "A hand-stitched ball with multicoloured leather panels and a cat face on one panel.",
    completed: "November 2025",
    construction:
      "Made from 146 pieces in the colours of Manchester City and Netherlands, bookended by the colours of the progress pride flag.",
    description: "Made for Kerstin Casparij and Ruth Brown.",
    instagramUrl: "https://www.instagram.com/reel/DRuCTl1gaCe",
  },
  {
    id: "sk100",
    name: "SK100",
    imageSrc: ball3,
    imageAlt:
      "A blue and white leather ball with a Chelsea crest and engraved match details on its panels.",
    completed: "June 2025",
    construction:
      "Made from 92 pieces in Chelsea FC colours and a touch of gold.",
    description:
      "Commissioned by Chelsea FCW in celebration of Sam Kerr kicking 100 goals for the club. Each panel represents a game where a goal was scored, with the competition, date, minute and opponent engraved into each panel.",
    instagramUrl: "https://www.instagram.com/reel/DOyqY9HghPu",
  },
];
