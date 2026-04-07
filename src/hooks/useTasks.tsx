import { useEffect, useState } from "react";
import { UserApi } from "../api/user.api";
import toast from "react-hot-toast";
import type { Task } from "../components/custom/TaskDialog";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 1

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await UserApi.getTasks(page, LIMIT);
      setTasks(res.task);
      setStats(res.status);

      setPage(res.page)
      setTotalPages(res.totalPages)
    } catch (e) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data: Omit<Task, "id">) => {
    try {
      const res = await UserApi.createTask(data);
      toast.success(res.message);
      await fetchTasks();
    } catch {
      toast.error("Create failed");
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const res = await UserApi.updateTask(task.id, task);
      toast.success(res.message);
      await fetchTasks();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await UserApi.deleteTask(id);
      toast.success(res.message);
      await fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  return {
    tasks,
    stats,
    loading,
    page, totalPages, setPage,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};