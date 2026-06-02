import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

type Camera = { id: string; status: "ok" | "alert" | "offline" };

const cameras: Camera[] = [
  { id: "JNK-01", status: "ok" },
  { id: "JNK-02", status: "ok" },
  { id: "JNK-03", status: "alert" },
  { id: "JNK-04", status: "ok" },
  { id: "JNK-05", status: "ok" },
  { id: "JNK-06", status: "offline" },
  { id: "JNK-07", status: "ok" },
  { id: "JNK-08", status: "ok" },
];

const tone: Record<Camera["status"], string> = {
  ok: "border-accent-green/30 bg-accent-green/5",
  alert: "border-accent-red/40 bg-accent-red/10",
  offline: "border-muted-foreground/20 bg-surface",
};

const dot: Record<Camera["status"], string> = {
  ok: "bg-accent-green",
  alert: "animate-pulse-dot bg-accent-red",
  offline: "bg-muted-foreground/40",
};

/**
 * "Observe" mockup — 4×2 grid of fake CCTV tiles with status
 * dots; one tile is mid-alert to draw attention.
 */
export function CameraGrid({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <AgentLabel tone="teal" loading>
          OBSERVING · 8 FEEDS
        </AgentLabel>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          ZONE · CENTRAL
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {cameras.map((c) => (
          <div
            key={c.id}
            className={`relative aspect-video rounded-md border ${tone[c.status]} p-1.5`}
          >
            {/* fake scanlines */}
            <div
              className="absolute inset-1.5 rounded-sm opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0 2px, oklch(1 0 0 / 4%) 2px 3px)",
              }}
            />
            <div className="absolute inset-x-1.5 bottom-1 flex items-center justify-between font-mono text-[8px]">
              <span className="flex items-center gap-1 text-foreground">
                <span className={`size-1 rounded-full ${dot[c.status]}`} />
                {c.id}
              </span>
              {c.status === "alert" && (
                <span className="text-accent-red">!</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-md border border-accent-red/30 bg-accent-red/10 px-3 py-2 text-xs">
        <span className="font-mono text-accent-red">JNK-03 · crowd density</span>
        <span className="font-mono text-muted-foreground">3.2× normal</span>
      </div>
    </div>
  );
}
