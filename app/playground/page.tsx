import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { ProblemFraming } from "@/components/sections/problem-framing";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { LiveTelemetryStrip } from "@/components/sections/live-telemetry-strip";
import { DeviceGlobeSection } from "@/components/sections/device-globe-section";
import { Platform } from "@/components/sections/platform";
import { IsometricStack } from "@/components/sections/isometric-stack";
import { Verticals } from "@/components/sections/verticals";
import { WorkflowsByVertical } from "@/components/sections/workflows-by-vertical";
import { Monitoring } from "@/components/sections/monitoring";
import { Predictive } from "@/components/sections/predictive";
import { PlatformObservability } from "@/components/sections/platform-observability";
import { BuiltForDevelopers } from "@/components/sections/built-for-developers";
import { AuditGrade } from "@/components/sections/audit-grade";
import { DataPipeline } from "@/components/sections/data-pipeline";
import { UseCases } from "@/components/sections/use-cases";
import { IntegrationMesh } from "@/components/sections/integration-mesh";
import { BigCTA } from "@/components/sections/big-cta";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { WorkflowsByVertical2 } from "@/components/sections/WorkflowsByVertical2";
import { BentoGrid } from "@/components/sections/bento-grid";

export default function Playground() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ProblemFraming />
        <LogoMarquee />
        <LiveTelemetryStrip />
        <DeviceGlobeSection />
        <Platform />
        <IsometricStack />
        <Verticals />
        <WorkflowsByVertical />
        <WorkflowsByVertical2 />
        <BentoGrid />
        <Monitoring />
        <Predictive />
        <PlatformObservability />
        <BuiltForDevelopers />
        <AuditGrade />
        <DataPipeline />
        <UseCases />
        <IntegrationMesh />
        <BigCTA />
        <FAQ />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
