import { AgentLabel } from "@/components/motion/agent-label";
import { cn } from "@/lib/utils";

/**
 * "Writing agent" mockup — email composition with toggleable tabs
 * (sales asset / case study) above the body.
 */
export function EmailPreview({
  className,
  recipient = "Alex",
  highlight = "report about the salaries of software engineers in LATAM.",
  activeTab = "asset",
}: {
  className?: string;
  recipient?: string;
  highlight?: string;
  activeTab?: "asset" | "case";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-end gap-2">
        <AgentLabel tone={activeTab === "asset" ? "orange" : "muted"}>
          ◇ SALES ASSET
        </AgentLabel>
        <AgentLabel tone={activeTab === "case" ? "orange" : "muted"}>
          ◎ CASE STUDY
        </AgentLabel>
      </div>
      <div className="space-y-3 rounded-xl border border-border bg-background/60 p-5 text-sm leading-relaxed">
        <p className="text-foreground">Hi {recipient},</p>
        <p className="text-muted-foreground">
          I&apos;ve just finished a{" "}
          <span className="text-accent-orange">{highlight}</span>
        </p>
        <p className="text-muted-foreground">Would you like to have a look?</p>
        <p className="text-muted-foreground">
          The talent pool of software engineers is super strong —{" "}
          <span className="text-foreground">Google</span> (who we have worked with)
          have their hubs here.
        </p>
        <p className="text-muted-foreground">
          If yes, just let me know and I&apos;ll send over the report.
        </p>
      </div>
    </div>
  );
}
