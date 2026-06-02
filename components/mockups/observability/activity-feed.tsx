import { cn } from "@/lib/utils";

type Event = {
  who: string;
  initials: string;
  action: React.ReactNode;
  time: string;
  tone: "teal" | "purple" | "green" | "amber" | "red" | "muted";
};

const events: Event[] = [
  {
    who: "OneIoT bot",
    initials: "◆",
    action: (
      <>
        rolled out{" "}
        <span className="font-mono text-foreground">cold-chain-v4</span> to 247 devices
      </>
    ),
    time: "now",
    tone: "teal",
  },
  {
    who: "Priya N.",
    initials: "PN",
    action: (
      <>
        approved{" "}
        <span className="font-mono text-foreground">#8417</span> with a comment
      </>
    ),
    time: "2m ago",
    tone: "green",
  },
  {
    who: "OneIoT AI",
    initials: "AI",
    action: (
      <>
        detected{" "}
        <span className="text-accent-amber">bearing temp ▲ 18%</span> on pump-a7
      </>
    ),
    time: "11m ago",
    tone: "purple",
  },
  {
    who: "Arjun K.",
    initials: "AK",
    action: <>opened a PR to add the warehouse-12 fleet</>,
    time: "32m ago",
    tone: "muted",
  },
  {
    who: "OneIoT bot",
    initials: "◆",
    action: (
      <>
        reverted{" "}
        <span className="font-mono text-foreground">cold-chain-v3.1</span> after 1 over-temp
      </>
    ),
    time: "1h ago",
    tone: "red",
  },
  {
    who: "Sam L.",
    initials: "SL",
    action: <>changed workspace policy: approval required for prod</>,
    time: "3h ago",
    tone: "amber",
  },
];

const toneAvatar: Record<Event["tone"], string> = {
  teal: "bg-accent-teal/15 text-accent-teal border-accent-teal/30",
  purple: "bg-accent-purple/15 text-accent-purple border-accent-purple/30",
  green: "bg-accent-green/15 text-accent-green border-accent-green/30",
  amber: "bg-accent-amber/15 text-accent-amber border-accent-amber/30",
  red: "bg-accent-red/15 text-accent-red border-accent-red/30",
  muted: "bg-surface-elevated text-muted-foreground border-border",
};

/**
 * Activity feed — vertical event stream with per-event avatars/icons,
 * one-line action descriptions, and timestamps. The audit-log feel.
 */
export function ActivityFeed({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-2xl",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="text-base font-semibold text-foreground">
          Workspace activity
        </div>
        <span className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          last 3h
        </span>
      </div>

      <ul className="space-y-3">
        {events.map((e, i) => (
          <li key={i} className="flex items-start gap-3">
            <div
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-md border font-mono text-[10px]",
                toneAvatar[e.tone],
              )}
            >
              {e.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground">{e.who}</span> {e.action}
              </p>
              <span className="mt-0.5 block font-mono text-[10px] text-muted-foreground">
                {e.time}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
