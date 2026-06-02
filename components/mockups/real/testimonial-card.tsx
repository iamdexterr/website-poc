import Image from "next/image";
import { cn } from "@/lib/utils";

export type TestimonialCardProps = {
  className?: string;
  quote?: string;
  authorName?: string;
  authorRole?: string;
  authorCompany?: string;
  authorPhoto?: string;
  companyAccent?: "teal" | "purple" | "amber" | "blue";
};

const accentClass: Record<NonNullable<TestimonialCardProps["companyAccent"]>, string> = {
  teal: "text-accent-teal",
  purple: "text-accent-purple",
  amber: "text-accent-amber",
  blue: "text-accent-blue",
};

/**
 * Testimonial card — large quote on top, customer headshot + identity
 * on the bottom-left, optional company accent mark on the right.
 */
export function TestimonialCard({
  className,
  quote = "OneIoT collapsed three weeks of integration work into an afternoon. The audit-gated rollouts are the single biggest reason our risk team approved IoT in production at all.",
  authorName = "Priya Narayanan",
  authorRole = "VP Engineering",
  authorCompany = "Coldhaul Logistics",
  authorPhoto = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=240&q=80",
  companyAccent = "teal",
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-8 shadow-2xl",
        className,
      )}
    >
      <div>
        <svg
          width="28"
          height="22"
          viewBox="0 0 28 22"
          aria-hidden
          className="text-border-strong"
        >
          <path
            d="M0 22V12C0 6 4 1 11 0v4C7 5 5 8 5 12h6v10H0zM17 22V12C17 6 21 1 28 0v4c-4 1-6 4-6 8h6v10H17z"
            fill="currentColor"
          />
        </svg>
        <blockquote className="mt-5 text-lg leading-relaxed text-foreground">
          “{quote}”
        </blockquote>
      </div>

      <figcaption className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative size-12 overflow-hidden rounded-full border border-border-strong">
            <Image
              src={authorPhoto}
              alt={authorName}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              {authorName}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              {authorRole} ·{" "}
              <span className={accentClass[companyAccent]}>
                {authorCompany}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground md:block">
          ◆ Customer since 2024
        </div>
      </figcaption>
    </figure>
  );
}
