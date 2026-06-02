import { AgentLabel } from "@/components/motion/agent-label";
import { GradientLine } from "@/components/motion/gradient-line";
import { cn } from "@/lib/utils";

type Source = { label: string; loading?: boolean };

const defaultSources: Source[] = [
  { label: "WEBSITE" },
  { label: "COMPANY INFORMATION" },
  { label: "LINKEDIN PROFILE", loading: true },
];

/**
 * "Research agent" mockup — prospect card with source-discovery sidebar
 * and the signature purple/orange gradient sweep underneath.
 */
export function ContactCard({
  name = "Prospect Name",
  role = "Job Position and Company",
  sources = defaultSources,
  className,
}: {
  name?: string;
  role?: string;
  sources?: Source[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-6 rounded-2xl border border-border bg-surface p-6",
        className,
      )}
    >
      <ul className="flex w-40 flex-col gap-2 pt-2">
        {sources.map((s) => (
          <li key={s.label}>
            <AgentLabel tone={s.loading ? "muted" : "muted"} loading={s.loading}>
              {s.label}
            </AgentLabel>
          </li>
        ))}
      </ul>
      <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background/60 p-6">
        <div className="flex items-start gap-3">
          <div className="size-12 rounded-full bg-surface-elevated" />
          <div className="space-y-1">
            <div className="text-sm font-semibold text-foreground">{name}</div>
            <div className="text-xs text-muted-foreground">{role}</div>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="h-2 w-3/4 rounded-full bg-surface-elevated" />
          <div className="h-2 w-2/4 rounded-full bg-surface-elevated" />
        </div>
        <GradientLine className="absolute inset-x-6 bottom-4" />
      </div>
    </div>
  );
}
