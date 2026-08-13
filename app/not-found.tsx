import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell page-section">
      <h1>Page not found</h1>
      <p>The page you were looking for doesn&apos;t exist or may have moved.</p>
      <div className="hero-actions">
        <Link href="/" className="button button-primary">
          Go home
        </Link>
        <Link href="/news/" className="button button-secondary">
          News
        </Link>
        <Link href="/support/" className="button button-secondary">
          Support
        </Link>
      </div>
    </div>
  );
}
