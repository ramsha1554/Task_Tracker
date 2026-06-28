import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskList from "../components/TaskList";

const mockTasks = [
  { _id: "1", title: "Task one", status: "todo", priority: "high", dueDate: null },
  { _id: "2", title: "Task two", status: "done", priority: "low", dueDate: null },
];

vi.mock("../services/api", () => ({
  updateTask: vi.fn(),
}));

describe("TaskList", () => {
  it("shows skeleton cards when loading", () => {
    render(<TaskList tasks={[]} loading={true} onUpdate={vi.fn()} onDelete={vi.fn()} onEdit={vi.fn()} />);
    expect(document.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("shows empty state when no tasks", () => {
    render(<TaskList tasks={[]} loading={false} onUpdate={vi.fn()} onDelete={vi.fn()} onEdit={vi.fn()} />);
    expect(screen.getByText(/No tasks found/)).toBeInTheDocument();
  });

  it("renders all tasks", () => {
    render(<TaskList tasks={mockTasks} loading={false} onUpdate={vi.fn()} onDelete={vi.fn()} onEdit={vi.fn()} />);
    expect(screen.getByText("Task one")).toBeInTheDocument();
    expect(screen.getByText("Task two")).toBeInTheDocument();
  });
});