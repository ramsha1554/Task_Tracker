import { AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import TaskCardSkeleton from './TaskCardSkeleton';
import EmptyState from './EmptyState';

export default function TaskList({ tasks, loading, onUpdate, onDelete, onEdit, filtersActive, onClearFilters }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <EmptyState
        message={filtersActive ? 'No tasks match your filters.' : 'No tasks found. Create one to get started!'}
        filtered={filtersActive}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskCard
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