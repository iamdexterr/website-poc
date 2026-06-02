import { FadeUp } from "@/components/motion/fade-up";
import { AgentLabel } from "@/components/motion/agent-label";

const features = [
  { v: "<1s", l: "telemetry latency" },
  { v: "SQL", l: "streaming queries" },
  { v: "100%", l: "tenant isolation" },
  { v: "90d", l: "historical replay" },
];

// Pre-computed bar heights — keep server/client output identical
const bars = [
  72, 64, 78, 82, 68, 74, 88, 92, 84, 76, 82, 90, 96, 88, 78, 70,
  74, 82, 86, 92, 88, 78, 84, 90,
];

const recentEvents = [
  { time: "14:02:11", id: "pump-a7", state: "RUNNING", tone: "green" as const },
  { time: "14:02:09", id: "tank-04", state: "6.2 bar", tone: "amber" as const },
  { time: "14:02:07", id: "gw-blr-12", state: "OTA · 84%", tone: "teal" as const },
  { time: "14:02:04", id: "chiller-3", state: "2.4 °C", tone: "muted" as const },
  { time: "14:02:01", id: "anomaly", state: "DETECTED", tone: "red" as const },
];

export function Monitoring() {
  return (
    <section
      id="monitoring"
      className="section-divide bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <div>
              <span className="label-mono text-accent-teal">MONITORING</span>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Every channel, every second.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Live dashboards that don&apos;t refresh — they update. Streaming
                SQL queries against device telemetry as it lands. Drill into 90
                days of history without leaving the same screen.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {features.map((f) => (
                <div key={f.l} className="rounded-lg border border-border bg-surface p-3">
                  <dt className="text-xl font-semibold text-foreground">{f.v}</dt>
                  <dd className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {f.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          {/* Dashboard mockup */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface">
            {/* dashboard chrome */}
            <div className="flex items-center justify-between border-b border-border bg-surface-elevated px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-accent-red/60" />
                  <div className="size-2.5 rounded-full bg-accent-amber/60" />
                  <div className="size-2.5 rounded-full bg-accent-green/60" />
                </div>
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  oneiot · cold-chain · region:apac
                </span>
              </div>
              <AgentLabel tone="teal" loading>
                STREAMING
              </AgentLabel>
            </div>

            <div className="grid gap-px bg-border md:grid-cols-3">
              {/* Chart */}
              <div className="bg-surface p-6 md:col-span-2">
                <div className="mb-3 flex items-center justify-between">
                  <span className="label-mono text-muted-foreground">
                    INGEST · MSG/S · LAST 24H
                  </span>
                  <span className="font-mono text-xs text-accent-teal">
                    ▲ 12.4% vs 7d
                  </span>
                </div>
                <div className="flex h-40 items-end gap-1">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-accent-teal/30 transition-all hover:bg-accent-teal"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-md bg-background/60 px-3 py-2">
                    <div className="font-mono text-sm text-foreground">847,213</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      peak msg/s
                    </div>
                  </div>
                  <div className="rounded-md bg-background/60 px-3 py-2">
                    <div className="font-mono text-sm text-foreground">84ms</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      p95 latency
                    </div>
                  </div>
                  <div className="rounded-md bg-background/60 px-3 py-2">
                    <div className="font-mono text-sm text-accent-green">
                      99.99%
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      delivery
                    </div>
                  </div>
                </div>
              </div>

              {/* Event log */}
              <div className="bg-surface p-6">
                <span className="label-mono text-muted-foreground">
                  EVENT STREAM
                </span>
                <ul className="mt-3 space-y-1.5 font-mono text-xs">
                  {recentEvents.map((e) => (
                    <li
                      key={e.time}
                      className="flex items-center justify-between rounded-md border border-border bg-background/60 px-2.5 py-2"
                    >
                      <span className="text-muted-foreground">{e.time}</span>
                      <span className="text-foreground">{e.id}</span>
                      <span
                        className={
                          e.tone === "green"
                            ? "text-accent-green"
                            : e.tone === "amber"
                            ? "text-accent-amber"
                            : e.tone === "red"
                            ? "text-accent-red"
                            : e.tone === "teal"
                            ? "text-accent-teal"
                            : "text-muted-foreground"
                        }
                      >
                        {e.state}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SQL bar */}
            <div className="border-t border-border bg-background/60 px-5 py-3 font-mono text-xs">
              <span className="text-accent-purple">SELECT</span>{" "}
              <span className="text-muted-foreground">avg(temp)</span>{" "}
              <span className="text-accent-purple">FROM</span>{" "}
              <span className="text-foreground">cold_chain</span>{" "}
              <span className="text-accent-purple">WHERE</span>{" "}
              <span className="text-muted-foreground">site = &apos;blr-04&apos;</span>{" "}
              <span className="text-accent-purple">EMIT CHANGES</span>
              <span className="ml-2 inline-block size-1.5 animate-pulse-dot rounded-full bg-accent-teal align-middle" />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
