import { cn } from "@/lib/utils";

// 7 rows (days of week) × 26 cols (~6 months) of pre-computed
// intensity values 0-4. Deterministic so SSR === CSR.
const seed = [
  3, 1, 0, 2, 1, 3, 2, 0, 1, 4, 2, 3, 1, 0, 2, 3, 1, 4, 2, 1, 0, 3, 2, 1, 4, 2,
  0, 2, 1, 3, 0, 2, 4, 1, 2, 0, 3, 1, 2, 4, 0, 1, 2, 3, 1, 0, 4, 2, 1, 3, 0, 2,
  1, 4, 0, 2, 3, 1, 2, 0, 1, 3, 4, 2, 0, 1, 2, 3, 1, 4, 0, 2, 1, 3, 2, 0,
];

const COLS = 26;
const ROWS = 7;

const intensities: Record<number, string> = {
  0: "bg-surface-elevated",
  1: "bg-accent-teal/20",
  2: "bg-accent-teal/40",
  3: "bg-accent-teal/65",
  4: "bg-accent-teal",
};

/**
 * Device-event heatmap — GitHub contribution calendar style, but
 * tracking telemetry density per day across a 6-month window.
 */
export function DeviceHeatmap({ className }: { className?: string }) {
  // Build 7-row × COLS-col matrix by walking the seed
  const cells: number[][] = Array.from({ length: ROWS }, () => []);
  for (let i = 0; i < ROWS * COLS; i++) {
    cells[i % ROWS].push(seed[i % seed.length]);
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-base font-semibold text-foreground">
            Telemetry density
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            last 6 months · per device · per day
          </div>
        </div>
        <div className="rounded-md border border-accent-teal/30 bg-accent-teal/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-teal">
          ▲ 28% Q/Q
        </div>
      </div>

      {/* heatmap grid */}
      <div className="mt-5 flex gap-2">
        <div className="flex flex-col justify-between py-0.5 font-mono text-[9px] text-muted-foreground">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div className="flex-1">
          <div className="grid grid-rows-7 gap-1">
            {cells.map((row, r) => (
              <div key={r} className="grid grid-flow-col gap-1">
                {row.map((v, c) => (
                  <div
                    key={c}
                    className={cn("aspect-square rounded-[3px]", intensities[v])}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px] text-muted-foreground">
            <span>Jun</span>
            <span>Aug</span>
            <span>Oct</span>
            <span>Nov</span>
          </div>
        </div>
      </div>

      {/* legend */}
      <div className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[10px] text-muted-foreground">
        <span>less</span>
        {[0, 1, 2, 3, 4].map((v) => (
          <div key={v} className={cn("size-2.5 rounded-[2px]", intensities[v])} />
        ))}
        <span>more</span>
      </div>
    </div>
  );
}
