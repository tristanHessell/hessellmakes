interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Stylised "H" monogram, inspired by the icon mark in the HessellMakes
 * colour guide. Uses `currentColor` so it inherits `--color-logo`.
 */
export function Logo({ size = 40, className }: LogoProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      role="img"
      aria-label="HessellMakes icon"
    >
      <polygon points="22,4 31,12 31,42 39,50 31,58 31,88 22,96 13,88 13,58 5,50 13,42 13,12" />
      <polygon points="78,4 87,12 87,42 95,50 87,58 87,88 78,96 69,88 69,58 61,50 69,42 69,12" />
      <rect x="31" y="45" width="38" height="10" />
    </svg>
  );
}
