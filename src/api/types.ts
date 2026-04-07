import type { User } from "../app/slices/auth.slice"
import type { Task } from "../components/custom/TaskDialog"

export interface RegisterData{
    name: string
    email: string
    password: string
}
export interface RegisterReponse{
    message: string
    user: User
}

export interface AddTaskData{
    title: string
    description: string
}

export interface MessageResponse{
    message: string
}

export interface Tasks{
    id: string;
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    dueDate: string;
    category: string;
    status: "completed" | "pending";
}

export interface createTaskResponse{
    task: Tasks;
    message: string
}
export interface TaskStats {
    total: number;
    completed: number;
    pending: number;
    overdue: number
}

export interface TaskDashboardData{
    task: Task[]
    status: TaskStats
    page: number
    total: number
    totalPages: number
}

