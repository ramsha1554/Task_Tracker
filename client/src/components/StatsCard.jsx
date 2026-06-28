import { RiCheckLine, RiAlarmWarningLine, RiListRadio } from "react-icons/ri";

export default function StatsCard({ total, completed, overdue }) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 rounded border" style={{ borderColor: "var(--color-mid)", backgroundColor: "rgba(26, 26, 24, 0.02)" }}>
        <p className="text-xs uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>Total Tasks</p>
        <p className="text-2xl font-bold mt-2" style={{ color: "var(--color-ink)" }}>{total}</p>
      </div>

      <div className="p-4 rounded border" style={{ borderColor: "var(--color-mid)", backgroundColor: "rgba(214, 79, 38, 0.05)" }}>
        <div className="flex items-center gap-2">
          <RiCheckLine size={16} style={{ color: "var(--color-signal)" }} />
          <p className="text-xs uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>Completed</p>
        </div>
        <p className="text-2xl font-bold mt-2" style={{ color: "var(--color-signal)" }}>{completed}</p>
        <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>{completionRate}%</p>
      </div>

      <div className="p-4 rounded border" style={{ borderColor: "var(--color-mid)", backgroundColor: "rgba(214, 79, 38, 0.05)" }}>
        <div className="flex items-center gap-2">
          <RiAlarmWarningLine size={16} style={{ color: "var(--color-signal)" }} />
          <p className="text-xs uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>Overdue</p>
        </div>
        <p className="text-2xl font-bold mt-2" style={{ color: "var(--color-signal)" }}>{overdue}</p>
      </div>
    </div>
  );
}
