import { cn } from "@/lib/utils";

const dispatches = [
  { unit: "PATROL-07",  dest: "JNK-03 · Madhapur",  eta: "4 min",  state: "enroute",  x: 220, y: 80  },
  { unit: "TRAFFIC-12", dest: "NH-7 · Gachibowli",   eta: "2 min",  state: "enroute",  x: 260, y: 130 },
  { unit: "MAINT-03",   dest: "SUB-04 · power dip",  eta: "11 min", state: "queued",   x: 140, y: 60  },
];

const nodes = [
  { id: "JNK-03", x: 220, y: 80,  alert: true  },
  { id: "NH-7",   x: 260, y: 130, alert: false },
  { id: "SUB-04", x: 140, y: 60,  alert: false },
  { id: "HQ",     x: 60,  y: 120, alert: false },
];

export function CrewDispatch({ className }: { className?: string }) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-green">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-green" />
          DISPATCH · {dispatches.length} UNITS
        </span>
        <span className="rounded-full border border-border/40 bg-surface/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          ACK 0.9s
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/50">
        <svg viewBox="0 0 320 180" className="h-36 w-full" aria-hidden>
          <defs>
            <pattern id="dispatchGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border)" strokeWidth="0.3" />
            </pattern>
            <linearGradient id="dispatchTrail1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="var(--background)" />
          <rect width="320" height="180" fill="url(#dispatchGrid)" />

          {dispatches.map((d, i) =>
            d.state === "enroute" ? (
              <line
                key={i}
                x1="60" y1="120" x2={d.x} y2={d.y}
                stroke="url(#dispatchTrail1)" strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            ) : (
              <line
                key={i}
                x1="60" y1="120" x2={d.x} y2={d.y}
                stroke="var(--muted-foreground)" strokeWidth="1"
                strokeDasharray="3 4" strokeOpacity="0.35"
              />
            )
          )}

          {nodes.map((n) => (
            <g key={n.id}>
              {n.alert && (
                <circle cx={n.x} cy={n.y} r="14" fill="var(--accent-red)" opacity="0.08">
                  <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.12;0;0.12" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={n.x} cy={n.y} r="5"
                fill="var(--surface)"
                stroke={n.id === "HQ" ? "var(--brand)" : n.alert ? "var(--accent-red)" : "var(--accent-green)"}
                strokeWidth="1.5"
              />
              <text x={n.x + 8} y={n.y - 5} fontSize="6" fill="var(--muted-foreground)" fontFamily="monospace">
                {n.id}
              </text>
            </g>
          ))}

          <text x="63" y="117" fontSize="6" fill="var(--brand)" fontFamily="monospace" fontWeight="bold">HQ</text>
        </svg>
      </div>

      <ul className="space-y-1.5">
        {dispatches.map((d) => (
          <li
            key={d.unit}
            className="flex items-center justify-between rounded-xl border border-border/50 bg-surface/20 px-3 py-2"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] text-foreground">
              <span
                className={`size-1.5 rounded-full ${
                  d.state === "enroute" ? "animate-pulse bg-accent-green" : "bg-muted-foreground/40"
                }`}
              />
              {d.unit}
              <span className="text-muted-foreground">→ {d.dest}</span>
            </span>
            <span
              className={`font-mono text-[10px] ${
                d.state === "enroute" ? "text-accent-green" : "text-muted-foreground"
              }`}
            >
              ETA {d.eta}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
