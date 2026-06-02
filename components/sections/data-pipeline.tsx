import { FadeUp } from "@/components/motion/fade-up";

type Stage = {
  label: string;
  detail: string;
  tone: "teal" | "blue" | "purple" | "green" | "amber";
};

const toneText: Record<Stage["tone"], string> = {
  teal: "text-accent-teal border-accent-teal/40 bg-accent-teal/10",
  blue: "text-accent-blue border-accent-blue/40 bg-accent-blue/10",
  purple: "text-accent-purple border-accent-purple/40 bg-accent-purple/10",
  green: "text-accent-green border-accent-green/40 bg-accent-green/10",
  amber: "text-accent-amber border-accent-amber/40 bg-accent-amber/10",
};

const stages: Stage[] = [
  { label: "DEVICES", detail: "MQTT · CoAP · Modbus · OPC-UA", tone: "teal" },
  { label: "EDGE", detail: "Gateway · Buffer · Compress", tone: "blue" },
  { label: "INGEST", detail: "Sub-second · 100K+ msg/s", tone: "teal" },
  { label: "STREAM", detail: "SQL · Enrich · Aggregate", tone: "purple" },
  { label: "AI", detail: "Anomaly · Forecast · Causal", tone: "purple" },
  { label: "ACT", detail: "Alerts · Workflows · Actuators", tone: "amber" },
];

export function DataPipeline() {
  return (
    <section className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
            <div>
              <span className="label-mono text-accent-teal">DATA PIPELINE</span>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Sensor to action — without a hand-off in sight.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              The same pipeline carries a single greenhouse reading and a
              million-device fleet event. No re-architecting as you scale.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-12 rounded-2xl border border-border bg-surface p-6 md:p-10">
            <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
              {stages.map((s, i) => (
                <div key={s.label} className="contents md:contents">
                  <div
                    className={`flex-1 rounded-xl border px-4 py-5 text-center ${toneText[s.tone]}`}
                  >
                    <div className="label-mono">{s.label}</div>
                    <div className="mt-2 text-[11px] uppercase tracking-wide opacity-80">
                      {s.detail}
                    </div>
                  </div>
                  {i < stages.length - 1 && (
                    <div className="flex shrink-0 items-center justify-center text-muted-foreground md:px-1">
                      <span className="hidden md:inline">→</span>
                      <span className="md:hidden">↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { l: "Latency", v: "< 1s" },
                { l: "Throughput", v: "100K+ msg/s" },
                { l: "Replay window", v: "90 days" },
                { l: "Multi-tenant", v: "Strict isolation" },
              ].map((m) => (
                <div
                  key={m.l}
                  className="rounded-lg border border-border bg-background/60 p-3"
                >
                  <div className="font-mono text-xs text-foreground">{m.v}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
