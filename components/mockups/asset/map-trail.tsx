import { cn } from "@/lib/utils";

const trailPath = "M 30,160 L 60,150 L 95,140 L 130,120 L 165,100 L 195,80 L 220,70 L 250,60 L 280,55";
const stops = [
  { x: 30,  y: 160, label: "DEPOT"  },
  { x: 130, y: 120, label: "STOP 1" },
  { x: 220, y: 70,  label: "STOP 2" },
];

export function MapTrail({ className }: { className?: string }) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-teal">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-teal" />
          Truck-217 · Live
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">GPS · 1s</span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border/50">
        <svg viewBox="0 0 320 200" className="h-44 w-full" aria-hidden>
          <defs>
            <pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border)" strokeWidth="0.4" />
            </pattern>
            <linearGradient id="trailGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent-teal)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--accent-teal)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect width="320" height="200" fill="var(--background)" />
          <rect width="320" height="200" fill="url(#mapgrid)" />
          <path d="M 0 60 L 320 60"   stroke="var(--border-strong)" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M 0 140 L 320 140" stroke="var(--border-strong)" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M 80 0 L 80 200"   stroke="var(--border-strong)" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M 200 0 L 200 200" stroke="var(--border-strong)" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d={trailPath} fill="none" stroke="url(#trailGrad)" strokeWidth="2.5" strokeLinecap="round" />
          {stops.map((s) => (
            <g key={s.label}>
              <circle cx={s.x} cy={s.y} r="5" fill="var(--surface)" stroke="var(--accent-teal)" strokeWidth="1.5" />
              <text x={s.x + 7} y={s.y - 6} fontSize="6" fill="var(--muted-foreground)" fontFamily="monospace">{s.label}</text>
            </g>
          ))}
          <circle cx="280" cy="55" r="12" fill="var(--brand)" opacity="0.15">
            <animate attributeName="r" values="5;14;5" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="55" r="4" fill="var(--brand)" />
          <text x="286" y="48" fontSize="6.5" fill="var(--accent-teal)" fontFamily="monospace">ETA 14:32</text>
        </svg>
        <div className="absolute bottom-2 left-3 font-mono text-[9px] text-muted-foreground/60">
          17.385° N · 78.486° E
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[{ l: "Speed", v: "62 km/h" }, { l: "Fuel", v: "68%" }, { l: "Cargo", v: "−18 °C" }].map((m) => (
          <div key={m.l} className="rounded-xl border border-border/50 bg-surface/30 py-2.5 text-center">
            <div className="font-mono text-sm text-foreground">{m.v}</div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{m.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
