
import type { LoginFormData } from "../pages/LoginPage";
import type {  } from "../pages/RegisterPage";
import axiosInstance from "./axios";
import type { RegisterData, RegisterReponse } from "./types";

export const AuthApi = {
    register: async(formData: RegisterData): Promise<RegisterReponse>=>{
        const response = await axiosInstance.post('/api/auth/register', formData);
        return response.data
    },

    verifyOtp: async(email: string,otp: string): Promise<RegisterReponse>=>{
        const response = await axiosInstance.post('/api/auth/verify-otp', {email,otp});
        return response.data
    },

    resendOtp: async(email: string): Promise<RegisterReponse>=>{
        const response = await axiosInstance.post('/api/auth/resend-otp', {email});
        return response.data
    },

    login: async(data:LoginFormData): Promise<RegisterReponse>=>{
        const response = await axiosInstance.post('/api/auth/login', data);
        return response.data
    }
}