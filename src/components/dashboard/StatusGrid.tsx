import { CheckCircle2, CheckSquare, Clock } from "lucide-react";
import { StatCard } from "./StatusCard";

export const StatGrid = ({ stats }: any) => {
  const configs = [
    { label: "Total Tasks", value: stats.total, icon: CheckSquare, color: "text-foreground" },
    { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-success" },
    { label: "Pending", value: stats.pending, icon: Clock, color: "text-accent" },
    { label: "Overdue", value: stats.overdue, icon: Clock, color: "text-destructive" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-2">
      {configs.map(s => <StatCard key={s.label} {...s} />)}
    </div>
  );
};