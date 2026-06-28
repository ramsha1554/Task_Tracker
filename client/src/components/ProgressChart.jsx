import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ProgressChart({ tasks }) {
  const statusCounts = {
    todo: tasks.filter((t) => t.status === "todo").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  const priorityCounts = {
    high: tasks.filter((t) => t.priority === "high").length,
    med: tasks.filter((t) => t.priority === "med").length,
    low: tasks.filter((t) => t.priority === "low").length,
  };

  const statusData = [
    { name: "To Do", value: statusCounts.todo, fill: "#8A8880" },
    { name: "In Progress", value: statusCounts["in-progress"], fill: "#5B7C99" },
    { name: "Done", value: statusCounts.done, fill: "#D64F26" },
  ];

  const priorityData = [
    { name: "High", value: priorityCounts.high },
    { name: "Medium", value: priorityCounts.med },
    { name: "Low", value: priorityCounts.low },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 mt-8">
      <div className="p-6 rounded border" style={{ borderColor: "var(--color-mid)" }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--color-ink)" }}>Status Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie 
              data={statusData} 
              cx="50%" 
              cy="50%" 
              labelLine={false} 
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80} 
              fill="#8884d8" 
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="p-6 rounded border" style={{ borderColor: "var(--color-mid)" }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--color-ink)" }}>Priority Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={priorityData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-mid)" />
            <XAxis dataKey="name" stroke="var(--color-muted)" />
            <YAxis stroke="var(--color-muted)" />
            <Tooltip contentStyle={{ backgroundColor: "var(--color-paper)", border: "1px solid var(--color-mid)" }} />
            <Bar dataKey="value" fill="var(--color-signal)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}