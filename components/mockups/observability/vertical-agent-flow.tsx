import { cn } from "@/lib/utils";

type Step = {
  label: string;
  icon: string;
  body: React.ReactNode;
  glow?: boolean;
};

const steps: Step[] = [
  {
    label: "FLEET",
    icon: "◇",
    body: (
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-elevated">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <rect
              x="4"
              y="6"
              width="16"
              height="12"
              rx="2"
              stroke="var(--accent-teal)"
              strokeWidth="1.5"
            />
            <circle cx="8" cy="10" r="1" fill="var(--accent-teal)" />
            <path
              d="M11 10h6M11 14h4"
              stroke="var(--muted-foreground)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-foreground">
            pump-a7
          </div>
          <div className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
            Bangalore · pumping-station-04 · MQTT 5
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "ONEIOT AGENT",
    icon: "◆",
    glow: true,
    body: (
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-teal" />
          pump-a7 · live analysis
        </div>
        <ul className="space-y-1.5 font-mono text-[10px]">
          <li className="flex items-center gap-2 text-muted-foreground">
            <span className="text-accent-green">✓</span> Vibration anomaly detected
          </li>
          <li className="flex items-center gap-2 text-muted-foreground">
            <span className="text-accent-amber">◷</span> Bearing temp forecast · 6h
          </li>
        </ul>
      </div>
    ),
  },
  {
    label: "REMEDIATION",
    icon: "◬",
    body: (
      <div className="space-y-2.5">
        <div className="inline-flex items-center gap-1.5 rounded-md border border-accent-teal/30 bg-accent-teal/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-teal">
          NEW SUGGESTION
        </div>
        <div className="rounded-md border border-border bg-surface p-2.5 text-xs">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] uppercase text-muted-foreground">
              ACTION:
            </span>
            <span className="text-foreground">Reduce pump RPM to 1,400</span>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
            Forecast: bearing failure in{" "}
            <span className="text-accent-amber">~6h</span> if untreated.
            Reducing RPM extends MTBF by 11×.
          </p>
        </div>
      </div>
    ),
  },
];

const tails: { label: string; icon: string }[] = [
  { label: "TICKET CREATED", icon: "◇" },
  { label: "ON-CALL NOTIFIED", icon: "✦" },
];

/**
 * Vertical agent flow — circular label nodes on the left, connected via a
 * running thread line to expanded mockup cards on the right. Forks into
 * two tail nodes at the end. CallSine-inspired.
 */
export function VerticalAgentFlow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-dot-grid relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <ol className="relative space-y-5 pl-3">
        {/* the running thread line behind all nodes */}
        <span
          className="pointer-events-none absolute bottom-12 left-[10.5rem] top-3 w-px bg-accent-teal/35"
          aria-hidden
        />

        {steps.map((s) => (
          <li
            key={s.label}
            className="grid grid-cols-[9rem_1.5rem_1fr] items-center gap-2"
          >
            {/* left label node */}
            <div className="relative flex justify-end">
              <div
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border bg-surface px-3 py-1.5 font-mono text-[10px] tracking-wider",
                  s.glow
                    ? "border-accent-teal/50 text-foreground shadow-[0_0_24px_var(--accent-teal)]"
                    : "border-border text-muted-foreground",
                )}
              >
                <span
                  className={s.glow ? "text-accent-teal" : "text-foreground/70"}
                >
                  {s.icon}
                </span>
                {s.label}
              </div>
            </div>

            {/* arrow connector */}
            <div className="relative z-10 flex items-center justify-center">
              <svg
                width="24"
                height="10"
                viewBox="0 0 24 10"
                fill="none"
                aria-hidden
                className="text-accent-teal"
              >
                <line
                  x1="0"
                  y1="5"
                  x2="18"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M18 1 l 4,4 l -4,4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* expanded card */}
            <div className="rounded-xl border border-border bg-background/60 p-3.5">
              {s.body}
            </div>
          </li>
        ))}

        {/* tail row — forks to two outputs */}
        <li className="grid grid-cols-[9rem_1.5rem_1fr] items-start gap-2">
          <div />
          <div className="relative flex justify-center pt-1">
            <svg
              width="24"
              height="52"
              viewBox="0 0 24 52"
              fill="none"
              aria-hidden
              className="text-accent-teal"
            >
              <line
                x1="12"
                y1="0"
                x2="12"
                y2="16"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <line
                x1="12"
                y1="16"
                x2="12"
                y2="36"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <line
                x1="12"
                y1="16"
                x2="20"
                y2="16"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <line
                x1="12"
                y1="36"
                x2="20"
                y2="36"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M16 12 l 4,4 l -4,4"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 32 l 4,4 l -4,4"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="space-y-2">
            {tails.map((t) => (
              <div
                key={t.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[10px] tracking-wider text-muted-foreground"
              >
                <span className="text-foreground/70">{t.icon}</span>
                {t.label}
              </div>
            ))}
          </div>
        </li>
      </ol>
    </div>
  );
}
