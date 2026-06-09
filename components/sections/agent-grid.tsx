"use client";

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
  teal:   "text-accent-teal",
  purple: "text-accent-purple",
  green:  "text-accent-green",
  blue:   "text-accent-blue",
  amber:  "text-accent-amber",
  orange: "text-accent-orange",
};

const toneBorder: Record<AgentGridTone, string> = {
  teal:   "border-accent-teal/50",
  purple: "border-accent-purple/50",
  green:  "border-accent-green/50",
  blue:   "border-accent-blue/50",
  amber:  "border-accent-amber/50",
  orange: "border-accent-amber/50",
};

const flexMap: Record<number, number> = { 0: 0.75, 1: 1.75, 2: 1.75, 3: 0.75 };

export function AgentGridShell({ cells }: { cells: AgentGridCell[] }) {
  const rows = [
    [0, 1],
    [2, 3],
  ] as const;

  return (
    <div className="flex flex-col gap-1.5">
      {rows.map((row, ri) => (
        <div key={ri} className="flex flex-col gap-1.5 md:flex-row">
          {row.map((idx) => {
            const c = cells[idx];
            if (!c) return null;
            return (
              <div
                key={c.eyebrow}
                className={`flex flex-col overflow-hidden rounded-2xl border ${toneBorder[c.tone]} bg-surface/30 backdrop-blur-sm`}
                style={{ flex: `${flexMap[idx]} 1 0%` }}
              >
                <SpotlightCard
                  tone={c.tone === "orange" || c.tone === "amber" ? "amber" : c.tone}
                  className="flex h-full flex-col"
                >
                  <div className="flex flex-1 items-center justify-center overflow-hidden p-3">
                    {c.mockup}
                  </div>

                  <div className="space-y-1 border-t border-border/40 p-3">
                    <span className={`label-mono text-[9px] ${toneText[c.tone]}`}>
                      {c.eyebrow}
                    </span>
                    <h3 className="text-sm font-semibold leading-tight tracking-tight">
                      {c.title}
                    </h3>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      ))}
    </div>
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
