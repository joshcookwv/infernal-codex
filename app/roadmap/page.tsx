import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-config";
import { roadmapStages } from "@/lib/roadmap-content";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "See what Infernal Codex is building now, next, and later.",
  alternates: { canonical: absoluteUrl("/roadmap/") },
};

export default function RoadmapPage() {
  return (
    <div className="shell page-section">
      <h1>What we are building</h1>
      <p>
        This roadmap shows direction, not promised dates. Priorities may change as production
        validation and Dungeon Master feedback reveal what matters most.
      </p>
      <ol className="roadmap-stages">
        {roadmapStages.map((stage) => (
          <li key={stage.label} className="panel">
            <p className="eyebrow">{stage.label}</p>
            <h2>{stage.title}</h2>
            <ul>
              {stage.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
