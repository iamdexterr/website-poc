import { cn } from "@/lib/utils";

const tabs = ["curl", "node", "python"];

/**
 * API snippet card — language-tabbed code block with copy button.
 * Syntax-highlighted via inline span colors so SSR/CSR stay deterministic.
 */
export function ApiSnippet({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl",
        className,
      )}
    >
      {/* chrome */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex gap-3 font-mono text-xs">
          {tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              className={cn(
                "rounded-md px-2 py-1 transition-colors",
                i === 1
                  ? "bg-accent-teal/10 text-accent-teal"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            POST · /v1/devices
          </span>
          <button
            type="button"
            className="rounded-md border border-border bg-background/60 px-2 py-1 text-muted-foreground hover:text-foreground"
            aria-label="Copy"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="8" y="8" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 3H5v13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* code body */}
      <pre className="overflow-hidden p-5 font-mono text-[11px] leading-relaxed">
        <code>
          <span className="text-accent-purple">const</span>{" "}
          <span className="text-foreground">device</span>{" "}
          <span className="text-muted-foreground">=</span>{" "}
          <span className="text-accent-purple">await</span>{" "}
          <span className="text-foreground">oneiot</span>
          <span className="text-muted-foreground">.</span>
          <span className="text-accent-teal">devices</span>
          <span className="text-muted-foreground">.</span>
          <span className="text-accent-teal">create</span>
          <span className="text-muted-foreground">{"({"}</span>
          {"\n  "}
          <span className="text-foreground">name</span>
          <span className="text-muted-foreground">:</span>{" "}
          <span className="text-accent-green">&quot;chiller-3&quot;</span>
          <span className="text-muted-foreground">,</span>
          {"\n  "}
          <span className="text-foreground">protocol</span>
          <span className="text-muted-foreground">:</span>{" "}
          <span className="text-accent-green">&quot;mqtt-5&quot;</span>
          <span className="text-muted-foreground">,</span>
          {"\n  "}
          <span className="text-foreground">site</span>
          <span className="text-muted-foreground">:</span>{" "}
          <span className="text-accent-green">&quot;blr-04&quot;</span>
          <span className="text-muted-foreground">,</span>
          {"\n  "}
          <span className="text-foreground">thresholds</span>
          <span className="text-muted-foreground">: {"{"}</span>{" "}
          <span className="text-foreground">temp_max</span>
          <span className="text-muted-foreground">:</span>{" "}
          <span className="text-accent-amber">2.0</span>{" "}
          <span className="text-muted-foreground">{"}"}</span>
          <span className="text-muted-foreground">,</span>
          {"\n"}
          <span className="text-muted-foreground">{"});"}</span>
          {"\n\n"}
          <span className="text-muted-foreground">{"// → "}</span>
          <span className="text-accent-green">{"{ id: 'dev_8a3c…', status: 'provisioned' }"}</span>
        </code>
      </pre>

      {/* footer status */}
      <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-green" />
          200 OK · 84 ms
        </span>
        <span>rate · 2.1k req/s</span>
      </div>
    </div>
  );
}
