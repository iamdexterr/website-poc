import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

function ActionCard({
  icon,
  label,
  detail,
}: {
  icon: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="w-44 rounded-xl border border-border bg-surface p-3">
      <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-muted-foreground">
        <span className="font-mono">{icon}</span>
        {label}
      </div>
      <div className="font-mono text-[10px] leading-relaxed text-foreground">
        {detail}
      </div>
    </div>
  );
}

/**
 * "Automate agent" mockup — trigger node branching into two parallel
 * actions (SMS alert + actuator control). Maps to CallSine's SequenceTree.
 */
export function WorkflowTree({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col items-center gap-4", className)}
    >
      <div className="rounded-lg border border-accent-amber/30 bg-accent-amber/10 px-3 py-2 text-center">
        <div className="label-mono text-accent-amber">◬ TRIGGER · IF</div>
        <div className="mt-1 font-mono text-[11px] text-foreground">
          temp &gt; 2.0 °C
          <span className="text-muted-foreground"> FOR </span>
          5min
        </div>
      </div>

      {/* connector lines */}
      <div className="relative h-6 w-56">
        <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-border" />
        <div className="absolute left-12 top-3 h-px w-[calc(50%-3rem)] bg-border" />
        <div className="absolute right-12 top-3 h-px w-[calc(50%-3rem)] bg-border" />
        <div className="absolute left-12 top-3 h-3 w-px bg-border" />
        <div className="absolute right-12 top-3 h-3 w-px bg-border" />
      </div>

      <div className="flex gap-3">
        <ActionCard
          icon="✉"
          label="SMS · SLACK"
          detail="Page on-call · ack required"
        />
        <ActionCard
          icon="⚙"
          label="ACTUATOR"
          detail="chiller-3 setpoint = 1.5 °C"
        />
      </div>

      <AgentLabel tone="green" loading>
        AUTOMATION ARMED
      </AgentLabel>
    </div>
  );
}
