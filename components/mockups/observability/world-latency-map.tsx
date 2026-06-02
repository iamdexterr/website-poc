import { cn } from "@/lib/utils";

type Region = {
  code: string;
  name: string;
  // % from left/top of the SVG viewbox
  x: number;
  y: number;
  p95: string;
  tone: "green" | "amber" | "muted";
};

const regions: Region[] = [
  { code: "blr", name: "Bangalore", x: 67, y: 60, p95: "12 ms", tone: "green" },
  { code: "fra", name: "Frankfurt", x: 51, y: 38, p95: "48 ms", tone: "green" },
  { code: "iad", name: "Virginia", x: 24, y: 42, p95: "62 ms", tone: "amber" },
  { code: "syd", name: "Sydney", x: 88, y: 78, p95: "118 ms", tone: "amber" },
  { code: "gru", name: "São Paulo", x: 33, y: 70, p95: "89 ms", tone: "muted" },
  { code: "nrt", name: "Tokyo", x: 84, y: 45, p95: "71 ms", tone: "amber" },
];

const toneClass: Record<Region["tone"], { dot: string; text: string }> = {
  green: { dot: "bg-accent-green", text: "text-accent-green" },
  amber: { dot: "bg-accent-amber", text: "text-accent-amber" },
  muted: { dot: "bg-muted-foreground", text: "text-muted-foreground" },
};

/**
 * World latency map — flat dotted world projection with edge region
 * pins and per-region p95 badges. Pure SVG dots approximating continents.
 */
export function WorldLatencyMap({ className }: { className?: string }) {
  // Pre-computed dot field approximating continents.
  // Generated as a deterministic grid + mask via inline coords.
  const dots: { x: number; y: number }[] = [];
  for (let y = 5; y < 95; y += 3.5) {
    for (let x = 2; x < 100; x += 3) {
      // Rough continent mask — a few elliptical regions
      const inNAmerica =
        ((x - 20) ** 2) / 13 ** 2 + ((y - 38) ** 2) / 16 ** 2 < 1;
      const inSAmerica =
        ((x - 32) ** 2) / 8 ** 2 + ((y - 68) ** 2) / 14 ** 2 < 1;
      const inEurope =
        ((x - 50) ** 2) / 7 ** 2 + ((y - 36) ** 2) / 8 ** 2 < 1;
      const inAfrica =
        ((x - 53) ** 2) / 9 ** 2 + ((y - 58) ** 2) / 14 ** 2 < 1;
      const inAsia =
        ((x - 73) ** 2) / 16 ** 2 + ((y - 42) ** 2) / 13 ** 2 < 1;
      const inOceania =
        ((x - 87) ** 2) / 7 ** 2 + ((y - 76) ** 2) / 7 ** 2 < 1;
      if (
        inNAmerica ||
        inSAmerica ||
        inEurope ||
        inAfrica ||
        inAsia ||
        inOceania
      ) {
        dots.push({ x, y });
      }
    }
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-base font-semibold text-foreground">
            Edge latency · global
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            p95 · last 5 min · 6 regions
          </div>
        </div>
        <div className="rounded-md border border-accent-green/30 bg-accent-green/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-green">
          ALL GREEN
        </div>
      </div>

      <div className="relative mt-5 aspect-[2/1] w-full overflow-hidden rounded-xl border border-border bg-background/60">
        <svg viewBox="0 0 100 50" className="size-full" preserveAspectRatio="xMidYMid meet">
          {/* continents as a field of dots */}
          {dots.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y / 2}
              r="0.35"
              fill="var(--muted-foreground)"
              fillOpacity="0.35"
            />
          ))}
          {/* region pins */}
          {regions.map((r) => (
            <g key={r.code}>
              <circle
                cx={r.x}
                cy={r.y / 2}
                r="2.5"
                fill="var(--accent-teal)"
                fillOpacity="0.18"
              >
                <animate
                  attributeName="r"
                  values="1.5;3.2;1.5"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={r.x} cy={r.y / 2} r="1" fill="var(--brand)" />
            </g>
          ))}
        </svg>
      </div>

      {/* region badges */}
      <ul className="mt-4 grid grid-cols-2 gap-1.5 md:grid-cols-3">
        {regions.map((r) => (
          <li
            key={r.code}
            className="flex items-center justify-between rounded-md border border-border bg-background/60 px-2.5 py-1.5"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
              <span className={`size-1.5 rounded-full ${toneClass[r.tone].dot}`} />
              {r.code}
            </span>
            <span className={`font-mono text-[10px] ${toneClass[r.tone].text}`}>
              {r.p95}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
