import Image from "next/image";
import { features } from "@/lib/marketing-content";
import { assetPath } from "@/lib/site-config";

export function FeatureShowcase() {
  return (
    <section className="shell feature-showcase">
      <h2>Tools for the whole campaign</h2>
      <div className="feature-rows">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className={`feature-row${index % 2 === 1 ? " feature-row-reverse" : ""}`}
          >
            <Image
              src={assetPath(feature.image)}
              alt={feature.imageAlt}
              width={640}
              height={480}
              className="feature-row-image"
            />
            <div className="feature-row-copy">
              <h3>{feature.title}</h3>
              <p className="feature-row-benefit">{feature.benefit}</p>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
