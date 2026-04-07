import { useEffect, useState } from "react";
import { UserApi } from "../api/user.api";
import toast from "react-hot-toast";
import type { Task } from "../components/custom/TaskDialog";
import { socket } from "../config/socket.io";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store/store";

interface ActivityData{
  senderId: string
  type: string;
  userName: string;
  taskName: string
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 3
  const user = useSelector((state: RootState)=> state.auth.user)

  // SOCKET HANDLER
  useEffect(()=>{

    const handleActivity = (data:ActivityData)=>{
      console.log("task update ", data)
      const {type, userName, taskName, senderId} = data;

      if(senderId === user?.id){
         return;
      }
      const message = `${userName} ${type}ed a task : ${taskName}`
      toast.success(message)

      fetchTasks()
    }

    socket.on("task_activity", handleActivity)

    return ()=>{
      socket.off("task_activity", handleActivity)
    }
  },[])

  useEffect(() => {
    fetchTasks();
  }, [page]);

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