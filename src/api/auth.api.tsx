import type { LoginFormData } from "../pages/LoginPage";
import axiosInstance from "./axios";
import { AuthEndpoints } from "./enum.endpoints";
import type { HealthCheck, RegisterData, RegisterReponse } from "./types";

export const AuthApi = {
  register: async (formData: RegisterData): Promise<RegisterReponse> => {
    const response = await axiosInstance.post(AuthEndpoints.REGISTER, formData);
    return response.data;
  },

  verifyOtp: async (email: string, otp: string): Promise<RegisterReponse> => {
    const response = await axiosInstance.post(AuthEndpoints.VERIFY_OTP, { email, otp });
    return response.data;
  },

  resendOtp: async (email: string): Promise<RegisterReponse> => {
    const response = await axiosInstance.post(AuthEndpoints.RESEND_OTP, { email });
    return response.data;
  },

  login: async (data: LoginFormData): Promise<RegisterReponse> => {
    const response = await axiosInstance.post(AuthEndpoints.LOGIN, data);
    return response.data;
  },

  health: async (): Promise<HealthCheck> => {
    const response = await axiosInstance.get(AuthEndpoints.HEALTH);
    return response.data;
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await axiosInstance.put(AuthEndpoints.LOGOUT);
    return response.data;
  },
};