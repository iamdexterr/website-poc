import { cn } from "@/lib/utils";

/**
 * Branching environment timeline — a horizontal "production" axis with
 * branches that fork off, run for a while, then either merge back or
 * delete themselves. Inspired by the Neon branching environments graphic.
 *
 * Pure SVG so the curves match the dashed branch lines pixel-perfectly.
 */
export function BranchTimeline({ className }: { className?: string }) {
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
            Fleet config branches
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            production · today
          </div>
        </div>
        <span className="rounded-md border border-accent-green/30 bg-accent-green/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-green">
          ALL CLEAN
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-background/60 p-4">
        <svg viewBox="0 0 760 320" className="block h-72 w-full">
          {/* faint vertical time ticks across the whole canvas */}
          {Array.from({ length: 60 }).map((_, i) => (
            <line
              key={i}
              x1={20 + i * 12}
              x2={20 + i * 12}
              y1="155"
              y2="165"
              stroke="var(--border)"
              strokeWidth="0.5"
            />
          ))}

          {/* PRODUCTION axis */}
          <line x1="20" x2="740" y1="160" y2="160" stroke="var(--accent-green)" strokeOpacity="0.55" strokeWidth="1.2" />

          {/* time markers */}
          <text x="180" y="180" fontSize="9" fill="var(--muted-foreground)" fontFamily="monospace">
            18:24:00
          </text>
          <text x="370" y="148" fontSize="9" fill="var(--muted-foreground)" fontFamily="monospace">
            19:08:12
          </text>
          <text x="560" y="180" fontSize="9" fill="var(--muted-foreground)" fontFamily="monospace">
            20:32:04
          </text>

          {/* PRODUCTION pill */}
          <g>
            <rect x="20" y="148" width="110" height="24" rx="12" fill="white" />
            <circle cx="36" cy="160" r="3.5" fill="var(--foreground)" />
            <text x="46" y="164" fontSize="11" fontFamily="monospace" fill="var(--background)">
              production
            </text>
          </g>

          {/* === Preview branch (upper-left) === */}
          {/* origin tick on production */}
          <circle cx="180" cy="160" r="2" fill="var(--accent-green)" />
          {/* branch curve up */}
          <path
            d="M 180,160 Q 180,80 220,80"
            fill="none"
            stroke="var(--accent-green)"
            strokeOpacity="0.4"
            strokeDasharray="3 3"
          />
          {/* vercel-like triangle icon */}
          <g transform="translate(170, 105)">
            <circle r="14" fill="var(--surface-elevated)" stroke="var(--border-strong)" />
            <path d="M0,-6 L7,6 L-7,6 Z" fill="var(--foreground)" />
          </g>
          {/* preview-branch lane */}
          <line x1="220" y1="80" x2="490" y2="80" stroke="var(--muted-foreground)" strokeOpacity="0.65" strokeWidth="1.2" />
          {/* preview-branch pill */}
          <g>
            <rect x="220" y="68" width="140" height="24" rx="12" fill="var(--muted-foreground)" fillOpacity="0.3" />
            <rect x="220" y="68" width="140" height="24" rx="12" fill="none" stroke="var(--border-strong)" />
            <circle cx="236" cy="80" r="3.5" fill="var(--muted-foreground)" />
            <text x="246" y="84" fontSize="11" fontFamily="monospace" fill="var(--foreground)">
              preview-branch
            </text>
          </g>
          {/* PR open marker */}
          <line x1="400" y1="68" x2="400" y2="40" stroke="var(--muted-foreground)" strokeOpacity="0.5" strokeDasharray="2 3" />
          <text x="400" y="32" fontSize="10" fill="var(--muted-foreground)" fontFamily="monospace" textAnchor="middle">
            PR open
          </text>
          <circle cx="400" cy="80" r="6" fill="var(--accent-green)" />
          <path d="M 397,80 l 2.5,2.5 l 4,-5" stroke="white" strokeWidth="1.4" fill="none" />
          {/* PR merged marker */}
          <line x1="475" y1="68" x2="475" y2="40" stroke="var(--muted-foreground)" strokeOpacity="0.5" strokeDasharray="2 3" />
          <text x="475" y="32" fontSize="10" fill="var(--muted-foreground)" fontFamily="monospace" textAnchor="middle">
            PR merged
          </text>
          <circle cx="475" cy="80" r="6" fill="var(--accent-green)" />
          <path d="M 472,80 l 2.5,2.5 l 4,-5" stroke="white" strokeWidth="1.4" fill="none" />
          {/* branch deleted label */}
          <text x="498" y="84" fontSize="10" fill="var(--muted-foreground)" fontFamily="monospace">
            branch deleted
          </text>

          {/* === Dev branch (upper-right) === */}
          {/* origin tick on production */}
          <circle cx="500" cy="160" r="2" fill="var(--accent-green)" />
          {/* branch curve up */}
          <path
            d="M 500,160 Q 500,80 540,80"
            fill="none"
            stroke="var(--accent-green)"
            strokeOpacity="0.4"
            strokeDasharray="3 3"
          />
          {/* dev developer avatar — clean monogram */}
          <g transform="translate(490, 105)">
            <circle r="14" fill="var(--accent-purple)" fillOpacity="0.18" stroke="var(--accent-purple)" strokeOpacity="0.5" />
            <text
              y="3.5"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fill="var(--accent-purple)"
              fontWeight="600"
            >
              PN
            </text>
          </g>
          {/* dev-branch lane */}
          <line x1="540" y1="80" x2="740" y2="80" stroke="var(--muted-foreground)" strokeOpacity="0.65" strokeWidth="1.2" />
          {/* dev-branch pill (highlighted white) */}
          <g>
            <rect x="540" y="68" width="100" height="24" rx="12" fill="white" />
            <circle cx="556" cy="80" r="3.5" fill="var(--foreground)" />
            <text x="566" y="84" fontSize="11" fontFamily="monospace" fill="var(--background)">
              dev-branch
            </text>
          </g>
          {/* dev in progress marker */}
          <line x1="710" y1="68" x2="710" y2="40" stroke="var(--muted-foreground)" strokeOpacity="0.5" strokeDasharray="2 3" />
          <text x="710" y="32" fontSize="10" fill="var(--foreground)" fontFamily="monospace" textAnchor="middle">
            dev in progress
          </text>
          <circle cx="710" cy="80" r="6" fill="var(--accent-green)" />
          <path d="M 707,80 l 2.5,2.5 l 4,-5" stroke="white" strokeWidth="1.4" fill="none" />

          {/* === Test branch (lower) === */}
          {/* origin tick on production */}
          <circle cx="370" cy="160" r="2" fill="var(--accent-green)" />
          {/* branch curve down */}
          <path
            d="M 370,160 Q 370,240 410,240"
            fill="none"
            stroke="var(--accent-green)"
            strokeOpacity="0.4"
            strokeDasharray="3 3"
          />
          {/* github-ish icon */}
          <g transform="translate(360, 215)">
            <circle r="14" fill="var(--surface-elevated)" stroke="var(--border-strong)" />
            <circle r="8" fill="none" stroke="var(--foreground)" strokeWidth="1.5" />
            <path d="M -3,3 l 0,3" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          {/* test-branch lane */}
          <line x1="410" y1="240" x2="690" y2="240" stroke="var(--muted-foreground)" strokeOpacity="0.65" strokeWidth="1.2" />
          {/* test-branch pill */}
          <g>
            <rect x="410" y="228" width="120" height="24" rx="12" fill="var(--muted-foreground)" fillOpacity="0.3" />
            <rect x="410" y="228" width="120" height="24" rx="12" fill="none" stroke="var(--border-strong)" />
            <circle cx="426" cy="240" r="3.5" fill="var(--muted-foreground)" />
            <text x="436" y="244" fontSize="11" fontFamily="monospace" fill="var(--foreground)">
              test-branch
            </text>
          </g>
          {/* tests running marker */}
          <line x1="580" y1="240" x2="580" y2="280" stroke="var(--muted-foreground)" strokeOpacity="0.5" strokeDasharray="2 3" />
          <text x="580" y="294" fontSize="10" fill="var(--muted-foreground)" fontFamily="monospace" textAnchor="middle">
            tests running
          </text>
          <circle cx="580" cy="240" r="6" fill="var(--accent-green)" fillOpacity="0.6" />
          <path d="M 577,240 l 2.5,2.5 l 4,-5" stroke="white" strokeWidth="1.4" fill="none" />
          {/* checks passed marker */}
          <line x1="660" y1="240" x2="660" y2="280" stroke="var(--muted-foreground)" strokeOpacity="0.5" strokeDasharray="2 3" />
          <text x="660" y="294" fontSize="10" fill="var(--muted-foreground)" fontFamily="monospace" textAnchor="middle">
            checks passed
          </text>
          <circle cx="660" cy="240" r="6" fill="var(--accent-green)" fillOpacity="0.6" />
          <path d="M 657,240 l 2.5,2.5 l 4,-5" stroke="white" strokeWidth="1.4" fill="none" />
          {/* branch deleted label */}
          <text x="678" y="244" fontSize="10" fill="var(--muted-foreground)" fontFamily="monospace">
            branch deleted
          </text>
        </svg>
      </div>
    </div>
  );
}
