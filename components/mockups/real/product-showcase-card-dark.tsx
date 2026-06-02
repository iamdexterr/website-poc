import { cn } from "@/lib/utils";

type Row = {
  service: string;
  host: string;
  status: "active" | "needs-creds";
};

const rows: Row[] = [
  { service: "PostgreSQL", host: "us-west-2-postgresql.confinity.com:9090", status: "active" },
  { service: "Redis", host: "us-east-1-redis-primary.confinity.com:6379", status: "active" },
  { service: "PostgreSQL", host: "eu-central-1-pg.confinity.com:9090", status: "needs-creds" },
];

/**
 * Dark product showcase card — embedded panel UI with title + body
 * underneath. Mirrors the "Auto-instrument your resources" Dash0 card.
 */
export function ProductShowcaseCardDark({
  className,
}: {
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      {/* embedded panel */}
      <div className="relative -mx-2 mb-6 flex-1 overflow-hidden rounded-xl border border-border bg-background/60">
        {/* panel header */}
        <div className="flex items-center gap-2 border-b border-border bg-surface-elevated px-4 py-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <ellipse cx="12" cy="5" rx="8" ry="3" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
            <path
              d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"
              stroke="var(--foreground)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <span className="text-sm font-semibold text-foreground">
            Databases
          </span>
        </div>

        {/* info banner — purple */}
        <div className="flex items-start gap-3 border-b border-border bg-accent-purple/5 px-4 py-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="mt-0.5 shrink-0"
          >
            <circle cx="12" cy="12" r="10" fill="var(--accent-purple)" />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fontSize="13"
              fontFamily="serif"
              fontStyle="italic"
              fill="white"
              fontWeight="bold"
            >
              i
            </text>
          </svg>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-foreground">
              Auto-instrument your resources
            </div>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              Collector recognized the following resources running in your
              cluster. Please tell us the credentials we should use to
              instrument them.
            </p>
          </div>
        </div>

        {/* column headers */}
        <div className="grid grid-cols-[1fr_2fr] gap-4 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>Database</span>
          <span>Host</span>
        </div>

        {/* rows */}
        <ul className="divide-y divide-border">
          {rows.map((r, i) => (
            <li
              key={i}
              className="grid grid-cols-[1fr_2fr] items-center gap-4 px-4 py-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-md border border-border bg-surface">
                  {r.service === "PostgreSQL" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <ellipse cx="12" cy="12" rx="9" ry="6" stroke="var(--accent-blue)" strokeWidth="1.5" />
                      <path
                        d="M8 9c0-2 2-3 4-3s4 1 4 3M9 14c1 1 4 1 6 0"
                        stroke="var(--accent-blue)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M3 6l9-3 9 3v4l-9 3-9-3V6zM3 12l9 3 9-3v4l-9 3-9-3v-4z"
                        stroke="var(--accent-red)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {r.service}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 font-mono text-[10px]">
                    {r.status === "active" ? (
                      <>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <circle cx="12" cy="12" r="9" fill="var(--accent-green)" fillOpacity="0.2" stroke="var(--accent-green)" strokeWidth="1.5" />
                          <path d="M8 12l3 3 5-6" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-accent-green">Active</span>
                      </>
                    ) : (
                      <>
                        <span className="size-2 rounded-full bg-accent-amber" />
                        <span className="text-accent-amber">Please add credentials</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "truncate font-mono text-xs",
                  r.status === "active" ? "text-foreground" : "text-muted-foreground/60",
                )}
              >
                {r.host}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* title + body */}
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          Instrument clusters with OpenTelemetry with no code change
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Gather traces, logs, and metrics using eBPF and OpenTelemetry.
          Remotely monitor collector throughput and adjust sampling,
          compression, and batching as needed.
        </p>
      </div>
    </article>
  );
}
