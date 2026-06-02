import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

/**
 * "Configure agent" mockup — config/OTA push with tab toggle and
 * threshold highlights. Maps to CallSine's EmailPreview.
 */
export function ConfigPush({
  className,
  activeTab = "config",
}: {
  className?: string;
  activeTab?: "config" | "firmware";
}) {
  return (
    <div className={cn(className)}>
      <div className="mb-5 flex items-center justify-end gap-2">
        <AgentLabel tone={activeTab === "config" ? "purple" : "muted"}>
          ◆ CONFIG TEMPLATE
        </AgentLabel>
        <AgentLabel tone={activeTab === "firmware" ? "purple" : "muted"}>
          ◷ FIRMWARE OTA
        </AgentLabel>
      </div>
      <div className="rounded-xl border border-border bg-background/60 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            cold-chain-profile · v3
          </span>
          <span className="rounded-md border border-accent-purple/30 bg-accent-purple/10 px-2 py-0.5 text-[10px] font-medium text-accent-purple">
            STAGED · 247 DEVICES
          </span>
        </div>
        <pre className="overflow-hidden font-mono text-[11px] leading-relaxed text-muted-foreground">
{`{
  "telemetry_interval": `}<span className="text-foreground">30</span>{`s,
  "thresholds": {
    "temp_max":      `}<span className="text-accent-orange">2.0</span>{` °C,
    "humidity_max":  `}<span className="text-foreground">65</span>{` %,
    "battery_min":   `}<span className="text-accent-amber">15</span>{` %
  },
  "alert_routes": [`}<span className="text-foreground">&quot;slack&quot;, &quot;sms&quot;</span>{`],
  "ota_channel":   `}<span className="text-foreground">&quot;stable&quot;</span>{`
}`}
        </pre>
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px]">
        <span className="font-mono text-muted-foreground">
          ESTIMATED ROLLOUT · 4 min
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-accent-green">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-green" />
          READY TO PUSH
        </span>
      </div>
    </div>
  );
}
