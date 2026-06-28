import { AnimatePresence } from 'framer-motion';
import TaskRow from './TaskRow';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

export default function TaskList({ tasks, loading, onUpdate, onDelete, onEdit }) {
  if (loading) return <LoadingSpinner />;
  if (!tasks.length) return <EmptyState message="No tasks found." />;

  return (
    <div className="border-t border-mid">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskRow
            key={task._id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}