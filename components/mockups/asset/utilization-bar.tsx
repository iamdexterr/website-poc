import { cn } from "@/lib/utils";

const rows = [
  { asset: "excavator-04", used: 62, idle: 18, off: 20 },
  { asset: "crane-12",     used: 41, idle: 34, off: 25 },
  { asset: "forklift-07",  used: 78, idle: 12, off: 10 },
  { asset: "loader-21",    used: 33, idle: 22, off: 45 },
];

export function UtilizationBar({ className }: { className?: string }) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-green">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-green" />
          Utilization · 7 days
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">Fleet · 4</span>
      </div>

      <div className="space-y-3 rounded-xl border border-border/50 bg-surface/20 p-4">
        {rows.map((r) => (
          <div key={r.asset} className="space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-muted-foreground">{r.asset}</span>
              <span className="text-accent-green">{r.used}% active</span>
            </div>
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-border/40">
              <div className="bg-accent-green transition-all duration-700" style={{ width: `${r.used}%` }} />
              <div className="bg-accent-amber/50 transition-all duration-700" style={{ width: `${r.idle}%` }} />
              <div className="bg-muted-foreground/20 transition-all duration-700" style={{ width: `${r.off}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm bg-accent-green" /> active</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm bg-accent-amber/50" /> idle</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm bg-muted-foreground/20" /> off</span>
      </div>
    </div>
  );
}
