import Image from "next/image";
import { cn } from "@/lib/utils";

export type ProductShowcaseCardProps = {
  className?: string;
  title?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Where the device sits inside the card — affects image positioning */
  imagePosition?: "bottom" | "right" | "center";
};

/**
 * Product showcase card — light background, dark title + body in the
 * top-left, neon-yellow CTA pill in the bottom-left, and a tilted
 * device photo (iPad / iPhone / hardware) filling the bottom-right.
 *
 * Mirrors the Akenza Genio/Setup/Building cards. Light-theme so it
 * acts as a visual breakpoint against the rest of the dark library.
 */
export function ProductShowcaseCard({
  className,
  title = "Genio",
  body = "Talk to your data with our AI-powered assistant.",
  image = "https://images.unsplash.com/photo-1561883088-039e53143d73?auto=format&fit=crop&w=900&q=80",
  imageAlt = "iPad showing the OneIoT assistant",
  ctaLabel = "Explore",
  ctaHref = "#",
  imagePosition = "bottom",
}: ProductShowcaseCardProps) {
  return (
    <article
      className={cn(
        "group relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 p-8 shadow-xl",
        className,
      )}
    >
      {/* copy block — top-left */}
      <div className="relative z-10 max-w-[55%]">
        <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">{body}</p>
      </div>

      {/* device photo — positioned per prop */}
      <div
        className={cn(
          "pointer-events-none absolute",
          imagePosition === "bottom" && "right-[-8%] bottom-[-12%] h-[85%] w-[70%] rotate-[-6deg]",
          imagePosition === "right" && "right-[-15%] top-1/2 h-[70%] w-[55%] -translate-y-1/2 rotate-[-4deg]",
          imagePosition === "center" && "left-1/2 bottom-[-14%] h-[80%] w-[50%] -translate-x-1/2",
        )}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-contain object-bottom drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* CTA pill — bottom-left */}
      <a
        href={ctaHref}
        className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-lime-400 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-lg transition-transform hover:scale-105"
      >
        {ctaLabel}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12h14M13 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </article>
  );
}
