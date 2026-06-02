import { AgentLabel } from "@/components/motion/agent-label";
import { GradientLine } from "@/components/motion/gradient-line";
import { cn } from "@/lib/utils";

const sources = [
  { label: "NETWORK SCAN" },
  { label: "MAC REGISTRY" },
  { label: "PROTOCOL HANDSHAKE", loading: true },
];

const facts = [
  { k: "PROTOCOL", v: "MQTT 5" },
  { k: "VENDOR", v: "Siemens" },
  { k: "FIRMWARE", v: "v2.4.1" },
];

/**
 * "Discover agent" mockup — network discovery sidebar feeding a device card.
 * Maps to CallSine's ContactCard but for industrial IoT devices.
 */
export function DeviceDiscover({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-6", className)}>
      <ul className="flex w-44 flex-col gap-2 pt-2">
        {sources.map((s) => (
          <li key={s.label}>
            <AgentLabel tone="muted" loading={s.loading}>
              {s.label}
            </AgentLabel>
          </li>
        ))}
      </ul>
      <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background/60 p-6">
        <div className="flex items-start gap-3">
          <div className="flex size-12 items-center justify-center rounded-lg border border-border bg-surface-elevated">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect
                x="4"
                y="6"
                width="16"
                height="12"
                rx="2"
                stroke="var(--accent-teal)"
                strokeWidth="1.5"
              />
              <circle cx="8" cy="10" r="1" fill="var(--accent-teal)" />
              <path
                d="M11 10h6M11 14h4"
                stroke="var(--muted-foreground)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-semibold text-foreground">
              gateway-blr-04
            </div>
            <div className="text-xs text-muted-foreground">
              Bangalore · Rack 12 · Aisle B
            </div>
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-3 gap-2">
          {facts.map((f) => (
            <div
              key={f.k}
              className="rounded-md border border-border bg-surface p-2"
            >
              <dt className="label-mono text-[9px] text-muted-foreground">
                {f.k}
              </dt>
              <dd className="mt-0.5 font-mono text-xs text-foreground">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
        <GradientLine className="absolute inset-x-6 bottom-4" />
      </div>
    </div>
  );
}
