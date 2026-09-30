/**
 * The glowing square illustration that sits under each section title. Static
 * SVG, purely decorative.
 */
type Variant = 'wave' | 'orbit' | 'spiral' | 'cubes';

function Art({ variant }: { variant: Variant }) {
  switch (variant) {
    case 'wave':
      return (
        <>
          <defs>
            <linearGradient id="wave-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c084fc" stopOpacity="0.85" />
              <stop offset="1" stopColor="#1d4ed8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M10 70 C 30 40, 45 40, 60 55 S 90 80, 110 45 S 140 30, 150 50 V 110 H 10 Z" fill="url(#wave-fill)" />
          <path d="M10 70 C 30 40, 45 40, 60 55 S 90 80, 110 45 S 140 30, 150 50" fill="none" stroke="#67e8f9" strokeWidth="2" />
          {[20, 50, 80, 110, 140].map((x) => (
            <circle key={x} cx={x} cy={25 + (x % 3) * 8} r="1.6" fill="#f472d0" />
          ))}
        </>
      );
    case 'orbit':
      return (
        <>
          {[18, 30, 42, 54].map((r, i) => (
            <ellipse key={r} cx="80" cy="80" rx={r} ry={r * 0.92} fill="none" stroke={i % 2 ? '#f472d0' : '#c084fc'} strokeOpacity="0.55" strokeWidth="1.2" transform={`rotate(${i * 25} 80 80)`} />
          ))}
          <circle cx="80" cy="80" r="7" fill="#f472d0" />
          {[
            [98, 80],
            [80, 50],
            [44, 92],
            [124, 104],
            [60, 130],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#67e8f9" />
          ))}
        </>
      );
    case 'spiral':
      return (
        <>
          {Array.from({ length: 70 }, (_, i) => {
            const a = i * 0.42;
            const r = 4 + i * 0.85;
            return <circle key={i} cx={80 + Math.cos(a) * r} cy={80 + Math.sin(a) * r} r={1 + i * 0.03} fill={i % 3 ? '#67e8f9' : '#6ee7b7'} fillOpacity={1 - i / 110} />;
          })}
        </>
      );
    case 'cubes':
      return (
        <>
          {[
            [50, 60, 16, -12, '#60a5fa'],
            [95, 45, 12, 18, '#c084fc'],
            [110, 95, 18, 8, '#f472d0'],
            [60, 110, 11, -24, '#67e8f9'],
            [80, 80, 9, 30, '#fdba74'],
          ].map(([x, y, s, r, c]) => (
            <rect key={`${x}-${y}`} x={Number(x) - Number(s)} y={Number(y) - Number(s)} width={Number(s) * 2} height={Number(s) * 2} rx="3" fill={String(c)} fillOpacity="0.8" transform={`rotate(${r} ${x} ${y})`} />
          ))}
        </>
      );
  }
}

export default function Emblem({ variant }: { variant: Variant }) {
  return (
    <div aria-hidden="true" className="glow-frame mx-auto mt-10 h-36 w-36 overflow-hidden bg-[radial-gradient(circle,#1a1540,#06061a_75%)] sm:h-44 sm:w-44">
      <svg viewBox="0 0 160 160" className="h-full w-full">
        <Art variant={variant} />
      </svg>
    </div>
  );
}
