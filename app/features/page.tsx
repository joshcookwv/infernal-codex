import type { Metadata } from "next";
import Image from "next/image";
import { absoluteUrl, assetPath } from "@/lib/site-config";
import { features } from "@/lib/marketing-content";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore the campaign organization, encounter, rules, and note tools in Infernal Codex.",
  alternates: { canonical: absoluteUrl("/features/") },
};

export default function FeaturesPage() {
  return (
    <div className="shell page-section">
      <h1>Tools for the whole campaign</h1>
      <div className="feature-detail-list">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className={`feature-detail-row${index % 2 === 1 ? " feature-detail-row-reverse" : ""}`}
          >
            <div className="feature-detail-media">
              <Image
                src={assetPath(feature.image)}
                alt={feature.imageAlt}
                width={1080}
                height={1920}
                sizes="(min-width: 800px) 380px, 90vw"
              />
            </div>
            <div className="feature-row-copy">
              <h2>{feature.title}</h2>
              <p className="feature-row-benefit">{feature.benefit}</p>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
