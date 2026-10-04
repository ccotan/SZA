/**
 * Процедурный «блочный» пейзаж — фирменная иллюстрация сайта.
 * Детерминированный (seed), рендерится на сервере в SVG, весит пару килобайт.
 * Когда появятся настоящие скриншоты мира, их можно передать в Hero/World вместо него.
 */
type Palette = "day" | "dusk" | "night";

const palettes: Record<Palette, { sky: [string, string]; sun: string; layers: string[]; cloud: string }> = {
  day: {
    sky: ["#dbe7e1", "#f4f7f3"],
    sun: "#fffaf0",
    layers: ["#cbd9d0", "#a9c2b2", "#76a085", "#3f6e52"],
    cloud: "#ffffff",
  },
  dusk: {
    sky: ["#ecd8c9", "#f7efe7"],
    sun: "#ffe2bd",
    layers: ["#dcc6bb", "#bca5a3", "#857888", "#4b4759"],
    cloud: "#fbf3ec",
  },
  night: {
    sky: ["#17202c", "#2a3545"],
    sun: "#e9edf3",
    layers: ["#334156", "#283448", "#1e2838", "#141b26"],
    cloud: "#3a4658",
  },
};

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const W = 1600;
const H = 900;

function layerPath(rand: () => number, base: number, amp: number, block: number) {
  const p1 = rand() * Math.PI * 2;
  const p2 = rand() * Math.PI * 2;
  const f1 = 0.0025 + rand() * 0.002;
  const f2 = 0.008 + rand() * 0.006;
  const heights: number[] = [];
  let d = `M0 ${H}`;
  for (let x = 0; x <= W; x += block) {
    const n = Math.sin(x * f1 + p1) * 0.7 + Math.sin(x * f2 + p2) * 0.3;
    const y = Math.round((base - n * amp) / block) * block;
    heights.push(y);
    d += `L${x} ${y}L${x + block} ${y}`;
  }
  return { d: `${d}L${W} ${H}Z`, heights };
}

export function Landscape({
  seed = 7,
  palette = "day",
  className,
  clouds = true,
  title,
  horizon = 0,
}: {
  seed?: number;
  palette?: Palette;
  className?: string;
  clouds?: boolean;
  title?: string;
  /** Сдвиг линии горизонта вниз (в единицах viewBox), чтобы освободить небо под текст */
  horizon?: number;
}) {
  const pal = palettes[palette];
  const rand = rng(seed);
  const config = [
    { base: 470, amp: 70, block: 16 },
    { base: 560, amp: 80, block: 24 },
    { base: 660, amp: 70, block: 32 },
    { base: 770, amp: 60, block: 48 },
  ];
  const layers = config.map((c, i) => layerPath(rand, c.base + horizon * (1 - i * 0.15), c.amp, c.block));
  const gid = `sky-${palette}-${seed}`;

  // Деревья на ближнем плане: ствол + крона из блоков
  const front = layers[3]!;
  const trees: { x: number; y: number }[] = [];
  for (let i = 0; i < front.heights.length; i++) {
    if (rand() > 0.82) trees.push({ x: i * 48, y: front.heights[i]! });
  }
  const mid = layers[2]!;
  const midTrees: { x: number; y: number }[] = [];
  for (let i = 0; i < mid.heights.length; i++) {
    if (rand() > 0.86) midTrees.push({ x: i * 32, y: mid.heights[i]! });
  }

  const cloudShapes = [
    { x: 560, y: 90, w: 300 },
    { x: 980, y: 150, w: 200 },
    { x: 1380, y: 70, w: 240 },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={pal.sky[0]} />
          <stop offset="1" stopColor={pal.sky[1]} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${gid})`} />
      {/* Квадратное солнце/луна — тихая отсылка к Minecraft */}
      <rect x={1240} y={210} width={96} height={96} fill={pal.sun} opacity={palette === "night" ? 0.9 : 0.85} />
      {palette === "night" &&
        Array.from({ length: 40 }, (_, i) => (
          <rect key={i} x={Math.floor(rand() * W)} y={Math.floor(rand() * 380)} width={3} height={3} fill="#cfd6e2" opacity={0.3 + rand() * 0.5} />
        ))}
      {clouds && (
        <g className="cloud-drift" opacity={palette === "night" ? 0.4 : 0.75}>
          {cloudShapes.map((c) => (
            <g key={c.x} fill={pal.cloud}>
              <rect x={c.x} y={c.y} width={c.w} height={24} />
              <rect x={c.x + c.w * 0.2} y={c.y - 16} width={c.w * 0.45} height={16} />
            </g>
          ))}
        </g>
      )}
      {layers.map((l, i) => (
        <path key={i} d={l.d} fill={pal.layers[i]} />
      ))}
      <g fill={pal.layers[2]}>
        {midTrees.map((t) => (
          <g key={`m${t.x}`}>
            <rect x={t.x + 10} y={t.y - 40} width={12} height={40} />
            <rect x={t.x - 6} y={t.y - 72} width={44} height={36} />
          </g>
        ))}
      </g>
      <g fill={pal.layers[3]}>
        {trees.map((t) => (
          <g key={t.x}>
            <rect x={t.x + 16} y={t.y - 64} width={16} height={64} />
            <rect x={t.x - 16} y={t.y - 120} width={80} height={64} />
            <rect x={t.x} y={t.y - 144} width={48} height={24} />
          </g>
        ))}
      </g>
    </svg>
  );
}
