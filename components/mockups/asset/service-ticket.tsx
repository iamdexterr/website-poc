import { cn } from "@/lib/utils";

const fields = [
  { k: "Asset",    v: "excavator-04",         tone: "default" as const },
  { k: "Signal",  v: "hydraulic pressure ▼",  tone: "default" as const },
  { k: "Severity", v: "P2 · High",            tone: "amber"   as const },
  { k: "SLA",     v: "12h remaining",          tone: "default" as const },
];

export function ServiceTicket({ className }: { className?: string }) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-blue">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-blue" />
          Ticket created
        </span>
        <span className="rounded-full border border-accent-amber/25 bg-accent-amber/8 px-2.5 py-0.5 font-mono text-[10px] text-accent-amber">
          TKT-8412
        </span>
      </div>

      <div className="rounded-xl border border-border/50 bg-surface/20 p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Predictive maintenance</span>
          <span className="rounded-md border border-accent-amber/30 bg-accent-amber/10 px-2 py-0.5 font-mono text-[10px] text-accent-amber">P2</span>
        </div>
        <dl className="space-y-2.5">
          {fields.map((f) => (
            <div key={f.k} className="flex items-center justify-between">
              <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{f.k}</dt>
              <dd className={cn("font-mono text-xs", f.tone === "amber" ? "text-accent-amber" : "text-foreground")}>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-border/50 bg-surface/30 px-3 py-2.5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Routed to</div>
          <div className="mt-1 font-mono text-xs text-foreground">ops-blr · J. Kumar</div>
        </div>
        <div className="rounded-xl border border-border/50 bg-surface/30 px-3 py-2.5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Source</div>
          <div className="mt-1 font-mono text-xs text-accent-blue">forecast · 4h ahead</div>
        </div>
      </div>
    </div>
  );
}
