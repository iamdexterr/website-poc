import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

/**
 * "Respond agent" mockup — incoming anomaly + AI-suggested remediation.
 * Maps to CallSine's "AI suggestion" panel.
 */
export function AnomalyResponse({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <div className="mb-3 flex items-center justify-between">
        <AgentLabel tone="blue" loading>
          ANALYZING
        </AgentLabel>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          T+0:00:11
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="label-mono text-[10px] text-muted-foreground">
            INCOMING · PUMP-A7
          </div>
          <div className="mt-1 rounded-md border border-accent-red/30 bg-accent-red/10 px-3 py-2 font-mono text-xs text-accent-red">
            ▲ vibration anomaly · 4.2σ
          </div>
        </div>

        <div>
          <div className="label-mono text-[10px] text-muted-foreground">
            AI SUGGESTION
          </div>
          <div className="mt-1 rounded-md border border-border bg-background/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
            Reduce <span className="text-foreground">pump-a7</span> RPM to
            <span className="text-foreground"> 1,400</span> and open a
            maintenance ticket. Forecast: bearing failure in
            <span className="text-accent-amber"> ~6h</span> if untreated.
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            className="rounded-md border border-accent-blue/30 bg-accent-blue/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-accent-blue hover:bg-accent-blue/20"
          >
            APPLY REMEDIATION
          </button>
          <button
            type="button"
            className="rounded-md border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
}
