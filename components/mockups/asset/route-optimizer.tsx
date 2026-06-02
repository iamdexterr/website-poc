import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

const routes = [
  { id: "R-12", stops: 14, km: 187, label: "current", tone: "muted" as const },
  { id: "R-12*", stops: 14, km: 142, label: "optimized", tone: "green" as const },
];

const stops = [
  { x: 20, label: "A" },
  { x: 80, label: "B" },
  { x: 160, label: "C" },
  { x: 230, label: "D" },
  { x: 300, label: "E" },
];

/**
 * "Route" mockup — current vs optimized route comparison
 * with KM/stop counts and savings callout.
 */
export function RouteOptimizer({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <AgentLabel tone="purple" loading>
          OPTIMIZING · FLEET
        </AgentLabel>
        <span className="rounded-md border border-accent-purple/30 bg-accent-purple/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-purple">
          AI v3
        </span>
      </div>

      <div className="space-y-2 rounded-xl border border-border bg-background/60 p-4">
        {routes.map((r) => (
          <div key={r.id} className="space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
              <span className={r.tone === "green" ? "text-accent-green" : "text-muted-foreground"}>
                {r.label} · {r.id}
              </span>
              <span className={r.tone === "green" ? "text-accent-green" : "text-foreground"}>
                {r.km} km · {r.stops} stops
              </span>
            </div>
            <svg viewBox="0 0 320 22" className="h-5 w-full">
              <line
                x1="20"
                y1="11"
                x2="300"
                y2="11"
                stroke={r.tone === "green" ? "var(--accent-green)" : "var(--border-strong)"}
                strokeWidth="1.5"
                strokeDasharray={r.tone === "green" ? "0" : "3 3"}
              />
              {stops.map((s) => (
                <g key={s.label}>
                  <circle
                    cx={s.x}
                    cy="11"
                    r="3.5"
                    fill="var(--surface)"
                    stroke={r.tone === "green" ? "var(--accent-green)" : "var(--border-strong)"}
                    strokeWidth="1.5"
                  />
                  <text
                    x={s.x}
                    y="13"
                    textAnchor="middle"
                    fontSize="5"
                    fill="var(--foreground)"
                    fontFamily="monospace"
                  >
                    {s.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-md border border-accent-green/30 bg-accent-green/10 px-3 py-2 text-xs">
        <span className="font-mono text-muted-foreground">SAVINGS / WEEK</span>
        <span className="font-mono text-accent-green">−45 km · −22% fuel</span>
      </div>
    </div>
  );
}
