import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

// Pre-computed traces — model error decreasing over weeks
const baseline = "M 0,30 L 60,28 L 120,30 L 180,29 L 240,28 L 300,30 L 360,29";
const learned = "M 0,30 L 60,26 L 120,22 L 180,18 L 240,14 L 300,11 L 360,9";

/**
 * "Learn" mockup — model-error decay chart showing the system
 * improving as it learns the building's thermal behavior.
 */
export function LearningChart({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <AgentLabel tone="blue" loading>
          LEARNING · 6 WEEKS
        </AgentLabel>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          MODEL v4.2
        </span>
      </div>

      <div className="rounded-xl border border-border bg-background/60 p-4">
        <div className="mb-2 flex items-center justify-between text-[10px]">
          <span className="label-mono text-muted-foreground">
            MODEL ERROR · °C
          </span>
          <span className="font-mono text-accent-blue">↓ 72% vs baseline</span>
        </div>
        <svg viewBox="0 0 360 50" preserveAspectRatio="none" className="h-32 w-full">
          {[10, 20, 30, 40].map((y) => (
            <line key={y} x1="0" x2="360" y1={y} y2={y} stroke="var(--border)" strokeWidth="0.5" />
          ))}
          <path d={baseline} fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d={learned} fill="none" stroke="var(--accent-blue)" strokeWidth="2" />
          {/* dot at last point */}
          <circle cx="360" cy="9" r="3" fill="var(--accent-blue)" />
        </svg>
        <div className="mt-3 flex items-center gap-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-px w-4 border-t border-dashed border-muted-foreground" />
            baseline
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-px w-4 bg-accent-blue" />
            learned model
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { l: "MAPE", v: "0.4 °C" },
          { l: "DRIFT", v: "stable" },
          { l: "RETRAIN", v: "weekly" },
        ].map((m) => (
          <div key={m.l} className="rounded-md border border-border bg-surface py-1.5">
            <div className="font-mono text-xs text-foreground">{m.v}</div>
            <div className="mt-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
              {m.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
