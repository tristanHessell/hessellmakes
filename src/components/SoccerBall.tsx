const CENTER = 50;
const PENTAGON_RADIUS = 16;
const SEAM_LENGTH = 44;
const PENTAGON_ANGLES = [0, 72, 144, 216, 288];

function toPoint(radius: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  const x = CENTER + radius * Math.cos(angleRad);
  const y = CENTER + radius * Math.sin(angleRad);
  return `${x},${y}`;
}

const pentagonPoints = PENTAGON_ANGLES.map((angle) =>
  toPoint(PENTAGON_RADIUS, angle),
).join(" ");

interface SoccerBallProps {
  /** Trim colour used to personalise this ball, e.g. a brand colour. */
  accentColor: string;
  size?: number;
  className?: string;
}

/**
 * A simplified soccer ball glyph: a black centre pentagon with seams
 * radiating out to the ball's edge, and a coloured trim ring that stands in
 * for each ball's custom finish until real product photos are available.
 */
export function SoccerBall({
  accentColor,
  size = 64,
  className,
}: SoccerBallProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-hidden="true"
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r={46}
        fill="#ffffff"
        stroke={accentColor}
        strokeWidth={5}
      />
      {PENTAGON_ANGLES.map((angle) => {
        const [x1, y1] = toPoint(PENTAGON_RADIUS, angle).split(",");
        const [x2, y2] = toPoint(SEAM_LENGTH, angle).split(",");
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#1a1a1a"
            strokeWidth={3}
            strokeLinecap="round"
          />
        );
      })}
      <polygon points={pentagonPoints} fill="#1a1a1a" />
    </svg>
  );
}
