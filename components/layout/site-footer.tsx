import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-inner">
        <div className="site-footer-copy">
          <p className="site-footer-brand">{siteConfig.name}</p>
          <p className="site-footer-tagline">{siteConfig.description}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="nav-list">
            <li>
              <Link href="/support/">Support</Link>
            </li>
            <li>
              <a href={siteConfig.githubUrl}>GitHub</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
