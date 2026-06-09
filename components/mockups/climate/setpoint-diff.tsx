import { cn } from "@/lib/utils";

type Row = { param: string; before: string; after: string; delta: string; tone?: "green" | "amber" | "muted" };

const rows: Row[] = [
  { param: "temp_setpoint", before: "2.0 °C", after: "1.5 °C", delta: "−0.5", tone: "amber" },
  { param: "fan_speed",     before: "60 %",   after: "75 %",   delta: "+15",  tone: "muted" },
  { param: "comp_duty",     before: "70 %",   after: "85 %",   delta: "+15",  tone: "muted" },
  { param: "defrost_int",   before: "6 h",    after: "8 h",    delta: "+2",   tone: "green" },
];

export function SetpointDiff({ className }: { className?: string }) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-purple">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-purple" />
          AI Proposal
        </span>
        <span className="rounded-full border border-accent-purple/25 bg-accent-purple/8 px-2.5 py-0.5 font-mono text-[10px] text-accent-purple">
          94% confidence
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/50">
        <div className="grid grid-cols-[1.6fr_1fr_1fr_0.7fr] border-b border-border/50 bg-surface/60 px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          <span>Param</span><span>Current</span><span>Proposed</span><span className="text-right">Δ</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.param}
            className={cn(
              "grid grid-cols-[1.6fr_1fr_1fr_0.7fr] items-center px-3 py-2.5 font-mono text-xs",
              i !== rows.length - 1 && "border-b border-border/30",
              r.tone === "amber" && "bg-accent-amber/4",
            )}
          >
            <span className="text-muted-foreground">{r.param}</span>
            <span className="text-foreground/60 line-through">{r.before}</span>
            <span className="text-foreground">{r.after}</span>
            <span className={cn("text-right", r.tone === "green" ? "text-accent-green" : r.tone === "amber" ? "text-accent-amber" : "text-muted-foreground")}>
              {r.delta}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-accent-green/20 bg-accent-green/6 px-3 py-2.5">
        <span className="font-mono text-[10px] text-muted-foreground">Forecast energy saving</span>
        <span className="font-mono text-sm font-semibold text-accent-green">↓ 12% / 24h</span>
      </div>
    </div>
  );
}
