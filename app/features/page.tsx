import type { Metadata } from "next";
import Image from "next/image";
import { absoluteUrl } from "@/lib/site-config";
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
      <div className="feature-rows">
        {features.map((feature) => (
          <article key={feature.title} className="feature-row">
            <Image
              src={feature.image}
              alt={feature.imageAlt}
              width={640}
              height={480}
              className="feature-row-image"
            />
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
