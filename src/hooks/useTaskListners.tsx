import { useEffect } from "react";
import { socket } from "../config/socket.io";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store/store";
import toast from "react-hot-toast";

type TaskActivity = 'CREATE' | 'UPDATE' | 'DELETE'

interface ActivityData{
  senderId: string;
  userName: string;
  taskName: string;
  type: TaskActivity
}

export const useTaskListeners = (onActivity: () => void) => {
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const handleActivity = (data: ActivityData) => {
      if (data.senderId === user?.id) return;

      toast.success(
        `${data.userName} ${data.type.toLowerCase()}d a task: ${data.taskName}`,
        { icon: "🔔" },
      );
      onActivity();
    };

    socket.on("task_activity", handleActivity);
    return () => {
      socket.off("task_activity");
    };
  }, [user?.id, onActivity]);
};
