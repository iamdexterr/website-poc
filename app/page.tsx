import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { SolutionsOverview } from "@/components/sections/solutions-overview";
import { SolutionsCTA } from "@/components/sections/solutions-cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <SolutionsOverview />
        <SolutionsCTA />
      </main>
      <SiteFooter />
    </>
  );
}
