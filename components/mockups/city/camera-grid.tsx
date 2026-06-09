import { cn } from "@/lib/utils";

type Camera = { id: string; status: "ok" | "alert" | "offline"; zone: string };

const cameras: Camera[] = [
  { id: "JNK-01", status: "ok",      zone: "NORTH" },
  { id: "JNK-02", status: "ok",      zone: "NORTH" },
  { id: "JNK-03", status: "alert",   zone: "EAST"  },
  { id: "JNK-04", status: "ok",      zone: "EAST"  },
  { id: "JNK-05", status: "ok",      zone: "SOUTH" },
  { id: "JNK-06", status: "offline", zone: "SOUTH" },
  { id: "JNK-07", status: "ok",      zone: "WEST"  },
  { id: "JNK-08", status: "ok",      zone: "WEST"  },
];

const statusColor: Record<Camera["status"], string> = {
  ok:      "var(--accent-green)",
  alert:   "var(--accent-red)",
  offline: "var(--muted-foreground)",
};

const tileBorder: Record<Camera["status"], string> = {
  ok:      "border-accent-green/20",
  alert:   "border-accent-red/40",
  offline: "border-border/30",
};

export function CameraGrid({ className }: { className?: string }) {
  const alertCam = cameras.find((c) => c.status === "alert")!;

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-teal">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-teal" />
          OBSERVE · {cameras.length} FEEDS
        </span>
        <span className="rounded-full border border-border/40 bg-surface/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          ZONE · CENTRAL
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {cameras.map((c) => (
          <div
            key={c.id}
            className={`relative aspect-video overflow-hidden rounded-md border ${tileBorder[c.status]} bg-surface/20`}
          >
            <svg viewBox="0 0 40 24" className="h-full w-full" aria-hidden>
              <defs>
                <linearGradient id={`camGrad-${c.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={statusColor[c.status]} stopOpacity="0.04" />
                  <stop offset="100%" stopColor={statusColor[c.status]} stopOpacity="0.14" />
                </linearGradient>
              </defs>
              <rect width="40" height="24" fill={`url(#camGrad-${c.id})`} />
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={i}
                  x1="0" y1={i * 3} x2="40" y2={i * 3}
                  stroke="currentColor"
                  strokeWidth="0.3"
                  className="text-border/30"
                />
              ))}
              {c.status !== "offline" && (
                <rect x="3" y="3" width="8" height="5" rx="1"
                  fill="none" stroke={statusColor[c.status]} strokeWidth="0.7" strokeOpacity="0.7" />
              )}
              {c.status === "alert" && (
                <text x="20" y="13" textAnchor="middle" fontSize="5"
                  fill="var(--accent-red)" fontFamily="monospace" fontWeight="bold">!</text>
              )}
              {c.status === "offline" && (
                <line x1="12" y1="6" x2="28" y2="18" stroke="var(--muted-foreground)"
                  strokeWidth="0.8" strokeOpacity="0.4" />
              )}
            </svg>
            <div className="absolute inset-x-1 bottom-0.5 flex items-center justify-between">
              <span className="font-mono text-[6px] text-muted-foreground/70">{c.id}</span>
              <span
                className="size-1 rounded-full"
                style={{ background: statusColor[c.status], opacity: c.status === "ok" ? 0.7 : 1 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-accent-red/30 bg-accent-red/8 px-3 py-2">
        <span className="flex items-center gap-2 font-mono text-[10px] text-accent-red">
          <span className="size-1.5 animate-pulse rounded-full bg-accent-red" />
          {alertCam.id} · crowd density
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">3.2× normal</span>
      </div>
    </div>
  );
}
