import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "../site-header";

describe("SiteHeader", () => {
  it("provides the complete primary navigation and Android status", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
    for (const name of ["Features", "News", "Roadmap", "About", "Support"]) {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    }
    expect(screen.getByText("Android launch in progress")).toBeInTheDocument();
  });
});
