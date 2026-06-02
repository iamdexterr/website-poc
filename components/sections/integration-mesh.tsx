import { FadeUp } from "@/components/motion/fade-up";

type Integration = {
  name: string;
  category: string;
};

const integrations: Integration[] = [
  { name: "AWS IoT", category: "CLOUD" },
  { name: "Azure IoT", category: "CLOUD" },
  { name: "Google Cloud", category: "CLOUD" },
  { name: "Snowflake", category: "DATA" },
  { name: "Databricks", category: "DATA" },
  { name: "Kafka", category: "STREAM" },
  { name: "Grafana", category: "OBSERVE" },
  { name: "PagerDuty", category: "ALERT" },
  { name: "Slack", category: "ALERT" },
  { name: "Twilio", category: "ALERT" },
  { name: "Salesforce", category: "CRM" },
  { name: "SAP", category: "ERP" },
];

export function IntegrationMesh() {
  return (
    <section className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <FadeUp>
            <span className="label-mono text-accent-teal">INTEGRATIONS</span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Plays well with everything you&apos;ve already deployed.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Open APIs at every layer. Native connectors for the clouds, data
              warehouses, alerting tools, and business systems your team
              already uses.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="relative aspect-square w-full max-w-md">
              {/* central OneIoT node */}
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <div className="flex size-24 flex-col items-center justify-center rounded-full border border-brand/40 bg-surface text-center">
                  <div className="label-mono text-[10px] text-brand">ONEIOT</div>
                  <div className="text-xs font-semibold">CORE</div>
                </div>
              </div>

              {/* connection lines + nodes */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 400"
              >
                {integrations.map((_, i) => {
                  const angle = (i / integrations.length) * Math.PI * 2 - Math.PI / 2;
                  const x = 200 + Math.cos(angle) * 160;
                  const y = 200 + Math.sin(angle) * 160;
                  return (
                    <line
                      key={i}
                      x1="200"
                      y1="200"
                      x2={x}
                      y2={y}
                      stroke="var(--border)"
                      strokeWidth="0.5"
                      strokeDasharray="2 3"
                    />
                  );
                })}
              </svg>

              {integrations.map((it, i) => {
                const angle = (i / integrations.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 42; // % from center
                return (
                  <div
                    key={it.name}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * radius}%)`,
                      top: `calc(50% + ${Math.sin(angle) * radius}%)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-center shadow-lg">
                      <div className="text-[10px] font-medium text-foreground">
                        {it.name}
                      </div>
                      <div className="mt-0.5 font-mono text-[8px] uppercase tracking-wide text-muted-foreground">
                        {it.category}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
