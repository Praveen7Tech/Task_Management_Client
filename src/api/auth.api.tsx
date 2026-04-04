
import type {  } from "../pages/RegisterPage";
import axiosInstance from "./axios";

export interface RegisterData{
    name: string
    email: string
    password: string
}
export interface RegisterReponse{
    message: string
}

export const AuthApi = {
    register: async(formData: RegisterData): Promise<RegisterReponse>=>{
        const response = await axiosInstance.post('/api/auth/register', formData);
        return response.data
    },

    verifyOtp: async(otp: string): Promise<RegisterReponse>=>{
        const response = await axiosInstance.post('/api/auth/verify-otp', otp);
        return response.data
    },

    resendOtp: async(): Promise<RegisterReponse>=>{
        const response = await axiosInstance.post('/api/auth/resend-otp');
        return response.data
    }
}