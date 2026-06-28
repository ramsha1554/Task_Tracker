import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TaskRow from "../components/TaskRow";

vi.mock("../services/api");

describe("TaskRow", () => {
  const mockTask = {
    _id: "123",
    title: "Test task",
    description: "A description",
    status: "todo",
    priority: "high",
    dueDate: null,
  };

  it("renders task title", () => {
    render(<TaskRow task={mockTask} onUpdate={vi.fn()} onDelete={vi.fn()} onEdit={vi.fn()} />);
    expect(screen.getByText("Test task")).toBeInTheDocument();
  });

  it("renders task description", () => {
    render(<TaskRow task={mockTask} onUpdate={vi.fn()} onDelete={vi.fn()} onEdit={vi.fn()} />);
    expect(screen.getByText("A description")).toBeInTheDocument();
  });

  it("renders priority", () => {
    render(<TaskRow task={mockTask} onUpdate={vi.fn()} onDelete={vi.fn()} onEdit={vi.fn()} />);
    expect(screen.getByText("HIGH")).toBeInTheDocument();
  });

  it("calls onEdit when edit is clicked", () => {
    const onEdit = vi.fn();
    render(<TaskRow task={mockTask} onUpdate={vi.fn()} onDelete={vi.fn()} onEdit={onEdit} />);
    fireEvent.click(screen.getByText("Edit"));
    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });

  it("calls onDelete when delete is clicked", () => {
    const onDelete = vi.fn();
    render(<TaskRow task={mockTask} onUpdate={vi.fn()} onDelete={onDelete} onEdit={vi.fn()} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(onDelete).toHaveBeenCalledWith("123");
  });
});
