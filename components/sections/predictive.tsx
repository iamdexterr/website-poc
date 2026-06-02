import { FadeUp } from "@/components/motion/fade-up";
import { AgentLabel } from "@/components/motion/agent-label";

const features = [
  { eyebrow: "ML", title: "Anomaly detection", body: "Spot drift before it becomes downtime." },
  { eyebrow: "FORECAST", title: "Predictive maintenance", body: "Schedule before failure, not after." },
  { eyebrow: "RULES", title: "Causal rule engine", body: "Compose conditions with full audit trail." },
  { eyebrow: "NL", title: "Natural language query", body: "Ask in English. Get streaming answers." },
];

// Pre-computed chart paths so server === client (no Math.random hydration drift)
const actualPath =
  "M 0,80 L 40,72 L 80,76 L 120,64 L 160,58 L 200,52 L 240,48 L 280,42 L 320,38";
const forecastPath =
  "M 320,38 L 360,30 L 400,24 L 440,18 L 480,12 L 520,8";
const upperBandPath =
  "M 320,38 L 360,22 L 400,14 L 440,6 L 480,-2 L 520,-8";
const lowerBandPath =
  "M 320,38 L 360,38 L 400,34 L 440,30 L 480,26 L 520,24";

const cascade = [
  { t: "T-0", label: "Vibration anomaly · pump-a7", tone: "amber" as const },
  { t: "T+2m", label: "Bearing temp ▲ 18%", tone: "amber" as const },
  { t: "T+11m", label: "Forecast: failure in ~6h", tone: "red" as const },
  { t: "T+12m", label: "Maintenance ticket created", tone: "teal" as const },
  { t: "T+13m", label: "On-call paged via PagerDuty", tone: "teal" as const },
];

export function Predictive() {
  return (
    <section id="predictive" className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-purple">PREDICTIVE AI</span>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Catch it before it breaks.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Up to{" "}
            <span className="text-foreground">40% less unplanned downtime</span>{" "}
            by acting on signals before they become incidents.
          </p>
        </FadeUp>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Forecast chart */}
          <FadeUp delay={0.1} className="lg:col-span-2">
            <div className="h-full rounded-2xl border border-border bg-surface p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="label-mono text-accent-purple">
                  FORECAST · BEARING-TEMP · PUMP-A7
                </span>
                <AgentLabel tone="purple" loading>
                  ANALYZING
                </AgentLabel>
              </div>
              <div className="relative h-56 w-full overflow-hidden rounded-lg border border-border bg-background/60">
                <svg
                  viewBox="0 0 520 100"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                >
                  {/* gridlines */}
                  {[20, 40, 60, 80].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2="520"
                      y1={y}
                      y2={y}
                      stroke="var(--border)"
                      strokeWidth="0.5"
                    />
                  ))}
                  {/* forecast band */}
                  <path
                    d={`${upperBandPath} L 520,24 L 480,26 L 440,30 L 400,34 L 360,38 L 320,38 Z`}
                    fill="var(--accent-purple)"
                    fillOpacity="0.12"
                  />
                  {/* actual */}
                  <path
                    d={actualPath}
                    fill="none"
                    stroke="var(--brand)"
                    strokeWidth="1.5"
                  />
                  {/* forecast */}
                  <path
                    d={forecastPath}
                    fill="none"
                    stroke="var(--accent-purple)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  {/* threshold */}
                  <line
                    x1="0"
                    x2="520"
                    y1="14"
                    y2="14"
                    stroke="var(--accent-red)"
                    strokeOpacity="0.5"
                    strokeDasharray="2 4"
                  />
                  <text
                    x="510"
                    y="12"
                    textAnchor="end"
                    fontSize="6"
                    fill="var(--accent-red)"
                    fontFamily="monospace"
                  >
                    THRESHOLD
                  </text>
                </svg>
                <div className="absolute bottom-2 left-3 font-mono text-[10px] text-muted-foreground">
                  ◷ NOW
                </div>
                <div className="absolute bottom-2 right-3 font-mono text-[10px] text-accent-purple">
                  T+6h · FORECAST CROSS
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-px w-4 bg-brand" /> actual
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-px w-4 border-t border-dashed border-accent-purple" />
                  forecast
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-px w-4 border-t border-dashed border-accent-red" />
                  threshold
                </span>
              </div>
            </div>
          </FadeUp>

          {/* Alert cascade */}
          <FadeUp delay={0.2}>
            <div className="h-full rounded-2xl border border-border bg-surface p-6">
              <span className="label-mono text-accent-amber">
                ALERT CASCADE
              </span>
              <ol className="mt-4 space-y-3">
                {cascade.map((step, i) => (
                  <li key={step.t} className="relative flex gap-3">
                    {i < cascade.length - 1 && (
                      <span className="absolute left-1.25 top-4 h-full w-px bg-border" />
                    )}
                    <span
                      className={`relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full ${
                        step.tone === "red"
                          ? "bg-accent-red"
                          : step.tone === "amber"
                          ? "bg-accent-amber"
                          : "bg-accent-teal"
                      }`}
                    />
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {step.t}
                      </div>
                      <div className="mt-0.5 text-sm text-foreground">
                        {step.label}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </FadeUp>
        </div>

        {/* Feature row */}
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="bg-surface p-5">
              <div className="label-mono text-accent-purple">{f.eyebrow}</div>
              <div className="mt-2 text-sm font-semibold text-foreground">
                {f.title}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {f.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
