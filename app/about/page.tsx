import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: "Infernal Codex is an independent, local-first campaign toolkit for Dungeon Masters.",
  alternates: { canonical: absoluteUrl("/about/") },
};

export default function AboutPage() {
  return (
    <div className="shell page-section">
      <h1>Built for the person behind the screen</h1>
      <p>
        Infernal Codex is an independent project focused on practical campaign tools for Dungeon
        Masters. Ordinary campaign records are designed to stay local to the app. Optional online
        services act only when a user deliberately invokes the relevant feature.
      </p>
    </div>
  );
}
