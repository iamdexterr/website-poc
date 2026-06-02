import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

const kpis = [
  { l: "Response time", v: "4.2 min", delta: "↓ 38%", tone: "green" as const },
  { l: "Incidents resolved", v: "127 / 132", delta: "96%", tone: "green" as const },
  { l: "Citizen reports", v: "412", delta: "↑ 12%", tone: "blue" as const },
  { l: "False positives", v: "3", delta: "↓ 60%", tone: "green" as const },
];

// Pre-computed sparkline path
const sparkPath =
  "M 0,18 L 12,16 L 24,17 L 36,12 L 48,14 L 60,9 L 72,11 L 84,6 L 96,8";

/**
 * "Report" mockup — KPI tiles with delta + a council-ready
 * sparkline summary at the bottom.
 */
export function KpiSnapshot({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <AgentLabel tone="blue" loading>
          REPORTING · COUNCIL Q3
        </AgentLabel>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          AUTO · WEEKLY
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {kpis.map((k) => (
          <div
            key={k.l}
            className="rounded-xl border border-border bg-background/60 p-3"
          >
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {k.l}
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="font-mono text-lg tabular-nums text-foreground">
                {k.v}
              </span>
              <span
                className={`font-mono text-[10px] ${
                  k.tone === "green"
                    ? "text-accent-green"
                    : "text-accent-blue"
                }`}
              >
                {k.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-background/60 p-3">
        <div className="mb-2 flex items-center justify-between text-[10px]">
          <span className="label-mono text-muted-foreground">
            INCIDENT TREND · 12 WK
          </span>
          <span className="font-mono text-accent-blue">↓ 24%</span>
        </div>
        <svg viewBox="0 0 96 24" preserveAspectRatio="none" className="h-10 w-full">
          <path d={sparkPath} fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" />
          <circle cx="96" cy="8" r="2" fill="var(--accent-blue)" />
        </svg>
      </div>
    </div>
  );
}
