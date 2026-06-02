import { cn } from "@/lib/utils";

// Pre-computed step values (12 buckets, 12h → 30m ago)
const values = [30, 12, 30, 30, 22, 70, 88, 42, 60, 50, 32, 70];
const max = 100;

function stepPath(vals: number[], w: number, h: number, fill = false) {
  const stepW = w / vals.length;
  const y = (v: number) => h - (v / max) * h;
  const parts: string[] = [];
  vals.forEach((v, i) => {
    const x0 = i * stepW;
    const x1 = (i + 1) * stepW;
    if (i === 0) parts.push(`M ${x0},${y(v)}`);
    parts.push(`L ${x1},${y(v)}`);
    if (i < vals.length - 1) {
      parts.push(`L ${x1},${y(vals[i + 1])}`);
    }
  });
  if (fill) {
    parts.push(`L ${w},${h} L 0,${h} Z`);
  }
  return parts.join(" ");
}

/**
 * "Anomaly Detections (24h)" — stepped area chart with a darker filled
 * area underneath the line. Mirrors Vercel's "Suggestions Made" card.
 */
export function AnomalyChart({ className }: { className?: string }) {
  const w = 320;
  const h = 110;
  const linePath = stepPath(values, w, h);
  const areaPath = stepPath(values, w, h, true);

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="text-base font-semibold text-foreground">
        Anomaly Detections
      </div>
      <div className="relative mt-5 h-32">
        {/* y-axis labels */}
        <div className="absolute inset-y-0 left-0 flex w-8 flex-col justify-between font-mono text-[10px] text-muted-foreground">
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>
        {/* gridlines + chart */}
        <div className="absolute inset-y-0 left-8 right-0">
          <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="size-full">
            {[0, 55, 110].map((y) => (
              <line
                key={y}
                x1="0"
                x2={w}
                y1={y}
                y2={y}
                stroke="var(--border)"
                strokeWidth="0.5"
              />
            ))}
            <path d={areaPath} fill="var(--accent-blue)" fillOpacity="0.18" />
            <path
              d={linePath}
              fill="none"
              stroke="var(--accent-blue)"
              strokeWidth="1.6"
            />
          </svg>
        </div>
      </div>
      <div className="mt-2 flex justify-between pl-8 font-mono text-[10px] text-muted-foreground">
        <span>12h ago</span>
        <span>30m ago</span>
      </div>
    </div>
  );
}
