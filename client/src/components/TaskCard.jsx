import { motion } from "framer-motion";
import { RiCheckboxBlankLine, RiCheckboxLine, RiPencilLine, RiDeleteBin6Line } from "react-icons/ri";
import { updateTask } from "../services/api";

const priorityStyles = {
  high: { bg: "rgba(26, 26, 24, 0.08)", color: "var(--color-ink)", text: "HIGH" },
  med: { bg: "rgba(138, 136, 128, 0.1)", color: "var(--color-muted)", text: "MED" },
  low: { bg: "rgba(138, 136, 128, 0.06)", color: "var(--color-muted)", text: "LOW" },
};

export default function TaskCard({ task, onUpdate, onDelete, onEdit }) {
  const isDone = task.status === "done";
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";

  const toggleStatus = async () => {
    try {
      const updated = await updateTask(task._id, {
        status: isDone ? "todo" : "done",
      });
      onUpdate(updated.data);
    } catch {
      // handle silently
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="p-4 rounded border transition-shadow duration-200"
      style={{
        borderColor: isOverdue ? "var(--color-signal)" : "var(--color-mid)",
        backgroundColor: isDone ? "rgba(138, 136, 128, 0.03)" : "var(--color-paper)",
        boxShadow: isOverdue ? "0 0 12px rgba(214, 79, 38, 0.1)" : "0 1px 3px rgba(0,0,0,0.05)",
        cursor: "default",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 20px rgba(26,26,24,0.08)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = isOverdue ? "0 0 12px rgba(214, 79, 38, 0.1)" : "0 1px 3px rgba(0,0,0,0.05)"; }}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={toggleStatus}
          className="mt-1 text-muted hover:text-ink transition-colors duration-150 shrink-0"
          aria-label={isDone ? "Mark incomplete" : "Mark complete"}
        >
          {isDone ? (
            <RiCheckboxLine size={20} style={{ color: "var(--color-ink)" }} />
          ) : (
            <RiCheckboxBlankLine size={20} />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium leading-snug"
            style={{
              textDecoration: isDone ? "line-through" : "none",
              color: isDone ? "var(--color-muted)" : "var(--color-ink)",
            }}
          >
            {task.title}
          </p>

          {task.description && (
            <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span
              className="text-xs px-2 py-1 rounded font-medium"
              style={{
                backgroundColor: priorityStyles[task.priority].bg,
                color: priorityStyles[task.priority].color,
              }}
            >
              {priorityStyles[task.priority].text}
            </span>

            {task.dueDate && (
              <span
                className="text-xs px-2 py-1 rounded"
                style={{
                  color: isOverdue ? "var(--color-signal)" : "var(--color-muted)",
                  fontFamily: "var(--font-mono)",
                  backgroundColor: isOverdue ? "rgba(214, 79, 38, 0.1)" : "transparent",
                  fontWeight: isOverdue ? "600" : "400",
                }}
              >
                {new Date(task.dueDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
              </span>
            )}

            {isOverdue && (
              <span className="text-xs font-semibold" style={{ color: "var(--color-signal)" }}>
                OVERDUE
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-muted hover:text-ink hover:bg-mid/40 rounded transition-colors duration-150"
            title="Edit task"
            aria-label="Edit task"
          >
            <RiPencilLine size={16} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-muted hover:text-signal hover:bg-mid/40 rounded transition-colors duration-150"
            title="Delete task"
            aria-label="Delete task"
          >
            <RiDeleteBin6Line size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}