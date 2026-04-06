import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckSquare, Plus, LogOut, Calendar, Flag, CheckCircle2, Circle, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { store } from "../app/store/store";
import { logout } from "../app/slices/auth.slice";
import toast from "react-hot-toast";
import { AuthApi } from "../api/auth.api";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  completed: boolean;
  category: string;
}

const dummyTasks: Task[] = [
  { id: 1, title: "Design landing page mockup", description: "Create wireframes and high-fidelity mockups for the new landing page", priority: "high", dueDate: "Apr 5, 2026", completed: false, category: "Design" },
  { id: 2, title: "Review pull requests", description: "Go through open PRs and provide feedback to the team", priority: "medium", dueDate: "Apr 4, 2026", completed: true, category: "Development" },
  { id: 3, title: "Update project documentation", description: "Add API endpoints and deployment guide to the docs", priority: "low", dueDate: "Apr 8, 2026", completed: false, category: "Documentation" },
  { id: 4, title: "Fix authentication bug", description: "Resolve the session timeout issue on mobile browsers", priority: "high", dueDate: "Apr 4, 2026", completed: false, category: "Development" },
  { id: 5, title: "Team standup meeting", description: "Weekly sync with the product and engineering teams", priority: "medium", dueDate: "Apr 7, 2026", completed: true, category: "Meetings" },
  { id: 6, title: "Set up CI/CD pipeline", description: "Configure automated testing and deployment workflows", priority: "medium", dueDate: "Apr 10, 2026", completed: false, category: "DevOps" },
];

const priorityConfig = {
  high: { label: "High", className: "bg-destructive/10 text-destructive border-destructive/20" },
  medium: { label: "Medium", className: "bg-warning/10 text-warning-foreground border-warning/20" },
  low: { label: "Low", className: "bg-success/10 text-success border-success/20" },
};

const Dashboard = () => {
  const [tasks, setTasks] = useState(dummyTasks);

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const Logout = async()=>{
    store.dispatch(logout())
    await AuthApi.logout()
    toast.success("Logged out!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <CheckSquare className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="text-lg font-heading font-bold text-foreground">TaskFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">john@example.com</span>
            <Link to="/login">
              <Button onClick={Logout} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <LogOut className="w-4 h-4 mr-1.5" /> Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Tasks", value: totalTasks, icon: CheckSquare, color: "text-foreground" },
            { label: "Completed", value: completedTasks, icon: CheckCircle2, color: "text-success" },
            { label: "Pending", value: pendingTasks, icon: Clock, color: "text-accent" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Task header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-heading font-bold text-foreground">My Tasks</h1>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <Plus className="w-4 h-4 mr-1.5" /> Add Task
          </Button>
        </div>

        {/* Task list */}
        <div className="space-y-3">
          {tasks.map((task, i) => (
            <div
              key={task.id}
              className={`bg-card border border-border rounded-lg p-4 sm:p-5 flex items-start gap-4 transition-all hover:shadow-sm animate-fade-in`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <button onClick={() => toggleTask(task.id)} className="mt-0.5 shrink-0">
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground hover:text-accent transition-colors" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-foreground ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5 truncate">{task.description}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <Badge variant="outline" className={priorityConfig[task.priority].className}>
                    <Flag className="w-3 h-3 mr-1" /> {priorityConfig[task.priority].label}
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground border-border">
                    <Calendar className="w-3 h-3 mr-1" /> {task.dueDate}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">{task.category}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
