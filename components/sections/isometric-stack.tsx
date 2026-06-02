import { FadeUp } from "@/components/motion/fade-up";

type Layer = {
  label: string;
  detail: string;
  tone: string;
};

const layers: Layer[] = [
  {
    label: "EXPERIENCE",
    detail: "Dashboards · NL query · White-label portals",
    tone: "text-accent-teal border-accent-teal/40 bg-accent-teal/10",
  },
  {
    label: "AI / ANALYTICS",
    detail: "Anomaly · Forecast · Digital twins · Causal rules",
    tone: "text-accent-purple border-accent-purple/40 bg-accent-purple/10",
  },
  {
    label: "AUTOMATION",
    detail: "Workflows · Actuator control · Alert routing",
    tone: "text-accent-orange border-accent-orange/40 bg-accent-orange/10",
  },
  {
    label: "DATA PIPELINE",
    detail: "Ingest · Streaming SQL · 90-day replay · Multi-tenant",
    tone: "text-accent-blue border-accent-blue/40 bg-accent-blue/10",
  },
  {
    label: "DEVICE LAYER",
    detail: "MQTT 5 · CoAP · Modbus · OPC-UA · LoRaWAN · BLE",
    tone: "text-accent-green border-accent-green/40 bg-accent-green/10",
  },
  {
    label: "EDGE / GATEWAY",
    detail: "Sensors · Gateways · Edge compute · OTA",
    tone: "text-muted-foreground border-border bg-surface-elevated",
  },
];

export function IsometricStack() {
  return (
    <section className="section-divide bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">THE STACK</span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Six layers. One contract between them.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Each layer is independently deployable, independently scalable,
            independently replaceable. The contract between them is the
            platform — and it&apos;s stable.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 rounded-full bg-brand" />
              Deploy any layer to cloud, on-prem, or edge.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 rounded-full bg-brand" />
              Open APIs at every boundary — never locked in.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 rounded-full bg-brand" />
              Add a new device class without touching the AI layer.
            </li>
          </ul>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="relative mx-auto w-full max-w-md">
            <div
              className="space-y-2"
              style={{
                transform: "perspective(1400px) rotateX(28deg) rotateZ(-18deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {layers.map((l, i) => (
                <div
                  key={l.label}
                  className={`flex items-center justify-between rounded-xl border px-5 py-4 ${l.tone}`}
                  style={{
                    transform: `translateZ(${(layers.length - i) * 10}px)`,
                    boxShadow: "0 12px 30px -16px rgba(0,0,0,0.7)",
                  }}
                >
                  <div className="label-mono">{l.label}</div>
                  <div className="hidden text-[10px] uppercase tracking-wide opacity-70 md:block">
                    {l.detail}
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
