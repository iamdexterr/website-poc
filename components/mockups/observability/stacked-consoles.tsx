import { cn } from "@/lib/utils";

function CursorIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M5 3 L19 12 L12 14 L9 21 Z"
        fill="white"
        stroke="black"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Stacked floating consoles — two macOS-style windows offset behind each
 * other, each with a named-agent chip and a cursor hovering over it.
 * Inspired by Daytona's Computer Use Sandbox graphic.
 */
export function StackedConsoles({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex gap-4 rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      {/* left sidebar of tools — a connected vertical "dock" */}
      <div className="hidden w-24 shrink-0 flex-col gap-3 rounded-xl border border-border bg-background/60 p-3 md:flex">
        {[
          { label: "Device", icon: "▢", active: true },
          { label: "Edge", icon: "✦" },
          { label: "Shell", icon: "⌘" },
        ].map((t) => (
          <button
            key={t.label}
            type="button"
            className={cn(
              "flex w-full flex-col items-center gap-1 rounded-lg border px-2 py-2 transition-colors",
              t.active
                ? "border-accent-teal/30 bg-accent-teal/10 text-accent-teal"
                : "border-transparent text-muted-foreground hover:bg-surface-elevated hover:text-foreground",
            )}
          >
            <span className="text-base leading-none">{t.icon}</span>
            <span className="text-[10px] font-medium">{t.label}</span>
          </button>
        ))}
      </div>

      {/* console stage */}
      <div className="relative flex-1">
        {/* Back window — terminal */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-background shadow-lg">
          <div className="relative flex items-center border-b border-border bg-surface-elevated px-3 py-2">
            <div className="flex gap-1.5">
              <div className="size-2.5 rounded-full bg-accent-red/60" />
              <div className="size-2.5 rounded-full bg-accent-amber/60" />
              <div className="size-2.5 rounded-full bg-accent-green/60" />
            </div>
            <div className="absolute inset-x-0 text-center font-mono text-[11px] text-muted-foreground">
              terminal
            </div>
          </div>
          <div className="space-y-1 px-4 py-5 font-mono text-xs">
            <div>
              <span className="text-accent-teal">user@user-mac:</span>{" "}
              <span className="text-muted-foreground">~</span>{" "}
              <span className="text-foreground">oneiot</span>
            </div>
            <div>
              <span className="text-accent-teal">user@user-mac:</span>{" "}
              <span className="text-muted-foreground">~</span>{" "}
              <span className="text-accent-purple">new</span>{" "}
              <span className="text-accent-amber">DeviceAgent</span>
              <span className="text-foreground">(sandbox)</span>
            </div>
            {/* spacer so the window has visual mass */}
            <div className="h-20" />
          </div>

          {/* cursor + agent chip on the terminal */}
          <div className="absolute left-[18%] top-[58%]">
            <CursorIcon />
            <div className="absolute left-3 top-3 whitespace-nowrap rounded-md bg-accent-blue px-2 py-1 font-mono text-[10px] font-medium text-background">
              AGENT_19HT50
            </div>
          </div>
        </div>

        {/* Front window — acme.co (offset more strongly so the stack reads) */}
        <div className="absolute -right-4 top-16 w-[70%] overflow-hidden rounded-xl border border-border-strong bg-background shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)]">
          <div className="relative flex items-center border-b border-border bg-surface-elevated px-3 py-2">
            <div className="flex gap-1.5">
              <div className="size-2.5 rounded-full bg-accent-red/60" />
              <div className="size-2.5 rounded-full bg-accent-amber/60" />
              <div className="size-2.5 rounded-full bg-accent-green/60" />
            </div>
            <div className="absolute inset-x-0 text-center font-mono text-[11px] text-muted-foreground">
              acme.co
            </div>
          </div>
          {/* fake page content */}
          <div className="space-y-2 p-4">
            <div className="h-3 w-2/3 rounded bg-surface-elevated" />
            <div className="h-3 w-1/2 rounded bg-surface-elevated" />
            <div className="mt-3 h-24 rounded-md border border-border bg-surface-elevated/60" />
          </div>

          {/* cursor + agent chip on the page */}
          <div className="absolute right-[22%] top-[20%]">
            <CursorIcon />
            <div className="absolute left-3 top-3 whitespace-nowrap rounded-md bg-accent-green px-2 py-1 font-mono text-[10px] font-medium text-background">
              AGENT_21H41C
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
