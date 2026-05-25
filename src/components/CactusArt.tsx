import clsx from "clsx";

type Variant = "кактус" | "суккулент" | "набор" | "горшок";

type Props = {
  accent?: string;
  variant?: Variant;
  className?: string;
};

export function CactusArt({ accent = "#52a256", variant = "кактус", className }: Props) {
  return (
    <svg
      viewBox="0 0 200 250"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-hidden="true"
      className={clsx("w-full h-full", className)}
    >
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fbf8f1" />
          <stop offset="100%" stopColor="#f3ecdc" />
        </linearGradient>
        <radialGradient id="sun" cx="0.8" cy="0.18" r="0.3">
          <stop offset="0%" stopColor="#f3ddce" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f3ddce" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="200" height="250" fill="url(#sky)" />
      <circle cx="160" cy="40" r="40" fill="url(#sun)" />
      {/* pot */}
      <g>
        <path
          d="M55 175 L145 175 L138 230 Q100 240 62 230 Z"
          fill="#b56f44"
        />
        <path d="M55 175 L145 175 L142 184 L58 184 Z" fill="#955633" />
      </g>

      {variant === "кактус" && (
        <g>
          <ellipse cx="100" cy="135" rx="38" ry="48" fill={accent} />
          <path
            d="M100 90 Q 96 130 100 175"
            stroke="#264f29"
            strokeOpacity="0.35"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M80 100 Q 82 135 84 170"
            stroke="#264f29"
            strokeOpacity="0.25"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M120 100 Q 118 135 116 170"
            stroke="#264f29"
            strokeOpacity="0.25"
            strokeWidth="1.5"
            fill="none"
          />
          {/* arms */}
          <ellipse cx="65" cy="140" rx="14" ry="20" fill={accent} />
          <ellipse cx="135" cy="125" rx="12" ry="18" fill={accent} />
          {/* spines */}
          {Array.from({ length: 18 }).map((_, i) => {
            const a = (i / 18) * Math.PI * 2;
            const cx = 100 + Math.cos(a) * 30;
            const cy = 135 + Math.sin(a) * 40;
            return (
              <circle key={i} cx={cx} cy={cy} r="1.2" fill="#fbf8f1" />
            );
          })}
          {/* flower */}
          <circle cx="100" cy="88" r="6" fill="#e3b89c" />
          <circle cx="100" cy="88" r="2.5" fill="#955633" />
        </g>
      )}

      {variant === "суккулент" && (
        <g>
          {/* rosette */}
          {Array.from({ length: 9 }).map((_, i) => {
            const a = (i / 9) * Math.PI * 2;
            const cx = 100 + Math.cos(a) * 22;
            const cy = 150 + Math.sin(a) * 22;
            const rot = (a * 180) / Math.PI;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="18"
                ry="10"
                fill={accent}
                transform={`rotate(${rot} ${cx} ${cy})`}
                opacity="0.92"
              />
            );
          })}
          <circle cx="100" cy="150" r="14" fill={accent} />
          <circle cx="100" cy="150" r="6" fill="#fbf8f1" opacity="0.4" />
        </g>
      )}

      {variant === "набор" && (
        <g>
          <ellipse cx="70" cy="150" rx="20" ry="30" fill={accent} />
          <ellipse cx="100" cy="135" rx="24" ry="38" fill="#3b8a3f" />
          <ellipse cx="135" cy="150" rx="20" ry="30" fill="#79bd7a" />
          <circle cx="70" cy="120" r="4" fill="#e3b89c" />
          <circle cx="100" cy="97" r="4" fill="#cf9069" />
          <circle cx="135" cy="120" r="4" fill="#f3ddce" />
        </g>
      )}

      {variant === "горшок" && (
        <g>
          <ellipse cx="100" cy="175" rx="48" ry="9" fill="#955633" />
          <path d="M70 130 L130 130 L138 180 L62 180 Z" fill="#cf9069" />
          <path d="M70 130 L130 130 L132 138 L68 138 Z" fill="#b56f44" />
          <ellipse cx="100" cy="132" rx="29" ry="6" fill="#73422a" />
        </g>
      )}
    </svg>
  );
}
