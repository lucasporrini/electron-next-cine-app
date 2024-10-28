import HelloWorldPage from "@/app/hello-world/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Hello World Page", () => {
  it("renders a heading", () => {
    render(<HelloWorldPage />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});

describe("Get local storage", () => {
  it("should return an empty array", () => {
    expect(localStorage.getItem("user")).toBe(null);
  });
});
