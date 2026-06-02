import { cn } from "@/lib/utils";

type Device = {
  initials: string;
  name: string;
  role: string;
  protocol: string;
  site: string;
};

const devices: Device[] = [
  {
    initials: "PA",
    name: "PUMP-A7",
    role: "BLR · STATION-04",
    protocol: "MQTT_5",
    site: "blr-04",
  },
  {
    initials: "CH",
    name: "CHILLER-3",
    role: "BLR · DC-12",
    protocol: "MODBUS",
    site: "dc-12",
  },
];

type Status = { kind: "written" | "sent" };
type Action = {
  label: string;
  tone: "blue" | "amber";
  emailStatus: Status;
  ruleStatus: Status;
};

const actions: Action[] = [
  {
    label: "AGENT: PUMP MAINTENANCE",
    tone: "blue",
    emailStatus: { kind: "written" },
    ruleStatus: { kind: "sent" },
  },
  {
    label: "AGENT: COLD CHAIN SLA",
    tone: "amber",
    emailStatus: { kind: "sent" },
    ruleStatus: { kind: "sent" },
  },
];

// Agent card chrome (label + outer ring) — color-coded per tone
const cardTone: Record<Action["tone"], string> = {
  blue: "border-accent-blue/35 ring-1 ring-accent-blue/15",
  amber: "border-accent-amber/35 ring-1 ring-accent-amber/15",
};

// Inner pill: written = outlined, sent = filled — both color-coded
const pillTone: Record<Action["tone"], { written: string; sent: string }> = {
  blue: {
    written:
      "border-accent-blue/40 bg-accent-blue/10 text-accent-blue",
    sent: "border-accent-blue/40 bg-accent-blue/20 text-accent-blue",
  },
  amber: {
    written:
      "border-accent-amber/40 bg-accent-amber/10 text-accent-amber",
    sent: "border-accent-amber/40 bg-accent-amber/20 text-accent-amber",
  },
};

const labelHeaderTone: Record<Action["tone"], string> = {
  blue: "border-accent-blue/35 text-accent-blue",
  amber: "border-accent-amber/35 text-accent-amber",
};

function StatusPill({
  tone,
  kind,
}: {
  tone: Action["tone"];
  kind: Status["kind"];
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-wider",
        kind === "written" ? pillTone[tone].written : pillTone[tone].sent,
      )}
    >
      <span aria-hidden>{kind === "written" ? "✎" : "✓"}</span>
      {kind === "written" ? "Written" : "Sent"}
    </span>
  );
}

/**
 * Two device cards in a top row feed two color-coded "agent" status
 * cards in a bottom row, connected by down arrows. Each agent card has
 * a tinted ring + label header to make the color coding pop.
 */
export function ParallelAgentPipeline({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-dot-grid relative overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-2xl",
        className,
      )}
    >
      {/* top row — two device cards */}
      <div className="grid grid-cols-2 gap-4">
        {devices.map((d) => (
          <div
            key={d.name}
            className="rounded-xl border border-border bg-background/60 p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-12 items-center justify-center rounded-full border border-border bg-surface-elevated font-mono text-xs text-foreground">
                {d.initials}
              </div>
              <div>
                <div className="font-mono text-sm font-semibold text-foreground">
                  {d.name}
                </div>
                <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                  {d.role}
                </div>
              </div>
            </div>
            <div className="my-4 h-px bg-border" />
            <div className="space-y-1 font-mono text-[10px]">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">⌘</span>
                <span className="text-foreground">{d.protocol}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">✦</span>
                <span className="text-foreground">{d.site}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* arrows down */}
      <div className="my-3 grid grid-cols-2 gap-4">
        {devices.map((_, i) => (
          <div key={i} className="flex justify-center">
            <svg
              width="10"
              height="34"
              viewBox="0 0 10 34"
              fill="none"
              aria-hidden
            >
              <line
                x1="5"
                y1="0"
                x2="5"
                y2="28"
                stroke="var(--muted-foreground)"
                strokeOpacity="0.6"
                strokeWidth="1.2"
              />
              <path
                d="M1 28 l 4,5 l 4,-5"
                stroke="var(--muted-foreground)"
                strokeOpacity="0.6"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* bottom row — two agent cards with strong tinted treatment */}
      <div className="grid grid-cols-2 gap-4">
        {actions.map((a) => (
          <div
            key={a.label}
            className={cn(
              "overflow-hidden rounded-xl border bg-background/60",
              cardTone[a.tone],
            )}
          >
            {/* header banner — color-coded */}
            <div
              className={cn(
                "flex items-center gap-2 border-b px-3 py-2 font-mono text-[11px] tracking-wider",
                labelHeaderTone[a.tone],
              )}
            >
              <span aria-hidden>◆</span>
              {a.label}
            </div>

            {/* status rows */}
            <ul className="divide-y divide-border">
              <li className="flex items-center justify-between px-3 py-2.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  ALERT EMAIL
                </span>
                <StatusPill tone={a.tone} kind={a.emailStatus.kind} />
              </li>
              <li className="flex items-center justify-between px-3 py-2.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  RULE PUSHED
                </span>
                <StatusPill tone={a.tone} kind={a.ruleStatus.kind} />
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
