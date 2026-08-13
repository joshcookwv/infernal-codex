import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="hero shell">
      <div className="hero-brand-mark" aria-hidden="true">
        <Image
          src={assetPath("/images/brand/logo.png")}
          alt=""
          width={420}
          height={420}
          priority
        />
      </div>
      <div className="hero-copy">
        <h1>Your campaign. At the table.</h1>
        <p>
          Infernal Codex keeps campaign organization, encounters, rules, monsters, notes, and
          maps together in one offline-first toolkit built for Dungeon Masters.
        </p>
        <div className="hero-actions">
          <Link href="/features/" className="button button-primary">
            See the features
          </Link>
          <span className="status-badge">Android launch in progress</span>
        </div>
        <p className="hero-secondary-status">Desktop version in development</p>
      </div>
      <div className="hero-media">
        <div className="hero-device hero-device-primary">
          <span className="hero-device-speaker" aria-hidden="true" />
          <Image
            src={assetPath("/images/screenshots/dashboard.png")}
            alt="Infernal Codex dashboard on Android."
            width={1080}
            height={1920}
            sizes="(min-width: 900px) 300px, 44vw"
            priority
          />
        </div>
        <div className="hero-device hero-device-secondary">
          <span className="hero-device-speaker" aria-hidden="true" />
          <Image
            src={assetPath("/images/screenshots/encounter.png")}
            alt="Infernal Codex encounter runner on Android."
            width={1080}
            height={1920}
            sizes="(min-width: 900px) 260px, 44vw"
          />
        </div>
      </div>
    </section>
  );
}
