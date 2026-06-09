import { cn } from "@/lib/utils";

type Option = {
  label: string;
  speed: number;
  cost: number;
  risk: number;
  picked?: boolean;
};

const options: Option[] = [
  { label: "Reroute traffic via NH-7", speed: 92, cost: 88, risk: 90, picked: true },
  { label: "Dispatch 2 patrol units",  speed: 68, cost: 55, risk: 85 },
  { label: "Trigger public alert",      speed: 95, cost: 90, risk: 60 },
  { label: "Hold and observe",          speed: 10, cost: 95, risk: 22 },
];

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-border/40">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className="w-6 font-mono text-[9px] tabular-nums text-muted-foreground">{value}</span>
    </div>
  );
}

export function DecisionMatrix({ className }: { className?: string }) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-purple">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-purple" />
          DECIDE · 4 OPTIONS
        </span>
        <span className="rounded-full border border-accent-purple/30 bg-accent-purple/10 px-2 py-0.5 font-mono text-[10px] text-accent-purple">
          POLICY v2
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60">
        <div className="grid grid-cols-[1fr_auto] border-b border-border/40 bg-surface/40 px-3 py-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">OPTION</span>
          <div className="grid w-36 grid-cols-3 gap-2">
            {["SPEED", "COST", "RISK"].map((h) => (
              <span key={h} className="text-center font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{h}</span>
            ))}
          </div>
        </div>

        <ul className="divide-y divide-border/30">
          {options.map((o) => (
            <li
              key={o.label}
              className={`grid grid-cols-[1fr_auto] items-center px-3 py-2.5 ${
                o.picked ? "bg-accent-purple/8" : ""
              }`}
            >
              <span
                className={`flex items-center gap-1.5 truncate font-mono text-[10px] ${
                  o.picked ? "text-accent-purple" : "text-foreground/70"
                }`}
              >
                {o.picked && <span className="text-accent-purple">◆</span>}
                <span className="truncate">{o.label}</span>
              </span>
              <div className="grid w-36 grid-cols-3 gap-2">
                <ScoreBar value={o.speed} color="var(--accent-teal)" />
                <ScoreBar value={o.cost}  color="var(--accent-blue)" />
                <ScoreBar
                  value={o.risk}
                  color={o.risk > 70 ? "var(--accent-green)" : o.risk > 40 ? "var(--accent-amber)" : "var(--accent-red)"}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border/50 bg-surface/30 px-3 py-2.5 text-[10px] leading-relaxed text-muted-foreground">
        Picked <span className="text-accent-purple">reroute</span> — fastest path to clear
        congestion, lowest civic disruption per city policy.
      </div>
    </div>
  );
}
