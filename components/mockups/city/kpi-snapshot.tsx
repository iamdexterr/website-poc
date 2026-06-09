import { cn } from "@/lib/utils";

const kpis = [
  { l: "Response time",    v: "4.2 min",  delta: "↓ 38%", pos: true  },
  { l: "Incidents solved", v: "127/132",  delta: "96%",   pos: true  },
  { l: "Citizen reports",  v: "412",      delta: "↑ 12%", pos: false },
  { l: "False positives",  v: "3",        delta: "↓ 60%", pos: true  },
];

const sparkPoints = [
  [0, 22], [12, 20], [24, 21], [36, 17], [48, 19],
  [60, 13], [72, 15], [84, 9],  [96, 10],
] as [number, number][];

const sparkLine = sparkPoints.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x},${y}`).join(" ");
const sparkFill = `${sparkLine} L 96,30 L 0,30 Z`;

export function KpiSnapshot({ className }: { className?: string }) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-blue">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-blue" />
          REPORT · COUNCIL Q3
        </span>
        <span className="rounded-full border border-border/40 bg-surface/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          AUTO · WEEKLY
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {kpis.map((k) => (
          <div
            key={k.l}
            className="rounded-xl border border-border/50 bg-surface/30 px-3 py-2.5"
          >
            <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{k.l}</div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <span className="font-mono text-base tabular-nums text-foreground">{k.v}</span>
              <span className={`font-mono text-[10px] ${k.pos ? "text-accent-green" : "text-accent-blue"}`}>
                {k.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-border/50 bg-surface/20 px-3 pb-3 pt-2.5">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            INCIDENT TREND · 12 WK
          </span>
          <span className="font-mono text-[10px] text-accent-green">↓ 24%</span>
        </div>
        <svg viewBox="0 0 96 30" preserveAspectRatio="none" className="h-12 w-full" aria-hidden>
          <defs>
            <linearGradient id="kpiSparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={sparkFill} fill="url(#kpiSparkGrad)" />
          <path d={sparkLine} fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={sparkPoints[sparkPoints.length - 1][0]} cy={sparkPoints[sparkPoints.length - 1][1]} r="2.5" fill="var(--accent-blue)" />
        </svg>
      </div>
    </div>
  );
}
