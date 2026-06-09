import { cn } from "@/lib/utils";

const stops = [
  { x: 20,  label: "A" },
  { x: 80,  label: "B" },
  { x: 160, label: "C" },
  { x: 230, label: "D" },
  { x: 300, label: "E" },
];

export function RouteOptimizer({ className }: { className?: string }) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-purple">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-purple" />
          Route optimizer
        </span>
        <span className="rounded-full border border-accent-purple/25 bg-accent-purple/8 px-2.5 py-0.5 font-mono text-[10px] text-accent-purple">
          AI v3
        </span>
      </div>

      <div className="space-y-3 rounded-xl border border-border/50 bg-surface/20 p-4">
        {[
          { label: "Current", id: "R-12",  km: 187, color: "var(--muted-foreground)", dash: "4 3",   opacity: "0.5" },
          { label: "Optimized", id: "R-12*", km: 142, color: "var(--accent-green)",    dash: "none", opacity: "1"   },
        ].map((r) => (
          <div key={r.id} className="space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span style={{ color: r.color }}>{r.label} · {r.id}</span>
              <span style={{ color: r.color }}>{r.km} km · 14 stops</span>
            </div>
            <svg viewBox="0 0 320 24" className="h-6 w-full" aria-hidden>
              <line x1="20" y1="12" x2="300" y2="12"
                stroke={r.color} strokeWidth="1.5" strokeDasharray={r.dash} strokeOpacity={r.opacity} />
              {stops.map((s) => (
                <g key={s.label}>
                  <circle cx={s.x} cy="12" r="4" fill="var(--background)" stroke={r.color} strokeWidth="1.5" strokeOpacity={r.opacity} />
                  <text x={s.x} y="14" textAnchor="middle" fontSize="5.5" fill={r.color} fontFamily="monospace" fillOpacity={r.opacity}>{s.label}</text>
                </g>
              ))}
            </svg>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-accent-green/20 bg-accent-green/6 px-3 py-2.5">
        <span className="font-mono text-[10px] text-muted-foreground">Weekly savings</span>
        <span className="font-mono text-sm font-semibold text-accent-green">−45 km · −22% fuel</span>
      </div>
    </div>
  );
}
