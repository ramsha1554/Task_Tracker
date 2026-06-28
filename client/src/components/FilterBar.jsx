import { useState } from "react";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterBar({ filters, onChange }) {
  const statusLabels = { todo: "To Do", "in-progress": "In Progress", done: "Done" };
  const priorityLabels = { high: "High", med: "Medium", low: "Low" };
  const sortLabels = {
    newest: "Newest first",
    oldest: "Oldest first",
    dueDate: "Due date",
    priority: "Priority",
  };

  const handleRemoveFilter = (filterType) => {
    onChange({ ...filters, [filterType]: "" });
  };

  const handleRemoveSort = () => {
    onChange({ ...filters, sort: "newest" });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 flex-wrap p-4 rounded border" style={{ borderColor: "var(--color-mid)", backgroundColor: "rgba(26,26,24,0.02)" }}>

        <div className="flex items-center gap-2 flex-1 min-w-[200px]" style={{ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-mid)", borderRadius: "6px", padding: "0.5rem 0.75rem" }}>
          <RiSearchLine size={16} style={{ color: "var(--color-muted)" }} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="flex-1 outline-none text-sm"
            style={{ backgroundColor: "transparent", color: "var(--color-ink)" }}
          />
        </div>

        <AnimatePresence>
          {filters.status && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handleRemoveFilter("status")}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded border transition-colors"
              style={{
                borderColor: "var(--color-ink)",
                backgroundColor: "rgba(26, 26, 24, 0.06)",
                color: "var(--color-ink)",
              }}
            >
              Status: {statusLabels[filters.status]}
              <RiCloseLine size={14} />
            </motion.button>
          )}

          {filters.priority && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handleRemoveFilter("priority")}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded border transition-colors"
              style={{
                borderColor: "var(--color-ink)",
                backgroundColor: "rgba(26, 26, 24, 0.06)",
                color: "var(--color-ink)",
              }}
            >
              Priority: {priorityLabels[filters.priority]}
              <RiCloseLine size={14} />
            </motion.button>
          )}

          {filters.sort !== "newest" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleRemoveSort}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded border transition-colors"
              style={{
                borderColor: "var(--color-muted)",
                backgroundColor: "rgba(138, 136, 128, 0.1)",
                color: "var(--color-muted)",
              }}
            >
              Sort: {sortLabels[filters.sort]}
              <RiCloseLine size={14} />
            </motion.button>
          )}
        </AnimatePresence>

        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className="px-3 py-1.5 text-sm rounded border outline-none cursor-pointer"
          style={{
            borderColor: "var(--color-mid)",
            backgroundColor: "var(--color-paper)",
            color: "var(--color-ink)",
          }}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="dueDate">Due date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-3 p-4 rounded border space-y-3"
        style={{ borderColor: "var(--color-mid)", backgroundColor: "rgba(26,26,24,0.02)" }}
      >
        <div>
          <p className="text-xs uppercase tracking-wide font-medium mb-2" style={{ color: "var(--color-muted)" }}>Filter by Status</p>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: "todo", label: "To Do" },
              { value: "in-progress", label: "In Progress" },
              { value: "done", label: "Done" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange({ ...filters, status: filters.status === opt.value ? "" : opt.value })}
                className="px-3 py-1.5 text-sm rounded border transition-all"
                style={{
                  borderColor: filters.status === opt.value ? "var(--color-ink)" : "var(--color-mid)",
                  backgroundColor: filters.status === opt.value ? "rgba(26, 26, 24, 0.06)" : "transparent",
                  color: "var(--color-ink)",
                  fontWeight: filters.status === opt.value ? "600" : "400",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide font-medium mb-2" style={{ color: "var(--color-muted)" }}>Filter by Priority</p>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: "high", label: "High" },
              { value: "med", label: "Medium" },
              { value: "low", label: "Low" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange({ ...filters, priority: filters.priority === opt.value ? "" : opt.value })}
                className="px-3 py-1.5 text-sm rounded border transition-all"
                style={{
                  borderColor: filters.priority === opt.value ? "var(--color-ink)" : "var(--color-mid)",
                  backgroundColor: filters.priority === opt.value ? "rgba(26, 26, 24, 0.06)" : "transparent",
                  color: "var(--color-ink)",
                  fontWeight: filters.priority === opt.value ? "600" : "400",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}