import { cn } from "@/lib/utils";

/**
 * Stacked "rollout activity" cards — one floating slightly behind the other,
 * showing a config rollout starting and a partial-failure progress bar.
 * Mirrors Vercel's PR review activity card.
 */
export function OtaRolloutCards({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* back card */}
      <div className="rounded-2xl border border-border bg-surface px-5 py-4 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          <span className="rounded-md bg-accent-green/15 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-accent-green">
            Open
          </span>
          <span className="font-semibold text-foreground">
            Pushing cold-chain config v3
          </span>
          <span className="ml-auto font-mono text-xs text-muted-foreground">
            #8417
          </span>
        </div>
      </div>

      {/* front card — overlaps the back card */}
      <div className="-mt-3 ml-6 rounded-2xl border border-border bg-surface p-5 shadow-2xl">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex size-6 items-center justify-center rounded-md bg-foreground text-background">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 4 L20 18 L4 18 Z" />
            </svg>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
              stroke="var(--muted-foreground)"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="3" stroke="var(--muted-foreground)" strokeWidth="1.5" />
          </svg>
          <span className="font-semibold text-foreground">OneIoT</span>
          <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            bot
          </span>
          <span className="text-muted-foreground">started rollout</span>
          <span className="ml-auto font-mono text-xs underline decoration-dotted text-muted-foreground">
            now
          </span>
        </div>

        {/* full green bar */}
        <div className="mt-3 h-3 overflow-hidden rounded-md bg-accent-green/40 ring-1 ring-accent-green/60">
          <div className="h-full w-1/4 bg-accent-green/80" />
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm">
          <div className="flex size-6 items-center justify-center rounded-md bg-foreground text-background">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 4 L20 18 L4 18 Z" />
            </svg>
          </div>
          <span className="font-semibold text-foreground">OneIoT</span>
          <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            bot
          </span>
          <span className="ml-auto font-mono text-xs underline decoration-dotted text-muted-foreground">
            now
          </span>
        </div>

        {/* split red/green bar */}
        <div className="mt-3 flex h-3 overflow-hidden rounded-md ring-1 ring-accent-green/60">
          <div className="h-full w-[28%] bg-accent-red/60" />
          <div className="h-full flex-1 bg-accent-green/40" />
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="rounded-md border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-elevated"
          >
            Retry failed devices
          </button>
        </div>
      </div>
    </div>
  );
}
