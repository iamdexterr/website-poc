import { Stagger, StaggerItem } from "@/components/motion/fade-up";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { DeviceDiscover } from "@/components/mockups/device-discover";
import { ConfigPush } from "@/components/mockups/config-push";
import { WorkflowTree } from "@/components/mockups/workflow-tree";
import { AnomalyResponse } from "@/components/mockups/anomaly-response";

export type AgentGridTone = "teal" | "purple" | "green" | "blue" | "amber" | "orange";

export type AgentGridCell = {
  eyebrow: string;
  tone: AgentGridTone;
  title: string;
  body: string;
  mockup: React.ReactNode;
};

const toneText: Record<AgentGridTone, string> = {
  teal: "text-accent-teal",
  purple: "text-accent-purple",
  green: "text-accent-green",
  blue: "text-accent-blue",
  amber: "text-accent-amber",
  orange: "text-accent-orange",
};

/**
 * Reusable 2×N agent-style grid. Pass any number of cells; on md+ they
 * render as a 2-column grid. Each cell has a mockup canvas on top and
 * eyebrow + headline + body underneath.
 */
export function AgentGridShell({ cells }: { cells: AgentGridCell[] }) {
  return (
    <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
      {cells.map((c) => (
        <StaggerItem key={c.eyebrow}>
          <SpotlightCard
            tone={c.tone === "orange" || c.tone === "amber" ? "amber" : c.tone}
            className="flex h-full flex-col bg-surface p-8 lg:p-10"
          >
            <div className="mb-10 flex min-h-70 items-center">
              {c.mockup}
            </div>
            <div className="relative space-y-3">
              <span className={`label-mono ${toneText[c.tone]}`}>
                {c.eyebrow}
              </span>
              <h3 className="text-2xl font-semibold leading-tight tracking-tight">
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </div>
          </SpotlightCard>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

// ── The original "platform agents" grid (DISCOVER · CONFIGURE · AUTOMATE · RESPOND)
// kept exported as AgentGrid for backwards compat with the Platform section.

const platformCells: AgentGridCell[] = [
  {
    eyebrow: "◆ DISCOVER",
    tone: "teal",
    title: "Auto-discover every device on the network",
    body: "OneIoT scans across MQTT, CoAP, Modbus, OPC-UA, LoRaWAN, and BLE — automatically registering each device with vendor, firmware, and protocol metadata. Zero manual onboarding.",
    mockup: <DeviceDiscover />,
  },
  {
    eyebrow: "◆ CONFIGURE",
    tone: "purple",
    title: "Push config and firmware to entire fleets",
    body: "Stage a config template, preview the rollout, and push to thousands of devices over the air. Versioned, reversible, audit-logged — the way you'd ship code.",
    mockup: <ConfigPush />,
  },
  {
    eyebrow: "◆ AUTOMATE",
    tone: "green",
    title: "Compose workflows that close the loop",
    body: "Visual rule editor turns telemetry into action. One trigger can branch into alerts, actuator commands, and ticket creation — all in the same workflow, all version-controlled.",
    mockup: <WorkflowTree />,
  },
  {
    eyebrow: "◆ RESPOND",
    tone: "blue",
    title: "AI that suggests the fix, not just the alert",
    body: "When something looks off, OneIoT's AI doesn't just page someone — it suggests the remediation, shows the forecast cost of inaction, and applies the fix on approval.",
    mockup: <AnomalyResponse />,
  },
];

export function AgentGrid() {
  return <AgentGridShell cells={platformCells} />;
}
