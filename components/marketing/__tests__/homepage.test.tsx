import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("homepage", () => {
  it("leads with Android and honestly labels desktop development", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Your campaign. At the table." }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Android launch in progress").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Desktop version in development").length).toBeGreaterThan(0);
    expect(screen.queryByText(/available on ios/i)).not.toBeInTheDocument();
  });
});
