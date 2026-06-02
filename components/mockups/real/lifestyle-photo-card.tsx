import Image from "next/image";
import { cn } from "@/lib/utils";

export type LifestylePhotoCardProps = {
  className?: string;
  title?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  ctaHref?: string;
  /** Where the text sits on the photo */
  textPosition?: "top-left" | "bottom-left";
};

/**
 * Lifestyle photo card — over-the-shoulder photo of a person using the
 * product, with title + body overlaid on the photo and a circular
 * yellow CTA pinned to the bottom-left. Light-feel but works on dark
 * pages thanks to the photo as the background.
 *
 * Mirrors the Akenza "Device Manager / Dashboard Builder" cards.
 */
export function LifestylePhotoCard({
  className,
  title = "Device Manager",
  body = "Full control of the device lifecycle: from connectivity to business logic — all in one place.",
  image = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
  imageAlt = "Person using OneIoT device manager on a laptop",
  ctaHref = "#",
  textPosition = "top-left",
}: LifestylePhotoCardProps) {
  return (
    <article
      className={cn(
        "group relative aspect-[5/4] overflow-hidden rounded-3xl shadow-2xl",
        className,
      )}
    >
      {/* photo */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 600px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* gradient overlay so text stays readable on any photo */}
      <div
        className={cn(
          "absolute inset-0",
          textPosition === "top-left"
            ? "bg-linear-to-br from-black/70 via-black/30 to-transparent"
            : "bg-linear-to-tr from-black/70 via-black/30 to-transparent",
        )}
      />

      {/* copy */}
      <div
        className={cn(
          "absolute z-10 max-w-md",
          textPosition === "top-left" ? "left-8 top-8" : "left-8 bottom-20",
        )}
      >
        <h3 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">{body}</p>
      </div>

      {/* circular CTA — bottom-left */}
      <a
        href={ctaHref}
        aria-label={`Explore ${title}`}
        className="absolute bottom-6 left-6 z-10 inline-flex size-11 items-center justify-center rounded-full bg-lime-400 text-zinc-900 shadow-lg transition-transform hover:scale-110"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
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
