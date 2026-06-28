import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";
import StatsCard from "../components/StatsCard";
import ProgressChart from "../components/ProgressChart";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import Button from "../components/Button";

const defaultFilters = {
  search: "",
  status: "",
  priority: "",
  sort: "newest",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(defaultFilters);
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTasks(filters);
      setTasks(res.data);
    } catch {
      showToast("Failed to load tasks.", "error");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = async (data) => {
    try {
      if (editTask) {
        const res = await updateTask(editTask._id, data);
        setTasks((prev) =>
          prev.map((t) => (t._id === editTask._id ? res.data : t))
        );
        showToast("Task updated.");
      } else {
        const res = await createTask(data);
        setTasks((prev) => [res.data, ...prev]);
        showToast("Task added.");
      }
      setFormOpen(false);
      setEditTask(null);
    } catch {
      showToast("Something went wrong.", "error");
    }
  };

  const handleUpdate = (updated) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTask(confirmId);
      setTasks((prev) => prev.filter((t) => t._id !== confirmId));
      showToast("Task deleted.");
    } catch {
      showToast("Failed to delete task.", "error");
    } finally {
      setConfirmId(null);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setFormOpen(true);
  };

  const handleAddNew = () => {
    setEditTask(null);
    setFormOpen(true);
  };

  const allTasks = tasks;
  const completedCount = allTasks.filter((t) => t.status === "done").length;
  const overdueCount = allTasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done").length;

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--color-paper)" }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
  <h2 className="text-2xl font-semibold" style={{ color: "var(--color-ink)" }}>Dashboard</h2>
  <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: "var(--color-muted)" }}>
    <span>{allTasks.filter(t => t.status === "todo").length} to-do</span>
    <span>·</span>
    <span>{allTasks.filter(t => t.status === "in-progress").length} in progress</span>
    <span>·</span>
    <span>{completedCount} done</span>
  </div>
</div>
          <Button variant="primary" onClick={handleAddNew}>
            + Add task
          </Button>
        </div>

        <StatsCard total={allTasks.length} completed={completedCount} overdue={overdueCount} />

        <ProgressChart tasks={allTasks} />

        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-6" style={{ color: "var(--color-ink)" }}>My Tasks</h2>
          
          <div>
            <FilterBar filters={filters} onChange={setFilters} />

            <TaskForm
              open={formOpen}
              onClose={() => { setFormOpen(false); setEditTask(null); }}
              onSubmit={handleSubmit}
              editTask={editTask}
            />

           <TaskList
  tasks={tasks}
  loading={loading}
  onUpdate={handleUpdate}
  onDelete={(id) => setConfirmId(id)}
  onEdit={handleEdit}
  filtersActive={!!(filters.search || filters.status || filters.priority)}
  onClearFilters={() => setFilters(defaultFilters)}
/>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmId}
        message="Delete this task? This cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmId(null)}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </main>
  );
}