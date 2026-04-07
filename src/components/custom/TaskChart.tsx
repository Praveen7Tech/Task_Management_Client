import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface TaskChartProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
  };
}

const TaskChart = ({ stats }: TaskChartProps) => {
  const data = [
    { name: "Completed", value: stats.completed, color: "hsl(152, 60%, 42%)" },
    { name: "Pending", value: stats.pending, color: "hsl(36, 90%, 55%)" },
    { name: "Overdue", value: stats.overdue, color: "hsl(0, 72%, 51%)" },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center text-muted-foreground text-sm">
        No tasks to visualize
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-heading font-bold text-foreground mb-4">
        Task Overview
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">
                {item.name}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskChart;
