import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

type Row = {
  param: string;
  before: string;
  after: string;
  delta: string;
  tone?: "green" | "amber" | "muted";
};

const rows: Row[] = [
  { param: "temp_setpoint", before: "2.0 °C", after: "1.5 °C", delta: "−0.5", tone: "amber" },
  { param: "fan_speed", before: "60 %", after: "75 %", delta: "+15", tone: "muted" },
  { param: "compressor_duty", before: "70 %", after: "85 %", delta: "+15", tone: "muted" },
  { param: "defrost_interval", before: "6 h", after: "8 h", delta: "+2", tone: "green" },
];

/**
 * "Compare" mockup — diff between current setpoints and proposed
 * AI-recommended setpoints, with confidence and energy delta.
 */
export function SetpointDiff({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <AgentLabel tone="purple" loading>
          COMPARING
        </AgentLabel>
        <span className="rounded-md border border-accent-purple/30 bg-accent-purple/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-purple">
          AI CONFIDENCE · 94%
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background/60">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_0.7fr] border-b border-border bg-surface px-3 py-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          <span>PARAM</span>
          <span>CURRENT</span>
          <span>PROPOSED</span>
          <span className="text-right">Δ</span>
        </div>
        <ul className="divide-y divide-border">
          {rows.map((r) => (
            <li
              key={r.param}
              className="grid grid-cols-[1.5fr_1fr_1fr_0.7fr] items-center px-3 py-2 font-mono text-xs"
            >
              <span className="text-muted-foreground">{r.param}</span>
              <span className="text-foreground">{r.before}</span>
              <span className="text-foreground">{r.after}</span>
              <span
                className={`text-right ${
                  r.tone === "green"
                    ? "text-accent-green"
                    : r.tone === "amber"
                    ? "text-accent-amber"
                    : "text-muted-foreground"
                }`}
              >
                {r.delta}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between rounded-md border border-accent-green/30 bg-accent-green/10 px-3 py-2 text-xs">
        <span className="font-mono text-muted-foreground">FORECAST ENERGY</span>
        <span className="font-mono text-accent-green">↓ 12% / 24h</span>
      </div>
    </div>
  );
}
