import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

const dispatches = [
  { unit: "PATROL-07", dest: "JNK-03 · Madhapur", eta: "4 min", state: "enroute" },
  { unit: "TRAFFIC-12", dest: "NH-7 · Gachibowli", eta: "2 min", state: "enroute" },
  { unit: "MAINT-03", dest: "SUB-04 · power dip", eta: "11 min", state: "queued" },
];

/**
 * "Dispatch" mockup — field crew assignment list with units,
 * destinations, ETAs and ack states.
 */
export function CrewDispatch({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <AgentLabel tone="green" loading>
          DISPATCHING · 3 UNITS
        </AgentLabel>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          ACK 0.9s
        </span>
      </div>

      <ul className="space-y-1.5">
        {dispatches.map((d) => (
          <li
            key={d.unit}
            className="rounded-xl border border-border bg-background/60 p-3"
          >
            <div className="mb-1.5 flex items-center justify-between font-mono text-[10px]">
              <span className="flex items-center gap-2 text-foreground">
                <span
                  className={`size-1.5 rounded-full ${
                    d.state === "enroute"
                      ? "animate-pulse-dot bg-accent-green"
                      : "bg-muted-foreground"
                  }`}
                />
                {d.unit}
              </span>
              <span
                className={
                  d.state === "enroute"
                    ? "text-accent-green"
                    : "text-muted-foreground"
                }
              >
                {d.state}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">→ {d.dest}</span>
              <span className="font-mono text-foreground">ETA {d.eta}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
