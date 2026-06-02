import { FadeUp, Stagger, StaggerItem } from "@/components/motion/fade-up";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export type SolutionUseCase = {
  eyebrow: string;
  tone: "teal" | "green" | "blue" | "amber" | "purple" | "orange";
  title: string;
  body: string;
  metric: string;
};

export type SolutionUseCasesProps = {
  eyebrow: string;
  headline: React.ReactNode;
  body: string;
  cases: SolutionUseCase[];
};

const toneText: Record<SolutionUseCase["tone"], string> = {
  teal: "text-accent-teal",
  green: "text-accent-green",
  blue: "text-accent-blue",
  amber: "text-accent-amber",
  purple: "text-accent-purple",
  orange: "text-accent-orange",
};

export function SolutionUseCases({
  eyebrow,
  headline,
  body,
  cases,
}: SolutionUseCasesProps) {
  return (
    <section className="section-divide bg-dot-fade bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <FadeUp>
          <span className="label-mono text-accent-teal">{eyebrow}</span>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            {headline}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {body}
          </p>
        </FadeUp>

        <Stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {cases.map((c) => (
            <StaggerItem key={c.title}>
              <SpotlightCard
                tone={c.tone === "orange" ? "amber" : c.tone}
                className="flex h-full flex-col bg-surface p-7"
              >
                <span className={`label-mono ${toneText[c.tone]}`}>
                  {c.eyebrow}
                </span>
                <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
                <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-border bg-background/60 px-2.5 py-1.5 font-mono text-xs text-foreground">
                  <span
                    className={`size-1.5 rounded-full ${toneText[c.tone].replace("text-", "bg-")}`}
                  />
                  {c.metric}
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
