import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../components/Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByText("Click")).toBeDisabled();
  });

  it("renders primary variant by default", () => {
    render(<Button>Primary</Button>);
    expect(screen.getByText("Primary")).toHaveClass("bg-signal");
  });

  it("renders secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText("Secondary")).toHaveClass("border-mid");
  });
});
