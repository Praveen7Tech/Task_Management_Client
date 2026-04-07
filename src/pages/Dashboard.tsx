import { useState } from "react";
import { Plus } from "lucide-react";

import TaskChart from "../components/custom/TaskChart";
import TaskDialog, { type Task } from "../components/custom/TaskDialog";
import DeleteTaskDialog from "../components/custom/DeleteTaskDialog";
import { Button } from "../components/ui/button";
import { useTaskActions } from "../hooks/useTasks";
import { useTaskListeners } from "../hooks/useTaskListners";
import { StatGrid } from "../components/dashboard/StatusGrid";
import Header from "../components/dashboard/Header";
import { TaskListItem } from "../components/dashboard/TaskListItems";
import { PaginationControls } from "../components/dashboard/Pagination";

const Home = () => {
  const [page, setPage] = useState(1);
  const { tasks, stats, totalPages, fetchTasks, ...actions } = useTaskActions(page, 3);
  
  // Real-time listener
  useTaskListeners(fetchTasks);

  const [dialog, setDialog] = useState<{ open: boolean; task: Task | null }>({ open: false, task: null });
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);

  const handleSave = async (data: Omit<Task, "id">) => {
    dialog.task ? await actions.updateTask({ ...dialog.task, ...data }) : await actions.createTask(data);
    setDialog({ open: false, task: null });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatGrid stats={stats} />
          <div className="lg:col-span-1"><TaskChart stats={stats} /></div>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">My Tasks</h1>
          <Button size="lg" onClick={() => setDialog({ open: true, task: null })} className="bg-accent">
            <Plus className="w-4 h-4 mr-1.5" /> Add Task
          </Button>
        </div>

        <div className="space-y-3">
          {tasks.map((task, i) => (
            <TaskListItem 
              key={task.id} 
              task={task} 
              index={(page - 1) * 3 + (i + 1)} 
              onEdit={(t) => setDialog({ open: true, task: t })} 
              onDelete={setDeleteTarget} 
            />
          ))}
        </div>

        <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
      </main>

      <TaskDialog open={dialog.open} onOpenChange={(o) => setDialog({ ...dialog, open: o })} onSave={handleSave} task={dialog.task} />
      <DeleteTaskDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)} onConfirm={() => actions.deleteTask(deleteTarget!.id)} taskTitle={deleteTarget?.title ?? ""} />
    </div>
  );
};

export default Home;
