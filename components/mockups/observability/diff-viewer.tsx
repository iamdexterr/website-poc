import { cn } from "@/lib/utils";

type Line = {
  n?: number;
  type: "ctx" | "add" | "del" | "hunk";
  content: React.ReactNode;
};

const lines: Line[] = [
  { type: "hunk", content: "@@ cold-chain-profile · v3 → v4 @@" },
  { n: 1, type: "ctx", content: <>{"{"}</> },
  {
    n: 2,
    type: "ctx",
    content: (
      <>
        {"  "}
        <span className="text-foreground">&quot;telemetry_interval&quot;</span>
        <span className="text-muted-foreground">: </span>
        <span className="text-accent-amber">30</span>
        <span className="text-muted-foreground">s,</span>
      </>
    ),
  },
  {
    n: 3,
    type: "del",
    content: (
      <>
        {"  "}
        <span className="text-foreground">&quot;temp_max&quot;</span>
        <span className="text-muted-foreground">: </span>
        <span className="text-accent-amber">2.0</span>
        <span className="text-muted-foreground"> °C,</span>
      </>
    ),
  },
  {
    n: 3,
    type: "add",
    content: (
      <>
        {"  "}
        <span className="text-foreground">&quot;temp_max&quot;</span>
        <span className="text-muted-foreground">: </span>
        <span className="text-accent-amber">1.5</span>
        <span className="text-muted-foreground"> °C,</span>
      </>
    ),
  },
  {
    n: 4,
    type: "add",
    content: (
      <>
        {"  "}
        <span className="text-foreground">&quot;defrost_interval&quot;</span>
        <span className="text-muted-foreground">: </span>
        <span className="text-accent-amber">8</span>
        <span className="text-muted-foreground">h,</span>
      </>
    ),
  },
  {
    n: 5,
    type: "ctx",
    content: (
      <>
        {"  "}
        <span className="text-foreground">&quot;ota_channel&quot;</span>
        <span className="text-muted-foreground">: </span>
        <span className="text-accent-green">&quot;stable&quot;</span>
      </>
    ),
  },
  { n: 6, type: "ctx", content: <>{"}"}</> },
];

const gutterClass: Record<Line["type"], string> = {
  ctx: "text-muted-foreground bg-transparent",
  add: "text-accent-green bg-accent-green/10",
  del: "text-accent-red bg-accent-red/10",
  hunk: "text-accent-purple bg-accent-purple/5",
};

const rowBg: Record<Line["type"], string> = {
  ctx: "",
  add: "bg-accent-green/8",
  del: "bg-accent-red/8",
  hunk: "bg-accent-purple/5",
};

const marker: Record<Line["type"], string> = {
  ctx: " ",
  add: "+",
  del: "−",
  hunk: " ",
};

/**
 * Unified diff viewer — line numbers, +/− gutters with red/green
 * row backgrounds, hunk header banner. Used to show config changes
 * before they go to the fleet.
 */
export function DiffViewer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl",
        className,
      )}
    >
      {/* chrome */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm">
          <span className="rounded-md border border-accent-purple/30 bg-accent-purple/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-purple">
            DIFF
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            cold-chain-profile.json
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span className="text-accent-green">+2</span>
          <span className="text-accent-red">−1</span>
        </div>
      </div>

      <pre className="overflow-hidden font-mono text-[11px] leading-relaxed">
        {lines.map((l, i) => (
          <div
            key={i}
            className={cn(
              "grid grid-cols-[2.4rem_1.2rem_1fr] items-baseline",
              rowBg[l.type],
            )}
          >
            <span
              className={cn(
                "select-none px-2 py-0.5 text-right text-[10px]",
                gutterClass[l.type],
              )}
            >
              {l.type === "hunk" ? "@@" : l.n ?? ""}
            </span>
            <span
              className={cn(
                "select-none px-1 py-0.5 text-center",
                l.type === "add"
                  ? "text-accent-green"
                  : l.type === "del"
                  ? "text-accent-red"
                  : "text-muted-foreground",
              )}
            >
              {marker[l.type]}
            </span>
            <span
              className={cn(
                "py-0.5 pr-3",
                l.type === "hunk" ? "text-accent-purple" : "text-foreground",
              )}
            >
              {l.content}
            </span>
          </div>
        ))}
      </pre>

      <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-amber" />
          AWAITING REVIEW · 2 approvers
        </span>
        <button
          type="button"
          className="rounded-md border border-border bg-background/60 px-2 py-1 hover:text-foreground"
        >
          Approve & roll out
        </button>
      </div>
    </div>
  );
}
