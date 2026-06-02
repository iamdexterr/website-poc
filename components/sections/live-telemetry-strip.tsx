type Metric = {
  label: string;
  value: string;
  unit?: string;
  tone?: "teal" | "green" | "amber" | "muted";
};

const metrics: Metric[] = [
  { label: "INGEST", value: "847,213", unit: "msg/s", tone: "teal" },
  { label: "DEVICES ONLINE", value: "98,412", tone: "green" },
  { label: "TEMP · COLD-CHAIN-12", value: "2.4", unit: "°C", tone: "muted" },
  { label: "P95 LATENCY", value: "84", unit: "ms", tone: "teal" },
  { label: "PUMP-A7", value: "RUNNING", tone: "green" },
  { label: "PRESSURE · BLR-04", value: "6.2", unit: "bar", tone: "amber" },
  { label: "ANOMALIES (24H)", value: "3", tone: "amber" },
  { label: "OTA QUEUE", value: "127", unit: "devices", tone: "muted" },
  { label: "GATEWAYS UP", value: "4,219 / 4,221", tone: "green" },
  { label: "STREAMING SQL", value: "ACTIVE", tone: "teal" },
];

const toneClass: Record<NonNullable<Metric["tone"]>, string> = {
  teal: "text-accent-teal",
  green: "text-accent-green",
  amber: "text-accent-amber",
  muted: "text-foreground",
};

export function LiveTelemetryStrip() {
  const row = [...metrics, ...metrics];
  return (
    <section className="section-divide bg-surface/40">
      <div className="relative overflow-hidden py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee-slow items-center gap-8 font-mono text-xs">
          {row.map((m, i) => (
            <div key={`${m.label}-${i}`} className="flex items-center gap-2">
              <span className="text-muted-foreground">{m.label}</span>
              <span className={toneClass[m.tone ?? "muted"]}>
                {m.value}
                {m.unit && (
                  <span className="ml-0.5 text-muted-foreground">{m.unit}</span>
                )}
              </span>
              <span className="text-border">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
