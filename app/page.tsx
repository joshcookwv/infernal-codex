import { BenefitGrid } from "@/components/marketing/benefit-grid";
import { FeatureShowcase } from "@/components/marketing/feature-showcase";
import { Hero } from "@/components/marketing/hero";
import { LatestNews } from "@/components/marketing/latest-news";
import { PlatformStatus } from "@/components/marketing/platform-status";
import { RoadmapPreview } from "@/components/marketing/roadmap-preview";

export default function Home() {
  return (
    <>
      <Hero />
      <BenefitGrid />
      <FeatureShowcase />
      <PlatformStatus />
      <LatestNews />
      <RoadmapPreview />
    </>
  );
}
