import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

/**
 * "Sense" mockup — radial gauge showing live telemetry value
 * with target band and recent trace beneath.
 */
export function Gauge({
  className,
  value = 2.4,
  unit = "°C",
  label = "CHILLER-3",
  target = "1.8 – 2.2",
}: {
  className?: string;
  value?: number;
  unit?: string;
  label?: string;
  target?: string;
}) {
  // Map value 0..6 -> arc angle -120..120
  const angle = Math.min(Math.max(((value - 0) / 6) * 240 - 120, -120), 120);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <AgentLabel tone="teal" loading>
          SENSING · {label}
        </AgentLabel>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          T+0:00:01
        </span>
      </div>

      <div className="relative flex h-44 items-center justify-center rounded-xl border border-border bg-background/60">
        <svg viewBox="-80 -80 160 110" className="h-full" aria-hidden>
          {/* track */}
          <path
            d="M -60 30 A 60 60 0 1 1 60 30"
            fill="none"
            stroke="var(--border)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* target band */}
          <path
            d="M -10 -56 A 60 60 0 0 1 22 -54"
            fill="none"
            stroke="var(--accent-teal)"
            strokeOpacity="0.35"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* needle */}
          <g transform={`rotate(${angle})`}>
            <line
              x1="0"
              y1="20"
              x2="0"
              y2="-50"
              stroke="var(--brand)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="0" cy="20" r="4" fill="var(--brand)" />
          </g>
          {/* tick labels */}
          <text x="-60" y="40" textAnchor="middle" fontSize="6" fill="var(--muted-foreground)" fontFamily="monospace">0</text>
          <text x="0" y="-66" textAnchor="middle" fontSize="6" fill="var(--muted-foreground)" fontFamily="monospace">3</text>
          <text x="60" y="40" textAnchor="middle" fontSize="6" fill="var(--muted-foreground)" fontFamily="monospace">6</text>
        </svg>
        <div className="absolute inset-x-0 bottom-3 text-center">
          <div className="font-mono text-2xl tabular-nums text-foreground">
            {value.toFixed(1)}
            <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-[10px]">
        <span className="label-mono text-muted-foreground">TARGET</span>
        <span className="font-mono text-accent-teal">{target} {unit}</span>
      </div>
    </div>
  );
}
