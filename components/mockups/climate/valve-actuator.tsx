import { cn } from "@/lib/utils";

const actions = [
  { device: "valve-a-12",    action: "OPEN 40%",  state: "done",   t: "T+0.4s" },
  { device: "fan-b-3",       action: "SPEED 75%", state: "done",   t: "T+0.6s" },
  { device: "compressor-1",  action: "DUTY 85%",  state: "live",   t: "T+1.2s" },
  { device: "damper-c-7",    action: "TILT 15°",  state: "queued", t: "T+2.0s" },
];

const stateColor: Record<string, string> = {
  done:   "bg-accent-green",
  live:   "animate-pulse bg-accent-teal",
  queued: "bg-muted-foreground/40",
};
const actionColor: Record<string, string> = {
  done:   "text-accent-green",
  live:   "text-accent-teal",
  queued: "text-muted-foreground",
};

export function ValveActuator({ className }: { className?: string }) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-green">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-green" />
          Actuating · 4 devices
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">ack 1.8s</span>
      </div>

      <ul className="space-y-2">
        {actions.map((a) => (
          <li key={a.device} className="flex items-center justify-between rounded-xl border border-border/50 bg-surface/30 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className={cn("size-2 rounded-full", stateColor[a.state])} />
              <div>
                <div className="font-mono text-xs text-foreground">{a.device}</div>
                <div className="font-mono text-[9px] text-muted-foreground">{a.t}</div>
              </div>
            </div>
            <span className={cn("font-mono text-xs font-semibold", actionColor[a.state])}>
              {a.action}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-surface/20 px-3 py-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/60">
          <div className="h-full w-1/2 rounded-full bg-accent-teal" style={{ width: "50%" }} />
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">2 / 4 complete</span>
      </div>
    </div>
  );
}
