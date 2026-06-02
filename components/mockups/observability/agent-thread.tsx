import { cn } from "@/lib/utils";

/**
 * AI agent thread — Claude/Cursor-style conversation showing a user
 * question, an inline tool call with a result preview, and a final
 * assistant answer.
 */
export function AgentThread({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="text-base font-semibold text-foreground">
          Ask the fleet
        </div>
        <span className="rounded-md border border-accent-purple/30 bg-accent-purple/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-purple">
          AI · NL QUERY
        </span>
      </div>

      <div className="space-y-3">
        {/* user turn */}
        <div className="rounded-xl border border-border bg-background/60 p-3">
          <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="flex size-4 items-center justify-center rounded-sm bg-surface-elevated text-[9px]">
              U
            </span>
            you
          </div>
          <p className="text-xs leading-relaxed text-foreground">
            Why did pump-a7 fail twice this week?
          </p>
        </div>

        {/* tool call turn */}
        <div className="rounded-xl border border-accent-blue/25 bg-accent-blue/5 p-3">
          <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
            <span className="flex items-center gap-2 text-accent-blue">
              <span className="flex size-4 items-center justify-center rounded-sm bg-accent-blue/15 text-[9px]">
                ⚙
              </span>
              tool · query_telemetry
            </span>
            <span className="text-muted-foreground">2.4s · 1.2k rows</span>
          </div>
          <pre className="overflow-hidden font-mono text-[10px] text-muted-foreground">
{`SELECT vibration, bearing_temp FROM pump_a7
 WHERE ts > now() - interval '7 days'
   AND state = 'fault'`}
          </pre>
        </div>

        {/* assistant turn */}
        <div className="rounded-xl border border-accent-purple/25 bg-accent-purple/5 p-3">
          <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-accent-purple">
            <span className="flex size-4 items-center justify-center rounded-sm bg-accent-purple/15 text-[9px]">
              ◆
            </span>
            oneiot · ai
          </div>
          <p className="text-xs leading-relaxed text-foreground">
            Both failures correlated with{" "}
            <span className="text-accent-amber">bearing temp ▲ 18%</span> in the
            45 min prior. Recommend reducing RPM to{" "}
            <span className="text-foreground">1,400</span> and scheduling a
            bearing inspection within 6h.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-2">
        <span className="flex-1 font-mono text-xs text-muted-foreground">
          Ask anything
          <span className="ml-0.5 inline-block h-3 w-px animate-pulse-dot bg-accent-teal align-middle" />
        </span>
        <kbd className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          ⌘ ↵
        </kbd>
      </div>
    </div>
  );
}
