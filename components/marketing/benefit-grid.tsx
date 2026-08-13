import { benefits } from "@/lib/marketing-content";

function BenefitIcon({ icon }: { icon: (typeof benefits)[number]["icon"] }) {
  if (icon === "campaign") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5.5h6l2 2h8v11H4z" />
        <path d="M8 12h8M8 15h5" />
      </svg>
    );
  }

  if (icon === "encounter") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l2.6 5.4L20 11l-5.4 2.6L12 19l-2.6-5.4L4 11l5.4-2.6z" />
        <path d="M12 8v6M9 11h6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-2.7 7.8-7 10-4.3-2.2-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function BenefitGrid() {
  return (
    <section className="shell benefit-grid-section">
      <h2 className="visually-hidden">Why Dungeon Masters use Infernal Codex</h2>
      <ul className="benefit-grid">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="panel benefit-card">
            <span className="benefit-icon">
              <BenefitIcon icon={benefit.icon} />
            </span>
            <div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
