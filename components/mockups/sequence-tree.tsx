import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

function ChannelCard({
  channel,
  day = 1,
}: {
  channel: "EMAIL" | "LINKEDIN";
  day?: number;
}) {
  const icon = channel === "EMAIL" ? "✉" : "in";
  return (
    <div className="w-44 rounded-xl border border-border bg-surface p-3">
      <div className="mb-3 flex items-center justify-between text-[10px] font-medium tracking-wide text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="font-mono">{icon}</span>
          {channel}
        </span>
        <span>◷ DAY {day}</span>
      </div>
      <div className="space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-surface-elevated" />
        <div className="h-1.5 w-4/5 rounded-full bg-surface-elevated" />
        <div className="h-1.5 w-3/5 rounded-full bg-surface-elevated" />
      </div>
    </div>
  );
}

/**
 * "Sending agent" mockup — a SENDING label branching down into
 * EMAIL + LINKEDIN channel cards.
 */
export function SequenceTree({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8",
        className,
      )}
    >
      <AgentLabel tone="green" loading>
        SENDING…
      </AgentLabel>

      {/* connector lines */}
      <div className="relative h-6 w-48">
        <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-border" />
        <div className="absolute left-6 top-3 h-px w-[calc(50%-1.5rem)] bg-border" />
        <div className="absolute right-6 top-3 h-px w-[calc(50%-1.5rem)] bg-border" />
        <div className="absolute left-6 top-3 h-3 w-px bg-border" />
        <div className="absolute right-6 top-3 h-3 w-px bg-border" />
      </div>

      <div className="flex gap-4">
        <ChannelCard channel="EMAIL" />
        <ChannelCard channel="LINKEDIN" />
      </div>
    </div>
  );
}
