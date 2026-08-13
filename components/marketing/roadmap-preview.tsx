import Link from "next/link";

const ROADMAP_SUMMARY = [
  { label: "Now", title: "Preparing the Android release" },
  { label: "Next", title: "Improve the released experience" },
  { label: "Later", title: "Build the Windows desktop edition" },
] as const;

export function RoadmapPreview() {
  return (
    <section className="shell roadmap-preview">
      <div className="latest-news-header">
        <h2>Roadmap</h2>
        <Link href="/roadmap/">Full roadmap</Link>
      </div>
      <ol className="roadmap-preview-list">
        {ROADMAP_SUMMARY.map((stage) => (
          <li key={stage.label} className="panel">
            <p className="eyebrow">{stage.label}</p>
            <p>{stage.title}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
