/**
 * Brand palette, sourced from ColourGuide.pdf (HessellMakes Logo & Colour Guide).
 * Keep this as the single source of truth for brand colours - the CSS
 * variables in `theme.css` are derived from these values.
 */
export const brandColors = {
  aussieBlue: "#1F305E",
  englishRed: "#C93C47",
  cream: "#CEB99F",
  black: "#000000",
  white: "#FFFFFF",
} as const;

export type BrandColorName = keyof typeof brandColors;

export type ThemeName = "light" | "dark";
