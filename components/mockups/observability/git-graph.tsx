import { cn } from "@/lib/utils";

type Node = {
  branch: 0 | 1 | 2; // column 0 = main, 1 = canary, 2 = experiment
  sha: string;
  msg: string;
  who: string;
  tone?: "teal" | "purple" | "amber";
};

const nodes: Node[] = [
  { branch: 0, sha: "a3f1c8e", msg: "release: cold-chain-v4 promoted", who: "OneIoT bot", tone: "teal" },
  { branch: 1, sha: "f24bc91", msg: "canary: enable streaming SQL on v4", who: "Priya N." },
  { branch: 0, sha: "9c2e4ba", msg: "feat: tighten temp_max to 1.5°C", who: "Sam L.", tone: "amber" },
  { branch: 2, sha: "8e7d3a1", msg: "experiment: adaptive defrost interval", who: "Arjun K.", tone: "purple" },
  { branch: 0, sha: "5fa1c02", msg: "fix: revert v3.1 over-temp regression", who: "Sam L." },
  { branch: 0, sha: "c0d4e88", msg: "chore: rotate edge gateway certs", who: "OneIoT bot" },
];

const COL_X = [16, 36, 56];
const ROW_H = 36;

const toneFill: Record<NonNullable<Node["tone"]>, string> = {
  teal: "fill-accent-teal",
  purple: "fill-accent-purple",
  amber: "fill-accent-amber",
};

const toneStroke = ["stroke-foreground/50", "stroke-accent-purple/60", "stroke-accent-amber/60"];

/**
 * Git graph — branching commit history visualization with 3 lanes
 * (main / canary / experiment), showing how config versions move
 * through release stages.
 */
export function GitGraph({ className }: { className?: string }) {
  const h = nodes.length * ROW_H + 20;
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="text-base font-semibold text-foreground">
          Config history
        </div>
        <span className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          last 6 commits
        </span>
      </div>

      <div className="grid grid-cols-[80px_1fr] gap-3 font-mono text-[11px]">
        {/* graph svg */}
        <svg width="80" height={h} viewBox={`0 0 80 ${h}`}>
          {/* vertical lanes — main is solid, others dashed */}
          <line x1={COL_X[0]} x2={COL_X[0]} y1="0" y2={h} className={toneStroke[0]} strokeWidth="1" />
          <line x1={COL_X[1]} x2={COL_X[1]} y1={ROW_H * 0.5} y2={ROW_H * 2.5} className={toneStroke[1]} strokeWidth="1" strokeDasharray="3 3" />
          <line x1={COL_X[2]} x2={COL_X[2]} y1={ROW_H * 2.5} y2={ROW_H * 4.5} className={toneStroke[2]} strokeWidth="1" strokeDasharray="3 3" />
          {/* branch merge curves */}
          <path d={`M ${COL_X[1]} ${ROW_H * 0.5} Q ${COL_X[0]} ${ROW_H * 0.5}, ${COL_X[0]} ${ROW_H * 1.2}`} className={toneStroke[1]} strokeWidth="1" fill="none" strokeDasharray="3 3" />
          <path d={`M ${COL_X[2]} ${ROW_H * 2.5} Q ${COL_X[0]} ${ROW_H * 2.5}, ${COL_X[0]} ${ROW_H * 4.2}`} className={toneStroke[2]} strokeWidth="1" fill="none" strokeDasharray="3 3" />

          {/* nodes */}
          {nodes.map((n, i) => (
            <circle
              key={n.sha}
              cx={COL_X[n.branch]}
              cy={ROW_H * (i + 0.5)}
              r="4.5"
              className={n.tone ? toneFill[n.tone] : "fill-foreground"}
              stroke="var(--surface)"
              strokeWidth="2"
            />
          ))}
        </svg>

        {/* commit list */}
        <ul>
          {nodes.map((n, i) => (
            <li key={n.sha} className="flex items-center gap-3" style={{ height: ROW_H }}>
              <span className="rounded-sm border border-border bg-background/60 px-1.5 py-0.5 text-[9px] text-muted-foreground">
                {n.sha}
              </span>
              <span className="flex-1 truncate text-foreground">{n.msg}</span>
              <span className="hidden text-[10px] text-muted-foreground md:inline">
                {n.who}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* legend */}
      <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 font-mono text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-foreground" /> main
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent-purple" /> canary
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent-amber" /> experiment
        </span>
      </div>
    </div>
  );
}
