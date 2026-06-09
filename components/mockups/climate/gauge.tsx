import { cn } from "@/lib/utils";

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
  const angle = Math.min(Math.max(((value - 0) / 6) * 240 - 120, -120), 120);
  const pct = ((value / 6) * 100).toFixed(0);

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-teal">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-teal" />
          {label}
        </span>
        <span className="rounded-full border border-accent-teal/25 bg-accent-teal/8 px-2 py-0.5 font-mono text-[10px] text-accent-teal">
          LIVE
        </span>
      </div>

      <div className="relative flex flex-col items-center">
        <svg viewBox="-80 -80 160 115" className="w-full max-w-[220px]" aria-hidden>
          <defs>
            <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent-teal)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path d="M -60 30 A 60 60 0 1 1 60 30" fill="none" stroke="var(--border)" strokeWidth="7" strokeLinecap="round" />
          <path d="M -60 30 A 60 60 0 1 1 60 30" fill="none" stroke="url(#gaugeGrad)" strokeWidth="7" strokeLinecap="round"
            strokeDasharray="190" strokeDashoffset={190 - (190 * Number(pct)) / 100} />
          <path d="M -10 -56 A 60 60 0 0 1 22 -54" fill="none" stroke="var(--accent-teal)" strokeOpacity="0.5" strokeWidth="7" strokeLinecap="round" />
          <g transform={`rotate(${angle})`}>
            <line x1="0" y1="16" x2="0" y2="-48" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="0" cy="16" r="5" fill="var(--brand)" fillOpacity="0.2" />
            <circle cx="0" cy="16" r="3" fill="var(--brand)" />
          </g>
          <text x="-62" y="44" textAnchor="middle" fontSize="7" fill="var(--muted-foreground)" fontFamily="monospace">0</text>
          <text x="0" y="-68" textAnchor="middle" fontSize="7" fill="var(--muted-foreground)" fontFamily="monospace">3</text>
          <text x="62" y="44" textAnchor="middle" fontSize="7" fill="var(--muted-foreground)" fontFamily="monospace">6</text>
        </svg>
        <div className="-mt-6 text-center">
          <div className="font-mono text-3xl tabular-nums text-foreground">
            {value.toFixed(1)}<span className="ml-1 text-base text-muted-foreground">{unit}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-border/60 bg-surface/40 px-3 py-2.5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Target</div>
          <div className="mt-1 font-mono text-sm text-accent-teal">{target} {unit}</div>
        </div>
        <div className="rounded-xl border border-border/60 bg-surface/40 px-3 py-2.5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Status</div>
          <div className="mt-1 flex items-center gap-1.5 font-mono text-sm text-accent-amber">
            <span className="size-1.5 animate-pulse rounded-full bg-accent-amber" />
            ABOVE
          </div>
        </div>
      </div>
    </div>
  );
}
