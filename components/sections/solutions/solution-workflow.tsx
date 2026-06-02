import { FadeUp } from "@/components/motion/fade-up";
import {
  AgentGridShell,
  type AgentGridCell,
} from "@/components/sections/agent-grid";

export type SolutionWorkflowProps = {
  eyebrow: string;
  headline: React.ReactNode;
  sub: string;
  cells: AgentGridCell[];
};

export function SolutionWorkflow({
  eyebrow,
  headline,
  sub,
  cells,
}: SolutionWorkflowProps) {
  return (
    <section id="workflow" className="section-divide bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">{eyebrow}</span>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            {headline}
          </h2>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {sub}
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-12">
            <AgentGridShell cells={cells} />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
