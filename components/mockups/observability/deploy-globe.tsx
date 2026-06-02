import { cn } from "@/lib/utils";

/**
 * Deploy globe — wireframe-style 3D globe with a CLI command floating
 * above (with a tether line down to a deploy target point), a few
 * scattered region pins, and two framed runtime icons along the bottom.
 * Inspired by Supabase's "functions deploy" hero.
 */
export function DeployGlobe({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="relative h-72">
        {/* the wireframe globe — meridian + parallel lines */}
        <svg
          viewBox="0 0 600 360"
          className="absolute inset-x-0 bottom-0 h-full w-full"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            <radialGradient id="dg-fade" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="var(--border-strong)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--border)" stopOpacity="0.1" />
            </radialGradient>
          </defs>

          {/* outline */}
          <circle
            cx="300"
            cy="300"
            r="250"
            stroke="url(#dg-fade)"
            strokeWidth="1"
            fill="none"
          />

          {/* meridians (vertical curves) — 12 lines */}
          {Array.from({ length: 12 }).map((_, i) => {
            const t = (i + 1) / 13;
            const rx = 250 * Math.cos((t - 0.5) * Math.PI);
            return (
              <ellipse
                key={`m${i}`}
                cx="300"
                cy="300"
                rx={Math.abs(rx)}
                ry="250"
                stroke="var(--border-strong)"
                strokeOpacity={Math.max(0.15, 0.5 - Math.abs(t - 0.5) * 0.7)}
                strokeWidth="0.7"
                fill="none"
              />
            );
          })}

          {/* parallels (horizontal arcs) — 8 lines from top */}
          {Array.from({ length: 8 }).map((_, i) => {
            const y = 70 + i * 32; // sweep through visible hemisphere
            const dy = y - 300;
            const rxAtY = Math.sqrt(Math.max(0, 250 * 250 - dy * dy));
            if (rxAtY < 4) return null;
            return (
              <path
                key={`p${i}`}
                d={`M ${300 - rxAtY} ${y} A ${rxAtY} ${rxAtY * 0.18} 0 0 0 ${300 + rxAtY} ${y}`}
                stroke="var(--border-strong)"
                strokeOpacity={Math.max(0.15, 0.55 - i * 0.05)}
                strokeWidth="0.7"
                fill="none"
              />
            );
          })}

          {/* region pins */}
          <circle cx="170" cy="180" r="6" fill="var(--foreground)" stroke="var(--background)" strokeWidth="2" />
          <circle cx="305" cy="105" r="7" fill="var(--foreground)" stroke="var(--background)" strokeWidth="2" />
          <circle cx="430" cy="220" r="6" fill="var(--foreground)" stroke="var(--background)" strokeWidth="2" />

          {/* tether from deploy target up to the command pill */}
          <line x1="305" y1="105" x2="305" y2="0" stroke="var(--muted-foreground)" strokeOpacity="0.55" strokeWidth="1" />
        </svg>

        {/* the floating command pill */}
        <div className="absolute left-1/2 top-1 -translate-x-1/2 rounded-md border border-border-strong bg-surface px-3 py-2 font-mono text-xs shadow-2xl">
          <span className="text-muted-foreground">$ </span>
          <span className="text-foreground">oneiot functions deploy </span>
          <span className="text-accent-teal">hello</span>
        </div>
      </div>

      {/* runtime / language icons */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-background/60">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M8 8l-4 4 4 4M16 8l4 4-4 4"
              stroke="var(--foreground)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-background/60 font-mono text-[10px] font-semibold text-accent-amber">
          JS
        </div>
        <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-background/60 font-mono text-[10px] font-semibold text-accent-blue">
          PY
        </div>
        <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-background/60 font-mono text-[10px] font-semibold text-accent-teal">
          GO
        </div>
      </div>
    </div>
  );
}
