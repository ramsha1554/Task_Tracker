import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Input from "../components/Input";

describe("Input", () => {
  it("renders label", () => {
    render(<Input label="Title" />);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("renders placeholder", () => {
    render(<Input placeholder="Enter title" />);
    expect(screen.getByPlaceholderText("Enter title")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Input error="Title is required" />);
    expect(screen.getByText("Title is required")).toBeInTheDocument();
  });

  it("calls onChange when typed", () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });
    expect(onChange).toHaveBeenCalled();
  });
});
