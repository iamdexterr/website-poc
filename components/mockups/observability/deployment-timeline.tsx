import { cn } from "@/lib/utils";

type Event = {
  time: string;
  title: string;
  meta: string;
  sha?: string;
  status: "ok" | "live" | "fail" | "info";
};

const events: Event[] = [
  {
    time: "14:02",
    title: "Promoted to production",
    meta: "247 devices · ack 1.8s",
    sha: "a3f1c8e",
    status: "ok",
  },
  {
    time: "14:01",
    title: "Canary passed",
    meta: "12 devices · 0 anomalies",
    sha: "a3f1c8e",
    status: "ok",
  },
  {
    time: "13:58",
    title: "Rolling out config v4",
    meta: "stable channel",
    sha: "a3f1c8e",
    status: "live",
  },
  {
    time: "13:57",
    title: "Build artifact signed",
    meta: "sha256:1f3c…",
    sha: "a3f1c8e",
    status: "info",
  },
  {
    time: "13:42",
    title: "Previous rollout reverted",
    meta: "1 device · over-temp",
    sha: "9c2e4ba",
    status: "fail",
  },
];

const dotClass: Record<Event["status"], string> = {
  ok: "bg-accent-green",
  live: "animate-pulse-dot bg-accent-teal ring-4 ring-accent-teal/15",
  fail: "bg-accent-red",
  info: "bg-muted-foreground",
};

const labelClass: Record<Event["status"], string> = {
  ok: "text-accent-green",
  live: "text-accent-teal",
  fail: "text-accent-red",
  info: "text-muted-foreground",
};

const labelText: Record<Event["status"], string> = {
  ok: "OK",
  live: "LIVE",
  fail: "REVERTED",
  info: "INFO",
};

/**
 * Vertical deployment timeline — most recent at top, each event has
 * a status dot, time, title, meta, commit hash, and a status pill.
 * Used to show rollout history at a glance.
 */
export function DeploymentTimeline({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="text-base font-semibold text-foreground">
          Rollout timeline
        </div>
        <span className="rounded-md border border-accent-teal/30 bg-accent-teal/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-teal">
          ENV · PROD
        </span>
      </div>

      <ol className="relative space-y-4 pl-6">
        {/* the running thread line */}
        <span
          className="pointer-events-none absolute bottom-2 left-[7px] top-2 w-px bg-border"
          aria-hidden
        />
        {events.map((e) => (
          <li key={e.time + e.title} className="relative">
            <span
              className={cn(
                "absolute -left-6 top-1.5 size-3 rounded-full",
                dotClass[e.status],
              )}
            />
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm text-foreground">{e.title}</span>
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-wider",
                  labelClass[e.status],
                )}
              >
                {labelText[e.status]}
              </span>
            </div>
            <div className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
              <span>{e.time}</span>
              <span className="text-border">·</span>
              <span>{e.meta}</span>
              {e.sha && (
                <>
                  <span className="text-border">·</span>
                  <span className="rounded-sm border border-border bg-background/60 px-1.5 py-px text-[9px]">
                    {e.sha}
                  </span>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
