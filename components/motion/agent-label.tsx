import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

type Tone =
  | "teal"
  | "green"
  | "amber"
  | "red"
  | "orange"
  | "purple"
  | "blue"
  | "muted";

const toneClasses: Record<Tone, string> = {
  teal: "text-accent-teal bg-accent-teal/10 border-accent-teal/25",
  green: "text-accent-green bg-accent-green/10 border-accent-green/25",
  amber: "text-accent-amber bg-accent-amber/10 border-accent-amber/25",
  red: "text-accent-red bg-accent-red/10 border-accent-red/25",
  orange: "text-accent-orange bg-accent-orange/10 border-accent-orange/25",
  purple: "text-accent-purple bg-accent-purple/10 border-accent-purple/25",
  blue: "text-accent-blue bg-accent-blue/10 border-accent-blue/25",
  muted: "text-muted-foreground bg-surface-elevated border-border",
};

/**
 * Floating live-state label — "SENDING…", "ANALYZING", "RESEARCHING".
 * Mirrors the chrome on CallSine mockups.
 */
export function AgentLabel({
  children,
  tone = "muted",
  loading = false,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  loading?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-1.5 rounded-md border px-2 py-1",
        toneClasses[tone],
        className,
      )}
    >
      {loading && <Spinner size={10} />}
      {children}
    </span>
  );
}
