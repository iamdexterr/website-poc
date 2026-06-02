import { cn } from "@/lib/utils";

type Row = {
  fleet: string;
  dotColor: string; // tailwind bg-* class
  telemetry: string;
  anomalies: string;
  devices: string;
};

const rows: Row[] = [
  { fleet: "fleet/cold-chain", dotColor: "bg-accent-blue", telemetry: "12k/s", anomalies: "1m 5s", devices: "61" },
  { fleet: "fleet/data-center", dotColor: "bg-accent-orange", telemetry: "27k/s", anomalies: "3m 12s", devices: "23" },
  { fleet: "fleet/greenhouse", dotColor: "bg-accent-green", telemetry: "3k/s", anomalies: "1m 5s", devices: "8" },
  { fleet: "fleet/street-light", dotColor: "bg-accent-red", telemetry: "19k/s", anomalies: "2m 1s", devices: "22" },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md bg-background/70 px-2.5 py-1 font-mono text-xs text-foreground ring-1 ring-border">
      {children}
    </span>
  );
}

/**
 * Fleet activity table — 4 fleet rows with colored dot indicators
 * and 3 metric columns (Telemetry, Anomaly latency, Devices). Mirrors
 * Vercel's repo activity table.
 */
export function FleetActivityTable({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="grid grid-cols-[1.5fr_0.8fr_0.9fr_0.7fr] items-center gap-4 border-b border-border pb-3 text-sm font-medium text-muted-foreground">
        <span />
        <span>Telemetry</span>
        <span>Anomaly TTD</span>
        <span>Devices</span>
      </div>
      <ul>
        {rows.map((r, i) => (
          <li
            key={r.fleet}
            className={`grid grid-cols-[1.5fr_0.8fr_0.9fr_0.7fr] items-center gap-4 py-3 ${
              i < rows.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <span className="flex items-center gap-3 text-sm text-foreground">
              <span className={`size-2 rounded-sm ${r.dotColor}`} />
              <span className="font-mono">{r.fleet}</span>
            </span>
            <Chip>{r.telemetry}</Chip>
            <Chip>{r.anomalies}</Chip>
            <Chip>{r.devices}</Chip>
          </li>
        ))}
      </ul>
    </div>
  );
}
