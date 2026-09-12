import { brandColors } from "../theme/colors";

export interface SoccerBallProduct {
  id: string;
  name: string;
  /** Trim colour shown on the ball graphic, standing in for its finish. */
  accentColor: string;
  description: string;
}

export const soccerBalls: SoccerBallProduct[] = [
  {
    id: "original",
    name: "The Original",
    accentColor: brandColors.aussieBlue,
    description:
      "Our signature ball, hand-stitched from full-grain leather panels and finished with Aussie Blue trim.",
  },
  {
    id: "club-edition",
    name: "Club Edition",
    accentColor: brandColors.englishRed,
    description:
      "Built for local clubs and five-a-side leagues, with reinforced seams for regular match play.",
  },
  {
    id: "heritage",
    name: "Heritage",
    accentColor: brandColors.cream,
    description:
      "A retro-inspired panel design finished in cream leather, built to age like a favourite pair of boots.",
  },
  {
    id: "training-pro",
    name: "Training Pro",
    accentColor: brandColors.black,
    description:
      "A slightly weighted training ball designed for consistent touch and durability on any surface.",
  },
  {
    id: "anniversary",
    name: "Anniversary",
    accentColor: brandColors.aussieBlue,
    description:
      "A limited run made to mark ten years of HessellMakes, finished with contrast stitching.",
  },
  {
    id: "first-touch",
    name: "Kids' First Touch",
    accentColor: brandColors.englishRed,
    description:
      "A lighter, smaller build designed for younger players just learning the game.",
  },
];
