import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-inner">
        <p className="site-footer-brand">{siteConfig.name}</p>
        <p className="site-footer-tagline">{siteConfig.description}</p>
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
