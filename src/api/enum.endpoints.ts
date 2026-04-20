export enum AuthEndpoints {
  REGISTER = "/api/auth/register",
  VERIFY_OTP = "/api/auth/verify-otp",
  RESEND_OTP = "/api/auth/resend-otp",
  LOGIN = "/api/auth/login",
  HEALTH = "/api/auth/health",
  LOGOUT = "/api/auth/logout",
}

export enum UserEndpoints {
  GET_TASKS = "/api/user/tasks",
  CREATE_TASK = "/api/user/createTask",
  TASK_BY_ID = "/api/user/tasks", 
}

export enum StatusCode{
  UNAUTHORIZED = 401
}