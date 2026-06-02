import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  speed: string;
  cost: string;
  risk: string;
  picked?: boolean;
};

const options: Option[] = [
  { label: "Reroute traffic via NH-7", speed: "fast", cost: "low", risk: "low", picked: true },
  { label: "Dispatch 2 patrol units", speed: "med", cost: "med", risk: "low" },
  { label: "Trigger public alert", speed: "fast", cost: "low", risk: "med" },
  { label: "Hold and observe", speed: "—", cost: "—", risk: "high" },
];

/**
 * "Decide" mockup — AI-generated option matrix with the chosen
 * row highlighted and rationale at the bottom.
 */
export function DecisionMatrix({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <AgentLabel tone="purple" loading>
          DECIDING · 4 OPTIONS
        </AgentLabel>
        <span className="rounded-md border border-accent-purple/30 bg-accent-purple/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-purple">
          POLICY v2
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background/60">
        <div className="grid grid-cols-[1.8fr_0.6fr_0.6fr_0.6fr] border-b border-border bg-surface px-3 py-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          <span>OPTION</span>
          <span>SPEED</span>
          <span>COST</span>
          <span>RISK</span>
        </div>
        <ul className="divide-y divide-border">
          {options.map((o) => (
            <li
              key={o.label}
              className={`grid grid-cols-[1.8fr_0.6fr_0.6fr_0.6fr] items-center px-3 py-2 font-mono text-xs ${
                o.picked ? "bg-accent-purple/10" : ""
              }`}
            >
              <span className={`flex items-center gap-2 ${o.picked ? "text-accent-purple" : "text-foreground"}`}>
                {o.picked && <span>◆</span>}
                <span className="truncate">{o.label}</span>
              </span>
              <span className="text-muted-foreground">{o.speed}</span>
              <span className="text-muted-foreground">{o.cost}</span>
              <span
                className={
                  o.risk === "high"
                    ? "text-accent-red"
                    : o.risk === "med"
                    ? "text-accent-amber"
                    : "text-accent-green"
                }
              >
                {o.risk}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-md border border-border bg-surface px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
        Picked <span className="text-accent-purple">reroute</span> — fastest
        path to clear congestion, lowest civic disruption per the city policy.
      </div>
    </div>
  );
}
