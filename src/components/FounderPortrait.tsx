interface FounderPortraitProps {
  size?: number;
  className?: string;
}

/**
 * Placeholder portrait glyph — a simple head-and-shoulders silhouette on a
 * soft disc — standing in for the founder's photo until one is ready.
 */
export function FounderPortrait({
  size = 160,
  className,
}: FounderPortraitProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Placeholder portrait"
    >
      <circle cx="50" cy="50" r="50" fill="var(--color-surface-strong)" />
      <circle cx="50" cy="40" r="16" fill="currentColor" />
      <path d="M18 90a32 32 0 0 1 64 0Z" fill="currentColor" />
    </svg>
  );
}
