import Image from "next/image";
import Link from "next/link";
import { features } from "@/lib/marketing-content";
import { assetPath } from "@/lib/site-config";

export function FeatureShowcase() {
  return (
    <section className="shell feature-showcase">
      <div className="section-heading">
        <h2>Tools for the whole campaign</h2>
        <Link href="/features/">Explore all features</Link>
      </div>
      <div className="feature-showcase-grid">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className={`feature-showcase-card${index < 2 ? " feature-showcase-card-wide" : ""}`}
          >
            <div className="feature-showcase-media">
              <Image
                src={assetPath(feature.image)}
                alt={feature.imageAlt}
                width={1080}
                height={1920}
                sizes={index < 2 ? "(min-width: 1000px) 540px, 90vw" : "(min-width: 1000px) 260px, 90vw"}
              />
            </div>
            <div className="feature-showcase-copy">
              <span className="feature-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
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
