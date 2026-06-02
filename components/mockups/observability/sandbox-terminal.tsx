import { cn } from "@/lib/utils";

type Cmd = { cmd: React.ReactNode; err: string };

const commands: Cmd[] = [
  {
    cmd: (
      <>
        <span className="text-accent-green">echo</span>{" "}
        <span className="text-accent-green">$DEVICE_TOKEN</span>
      </>
    ),
    err: "Undefined",
  },
  {
    cmd: (
      <>
        psql <span className="text-accent-green">$TELEMETRY_URL</span>
      </>
    ),
    err: "Database connection blocked",
  },
  {
    cmd: (
      <>
        aws s3 <span className="text-accent-purple">ls</span>{" "}
        s3://prod-fleet-config
      </>
    ),
    err: "Cloud resources isolated",
  },
  {
    cmd: (
      <>
        <span className="text-accent-purple">cat</span> ~/.ssh/id_rsa
      </>
    ),
    err: "SSH keys not accessible",
  },
];

/**
 * Edge Sandbox terminal — macOS-style window showing a protected
 * production shell where common escalation attempts safely fail.
 * Mirrors Vercel's Sandbox mockup, adapted for edge device fleets.
 */
export function SandboxTerminal({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* "wire + sparkle" floating connector — purely decorative */}
      <div className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <div className="flex flex-col items-center">
          <div className="flex size-11 items-center justify-center rounded-xl border border-border-strong bg-surface-elevated">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 3 L13.2 9.8 L20 11 L13.2 12.2 L12 19 L10.8 12.2 L4 11 L10.8 9.8 Z"
                fill="var(--accent-amber)"
              />
              <path
                d="M18 4 L18.5 6.5 L21 7 L18.5 7.5 L18 10 L17.5 7.5 L15 7 L17.5 6.5 Z"
                fill="var(--accent-amber)"
                opacity="0.7"
              />
            </svg>
          </div>
          <div className="h-12 w-px bg-accent-amber/60" />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
        {/* window chrome */}
        <div className="relative flex items-center border-b border-border bg-surface-elevated px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-accent-red/60" />
            <div className="size-2.5 rounded-full bg-accent-amber/60" />
            <div className="size-2.5 rounded-full bg-accent-green/60" />
          </div>
          <div className="absolute inset-x-0 text-center font-mono text-xs text-muted-foreground">
            OneIoT Edge Sandbox
          </div>
        </div>

        {/* terminal body */}
        <div className="space-y-5 p-6 font-mono text-xs leading-relaxed">
          <div className="text-muted-foreground">
            # Production Environment:{" "}
            <span className="text-accent-green">✓ Protected</span>
          </div>
          {commands.map((c, i) => (
            <div key={i} className="space-y-1">
              <div className="text-foreground">
                <span className="text-muted-foreground">$</span> {c.cmd}
              </div>
              <div className="text-foreground">
                <span className="text-accent-red">✗</span> Error: {c.err}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
