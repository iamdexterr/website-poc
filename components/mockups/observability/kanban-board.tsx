import { cn } from "@/lib/utils";

type Card = { id: string; title: string; tag?: string; tone?: "teal" | "amber" | "purple" | "green" };

const columns: { title: string; count: number; cards: Card[]; accent: string }[] = [
  {
    title: "QUEUED",
    count: 3,
    accent: "text-muted-foreground",
    cards: [
      { id: "RLT-218", title: "Push cold-chain-v4 to BLR fleet", tag: "247 devices", tone: "teal" },
      { id: "RLT-219", title: "Add greenhouse-12 to monitoring", tag: "new fleet", tone: "green" },
      { id: "RLT-220", title: "Rotate edge gateway certs" },
    ],
  },
  {
    title: "IN PROGRESS",
    count: 2,
    accent: "text-accent-teal",
    cards: [
      { id: "RLT-216", title: "Canary cold-chain-v4 to 12 devices", tag: "ack 84%", tone: "teal" },
      { id: "RLT-215", title: "Retraining anomaly model · pump-a7", tag: "ml", tone: "purple" },
    ],
  },
  {
    title: "DONE",
    count: 2,
    accent: "text-accent-green",
    cards: [
      { id: "RLT-214", title: "OTA firmware to street-light fleet", tag: "1.2k devices · ok", tone: "green" },
      { id: "RLT-213", title: "Migrate audit log to SIEM", tag: "shipped", tone: "green" },
    ],
  },
];

const tagTone: Record<NonNullable<Card["tone"]>, string> = {
  teal: "border-accent-teal/30 bg-accent-teal/10 text-accent-teal",
  amber: "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
  purple: "border-accent-purple/30 bg-accent-purple/10 text-accent-purple",
  green: "border-accent-green/30 bg-accent-green/10 text-accent-green",
};

/**
 * Kanban board mockup — 3 columns (QUEUED / IN PROGRESS / DONE) of
 * draggable-feeling cards. Used to show rollout pipeline state.
 */
export function KanbanBoard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="text-base font-semibold text-foreground">
          Rollout pipeline
        </div>
        <span className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          all fleets
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {columns.map((col) => (
          <div key={col.title} className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className={cn("label-mono", col.accent)}>{col.title}</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {col.count}
              </span>
            </div>
            <ul className="space-y-2">
              {col.cards.map((c) => (
                <li
                  key={c.id}
                  className="rounded-lg border border-border bg-background/60 p-2.5"
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-muted-foreground">
                      {c.id}
                    </span>
                    {c.tag && (
                      <span
                        className={cn(
                          "rounded-sm border px-1.5 py-px font-mono text-[8px]",
                          c.tone ? tagTone[c.tone] : "border-border bg-surface text-muted-foreground",
                        )}
                      >
                        {c.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] leading-snug text-foreground">
                    {c.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
