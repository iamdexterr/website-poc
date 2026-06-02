"use client";

import { useState } from "react";
import Image from "next/image";

type Logo = {
  name: string;
  // Path under /public — omit to fall back to a text wordmark.
  src?: string;
};

const logos: Logo[] = [
  { name: "Tata Steel", src: "/logos/tata-steel.svg" },
  { name: "Reliance", src: "/logos/reliance.svg" },
  { name: "Mahindra", src: "/logos/mahindra.svg" },
  { name: "Adani", src: "/logos/adani.svg" },
  { name: "Ola", src: "/logos/ola.svg" },
  { name: "Zomato", src: "/logos/zomato.svg" },
  { name: "Bharti Airtel", src: "/logos/bharti-airtel.svg" },
  { name: "HDFC", src: "/logos/hdfc.svg" },
  { name: "L&T", src: "/logos/lt.svg" },
  { name: "Siemens", src: "/logos/siemens.svg" },
];

function LogoItem({ logo }: { logo: Logo }) {
  const [errored, setErrored] = useState(false);

  if (logo.src && !errored) {
    return (
      <div className="relative h-10 w-40 shrink-0 opacity-70 transition-opacity hover:opacity-100">
        <Image
          src={logo.src}
          alt={logo.name}
          fill
          sizes="160px"
          className="object-contain"
          onError={() => setErrored(true)}
        />
      </div>
    );
  }

  return (
    <div className="flex h-10 shrink-0 items-center justify-center px-4 text-base font-semibold tracking-tight text-muted-foreground/80">
      {logo.name}
    </div>
  );
}

export function LogoMarquee() {
  // duplicate the array so the loop is seamless
  const row = [...logos, ...logos];
  return (
    <section className="section-divide bg-background py-10 text-muted-foreground">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-6 text-center">
          <span className="label-mono text-muted-foreground">
            TRUSTED ACROSS ENTERPRISES, GOVERNMENTS & STARTUPS
          </span>
        </div>
        <div className="relative overflow-hidden">
          {/* edge fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-12">
            {row.map((logo, i) => (
              <LogoItem key={`${logo.name}-${i}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
