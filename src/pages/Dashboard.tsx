import { useState } from "react";
import { Link } from "react-router-dom";
import {CheckSquare,Plus,LogOut,Calendar,Flag, CheckCircle2,
  Clock,Pencil,Trash2,MoreVertical,} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import TaskDialog, { type Task } from "../components/custom/TaskDialog";
import DeleteTaskDialog from "../components/custom/DeleteTaskDialog";
import { useSelector } from "react-redux";
import { store, type RootState } from "../app/store/store";
import { AuthApi } from "../api/auth.api";
import { logout } from "../app/slices/auth.slice";
import { useTasks } from "../hooks/useTasks";

const priorityConfig = {
  high: {
    label: "High",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  medium: {
    label: "Medium",
    className: "bg-warning/10 text-warning-foreground border-warning/20",
  },
  low: {
    label: "Low",
    className: "bg-success/10 text-success border-success/20",
  },
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const Home = () => {
  const {tasks,stats,createTask,updateTask,deleteTask,page, setPage, totalPages}=useTasks();

  const user=useSelector((s:RootState)=>s.auth.user);

  const[dialogOpen,setDialogOpen]=useState(false);
  const[editingTask,setEditingTask]=useState<Task|null>(null);
  const[deleteTarget,setDeleteTarget]=useState<Task|null>(null);

  const handleSave = async (data: Omit<Task, "id">) => {
    if (editingTask) {
      await updateTask({ ...editingTask, ...data });
    } else {
      await createTask(data);
    }

    setEditingTask(null);
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    if (deleteTarget) {
      await deleteTask(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const Logout = async () => {
    store.dispatch(logout());
    await AuthApi.logout();
  };
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <CheckSquare className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">TaskFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.name}
            </span>
            <Link to="/login">
              <Button onClick={Logout} variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-1.5" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Total Tasks",
              value: stats.total,
              icon: CheckSquare,
              color: "text-foreground",
            },
            {
              label: "Completed",
              value: stats.completed,
              icon: CheckCircle2,
              color: "text-success",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: Clock,
              color: "text-accent",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-card border border-border rounded-lg p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
           <h1 className="text-xl font-heading font-bold text-foreground">My Tasks</h1>
          <Button size="lg" onClick={()=> setDialogOpen(true)} className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <Plus className="w-4 h-4 mr-1.5" /> Add Task
          </Button>
        </div>

        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="bg-card border border-border rounded-lg p-4 flex gap-4 items-start hover:shadow-sm"
            >
              <div className="text-sm font-semibold text-muted-foreground w-6">
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.title}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5 truncate">
                  {task.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2.5">
                  <Badge
                    variant="outline"
                    className={priorityConfig[task.priority].className}
                  >
                    <Flag className="w-3 h-3 mr-1" />
                    {priorityConfig[task.priority].label}
                  </Badge>

                  <Badge variant="outline" className="text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(task.dueDate)}
                  </Badge>

                  <Badge
                    className={
                      task.status === "completed"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-warning/10 text-warning-foreground border-warning/20"
                    }
                  >
                    {task.status === "completed" ? "Completed" : "Pending"}
                  </Badge>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() =>{ setEditingTask(task); setDialogOpen(true)}}>
                    {" "}
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDeleteTarget(task)}
                    className="text-destructive"
                  >
                    {" "}
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete{" "}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>

          <span className="text-sm">
            Page {page} of {totalPages}
          </span>

          <Button
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </main>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        task={editingTask}
      />
      <DeleteTaskDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        onConfirm={handleDelete}
        taskTitle={deleteTarget?.title ?? ""}
      />
    </div>
  );
};

export default Home;
