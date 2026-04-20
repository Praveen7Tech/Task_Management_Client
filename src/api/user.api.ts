import type { Task } from "../components/custom/TaskDialog";
import axiosInstance from "./axios";
import { UserEndpoints } from "./enum.endpoints";
import type { AddTaskData, createTaskResponse, TaskDashboardData } from "./types";

export const UserApi = {

  getTasks: async (page: number, limit: number): Promise<TaskDashboardData> => {
    const response = await axiosInstance.get(
      `${UserEndpoints.GET_TASKS}?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  createTask: async (data: AddTaskData): Promise<createTaskResponse> => {
    const response = await axiosInstance.post(UserEndpoints.CREATE_TASK, data);
    return response.data;
  },

  updateTask: async (taskId: string, data: Partial<Task>): Promise<createTaskResponse> => {
    const response = await axiosInstance.put(
      `${UserEndpoints.TASK_BY_ID}/${taskId}`,
      data
    );
    return response.data;
  },

  deleteTask: async (taskId: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(
      `${UserEndpoints.TASK_BY_ID}/${taskId}`
    );
    return response.data;
  }
};