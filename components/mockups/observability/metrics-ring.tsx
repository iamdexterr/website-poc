import { cn } from "@/lib/utils";

type Ring = {
  label: string;
  pct: number; // 0–100
  tone: "teal" | "green" | "amber" | "blue";
};

const rings: Ring[] = [
  { label: "Delivery", pct: 99.99, tone: "green" },
  { label: "On-time rollout", pct: 96.4, tone: "teal" },
  { label: "Anomaly catch", pct: 92.1, tone: "blue" },
];

const toneStroke: Record<Ring["tone"], string> = {
  teal: "var(--accent-teal)",
  green: "var(--accent-green)",
  amber: "var(--accent-amber)",
  blue: "var(--accent-blue)",
};

const toneText: Record<Ring["tone"], string> = {
  teal: "text-accent-teal",
  green: "text-accent-green",
  amber: "text-accent-amber",
  blue: "text-accent-blue",
};

function Ring({ ring }: { ring: Ring }) {
  const R = 28;
  const C = 2 * Math.PI * R;
  const dash = (ring.pct / 100) * C;
  return (
    <div className="flex flex-col items-center">
      <div className="relative size-20">
        <svg viewBox="0 0 70 70" className="size-full -rotate-90">
          {/* track */}
          <circle
            cx="35"
            cy="35"
            r={R}
            fill="none"
            stroke="var(--border)"
            strokeWidth="6"
          />
          {/* progress */}
          <circle
            cx="35"
            cy="35"
            r={R}
            fill="none"
            stroke={toneStroke[ring.tone]}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-mono text-base tabular-nums", toneText[ring.tone])}>
            {ring.pct.toFixed(ring.pct < 100 ? 1 : 2)}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground">%</span>
        </div>
      </div>
      <span className="mt-2 text-[11px] text-foreground">{ring.label}</span>
    </div>
  );
}

/**
 * Metrics ring trio — 3 circular progress rings showing reliability
 * KPIs (delivery, on-time rollout, anomaly catch rate). Replaces a
 * boring KPI tile grid with something more visual.
 */
export function MetricsRing({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-base font-semibold text-foreground">
            Reliability scorecard
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            trailing 30 days · all fleets
          </div>
        </div>
        <span className="rounded-md border border-accent-green/30 bg-accent-green/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-green">
          SLA · GREEN
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rings.map((r) => (
          <Ring key={r.label} ring={r} />
        ))}
      </div>

      <ul className="mt-5 space-y-1 border-t border-border pt-4 font-mono text-[10px] text-muted-foreground">
        <li className="flex justify-between">
          <span>Δ delivery vs last 30d</span>
          <span className="text-accent-green">+0.04%</span>
        </li>
        <li className="flex justify-between">
          <span>Mean rollout duration</span>
          <span className="text-foreground">3m 41s</span>
        </li>
        <li className="flex justify-between">
          <span>Incidents auto-resolved</span>
          <span className="text-accent-teal">142 / 147</span>
        </li>
      </ul>
    </div>
  );
}
