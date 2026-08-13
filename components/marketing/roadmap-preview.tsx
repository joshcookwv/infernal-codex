import Link from "next/link";
import { roadmapStages } from "@/lib/roadmap-content";

export function RoadmapPreview() {
  return (
    <section className="shell roadmap-preview">
      <div className="latest-news-header">
        <h2>Roadmap</h2>
        <Link href="/roadmap/">Full roadmap</Link>
      </div>
      <ol className="roadmap-preview-list">
        {roadmapStages.map((stage) => (
          <li key={stage.label} className="panel">
            <p className="eyebrow">{stage.label}</p>
            <p>{stage.title}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
