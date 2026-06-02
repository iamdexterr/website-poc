import { cn } from "@/lib/utils";

// Pre-computed area-chart paths — left side without OneIoT (red spike that
// breaches), right side with OneIoT (green peak that auto-scales)
const beforeArea =
  "M 0,108 L 18,90 L 32,70 L 46,82 L 60,40 L 70,18 L 80,40 L 95,68 L 110,90 L 130,80 L 150,70 L 170,86 L 190,88 L 210,72 L 230,82 L 250,90 L 270,82 L 290,76 L 310,90 L 330,98 Z";
const afterArea =
  "M 0,90 L 18,82 L 32,72 L 46,76 L 60,48 L 76,38 L 90,32 L 102,38 L 116,50 L 130,72 L 144,38 L 154,18 L 162,8 L 172,18 L 184,40 L 198,30 L 212,52 L 230,82 L 248,86 L 264,70 L 282,84 L 300,78 L 320,86 L 332,98 Z";

/**
 * "Without OneIoT / With OneIoT" — split-screen area chart comparison with
 * floating callout cards. Inspired by the Neon "Avoid incidents" pattern.
 *
 * The threshold line at y=30 splits "operational" from "degraded". The
 * red side breaches the threshold (red fill above the line); the green
 * side autoscales and stays operational throughout.
 */
export function BeforeAfterChart({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      {/* tabs */}
      <div className="mb-5 flex items-center gap-2">
        <button
          type="button"
          className="rounded-md border border-border-strong bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground"
        >
          Avoid incidents
        </button>
        <button
          type="button"
          className="rounded-md border border-transparent px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          Save costs
        </button>
      </div>

      {/* chart canvas */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-background/60">
        <svg viewBox="0 0 660 120" className="block h-44 w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="bac-stripes" width="6" height="120" patternUnits="userSpaceOnUse">
              <line x1="0" x2="0" y1="0" y2="120" stroke="var(--border)" strokeWidth="0.5" />
            </pattern>
            <pattern id="bac-dots-red" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.6" fill="var(--accent-red)" fillOpacity="0.5" />
            </pattern>
            <pattern id="bac-dots-green" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.6" fill="var(--accent-green)" fillOpacity="0.5" />
            </pattern>
          </defs>

          {/* background vertical stripes */}
          <rect width="660" height="120" fill="url(#bac-stripes)" opacity="0.5" />

          {/* threshold line across the whole canvas */}
          <line
            x1="0"
            x2="660"
            y1="30"
            y2="30"
            stroke="var(--muted-foreground)"
            strokeOpacity="0.5"
            strokeDasharray="2 3"
          />

          {/* center divider */}
          <line x1="330" x2="330" y1="0" y2="120" stroke="var(--border-strong)" strokeWidth="0.6" />

          {/* LEFT — without OneIoT */}
          <g>
            <path d={beforeArea} fill="url(#bac-dots-red)" opacity="0.7" />
            <path d={beforeArea} fill="var(--accent-red)" fillOpacity="0.15" />
            <path
              d={beforeArea.replace(/Z$/, "")}
              fill="none"
              stroke="var(--accent-red)"
              strokeWidth="1.2"
            />
          </g>

          {/* RIGHT — with OneIoT */}
          <g transform="translate(330, 0)">
            <path d={afterArea} fill="url(#bac-dots-green)" opacity="0.7" />
            <path d={afterArea} fill="var(--accent-green)" fillOpacity="0.18" />
            <path
              d={afterArea.replace(/Z$/, "")}
              fill="none"
              stroke="var(--accent-green)"
              strokeWidth="1.2"
            />
          </g>
        </svg>

        {/* section labels */}
        <div className="pointer-events-none absolute left-4 top-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Without OneIoT
        </div>
        <div className="pointer-events-none absolute left-[55%] top-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          With OneIoT
        </div>

        {/* left floating callout — incident */}
        <div className="absolute left-[18%] top-10 w-44 rounded-md border border-accent-red/40 bg-surface px-3 py-2 shadow-[0_8px_24px_-8px_var(--accent-red)] ring-1 ring-accent-red/10">
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-accent-red">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 3 L22 20 H2 Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M12 10 v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17" r="0.8" fill="currentColor" />
            </svg>
            Threshold breached
          </div>
          <div className="mt-1 flex justify-between font-mono text-[9px]">
            <span className="text-muted-foreground">Temp peak:</span>
            <span className="text-accent-red">4.2°C</span>
          </div>
          <div className="mt-0.5 flex justify-between font-mono text-[9px]">
            <span className="text-muted-foreground">Status:</span>
            <span className="text-foreground">Over-spec</span>
          </div>
        </div>

        {/* right floating callout — autoscaled */}
        <div className="absolute right-[6%] top-10 w-44 rounded-md border border-accent-green/40 bg-surface px-3 py-2 shadow-[0_8px_24px_-8px_var(--accent-green)] ring-1 ring-accent-green/10">
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-accent-green">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Auto-actuation active
          </div>
          <div className="mt-1 flex justify-between font-mono text-[9px]">
            <span className="text-muted-foreground">Setpoint:</span>
            <span className="text-accent-teal">−0.5°C</span>
          </div>
          <div className="mt-0.5 flex justify-between font-mono text-[9px]">
            <span className="text-muted-foreground">Status:</span>
            <span className="text-foreground">Operational</span>
          </div>
        </div>
      </div>

      {/* bottom badge — slim, semantic, not a billboard */}
      <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-accent-green/30 bg-accent-green/10 px-3 py-1.5 text-xs">
        <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-green" />
        <span className="font-mono uppercase tracking-wider text-accent-green">
          54,210
        </span>
        <span className="text-muted-foreground">
          cold-chain excursions prevented by autoscaling · today
        </span>
      </div>
    </div>
  );
}
