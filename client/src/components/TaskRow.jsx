import { motion } from 'framer-motion';
import { RiCheckboxBlankLine, RiCheckboxLine, RiPencilLine, RiDeleteBin6Line } from 'react-icons/ri';
import { updateTask } from '../services/api';

const priorityStyles = {
  high: { color: 'var(--color-signal)', fontWeight: '500' },
  med: { color: 'var(--color-ink)' },
  low: { color: 'var(--color-muted)' },
};

export default function TaskRow({ task, onUpdate, onDelete, onEdit }) {
  const isDone = task.status === 'done';

  const toggleStatus = async () => {
    try {
      const updated = await updateTask(task._id, {
        status: isDone ? 'todo' : 'done',
      });
      onUpdate(updated.data);
    } catch {
      // handle silently — toast shown at parent level
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="task-row flex items-start gap-3 group"
    >
      <button
        onClick={toggleStatus}
        className="mt-0.5 text-muted hover:text-ink transition-colors duration-150 shrink-0"
        aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
      >
        {isDone
          ? <RiCheckboxLine size={18} style={{ color: 'var(--color-signal)' }} />
          : <RiCheckboxBlankLine size={18} />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className="text-sm leading-snug"
          style={{
            textDecoration: isDone ? 'line-through' : 'none',
            color: isDone ? 'var(--color-muted)' : 'var(--color-ink)',
          }}
        >
          {task.title}
        </p>

        {task.description && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs" style={priorityStyles[task.priority]}>
            {task.priority.toUpperCase()}
          </span>

          {task.dueDate && (
            <span
              className="text-xs"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
            >
              {new Date(task.dueDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 text-muted hover:text-ink hover:bg-mid/40 rounded transition-colors duration-150"
          title="Edit task"
          aria-label="Edit task"
        >
          <RiPencilLine size={16} />
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="p-1.5 text-muted hover:text-signal hover:bg-mid/40 rounded transition-colors duration-150"
          title="Delete task"
          aria-label="Delete task"
        >
          <RiDeleteBin6Line size={16} />
        </button>
      </div>
    </motion.div>
  );
}