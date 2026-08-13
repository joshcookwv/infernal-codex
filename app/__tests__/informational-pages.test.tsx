import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import FeaturesPage from "@/app/features/page";
import RoadmapPage from "@/app/roadmap/page";
import SupportPage from "@/app/support/page";
import { features } from "@/lib/marketing-content";
import { siteConfig } from "@/lib/site-config";

describe("informational pages", () => {
  it("Features lists all six feature headings", () => {
    render(<FeaturesPage />);
    for (const feature of features) {
      expect(screen.getByRole("heading", { name: feature.title })).toBeInTheDocument();
    }
  });

  it("Roadmap shows Now, Next, Later and no promised-date pattern", () => {
    render(<RoadmapPage />);
    expect(screen.getByText("Now")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Later")).toBeInTheDocument();
    expect(screen.queryByText(/\bQ[1-4]\b/)).not.toBeInTheDocument();
  });

  it("About describes the independent, local-first project", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Built for the person behind the screen" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/independent project/i)).toBeInTheDocument();
    expect(screen.getByText(/stay local to the app/i)).toBeInTheDocument();
  });

  it("Support exposes contact, legal links, and an FAQ", () => {
    render(<SupportPage />);
    expect(screen.getByText(siteConfig.supportEmail)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /report a problem|issue/i }),
    ).toHaveAttribute("href", `${siteConfig.mobileGithubUrl}/issues/new`);
    expect(screen.getByRole("link", { name: /privacy/i })).toHaveAttribute(
      "href",
      siteConfig.privacyUrl,
    );
    expect(screen.getByRole("link", { name: /licenses/i })).toHaveAttribute(
      "href",
      siteConfig.licensesUrl,
    );
    expect(screen.getByRole("heading", { name: /faq/i })).toBeInTheDocument();
  });
});
