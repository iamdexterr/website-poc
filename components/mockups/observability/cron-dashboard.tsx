import { cn } from "@/lib/utils";

type Run = {
  id: number;
  message: string;
  status: "ok" | "fail";
  start: string;
  end: string;
  duration: string;
};

const runs: Run[] = [
  { id: 41, message: "247 devices polled", status: "ok", start: "03 Dec 2024, 18:00:01", end: "03 Dec 2024, 18:00:04", duration: "3.0s" },
  { id: 40, message: "247 devices polled", status: "ok", start: "03 Dec 2024, 17:59:31", end: "03 Dec 2024, 17:59:34", duration: "3.0s" },
  { id: 39, message: "247 devices polled", status: "ok", start: "03 Dec 2024, 17:59:01", end: "03 Dec 2024, 17:59:04", duration: "3.0s" },
  { id: 38, message: "247 devices polled", status: "ok", start: "03 Dec 2024, 17:58:31", end: "03 Dec 2024, 17:58:34", duration: "3.0s" },
  { id: 37, message: "247 devices polled", status: "ok", start: "03 Dec 2024, 17:58:01", end: "03 Dec 2024, 17:58:04", duration: "3.0s" },
];

/**
 * Cron dashboard — page-within-a-page mockup with breadcrumb,
 * header with icon + description, tab nav, scheduled-run table,
 * and a footer with Schedule / Command / Explore sections.
 */
export function CronDashboard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      {/* breadcrumb */}
      <a
        href="#"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground"
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Integrations
      </a>

      {/* page header */}
      <div className="mt-3 flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface-elevated">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="var(--foreground)" strokeWidth="1.5" />
            <path
              d="M12 7v5l3 2"
              stroke="var(--foreground)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <div className="text-base font-semibold text-foreground">Cron</div>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            Schedule and automate fleet polling and maintenance routines at
            specified intervals.
          </p>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-4 flex items-center gap-6 border-b border-border text-xs">
        <button
          type="button"
          className="border-b border-transparent pb-2 text-muted-foreground hover:text-foreground"
        >
          Overview
        </button>
        <button
          type="button"
          className="border-b border-transparent pb-2 text-muted-foreground hover:text-foreground"
        >
          Jobs
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 border-b-2 border-foreground pb-2 text-foreground"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Scheduled Task
        </button>
      </div>

      {/* runs table */}
      <div className="mt-3 overflow-hidden rounded-md border border-border">
        <div className="grid grid-cols-[60px_140px_120px_1fr_1fr_70px] border-b border-border bg-surface-elevated px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>RunID</span>
          <span>Message</span>
          <span>Status</span>
          <span>Start Time</span>
          <span>End Time</span>
          <span>Duration</span>
        </div>
        <ul className="divide-y divide-border">
          {runs.map((r) => (
            <li
              key={r.id}
              className="grid grid-cols-[60px_140px_120px_1fr_1fr_70px] items-center px-3 py-2.5 font-mono text-[11px]"
            >
              <span className="text-foreground">{r.id}</span>
              <span className="text-muted-foreground">{r.message}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5",
                  r.status === "ok" ? "text-accent-green" : "text-accent-red",
                )}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d={r.status === "ok" ? "M8 12l3 3 5-6" : "M8 8l8 8M16 8l-8 8"}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {r.status === "ok" ? "Succeeded" : "Failed"}
              </span>
              <span className="text-muted-foreground">{r.start}</span>
              <span className="text-muted-foreground">{r.end}</span>
              <span className="text-foreground">{r.duration}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* footer — schedule / command / explore */}
      <div className="mt-4 grid grid-cols-[1fr_1.4fr_auto] items-start gap-6 rounded-md border border-border bg-background/60 p-4">
        <div>
          <div className="text-xs font-medium text-foreground">Schedule</div>
          <div className="mt-2 font-mono text-sm text-foreground">30 seconds</div>
        </div>
        <div>
          <div className="text-xs font-medium text-foreground">Command</div>
          <div className="mt-2 overflow-hidden rounded-md border border-border bg-surface px-3 py-2 font-mono text-[11px]">
            <span className="text-accent-blue">SELECT</span>{" "}
            <span className="text-muted-foreground">poll_device_fleet(3)</span>,{" "}
            <span className="text-accent-blue">COUNT</span>
            <span className="text-muted-foreground">(*)</span>{" "}
            <span className="text-accent-blue">AS</span>{" "}
            <span className="text-muted-foreground">device_count</span>
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-foreground">Explore</div>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-[10px] text-foreground hover:bg-surface-elevated"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 6h16M4 12h16M4 18h10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            View logs
          </button>
        </div>
      </div>
    </div>
  );
}
