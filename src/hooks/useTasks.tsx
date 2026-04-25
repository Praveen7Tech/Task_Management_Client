import { useState, useEffect, useCallback } from "react";
import { UserApi } from "../api/user.api";
import toast from "react-hot-toast";
import type { Task } from "../components/custom/TaskDialog";

export const useTaskActions = (page: number, limit: number) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await UserApi.getTasks(page, limit);
      setTasks(res.task);
      setStats(res.status);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (data: Omit<Task, "id">) => {
    try {
      const res = await UserApi.createTask(data);
      toast.success(res.message);
      await fetchTasks();
    } catch(error) {
      console.error(error);
      throw error;
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const res = await UserApi.updateTask(task.id, task);
      toast.success(res.message);
      await fetchTasks();
    } catch(error) {
      console.error("Update failed",error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await UserApi.deleteTask(id);
      toast.success(res.message);
      await fetchTasks();
    } catch(error) {
      console.error("Delete failed",error);
      throw error;
    }
  };

  return {
    tasks,
    stats,
    loading,
    totalPages,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
