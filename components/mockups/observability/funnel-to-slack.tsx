import { cn } from "@/lib/utils";

const fleet = [
  { initials: "SL", name: "PUMP-A7", role: "Bangalore · Station-04", linked: "sub_a7", email: "alerts@pumpset.com" },
  { initials: "DB", name: "CHILLER-3", role: "Bangalore · DC-12", linked: "sub_c3", email: "alerts@dc.com" },
];

/**
 * Funnel-to-Slack pipeline — vertical flow showing a source list (fleet),
 * agent label, success notifications label, ending in a Slack message card.
 * Inspired by the CallSine "CRM → Agent → Notifications → Slack" graphic.
 */
export function FunnelToSlack({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-dot-grid relative overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-2xl",
        className,
      )}
    >
      <div className="mx-auto max-w-md space-y-4">
        {/* fleet card */}
        <div className="overflow-hidden rounded-xl border border-border bg-background/60">
          <div className="flex items-center gap-2 border-b border-border bg-surface-elevated px-4 py-2.5">
            <span className="text-accent-orange">◇</span>
            <span className="font-mono text-xs text-foreground">FLEET</span>
          </div>
          <ul className="divide-y divide-border">
            {fleet.map((d) => (
              <li
                key={d.name}
                className="grid grid-cols-[44px_1fr_auto] items-center gap-3 px-4 py-3"
              >
                <div className="flex size-11 items-center justify-center rounded-full border border-border bg-surface-elevated font-mono text-[10px] text-foreground">
                  {d.initials}
                </div>
                <div>
                  <div className="font-mono text-xs font-semibold text-foreground">
                    {d.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                    {d.role}
                  </div>
                </div>
                <div className="hidden flex-col items-end gap-0.5 font-mono text-[10px] text-muted-foreground md:flex">
                  <span>⌘ {d.linked}</span>
                  <span>✉ {d.email}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* up-arrow connector */}
        <div className="flex flex-col items-center gap-1">
          <svg width="10" height="20" viewBox="0 0 10 20" fill="none" aria-hidden>
            <line x1="5" y1="0" x2="5" y2="14" stroke="var(--accent-green)" strokeWidth="1.2" />
            <path d="M1 4 l 4,-4 l 4,4" stroke="var(--accent-green)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* agent-sourced anomalies pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-green/40 bg-accent-green/10 px-4 py-2 font-mono text-[11px] tracking-wider text-accent-green">
            <span>◬</span>
            AGENT-SOURCED ANOMALIES
          </div>
        </div>

        {/* down arrow */}
        <div className="flex justify-center">
          <svg width="10" height="20" viewBox="0 0 10 20" fill="none" aria-hidden>
            <line x1="5" y1="0" x2="5" y2="14" stroke="var(--accent-green)" strokeWidth="1.2" />
            <path d="M1 14 l 4,5 l 4,-5" stroke="var(--accent-green)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* agent identifier card */}
        <div className="flex items-center justify-center rounded-xl border border-border bg-background/60 px-4 py-3">
          <span className="font-mono text-xs text-foreground">
            <span className="mr-2 text-muted-foreground">◆</span>
            AGENT: PUMP MAINTENANCE
          </span>
        </div>

        {/* down arrow */}
        <div className="flex justify-center">
          <svg width="10" height="20" viewBox="0 0 10 20" fill="none" aria-hidden>
            <line x1="5" y1="0" x2="5" y2="14" stroke="var(--accent-blue)" strokeWidth="1.2" />
            <path d="M1 14 l 4,5 l 4,-5" stroke="var(--accent-blue)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* success notifications pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-blue/40 bg-accent-blue/10 px-4 py-2 font-mono text-[11px] tracking-wider text-accent-blue">
            <span>◇</span>
            SUCCESS NOTIFICATIONS
          </div>
        </div>

        {/* down arrow */}
        <div className="flex justify-center">
          <svg width="10" height="20" viewBox="0 0 10 20" fill="none" aria-hidden>
            <line x1="5" y1="0" x2="5" y2="14" stroke="var(--accent-blue)" strokeWidth="1.2" />
            <path d="M1 14 l 4,5 l 4,-5" stroke="var(--accent-blue)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Slack message card */}
        <div className="overflow-hidden rounded-xl border border-border bg-background/60">
          {/* slack header */}
          <div className="flex items-center justify-between border-b border-border bg-surface-elevated px-3 py-2">
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <rect x="3" y="10" width="4" height="4" rx="1.2" fill="var(--accent-amber)" />
                <rect x="10" y="3" width="4" height="4" rx="1.2" fill="var(--accent-green)" />
                <rect x="10" y="17" width="4" height="4" rx="1.2" fill="var(--accent-red)" />
                <rect x="17" y="10" width="4" height="4" rx="1.2" fill="var(--accent-blue)" />
                <rect
                  x="10"
                  y="10"
                  width="4"
                  height="4"
                  rx="1.2"
                  fill="var(--foreground)"
                  fillOpacity="0.7"
                />
              </svg>
              <span className="font-mono text-[11px] text-foreground">
                #ops-alerts
              </span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">
              3 watching
            </span>
          </div>

          {/* message body */}
          <div className="space-y-2 px-4 py-3">
            <div className="flex items-start gap-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent-teal/15 font-mono text-xs text-accent-teal">
                ◆
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2 text-xs">
                  <span className="font-semibold text-foreground">OneIoT</span>
                  <span className="rounded-sm border border-border px-1 py-px font-mono text-[9px] text-muted-foreground">
                    APP
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    just now
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-foreground">
                  <span className="font-mono text-accent-red">pump-a7</span>{" "}
                  vibration anomaly detected. Forecast failure in{" "}
                  <span className="text-accent-amber">~6h</span>.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    className="rounded-md border border-border bg-surface px-2.5 py-1 text-[10px] font-medium text-foreground hover:bg-surface-elevated"
                  >
                    Open in OneIoT ↗
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-border bg-surface px-2.5 py-1 text-[10px] font-medium text-muted-foreground hover:text-foreground"
                  >
                    Ack
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-border bg-surface px-2.5 py-1 text-[10px] font-medium text-muted-foreground hover:text-foreground"
                  >
                    Snooze 1h
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
