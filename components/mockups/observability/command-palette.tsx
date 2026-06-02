import { cn } from "@/lib/utils";

type Cmd = {
  icon: string;
  label: string;
  hint: string;
  active?: boolean;
  group?: string;
};

const groups: { title: string; items: Cmd[] }[] = [
  {
    title: "DEVICES",
    items: [
      { icon: "◉", label: "Locate device by ID", hint: "G L", active: true },
      { icon: "◇", label: "Push config to fleet…", hint: "C F" },
      { icon: "✦", label: "Open device shell", hint: "⇧ S" },
    ],
  },
  {
    title: "WORKFLOWS",
    items: [
      { icon: "◬", label: "Run anomaly check", hint: "⌘ ⇧ A" },
      { icon: "◷", label: "Schedule OTA rollout", hint: "O T" },
    ],
  },
];

/**
 * Command palette modal — ⌘K-style searchable command picker with
 * grouped sections, active item highlight, and keyboard hints.
 */
export function CommandPalette({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl",
        className,
      )}
    >
      {/* search input */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="var(--muted-foreground)" strokeWidth="1.5" />
          <path
            d="M20 20l-3.5-3.5"
            stroke="var(--muted-foreground)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="flex-1 font-mono text-xs text-foreground">
          locate device
          <span className="ml-0.5 inline-block h-3 w-px animate-pulse-dot bg-accent-teal align-middle" />
        </span>
        <kbd className="rounded-md border border-border bg-background/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          esc
        </kbd>
      </div>

      {/* result list */}
      <div className="max-h-72 overflow-hidden p-1">
        {groups.map((g) => (
          <div key={g.title} className="mb-1">
            <div className="px-3 pb-1 pt-2 font-mono text-[9px] tracking-wider text-muted-foreground">
              {g.title}
            </div>
            <ul>
              {g.items.map((c) => (
                <li
                  key={c.label}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                    c.active
                      ? "bg-accent-teal/10 text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-xs",
                      c.active ? "text-accent-teal" : "text-muted-foreground",
                    )}
                  >
                    {c.icon}
                  </span>
                  <span className="flex-1">{c.label}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {c.hint}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[10px] text-muted-foreground">
        <span>
          <kbd className="rounded-sm border border-border px-1">↑</kbd>
          <kbd className="ml-1 rounded-sm border border-border px-1">↓</kbd>
          <span className="ml-2">navigate</span>
        </span>
        <span>
          <kbd className="rounded-sm border border-border px-1">↵</kbd>
          <span className="ml-1">select</span>
        </span>
      </div>
    </div>
  );
}
