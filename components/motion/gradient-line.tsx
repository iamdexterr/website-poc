import { cn } from "@/lib/utils";

/**
 * The signature CallSine gradient sweep — a thin horizontal line with a
 * blurred purple-to-orange beam moving across it. Used under cards to
 * suggest "agent processing".
 */
export function GradientLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-px w-full overflow-hidden bg-border",
        className,
      )}
    >
      <div
        className="absolute inset-y-0 left-0 w-1/2 animate-gradient-sweep"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--accent-purple) 40%, var(--accent-orange) 60%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}
