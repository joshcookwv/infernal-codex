import Image from "next/image";
import Link from "next/link";
import { assetPath, siteConfig } from "@/lib/site-config";
import { MobileNav } from "./mobile-nav";

const NAV_LINKS = [
  { href: "/features/", label: "Features" },
  { href: "/news/", label: "News" },
  { href: "/roadmap/", label: "Roadmap" },
  { href: "/about/", label: "About" },
  { href: "/support/", label: "Support" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header-inner">
        <Link href="/" className="brand">
          <Image
            src={assetPath("/images/brand/logo.png")}
            alt=""
            width={32}
            height={32}
            className="brand-logo"
          />
          <span>{siteConfig.name}</span>
        </Link>
        <span className="eyebrow status-badge">Android launch in progress</span>
        <MobileNav>
          <nav aria-label="Primary navigation">
            <ul className="nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </MobileNav>
      </div>
    </header>
  );
}
