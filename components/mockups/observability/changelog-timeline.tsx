import { cn } from "@/lib/utils";

type Entry = {
  tag: "Feature" | "Improvement" | "Fix" | "Security";
  title: string;
  body: string;
};

type DateGroup = { date: string; entries: Entry[] };

const groups: DateGroup[] = [
  {
    date: "26 May 2026",
    entries: [
      {
        tag: "Feature",
        title: "AI-suggested setpoints for climate fleets",
        body: "Anomaly model now proposes proactive setpoint changes with confidence scores and forecast energy delta.",
      },
      {
        tag: "Improvement",
        title: "Streaming SQL latency cut by 38%",
        body: "Rewrote the materialized-view scheduler; p95 drops from 134ms to 84ms across all tenants.",
      },
    ],
  },
  {
    date: "19 May 2026",
    entries: [
      {
        tag: "Security",
        title: "Encrypted telemetry replay (KMS-backed)",
        body: "90-day historical replay is now end-to-end encrypted with per-tenant KMS keys.",
      },
      {
        tag: "Fix",
        title: "Devices stuck in PROVISIONING on re-auth",
        body: "Edge gateway no longer drops the device session when rotating MQTT credentials.",
      },
    ],
  },
];

const tagTone: Record<Entry["tag"], string> = {
  Feature: "border-accent-teal/30 bg-accent-teal/10 text-accent-teal",
  Improvement: "border-accent-purple/30 bg-accent-purple/10 text-accent-purple",
  Fix: "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
  Security: "border-accent-red/30 bg-accent-red/10 text-accent-red",
};

/**
 * Changelog timeline — public-facing release notes grouped by date,
 * with category-coded tags for each entry.
 */
export function ChangelogTimeline({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="text-base font-semibold text-foreground">
          Changelog
        </div>
        <a className="font-mono text-[10px] text-accent-teal hover:underline" href="#">
          subscribe →
        </a>
      </div>

      <ol className="space-y-6">
        {groups.map((g) => (
          <li key={g.date}>
            <div className="label-mono mb-3 text-muted-foreground">
              {g.date}
            </div>
            <ul className="space-y-3 border-l border-border pl-5">
              {g.entries.map((e) => (
                <li key={e.title} className="relative">
                  <span className="absolute -left-[1.45rem] top-1.5 size-2 rounded-full bg-border" />
                  <div className="flex items-baseline gap-2">
                    <span
                      className={cn(
                        "rounded-md border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                        tagTone[e.tag],
                      )}
                    >
                      {e.tag}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {e.title}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {e.body}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
