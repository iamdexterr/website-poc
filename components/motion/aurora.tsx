import { cn } from "@/lib/utils";

/**
 * Atmospheric background — two slow-drifting blurred orbs in
 * brand colors. Place inside a `relative overflow-hidden` parent;
 * everything else goes on top with `relative z-10`.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      {/* teal orb — top-right */}
      <div
        className="absolute -right-32 -top-32 size-[36rem] animate-aurora-1 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.82 0.14 180 / 0.7) 0%, transparent 70%)",
        }}
      />
      {/* purple orb — bottom-left */}
      <div
        className="absolute -bottom-40 -left-32 size-[34rem] animate-aurora-2 rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.74 0.16 295 / 0.6) 0%, transparent 70%)",
        }}
      />
      {/* center wash for warmth */}
      <div
        className="absolute left-1/2 top-1/3 size-[24rem] -translate-x-1/2 animate-aurora-3 rounded-full opacity-20 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.16 162 / 0.4) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
