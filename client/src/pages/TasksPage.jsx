import { useState, useEffect, useCallback } from 'react';
import { getTasks, deleteTask } from '../services/api';
import TaskList from '../components/TaskList';
import Toast from '../components/Toast';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch {
      showToast('Failed to load tasks.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
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
    // wired up in next step when TaskForm is built
    console.log('edit', task);
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
          Tasks
        </h1>

        <TaskList
          tasks={tasks}
          loading={loading}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </main>
  );
}