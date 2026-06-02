import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

const actions = [
  { device: "valve-a-12", action: "OPEN 40%", state: "done", t: "T+0.4s" },
  { device: "fan-b-3", action: "SPEED 75%", state: "done", t: "T+0.6s" },
  { device: "compressor-1", action: "DUTY 85%", state: "live", t: "T+1.2s" },
  { device: "damper-c-7", action: "TILT 15°", state: "queued", t: "T+2.0s" },
];

/**
 * "Actuate" mockup — sequence of actuator commands streaming
 * down with ack states (done / live / queued).
 */
export function ValveActuator({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <AgentLabel tone="green" loading>
          ACTUATING · 4 DEVICES
        </AgentLabel>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          ACK 1.8s
        </span>
      </div>

      <ul className="space-y-1.5 font-mono text-xs">
        {actions.map((a) => (
          <li
            key={a.device}
            className="flex items-center justify-between rounded-md border border-border bg-background/60 px-3 py-2.5"
          >
            <span className="flex items-center gap-2">
              <span
                className={`size-1.5 rounded-full ${
                  a.state === "done"
                    ? "bg-accent-green"
                    : a.state === "live"
                    ? "animate-pulse-dot bg-accent-teal"
                    : "bg-muted-foreground"
                }`}
              />
              <span className="text-muted-foreground">{a.t}</span>
              <span className="text-foreground">{a.device}</span>
            </span>
            <span
              className={
                a.state === "done"
                  ? "text-accent-green"
                  : a.state === "live"
                  ? "text-accent-teal"
                  : "text-muted-foreground"
              }
            >
              {a.action}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
