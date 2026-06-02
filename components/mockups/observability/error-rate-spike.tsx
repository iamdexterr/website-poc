import { cn } from "@/lib/utils";

// Pre-computed paths — flat blue baseline, red spike in the middle
const baselinePath =
  "M 0,108 L 30,108 L 60,106 L 90,104 L 120,108 L 150,108 L 180,108 L 210,108 L 240,108 L 270,108 L 300,108 L 330,108 L 360,108";
const spikePath =
  "M 150,108 L 165,90 L 180,82 L 195,72 L 210,38 L 225,30 L 240,36 L 255,38 L 270,80 L 285,106 L 300,108";

/**
 * "/api/auth error rate increased to 42%" — flat blue baseline with
 * a red spike in the middle, framed by dashed window markers and a
 * faint red wash. Mirrors Vercel's 5xx incident card.
 */
export function ErrorRateSpike({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="rounded-md border border-accent-red/40 px-2 py-0.5 font-mono text-xs font-medium text-accent-red">
          ERR
        </span>
        <p className="text-base font-semibold leading-tight text-foreground">
          <span className="font-mono text-accent-red">pump-a7</span>{" "}
          <span className="text-muted-foreground">vibration anomaly rose to</span>{" "}
          <span className="text-foreground">42%</span>
        </p>
      </div>

      <div className="relative mt-5 h-32">
        <div className="absolute inset-y-0 left-0 flex w-8 flex-col justify-between font-mono text-[10px] text-muted-foreground">
          <span>40%</span>
          <span>20%</span>
          <span>0</span>
        </div>
        <div className="absolute inset-y-0 left-8 right-0">
          <svg viewBox="0 0 360 120" preserveAspectRatio="none" className="size-full">
            {/* gridlines */}
            {[10, 70, 108].map((y) => (
              <line
                key={y}
                x1="0"
                x2="360"
                y1={y}
                y2={y}
                stroke="var(--border)"
                strokeWidth="0.5"
              />
            ))}
            {/* incident window wash */}
            <rect
              x="150"
              y="0"
              width="150"
              height="108"
              fill="var(--accent-red)"
              fillOpacity="0.06"
            />
            {/* window edges */}
            <line
              x1="150"
              x2="150"
              y1="0"
              y2="108"
              stroke="var(--accent-red)"
              strokeOpacity="0.5"
              strokeDasharray="2 3"
            />
            <line
              x1="300"
              x2="300"
              y1="0"
              y2="108"
              stroke="var(--accent-red)"
              strokeOpacity="0.5"
              strokeDasharray="2 3"
            />
            {/* baseline */}
            <path d={baselinePath} fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" />
            {/* spike */}
            <path d={spikePath} fill="none" stroke="var(--accent-red)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="mt-2 flex justify-between pl-8 font-mono text-[10px] text-muted-foreground">
        <span>12h ago</span>
        <span>now</span>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="animate-spin">
          <circle cx="12" cy="12" r="9" stroke="var(--muted-foreground)" strokeOpacity="0.2" strokeWidth="2.5" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span className="font-mono text-xs text-muted-foreground">Investigating…</span>
      </div>
    </div>
  );
}
