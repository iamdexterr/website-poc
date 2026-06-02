import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

// Synthetic GPS trail — fixed path so SSR === CSR
const trailPath =
  "M 30,160 L 60,150 L 95,140 L 130,120 L 165,100 L 195,80 L 220,70 L 250,60 L 280,55";

const stops = [
  { x: 30, y: 160, label: "DEPOT" },
  { x: 130, y: 120, label: "STOP 1" },
  { x: 220, y: 70, label: "STOP 2" },
];

/**
 * "Locate" mockup — fake map tile with a GPS breadcrumb trail
 * and the live asset position pulsing at the head.
 */
export function MapTrail({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <AgentLabel tone="teal" loading>
          TRACKING · TRUCK-217
        </AgentLabel>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          GPS · 1s
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-background/60">
        {/* fake map grid */}
        <svg viewBox="0 0 320 200" className="h-44 w-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="320" height="200" fill="url(#grid)" />
          {/* roads */}
          <path d="M 0 60 L 320 60" stroke="var(--border-strong)" strokeWidth="1" />
          <path d="M 0 140 L 320 140" stroke="var(--border-strong)" strokeWidth="1" />
          <path d="M 80 0 L 80 200" stroke="var(--border-strong)" strokeWidth="1" />
          <path d="M 200 0 L 200 200" stroke="var(--border-strong)" strokeWidth="1" />
          {/* trail */}
          <path d={trailPath} fill="none" stroke="var(--accent-teal)" strokeOpacity="0.4" strokeWidth="2" />
          {/* stops */}
          {stops.map((s) => (
            <g key={s.label}>
              <circle cx={s.x} cy={s.y} r="3" fill="var(--surface)" stroke="var(--accent-teal)" strokeWidth="1.5" />
            </g>
          ))}
          {/* live position */}
          <circle cx="280" cy="55" r="8" fill="var(--brand)" opacity="0.25">
            <animate attributeName="r" values="3;10;3" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="55" r="3" fill="var(--brand)" />
        </svg>
        <div className="absolute bottom-2 left-3 font-mono text-[10px] text-muted-foreground">
          17.385° N · 78.486° E
        </div>
        <div className="absolute bottom-2 right-3 font-mono text-[10px] text-accent-teal">
          ETA · 14:32
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { l: "SPEED", v: "62 km/h" },
          { l: "FUEL", v: "68%" },
          { l: "TEMP", v: "−18 °C" },
        ].map((m) => (
          <div key={m.l} className="rounded-md border border-border bg-surface py-1.5">
            <div className="font-mono text-xs text-foreground">{m.v}</div>
            <div className="mt-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">{m.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
