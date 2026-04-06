import type { Task } from "../components/custom/TaskDialog";
import axiosInstance from "./axios";
import type { AddTaskData, createTaskResponse, TaskDashboardData } from "./types";

export const UserApi = {

    getTasks: async(): Promise<TaskDashboardData>=>{
        const response = await axiosInstance.get('/api/user/tasks')
        return response.data
    },

    createTask: async(data: AddTaskData): Promise<createTaskResponse>=>{
        const response = await axiosInstance.post('/api/user/createTask', data)
        return response.data
    },

    updateTask: async (taskId: string, data: Partial<Task>): Promise<createTaskResponse> => {
        const response = await axiosInstance.put(`/api/user/tasks/${taskId}`, data);
        return response.data;
    },

    deleteTask: async (taskId: string): Promise<{message: string}> => {
        const response = await axiosInstance.delete(`/api/user/tasks/${taskId}`);
        return response.data
    }
}