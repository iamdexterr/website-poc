import { cn } from "@/lib/utils";

const baseline = "M 0,30 L 60,28 L 120,30 L 180,29 L 240,28 L 300,30 L 360,29";
const learned  = "M 0,30 L 60,26 L 120,22 L 180,18 L 240,14 L 300,11 L 360,9";

export function LearningChart({ className }: { className?: string }) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-blue">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-blue" />
          Learning · 6 weeks
        </span>
        <span className="rounded-full border border-accent-blue/25 bg-accent-blue/8 px-2.5 py-0.5 font-mono text-[10px] text-accent-blue">
          Model v4.2
        </span>
      </div>

      <div className="rounded-xl border border-border/50 bg-surface/20 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Model error · °C</span>
          <span className="font-mono text-sm font-semibold text-accent-blue">↓ 72%</span>
        </div>
        <svg viewBox="0 0 360 44" preserveAspectRatio="none" className="h-28 w-full" aria-hidden>
          <defs>
            <linearGradient id="learnGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[11, 22, 33].map((y) => (
            <line key={y} x1="0" x2="360" y1={y} y2={y} stroke="var(--border)" strokeWidth="0.5" />
          ))}
          <path d={`${learned} L 360,44 L 0,44 Z`} fill="url(#learnGrad)" />
          <path d={baseline} fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="4 3" strokeOpacity="0.5" />
          <path d={learned} fill="none" stroke="var(--accent-blue)" strokeWidth="2" />
          <circle cx="360" cy="9" r="3.5" fill="var(--accent-blue)" />
        </svg>
        <div className="mt-3 flex items-center gap-5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-px w-5 border-t border-dashed border-muted-foreground/60" />baseline
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-5 rounded bg-accent-blue" />learned
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[{ l: "MAPE", v: "0.4 °C" }, { l: "DRIFT", v: "stable" }, { l: "RETRAIN", v: "weekly" }].map((m) => (
          <div key={m.l} className="rounded-xl border border-border/50 bg-surface/30 py-2.5 text-center">
            <div className="font-mono text-sm text-foreground">{m.v}</div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{m.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
