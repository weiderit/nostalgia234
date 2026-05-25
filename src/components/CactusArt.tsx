import clsx from "clsx";

type Variant = "кактус" | "суккулент" | "набор" | "горшок";

type Props = {
  accent?: string;
  variant?: Variant;
  className?: string;
};

export function CactusArt({ accent = "#4b894e", variant = "кактус", className }: Props) {
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
          <stop offset="0%" stopColor="#fffdf8" />
          <stop offset="100%" stopColor="#f7f0e1" />
        </linearGradient>
        <radialGradient id="sun" cx="0.82" cy="0.18" r="0.32">
          <stop offset="0%" stopColor="#f4dcc9" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#f4dcc9" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="potG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d39668" />
          <stop offset="100%" stopColor="#985933" />
        </linearGradient>
        <linearGradient id="potRim" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#985933" />
          <stop offset="100%" stopColor="#724328" />
        </linearGradient>
        <linearGradient id="cactusG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="1" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.78" />
        </linearGradient>
        <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>
      <rect x="0" y="0" width="200" height="250" fill="url(#sky)" />
      <circle cx="160" cy="40" r="46" fill="url(#sun)" />
      {/* ground shadow */}
      <ellipse cx="100" cy="232" rx="60" ry="6" fill="#244223" opacity="0.08" />

      {/* pot */}
      <g>
        <path
          d="M55 178 Q56 175 60 174 L140 174 Q144 175 145 178 L138 228 Q138 234 132 235 Q100 240 68 235 Q62 234 62 228 Z"
          fill="url(#potG)"
        />
        <path
          d="M55 178 Q56 175 60 174 L140 174 Q144 175 145 178 L143 187 Q100 192 57 187 Z"
          fill="url(#potRim)"
        />
        <path
          d="M65 196 Q100 200 135 196"
          stroke="#fbf2eb"
          strokeOpacity="0.2"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {variant === "кактус" && (
        <g>
          {/* main body */}
          <ellipse cx="100" cy="138" rx="40" ry="52" fill="url(#cactusG)" />
          <ellipse cx="100" cy="138" rx="40" ry="52" fill="#fffdf8" opacity="0.07" />
          {/* ribs */}
          {[-22, -10, 0, 10, 22].map((dx) => (
            <path
              key={dx}
              d={`M${100 + dx} 92 Q${100 + dx * 0.85} 138 ${100 + dx * 0.7} 184`}
              stroke="#244223"
              strokeOpacity="0.18"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />
          ))}
          {/* arms */}
          <g>
            <path
              d="M64 142 Q52 138 50 122 Q48 108 60 108 Q70 108 72 122 Q74 138 78 144 Z"
              fill="url(#cactusG)"
            />
            <path
              d="M136 130 Q148 126 150 112 Q151 100 142 100 Q132 100 130 112 Q128 126 124 132 Z"
              fill="url(#cactusG)"
            />
            <path
              d="M50 122 Q56 138 60 122"
              stroke="#244223"
              strokeOpacity="0.18"
              strokeWidth="1.1"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M140 112 Q146 126 150 112"
              stroke="#244223"
              strokeOpacity="0.18"
              strokeWidth="1.1"
              fill="none"
              strokeLinecap="round"
            />
          </g>
          {/* spines as little crosses */}
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            const r = 32 + (i % 2) * 6;
            const cx = 100 + Math.cos(a) * r * 0.85;
            const cy = 138 + Math.sin(a) * r * 1.05;
            return (
              <g key={i} stroke="#fffdf8" strokeWidth="1" strokeOpacity="0.85" strokeLinecap="round">
                <line x1={cx - 1.6} y1={cy} x2={cx + 1.6} y2={cy} />
                <line x1={cx} y1={cy - 1.6} x2={cx} y2={cy + 1.6} />
              </g>
            );
          })}
          {/* flower */}
          <g transform="translate(100 85)">
            {[0, 1, 2, 3, 4].map((i) => {
              const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
              const cx = Math.cos(a) * 5;
              const cy = Math.sin(a) * 5;
              return (
                <ellipse
                  key={i}
                  cx={cx}
                  cy={cy}
                  rx="4.5"
                  ry="3"
                  fill="#e6bb9a"
                  transform={`rotate(${(a * 180) / Math.PI + 90} ${cx} ${cy})`}
                />
              );
            })}
            <circle r="2.6" fill="#985933" />
          </g>
        </g>
      )}

      {variant === "суккулент" && (
        <g>
          {Array.from({ length: 9 }).map((_, i) => {
            const a = (i / 9) * Math.PI * 2;
            const cx = 100 + Math.cos(a) * 24;
            const cy = 150 + Math.sin(a) * 24;
            const rot = (a * 180) / Math.PI;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="20"
                ry="11"
                fill="url(#cactusG)"
                transform={`rotate(${rot} ${cx} ${cy})`}
                opacity="0.95"
              />
            );
          })}
          {/* inner rosette */}
          {Array.from({ length: 7 }).map((_, i) => {
            const a = (i / 7) * Math.PI * 2 + 0.2;
            const cx = 100 + Math.cos(a) * 10;
            const cy = 150 + Math.sin(a) * 10;
            const rot = (a * 180) / Math.PI;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="11"
                ry="6"
                fill={accent}
                opacity="0.85"
                transform={`rotate(${rot} ${cx} ${cy})`}
              />
            );
          })}
          <circle cx="100" cy="150" r="5" fill="#fffdf8" opacity="0.55" />
        </g>
      )}

      {variant === "набор" && (
        <g>
          <ellipse cx="68" cy="150" rx="20" ry="32" fill="url(#cactusG)" />
          <ellipse cx="102" cy="135" rx="24" ry="40" fill="#3b6e3e" />
          <ellipse cx="136" cy="150" rx="20" ry="32" fill="#8fc28d" />
          <circle cx="68" cy="118" r="5" fill="#e6bb9a" />
          <circle cx="102" cy="95" r="5" fill="#d39668" />
          <circle cx="136" cy="118" r="5" fill="#f4dcc9" />
          {/* tiny spines */}
          {[68, 102, 136].map((cx, i) => (
            <g key={cx}>
              {[0, 1, 2].map((j) => (
                <line
                  key={j}
                  x1={cx + (j - 1) * 6}
                  y1={150 - i * 2}
                  x2={cx + (j - 1) * 6 + 1}
                  y2={148 - i * 2}
                  stroke="#fffdf8"
                  strokeOpacity="0.85"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              ))}
            </g>
          ))}
        </g>
      )}

      {variant === "горшок" && (
        <g>
          <ellipse cx="100" cy="178" rx="50" ry="9" fill="#724328" opacity="0.85" />
          <path
            d="M68 128 Q70 124 75 124 L125 124 Q130 124 132 128 L139 182 Q139 186 134 187 Q100 192 66 187 Q61 186 61 182 Z"
            fill="url(#potG)"
          />
          <path
            d="M68 128 Q70 124 75 124 L125 124 Q130 124 132 128 L133 137 Q100 142 67 137 Z"
            fill="url(#potRim)"
          />
          <ellipse cx="100" cy="130" rx="29" ry="6" fill="#724328" />
        </g>
      )}
    </svg>
  );
}
