import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

const fields = [
  { k: "ASSET", v: "excavator-04" },
  { k: "SIGNAL", v: "hydraulic pressure ▼" },
  { k: "SEVERITY", v: "P2", tone: "amber" as const },
  { k: "SLA", v: "12h" },
];

/**
 * "Maintain" mockup — auto-created service ticket with the
 * signal that triggered it and routing destination.
 */
export function ServiceTicket({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <AgentLabel tone="blue" loading>
          TICKET CREATED · TKT-8412
        </AgentLabel>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          T+11s
        </span>
      </div>

      <div className="rounded-xl border border-border bg-background/60 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            Predictive maintenance
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            #8412
          </span>
        </div>
        <dl className="space-y-2">
          {fields.map((f) => (
            <div key={f.k} className="grid grid-cols-[100px_1fr] items-center">
              <dt className="label-mono text-[9px] text-muted-foreground">
                {f.k}
              </dt>
              <dd
                className={`font-mono text-xs ${
                  f.tone === "amber" ? "text-accent-amber" : "text-foreground"
                }`}
              >
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border border-border bg-surface px-3 py-2">
          <div className="label-mono text-[9px] text-muted-foreground">ROUTED TO</div>
          <div className="mt-1 font-mono text-xs text-foreground">
            ops-blr · J. Kumar
          </div>
        </div>
        <div className="rounded-md border border-border bg-surface px-3 py-2">
          <div className="label-mono text-[9px] text-muted-foreground">SOURCE</div>
          <div className="mt-1 font-mono text-xs text-accent-blue">
            forecast · 4h ahead
          </div>
        </div>
      </div>
    </div>
  );
}
