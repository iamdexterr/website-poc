import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { SolutionsOverview } from "@/components/sections/solutions-overview";
import { WhyOneIoT } from "@/components/sections/why-oneiot";
import { SolutionsCTA } from "@/components/sections/solutions-cta";
import { BentoShowcase } from "@/components/sections/bento-showcase";
import { BentoShowcaseAlt } from "@/components/sections/bento-showcase-alt";
import { BentoGrid } from "@/components/sections/bento-grid";
import { BentoFeatureShowcase } from "@/components/sections/bento-feature-showcase";
import { PlatformCapabilities } from "@/components/sections/platform-capabilities";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <SolutionsOverview />
        {/* <WhyOneIoT /> */}
        {/* <BentoShowcase /> */}
        {/* <BentoShowcaseAlt /> */}
        {/* <BentoGrid /> */}
        <BentoFeatureShowcase />
        <PlatformCapabilities />
        <SolutionsCTA />
      </main>
      <SiteFooter />
    </>
  );
}
