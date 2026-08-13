import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="hero shell">
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
        <Image
          src={assetPath("/images/screenshots/dashboard.png")}
          alt="Infernal Codex dashboard on Android."
          width={360}
          height={780}
          priority
        />
        <Image
          src={assetPath("/images/screenshots/encounter.png")}
          alt="Infernal Codex encounter runner on Android."
          width={360}
          height={780}
        />
      </div>
    </section>
  );
}
