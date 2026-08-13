import { benefits } from "@/lib/marketing-content";

export function BenefitGrid() {
  return (
    <section className="shell benefit-grid-section">
      <h2 className="visually-hidden">Why Dungeon Masters use Infernal Codex</h2>
      <ul className="benefit-grid">
        {benefits.map((benefit) => (
          <li key={benefit} className="panel">
            {benefit}
          </li>
        ))}
      </ul>
    </section>
  );
}
