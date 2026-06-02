import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

type Row = {
  asset: string;
  used: number; // 0-100
  idle: number;
  off: number;
};

const rows: Row[] = [
  { asset: "excavator-04", used: 62, idle: 18, off: 20 },
  { asset: "crane-12", used: 41, idle: 34, off: 25 },
  { asset: "forklift-07", used: 78, idle: 12, off: 10 },
  { asset: "loader-21", used: 33, idle: 22, off: 45 },
];

/**
 * "Utilize" mockup — stacked bar utilization breakdown across
 * a fleet of assets with active/idle/off splits.
 */
export function UtilizationBar({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <AgentLabel tone="green" loading>
          UTILIZATION · 7 DAYS
        </AgentLabel>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          FLEET · 4
        </span>
      </div>

      <div className="space-y-2 rounded-xl border border-border bg-background/60 p-4">
        {rows.map((r) => (
          <div key={r.asset} className="space-y-1">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-muted-foreground">{r.asset}</span>
              <span className="text-foreground">{r.used}% active</span>
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-surface">
              <div className="bg-accent-green" style={{ width: `${r.used}%` }} />
              <div className="bg-accent-amber/60" style={{ width: `${r.idle}%` }} />
              <div className="bg-muted-foreground/30" style={{ width: `${r.off}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span className="size-2 rounded-sm bg-accent-green" /> active
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span className="size-2 rounded-sm bg-accent-amber/60" /> idle
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span className="size-2 rounded-sm bg-muted-foreground/30" /> off
        </span>
      </div>
    </div>
  );
}
