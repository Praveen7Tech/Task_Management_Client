import { useEffect, useState } from "react";
import { UserApi } from "../api/user.api";
import toast from "react-hot-toast";
import type { Task } from "../components/custom/TaskDialog";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await UserApi.getTasks();
      setTasks(res.task);
      setStats(res.status);
    } catch (e) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data: Omit<Task, "id">) => {
    try {
      await UserApi.createTask(data);
      toast.success("Task created");
      await fetchTasks();
    } catch {
      toast.error("Create failed");
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await UserApi.updateTask(task.id, task);
      toast.success("Task updated");
      await fetchTasks();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await UserApi.deleteTask(id);
      toast.success("Task deleted");
      await fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    stats,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};