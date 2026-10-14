import ball1 from "../assets/gallery/ball1.jpeg";
import ball2 from "../assets/gallery/ball2.jpeg";
import ball3 from "../assets/gallery/ball3.jpeg";
import calcioItaliano from "../assets/gallery/calcio-italiano.webp";
import afcWomensAsianCup from "../assets/gallery/afc-womens-asian-cup-2026.webp";
import blanketStitchTruchetTile from "../assets/gallery/blanket-stitch-truchet-tile.webp";
import indivisa from "../assets/gallery/indivisa.webp";
import pritchardsPencil from "../assets/gallery/pritchards-pencil.jpg";
import studioHoneymoone from "../assets/gallery/studio-honeymoone.jpg";
import stitchLess from "../assets/gallery/stitch-less.jpg";
import tudorRose from "../assets/gallery/tudor-rose.webp";

export interface SoccerBallProduct {
  id: string;
  category: "custom" | "commission";
  name: string;
  imageSrc: string;
  /** Describes what's visible in the photo, since the image itself is the content. */
  imageAlt: string;
  description: string;
  completed: string;
  construction: string;
  /** A fully qualified URL to the Instagram reel for the ball. */
  instagramUrl?: string;
}

export const soccerBalls: SoccerBallProduct[] = [
  {
    category: "custom",
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
    category: "custom",
    id: "tudor-rose",
    name: "Tudor Rose",
    imageSrc: tudorRose,
    imageAlt:
      "A leather ball with layered red and white Tudor rose motifs and detailed stitching around each petal.",
    completed: "October 2025",
    construction: "Made from 12 base panels of kangaroo leather.",
    description:
      "Based off the Tudor Rose, and more specifically the UK Tourist Sign T201. One of the most stitch intensive balls I've ever made. White leather was used underneath white to emphasise the red pattern and stitching and over the top to act as a border around each rose.",
    instagramUrl: "https://www.instagram.com/reel/DPdZ8E9AbM6",
  },
  {
    category: "custom",
    id: "the-cat",
    name: "Cat Ball",
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
    category: "custom",
    id: "blanket-stitch-truchet-tile",
    name: "Blanket Stitch Truchet Tile",
    imageSrc: blanketStitchTruchetTile,
    imageAlt:
      "A white leather ball with curved tile patterns outlined in raised yellow and green blanket stitches.",
    completed: "February 2026",
    construction:
      "Made from 32 panels of white kangaroo leather and yellow and green waxed thread.",
    description:
      "I wanted to find a new way to make my favourite style of ball (the truchet tile). Using blanket stitches to represent the tiles created a 3D texture that couldn't be replicated with leather.",
    instagramUrl: "https://www.instagram.com/reel/DVI4PgHgRUO",
  },
  {
    category: "custom",
    id: "stitch-less",
    name: "Stitch-less",
    imageSrc: stitchLess,
    imageAlt:
      "A leather ball with interlocking arrow-and-notch panels in navy, brown, yellow, pink and white, without visible stitching.",
    completed: "May 2026",
    construction: "Made from 20 panels of Kangaroo leather.",
    description:
      "This was an exploration of a new way of putting balls together, without stitches. With the help of a friend this is what we came up with. An arrow and notch style panel that interlocks into the panel beside it.",
    instagramUrl: "https://www.instagram.com/reel/DYJst0vBG-w",
  },
  {
    category: "commission",
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
  {
    category: "commission",
    id: "calcio-italiano",
    name: "Calcio Italiano",
    imageSrc: calcioItaliano,
    imageAlt:
      "A leather ball with striped panels in Italian football team colours and a white Western Australia panel.",
    completed: "August 2026",
    construction:
      "A batch of 12 balls (8 made in 6 days), each made from 132 panels of Kangaroo leather.",
    description:
      "Commissioned by Tourism WA and the Department of Creative Industries, Tourism and Sport as gifts for distinguished guests and Italian Serie A and Serie B teams - Juventus, AC Milan, Inter Milan and Palermo.",
    instagramUrl: "https://www.instagram.com/reel/Db2qZbMBcoV",
  },
  {
    category: "commission",
    id: "afc-womens-asian-cup-2026",
    name: "AFC Womens Asian Cup",
    imageSrc: afcWomensAsianCup,
    imageAlt:
      "A purple, blue and white leather ball with a stitched Australian flag and an AFC Women's Asian Cup emblem.",
    completed: "February 2026",
    construction:
      "A batch of 6 balls, each made from 32 panels of Kangaroo leather.",
    description:
      "Commissioned by Tourism WA as gifts for 6 of the teams competing in Perth during the AFC Womens Asian Cup 2026. Each ball had custom miniature flags made that were stitched in place.",
    instagramUrl: "https://www.instagram.com/reel/DWTTZFrh_qn",
  },
  {
    category: "commission",
    id: "pritchards-pencil",
    name: "Pritchards Pencil",
    imageSrc: pritchardsPencil,
    imageAlt:
      "A red, navy and white leather ball with hand-drawn illustrations of England's football celebrations on its white panels.",
    completed: "September 2025",
    construction:
      "Made from 72 panels of Kangaroo leather, in white, red and navy as a celebration of the 2025 Womens Euros win for England.",
    description:
      "Artwork drawn by Miriam Pritchard (Pritchards Pencil), celebrating moments from the 2025 Womens Euros.",
    instagramUrl: "https://www.instagram.com/reel/DRcpoeyiI3O",
  },
  {
    category: "commission",
    id: "studio-honeymoone",
    name: "Studio Honeymoone",
    imageSrc: studioHoneymoone,
    imageAlt:
      "A white leather ball with teal and pink circular panels and a central HessellMakes and Honeymoone logo.",
    completed: "April 2026",
    construction: "Made from 182 panels of Kangaroo leather.",
    description:
      "Custom ball to be used in product photography to complement Studio Honeymoone's upcycled sportswear.",
  },
  {
    category: "commission",
    id: "indivisa",
    name: "Indivisa",
    imageSrc: indivisa,
    imageAlt:
      "A navy and pink leather ball with curved Adidas Tango panels and a white Indivisa logo.",
    completed: "February 2025",
    construction: "Made from 92 panels of Kangaroo leather.",
    description:
      "Based on the recognisable and well known pattern of the Adidas Tango. The Indivisa logo was cut out of the navy leather with white leather installed behind to emphasise the logo.",
    instagramUrl: "https://www.instagram.com/reel/DKjamcsIx07",
  },
];
