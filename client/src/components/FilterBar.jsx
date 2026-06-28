import { useState } from "react";
import { RiSearchLine, RiFilterLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterBar({ filters, onChange }) {
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = [filters.status, filters.priority].filter(Boolean).length;

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

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-3 py-2 rounded border text-sm font-medium transition-all"
          style={{
            borderColor: showFilters ? "var(--color-ink)" : "var(--color-mid)",
            backgroundColor: showFilters ? "rgba(26, 26, 24, 0.06)" : "transparent",
            color: "var(--color-ink)",
          }}
        >
          <RiFilterLine size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span
              className="px-1.5 py-0.5 rounded text-xs font-bold"
              style={{ backgroundColor: "var(--color-ink)", color: "var(--color-paper)" }}
            >
              {activeFilterCount}
            </span>
          )}
        </button>

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

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 p-4 rounded border space-y-3 overflow-hidden"
            style={{ borderColor: "var(--color-mid)", backgroundColor: "rgba(26,26,24,0.02)" }}
          >
            <div>
              <p className="text-xs uppercase tracking-wide font-medium mb-2" style={{ color: "var(--color-muted)" }}>Status</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: "todo", label: "To Do", color: "var(--color-ink)" },
                  { value: "in-progress", label: "In Progress", color: "#5B7C99" },
                  { value: "done", label: "Done", color: "var(--color-signal)" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onChange({ ...filters, status: filters.status === opt.value ? "" : opt.value })}
                    className="px-3 py-1.5 text-sm rounded border transition-all"
                    style={{
                      borderColor: filters.status === opt.value ? opt.color : "var(--color-mid)",
                      backgroundColor: filters.status === opt.value ? `${opt.color}1A` : "transparent",
                      color: filters.status === opt.value ? opt.color : "var(--color-ink)",
                      fontWeight: filters.status === opt.value ? "600" : "400",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide font-medium mb-2" style={{ color: "var(--color-muted)" }}>Priority</p>
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
        )}
      </AnimatePresence>
    </div>
  );
}
