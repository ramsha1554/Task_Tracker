import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import Button from '../components/Button';

const defaultFilters = {
  search: '',
  status: '',
  priority: '',
  sort: 'newest',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(defaultFilters);
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTasks(filters);
      setTasks(res.data);
    } catch {
      showToast('Failed to load tasks.', 'error');
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
        showToast('Task updated.');
      } else {
        const res = await createTask(data);
        setTasks((prev) => [res.data, ...prev]);
        showToast('Task added.');
      }
      setFormOpen(false);
      setEditTask(null);
    } catch {
      showToast('Something went wrong.', 'error');
    }
  };

  const handleUpdate = (updated) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      showToast('Task deleted.');
    } catch {
      showToast('Failed to delete task.', 'error');
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

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
            Tasks
          </h1>
          <Button variant="primary" onClick={handleAddNew}>
            + Add task
          </Button>
        </div>

        <div className="flex gap-10">
          <div className="w-48 shrink-0">
            <Sidebar filters={filters} onChange={setFilters} />
          </div>

          <div className="flex-1 min-w-0">
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
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </main>
  );
}