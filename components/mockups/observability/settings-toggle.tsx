import { cn } from "@/lib/utils";

type Setting = {
  label: string;
  hint: string;
  on: boolean;
  required?: boolean;
};

const groups: { title: string; items: Setting[] }[] = [
  {
    title: "GOVERNANCE",
    items: [
      {
        label: "Require approval for prod rollouts",
        hint: "Two approvers minimum · Slack notify",
        on: true,
        required: true,
      },
      {
        label: "Block direct device shell in prod",
        hint: "All access via OneIoT audit gateway",
        on: true,
      },
      {
        label: "Auto-pause on 3+ anomalies in 5min",
        hint: "Resumes after manual acknowledgement",
        on: true,
      },
    ],
  },
  {
    title: "OBSERVABILITY",
    items: [
      {
        label: "Forward audit log to SIEM",
        hint: "Splunk · Datadog · custom webhook",
        on: false,
      },
      {
        label: "Encrypted telemetry replay",
        hint: "90-day retention · KMS-backed",
        on: true,
      },
    ],
  },
];

function Toggle({ on, required }: { on: boolean; required?: boolean }) {
  return (
    <div
      className={cn(
        "relative h-5 w-9 rounded-full border transition-colors",
        on
          ? "border-accent-teal/40 bg-accent-teal/30"
          : "border-border bg-surface-elevated",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-3.5 rounded-full transition-all",
          on
            ? "left-4 bg-accent-teal shadow-[0_0_10px_var(--accent-teal)]"
            : "left-0.5 bg-muted-foreground",
        )}
      />
      {required && (
        <span className="absolute -right-1 -top-1 size-1.5 rounded-full bg-accent-amber" />
      )}
    </div>
  );
}

/**
 * Settings panel — sectioned governance/observability toggles with
 * descriptive copy and required-flag dots. Used to show OneIoT's
 * compliance posture.
 */
export function SettingsToggle({ className }: { className?: string }) {
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
            Workspace policy
          </div>
          <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            cold-chain · prod · all sites
          </div>
        </div>
        <span className="rounded-md border border-accent-amber/30 bg-accent-amber/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-amber">
          ◆ REQUIRED
        </span>
      </div>

      {groups.map((g) => (
        <div key={g.title} className="mt-5 first:mt-0">
          <div className="label-mono mb-2 text-muted-foreground">{g.title}</div>
          <ul className="overflow-hidden rounded-xl border border-border bg-background/60">
            {g.items.map((s, i) => (
              <li
                key={s.label}
                className={cn(
                  "flex items-start justify-between gap-4 px-4 py-3",
                  i < g.items.length - 1 ? "border-b border-border" : "",
                )}
              >
                <div className="flex-1">
                  <div className="text-sm text-foreground">{s.label}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                    {s.hint}
                  </div>
                </div>
                <div className="pt-0.5">
                  <Toggle on={s.on} required={s.required} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
